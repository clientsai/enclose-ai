"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Products", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  {
    name: "Solutions",
    href: "#",
    children: [
      { name: "Marketplaces", href: "/solutions/marketplaces" },
      { name: "SaaS Platforms", href: "/solutions/saas-platforms" },
      { name: "Creator Economy", href: "/solutions/creator-economy" },
    ],
  },
  { name: "Developers", href: "/developers" },
  {
    name: "Resources",
    href: "#",
    children: [
      { name: "Documentation", href: "https://docs.enclose.ai" },
      { name: "API Reference", href: "https://api.enclose.ai" },
      { name: "Blog", href: "/blog" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Help Center", href: "/help" },
      { name: "Changelog", href: "/changelog" },
      { name: "Status", href: "/status" },
    ],
  },
        {
          name: "Company",
          href: "#",
          children: [
            { name: "About", href: "/about" },
            { name: "Team", href: "/team" },
            { name: "Careers", href: "/careers" },
            { name: "Press", href: "/press" },
            { name: "Partners", href: "/partners" },
            { name: "Contact", href: "/contact" },
          ],
        },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="text-2xl font-bold">
                <span className="gradient-text">enclose</span>
                <span className="text-white">.ai</span>
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium leading-6 text-gray-900 hover:text-[#635BFF] transition-colors",
                        pathname.startsWith(item.href) && "text-[#635BFF]"
                      )}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 top-full z-10 mt-2 w-48 origin-top-left rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#635BFF]"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium leading-6 text-gray-900 hover:text-[#635BFF] transition-colors",
                      pathname === item.href && "text-[#635BFF]"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Button variant="ghost" asChild>
              <Link href="https://app.enclose.ai">Sign in</Link>
            </Button>
            <Button variant="gradient" asChild>
              <Link href="https://app.enclose.ai/create">Start building</Link>
            </Button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-bold">
                    <span className="gradient-text">enclose</span>
                    <span className="text-white">.ai</span>
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        {item.children ? (
                          <div className="space-y-2">
                            <p className="block px-3 py-2 text-base font-semibold leading-7 text-gray-900">
                              {item.name}
                            </p>
                            <div className="pl-6 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="block px-3 py-2 text-sm leading-6 text-gray-600 hover:text-[#635BFF]"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="block px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-[#635BFF]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="py-6 space-y-2">
                    <Link
                      href="https://app.enclose.ai"
                      className="block px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:text-[#635BFF]"
                    >
                      Sign in
                    </Link>
                    <Button variant="gradient" className="w-full" asChild>
                      <Link href="https://app.enclose.ai/create">Start building</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
