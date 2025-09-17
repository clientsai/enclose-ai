'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  ArrowRight
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { getStripeOAuthURL } from '@/lib/stripe'
import Logo from '@/components/Logo'

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/70 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Logo size="md" />
              <div className="hidden md:flex gap-6">
                <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
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
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="hover:bg-indigo-50">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!stripeConnected && (
          <Card className="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Connect Your Stripe Account</CardTitle>
              <CardDescription className="text-indigo-100">
                To start accepting payments, connect your Stripe account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleConnectStripe} className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Connect Stripe Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
                {formatCurrency(0)}
              </div>
              <p className="text-xs text-gray-600 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Links</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                <LinkIcon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
                {paymentLinks.length}
              </div>
              <p className="text-xs text-gray-600 mt-1">Payment links</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conversions</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
                0%
              </div>
              <p className="text-xs text-gray-600 mt-1">Conversion rate</p>
            </CardContent>
          </Card>
        </div>

        {stripeConnected && (
          <Card className="mb-8 border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Create Payment Link</CardTitle>
              <CardDescription className="text-gray-600">Generate a new payment link for your product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="productName" className="text-gray-700">Product Name</Label>
                  <Input
                    id="productName"
                    placeholder="Premium Package"
                    className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                    value={newLink.productName}
                    onChange={(e) => setNewLink({ ...newLink, productName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="amount" className="text-gray-700">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="99.99"
                    className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                    value={newLink.amount}
                    onChange={(e) => setNewLink({ ...newLink, amount: e.target.value })}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleCreatePaymentLink}
                    disabled={creatingLink || !newLink.productName || !newLink.amount}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                  >
                    {creatingLink ? 'Creating...' : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Link
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Payment Links</CardTitle>
            </CardHeader>
            <CardContent>
              {paymentLinks.length === 0 ? (
                <p className="text-gray-500 text-sm">No payment links created yet</p>
              ) : (
                <div className="space-y-3">
                  {paymentLinks.map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:border-indigo-200 transition-all">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{link.product_name}</p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(link.amount)} • Created {formatDateTime(link.created_at)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(link.url, link.id)}
                          className="hover:bg-indigo-50"
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
                          className="hover:bg-indigo-50"
                        >
                          <ExternalLink className="h-4 w-4 text-indigo-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {recentPayments.length === 0 ? (
                <p className="text-gray-500 text-sm">No payments received yet</p>
              ) : (
                <div className="space-y-3">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border border-gray-200 hover:border-indigo-200 transition-all">
                      <div>
                        <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                        <p className="text-sm text-gray-600">
                          {payment.customer_email} • {formatDateTime(payment.created_at)}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'succeeded'
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                      }`}>
                        {payment.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}