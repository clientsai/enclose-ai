import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia' as any,
  typescript: true,
})

export const STRIPE_AUTHORIZE_URL = 'https://connect.stripe.com/oauth/authorize'
export const STRIPE_TOKEN_URL = 'https://connect.stripe.com/oauth/token'

export function getStripeOAuthURL(state: string, email?: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.STRIPE_CLIENT_ID!,
    scope: 'read_write',
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/callback`,
    state: state,
  })

  if (email) {
    params.append('stripe_user[email]', email)
  }

  params.append('stripe_user[business_type]', 'company')

  return `${STRIPE_AUTHORIZE_URL}?${params}`
}

export async function exchangeCodeForToken(code: string): Promise<{
  stripe_user_id: string
  access_token: string
  refresh_token: string
  livemode: boolean
}> {
  const response = await fetch(STRIPE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_secret: process.env.STRIPE_SECRET_KEY!,
      code: code,
      grant_type: 'authorization_code',
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error_description || 'Failed to exchange code for token')
  }

  return data
}

export async function createConnectedAccountPaymentLink(
  accountId: string,
  productName: string,
  amount: number,
  currency: string = 'usd',
  metadata?: Record<string, string>
): Promise<Stripe.PaymentLink> {
  const connectedStripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia' as any,
    stripeAccount: accountId,
  })

  const paymentLink = await connectedStripe.paymentLinks.create({
    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: productName,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    after_completion: {
      type: 'redirect',
      redirect: {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      },
    },
    metadata: metadata || {},
  })

  return paymentLink
}

export async function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): Promise<Stripe.Event> {
  try {
    return stripe.webhooks.constructEvent(payload, signature, secret)
  } catch (err) {
    throw new Error('Invalid webhook signature')
  }
}