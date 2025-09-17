'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { generateApiKey, hashApiKey, getApiKeyPrefix } from '@/lib/encryption'
import { formatDateTime } from '@/lib/utils'
import { Copy, Eye, EyeOff, Key, Trash2, Plus, Check, LogOut, ArrowLeft, Code, Shield, Terminal, Sparkles, FileCode } from 'lucide-react'
import Logo from '@/components/Logo'

import { Section, Stack, Grid } from '@/components/premium/Section'
import { Heading, Text, Eyebrow, Prose } from '@/components/premium/Typography'
import { Button, Card, Divider, Badge, Callout, Tabs } from '@/components/premium/UI'
import { FormField, Label, Input } from '@/components/premium/Forms'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [apiKeys, setApiKeys] = useState<any[]>([])
  const [newKeyName, setNewKeyName] = useState('')
  const [creatingKey, setCreatingKey] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      // Load API keys
      const { data: keys } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', user.id)
        .eq('active', true)
        .order('created_at', { ascending: false })

      setApiKeys(keys || [])
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim()) return

    setCreatingKey(true)
    try {
      const apiKey = generateApiKey()
      const keyHash = hashApiKey(apiKey)
      const keyPrefix = getApiKeyPrefix(apiKey)

      const { error } = await supabase.from('api_keys').insert({
        user_id: user.id,
        key_hash: keyHash,
        key_prefix: keyPrefix,
        name: newKeyName,
        active: true,
      })

      if (!error) {
        setNewKey(apiKey)
        setNewKeyName('')
        loadSettings()
      }
    } catch (error) {
      console.error('Error creating API key:', error)
    } finally {
      setCreatingKey(false)
    }
  }

  const handleDeleteApiKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return

    try {
      await supabase
        .from('api_keys')
        .update({ active: false, revoked_at: new Date().toISOString() })
        .eq('id', keyId)

      loadSettings()
    } catch (error) {
      console.error('Error deleting API key:', error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
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
                <Link href="/payment-links" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Payment Links
                </Link>
                <Link href="/analytics" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Analytics
                </Link>
                <Link href="/settings" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
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

      <main>
        <Section spacing="large" width="narrow">
          <header className="mb-10">
            <Stack gap="small">
              <Eyebrow icon={<Shield className="w-4 h-4" />}>
                Developer Tools
              </Eyebrow>
              <Heading as="h1" gradient>Settings</Heading>
              <Text muted size="large">Manage your API keys and integration settings</Text>
            </Stack>
          </header>

          <Card className="mb-10 overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                  <Key className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Heading as="h2" size="h3">API Keys</Heading>
                  <Text muted>Manage API keys for Clients.AI integration</Text>
                </div>
              </div>
            </div>
            <Divider />
            <div className="p-6">
              {newKey && (
                <Callout variant="success" title="API Key Created Successfully" icon={<Sparkles className="h-4 w-4" />} className="mb-6">
                  <Stack gap="small">
                    <Text size="small">Save this key now. You won't be able to see it again!</Text>
                    <div className="flex items-center gap-2">
                      <Input
                        value={newKey}
                        readOnly
                        className="font-mono text-sm bg-white"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(newKey)}
                      >
                        {copiedKey ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setNewKey(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </Stack>
                </Callout>
              )}

              <div className="flex gap-3 mb-6">
                <Input
                  placeholder="API Key Name (e.g., Production)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleCreateApiKey}
                  disabled={creatingKey || !newKeyName.trim()}
                  variant="primary"
                  gradient
                  icon={<Plus className="h-4 w-4" />}
                  iconPosition="left"
                >
                  {creatingKey ? 'Creating...' : 'Create Key'}
                </Button>
              </div>

              {apiKeys.length === 0 ? (
                <Callout variant="info">
                  No API keys created yet
                </Callout>
              ) : (
                <Stack gap="small">
                  {apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-indigo-50/30 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Key className="h-4 w-4 text-indigo-600" />
                          <Text className="font-semibold">{key.name}</Text>
                          <Badge variant="default" size="sm">
                            {key.key_prefix}...
                          </Badge>
                        </div>
                        <Text size="small" muted className="mt-1">
                          Created {formatDateTime(key.created_at)}
                          {key.last_used && ` • Last used ${formatDateTime(key.last_used)}`}
                        </Text>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteApiKey(key.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </Stack>
              )}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-cyan-50/50 to-blue-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Heading as="h2" size="h3">API Documentation</Heading>
                  <Text muted>Learn how to integrate Enclose.AI with Clients.AI</Text>
                </div>
              </div>
            </div>
            <Divider />
            <div className="p-6">
              <Stack gap="large">
                <section>
                  <Stack gap="small">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-indigo-600" />
                      <Heading as="h3" size="h4">Base URL</Heading>
                    </div>
                    <Input
                      value={`${process.env.NEXT_PUBLIC_APP_URL}/api/v1`}
                      readOnly
                      className="font-mono text-sm bg-gray-50"
                    />
                  </Stack>
                </section>

                <section>
                  <Stack gap="small">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-indigo-600" />
                      <Heading as="h3" size="h4">Authentication</Heading>
                    </div>
                    <Text muted size="small">
                      Include your API key in the Authorization header:
                    </Text>
                    <pre className="p-4 bg-gradient-to-br from-gray-900 to-indigo-900 text-green-400 rounded-lg text-sm font-mono overflow-x-auto">
                      {`Authorization: Bearer encl_your_api_key_here`}
                    </pre>
                  </Stack>
                </section>

                <section>
                  <Stack gap="small">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-indigo-600" />
                      <Heading as="h3" size="h4">Create Checkout</Heading>
                    </div>
                    <Badge variant="primary" size="sm" className="self-start">POST /checkout</Badge>
                    <pre className="p-4 bg-gradient-to-br from-gray-900 to-indigo-900 text-cyan-400 rounded-lg text-sm font-mono overflow-x-auto">
{`{
  "agent_id": "agent_123",
  "customer_email": "customer@example.com",
  "product_name": "Premium Package",
  "amount": 99.99,
  "currency": "usd"
}`}
                    </pre>
                  </Stack>
                </section>

                <section>
                  <Stack gap="small">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <Heading as="h3" size="h4">Response</Heading>
                    </div>
                    <pre className="p-4 bg-gradient-to-br from-gray-900 to-purple-900 text-green-400 rounded-lg text-sm font-mono overflow-x-auto">
{`{
  "success": true,
  "checkout_url": "https://checkout.stripe.com/pay/...",
  "payment_link_id": "link_abc123"
}`}
                    </pre>
                  </Stack>
                </section>
              </Stack>
            </div>
          </Card>
        </Section>
      </main>
    </div>
  )
}