import PageLayout from '@/components/PageLayout'
import { Handshake, Zap, Shield, Globe, TrendingUp, Award, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PartnersPage() {
  const partnerTypes = [
    {
      title: 'Technology Partners',
      description: 'Integrate Enclose.AI into your platform and offer seamless payment experiences',
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      benefits: [
        'API access and technical support',
        'Co-marketing opportunities',
        'Revenue sharing programs',
        'Priority feature requests',
      ],
      cta: 'Become a Tech Partner',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Solution Partners',
      description: 'Help businesses implement and optimize their payment integration strategies',
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      benefits: [
        'Certification programs',
        'Sales enablement resources',
        'Lead generation support',
        'Partner portal access',
      ],
      cta: 'Join as Solution Partner',
      color: 'from-green-500 to-teal-500',
    },
    {
      title: 'Referral Partners',
      description: 'Earn rewards by referring new customers to Enclose.AI',
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      benefits: [
        'Competitive commission rates',
        'Real-time tracking dashboard',
        'Marketing materials',
        'Dedicated partner manager',
      ],
      cta: 'Start Referring',
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  const featuredPartners = [
    { name: 'Clients.AI', logo: 'CA', description: 'AI Conversion Platform', category: 'Technology' },
    { name: 'TechCorp Solutions', logo: 'TC', description: 'Enterprise Software', category: 'Solution' },
    { name: 'Digital Commerce Inc', logo: 'DC', description: 'E-commerce Platform', category: 'Technology' },
    { name: 'CloudPay Systems', logo: 'CP', description: 'Payment Infrastructure', category: 'Technology' },
    { name: 'Global Consulting', logo: 'GC', description: 'Business Consulting', category: 'Solution' },
    { name: 'FinTech Innovations', logo: 'FI', description: 'Financial Services', category: 'Technology' },
  ]

  const partnerBenefits = [
    {
      title: 'Revenue Growth',
      description: 'Access new revenue streams through referrals and integrations',
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    },
    {
      title: 'Technical Support',
      description: '24/7 dedicated support team for all partner integrations',
      icon: <Shield className="h-6 w-6 text-blue-600" />,
    },
    {
      title: 'Global Reach',
      description: 'Expand your business globally with our infrastructure',
      icon: <Globe className="h-6 w-6 text-purple-600" />,
    },
    {
      title: 'Training & Certification',
      description: 'Comprehensive training programs for your team',
      icon: <Award className="h-6 w-6 text-indigo-600" />,
    },
  ]

  const successStories = [
    {
      partner: 'Clients.AI',
      metric: '300%',
      description: 'Increase in conversion rates',
      quote: 'Enclose.AI transformed how we handle payments in our conversion agents.',
    },
    {
      partner: 'TechCorp Solutions',
      metric: '$2M+',
      description: 'Additional revenue generated',
      quote: 'The partnership has been invaluable for our enterprise clients.',
    },
    {
      partner: 'Digital Commerce',
      metric: '50,000+',
      description: 'Transactions processed monthly',
      quote: 'Seamless integration and exceptional support from day one.',
    },
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <Handshake className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Partner Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our ecosystem and grow your business with industry-leading payment solutions
            </p>
          </div>

          {/* Partner Types */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Choose Your Partnership</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {partnerTypes.map((type) => (
                <div key={type.title} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center mb-6">
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                    <p className="text-gray-600 mb-6">{type.description}</p>
                    <ul className="space-y-2 mb-8">
                      {type.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-gray-700">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2">
                      {type.cta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Partners */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Featured Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredPartners.map((partner) => (
                <div key={partner.name} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl font-bold text-indigo-600 mb-3 mx-auto group-hover:scale-110 transition-transform">
                    {partner.logo}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{partner.name}</h3>
                  <p className="text-xs text-gray-500">{partner.description}</p>
                  <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full mt-2">
                    {partner.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Benefits */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Why Partner with Enclose.AI?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerBenefits.map((benefit) => (
                <div key={benefit.title} className="bg-gradient-to-br from-white to-indigo-50 rounded-xl p-6 border border-indigo-100">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Partner Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story) => (
                <div key={story.partner} className="bg-white rounded-lg p-6">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{story.metric}</div>
                  <div className="text-sm text-gray-600 mb-4">{story.description}</div>
                  <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-gray-700">
                    "{story.quote}"
                  </blockquote>
                  <div className="mt-4 text-sm font-semibold text-gray-900">- {story.partner}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Grow Together?</h2>
            <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
              Join thousands of partners who are building the future of payment integration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/partners/apply"
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}