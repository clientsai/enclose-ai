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
  Zap
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

          <header className="mb-8">
            <Stack gap="small">
              <Eyebrow icon={<Activity className="w-4 h-4" />}>
                Real-time Overview
              </Eyebrow>
              <Heading as="h1" gradient>Dashboard</Heading>
              <Lead>Monitor your payment performance and manage your integration</Lead>
            </Stack>
          </header>

          <Grid cols={3} className="mb-12">
            <Card hover className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <Text muted size="small" className="mb-1">Total Revenue</Text>
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
                  {formatCurrency(0)}
                </div>
                <Text muted size="small" className="mt-2">This month</Text>
              </div>
            </Card>

            <Card hover className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                  <LinkIcon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <Text muted size="small" className="mb-1">Active Links</Text>
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
                  {paymentLinks.length}
                </div>
                <Text muted size="small" className="mt-2">Payment links</Text>
              </div>
            </Card>

            <Card hover className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <Text muted size="small" className="mb-1">Conversions</Text>
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
                  0%
                </div>
                <Text muted size="small" className="mt-2">Conversion rate</Text>
              </div>
            </Card>
          </Grid>

          {stripeConnected && (
            <section className="mb-12">
              <Card className="p-8 bg-gradient-to-br from-white to-indigo-50/30">
                <Stack gap="default">
                  <header>
                    <Heading as="h2" size="h3">Create Payment Link</Heading>
                    <Text muted>Generate a new payment link for your product</Text>
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

          <Grid cols={2} gap="large">
            <Card className="overflow-hidden">
              <div className="p-6 bg-gradient-to-br from-gray-50 to-indigo-50/50">
                <Heading as="h2" size="h3">Recent Payment Links</Heading>
              </div>
              <Divider />
              <div className="p-6">
                {paymentLinks.length === 0 ? (
                  <Callout variant="info">
                    No payment links created yet
                  </Callout>
                ) : (
                  <Stack gap="small">
                    {paymentLinks.map((link) => (
                      <div key={link.id} className="p-4 bg-gradient-to-r from-white to-indigo-50/30 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <Text className="font-semibold text-gray-900">{link.product_name}</Text>
                            <Text size="small" muted>
                              {formatCurrency(link.amount)} • Created {formatDateTime(link.created_at)}
                            </Text>
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
                    ))}
                  </Stack>
                )}
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50/50">
                <Heading as="h2" size="h3">Recent Payments</Heading>
              </div>
              <Divider />
              <div className="p-6">
                {recentPayments.length === 0 ? (
                  <Callout variant="info">
                    No payments received yet
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
          </Grid>
        </Section>
      </main>
    </div>
  )
}