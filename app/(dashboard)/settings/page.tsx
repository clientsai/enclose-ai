/* Transformed: Callout—Muted, Pros/Cons Table, Mini Tabs (CSS-only), FAQ Strip, Key Takeaways, Code Snippet Box, Legal Clause List, Expandable Excerpt */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { generateApiKey, hashApiKey, getApiKeyPrefix } from '@/lib/encryption'
import { formatDateTime } from '@/lib/utils'
import { Copy, Eye, EyeOff, Key, Trash2, Plus, Check, LogOut, ArrowLeft, Code, Shield, Terminal, Sparkles, FileCode, ChevronDown, ChevronUp, AlertCircle, CheckCircle, X } from 'lucide-react'
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
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'api' | 'webhooks' | 'security'>('api')
  const [expandedExcerpt, setExpandedExcerpt] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

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
      } as any)

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
      await supabaseAdmin
        .from('api_keys')
        .update({ active: false, revoked_at: new Date().toISOString() })
        .eq('id', keyId)

      loadSettings()
    } catch (error) {
      console.error('Error deleting API key:', error)
    }
  }

  const copyToClipboard = (text: string, id?: string) => {
    navigator.clipboard.writeText(text)
    if (id) {
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } else {
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
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

          {/* Key Takeaways */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-indigo-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
              Key Takeaways
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">API keys are required for Clients.AI integration</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Each key can be named and tracked independently</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Webhooks enable real-time payment notifications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">All API calls must include the Bearer token</span>
              </li>
            </ul>
          </div>

          {/* Mini Tabs (CSS-only) */}
          <div className="mb-8">
            <div className="flex gap-2 p-1 bg-white rounded-lg shadow-md">
              <input type="radio" id="tab-api" name="settings-tabs" className="hidden" checked={activeTab === 'api'} onChange={() => setActiveTab('api')} />
              <label htmlFor="tab-api" className={`flex-1 text-center py-2 px-4 rounded-md cursor-pointer transition-all ${activeTab === 'api' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                API Keys
              </label>

              <input type="radio" id="tab-webhooks" name="settings-tabs" className="hidden" checked={activeTab === 'webhooks'} onChange={() => setActiveTab('webhooks')} />
              <label htmlFor="tab-webhooks" className={`flex-1 text-center py-2 px-4 rounded-md cursor-pointer transition-all ${activeTab === 'webhooks' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                Webhooks
              </label>

              <input type="radio" id="tab-security" name="settings-tabs" className="hidden" checked={activeTab === 'security'} onChange={() => setActiveTab('security')} />
              <label htmlFor="tab-security" className={`flex-1 text-center py-2 px-4 rounded-md cursor-pointer transition-all ${activeTab === 'security' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                Security
              </label>
            </div>
          </div>

          {activeTab === 'api' && (
            <>
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

                  {/* Callout—Muted */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Important Note</h4>
                        <p className="text-sm text-gray-600">
                          API keys provide full access to your Enclose.AI account. Keep them secure and never expose them in client-side code or public repositories.
                        </p>
                      </div>
                    </div>
                  </div>

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

              {/* Code Snippet Box */}
              <Card className="mb-8">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Example</h3>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <button
                      onClick={() => copyToClipboard(`const response = await fetch('${process.env.NEXT_PUBLIC_APP_URL}/api/v1/checkout', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    agent_id: 'agent_123',
    customer_email: 'customer@example.com',
    product_name: 'Premium Package',
    amount: 99.99,
    currency: 'usd'
  })
});

const data = await response.json();
console.log(data.checkout_url);`, 'quickstart')}
                      className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                    >
                      {copiedCode === 'quickstart' ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                      <code className="language-javascript">{`const response = await fetch('${process.env.NEXT_PUBLIC_APP_URL}/api/v1/checkout', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    agent_id: 'agent_123',
    customer_email: 'customer@example.com',
    product_name: 'Premium Package',
    amount: 99.99,
    currency: 'usd'
  })
});

