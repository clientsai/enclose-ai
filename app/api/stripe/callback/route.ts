import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { exchangeCodeForToken } from '@/lib/stripe'
import { encrypt } from '@/lib/encryption'
import { supabaseAdmin } from '@/lib/supabase'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    // Handle OAuth errors
    if (error) {
      console.error('Stripe OAuth error:', error, errorDescription)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=stripe_connect_failed`
      )
    }

    if (!code || !state) {
      return NextResponse.json(
        { error: 'Missing code or state parameter' },
        { status: 400 }
      )
    }

    // Verify state for CSRF protection
    const cookieStore = cookies()
    const savedState = cookieStore.get('stripe_oauth_state')?.value

    if (!savedState || savedState !== state) {
      return NextResponse.json(
        { error: 'Invalid state parameter' },
        { status: 400 }
      )
    }

    // Get user ID from state (you might encode this in the state)
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/login?error=not_authenticated`
      )
    }

    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code)

    // Encrypt sensitive tokens
    const encryptedAccessToken = encrypt(tokenData.access_token)
    const encryptedRefreshToken = tokenData.refresh_token
      ? encrypt(tokenData.refresh_token)
      : null

    // Store in database
    const { data, error: dbError } = await (supabaseAdmin as any)
      .from('stripe_accounts')
      .upsert({
        user_id: userId,
        stripe_account_id: tokenData.stripe_user_id,
        access_token: encryptedAccessToken,
        refresh_token: encryptedRefreshToken,
        livemode: tokenData.livemode,
        connected_at: new Date().toISOString(),
        account_details: {
          connected_at: new Date().toISOString(),
          livemode: tokenData.livemode,
        },
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=database_error`
      )
    }

    // Clear the state cookie
    cookieStore.delete('stripe_oauth_state')

    // Redirect to dashboard with success
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?connected=true`
    )
  } catch (error) {
    console.error('Stripe callback error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=connection_failed`
    )
  }
}