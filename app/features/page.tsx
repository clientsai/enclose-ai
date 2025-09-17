'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe, CreditCard, BarChart3, Code, Lock, Users, CheckCircle, TrendingUp, DollarSign, Clock, Building, Smartphone, Cloud, Key, RefreshCw } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'

export default function FeaturesPage() {
  const features = [
    {
      category: 'Payment Processing',
      icon: CreditCard,
      description: 'Industry-leading payment infrastructure',
      items: [
        {
          title: 'Instant Stripe Connect',
          description: 'Connect your Stripe account in 60 seconds with secure OAuth 2.0 authentication. No API keys to manage.',
          icon: Zap
        },
        {
          title: 'Global Currency Support',
          description: 'Accept payments in 135+ currencies with automatic conversion at competitive rates.',
          icon: Globe
        },
        {
          title: 'Smart Payment Routing',
          description: 'Automatically route payments through the most cost-effective processors based on transaction type.',
          icon: RefreshCw
        },
        {
          title: 'Subscription Management',
          description: 'Handle recurring payments, upgrades, downgrades, and cancellations programmatically.',
          icon: Clock
        }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: Shield,
      description: 'Bank-grade security for peace of mind',
      items: [
        {
          title: 'PCI DSS Level 1',
          description: 'Highest level of payment security certification, achieved by less than 1% of payment processors.',
          icon: Shield
        },
        {
          title: 'AES-256 Encryption',
          description: 'Military-grade encryption for all data at rest and TLS 1.3 for data in transit.',
          icon: Lock
        },
        {
          title: 'SOC 2 Type II Certified',
          description: 'Independently audited security controls meeting enterprise compliance requirements.',
          icon: CheckCircle
        },
        {
          title: 'GDPR & CCPA Compliant',
          description: 'Full compliance with international privacy regulations including data portability and deletion.',
          icon: Key
        }
      ]
    },
    {
      category: 'Analytics & Reporting',
      icon: BarChart3,
      description: 'Data-driven insights for growth',
      items: [
        {
          title: 'Real-time Dashboard',
          description: 'Monitor transactions, revenue, and conversion rates with live updates every second.',
          icon: TrendingUp
        },
        {
          title: 'Custom Reports',
          description: 'Build custom reports with drag-and-drop report builder and schedule automated delivery.',
          icon: BarChart3
        },
        {
          title: 'Revenue Forecasting',
          description: 'AI-powered predictions help you plan for growth with 95% accuracy.',
          icon: DollarSign
        },
        {
          title: 'Cohort Analysis',
          description: 'Track customer lifetime value, retention rates, and behavior patterns over time.',
          icon: Users
        }
      ]
    },
    {
      category: 'Developer Tools',
      icon: Code,
      description: 'Built by developers, for developers',
      items: [
        {
          title: 'RESTful API',
          description: 'Comprehensive API with SDKs for Python, Node.js, Ruby, PHP, and more.',
          icon: Code
        },
        {
          title: 'Webhook Management',
          description: 'Real-time event notifications with automatic retry logic and signature verification.',
          icon: RefreshCw
        },
        {
          title: 'Sandbox Environment',
          description: 'Full-featured testing environment with test card numbers and simulated events.',
          icon: Cloud
        },
        {
          title: 'API Rate Limiting',
          description: 'Intelligent rate limiting with 10,000 requests per hour and burst protection.',
          icon: Zap
        }
      ]
    },
    {
      category: 'Platform Features',
      icon: Building,
      description: 'Everything you need to scale',
      items: [
        {
          title: 'White-Label Solution',
          description: 'Customize every aspect of the checkout experience with your brand.',
          icon: Building
        },
        {
          title: 'Mobile SDKs',
          description: 'Native iOS and Android SDKs for seamless mobile integration.',
          icon: Smartphone
        },
        {
          title: 'Multi-tenant Architecture',
          description: 'Isolated environments for each customer with dedicated resources.',
          icon: Users
        },
        {
          title: '24/7 Support',
          description: 'Round-the-clock support via phone, email, and live chat with <2 minute response time.',
          icon: Clock
        }
      ]
    }
  ]

  const comparison = [
    { feature: 'Setup Time', us: '2 minutes', others: '2-3 weeks' },
    { feature: 'API Response Time', us: '47ms average', others: '200-500ms' },
    { feature: 'Uptime SLA', us: '99.99%', others: '99.9%' },
    { feature: 'Currencies Supported', us: '135+', others: '25-50' },
    { feature: 'Security Certification', us: 'PCI DSS Level 1', others: 'PCI DSS Level 2-4' },
    { feature: 'Support Response', us: '<2 minutes', others: '24-48 hours' }
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
              <Link href="/features" className="text-indigo-600 font-medium">
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
            Everything You Need to Accept Payments
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From instant setup to enterprise-grade security, we've built every feature
            you need to process payments at scale. No compromises, no limitations.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          {features.map((category, categoryIdx) => (
            <div key={categoryIdx}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{category.category}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                        <item.icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How We Compare
          </h2>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Enclose.AI</th>
                  <th className="px-6 py-4 text-center">Traditional Solutions</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {row.us}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 10,000+ businesses processing payments the modern way
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}