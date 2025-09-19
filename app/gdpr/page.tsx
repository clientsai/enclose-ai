import PageLayout from '@/components/PageLayout'
import { Shield, Lock, UserCheck, FileText, Globe, CheckCircle } from 'lucide-react'

export default function GDPRPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  GDPR Compliance
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Our commitment to protecting your data under the General Data Protection Regulation
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900 m-0">Fully GDPR Compliant</h2>
                  </div>
                  <p className="text-gray-600 m-0">
                    Enclose.AI is fully compliant with the General Data Protection Regulation (GDPR),
                    ensuring the highest standards of data protection and privacy for our European users.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-indigo-600" />
                  Your Rights Under GDPR
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Right to Access</h3>
                    <p className="text-gray-600 text-sm">
                      You have the right to request a copy of the personal data we hold about you.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Right to Rectification</h3>
                    <p className="text-gray-600 text-sm">
                      You can request correction of any inaccurate or incomplete personal data.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Right to Erasure</h3>
                    <p className="text-gray-600 text-sm">
                      Also known as the "right to be forgotten" - you can request deletion of your personal data.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Right to Data Portability</h3>
                    <p className="text-gray-600 text-sm">
                      You can request your data in a structured, commonly used, and machine-readable format.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Right to Object</h3>
                    <p className="text-gray-600 text-sm">
                      You can object to the processing of your personal data in certain circumstances.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-indigo-600" />
                  How We Protect Your Data
                </h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>End-to-end encryption for all sensitive data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Regular security audits and penetration testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Data minimization - we only collect what's necessary</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Privacy by design and default</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Regular staff training on data protection</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Legal Basis for Processing
                </h2>
                <p className="text-gray-600 mb-4">
                  We process personal data based on the following legal grounds:
                </p>
                <div className="space-y-3">
                  <div className="border-l-4 border-indigo-600 pl-4">
                    <h3 className="font-semibold text-gray-900">Consent</h3>
                    <p className="text-gray-600 text-sm">For marketing communications and optional services</p>
                  </div>
                  <div className="border-l-4 border-indigo-600 pl-4">
                    <h3 className="font-semibold text-gray-900">Contract</h3>
                    <p className="text-gray-600 text-sm">To provide our services and fulfill our agreement with you</p>
                  </div>
                  <div className="border-l-4 border-indigo-600 pl-4">
                    <h3 className="font-semibold text-gray-900">Legitimate Interest</h3>
                    <p className="text-gray-600 text-sm">For improving our services and preventing fraud</p>
                  </div>
                  <div className="border-l-4 border-indigo-600 pl-4">
                    <h3 className="font-semibold text-gray-900">Legal Obligation</h3>
                    <p className="text-gray-600 text-sm">To comply with applicable laws and regulations</p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  Data Processing Agreements
                </h2>
                <p className="text-gray-600 mb-4">
                  We maintain Data Processing Agreements (DPAs) with all our sub-processors and can provide
                  a DPA for your organization upon request. Our DPAs include:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Standard Contractual Clauses (SCCs) for international transfers</li>
                  <li>• Technical and organizational security measures</li>
                  <li>• Sub-processor list and notification procedures</li>
                  <li>• Data breach notification procedures</li>
                  <li>• Audit rights and compliance certifications</li>
                </ul>
              </section>

              <section className="bg-indigo-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Data Protection Officer</h3>
                <p className="text-gray-600 text-sm mb-3">
                  For any GDPR-related inquiries or to exercise your rights, please contact our Data Protection Officer:
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:dpo@enclose.ai" className="text-indigo-600 hover:text-indigo-700">
                      dpo@enclose.ai
                    </a>
                  </p>
                  <p className="text-gray-600">
                    <strong>Address:</strong> Enclose.AI, Data Protection Officer,
                    123 Business Street, San Francisco, CA 94105, USA
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}