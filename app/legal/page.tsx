import PageLayout from '@/components/PageLayout'
import { Scale, Shield, FileText, Lock, Globe, AlertCircle, CheckCircle, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LegalPage() {
  const legalDocuments = [
    {
      title: 'Terms of Service',
      description: 'Our agreement with you regarding use of Enclose.AI services',
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      href: '/terms',
      lastUpdated: 'January 15, 2025',
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      icon: <Lock className="h-6 w-6 text-purple-600" />,
      href: '/privacy',
      lastUpdated: 'January 15, 2025',
    },
    {
      title: 'Cookie Policy',
      description: 'Our use of cookies and similar tracking technologies',
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      href: '/cookies',
      lastUpdated: 'January 10, 2025',
    },
    {
      title: 'GDPR Compliance',
      description: 'European data protection regulation compliance',
      icon: <Shield className="h-6 w-6 text-green-600" />,
      href: '/gdpr',
      lastUpdated: 'January 10, 2025',
    },
    {
      title: 'Data Processing Agreement',
      description: 'Agreement for processing personal data on behalf of customers',
      icon: <FileText className="h-6 w-6 text-orange-600" />,
      href: '/dpa',
      lastUpdated: 'December 20, 2024',
    },
    {
      title: 'Acceptable Use Policy',
      description: 'Guidelines for appropriate use of our services',
      icon: <AlertCircle className="h-6 w-6 text-red-600" />,
      href: '/aup',
      lastUpdated: 'December 15, 2024',
    },
  ]

  const complianceStandards = [
    {
      standard: 'PCI DSS Level 1',
      description: 'Highest level of payment card security certification',
      status: 'Certified',
      icon: '🔐',
    },
    {
      standard: 'SOC 2 Type II',
      description: 'Security, availability, and confidentiality controls',
      status: 'Certified',
      icon: '✅',
    },
    {
      standard: 'ISO 27001',
      description: 'Information security management system',
      status: 'Certified',
      icon: '🛡️',
    },
    {
      standard: 'GDPR',
      description: 'General Data Protection Regulation',
      status: 'Compliant',
      icon: '🇪🇺',
    },
    {
      standard: 'CCPA',
      description: 'California Consumer Privacy Act',
      status: 'Compliant',
      icon: '🇺🇸',
    },
    {
      standard: 'PSD2/SCA',
      description: 'Strong Customer Authentication',
      status: 'Compliant',
      icon: '🔑',
    },
  ]

  const dataProtection = [
    {
      title: 'Data Encryption',
      description: 'AES-256 encryption at rest, TLS 1.3 in transit',
      icon: <Lock className="h-5 w-5 text-indigo-600" />,
    },
    {
      title: 'Access Controls',
      description: 'Role-based access with multi-factor authentication',
      icon: <Shield className="h-5 w-5 text-green-600" />,
    },
    {
      title: 'Data Retention',
      description: 'Automatic data purging per regulatory requirements',
      icon: <FileText className="h-5 w-5 text-blue-600" />,
    },
    {
      title: 'Audit Logging',
      description: 'Comprehensive audit trails for all data access',
      icon: <CheckCircle className="h-5 w-5 text-purple-600" />,
    },
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Legal & Compliance
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparency, security, and compliance are the foundations of trust
            </p>
          </div>

          {/* Legal Documents */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Legal Documents</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {legalDocuments.map((doc) => (
                <Link
                  key={doc.title}
                  href={doc.href}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                      {doc.icon}
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                  <p className="text-xs text-gray-500">Last updated: {doc.lastUpdated}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Compliance Standards */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Compliance & Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceStandards.map((item) => (
                <div key={item.standard} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{item.standard}</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Data Protection Measures</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataProtection.map((measure) => (
                <div key={measure.title} className="bg-white rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {measure.icon}
                    <h3 className="font-semibold text-gray-900">{measure.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{measure.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Center */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Audits</h3>
                <p className="text-gray-600 mb-4">
                  We undergo regular third-party security audits and penetration testing to ensure our systems
                  meet the highest security standards. All audit reports are available upon request for enterprise customers.
                </p>
                <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50">
                  <Download className="h-4 w-4 mr-2" />
                  Request Audit Reports
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency Reports</h3>
                <p className="text-gray-600 mb-4">
                  We publish annual transparency reports detailing government data requests, security incidents,
                  and platform availability metrics. Our commitment to transparency builds trust.
                </p>
                <Link href="/transparency">
                  <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50">
                    View Transparency Reports
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Responsible Disclosure */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Responsible Disclosure Program</h3>
                <p className="text-gray-600 mb-4">
                  We maintain a bug bounty program to reward security researchers who help us identify and fix
                  vulnerabilities. If you've discovered a security issue, please report it responsibly.
                </p>
                <div className="flex gap-4">
                  <Link href="/security/disclosure">
                    <Button variant="outline" className="border-orange-200 hover:bg-orange-50">
                      Report Vulnerability
                    </Button>
                  </Link>
                  <Link href="/security/hall-of-fame">
                    <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
                      Security Hall of Fame
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Legal */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <Scale className="h-12 w-12 mx-auto mb-6 text-white/90" />
            <h2 className="text-3xl font-bold mb-4">Legal Questions?</h2>
            <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
              Our legal team is here to help with compliance questions, data processing agreements,
              and regulatory requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:legal@enclose.ai" className="inline-block">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                  Contact Legal Team
                </Button>
              </a>
              <a href="mailto:privacy@enclose.ai" className="inline-block">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Privacy Inquiries
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Quick Links</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-700">Terms of Service</Link>
              <span className="text-gray-400">•</span>
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</Link>
              <span className="text-gray-400">•</span>
              <Link href="/gdpr" className="text-indigo-600 hover:text-indigo-700">GDPR</Link>
              <span className="text-gray-400">•</span>
              <Link href="/compliance" className="text-indigo-600 hover:text-indigo-700">Compliance</Link>
              <span className="text-gray-400">•</span>
              <Link href="/security" className="text-indigo-600 hover:text-indigo-700">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}