import PageLayout from '@/components/PageLayout'
import { Newspaper, Download, Calendar, Award, TrendingUp, Mail, FileText, Image } from 'lucide-react'
import Link from 'next/link'

export default function PressPage() {
  const pressReleases = [
    {
      date: 'January 15, 2025',
      title: 'Enclose.AI Raises $50M Series B to Expand Global Payment Infrastructure',
      excerpt: 'Leading payment integration platform secures funding to accelerate product development and international expansion.',
      category: 'Funding',
    },
    {
      date: 'December 20, 2024',
      title: 'Partnership with Clients.AI Brings Seamless Payments to AI Conversion Agents',
      excerpt: 'Strategic collaboration enables businesses to monetize AI-powered customer interactions with integrated payment processing.',
      category: 'Partnership',
    },
    {
      date: 'November 10, 2024',
      title: 'Enclose.AI Achieves PCI DSS Level 1 Certification',
      excerpt: 'Highest level of payment security certification demonstrates commitment to protecting customer data and transactions.',
      category: 'Security',
    },
    {
      date: 'October 5, 2024',
      title: 'Platform Processes Over $1 Billion in Transaction Volume',
      excerpt: 'Major milestone reflects rapid adoption and trust from businesses worldwide in Enclose.AI payment solutions.',
      category: 'Milestone',
    },
  ]

  const mediaKitItems = [
    {
      title: 'Company Logos',
      description: 'High-resolution logos in various formats',
      icon: <Image className="h-6 w-6 text-indigo-600" />,
      fileSize: '2.5 MB',
    },
    {
      title: 'Executive Bios & Photos',
      description: 'Leadership team information and headshots',
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      fileSize: '5.3 MB',
    },
    {
      title: 'Product Screenshots',
      description: 'Dashboard and feature screenshots',
      icon: <Image className="h-6 w-6 text-green-600" />,
      fileSize: '8.7 MB',
    },
    {
      title: 'Company Fact Sheet',
      description: 'Key statistics and company overview',
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      fileSize: '1.2 MB',
    },
  ]

  const awards = [
    {
      year: '2024',
      title: 'Best Payment Integration Platform',
      organization: 'FinTech Innovation Awards',
      icon: <Award className="h-8 w-8 text-yellow-500" />,
    },
    {
      year: '2024',
      title: 'Fastest Growing Startup',
      organization: 'Tech Growth Summit',
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
    },
    {
      year: '2024',
      title: 'Excellence in API Design',
      organization: 'Developer Choice Awards',
      icon: <Award className="h-8 w-8 text-purple-500" />,
    },
    {
      year: '2023',
      title: 'Most Innovative Payment Solution',
      organization: 'Global Banking Review',
      icon: <Award className="h-8 w-8 text-indigo-500" />,
    },
  ]

  const mediaContacts = [
    {
      name: 'Sarah Mitchell',
      title: 'Head of Communications',
      email: 'press@enclose.ai',
      phone: '+1 (555) 123-4567',
    },
    {
      name: 'David Chen',
      title: 'Media Relations Manager',
      email: 'media@enclose.ai',
      phone: '+1 (555) 123-4568',
    },
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <Newspaper className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Press & Media
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Latest news, press releases, and media resources
            </p>
          </div>

          {/* Latest Press Releases */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <div key={release.title} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {release.date}
                        </span>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                          {release.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{release.title}</h3>
                      <p className="text-gray-600">{release.excerpt}</p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium whitespace-nowrap ml-4">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/press/archive"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View All Press Releases
                <Newspaper className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Awards & Recognition</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {awards.map((award) => (
                <div key={award.title} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    {award.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{award.title}</h3>
                  <p className="text-xs text-gray-600 mb-1">{award.organization}</p>
                  <p className="text-xs text-indigo-600 font-medium">{award.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Media Kit */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Media Kit</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {mediaKitItems.map((item) => (
                <div key={item.title} className="bg-white rounded-lg p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500">{item.fileSize}</p>
                  </div>
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors inline-flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Complete Media Kit
              </button>
            </div>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
              <div className="text-3xl font-bold text-indigo-600 mb-2">$1B+</div>
              <div className="text-sm text-gray-600">Transaction Volume</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600">Active Merchants</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-sm text-gray-600">Countries Supported</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.99%</div>
              <div className="text-sm text-gray-600">Uptime SLA</div>
            </div>
          </div>

          {/* Media Contact */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-6">Media Contact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {mediaContacts.map((contact) => (
                <div key={contact.name} className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-semibold text-white mb-1">{contact.name}</h3>
                  <p className="text-indigo-100 text-sm mb-4">{contact.title}</p>
                  <div className="space-y-2 text-sm">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-white hover:text-indigo-200">
                      <Mail className="h-4 w-4" />
                      {contact.email}
                    </a>
                    <p className="flex items-center gap-2 text-indigo-100">
                      <span className="h-4 w-4 text-center">📞</span>
                      {contact.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-indigo-100 mb-4">For press inquiries and interview requests</p>
              <Link
                href="/contact?type=press"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Contact Press Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}