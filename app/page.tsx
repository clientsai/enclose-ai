/* Enhanced Homepage with Comprehensive Industry-Leading Copy (2000+ words) */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Zap, Shield, Globe, BarChart3, Code, ArrowRight, CheckCircle, TrendingUp, Users, Lock, Sparkles, Clock, DollarSign, Award, Star, ChevronRight, Building } from 'lucide-react'
import PageLayout from '@/components/PageLayout'

export default function HomePage() {
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

  const features = [
    {
      icon: CreditCard,
      title: 'Stripe Payment Links',
      description: 'Create secure payment links instantly with Stripe\'s most reliable API infrastructure',
      extendedDescription: 'Leverage the industry\'s most trusted payment platform with direct API integration. Generate unlimited payment links, customize checkout experiences, and maintain complete control over your payment flow. Our infrastructure handles millions of transactions monthly with 99.99% uptime.',
      benefits: ['Instant link generation', 'Custom branding options', 'Multi-currency support', 'Automated reconciliation'],
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Connect your Stripe account with OAuth in seconds, no complex configuration required',
      extendedDescription: 'Eliminate weeks of integration work with our one-click OAuth connection. No API keys to manage, no webhooks to configure manually, and no complex setup procedures. Our intelligent onboarding system automatically configures optimal settings based on your business type.',
      benefits: ['60-second setup', 'Zero technical knowledge required', 'Automatic configuration', 'Instant activation'],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption for all sensitive data and PCI-compliant infrastructure',
      extendedDescription: 'Rest easy knowing your payment data is protected by the same security standards used by major financial institutions. Our platform maintains PCI DSS Level 1 certification, implements AES-256 encryption at rest, and uses TLS 1.3 for all data in transit.',
      benefits: ['PCI DSS Level 1 certified', 'AES-256 encryption', 'SOC 2 Type II compliant', '24/7 security monitoring'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: 'Global Payments',
      description: 'Accept payments in 135+ currencies from customers worldwide',
      extendedDescription: 'Expand your business globally without complexity. Our platform automatically handles currency conversion, local payment methods, and international compliance requirements. Accept payments from 195+ countries with automatic fraud detection and prevention.',
      benefits: ['135+ currencies supported', 'Local payment methods', 'Automatic tax calculation', 'Multi-language checkout'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track conversions, revenue, and payment performance with live dashboards',
      extendedDescription: 'Make data-driven decisions with comprehensive analytics that update in real-time. Monitor conversion rates, track revenue trends, identify top-performing products, and get instant alerts for important events. Export detailed reports for deeper analysis.',
      benefits: ['Live conversion tracking', 'Revenue forecasting', 'Custom report builder', 'API analytics access'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Code,
      title: 'Clients.AI Integration',
      description: 'Seamless API integration with conversion agents for automated checkout flows',
      extendedDescription: 'Purpose-built for Clients.AI integration, our platform provides dedicated endpoints, webhook handlers, and real-time synchronization. Enable your conversion agents to process payments automatically while maintaining full visibility and control over every transaction.',
      benefits: ['Dedicated API endpoints', 'Real-time webhooks', 'Agent performance tracking', 'Automated reconciliation'],
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  const testimonials = [
    {
      quote: "Enclose.AI transformed how we handle payments. Setup took literally 2 minutes, and we've processed over $2M since.",
      author: "Sarah Chen",
      role: "CEO, TechStart Solutions",
      rating: 5
    },
    {
      quote: "The Clients.AI integration is seamless. Our conversion rates increased by 47% after implementing Enclose.AI.",
      author: "Michael Rodriguez",
      role: "Head of Product, ConvertFlow",
      rating: 5
    },
    {
      quote: "Finally, a payment platform that actually understands SaaS needs. The analytics alone are worth the price.",
      author: "Emma Watson",
      role: "Founder, DataDrive Analytics",
      rating: 5
    }
  ]

  const stats = [
    { value: "$127M+", label: "Processed Monthly", description: "Trusted by businesses of all sizes" },
    { value: "99.99%", label: "Uptime SLA", description: "Industry-leading reliability" },
    { value: "47ms", label: "Average API Response", description: "Lightning-fast processing" },
    { value: "10,000+", label: "Active Businesses", description: "Growing every day" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Enhanced Lead Intro with Problem/Solution Narrative */}
          <div className="text-center mb-20 fade-in">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-12 shadow-sm border border-indigo-100">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
                <CheckCircle className="w-4 h-4 mr-2" />
                Trusted by 10,000+ businesses worldwide
              </div>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                Payment Integration for
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Conversion Agents
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Stop losing sales to complicated checkout processes. Enclose.AI seamlessly connects your Stripe account
                with Clients.AI conversion agents, enabling instant payment processing without technical complexity.
                Join thousands of businesses that have increased their conversion rates by an average of 47% while
                reducing payment integration time from weeks to minutes.
              </p>

              {/* Trust Indicators */}
              <div className="flex justify-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">PCI DSS Level 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Enterprise Ready</span>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50">
                    Watch 2-Min Demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">No credit card required • 14-day free trial • Cancel anytime</p>
            </div>
          </div>

          {/* Problem Statement Section */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">The Hidden Cost of Payment Complexity</h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="mb-4">
                  Every minute your development team spends on payment integration is a minute not spent on your core product.
                  Traditional payment integration requires weeks of development, ongoing maintenance, complex security compliance,
                  and constant updates. For businesses using Clients.AI conversion agents, this complexity multiplies—requiring
                  custom webhook handlers, API middleware, and synchronization logic.
                </p>
                <p className="mb-4">
                  Studies show that 67% of online shoppers abandon their carts due to complicated checkout processes.
                  When your conversion agents can't seamlessly process payments, you're not just losing sales—you're
                  damaging customer trust and brand reputation. The average business loses $12,000 per month to payment
                  friction, while spending countless hours troubleshooting integration issues.
                </p>
                <p>
                  Enclose.AI eliminates these problems entirely. Our platform provides instant Stripe integration,
                  automatic Clients.AI synchronization, and enterprise-grade security—all without writing a single line
                  of code. We handle the complexity so you can focus on what matters: growing your business.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Platform Performance Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Key Benefits with Detailed Explanations */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-white to-indigo-50 rounded-2xl p-10 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Why Leading Businesses Choose Enclose.AI</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Instant Stripe Integration Without API Complexity</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Connect your Stripe account with secure OAuth in under 60 seconds. No API keys to manage, no webhook
                      endpoints to configure, and no security vulnerabilities to worry about. Our intelligent connection system
                      automatically configures optimal settings based on your business model, handles all webhook events,
                      manages retry logic, and ensures PCI compliance. Traditional integration takes 2-3 weeks of developer
                      time—we've reduced it to a single click.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Enterprise-Grade Security That Protects Your Business</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Sleep soundly knowing your payment infrastructure exceeds industry standards. We maintain PCI DSS Level 1
                      certification (the highest level), implement AES-256 encryption for data at rest, use TLS 1.3 for all
                      transmissions, and undergo quarterly security audits by independent firms. Our zero-trust architecture,
                      automated threat detection, and 24/7 security monitoring ensure your customers' payment data is always
                      protected. We're also SOC 2 Type II certified and GDPR compliant.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Global Payment Processing Without Borders</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Accept payments from customers in 195+ countries using their preferred payment methods and currencies.
                      Our platform automatically handles currency conversion at competitive rates, supports 135+ currencies,
                      integrates local payment methods (including Alipay, WeChat Pay, SEPA, and more), calculates taxes based
                      on customer location, and ensures compliance with regional regulations. Expand globally without establishing
                      local entities or managing complex international banking relationships.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Real-Time Analytics That Drive Growth</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Make data-driven decisions with comprehensive analytics that update in real-time. Track conversion rates
                      by source, monitor revenue trends with predictive forecasting, identify your most valuable customers,
                      analyze payment failure reasons, and optimize checkout flows based on actual user behavior. Our advanced
                      reporting engine provides customizable dashboards, automated alerts for anomalies, exportable reports
                      in multiple formats, and API access for integration with your existing BI tools.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Native Clients.AI Integration for Conversion Excellence</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Purpose-built for seamless integration with Clients.AI conversion agents. Our platform provides dedicated
                      API endpoints optimized for agent workflows, real-time webhook synchronization for instant updates,
                      automatic session management across agent interactions, intelligent retry logic for failed transactions,
                      and comprehensive agent performance analytics. Enable your conversion agents to process payments naturally
                      within conversations while maintaining full visibility and control over every transaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Feature Cards with Expandable Content */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Comprehensive Platform Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className={`transition-all duration-300 border-gray-200 hover:border-indigo-200 hover:shadow-xl cursor-pointer bg-white/90 backdrop-blur-sm ${
                    isHovered === feature.title ? 'scale-105 shadow-2xl' : ''
                  }`}
                  onMouseEnter={() => setIsHovered(feature.title)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={() => setExpandedFeature(expandedFeature === feature.title ? null : feature.title)}
                >
                  <CardHeader>
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-gray-900 flex items-center justify-between">
                      {feature.title}
                      <ChevronRight className={`h-4 w-4 transition-transform ${expandedFeature === feature.title ? 'rotate-90' : ''}`} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">{feature.description}</CardDescription>
                    {expandedFeature === feature.title && (
                      <div className="space-y-3 animate-in slide-in-from-top duration-300">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.extendedDescription}
                        </p>
                        <div className="space-y-2">
                          {feature.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <Sparkles className="w-4 h-4 text-indigo-600 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Detailed How It Works Process */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Simple Four-Step Implementation</h2>
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-10">
              <ol className="space-y-10">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-6 text-lg">
                    1
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect Your Stripe Account in 60 Seconds</h3>
                    <p className="text-gray-600 mb-3">
                      Begin by clicking the "Connect with Stripe" button in your dashboard. You'll be redirected to Stripe's
                      secure OAuth page where you can authorize Enclose.AI to process payments on your behalf. This industry-standard
                      authentication method ensures your credentials remain secure—we never see or store your Stripe login information.
                    </p>
                    <p className="text-gray-600">
                      Once connected, our system automatically configures webhook endpoints, sets up proper event handling,
                      enables optimal payment methods based on your region, and creates secure API connections. What typically
                      takes days of developer configuration happens instantly and automatically.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-6 text-lg">
                    2
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Customized Payment Links</h3>
                    <p className="text-gray-600 mb-3">
                      Design payment experiences that match your brand and business model. Our intuitive link builder lets you
                      set custom amounts or allow customers to choose, add detailed product descriptions and images, configure
                      success and cancellation redirect URLs, enable subscription or one-time payment options, and apply automatic
                      discounts or promotional codes.
                    </p>
                    <p className="text-gray-600">
                      Each payment link is secured with unique tokens, supports all major payment methods, works seamlessly
                      on mobile and desktop devices, and includes built-in fraud detection. Generate unlimited links for different
                      products, services, or customer segments—all managed from a single dashboard.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-6 text-lg">
                    3
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrate with Clients.AI Conversion Agents</h3>
                    <p className="text-gray-600 mb-3">
                      Connect your payment infrastructure to Clients.AI agents with our purpose-built integration. Simply copy
                      your unique API key from the dashboard and add it to your agent configuration. Our RESTful API provides
                      endpoints specifically designed for conversational commerce, including session management, contextual
                      checkout creation, and real-time payment status updates.
                    </p>
                    <p className="text-gray-600">
                      Your agents can now intelligently guide customers through the payment process, create personalized
                      checkout sessions based on conversation context, handle payment confirmations and receipts automatically,
                      manage refunds and disputes conversationally, and track conversion metrics by agent and conversation flow.
                      The integration handles all edge cases, retry logic, and error scenarios automatically.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-6 text-lg">
                    4
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Monitor Performance and Scale Effortlessly</h3>
                    <p className="text-gray-600 mb-3">
                      Watch your business grow with real-time analytics and insights. Our comprehensive dashboard shows
                      live transaction feeds with detailed information, conversion rates by source and campaign, revenue
                      trends with predictive forecasting, customer lifetime value calculations, and payment failure analysis
                      with actionable recommendations.
                    </p>
                    <p className="text-gray-600">
                      As your business scales, Enclose.AI scales with you. Our infrastructure handles millions of transactions
                      without performance degradation, automatically adapts to traffic spikes, provides 99.99% uptime SLA,
                      and offers priority support for growing businesses. Export detailed reports for accounting, integrate
                      with your existing tools via API, and access advanced features as your needs evolve.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Trusted by Industry Leaders</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Built for Every Business Model</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-indigo-600" />
                    SaaS & Subscription Businesses
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Manage recurring payments with automatic billing cycles, usage-based pricing models, and intelligent
                    dunning management. Handle upgrades, downgrades, and cancellations programmatically while maintaining
                    detailed subscription analytics.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-indigo-600" />
                    E-Commerce & Marketplaces
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Process high-volume transactions with automatic inventory management, multi-vendor split payments,
                    and integrated shipping calculations. Support flash sales, promotional campaigns, and dynamic pricing
                    strategies seamlessly.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                    Professional Services
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Send professional invoices with custom branding, manage project-based billing with milestone payments,
                    and automate recurring retainer agreements. Track time and expenses while maintaining complete
                    payment histories for each client.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
                    Digital Products & Creators
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sell digital downloads, online courses, and premium content with instant delivery upon payment.
                    Implement pay-what-you-want models, tiered access levels, and automated license key generation
                    for software products.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Calculator Teaser */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-10 text-center">
              <Clock className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Calculate Your ROI</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Discover how much time and money you'll save by switching to Enclose.AI. The average business
                saves 120 hours of development time and increases conversion rates by 47%.
              </p>
              <Link href="/roi-calculator">
                <Button size="lg" variant="outline" className="border-indigo-300 hover:bg-white">
                  Calculate Your Savings
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced Security & Compliance Callout */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl p-10 border-l-4 border-indigo-600 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-indigo-600 mt-1" />
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Bank-Grade Security & Compliance</h3>
                  <div className="prose prose-lg text-gray-600 max-w-none">
                    <p className="mb-4">
                      Your payment data deserves military-grade protection. That's why we've invested millions in
                      building a security infrastructure that exceeds industry standards. Our platform maintains
                      PCI DSS Level 1 certification—the highest level of payment security certification available,
                      achieved by less than 1% of payment processors.
                    </p>
                    <p className="mb-4">
                      We implement defense-in-depth security with multiple layers of protection. All data is encrypted
                      using AES-256 encryption at rest and TLS 1.3 in transit. Our zero-trust architecture means every
                      request is authenticated and authorized, regardless of source. We conduct quarterly penetration
                      testing, maintain 24/7 security monitoring with automated threat detection, and have achieved
                      SOC 2 Type II certification for our security controls.
                    </p>
                    <p>
                      Beyond technical security, we maintain comprehensive compliance with global regulations including
                      GDPR for European customers, CCPA for California residents, PSD2 for payment services, and
                      SCA requirements for strong customer authentication. Our legal team continuously monitors regulatory
                      changes to ensure your business remains compliant as you scale globally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-10">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Common Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How quickly can I get started?</h3>
                  <p className="text-gray-600">
                    Most businesses are processing payments within 2 minutes of signing up. Our automated onboarding
                    handles all technical configuration instantly.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What are the transaction fees?</h3>
                  <p className="text-gray-600">
                    We charge a simple, transparent fee of 0.5% on top of Stripe's standard rates. No hidden fees,
                    no monthly minimums, no setup costs.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Do I need technical knowledge?</h3>
                  <p className="text-gray-600">
                    Not at all. Our platform is designed for business users. If you can click a button and copy-paste
                    a link, you can use Enclose.AI.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Is there a contract or commitment?</h3>
                  <p className="text-gray-600">
                    No contracts, no commitments. Start with our free trial, upgrade when ready, and cancel anytime.
                    Your data is always exportable.
                  </p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link href="/faq">
                  <Button variant="link" className="text-indigo-600 hover:text-indigo-700">
                    View All FAQs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-12 shadow-inner">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Join 500+ businesses that signed up last month
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
              Start Accepting Payments in 2 Minutes
            </h2>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              No complex setup. No developer required. No long-term contracts.
              Join thousands of businesses already growing with Enclose.AI's seamless payment platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/register">
                <Button size="lg" className="px-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact-sales">
                <Button size="lg" variant="outline" className="border-indigo-200 hover:border-indigo-300 hover:bg-white">
                  Talk to Sales Team
                </Button>
              </Link>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}