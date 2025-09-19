import PageLayout from '@/components/PageLayout'
import { Calendar, Tag, Zap, Shield, Globe, Code } from 'lucide-react'

export default function ChangelogPage() {
  const releases = [
    {
      version: '2.1.0',
      date: 'January 15, 2025',
      tag: 'Latest',
      tagColor: 'bg-green-100 text-green-700',
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      changes: [
        {
          type: 'New Features',
          items: [
            'Added support for subscription billing with recurring payment links',
            'Introduced webhook event replay functionality',
            'New analytics dashboard with real-time metrics',
          ],
        },
        {
          type: 'Improvements',
          items: [
            'Enhanced payment link customization options',
            'Improved mobile checkout experience',
            'Faster transaction processing times',
          ],
        },
        {
          type: 'Bug Fixes',
          items: [
            'Fixed issue with currency conversion in analytics',
            'Resolved webhook retry logic for failed deliveries',
          ],
        },
      ],
    },
    {
      version: '2.0.0',
      date: 'December 10, 2024',
      tag: 'Major Release',
      tagColor: 'bg-purple-100 text-purple-700',
      icon: <Globe className="h-5 w-5 text-purple-500" />,
      changes: [
        {
          type: 'New Features',
          items: [
            'Complete redesign of the dashboard interface',
            'Multi-currency support with automatic conversion',
            'Advanced fraud detection powered by AI',
            'Batch payment processing capabilities',
          ],
        },
        {
          type: 'Breaking Changes',
          items: [
            'Updated API authentication to use OAuth 2.0',
            'Changed webhook payload structure for consistency',
          ],
        },
      ],
    },
    {
      version: '1.9.0',
      date: 'November 5, 2024',
      tag: 'Feature Release',
      tagColor: 'bg-blue-100 text-blue-700',
      icon: <Code className="h-5 w-5 text-blue-500" />,
      changes: [
        {
          type: 'New Features',
          items: [
            'JavaScript SDK for easier integration',
            'Payment link templates for common use cases',
            'Custom branding options for checkout pages',
          ],
        },
        {
          type: 'Improvements',
          items: [
            'Reduced API response times by 40%',
            'Enhanced error messages for better debugging',
            'Improved documentation with interactive examples',
          ],
        },
      ],
    },
    {
      version: '1.8.0',
      date: 'October 1, 2024',
      tag: 'Security Update',
      tagColor: 'bg-red-100 text-red-700',
      icon: <Shield className="h-5 w-5 text-red-500" />,
      changes: [
        {
          type: 'Security',
          items: [
            'Implemented PCI DSS Level 1 compliance',
            'Added two-factor authentication for all accounts',
            'Enhanced encryption for sensitive data',
          ],
        },
        {
          type: 'New Features',
          items: [
            'Audit logs for all account activities',
            'IP whitelisting for API access',
          ],
        },
      ],
    },
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Changelog
            </h1>
            <p className="text-xl text-gray-600">
              Stay up to date with the latest improvements and features
            </p>
          </div>

          {/* Releases */}
          <div className="space-y-12">
            {releases.map((release, index) => (
              <div key={release.version} className="relative">
                {/* Timeline connector */}
                {index < releases.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-transparent" />
                )}

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  {/* Release Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center">
                      {release.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">v{release.version}</h2>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${release.tagColor}`}>
                          {release.tag}
                        </span>
                      </div>
                      <p className="text-gray-500 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {release.date}
                      </p>
                    </div>
                  </div>

                  {/* Changes */}
                  <div className="space-y-6">
                    {release.changes.map((section) => (
                      <div key={section.type}>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Tag className="h-4 w-4 text-indigo-600" />
                          {section.type}
                        </h3>
                        <ul className="space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
                              <span className="text-indigo-400 mt-1.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subscribe Section */}
          <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
            <p className="mb-6 text-indigo-100">
              Get notified about new releases and important updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}