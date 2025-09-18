'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, ArrowRight, Sparkles, Shield, Zap, Building, HelpCircle } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import PricingCheckout from '@/components/PricingCheckout'

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses and startups',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Up to 100 transactions/month',
        '1 team member',
        'Basic analytics',
        'Email support',
        'API access',
        'Standard security',
        'Mobile app access'
      ],
      limitations: [
        'No custom branding',
        'No priority support',
        'No advanced analytics'
      ],
      cta: 'Start Free Trial',
      highlighted: false,
      icon: Zap
    },
    {
      name: 'Professional',
      description: 'For growing businesses with higher volume',
      monthlyPrice: 99,
      yearlyPrice: 990,
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
        'Multi-currency support'
      ],
      limitations: [
        'No dedicated account manager',
        'No custom integrations'
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      popular: true,
      icon: Sparkles
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyPrice: 499,
      yearlyPrice: 4990,
      features: [
        'Unlimited transactions',
        'Unlimited team members',
        'Custom analytics & reporting',
        '24/7 phone & email support',
        'Full API access',
        'Advanced security & compliance',
        'Mobile app access',
        'White-label solution',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
        'On-premise deployment option',
        'Custom contract terms'
      ],
      limitations: [],
      cta: 'Contact Sales',
      highlighted: false,
      icon: Building,
      enterprise: true
    }
  ]

  const faqs = [
    {
      question: 'Can I change plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and ACH transfers for Enterprise plans.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees for any of our plans. You only pay the monthly or yearly subscription.'
    },
    {
      question: 'What happens if I exceed my transaction limit?',
      answer: 'We\'ll notify you when you reach 80% of your limit. You can upgrade your plan or pay for additional transactions at $0.50 each.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-indigo-600 font-medium">
                Pricing
              </Link>
              <Link href="/docs" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                Docs
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                About
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" asChild>
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Save 20% with yearly billing
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required.
            Cancel anytime with no questions asked.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg ${billingPeriod === 'monthly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-indigo-600 rounded-full transition-colors"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                billingPeriod === 'yearly' ? 'translate-x-8' : ''
              }`} />
            </button>
            <span className={`text-lg ${billingPeriod === 'yearly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingPeriod === 'yearly' && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-xl border ${
                plan.highlighted
                  ? 'border-indigo-500 ring-2 ring-indigo-500 transform scale-105'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <plan.icon className="h-8 w-8 text-indigo-600" />
                  {plan.enterprise && (
                    <Shield className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                <PricingCheckout
                  plan={plan.enterprise ? 'enterprise' : plan.name.toLowerCase() as 'starter' | 'professional'}
                  billing={billingPeriod}
                  highlighted={plan.highlighted}
                  cta={plan.cta}
                />

                <div className="mt-8 space-y-3">
                  <p className="text-sm font-semibold text-gray-900 mb-4">Everything in {plan.name}:</p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-start">
                      <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Trusted by 10,000+ businesses worldwide
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">$127M+</div>
              <p className="text-gray-600">Processed monthly</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">99.99%</div>
              <p className="text-gray-600">Uptime SLA</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">195+</div>
              <p className="text-gray-600">Countries supported</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
              <p className="text-gray-600">Customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group">
                <summary className="flex items-center justify-between cursor-pointer p-6 bg-white rounded-lg hover:bg-gray-50">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 bg-white rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button variant="outline" asChild>
              <Link href="/contact">
                <span className="flex items-center">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start your 14-day free trial today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            No credit card required. Cancel anytime.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" asChild>
            <Link href="/register">
              <span className="flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}