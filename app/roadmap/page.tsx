import PageLayout from '@/components/PageLayout'
import { Rocket, Target, Clock, CheckCircle, ChevronRight, Star, Users, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function RoadmapPage() {
  const roadmapItems = {
    shipped: [
      {
        title: 'Stripe OAuth Integration',
        description: 'One-click Stripe account connection with secure OAuth',
        date: 'December 2024',
        icon: '🔐',
      },
      {
        title: 'Clients.AI Integration',
        description: 'Native integration with AI conversion agents',
        date: 'November 2024',
        icon: '🤖',
      },
      {
        title: 'Real-time Analytics Dashboard',
        description: 'Comprehensive analytics with conversion tracking',
        date: 'October 2024',
        icon: '📊',
      },
      {
        title: 'Multi-currency Support',
        description: 'Accept payments in 135+ currencies',
        date: 'September 2024',
        icon: '🌍',
      },
    ],
    inProgress: [
      {
        title: 'Subscription Billing',
        description: 'Recurring payments with smart retry logic and dunning management',
        progress: 75,
        eta: 'Q1 2025',
        icon: '🔄',
      },
      {
        title: 'Mobile SDKs',
        description: 'Native iOS and Android SDKs for seamless mobile integration',
        progress: 60,
        eta: 'Q1 2025',
        icon: '📱',
      },
      {
        title: 'Advanced Fraud Detection',
        description: 'ML-powered fraud prevention with behavioral analysis',
        progress: 45,
        eta: 'Q2 2025',
        icon: '🛡️',
      },
      {
        title: 'Webhook Builder',
        description: 'Visual webhook configuration with testing tools',
        progress: 30,
        eta: 'Q2 2025',
        icon: '🔗',
      },
    ],
    planned: [
      {
        quarter: 'Q2 2025',
        items: [
          {
            title: 'Marketplace Payments',
            description: 'Split payments and multi-vendor support',
            votes: 234,
            icon: '🛍️',
          },
          {
            title: 'Tax Automation',
            description: 'Automatic tax calculation and compliance',
            votes: 189,
            icon: '📋',
          },
          {
            title: 'Custom Checkout Designer',
            description: 'Drag-and-drop checkout page builder',
            votes: 156,
            icon: '🎨',
          },
        ],
      },
      {
        quarter: 'Q3 2025',
        items: [
          {
            title: 'Cryptocurrency Payments',
            description: 'Accept Bitcoin, Ethereum, and stablecoins',
            votes: 412,
            icon: '₿',
          },
          {
            title: 'AI-Powered Pricing',
            description: 'Dynamic pricing optimization based on demand',
            votes: 298,
            icon: '🧠',
          },
          {
            title: 'Voice Commerce',
            description: 'Process payments through voice assistants',
            votes: 145,
            icon: '🎤',
          },
        ],
      },
      {
        quarter: 'Q4 2025',
        items: [
          {
            title: 'Blockchain Settlement',
            description: 'Instant settlement via blockchain rails',
            votes: 523,
            icon: '⛓️',
          },
          {
            title: 'Biometric Authentication',
            description: 'Fingerprint and face ID payment confirmation',
            votes: 367,
            icon: '👆',
          },
          {
            title: 'Global Compliance Suite',
            description: 'Automated compliance for 190+ countries',
            votes: 289,
            icon: '🌐',
          },
        ],
      },
    ],
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Product Roadmap
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our vision for the future of payment processing. Vote on features and shape our development priorities.
            </p>
          </div>

          {/* Shipped Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Recently Shipped</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {roadmapItems.shipped.map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 opacity-90">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <p className="text-xs text-gray-500">Shipped {item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">In Development</h2>
            </div>
            <div className="space-y-4">
              {roadmapItems.inProgress.map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <span className="text-sm text-gray-500">ETA: {item.eta}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      <div className="relative">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="absolute right-0 -top-5 text-xs text-gray-500">{item.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Planned Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Target className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Planned Features</h2>
            </div>
            <div className="space-y-12">
              {roadmapItems.planned.map((quarter) => (
                <div key={quarter.quarter}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ChevronRight className="h-5 w-5 mr-2 text-indigo-600" />
                    {quarter.quarter}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {quarter.items.map((item) => (
                      <div key={item.title} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700">
                            <Star className="h-4 w-4" />
                            <span>{item.votes} votes</span>
                          </button>
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            Vote
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Request Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white mb-12">
            <MessageSquare className="h-12 w-12 mx-auto mb-6 text-white/90" />
            <h2 className="text-3xl font-bold mb-4">Have a Feature Request?</h2>
            <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
              We're building Enclose.AI for you. Share your ideas and vote on features that matter to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                <Users className="h-5 w-5 mr-2" />
                Join Community Forum
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Submit Feature Request
              </Button>
            </div>
          </div>

          {/* Development Philosophy */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Development Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Customer-Driven</h3>
                <p className="text-sm text-gray-600">
                  Every feature we build solves real problems for real businesses. Your feedback directly shapes our priorities.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Rapid Iteration</h3>
                <p className="text-sm text-gray-600">
                  We ship updates weekly, not quarterly. Small, frequent improvements compound into transformative experiences.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quality First</h3>
                <p className="text-sm text-gray-600">
                  We'd rather ship one perfect feature than ten mediocre ones. Every release meets our exacting standards.
                </p>
              </div>
            </div>
          </div>

          {/* Subscribe for Updates */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Stay informed about new features and releases</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}