/* Security Page - Enterprise-Grade Security & Compliance */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Key, FileCheck, AlertCircle, CheckCircle, Award, Building, Globe, Eye, Server, Users, Zap, ArrowRight, ChevronRight, ShieldCheck, LockKeyhole, FileKey, Cloud } from 'lucide-react'
import Logo from '@/components/Logo'

export default function SecurityPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const certifications = [
    {
      icon: Award,
      title: 'PCI DSS Level 1',
      description: 'Highest level of payment security certification',
      details: 'We maintain the most stringent level of PCI compliance, ensuring your payment data is protected by industry-leading security standards. Annual audits validate our infrastructure, policies, and procedures.',
    },
    {
      icon: Shield,
      title: 'SOC 2 Type II',
      description: 'Independently audited security controls',
      details: 'Our systems and processes are regularly audited by independent third parties to ensure we meet the highest standards for security, availability, processing integrity, confidentiality, and privacy.',
    },
    {
      icon: Globe,
      title: 'GDPR Compliant',
      description: 'Full European data protection compliance',
      details: 'We comply with all GDPR requirements including data minimization, purpose limitation, accuracy, storage limitation, integrity, confidentiality, and accountability.',
    },
    {
      icon: FileCheck,
      title: 'ISO 27001',
      description: 'International security management standard',
      details: 'Our information security management system is certified to ISO 27001 standards, demonstrating our commitment to managing and protecting sensitive information.',
    },
  ]

  const securityFeatures = [
    {
      category: 'Data Encryption',
      icon: Lock,
      features: [
        {
          title: 'AES-256 Encryption at Rest',
          description: 'All stored data is encrypted using military-grade AES-256 encryption algorithms. Your sensitive payment information, customer data, and API keys are protected even if physical security is compromised.',
        },
        {
          title: 'TLS 1.3 in Transit',
          description: 'Every API request and response is encrypted using the latest TLS 1.3 protocol. This ensures that data traveling between your systems and ours cannot be intercepted or modified.',
        },
        {
          title: 'Hardware Security Modules',
          description: 'Critical encryption keys are stored in tamper-resistant Hardware Security Modules (HSMs) that meet FIPS 140-2 Level 3 standards, providing the highest level of cryptographic security.',
        },
        {
          title: 'Key Rotation & Management',
          description: 'Automatic key rotation policies ensure that encryption keys are regularly updated. Our key management system follows industry best practices for generation, storage, and retirement.',
        },
      ],
    },
    {
      category: 'Infrastructure Security',
      icon: Server,
      features: [
        {
          title: 'Multi-Region Architecture',
          description: 'Our infrastructure spans multiple geographic regions with automatic failover capabilities. This ensures high availability and protects against regional outages or disasters.',
        },
        {
          title: 'DDoS Protection',
          description: 'Enterprise-grade DDoS mitigation automatically detects and blocks malicious traffic. Our systems can handle attacks of any size while maintaining service availability for legitimate users.',
        },
        {
          title: 'Network Isolation',
          description: 'Virtual private clouds and network segmentation ensure that customer data is isolated. Each environment is protected by multiple layers of firewalls and intrusion detection systems.',
        },
        {
          title: 'Real-time Monitoring',
          description: '24/7 security operations center monitors all systems for suspicious activity. Automated alerting ensures rapid response to any potential security incidents.',
        },
      ],
    },
    {
      category: 'Access Control',
      icon: Key,
      features: [
        {
          title: 'Zero Trust Architecture',
          description: 'Every request is authenticated and authorized regardless of source. No implicit trust is granted based on network location or previous authentication.',
        },
        {
          title: 'Multi-Factor Authentication',
          description: 'All administrative access requires MFA using TOTP or hardware security keys. Customer accounts support optional MFA for enhanced security.',
        },
        {
          title: 'Role-Based Access Control',
          description: 'Granular permissions ensure users only have access to the resources they need. Principle of least privilege is enforced across all systems.',
        },
        {
          title: 'Audit Logging',
          description: 'Comprehensive audit trails track all access and modifications. Logs are immutable and retained according to compliance requirements.',
        },
      ],
    },
    {
      category: 'Application Security',
      icon: FileKey,
      features: [
        {
          title: 'Secure Development Lifecycle',
          description: 'Security is built into every stage of development. Code reviews, static analysis, and security testing are mandatory before any deployment.',
        },
        {
          title: 'Vulnerability Management',
          description: 'Regular security assessments and penetration testing identify potential vulnerabilities. Critical patches are deployed within 24 hours of discovery.',
        },
        {
          title: 'API Rate Limiting',
          description: 'Intelligent rate limiting prevents abuse while ensuring legitimate traffic flows smoothly. Adaptive algorithms adjust limits based on usage patterns.',
        },
        {
          title: 'Input Validation',
          description: 'All user input is validated and sanitized to prevent injection attacks. Our APIs enforce strict schema validation on all requests.',
        },
      ],
    },
  ]

  const complianceStandards = [
    { name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard Level 1' },
    { name: 'SOC 2', description: 'Service Organization Control 2 Type II Certified' },
    { name: 'GDPR', description: 'General Data Protection Regulation Compliant' },
    { name: 'CCPA', description: 'California Consumer Privacy Act Compliant' },
    { name: 'ISO 27001', description: 'Information Security Management System Certified' },
    { name: 'ISO 27017', description: 'Cloud Security Controls Certified' },
    { name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act Ready' },
    { name: 'SCA', description: 'Strong Customer Authentication Compliant' },
  ]

  const securityProcesses = [
    {
      title: 'Incident Response',
      description: 'Our incident response team is available 24/7 to handle any security events. We follow industry-standard protocols for detection, containment, eradication, and recovery.',
      metrics: ['15-minute response SLA', '99.9% incidents resolved within 2 hours', 'Automated incident detection'],
    },
    {
      title: 'Business Continuity',
      description: 'Comprehensive disaster recovery plans ensure business continuity. Regular drills validate our ability to recover from any type of incident.',
      metrics: ['RPO: 1 hour', 'RTO: 4 hours', 'Quarterly DR testing'],
    },
    {
      title: 'Vendor Management',
      description: 'All third-party vendors undergo rigorous security assessments. Continuous monitoring ensures ongoing compliance with our security standards.',
      metrics: ['100% vendor assessment', 'Annual security reviews', 'Contractual security requirements'],
    },
    {
      title: 'Employee Security',
      description: 'Background checks, security training, and strict access controls ensure our team maintains the highest security standards.',
      metrics: ['100% background checks', 'Monthly security training', 'Quarterly access reviews'],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo size="md" />
            <div className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/security" className="text-gray-900 font-medium">Security</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <Shield className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Bank-Grade Security</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Security Without Compromise
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your trust is our foundation. We employ the most advanced security measures, maintain the highest compliance standards, and undergo regular independent audits to ensure your data and payments are always protected.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/docs/security">
                View Documentation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/compliance">
                Compliance Details <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">99.99%</div>
              <div className="text-sm text-gray-600 mt-1">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">256-bit</div>
              <div className="text-sm text-gray-600 mt-1">AES Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Security Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">Level 1</div>
              <div className="text-sm text-gray-600 mt-1">PCI DSS Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industry-Leading Certifications</h2>
            <p className="text-lg text-gray-600">Independently verified by the world's most trusted security auditors</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.title} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setExpandedSection(expandedSection === cert.title ? null : cert.title)}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                    <cert.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{cert.title}</CardTitle>
                  <CardDescription>{cert.description}</CardDescription>
                </CardHeader>
                {expandedSection === cert.title && (
                  <CardContent>
                    <p className="text-sm text-gray-600">{cert.details}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Multi-Layer Security Architecture</h2>
            <p className="text-lg text-gray-600">Defense in depth approach with multiple security layers</p>
          </div>
          <div className="space-y-12">
            {securityFeatures.map((category) => (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.features.map((feature) => (
                    <div key={feature.title} className="p-6 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compliance & Standards</h2>
            <p className="text-lg text-gray-600">Meeting and exceeding global regulatory requirements</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceStandards.map((standard) => (
              <div key={standard.name} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{standard.name}</h3>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-600">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Processes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Operational Excellence</h2>
            <p className="text-lg text-gray-600">Proven processes that protect your business</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {securityProcesses.map((process) => (
              <Card key={process.title}>
                <CardHeader>
                  <CardTitle>{process.title}</CardTitle>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {process.metrics.map((metric) => (
                      <span key={metric} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {metric}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Commitment */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <ShieldCheck className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Security Commitment</h2>
          <p className="text-lg mb-8 opacity-90">
            Security isn't just a feature—it's the foundation of everything we do. We invest millions annually in security infrastructure, undergo regular third-party audits, and maintain a dedicated security team that works around the clock to protect your data. When you choose Enclose.AI, you're choosing a partner committed to maintaining the highest standards of security and compliance.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact-security">
                Contact Security Team
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-indigo-600" asChild>
              <Link href="/docs/security">
                Read Security Docs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Security Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/security/whitepaper" className="text-gray-400 hover:text-white">Security Whitepaper</Link></li>
                <li><Link href="/security/vulnerability" className="text-gray-400 hover:text-white">Vulnerability Disclosure</Link></li>
                <li><Link href="/security/incident" className="text-gray-400 hover:text-white">Incident Response</Link></li>
                <li><Link href="/security/audit" className="text-gray-400 hover:text-white">Audit Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Compliance</h4>
              <ul className="space-y-2">
                <li><Link href="/compliance/pci" className="text-gray-400 hover:text-white">PCI Compliance</Link></li>
                <li><Link href="/compliance/gdpr" className="text-gray-400 hover:text-white">GDPR</Link></li>
                <li><Link href="/compliance/soc2" className="text-gray-400 hover:text-white">SOC 2</Link></li>
                <li><Link href="/compliance/iso" className="text-gray-400 hover:text-white">ISO Certifications</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Security</h4>
              <ul className="space-y-2">
                <li><a href="mailto:security@enclose.ai" className="text-gray-400 hover:text-white">security@enclose.ai</a></li>
                <li><Link href="/security/report" className="text-gray-400 hover:text-white">Report Issue</Link></li>
                <li><Link href="/security/team" className="text-gray-400 hover:text-white">Security Team</Link></li>
                <li><Link href="/security/advisories" className="text-gray-400 hover:text-white">Security Advisories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Trust Center</h4>
              <ul className="space-y-2">
                <li><Link href="/trust" className="text-gray-400 hover:text-white">Trust Center</Link></li>
                <li><Link href="/status" className="text-gray-400 hover:text-white">System Status</Link></li>
                <li><Link href="/uptime" className="text-gray-400 hover:text-white">Uptime History</Link></li>
                <li><Link href="/transparency" className="text-gray-400 hover:text-white">Transparency Report</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 Enclose.AI. Security is our priority.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}