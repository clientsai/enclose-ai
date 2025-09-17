'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, HelpCircle, ChevronDown, Search, CreditCard, Shield, Zap, Globe, Users, Code } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'getting-started', name: 'Getting Started', icon: Zap },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'api', name: 'API & Integration', icon: Code },
    { id: 'billing', name: 'Billing', icon: Users },
    { id: 'compliance', name: 'Compliance', icon: Globe }
  ]

  const faqs = [
    {
      category: 'getting-started',
      question: 'How quickly can I start accepting payments?',
      answer: 'You can start accepting payments in under 2 minutes! Simply sign up, connect your Stripe account via OAuth, and you\'re ready to generate payment links. No technical setup or API configuration required.'
    },
    {
      category: 'getting-started',
      question: 'Do I need technical knowledge to use Enclose.AI?',
      answer: 'No technical knowledge is required for basic use. Our platform is designed to be user-friendly with a simple dashboard. However, if you want to integrate our API, basic programming knowledge would be helpful. We provide comprehensive documentation and SDKs for popular languages.'
    },
    {
      category: 'getting-started',
      question: 'What is Stripe Connect and why do I need it?',
      answer: 'Stripe Connect is Stripe\'s solution for platforms that need to accept money and pay out to third parties. It handles all the complexity of payments, compliance, and global banking. You need it to securely process payments through our platform while maintaining full control over your funds.'
    },
    {
      category: 'payments',
      question: 'What payment methods are supported?',
      answer: 'We support all payment methods available through Stripe, including: credit/debit cards (Visa, Mastercard, Amex, Discover), digital wallets (Apple Pay, Google Pay), bank transfers (ACH, SEPA), and local payment methods in 135+ currencies. The specific methods available depend on your location and Stripe account settings.'
    },
    {
      category: 'payments',
      question: 'How long does it take to receive payments?',
      answer: 'Payout timing depends on your Stripe account settings. Typically, funds are available in 2-7 business days for new accounts, and 2 business days for established accounts. We don\'t hold your funds - they go directly to your Stripe account and then to your bank.'
    },
    {
      category: 'payments',
      question: 'Can I process refunds?',
      answer: 'Yes, you can process full or partial refunds directly from your dashboard or via our API. Refunds are processed through Stripe and typically appear on the customer\'s statement within 5-10 business days. Our transaction fee is not refunded, but Stripe\'s fees are.'
    },
    {
      category: 'payments',
      question: 'What happens if a payment fails?',
      answer: 'Failed payments are automatically handled by our system. We\'ll notify you via webhook and email, and provide detailed error information in your dashboard. Customers are shown clear error messages and can retry their payment. We also provide analytics on failure rates and reasons.'
    },
    {
      category: 'security',
      question: 'Is Enclose.AI secure?',
      answer: 'Yes, we maintain the highest security standards. We\'re PCI DSS Level 1 certified, use AES-256 encryption for data at rest, TLS 1.3 for data in transit, and undergo regular security audits. We never store sensitive card details - all payment data flows directly through Stripe\'s secure infrastructure.'
    },
    {
      category: 'security',
      question: 'How do you protect against fraud?',
      answer: 'We use Stripe\'s advanced fraud detection powered by machine learning, which analyzes billions of transactions. This includes real-time risk scoring, 3D Secure authentication when needed, and customizable fraud rules. You can also set additional security measures like address verification and CVV checks.'
    },
    {
      category: 'security',
      question: 'Who has access to my payment data?',
      answer: 'Only you have access to your complete payment data. Our team can only see metadata necessary for support (like transaction IDs and status). We use role-based access control, audit logging, and the principle of least privilege. Sensitive data is encrypted and access is strictly monitored.'
    },
    {
      category: 'api',
      question: 'What programming languages do you support?',
      answer: 'Our RESTful API can be used with any programming language. We provide official SDKs for Node.js, Python, PHP, Ruby, Go, and Java. We also have comprehensive documentation with examples in cURL and popular frameworks.'
    },
    {
      category: 'api',
      question: 'What are the API rate limits?',
      answer: 'Standard endpoints: 1000 requests/minute. Checkout creation: 100 requests/minute. Analytics: 60 requests/minute. If you need higher limits, contact our sales team for an enterprise plan. We return rate limit headers so you can track your usage.'
    },
    {
      category: 'api',
      question: 'How do webhooks work?',
      answer: 'Webhooks send real-time notifications to your server when events occur (like successful payments). You provide an endpoint URL, we POST event data to it. All webhooks include a signature for verification, automatic retries with exponential backoff, and detailed logs in your dashboard.'
    },
    {
      category: 'billing',
      question: 'What are your fees?',
      answer: 'We charge 0.5% per transaction on top of Stripe\'s standard fees (2.9% + 30¢ for US cards). Our subscription plans start at $29/month for additional features. There are no setup fees, monthly minimums, or hidden charges. Enterprise plans with volume discounts are available.'
    },
    {
      category: 'billing',
      question: 'Can I change or cancel my plan?',
      answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time from your dashboard. Changes take effect at the next billing cycle. There are no cancellation fees or long-term contracts. Your data remains accessible for 30 days after cancellation.'
    },
    {
      category: 'billing',
      question: 'Do you offer a free trial?',
      answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required to start. You can process unlimited test transactions during the trial. At the end, you can choose a plan that fits your needs or continue with our free tier (limited to 10 transactions/month).'
    },
    {
      category: 'compliance',
      question: 'Are you GDPR compliant?',
      answer: 'Yes, we\'re fully GDPR compliant. We provide data processing agreements, support data portability and deletion requests, maintain records of processing activities, and have appointed a Data Protection Officer. EU data is stored in EU data centers with appropriate safeguards.'
    },
    {
      category: 'compliance',
      question: 'Can I use Enclose.AI for regulated industries?',
      answer: 'Yes, we support businesses in regulated industries including healthcare (HIPAA compliance available), financial services, and e-commerce. We provide necessary compliance documentation and can sign BAAs for healthcare clients. Contact our sales team for specific compliance requirements.'
    },
    {
      category: 'compliance',
      question: 'What countries are supported?',
      answer: 'We support businesses in all countries where Stripe operates (46+ countries). Your customers can be from anywhere in the world (195+ countries). We handle currency conversion, tax calculation, and local payment methods automatically.'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchTerm === '' ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
              <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
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
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions about Enclose.AI
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, idx) => (
                <details key={idx} className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-6 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 bg-white rounded-b-lg">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600">Try searching for different keywords or browse all questions</p>
            </div>
          )}

          {/* Contact Support */}
          <div className="mt-12 text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button>Contact Support</Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline">View Documentation</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}