const data = await response.json();
console.log(data.checkout_url);`}</code>
                    </pre>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === 'webhooks' && (
            <>
              {/* Pros/Cons Table */}
              <Card className="mb-8">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Webhook Configuration Options</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium text-green-700 mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Advantages
                      </h4>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-700">• Real-time payment notifications</li>
                        <li className="text-sm text-gray-700">• Automatic retry on failure</li>
                        <li className="text-sm text-gray-700">• Event filtering by type</li>
                        <li className="text-sm text-gray-700">• Secure signature verification</li>
                        <li className="text-sm text-gray-700">• Detailed event logs</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-700 mb-3 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Considerations
                      </h4>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-700">• Requires public endpoint</li>
                        <li className="text-sm text-gray-700">• Must handle duplicates</li>
                        <li className="text-sm text-gray-700">• Needs signature validation</li>
                        <li className="text-sm text-gray-700">• May arrive out of order</li>
                        <li className="text-sm text-gray-700">• Rate limits apply</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* FAQ Strip */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                  <h3 className="font-semibold text-gray-900">Webhook FAQs</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="p-4">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === 'retry' ? null : 'retry')}
                      className="w-full text-left flex items-center justify-between text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      <span className="font-medium">Q: How many times will failed webhooks retry?</span>
                      {expandedFaq === 'retry' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedFaq === 'retry' && (
                      <p className="mt-2 text-sm text-gray-600">A: Failed webhooks will retry up to 3 times with exponential backoff (1 minute, 5 minutes, 30 minutes).</p>
                    )}
                  </div>
                  <div className="p-4">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === 'events' ? null : 'events')}
                      className="w-full text-left flex items-center justify-between text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      <span className="font-medium">Q: Which events trigger webhooks?</span>
                      {expandedFaq === 'events' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedFaq === 'events' && (
                      <p className="mt-2 text-sm text-gray-600">A: Webhooks fire for payment.succeeded, payment.failed, refund.created, and dispute.created events.</p>
                    )}
                  </div>
                  <div className="p-4">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === 'verify' ? null : 'verify')}
                      className="w-full text-left flex items-center justify-between text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      <span className="font-medium">Q: How do I verify webhook signatures?</span>
                      {expandedFaq === 'verify' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedFaq === 'verify' && (
                      <p className="mt-2 text-sm text-gray-600">A: Each webhook includes an X-Enclose-Signature header. Verify it using HMAC-SHA256 with your webhook secret.</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'security' && (
            <>
              {/* Legal Clause List */}
              <Card className="mb-8">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Requirements</h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <span className="font-bold text-indigo-600 mr-4 mt-0.5">1.</span>
                      <div>
                        <strong className="text-gray-900">API Key Storage</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          API keys must be stored securely using environment variables or secure key management systems.
                          Never commit API keys to version control or expose them in client-side code.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-indigo-600 mr-4 mt-0.5">2.</span>
                      <div>
                        <strong className="text-gray-900">HTTPS Requirement</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          All API requests must be made over HTTPS. Requests over HTTP will be rejected
                          with a 403 Forbidden error to ensure data security in transit.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-indigo-600 mr-4 mt-0.5">3.</span>
                      <div>
                        <strong className="text-gray-900">Rate Limiting</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          API requests are limited to 100 requests per minute per API key. Exceeding this
                          limit will result in a 429 Too Many Requests response.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-indigo-600 mr-4 mt-0.5">4.</span>
                      <div>
                        <strong className="text-gray-900">IP Allowlisting</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          For enhanced security, you may configure IP allowlisting for your API keys.
                          Only requests from allowed IP addresses will be accepted.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-indigo-600 mr-4 mt-0.5">5.</span>
                      <div>
                        <strong className="text-gray-900">Audit Logging</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          All API requests are logged for security and compliance purposes. Logs include
                          timestamp, endpoint, response code, and requesting IP address.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </Card>

              {/* Expandable Excerpt */}
              <Card className="mb-8">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Best Practices</h3>
                  <div className="text-gray-600 text-sm">
                    <p className={`${!expandedExcerpt ? 'line-clamp-3' : ''}`}>
                      When integrating Enclose.AI with your Clients.AI agents, security should be your top priority.
                      Start by implementing proper authentication using Bearer tokens in the Authorization header.
                      Never expose API keys in frontend code or public repositories. Use environment variables to store
                      sensitive credentials and rotate keys regularly. Implement webhook signature verification to ensure
                      requests are genuinely from Enclose.AI. Monitor your API usage for unusual patterns that might
                      indicate compromised credentials. Enable IP allowlisting when possible to restrict access to known
                      servers. Use separate API keys for development, staging, and production environments. Implement
                      proper error handling that doesn't expose sensitive information in error messages. Keep audit logs
                      of all payment-related activities for compliance and debugging purposes.
                    </p>
                    <button
                      onClick={() => setExpandedExcerpt(!expandedExcerpt)}
                      className="mt-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
                    >
                      {expandedExcerpt ? (
                        <>Show less <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>Read more <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
              </Card>
            </>
          )}

          <Card className="overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-cyan-50/50 to-blue-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Heading as="h2" size="h3">API Reference</Heading>
                  <Text muted>Complete documentation for all endpoints</Text>
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
                      <Heading as="h3" size="h4">Endpoints</Heading>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="primary" size="sm">POST /checkout</Badge>
                          <span className="text-xs text-gray-500">Create payment link</span>
                        </div>
                        <p className="text-sm text-gray-600">Generate a Stripe checkout session for payment collection</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="success" size="sm">GET /payments</Badge>
                          <span className="text-xs text-gray-500">List payments</span>
                        </div>
                        <p className="text-sm text-gray-600">Retrieve all payments for your account with pagination</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="warning" size="sm">POST /webhooks</Badge>
                          <span className="text-xs text-gray-500">Configure webhooks</span>
                        </div>
                        <p className="text-sm text-gray-600">Set up webhook endpoints for payment events</p>
                      </div>
                    </div>
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