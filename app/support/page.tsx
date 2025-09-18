'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, Book, MessageSquare, Phone, Mail, Clock, ChevronDown, ChevronRight, FileText, Video, Download, ExternalLink, CheckCircle, AlertCircle, HelpCircle, Zap } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const supportChannels = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      responseTime: 'Instant',
      action: 'Start Chat',
      primary: true
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Detailed assistance via email',
      availability: '24/7',
      responseTime: '<2 hours',
      action: 'support@enclose.ai'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with an expert',
      availability: 'Mon-Fri 6am-6pm PST',
      responseTime: 'Immediate',
      action: '+1 (415) 555-0100'
    }
  ]

  const helpCategories = [
    { id: 'all', name: 'All Topics', count: 127 },
    { id: 'getting-started', name: 'Getting Started', count: 23 },
    { id: 'integration', name: 'API Integration', count: 34 },
    { id: 'security', name: 'Security & Compliance', count: 18 },
    { id: 'billing', name: 'Billing & Payments', count: 15 },
    { id: 'troubleshooting', name: 'Troubleshooting', count: 22 },
    { id: 'advanced', name: 'Advanced Features', count: 15 }
  ]

  const popularArticles = [
    {
      title: 'Quick Start Guide: Setting Up Your First Payment Flow',
      category: 'Getting Started',
      readTime: '5 min read',
      views: '12.3k views',
      type: 'guide'
    },
    {
      title: 'API Authentication and Security Best Practices',
      category: 'Security',
      readTime: '8 min read',
      views: '9.1k views',
      type: 'guide'
    },
    {
      title: 'Webhook Implementation and Testing',
      category: 'Integration',
      readTime: '12 min read',
      views: '7.8k views',
      type: 'tutorial'
    },
    {
      title: 'Understanding Payment Status Codes',
      category: 'Troubleshooting',
      readTime: '6 min read',
      views: '6.5k views',
      type: 'reference'
    },
    {
      title: 'Advanced Fraud Detection Configuration',
      category: 'Advanced',
      readTime: '15 min read',
      views: '4.2k views',
      type: 'guide'
    },
    {
      title: 'Multi-currency Processing Setup',
      category: 'Integration',
      readTime: '10 min read',
      views: '5.9k views',
      type: 'tutorial'
    }
  ]

  const frequentlyAskedQuestions = [
    {
      question: 'How do I get started with Enclose.AI?',
      answer: 'Getting started is simple! First, create your free account and complete the verification process. Then, generate your API keys from the dashboard, review our Quick Start Guide, and make your first test transaction. Our onboarding wizard will guide you through each step, and you can be processing payments within minutes.'
    },
    {
      question: 'What payment methods do you support?',
      answer: 'Enclose.AI supports all major payment methods including credit/debit cards (Visa, Mastercard, American Express, Discover), digital wallets (Apple Pay, Google Pay, PayPal), bank transfers (ACH, wire transfers), cryptocurrency payments (Bitcoin, Ethereum, and 50+ altcoins), and local payment methods in 150+ countries.'
    },
    {
      question: 'How secure is Enclose.AI?',
      answer: 'Security is our top priority. We are PCI DSS Level 1 certified, employ end-to-end encryption, use advanced fraud detection with machine learning, maintain SOC 2 Type II compliance, and undergo regular security audits. Your data and transactions are protected by bank-grade security measures.'
    },
    {
      question: 'What are your transaction fees?',
      answer: 'Our pricing is transparent and competitive. We offer a simple 2.9% + $0.30 per transaction for standard processing, with volume discounts available for high-volume merchants. Enterprise customers receive custom pricing. There are no setup fees, monthly fees, or hidden charges.'
    },
    {
      question: 'How long does it take to receive payouts?',
      answer: 'Standard payouts are processed within 1-2 business days. Express payouts (available for qualified merchants) can be received within 30 minutes for a small fee. Payout timing may vary based on your bank and location.'
    },
    {
      question: 'Can I test the API before going live?',
      answer: 'Absolutely! We provide a comprehensive sandbox environment that mirrors our production API. You can test all features, payment methods, and scenarios without processing real transactions. Our test environment includes detailed logging and debugging tools.'
    },
    {
      question: 'Do you provide webhooks for real-time notifications?',
      answer: 'Yes, we offer robust webhook support for real-time event notifications. You can subscribe to events like successful payments, failed transactions, refunds, disputes, and more. Our webhooks include retry logic and signature verification for reliability and security.'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We provide 24/7 support through multiple channels: live chat for instant assistance, email support with <2 hour response times, phone support during business hours, comprehensive documentation, video tutorials, and dedicated account managers for enterprise clients.'
    }
  ]

  const resources = [
    {
      icon: Book,
      title: 'Developer Documentation',
      description: 'Comprehensive API guides, references, and tutorials',
      items: ['API Reference', 'SDK Downloads', 'Code Examples', 'Best Practices'],
      action: 'Browse Docs',
      link: '/docs'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      items: ['Quick Start Videos', 'Integration Tutorials', 'Feature Walkthroughs', 'Webinar Recordings'],
      action: 'Watch Videos',
      link: '/tutorials'
    },
    {
      icon: Download,
      title: 'SDKs & Tools',
      description: 'Official libraries and development tools',
      items: ['JavaScript SDK', 'Python SDK', 'PHP SDK', 'Mobile SDKs'],
      action: 'Download SDKs',
      link: '/downloads'
    },
    {
      icon: ExternalLink,
      title: 'Community Forum',
      description: 'Connect with other developers and share knowledge',
      items: ['Developer Discussions', 'Code Sharing', 'Feature Requests', 'Best Practices'],
      action: 'Join Community',
      link: '/community'
    }
  ]

  const statusIndicators = [
    { service: 'Payment Processing API', status: 'operational', uptime: '99.99%' },
    { service: 'Webhook Delivery', status: 'operational', uptime: '99.98%' },
    { service: 'Dashboard & Portal', status: 'operational', uptime: '99.97%' },
    { service: 'Mobile SDKs', status: 'operational', uptime: '99.96%' }
  ]

  const filteredArticles = selectedCategory === 'all'
    ? popularArticles
    : popularArticles.filter(article =>
        article.category.toLowerCase().includes(selectedCategory.replace('-', ' '))
      )

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
            Support Center
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get the help you need to succeed with comprehensive documentation, tutorials, and 24/7 expert support.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, guides, and FAQs..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Status */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                All Systems Operational
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statusIndicators.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{service.service}</p>
                      <p className="text-xs text-gray-500">{service.uptime} uptime</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support Channels */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Get Instant Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {supportChannels.map((channel, idx) => (
              <Card key={idx} className={`relative overflow-hidden transition-all hover:shadow-xl ${channel.primary ? 'ring-2 ring-indigo-500' : ''}`}>
                {channel.primary && (
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <channel.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {channel.availability}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{channel.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  <p className="text-sm text-indigo-600 font-medium mb-4">
                    Response time: {channel.responseTime}
                  </p>
                  <Button
                    className={`w-full ${channel.primary ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' : ''}`}
                    variant={channel.primary ? 'default' : 'outline'}
                  >
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Articles */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Popular Help Articles</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {helpCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">
                      {article.category}
                    </span>
                    <FileText className="h-4 w-4 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.readTime}</span>
                    <span>{article.views}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/docs">
              <Button variant="outline" size="lg">
                Browse All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Developer Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <resource.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <ul className="space-y-1 mb-4">
                    {resource.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-sm text-gray-500 flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={resource.link}>
                    <Button variant="outline" className="w-full">
                      {resource.action}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {frequentlyAskedQuestions.map((faq, idx) => (
              <Card key={idx} className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    {expandedFaq === idx ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still need help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our expert support team is available 24/7 to assist you
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}