import PageLayout from '@/components/PageLayout'
import { Cookie, Shield, Info, Settings } from 'lucide-react'

export default function CookiesPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Cookie className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Cookie Policy
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Last updated: January 1, 2024
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-indigo-600" />
                  What are cookies?
                </h2>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are placed on your device when you visit our website.
                  They help us provide you with a better experience and allow certain features to work.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of cookies we use</h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-indigo-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Required for the website to function properly. Cannot be disabled.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Authentication and security cookies</li>
                      <li>• Session management</li>
                      <li>• Load balancing</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Performance Cookies</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Help us understand how visitors interact with our website.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Google Analytics</li>
                      <li>• Performance monitoring</li>
                      <li>• Error tracking</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Functionality Cookies</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Enable enhanced functionality and personalization.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Language preferences</li>
                      <li>• Region settings</li>
                      <li>• User preferences</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Used to track visitors across websites for marketing purposes.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Retargeting pixels</li>
                      <li>• Social media tracking</li>
                      <li>• Advertising effectiveness</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-indigo-600" />
                  Managing cookies
                </h2>
                <p className="text-gray-600 mb-4">
                  You can control and manage cookies in various ways:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Browser settings: Most browsers allow you to refuse or accept cookies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Cookie preference center: Use our cookie settings to manage your preferences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>Third-party opt-outs: Visit third-party websites to opt-out of their tracking</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  Privacy and security
                </h2>
                <p className="text-gray-600">
                  We take your privacy seriously. Cookies do not contain any personally identifiable
                  information and are used solely to improve your experience on our platform.
                  For more information, please review our{' '}
                  <a href="/privacy" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>.
                </p>
              </section>

              <section className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Contact us</h3>
                <p className="text-gray-600 text-sm">
                  If you have any questions about our use of cookies, please contact us at{' '}
                  <a href="mailto:privacy@enclose.ai" className="text-indigo-600 hover:text-indigo-700">
                    privacy@enclose.ai
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}