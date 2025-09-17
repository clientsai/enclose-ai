'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: January 1, 2024</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using Enclose.AI ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this Service.
              </p>
              <p className="text-gray-600">
                These Terms of Service ("Terms") govern your use of our website located at enclose.ai and our payment processing services.
                Our services are offered subject to your acceptance without modification of all of the terms and conditions contained herein.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4">
                Enclose.AI provides payment processing infrastructure and related services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Payment link generation and management</li>
                <li>Transaction processing through Stripe Connect</li>
                <li>Analytics and reporting tools</li>
                <li>API access for payment integration</li>
                <li>Webhook management and notifications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Terms</h2>
              <p className="text-gray-600 mb-4">You must meet the following requirements to use our Service:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>You must be 18 years or older</li>
                <li>You must be a human (accounts registered by automated methods are not permitted)</li>
                <li>You must provide accurate and complete registration information</li>
                <li>You are responsible for maintaining the security of your account and password</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must not use the Service for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
              <p className="text-gray-600 mb-4">
                <strong>Subscription Fees:</strong> Some features of the Service require payment of fees. All fees are quoted in U.S. dollars
                unless otherwise stated. You shall pay all fees in accordance with the fee schedule and payment terms.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Transaction Fees:</strong> We charge a processing fee of 0.5% in addition to Stripe's standard fees for each successful transaction.
                These fees are automatically deducted from your payouts.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Refunds:</strong> Subscription fees are non-refundable except where required by law. For transaction disputes and refunds,
                you must work directly with Stripe according to their policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Acceptable Use</h2>
              <p className="text-gray-600 mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Process payments for illegal goods or services</li>
                <li>Engage in money laundering or fraud</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit viruses or malicious code</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
              <p className="text-gray-600 mb-4">
                Your use of our Service is also governed by our Privacy Policy. Please review our Privacy Policy,
                which also governs the Site and informs users of our data collection practices.
              </p>
              <p className="text-gray-600">
                We implement industry-standard security measures including PCI DSS Level 1 compliance, AES-256 encryption,
                and regular security audits to protect your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property
                of Enclose.AI and its licensors. The Service is protected by copyright, trademark, and other laws.
                Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. API Terms</h2>
              <p className="text-gray-600 mb-4">
                If you use our API, you agree to be bound by the following terms in addition to the other provisions of these Terms:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>You will not exceed the rate limits defined in our documentation</li>
                <li>You will not reverse engineer or attempt to extract the source code of our API</li>
                <li>You will implement proper error handling and respect retry-after headers</li>
                <li>You will keep your API keys secure and not share them publicly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimers and Limitations of Liability</h2>
              <p className="text-gray-600 mb-4">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. ENCLOSE.AI EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND,
                WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                AND NON-INFRINGEMENT.
              </p>
              <p className="text-gray-600 mb-4">
                IN NO EVENT SHALL ENCLOSE.AI, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL,
                OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to defend, indemnify, and hold harmless Enclose.AI and its licensors, employees, contractors, agents, officers and directors,
                from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including attorney's fees)
                arising from your use of and access to the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability,
                under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-600">
                Upon termination, your right to use the Service will immediately cease. All provisions of the Terms which by their nature
                should survive termination shall survive termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These Terms shall be governed and construed in accordance with the laws of the State of California, United States,
                without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be
                considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least
                30 days' notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  <strong>Enclose.AI</strong><br />
                  Email: legal@enclose.ai<br />
                  Address: 548 Market St #75925<br />
                  San Francisco, CA 94104<br />
                  United States
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}