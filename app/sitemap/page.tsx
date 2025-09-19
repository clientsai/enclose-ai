import PageLayout from '@/components/PageLayout'
import { Map, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Product',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Demo', href: '/demo' },
        { label: 'Security', href: '/security' },
      ],
    },
    {
      title: 'Developers',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api-reference' },
        { label: 'SDKs & Libraries', href: '/docs/sdks' },
        { label: 'Webhooks', href: '/docs/webhooks' },
        { label: 'Sandbox', href: '/sandbox' },
        { label: 'Tutorials', href: '/tutorials' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Press', href: '/press' },
        { label: 'Partners', href: '/partners' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Support', href: '/support' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Status', href: '/status' },
        { label: 'Community', href: '/community' },
        { label: 'Training', href: '/training' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
        { label: 'Compliance', href: '/compliance' },
        { label: 'Legal', href: '/legal' },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'Sign In', href: '/login' },
        { label: 'Sign Up', href: '/register' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings', href: '/settings' },
        { label: 'Payment Links', href: '/payment-links' },
        { label: 'Transactions', href: '/transactions' },
        { label: 'Analytics', href: '/analytics' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'E-commerce', href: '/solutions/ecommerce' },
        { label: 'SaaS', href: '/solutions/saas' },
        { label: 'Marketplaces', href: '/solutions/marketplaces' },
        { label: 'Platforms', href: '/solutions/platforms' },
        { label: 'Enterprise', href: '/solutions/enterprise' },
      ],
    },
    {
      title: 'Use Cases',
      links: [
        { label: 'Online Payments', href: '/use-cases/online-payments' },
        { label: 'Subscriptions', href: '/use-cases/subscriptions' },
        { label: 'Invoicing', href: '/use-cases/invoicing' },
        { label: 'Point of Sale', href: '/use-cases/pos' },
        { label: 'Mobile Payments', href: '/use-cases/mobile' },
      ],
    },
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <Map className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Sitemap
            </h1>
            <p className="text-xl text-gray-600">
              Complete overview of all pages and resources
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-indigo-600">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900">Sitemap</span>
            </nav>
          </div>

          {/* Sitemap Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sitemapSections.map((section) => (
              <div key={section.title} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1 group"
                      >
                        <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">•</span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Additional Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4 mx-auto">
                  📱
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mobile Apps</h3>
                <p className="text-sm text-gray-600 mb-4">Manage payments on the go</p>
                <div className="space-y-2">
                  <Link href="/mobile/ios" className="block text-indigo-600 hover:text-indigo-700">
                    iOS App →
                  </Link>
                  <Link href="/mobile/android" className="block text-indigo-600 hover:text-indigo-700">
                    Android App →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4 mx-auto">
                  🔗
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Integrations</h3>
                <p className="text-sm text-gray-600 mb-4">Connect with your tools</p>
                <div className="space-y-2">
                  <Link href="/integrations" className="block text-indigo-600 hover:text-indigo-700">
                    View All →
                  </Link>
                  <Link href="/marketplace" className="block text-indigo-600 hover:text-indigo-700">
                    Marketplace →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4 mx-auto">
                  🌐
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Global</h3>
                <p className="text-sm text-gray-600 mb-4">International resources</p>
                <div className="space-y-2">
                  <Link href="/global/currencies" className="block text-indigo-600 hover:text-indigo-700">
                    Currencies →
                  </Link>
                  <Link href="/global/languages" className="block text-indigo-600 hover:text-indigo-700">
                    Languages →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* XML Sitemap */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Looking for our XML sitemap for search engines?
            </p>
            <Link
              href="/sitemap.xml"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <Map className="h-5 w-5" />
              View XML Sitemap
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}