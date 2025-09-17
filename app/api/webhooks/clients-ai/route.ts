import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Webhook endpoint for Clients.AI to receive payment notifications
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const webhookSecret = request.headers.get('x-webhook-secret')

    // Verify webhook secret
    if (webhookSecret !== process.env.CLIENTS_AI_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Invalid webhook secret' },
        { status: 401 }
      )
    }

    const { event, data } = body

    switch (event) {
      case 'payment.requested':
        // Clients.AI is requesting a payment link
        const { agent_id, customer_email, amount, product_name } = data

        // Find the user's API key and create payment link
        // This would be handled by the /api/v1/checkout endpoint
        console.log('Payment requested from Clients.AI:', data)

        return NextResponse.json({
          success: true,
          message: 'Payment request received',
        })

      case 'agent.checkout':
        // Handle agent-initiated checkout
        console.log('Agent checkout event:', data)

        return NextResponse.json({
          success: true,
          message: 'Checkout event processed',
        })

      default:
        console.log('Unknown webhook event:', event)
        return NextResponse.json({
          success: true,
          message: 'Event received',
        })
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}