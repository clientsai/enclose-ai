import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { STRIPE_CONFIG, getPriceId } from '@/lib/stripe-config'

export async function POST(request: NextRequest) {
  try {
    const { plan, billing, email, successUrl, cancelUrl } = await request.json()

    if (!plan || !billing) {
      return NextResponse.json(
        { error: 'Plan and billing period are required' },
        { status: 400 }
      )
    }

    // Get the price ID from configuration
    const priceId = getPriceId(plan, billing)

    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan or billing period' },
        { status: 400 }
      )
    }

    // Check if user is authenticated (optional - for registered users)
    let customerId = undefined
    let customerEmail = email

    // Try to get authenticated user
    const authHeader = request.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const { data: { user } } = await supabase.auth.getUser(token)

      if (user) {
        customerEmail = user.email

        // Check if user already has a Stripe customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('stripe_customer_id')
          .eq('id', user.id)
          .single()

        customerId = (profile as any)?.stripe_customer_id
      }
    }

    // Create Stripe checkout session
    const sessionParams: any = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        plan,
        billing,
      },
    }

    // Add customer info if available
    if (customerId) {
      sessionParams.customer = customerId
    } else if (customerEmail) {
      sessionParams.customer_email = customerEmail
    }

    // Enable promotional codes
    sessionParams.allow_promotion_codes = true

    // Configure subscription data
    sessionParams.subscription_data = {
      metadata: {
        plan,
        billing,
      },
    }

    // If test mode, use test configuration
    if (STRIPE_CONFIG.testMode) {
      console.log('Creating checkout session in TEST mode')
      // In test mode, we can create a mock session for demo purposes
      if (!process.env.STRIPE_SECRET_KEY) {
        // Return a mock checkout URL for demo
        return NextResponse.json({
          sessionId: 'cs_test_demo_' + Date.now(),
          url: `/api/checkout/demo?plan=${plan}&billing=${billing}`,
          mode: 'demo'
        })
      }
    }

    // Create the actual Stripe session
    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      mode: 'live'
    })
  } catch (error: any) {
    console.error('Checkout session error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}