import { NextRequest, NextResponse } from 'next/server'
import { createConnectedAccountPaymentLink } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { hashApiKey } from '@/lib/encryption'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const apiKey = authHeader.substring(7)
    const hashedKey = hashApiKey(apiKey)

    // Validate API key
    const { data: apiKeyData, error: keyError } = await supabaseAdmin
      .from('api_keys')
      .select('*, enclose_users!inner(*)')
      .eq('key_hash', hashedKey)
      .eq('active', true)
      .single()

    if (keyError || !apiKeyData) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    // Update last used timestamp
    await (supabaseAdmin as any)
      .from('api_keys')
      .update({ last_used: new Date().toISOString() })
      .eq('id', (apiKeyData as any).id)

    const userId = (apiKeyData as any).user_id
    const {
      agent_id,
      customer_email,
      product_name,
      amount,
      currency = 'usd',
      metadata = {}
    } = await request.json()

    // Validate required fields
    if (!agent_id || !product_name || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: agent_id, product_name, amount' },
        { status: 400 }
      )
    }

    // Get user's connected Stripe account
    const { data: stripeAccount, error: accountError } = await supabaseAdmin
      .from('stripe_accounts')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (accountError || !stripeAccount) {
      return NextResponse.json(
        { error: 'No connected Stripe account found for this API key' },
        { status: 400 }
      )
    }

    // Create payment link with Clients.AI metadata
    const paymentLink = await createConnectedAccountPaymentLink(
      (stripeAccount as any).stripe_account_id,
      product_name,
      amount,
      currency,
      {
        ...metadata,
        clients_ai_agent_id: agent_id,
        customer_email: customer_email || '',
        source: 'clients_ai_api',
        enclose_user_id: userId,
      }
    )

    // Store payment link in database
    const { data: savedLink, error: saveError } = await (supabaseAdmin as any)
      .from('payment_links')
      .insert({
        user_id: userId,
        stripe_payment_link_id: paymentLink.id,
        url: paymentLink.url,
        product_name: product_name,
        amount: amount,
        currency: currency,
        active: true,
        metadata: {
          agent_id: agent_id,
          customer_email: customer_email,
          source: 'clients_ai',
          api_key_id: (apiKeyData as any).id,
          ...metadata,
        },
      })
      .select()
      .single()

    if (saveError) {
      console.error('Error saving payment link:', saveError)
      return NextResponse.json(
        { error: 'Failed to save payment link' },
        { status: 500 }
      )
    }

    // Track analytics event
    await (supabaseAdmin as any).from('analytics_events').insert({
      user_id: userId,
      event_type: 'api_checkout_created',
      payment_link_id: savedLink.id,
      metadata: {
        agent_id: agent_id,
        api_key_id: (apiKeyData as any).id,
      },
    })

    return NextResponse.json({
      success: true,
      checkout_url: paymentLink.url,
      payment_link_id: savedLink.id,
      stripe_payment_link_id: paymentLink.id,
    })
  } catch (error) {
    console.error('Clients.AI checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    )
  }
}