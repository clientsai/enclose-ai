'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

interface HeaderProps {
  variant?: 'website' | 'app'
}

export default function Header({ variant = 'website' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const pathname = usePathname()

  const websiteNavItems = [
    {
      label: 'Product',
      dropdown: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Security', href: '/security' },
        { label: 'Demo', href: '/demo' },
      ],
    },
    {
      label: 'Developers',
      dropdown: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api-reference' },
        { label: 'SDKs & Libraries', href: '/docs/sdks' },
        { label: 'Webhooks', href: '/docs/webhooks' },
      ],
    },
    {
      label: 'Company',
      dropdown: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      label: 'Resources',
      dropdown: [
        { label: 'Support', href: '/support' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Status', href: '/status' },
        { label: 'Community', href: '/community' },
      ],
    },
  ]

  const appNavItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Payment Links', href: '/payment-links' },
    { label: 'Transactions', href: '/transactions' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Settings', href: '/settings' },
  ]

  const navItems = variant === 'app' ? appNavItems : websiteNavItems

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {variant === 'website' ? (
              // Website dropdown navigation
              websiteNavItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                    onMouseEnter={() => setDropdownOpen(item.label)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {dropdownOpen === item.label && (
                    <div
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                      onMouseEnter={() => setDropdownOpen(item.label)}
                      onMouseLeave={() => setDropdownOpen(null)}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              // App flat navigation
              appNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-700 hover:text-indigo-600 transition-colors font-medium ${
                    pathname === item.href ? 'text-indigo-600' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {variant === 'website' ? (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-indigo-200 hover:border-indigo-300">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button variant="outline" className="border-gray-200">
                  Help
                </Button>
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  U
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {variant === 'website' ? (
                websiteNavItems.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="font-medium text-gray-900 px-2 py-1">{item.label}</div>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block pl-6 pr-2 py-1 text-sm text-gray-600 hover:text-indigo-600"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                ))
              ) : (
                appNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-2 py-2 text-gray-700 hover:text-indigo-600 ${
                      pathname === item.href ? 'text-indigo-600 font-medium' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                ))
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              {variant === 'website' ? (
                <>
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" className="w-full">
                  Help & Support
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}