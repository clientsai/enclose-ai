'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  CreditCard,
  Settings,
  Check,
  Copy,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  Shield,
  Zap,
  DollarSign,
  Webhook,
  Key,
  TestTube,
  Globe,
  ArrowLeft,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { maskSensitiveData } from '@/lib/encryption-advanced'
import Logo from '@/components/Logo'

import { Section, Stack, Grid } from '@/components/premium/Section'
import { Heading, Text, Lead, Eyebrow } from '@/components/premium/Typography'
import { Button, Card, Divider, Badge, Callout } from '@/components/premium/UI'
import { FormField, Label, Input } from '@/components/premium/Forms'

// Default Clients.AI configuration (from environment variables)
const DEFAULT_CONFIG = {
  stripePublishableKey: process.env.NEXT_PUBLIC_CLIENTS_AI_STRIPE_PUBLISHABLE_KEY || '',
  stripeSecretKey: process.env.CLIENTS_AI_STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.CLIENTS_AI_STRIPE_WEBHOOK_SECRET || '',
  basicMonthlyPriceId: process.env.CLIENTS_AI_BASIC_MONTHLY_PRICE_ID || '',
  proMonthlyPriceId: process.env.CLIENTS_AI_PRO_MONTHLY_PRICE_ID || '',
  monthlyPriceId: process.env.CLIENTS_AI_MONTHLY_PRICE_ID || '',
  yearlyPriceId: process.env.CLIENTS_AI_YEARLY_PRICE_ID || '',
}

