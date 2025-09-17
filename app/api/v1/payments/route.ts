import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { hashApiKey } from '@/lib/encryption'

export async function GET(request: NextRequest) {
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
      .select('*')
      .eq('key_hash', hashedKey)
      .eq('active', true)
      .single()

    if (keyError || !apiKeyData) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    const userId = apiKeyData.user_id
    const { searchParams } = new URL(request.url)
    const paymentLinkId = searchParams.get('payment_link_id')
    const agentId = searchParams.get('agent_id')
    const status = searchParams.get('status')

    // Build query
    let query = supabaseAdmin
      .from('payments')
      .select(`
        *,
        payment_links!inner(*)
      `)
      .eq('payment_links.user_id', userId)

    if (paymentLinkId) {
      query = query.eq('payment_link_id', paymentLinkId)
    }

    if (agentId) {
      query = query.contains('metadata', { clients_ai_agent_id: agentId })
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data: payments, error } = await query.order('created_at', {
      ascending: false,
    })

    if (error) {
      console.error('Error fetching payments:', error)
      return NextResponse.json(
        { error: 'Failed to fetch payments' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      payments: payments,
    })
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

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
      .select('*')
      .eq('key_hash', hashedKey)
      .eq('active', true)
      .single()

    if (keyError || !apiKeyData) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    const { payment_id } = await request.json()

    if (!payment_id) {
      return NextResponse.json(
        { error: 'Missing payment_id' },
        { status: 400 }
      )
    }

    // Get payment status
    const { data: payment, error } = await supabaseAdmin
      .from('payments')
      .select(`
        *,
        payment_links!inner(*)
      `)
      .eq('id', payment_id)
      .eq('payment_links.user_id', apiKeyData.user_id)
      .single()

    if (error || !payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      payment: payment,
    })
  } catch (error) {
    console.error('Error fetching payment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment' },
      { status: 500 }
    )
  }
}