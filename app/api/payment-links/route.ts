import { NextRequest, NextResponse } from 'next/server'
import { createConnectedAccountPaymentLink } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { productName, amount, currency = 'usd', metadata = {} } = await request.json()

    // Get user from cookies or auth header
    const cookieStore = cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate input
    if (!productName || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid product name or amount' },
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
        { error: 'No connected Stripe account found' },
        { status: 400 }
      )
    }

    // Create payment link with Stripe
    const paymentLink = await createConnectedAccountPaymentLink(
      stripeAccount.stripe_account_id,
      productName,
      amount,
      currency,
      {
        ...metadata,
        enclose_user_id: userId,
      }
    )

    // Store payment link in database
    const { data: savedLink, error: saveError } = await supabaseAdmin
      .from('payment_links')
      .insert({
        user_id: userId,
        stripe_payment_link_id: paymentLink.id,
        url: paymentLink.url,
        product_name: productName,
        amount: amount,
        currency: currency,
        active: paymentLink.active,
        metadata: {
          ...metadata,
          stripe_metadata: paymentLink.metadata,
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

    return NextResponse.json({
      success: true,
      payment_link_id: savedLink.id,
      payment_link_url: paymentLink.url,
      stripe_payment_link_id: paymentLink.id,
    })
  } catch (error) {
    console.error('Error creating payment link:', error)
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all payment links for the user
    const { data: paymentLinks, error } = await supabaseAdmin
      .from('payment_links')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching payment links:', error)
      return NextResponse.json(
        { error: 'Failed to fetch payment links' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      payment_links: paymentLinks,
    })
  } catch (error) {
    console.error('Error fetching payment links:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment links' },
      { status: 500 }
    )
  }
}