/* Settings Page - API Keys, Webhooks, and Account Management */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { generateApiKey, hashApiKey, getApiKeyPrefix } from '@/lib/encryption'
import { formatDateTime } from '@/lib/utils'
import { Copy, Eye, EyeOff, Key, Trash2, Plus, Check, LogOut, ArrowLeft, Code, Shield, Terminal, Sparkles, FileCode, ChevronDown, ChevronUp, AlertCircle, CheckCircle, X } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState({
    apiKeys: [] as any[],
    webhookUrl: '',
    stripeConnected: false,
  })
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [generatedKey, setGeneratedKey] = useState('')
  const [showKey, setShowKey] = useState<{ [key: string]: boolean }>({})
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('api-keys')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        loadSettings()
      }
    }

    checkAuth()
  }, [router])

  const loadSettings = async () => {
    if (!user) return

    setLoading(true)
    try {
      // Load API keys
      const { data: apiKeys } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', user.id)
        .eq('active', true)
        .order('created_at', { ascending: false })

      // Load webhook URL
      const { data: webhook } = await supabase
        .from('webhook_configs')
        .select('webhook_url')
        .eq('user_id', user.id)
        .single()

      // Check Stripe connection
      const { data: stripeAccount } = await supabase
        .from('stripe_accounts')
        .select('stripe_account_id')
        .eq('user_id', user.id)
        .single()

      setSettings({
        apiKeys: apiKeys || [],
        webhookUrl: (webhook as any)?.webhook_url || '',
        stripeConnected: !!(stripeAccount as any)?.stripe_account_id,
      })
    } catch (error) {
      console.error('Error loading settings:', error)
    }
    setLoading(false)
  }

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim()) return

    const rawKey = generateApiKey()
    const hashedKey = hashApiKey(rawKey)
    const prefix = getApiKeyPrefix(rawKey)

    try {
      const { error } = await (supabase as any)
        .from('api_keys')
        .insert({
          user_id: user.id,
          key_hash: hashedKey,
          key_prefix: prefix,
          name: newKeyName,
          active: true,
        })

      if (error) throw error

      setGeneratedKey(rawKey)
      setShowNewKeyForm(false)
      setNewKeyName('')
      loadSettings()
    } catch (error) {
      console.error('Error creating API key:', error)
    }
  }

  const handleDeleteApiKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return

    try {
      const { error } = await (supabase as any)
        .from('api_keys')
        .update({
          active: false,
          revoked_at: new Date().toISOString()
        })
        .eq('id', keyId)

      if (error) throw error

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
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <nav className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Logo size="md" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button onClick={handleSignOut} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your API keys, webhooks, and account preferences</p>
        </div>

        {/* Mini Tabs (CSS-only) */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('api-keys')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'api-keys'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              API Keys
            </button>
            <button
              onClick={() => setActiveTab('webhooks')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'webhooks'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Webhooks
            </button>
            <button
              onClick={() => setActiveTab('integration')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'integration'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Integration Guide
            </button>
          </div>

          <div className="p-8">
            {/* API Keys Tab */}
            {activeTab === 'api-keys' && (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">API Keys</h2>
                    <p className="text-gray-600">Manage your API keys for Clients.AI integration</p>
                  </div>
                  <Button
                    onClick={() => setShowNewKeyForm(true)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Key
                  </Button>
                </div>

                {/* Callout—Muted */}
                {generatedKey && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                      <div className="flex-1">
                        <p className="text-green-900 font-medium mb-2">
                          New API key created successfully!
                        </p>
                        <div className="bg-white rounded border border-green-200 p-3 font-mono text-sm break-all">
                          {generatedKey}
                        </div>
                        <p className="text-green-700 text-sm mt-2">
                          Save this key securely. It won't be shown again.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {showNewKeyForm && (
                  <Card className="mb-6 border-indigo-200">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New API Key</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Key Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Production Key"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Give your key a descriptive name to identify it later
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            onClick={handleCreateApiKey}
                            disabled={!newKeyName.trim()}
                          >
                            Generate Key
                          </Button>
                          <Button
                            onClick={() => {
                              setShowNewKeyForm(false)
                              setNewKeyName('')
                            }}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="space-y-4">
                  {settings.apiKeys.map((apiKey) => (
                    <Card key={apiKey.id} className="hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Key className="h-5 w-5 text-indigo-600" />
                              <h3 className="font-semibold text-gray-900">{apiKey.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 font-mono mb-2">
                              {apiKey.key_prefix}...{showKey[apiKey.id] ? apiKey.key_hash.slice(-8) : '••••••••'}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Created {formatDateTime(apiKey.created_at)}</span>
                              {apiKey.last_used_at && (
                                <span>Last used {formatDateTime(apiKey.last_used_at)}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => setShowKey({ ...showKey, [apiKey.id]: !showKey[apiKey.id] })}
                              variant="outline"
                              size="sm"
                            >
                              {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              onClick={() => handleDeleteApiKey(apiKey.id)}
                              variant="outline"
                              size="sm"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {settings.apiKeys.length === 0 && !showNewKeyForm && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No API keys yet</p>
                      <Button
                        onClick={() => setShowNewKeyForm(true)}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      >
                        Create Your First Key
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Webhooks Tab */}
            {activeTab === 'webhooks' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Webhook Configuration</h2>

                {/* Code Snippet Box */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-400 text-sm">Webhook Endpoint</span>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(`https://api.enclose.ai/webhooks/${user?.id}`, 'webhook')}
                      variant="outline"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedCode === 'webhook' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <code className="text-green-400 font-mono">
                    https://api.enclose.ai/webhooks/{user?.id}
                  </code>
                </div>

                {/* Pros/Cons Table */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Benefits of Webhooks
                    </h3>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Real-time payment notifications</li>
                      <li>• Automatic retry with exponential backoff</li>
                      <li>• Signed payloads for security</li>
                      <li>• Detailed event logs in dashboard</li>
                      <li>• Support for multiple event types</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-6">
                    <h3 className="font-semibold text-amber-900 mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Important Considerations
                    </h3>
                    <ul className="space-y-2 text-sm text-amber-700">
                      <li>• Endpoint must be HTTPS</li>
                      <li>• Must respond within 20 seconds</li>
                      <li>• Should verify webhook signatures</li>
                      <li>• Implement idempotency checks</li>
                      <li>• Handle duplicate events gracefully</li>
                    </ul>
                  </div>
                </div>

                {/* FAQ Strip */}
                <div className="space-y-4">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <span className="font-medium text-gray-900">How do I verify webhook signatures?</span>
                      <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="p-4 bg-white border-l-4 border-indigo-500">
                      <p className="text-gray-600 mb-3">
                        Every webhook request includes an X-Webhook-Signature header. Verify it using:
                      </p>
                      <pre className="bg-gray-900 text-gray-300 p-3 rounded text-sm overflow-x-auto">
{`const crypto = require('crypto');
const signature = crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET)
  .update(JSON.stringify(payload))
  .digest('hex');

if (signature === headers['x-webhook-signature']) {
  // Webhook is valid
}`}
                      </pre>
                    </div>
                  </details>

                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <span className="font-medium text-gray-900">What events are supported?</span>
                      <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="p-4 bg-white border-l-4 border-indigo-500">
                      <ul className="space-y-2 text-gray-600">
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">payment.completed</code> - Payment successfully processed</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">payment.failed</code> - Payment attempt failed</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">refund.created</code> - Refund issued</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">subscription.created</code> - New subscription started</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">subscription.cancelled</code> - Subscription cancelled</li>
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            )}

            {/* Integration Guide Tab */}
            {activeTab === 'integration' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Integration Guide</h2>

                {/* Key Takeaways */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
                    Key Integration Points
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

                {/* Expandable Excerpt */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedSection(expandedSection === 'quickstart' ? null : 'quickstart')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">Quick Start Example</span>
                      {expandedSection === 'quickstart' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                    {expandedSection === 'quickstart' && (
                      <div className="p-4 border-t">
                        <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
{`// 1. Initialize with your API key
const encloseAI = new EncloseAI({
  apiKey: 'your-api-key-here'
});

// 2. Create a checkout session
const session = await encloseAI.createCheckout({
  amount: 9999, // $99.99 in cents
  currency: 'usd',
  product_name: 'Premium Plan',
  customer_email: 'customer@example.com'
});

// 3. Redirect to checkout
window.location.href = session.checkout_url;`}
                        </pre>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedSection(expandedSection === 'testing' ? null : 'testing')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">Testing Your Integration</span>
                      {expandedSection === 'testing' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                    {expandedSection === 'testing' && (
                      <div className="p-4 border-t text-gray-600">
                        <p className="mb-3">Use these test credentials for development:</p>
                        <ul className="space-y-2 text-sm">
                          <li>• Test Card: <code className="bg-gray-100 px-2 py-1 rounded">4242 4242 4242 4242</code></li>
                          <li>• Any future expiry date</li>
                          <li>• Any 3-digit CVC</li>
                          <li>• Any billing ZIP code</li>
                        </ul>
                        <p className="mt-3 text-sm">
                          Test mode transactions appear in your dashboard with a "TEST" badge.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Legal Clause List */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Important Terms</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-gray-900">API Rate Limits</dt>
                      <dd className="text-gray-600 mt-1">1000 requests per minute for standard endpoints, 100 for checkout creation</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Data Retention</dt>
                      <dd className="text-gray-600 mt-1">Transaction data retained for 7 years for compliance</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Security Requirements</dt>
                      <dd className="text-gray-600 mt-1">HTTPS required for all API calls and webhook endpoints</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stripe Connection Status */}
        <Card className="bg-white shadow-lg">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Stripe Connection</h2>
            {settings.stripeConnected ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium">Connected to Stripe</span>
                </div>
                <Button variant="outline">
                  Manage in Stripe Dashboard
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Connect your Stripe account to start processing payments</p>
                <Link href="/api/stripe/oauth/connect">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Connect Stripe Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}