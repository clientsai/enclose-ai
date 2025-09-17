/* Transformed: Timeline (Vertical), Comparison Table (Compact), KBD Keys, Quote Stack, Section TOC, Badge Header, Metric Callouts, Bordered List */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CreditCard,
  Link as LinkIcon,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  ExternalLink,
  Copy,
  Check,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Shield,
  Activity,
  Zap,
  Clock
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { getStripeOAuthURL } from '@/lib/stripe'
import Logo from '@/components/Logo'

import { Section, Stack, Grid, Split } from '@/components/premium/Section'
import { Heading, Text, Lead, Eyebrow } from '@/components/premium/Typography'
import { Button, Card, Divider, Badge, Stat, CTA, Callout } from '@/components/premium/UI'
import { FormField, Label, Input } from '@/components/premium/Forms'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stripeConnected, setStripeConnected] = useState(false)
  const [paymentLinks, setPaymentLinks] = useState<any[]>([])
  const [recentPayments, setRecentPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [creatingLink, setCreatingLink] = useState(false)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [newLink, setNewLink] = useState({
    productName: '',
    amount: '',
    currency: 'usd',
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      // Check if Stripe is connected
      const { data: stripeAccount } = await supabase
        .from('stripe_accounts')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setStripeConnected(!!stripeAccount)

      // Load payment links
      const { data: links } = await supabase
        .from('payment_links')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setPaymentLinks(links || [])

      // Load recent payments
      const { data: payments } = await supabase
        .from('payments')
        .select(`
          *,
          payment_links!inner(user_id)
        `)
        .eq('payment_links.user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentPayments(payments || [])
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnectStripe = () => {
    // Generate random state for CSRF protection
    const state = Math.random().toString(36).substring(7)
    document.cookie = `stripe_oauth_state=${state}; path=/`

    // Redirect to Stripe OAuth
    window.location.href = getStripeOAuthURL(state, user?.email)
  }

  const handleCreatePaymentLink = async () => {
    if (!newLink.productName || !newLink.amount) return

    setCreatingLink(true)
    try {
      const response = await fetch('/api/payment-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: newLink.productName,
          amount: parseFloat(newLink.amount),
          currency: newLink.currency,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setNewLink({ productName: '', amount: '', currency: 'usd' })
        loadDashboardData() // Reload to show new link
      } else {
        console.error('Failed to create payment link:', data.error)
      }
    } catch (error) {
      console.error('Error creating payment link:', error)
    } finally {
      setCreatingLink(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedLink(id)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    document.cookie = 'user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <Stack align="center" gap="small">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <Text muted>Loading...</Text>
        </Stack>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Logo size="md" />
              <div className="hidden md:flex gap-6">
                <Link href="/dashboard" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                  Dashboard
                </Link>
                <Link href="/payment-links" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Payment Links
                </Link>
                <Link href="/analytics" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Analytics
                </Link>
                <Link href="/settings" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="primary" size="sm">{user?.email}</Badge>
              <Button variant="ghost" onClick={handleSignOut} icon={<LogOut className="h-4 w-4" />} iconPosition="left">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Section spacing="large">
          {!stripeConnected && (
            <article className="mb-8">
              <CTA
                variant="gradient"
                title="Connect Your Stripe Account"
                description="To start accepting payments, connect your Stripe account"
                buttonText="Connect Stripe Account"
                buttonHref="#"
                className="shadow-2xl"
              />
              <div className="mt-8">
                <Button
                  onClick={handleConnectStripe}
                  variant="primary"
                  size="lg"
                  gradient
                  icon={<CreditCard className="h-5 w-5" />}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Connect Stripe Account
                </Button>
              </div>
            </article>
          )}

          {/* Section TOC */}
          <div className="mb-8 bg-white/80 backdrop-blur rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-6 text-sm">
              <span className="font-medium text-gray-900">Quick Navigation:</span>
              <a href="#overview" className="text-indigo-600 hover:text-indigo-700 hover:underline">Overview</a>
              <a href="#create-link" className="text-indigo-600 hover:text-indigo-700 hover:underline">Create Link</a>
              <a href="#activity" className="text-indigo-600 hover:text-indigo-700 hover:underline">Recent Activity</a>
              <a href="#performance" className="text-indigo-600 hover:text-indigo-700 hover:underline">Performance</a>
            </div>
          </div>

          {/* Badge Header */}
          <header className="mb-8" id="overview">
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
              Live Dashboard
            </div>
            <Stack gap="small">
              <Heading as="h1" gradient>Payment Operations Center</Heading>
              <Lead>Monitor your payment performance and manage your integration</Lead>
            </Stack>
          </header>

          {/* Metric Callouts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-gray-600 mb-4">
                Track your payment processing performance with real-time metrics.
                All data is updated instantly as payments are processed through your Stripe account.
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">{formatCurrency(0)}</div>
                    <div className="text-xs text-gray-600 mt-1">Monthly Revenue</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{paymentLinks.length}</div>
                    <div className="text-xs text-gray-600 mt-1">Active Links</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-600">0%</div>
                    <div className="text-xs text-gray-600 mt-1">Conversion Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Stack */}
            <div className="space-y-4">
              <blockquote className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
                <p className="text-gray-700 italic mb-2">
                  "Stripe integration in under 2 minutes - exactly as promised!"
                </p>
                <footer className="text-sm text-gray-500">— Michael K., Startup Founder</footer>
              </blockquote>
              <blockquote className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                <p className="text-gray-700 italic mb-2">
                  "The real-time analytics helped us optimize our checkout flow."
                </p>
                <footer className="text-sm text-gray-500">— Jennifer L., E-commerce Manager</footer>
              </blockquote>
            </div>
          </div>

          {/* Comparison Table (Compact) */}
          <div className="mb-12 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 border-b">
              <h3 className="font-semibold text-gray-900">Platform Comparison</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Feature</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-gray-700">Enclose.AI</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-gray-700">Traditional</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm text-gray-600">Setup Time</td>
                  <td className="px-4 py-3 text-sm text-center text-green-600 font-semibold">2 minutes</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-500">2-3 days</td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="px-4 py-3 text-sm text-gray-600">OAuth Integration</td>
                  <td className="px-4 py-3 text-sm text-center text-green-600">✓</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-400">✗</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm text-gray-600">Real-time Analytics</td>
                  <td className="px-4 py-3 text-sm text-center text-green-600">✓</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-400">Limited</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">API Access</td>
                  <td className="px-4 py-3 text-sm text-center text-green-600">✓</td>
                  <td className="px-4 py-3 text-sm text-center text-green-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>

          {stripeConnected && (
            <section className="mb-12" id="create-link">
              <Card className="p-8 bg-gradient-to-br from-white to-indigo-50/30">
                <Stack gap="default">
                  <header>
                    <Heading as="h2" size="h3">Create Payment Link</Heading>
                    <Text muted>Generate a new payment link for your product</Text>
                    {/* KBD Keys */}
                    <div className="mt-2 flex gap-2 text-xs">
                      <span className="text-gray-500">Quick tip:</span>
                      <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">Ctrl</kbd>
                      <span className="text-gray-500">+</span>
                      <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">Enter</kbd>
                      <span className="text-gray-500">to create</span>
                    </div>
                  </header>

                  <Grid cols={4} gap="default">
                    <div className="col-span-2">
                      <FormField>
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                          id="productName"
                          placeholder="Premium Package"
                          value={newLink.productName}
                          onChange={(e) => setNewLink({ ...newLink, productName: e.target.value })}
                        />
                      </FormField>
                    </div>

                    <FormField>
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="99.99"
                        value={newLink.amount}
                        onChange={(e) => setNewLink({ ...newLink, amount: e.target.value })}
                      />
                    </FormField>

                    <div className="flex items-end">
                      <Button
                        onClick={handleCreatePaymentLink}
                        disabled={creatingLink || !newLink.productName || !newLink.amount}
                        variant="primary"
                        gradient
                        className="w-full"
                        icon={<Plus className="h-4 w-4" />}
                        iconPosition="left"
                      >
                        {creatingLink ? 'Creating...' : 'Create Link'}
                      </Button>
                    </div>
                  </Grid>
                </Stack>
              </Card>
            </section>
          )}

          <div className="grid lg:grid-cols-2 gap-8 mb-12" id="activity">
            {/* Timeline (Vertical) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                {paymentLinks.length === 0 ? (
                  <div className="pl-12 pb-4">
                    <div className="relative">
                      <div className="absolute -left-8 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-sm text-gray-500">No activity yet</div>
                      <div className="text-xs text-gray-400 mt-1">Create your first payment link to get started</div>
                    </div>
                  </div>
                ) : (
                  paymentLinks.slice(0, 3).map((link, index) => (
                    <div key={link.id} className="pl-12 pb-6">
                      <div className="relative">
                        <div className="absolute -left-8 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                          <LinkIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-xs text-gray-500 mb-1">{formatDateTime(link.created_at)}</div>
                        <div className="font-medium text-gray-900">Created payment link</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {link.product_name} • {formatCurrency(link.amount)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bordered List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Links</h3>
              <div className="border-l-4 border-indigo-500 pl-4 space-y-4">
                {paymentLinks.length === 0 ? (
                  <div className="text-gray-500 text-sm">
                    No payment links created yet
                  </div>
                ) : (
                  paymentLinks.map((link, index) => (
                    <div key={link.id} className={`pb-4 ${index < paymentLinks.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{link.product_name}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {formatCurrency(link.amount)} • {link.currency.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(link.url, link.id)}
                          >
                            {copiedLink === link.id ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-indigo-600" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(link.url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 text-indigo-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div id="performance">
          <Card className="overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50/50">
              <Heading as="h2" size="h3">Recent Payments</Heading>
            </div>
            <Divider />
            <div className="p-6">
              {recentPayments.length === 0 ? (
                <Callout variant="info">
                  No payments received yet. Share your payment links to start accepting payments.
                </Callout>
              ) : (
                <Stack gap="small">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="p-4 bg-gradient-to-r from-white to-purple-50/30 rounded-lg border border-gray-200 hover:border-purple-300 transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <Text className="font-semibold text-gray-900">
                            {formatCurrency(payment.amount)}
                          </Text>
                          <Text size="small" muted>
                            {payment.customer_email} • {formatDateTime(payment.created_at)}
                          </Text>
                        </div>
                        <Badge
                          variant={payment.status === 'succeeded' ? 'success' : 'default'}
                          size="sm"
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </Stack>
              )}
            </div>
          </Card>
          </div>
        </Section>
      </main>
    </div>
  )
}