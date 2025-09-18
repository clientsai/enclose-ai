import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe, verifyWebhookSignature } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const sig = headersList.get('stripe-signature')!

    if (!sig) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    let event

    try {
      event = await verifyWebhookSignature(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Store webhook event in database for debugging
    await (supabaseAdmin as any).from('webhook_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
      payload: event as any,
      created_at: new Date().toISOString(),
    })

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any

        // Find the payment link
        const paymentLinkId = session.metadata?.payment_link_id

        if (paymentLinkId) {
          // Update payment record
          await (supabaseAdmin as any).from('payments').insert({
            payment_link_id: paymentLinkId,
            stripe_checkout_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent,
            amount: session.amount_total / 100,
            currency: session.currency,
            status: 'succeeded',
            customer_email: session.customer_email,
            customer_name: session.customer_details?.name,
            metadata: session.metadata,
            completed_at: new Date().toISOString(),
          })

          // Increment conversion count
          await (supabaseAdmin as any).rpc('increment_link_conversion_count', {
            link_id: paymentLinkId,
          })

          // If this is from Clients.AI, notify them
          if (session.metadata?.clients_ai_agent_id) {
            await notifyClientsAI({
              agent_id: session.metadata.clients_ai_agent_id,
              payment_status: 'completed',
              amount: session.amount_total / 100,
              currency: session.currency,
              customer_email: session.customer_email,
              payment_link_id: paymentLinkId,
            })
          }
        }

        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as any

        // Update payment status if it exists
        await (supabaseAdmin as any)
          .from('payments')
          .update({
            status: 'succeeded',
            completed_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as any

        await (supabaseAdmin as any)
          .from('payments')
          .update({
            status: 'failed',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        break
      }

      case 'account.updated': {
        const account = event.data.object as any

        // Update account details in database
        await (supabaseAdmin as any)
          .from('stripe_accounts')
          .update({
            account_details: {
              charges_enabled: account.charges_enabled,
              payouts_enabled: account.payouts_enabled,
              details_submitted: account.details_submitted,
              capabilities: account.capabilities,
            },
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_account_id', account.id)

        break
      }

      case 'account.application.deauthorized': {
        const account = event.account as string

        // Mark account as disconnected
        await (supabaseAdmin as any)
          .from('stripe_accounts')
          .update({
            access_token: null,
            refresh_token: null,
            account_details: {
              disconnected_at: new Date().toISOString(),
              disconnected_reason: 'deauthorized',
            },
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_account_id', account)

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Mark webhook as processed
    await (supabaseAdmin as any)
      .from('webhook_events')
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq('stripe_event_id', event.id)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function notifyClientsAI(data: {
  agent_id: string
  payment_status: string
  amount: number
  currency: string
  customer_email: string
  payment_link_id: string
}) {
  try {
    // Call Clients.AI webhook endpoint
    const response = await fetch(
      `${process.env.CLIENTS_AI_WEBHOOK_URL}/webhooks/payment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': process.env.CLIENTS_AI_WEBHOOK_SECRET || '',
        },
        body: JSON.stringify({
          event: 'payment.completed',
          data: data,
          timestamp: new Date().toISOString(),
        }),
      }
    )

    if (!response.ok) {
      console.error('Failed to notify Clients.AI:', await response.text())
    }
  } catch (error) {
    console.error('Error notifying Clients.AI:', error)
  }
}