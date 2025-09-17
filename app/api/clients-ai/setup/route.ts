import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { encryptSensitiveData, validateStripeKeys } from '@/lib/encryption-advanced'
import { cookies } from 'next/headers'

// API endpoint to save user's Stripe configuration for Clients.AI
export async function POST(request: NextRequest) {
  try {
    // Get user from cookie/session
    const cookieStore = cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      stripePublishableKey,
      stripeSecretKey,
      stripeWebhookSecret,
      basicMonthlyPriceId,
      proMonthlyPriceId,
      monthlyPriceId,
      yearlyPriceId,
      clientsAiApiKey,
      testMode = true,
    } = body

    // Validate Stripe keys
    const validation = validateStripeKeys({
      publishableKey: stripePublishableKey,
      secretKey: stripeSecretKey,
    })

    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid Stripe keys', details: validation.errors },
        { status: 400 }
      )
    }

    // Get encryption key from environment
    const encryptionKey = process.env.ENCRYPTION_KEY
    if (!encryptionKey) {
      console.error('ENCRYPTION_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Encrypt sensitive data
    const encryptedSecretKey = encryptSensitiveData(stripeSecretKey, encryptionKey)
    const encryptedWebhookSecret = stripeWebhookSecret
      ? encryptSensitiveData(stripeWebhookSecret, encryptionKey)
      : null
    const encryptedApiKey = clientsAiApiKey
      ? encryptSensitiveData(clientsAiApiKey, encryptionKey)
      : null

    // Check if integration already exists
    const { data: existing } = await supabase
      .from('clients_ai_integrations')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (existing) {
      // Update existing integration
      const { error: updateError } = await supabase
        .from('clients_ai_integrations')
        .update({
          stripe_publishable_key: stripePublishableKey,
          stripe_secret_key_encrypted: encryptedSecretKey.encrypted,
          stripe_webhook_secret_encrypted: encryptedWebhookSecret?.encrypted,
          basic_monthly_price_id: basicMonthlyPriceId,
          pro_monthly_price_id: proMonthlyPriceId,
          monthly_price_id: monthlyPriceId,
          yearly_price_id: yearlyPriceId,
          clients_ai_api_key_encrypted: encryptedApiKey?.encrypted,
          test_mode: testMode,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)

      if (updateError) {
        console.error('Error updating integration:', updateError)
        return NextResponse.json(
          { error: 'Failed to update integration' },
          { status: 500 }
        )
      }
    } else {
      // Create new integration
      const { error: insertError } = await supabase
        .from('clients_ai_integrations')
        .insert({
          user_id: userId,
          stripe_publishable_key: stripePublishableKey,
          stripe_secret_key_encrypted: encryptedSecretKey.encrypted,
          stripe_webhook_secret_encrypted: encryptedWebhookSecret?.encrypted,
          basic_monthly_price_id: basicMonthlyPriceId,
          pro_monthly_price_id: proMonthlyPriceId,
          monthly_price_id: monthlyPriceId,
          yearly_price_id: yearlyPriceId,
          clients_ai_api_key_encrypted: encryptedApiKey?.encrypted,
          webhook_endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/clients-ai/webhook/${userId}`,
          test_mode: testMode,
          is_active: true,
        })

      if (insertError) {
        console.error('Error creating integration:', insertError)
        return NextResponse.json(
          { error: 'Failed to create integration' },
          { status: 500 }
        )
      }
    }

    // Also store in encrypted credentials table for extra security
    const credentials = [
      { type: 'stripe_secret', value: stripeSecretKey },
      { type: 'webhook_secret', value: stripeWebhookSecret },
      { type: 'clients_ai_api', value: clientsAiApiKey },
    ].filter(c => c.value)

    for (const cred of credentials) {
      const encrypted = encryptSensitiveData(cred.value, encryptionKey)

      await supabase.rpc('update_encrypted_credential', {
        p_user_id: userId,
        p_credential_type: cred.type,
        p_encrypted_value: encrypted.encrypted,
        p_iv: encrypted.iv,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Clients.AI integration configured successfully',
      webhookEndpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/clients-ai/webhook/${userId}`,
      testMode,
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get user's integration settings
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

    const { data: integration, error } = await supabase
      .from('clients_ai_integrations')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error || !integration) {
      return NextResponse.json(
        { configured: false },
        { status: 200 }
      )
    }

    // Don't send encrypted values to frontend
    return NextResponse.json({
      configured: true,
      data: {
        stripePublishableKey: integration.stripe_publishable_key,
        basicMonthlyPriceId: integration.basic_monthly_price_id,
        proMonthlyPriceId: integration.pro_monthly_price_id,
        monthlyPriceId: integration.monthly_price_id,
        yearlyPriceId: integration.yearly_price_id,
        webhookEndpoint: integration.webhook_endpoint,
        testMode: integration.test_mode,
        isActive: integration.is_active,
        hasApiKey: !!integration.clients_ai_api_key_encrypted,
        hasWebhookSecret: !!integration.stripe_webhook_secret_encrypted,
      }
    })

  } catch (error) {
    console.error('Get integration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}