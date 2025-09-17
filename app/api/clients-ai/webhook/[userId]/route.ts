import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { decryptSensitiveData, verifyWebhookSignature } from '@/lib/encryption-advanced'

// Handle Stripe webhooks for Clients.AI payments
export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Get user's integration
    const { data: integration, error: integrationError } = await supabase
      .from('clients_ai_integrations')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (integrationError || !integration) {
      return NextResponse.json(
        { error: 'Integration not found' },
        { status: 404 }
      )
    }

    // Decrypt webhook secret
    const encryptionKey = process.env.ENCRYPTION_KEY
    if (!encryptionKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    let webhookSecret: string
    let stripeSecretKey: string

    try {
      webhookSecret = decryptSensitiveData(
        integration.stripe_webhook_secret_encrypted,
        encryptionKey
      )
      stripeSecretKey = decryptSensitiveData(
        integration.stripe_secret_key_encrypted,
        encryptionKey
      )
    } catch (decryptError) {
      console.error('Failed to decrypt secrets:', decryptError)
      return NextResponse.json(
        { error: 'Failed to access configuration' },
        { status: 500 }
      )
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, signature, webhookSecret)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Parse event
    const event = JSON.parse(body) as Stripe.Event

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    })

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Update subscription record
        const { error: updateError } = await supabase
          .from('clients_ai_subscriptions')
          .update({
            stripe_subscription_id: session.subscription as string,
            status: 'active',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', session.customer as string)
          .eq('metadata->checkout_session_id', session.id)

        if (updateError) {
          console.error('Failed to update subscription:', updateError)
        }

        // Create payment record
        await supabase
          .from('clients_ai_payments')
          .insert({
            integration_id: integration.id,
            stripe_payment_intent_id: session.payment_intent as string,
            amount: (session.amount_total || 0) / 100,
            currency: session.currency,
            status: 'succeeded',
            customer_email: session.customer_email,
          })

        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription

        const { data: existing } = await supabase
          .from('clients_ai_subscriptions')
          .select('id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        const subscriptionData = {
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          stripe_price_id: subscription.items.data[0]?.price.id,
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
          currency: subscription.currency,
          interval: subscription.items.data[0]?.price.recurring?.interval,
          updated_at: new Date().toISOString(),
        }

        if (existing) {
          await supabase
            .from('clients_ai_subscriptions')
            .update(subscriptionData)
            .eq('id', existing.id)
        } else {
          await supabase
            .from('clients_ai_subscriptions')
            .insert({
              ...subscriptionData,
              integration_id: integration.id,
              customer_email: '', // Will be updated from customer
            })
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        await supabase
          .from('clients_ai_subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Find subscription
        const { data: subscription } = await supabase
          .from('clients_ai_subscriptions')
          .select('id')
          .eq('stripe_customer_id', paymentIntent.customer as string)
          .single()

        if (subscription) {
          await supabase
            .from('clients_ai_payments')
            .insert({
              subscription_id: subscription.id,
              integration_id: integration.id,
              stripe_payment_intent_id: paymentIntent.id,
              amount: paymentIntent.amount / 100,
              currency: paymentIntent.currency,
              status: 'succeeded',
              customer_email: paymentIntent.receipt_email,
            })
        }

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        await supabase
          .from('clients_ai_payments')
          .insert({
            integration_id: integration.id,
            stripe_payment_intent_id: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: 'failed',
            customer_email: paymentIntent.receipt_email,
            description: paymentIntent.last_payment_error?.message,
          })

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Forward to Clients.AI if API key is configured
    if (integration.clients_ai_api_key_encrypted) {
      try {
        const apiKey = decryptSensitiveData(
          integration.clients_ai_api_key_encrypted,
          encryptionKey
        )

        // Forward webhook to Clients.AI
        const clientsAiResponse = await fetch('https://api.clients.ai/webhooks/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            event,
            integration_id: integration.id,
            user_id: userId,
          }),
        })

        if (!clientsAiResponse.ok) {
          console.error('Failed to forward to Clients.AI:', await clientsAiResponse.text())
        }
      } catch (forwardError) {
        console.error('Error forwarding to Clients.AI:', forwardError)
        // Don't fail the webhook
      }
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}