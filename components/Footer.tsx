/* Comprehensive Footer Component with All Pages */
import Link from 'next/link'
import Logo from '@/components/Logo'
import { Github, Twitter, Linkedin, Youtube, Mail, Globe, Shield, FileText, Users, Code, BarChart3, HelpCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Product',
      icon: <BarChart3 className="h-4 w-4" />,
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Security', href: '/security' },
        { label: 'Demo', href: '/demo' },
        { label: 'API Reference', href: '/api-reference' },
        { label: 'System Status', href: '/status', badge: 'Live' },
      ],
    },
    {
      title: 'Developers',
      icon: <Code className="h-4 w-4" />,
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api-reference' },
        { label: 'SDKs & Libraries', href: '/docs/sdks' },
        { label: 'Webhooks', href: '/docs/webhooks' },
        { label: 'Testing Guide', href: '/docs/testing' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Company',
      icon: <Users className="h-4 w-4" />,
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers', badge: 'Hiring' },
        { label: 'Press Kit', href: '/press' },
        { label: 'Partners', href: '/partners' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Support',
      icon: <HelpCircle className="h-4 w-4" />,
      links: [
        { label: 'Help Center', href: '/support' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact Sales', href: '/contact-sales' },
        { label: 'Community', href: '/community' },
        { label: 'Training', href: '/training' },
        { label: 'Service Status', href: '/status' },
      ],
    },
    {
      title: 'Legal',
      icon: <FileText className="h-4 w-4" />,
      links: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
        { label: 'Compliance', href: '/compliance' },
        { label: 'Security', href: '/security' },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: 'https://github.com/enclose-ai', label: 'GitHub' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com/enclose_ai', label: 'Twitter' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com/company/enclose-ai', label: 'LinkedIn' },
    { icon: <Youtube className="h-5 w-5" />, href: 'https://youtube.com/@enclose-ai', label: 'YouTube' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo size="md" className="mb-4" />
            <p className="text-gray-400 text-sm mb-4">
              The payment infrastructure for modern businesses. Accept payments globally with ease.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400">{section.icon}</span>
                <h3 className="font-semibold text-white">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="px-2 py-0.5 bg-indigo-600 text-xs rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Shield className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-xs text-gray-400">PCI DSS Level 1</p>
            </div>
            <div>
              <Globe className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-gray-400">135+ Countries</p>
            </div>
            <div>
              <BarChart3 className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-gray-400">99.99% Uptime</p>
            </div>
            <div>
              <Users className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
              <p className="text-xs text-gray-400">10,000+ Businesses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              © {currentYear} Enclose.AI, Inc. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex gap-4 text-sm">
              <Link href="/security" className="text-gray-400 hover:text-white">
                Security
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white">
                Cookies
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <a href="mailto:security@enclose.ai" className="flex items-center gap-1 hover:text-white">
              <Shield className="h-3 w-3" />
              Report Security Issue
            </a>
            <a href="tel:+1-888-ENCLOSE" className="flex items-center gap-1 hover:text-white">
              24/7 Support: +1-888-ENCLOSE
            </a>
            <a href="mailto:support@enclose.ai" className="flex items-center gap-1 hover:text-white">
              <Mail className="h-3 w-3" />
              support@enclose.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}