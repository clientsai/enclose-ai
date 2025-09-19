import { Shield, Award, CheckCircle, Lock, Globe, FileCheck } from 'lucide-react'

export default function CompliancePage() {
  const certifications = [
    {
      title: 'PCI DSS Level 1',
      description: 'Highest level of payment card industry compliance',
      icon: <Shield className="h-8 w-8 text-green-600" />,
      status: 'Active',
    },
    {
      title: 'SOC 2 Type II',
      description: 'Audited for security, availability, and confidentiality',
      icon: <Award className="h-8 w-8 text-blue-600" />,
      status: 'Active',
    },
    {
      title: 'ISO 27001',
      description: 'International standard for information security',
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      status: 'Active',
    },
    {
      title: 'GDPR Compliant',
      description: 'Full compliance with EU data protection regulations',
      icon: <Lock className="h-8 w-8 text-indigo-600" />,
      status: 'Active',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <FileCheck className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Compliance & Certifications
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meeting the highest standards of security, privacy, and regulatory compliance
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {certifications.map((cert) => (
              <div key={cert.title} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{cert.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{cert.title}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{cert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Compliance */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Regional Compliance</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Americas
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>CCPA (California)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>PIPEDA (Canada)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>LGPD (Brazil)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Europe
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>GDPR (EU)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>UK GDPR</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>PSD2</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  Asia-Pacific
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>PDPA (Singapore)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Privacy Act (Australia)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>PIPA (Japan)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Industry Standards */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Industry Standards</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Strong Customer Authentication (SCA)</h3>
                <p className="text-gray-600 text-sm">
                  Full compliance with European requirements for payment authentication
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Anti-Money Laundering (AML)</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive AML program with continuous monitoring and reporting
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Know Your Customer (KYC)</h3>
                <p className="text-gray-600 text-sm">
                  Robust identity verification and customer due diligence procedures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}