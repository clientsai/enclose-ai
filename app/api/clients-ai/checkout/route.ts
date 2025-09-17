import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { decryptSensitiveData } from '@/lib/encryption-advanced'

// Create Stripe checkout session for Clients.AI subscriptions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      integrationId, // User's integration ID
      priceId, // Which plan to subscribe to
      customerEmail,
      customerName,
      successUrl,
      cancelUrl,
      metadata = {},
    } = body

    if (!integrationId || !priceId || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get integration details
    const { data: integration, error: integrationError } = await supabase
      .from('clients_ai_integrations')
      .select('*')
      .eq('id', integrationId)
      .single()

    if (integrationError || !integration) {
      return NextResponse.json(
        { error: 'Integration not found' },
        { status: 404 }
      )
    }

    // Decrypt Stripe secret key
    const encryptionKey = process.env.ENCRYPTION_KEY
    if (!encryptionKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    let stripeSecretKey: string
    try {
      stripeSecretKey = decryptSensitiveData(
        integration.stripe_secret_key_encrypted,
        encryptionKey
      )
    } catch (decryptError) {
      console.error('Failed to decrypt Stripe key:', decryptError)
      return NextResponse.json(
        { error: 'Failed to access Stripe configuration' },
        { status: 500 }
      )
    }

    // Initialize Stripe with user's key
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    })

    // Check if customer already exists
    let customer: Stripe.Customer | undefined

    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    })

    if (customers.data.length > 0) {
      customer = customers.data[0]
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          ...metadata,
          integration_id: integrationId,
          source: 'clients_ai',
        },
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        ...metadata,
        integration_id: integrationId,
        customer_email: customerEmail,
        source: 'clients_ai',
      },
      subscription_data: {
        metadata: {
          ...metadata,
          integration_id: integrationId,
          source: 'clients_ai',
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    // Store checkout session in database
    const { error: dbError } = await supabase
      .from('clients_ai_subscriptions')
      .insert({
        integration_id: integrationId,
        stripe_customer_id: customer.id,
        customer_email: customerEmail,
        customer_name: customerName,
        status: 'pending',
        stripe_price_id: priceId,
        metadata: {
          checkout_session_id: session.id,
          ...metadata,
        },
      })

    if (dbError) {
      console.error('Failed to store checkout session:', dbError)
      // Don't fail the request, just log it
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Get subscription status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subscriptionId = searchParams.get('subscriptionId')
    const integrationId = searchParams.get('integrationId')

    if (!subscriptionId && !integrationId) {
      return NextResponse.json(
        { error: 'Missing subscription or integration ID' },
        { status: 400 }
      )
    }

    let query = supabase
      .from('clients_ai_subscriptions')
      .select('*')

    if (subscriptionId) {
      query = query.eq('stripe_subscription_id', subscriptionId)
    } else if (integrationId) {
      query = query.eq('integration_id', integrationId)
    }

    const { data: subscriptions, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch subscriptions' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      subscriptions: subscriptions || [],
    })

  } catch (error) {
    console.error('Get subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}