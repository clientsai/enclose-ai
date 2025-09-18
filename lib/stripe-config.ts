/* Stripe Configuration with Product and Price IDs */

export const STRIPE_CONFIG = {
  // Products
  products: {
    starter: {
      id: process.env.STRIPE_STARTER_PRODUCT_ID || 'prod_starter_demo',
      name: 'Enclose.AI Starter',
      description: 'Perfect for small businesses and startups',
      features: [
        'Up to 100 transactions/month',
        '1 team member',
        'Basic analytics',
        'Email support',
        'API access',
        'Standard security',
        'Mobile app access'
      ],
      metadata: {
        tier: 'starter',
        max_transactions: '100',
        team_members: '1'
      }
    },
    professional: {
      id: process.env.STRIPE_PRO_PRODUCT_ID || 'prod_professional_demo',
      name: 'Enclose.AI Professional',
      description: 'For growing businesses with higher volume',
      features: [
        'Up to 1,000 transactions/month',
        '5 team members',
        'Advanced analytics',
        'Priority email & chat support',
        'Advanced API access',
        'Enhanced security',
        'Mobile app access',
        'Custom branding',
        'Webhook management',
        'API rate limits: 1000 req/min'
      ],
      metadata: {
        tier: 'professional',
        max_transactions: '1000',
        team_members: '5'
      }
    },
    enterprise: {
      id: process.env.STRIPE_ENTERPRISE_PRODUCT_ID || 'prod_enterprise_demo',
      name: 'Enclose.AI Enterprise',
      description: 'Custom solutions for large organizations',
      features: [
        'Unlimited transactions',
        'Unlimited team members',
        'Custom analytics & reporting',
        '24/7 phone, email & chat support',
        'Dedicated API infrastructure',
        'Advanced security & compliance',
        'White-label solution',
        'Custom integrations',
        'SLA guarantee',
        'Dedicated account manager'
      ],
      metadata: {
        tier: 'enterprise',
        max_transactions: 'unlimited',
        team_members: 'unlimited'
      }
    }
  },

  // Prices
  prices: {
    starter: {
      monthly: {
        id: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID || 'price_starter_monthly_demo',
        amount: 2900, // $29.00
        currency: 'usd',
        interval: 'month'
      },
      yearly: {
        id: process.env.STRIPE_STARTER_YEARLY_PRICE_ID || 'price_starter_yearly_demo',
        amount: 29000, // $290.00 ($24.17/month)
        currency: 'usd',
        interval: 'year'
      }
    },
    professional: {
      monthly: {
        id: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 'price_pro_monthly_demo',
        amount: 9900, // $99.00
        currency: 'usd',
        interval: 'month'
      },
      yearly: {
        id: process.env.STRIPE_PRO_YEARLY_PRICE_ID || 'price_pro_yearly_demo',
        amount: 99000, // $990.00 ($82.50/month)
        currency: 'usd',
        interval: 'year'
      }
    },
    enterprise: {
      // Custom pricing - contact sales
      custom: true
    }
  },

  // Test mode configuration
  testMode: process.env.STRIPE_TEST_MODE === 'true' || !process.env.STRIPE_SECRET_KEY?.startsWith('sk_live'),

  // Webhook events we handle
  webhookEvents: [
    'checkout.session.completed',
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'invoice.payment_succeeded',
    'invoice.payment_failed',
    'account.updated',
    'account.application.deauthorized'
  ],

  // Test cards for demo/development
  testCards: {
    success: '4242424242424242',
    decline: '4000000000000002',
    authRequired: '4000002500003155',
    insufficientFunds: '4000000000009995',
    expired: '4000000000000069',
    processingError: '4000000000000119'
  }
}

// Helper function to get price ID based on plan and billing period
export function getPriceId(plan: 'starter' | 'professional', billing: 'monthly' | 'yearly'): string {
  if (plan === 'starter') {
    return billing === 'monthly'
      ? STRIPE_CONFIG.prices.starter.monthly.id
      : STRIPE_CONFIG.prices.starter.yearly.id
  } else {
    return billing === 'monthly'
      ? STRIPE_CONFIG.prices.professional.monthly.id
      : STRIPE_CONFIG.prices.professional.yearly.id
  }
}

// Helper function to format price for display
export function formatPrice(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount / 100)
}

// Helper function to calculate savings for yearly billing
export function calculateYearlySavings(monthlyAmount: number): number {
  const yearlyWithoutDiscount = monthlyAmount * 12
  const yearlyWithDiscount = monthlyAmount * 10 // 2 months free
  return yearlyWithoutDiscount - yearlyWithDiscount
}

// Export types
export type Product = keyof typeof STRIPE_CONFIG.products
export type BillingPeriod = 'monthly' | 'yearly'
export type PriceTier = 'starter' | 'professional' | 'enterprise'