export default function ClientsAIIntegrationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showSecrets, setShowSecrets] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [useDefaultConfig, setUseDefaultConfig] = useState(true)
  const [existingConfig, setExistingConfig] = useState<any>(null)
  const [webhookUrl, setWebhookUrl] = useState('')

  const [formData, setFormData] = useState({
    stripePublishableKey: '',
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    basicMonthlyPriceId: '',
    proMonthlyPriceId: '',
    monthlyPriceId: '',
    yearlyPriceId: '',
    clientsAiApiKey: '',
    testMode: true,
  })

  useEffect(() => {
    loadIntegrationSettings()
  }, [])

  const loadIntegrationSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      const webhookEndpoint = `${window.location.origin}/api/clients-ai/webhook/${user.id}`
      setWebhookUrl(webhookEndpoint)

      // Load existing configuration
      const response = await fetch('/api/clients-ai/setup')
      if (response.ok) {
        const data = await response.json()
        if (data.configured) {
          setExistingConfig(data.data)
          // If already configured, show custom config by default
          setUseDefaultConfig(false)
          setFormData(prev => ({
            ...prev,
            stripePublishableKey: data.data.stripePublishableKey || '',
            basicMonthlyPriceId: data.data.basicMonthlyPriceId || '',
            proMonthlyPriceId: data.data.proMonthlyPriceId || '',
            monthlyPriceId: data.data.monthlyPriceId || '',
            yearlyPriceId: data.data.yearlyPriceId || '',
            testMode: data.data.testMode ?? true,
          }))
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const configToSave = useDefaultConfig ? {
        ...DEFAULT_CONFIG,
        clientsAiApiKey: formData.clientsAiApiKey,
        testMode: formData.testMode,
      } : formData

      const response = await fetch('/api/clients-ai/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configToSave),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save configuration')
      }

      alert('✅ Clients.AI integration configured successfully!')
      loadIntegrationSettings()
    } catch (error) {
      console.error('Save error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to save configuration'}`)
    } finally {
      setSaving(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const testCheckout = async () => {
    if (!existingConfig) {
      alert('Please save your configuration first')
      return
    }

    // Create test checkout session
    const response = await fetch('/api/clients-ai/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        integrationId: existingConfig.id,
        priceId: existingConfig.monthlyPriceId,
        customerEmail: user?.email,
        customerName: 'Test Customer',
        metadata: {
          test: true,
          source: 'integration_test',
        },
      }),
    })

    const result = await response.json()

    if (result.success && result.checkoutUrl) {
      window.open(result.checkoutUrl, '_blank')
    } else {
      alert('Failed to create test checkout')
    }
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
                <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Dashboard
                </Link>
                <Link href="/clients-ai" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                  Clients.AI
                </Link>
                <Link href="/settings" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                href="/dashboard"
                variant="outline"
                icon={<ArrowLeft className="h-4 w-4" />}
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <Section spacing="large">
        <header className="mb-10">
          <Stack gap="small">
            <Eyebrow icon={<Zap className="w-4 h-4" />}>
              Payment Integration
            </Eyebrow>
            <Heading as="h1" gradient>Clients.AI Integration</Heading>
            <Lead>Connect your Stripe account to process payments for Clients.AI subscriptions</Lead>
          </Stack>
        </header>

        {existingConfig?.isActive && (
          <Callout variant="success" className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <Text className="font-semibold">✅ Integration Active</Text>
                <Text size="small" muted>Your Clients.AI payment integration is configured and ready</Text>
              </div>
              <Button variant="outline" size="sm" onClick={testCheckout}>
                <TestTube className="h-4 w-4 mr-2" />
                Test Checkout
              </Button>
            </div>
          </Callout>
        )}

        <Card className="mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Heading as="h2" size="h3">Configuration Mode</Heading>
                <Text muted>Choose how to configure your Stripe integration</Text>
              </div>
              <Badge variant={useDefaultConfig ? 'primary' : 'success'} size="lg">
                {useDefaultConfig ? 'Default Config' : 'Custom Config'}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setUseDefaultConfig(true)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  useDefaultConfig
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    <Text className="font-semibold">Use Default Clients.AI Config</Text>
                  </div>
                  <Text size="small" muted>
                    Use the official Clients.AI Stripe account for processing payments.
                    Recommended for most users.
                  </Text>
                </div>
              </button>

              <button
                onClick={() => setUseDefaultConfig(false)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  !useDefaultConfig
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-5 w-5 text-indigo-600" />
                    <Text className="font-semibold">Use Custom Stripe Account</Text>
                  </div>
                  <Text size="small" muted>
                    Use your own Stripe account for full control over payments and fees.
                  </Text>
                </div>
              </button>
            </div>

            <Divider />

            {useDefaultConfig ? (
              <div className="mt-6">
                <Callout variant="info" className="mb-6">
                  <Text size="small">
                    Using the default Clients.AI Stripe configuration. You only need to provide
                    your Clients.AI API key if you want to sync data back to Clients.AI.
                  </Text>
                </Callout>

                <FormField>
                  <Label htmlFor="clientsAiApiKey">Clients.AI API Key (Optional)</Label>
                  <Input
                    id="clientsAiApiKey"
                    type={showSecrets ? 'text' : 'password'}
                    placeholder="Your Clients.AI API key"
                    value={formData.clientsAiApiKey}
                    onChange={(e) => setFormData({ ...formData, clientsAiApiKey: e.target.value })}
                  />
                  <Text size="small" muted className="mt-1">
                    Used to sync payment data back to your Clients.AI account
                  </Text>
                </FormField>
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <Text className="font-semibold">Stripe Configuration</Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSecrets(!showSecrets)}
                  >
                    {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showSecrets ? 'Hide' : 'Show'} Secrets
                  </Button>
                </div>

                <Grid cols={2} gap="default">
                  <FormField>
                    <Label htmlFor="stripePublishableKey">Stripe Publishable Key</Label>
                    <Input
                      id="stripePublishableKey"
                      placeholder="pk_test_... or pk_live_..."
                      value={formData.stripePublishableKey}
                      onChange={(e) => setFormData({ ...formData, stripePublishableKey: e.target.value })}
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                    <Input
                      id="stripeSecretKey"
                      type={showSecrets ? 'text' : 'password'}
                      placeholder="sk_test_... or sk_live_..."
                      value={formData.stripeSecretKey}
                      onChange={(e) => setFormData({ ...formData, stripeSecretKey: e.target.value })}
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="stripeWebhookSecret">Webhook Signing Secret</Label>
                    <Input
                      id="stripeWebhookSecret"
                      type={showSecrets ? 'text' : 'password'}
                      placeholder="whsec_..."
                      value={formData.stripeWebhookSecret}
                      onChange={(e) => setFormData({ ...formData, stripeWebhookSecret: e.target.value })}
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="clientsAiApiKey">Clients.AI API Key</Label>
                    <Input
                      id="clientsAiApiKey"
                      type={showSecrets ? 'text' : 'password'}
                      placeholder="Your Clients.AI API key"
                      value={formData.clientsAiApiKey}
                      onChange={(e) => setFormData({ ...formData, clientsAiApiKey: e.target.value })}
                    />
                  </FormField>
                </Grid>

                <Divider />

                <div>
                  <Text className="font-semibold mb-4">Subscription Price IDs</Text>
                  <Grid cols={2} gap="default">
                    <FormField>
                      <Label htmlFor="basicMonthlyPriceId">Basic Monthly Price ID</Label>
                      <Input
                        id="basicMonthlyPriceId"
                        placeholder="price_..."
                        value={formData.basicMonthlyPriceId}
                        onChange={(e) => setFormData({ ...formData, basicMonthlyPriceId: e.target.value })}
                      />
                    </FormField>

                    <FormField>
                      <Label htmlFor="proMonthlyPriceId">Pro Monthly Price ID</Label>
                      <Input
                        id="proMonthlyPriceId"
                        placeholder="price_..."
                        value={formData.proMonthlyPriceId}
                        onChange={(e) => setFormData({ ...formData, proMonthlyPriceId: e.target.value })}
                      />
                    </FormField>

                    <FormField>
                      <Label htmlFor="monthlyPriceId">Standard Monthly Price ID</Label>
                      <Input
                        id="monthlyPriceId"
                        placeholder="price_..."
                        value={formData.monthlyPriceId}
                        onChange={(e) => setFormData({ ...formData, monthlyPriceId: e.target.value })}
                      />
                    </FormField>

                    <FormField>
                      <Label htmlFor="yearlyPriceId">Yearly Price ID</Label>
                      <Input
                        id="yearlyPriceId"
                        placeholder="price_..."
                        value={formData.yearlyPriceId}
                        onChange={(e) => setFormData({ ...formData, yearlyPriceId: e.target.value })}
                      />
                    </FormField>
                  </Grid>
                </div>
              </div>
            )}

            <Divider />

            <div className="flex items-center justify-between mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.testMode}
                  onChange={(e) => setFormData({ ...formData, testMode: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <Text>Test Mode</Text>
                <Badge variant={formData.testMode ? 'warning' : 'success'} size="sm">
                  {formData.testMode ? 'TEST' : 'LIVE'}
                </Badge>
              </label>

              <Button
                onClick={handleSave}
                disabled={saving}
                variant="primary"
                gradient
                icon={<Save className="h-4 w-4" />}
              >
                {saving ? 'Saving...' : 'Save Configuration'}
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <Heading as="h3" size="h4" className="mb-4">Webhook Configuration</Heading>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Text size="small" className="font-semibold mb-1">Your Webhook Endpoint</Text>
                  <code className="text-sm text-gray-700 break-all">{webhookUrl}</code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(webhookUrl, 'webhook')}
                >
                  {copied === 'webhook' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Callout variant="info">
              <Text size="small">
                Add this webhook endpoint to your Stripe dashboard and select these events:
                <ul className="mt-2 list-disc list-inside">
                  <li>checkout.session.completed</li>
                  <li>customer.subscription.created</li>
                  <li>customer.subscription.updated</li>
                  <li>customer.subscription.deleted</li>
                  <li>payment_intent.succeeded</li>
                  <li>payment_intent.payment_failed</li>
                </ul>
              </Text>
            </Callout>

            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => window.open('https://dashboard.stripe.com/webhooks', '_blank')}
                icon={<Webhook className="h-4 w-4" />}
              >
                Configure in Stripe Dashboard
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  )
}