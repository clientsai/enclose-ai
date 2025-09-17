'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Database, Globe, Users } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
  const dataTypes = [
    {
      icon: Users,
      title: 'Account Information',
      description: 'Name, email, password, company details'
    },
    {
      icon: Database,
      title: 'Payment Data',
      description: 'Transaction history, amounts, customer details'
    },
    {
      icon: Globe,
      title: 'Usage Data',
      description: 'API calls, feature usage, performance metrics'
    },
    {
      icon: Shield,
      title: 'Security Data',
      description: 'IP addresses, device information, authentication logs'
    }
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
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
          </div>
          <p className="text-gray-600 mb-8">Last updated: January 1, 2024</p>

          {/* Privacy Commitment */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Privacy Commitment</h2>
            <p className="text-gray-600">
              At Enclose.AI, we are committed to protecting your privacy and ensuring the security of your personal information.
              This policy explains how we collect, use, and safeguard your data when you use our payment processing services.
            </p>
          </div>

          {/* Data We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Information We Collect</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {dataTypes.map((type, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <type.icon className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-900">{type.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide, maintain, and improve our payment processing services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, security alerts, and support messages</li>
                <li>Respond to comments, questions, and customer service requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li><strong>Service Providers:</strong> With Stripe for payment processing, AWS for hosting, and other service providers who assist in our operations</li>
                <li><strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process</li>
                <li><strong>Protection of Rights:</strong> To protect the rights, property, and safety of Enclose.AI, our users, or others</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition</li>
                <li><strong>With Your Consent:</strong> With your explicit consent for any other purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement robust security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>AES-256 encryption for data at rest</li>
                <li>TLS 1.3 encryption for data in transit</li>
                <li>PCI DSS Level 1 compliance for payment data</li>
                <li>Regular security audits and penetration testing</li>
                <li>Strict access controls and authentication requirements</li>
                <li>24/7 monitoring and incident response procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your information for as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Account Data:</strong> Retained while your account is active and for 30 days after closure</li>
                <li><strong>Transaction Records:</strong> Retained for 7 years for legal and tax compliance</li>
                <li><strong>Communication Records:</strong> Retained for 2 years for customer service purposes</li>
                <li><strong>Security Logs:</strong> Retained for 1 year for security analysis</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal requirements</li>
                <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
                <li><strong>Opt-out:</strong> Opt out of marketing communications at any time</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Maintain your session and authentication state</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze usage patterns and improve our services</li>
                <li>Provide security and prevent fraud</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can control cookies through your browser settings. Note that disabling cookies may limit functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
              <p className="text-gray-600">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards
                are in place for international transfers, including Standard Contractual Clauses approved by the European Commission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600">
                Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
                If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">California Privacy Rights</h2>
              <p className="text-gray-600 mb-4">
                California residents have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Right to know about personal information collected, used, and disclosed</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">GDPR Rights (European Users)</h2>
              <p className="text-gray-600 mb-4">
                If you are in the European Economic Area, you have additional rights under the General Data Protection Regulation:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Right to be informed about data processing</li>
                <li>Right of access to your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Rights related to automated decision-making</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
                on this page and updating the "Last updated" date. For material changes, we will provide additional notice via email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600">
                  <strong>Data Protection Officer</strong><br />
                  Enclose.AI<br />
                  Email: privacy@enclose.ai<br />
                  Address: 548 Market St #75925<br />
                  San Francisco, CA 94104<br />
                  United States<br />
                  <br />
                  For EU residents:<br />
                  EU Representative: Privacy Europe GmbH<br />
                  Email: eu-privacy@enclose.ai
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}