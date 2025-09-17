'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { generateApiKey, hashApiKey, getApiKeyPrefix } from '@/lib/encryption'
import { formatDateTime } from '@/lib/utils'
import { Copy, Eye, EyeOff, Key, Trash2, Plus, Check, LogOut, ArrowLeft, Code, Shield } from 'lucide-react'
import Logo from '@/components/Logo'

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
                <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Dashboard
                </Link>
                <Link href="/payment-links" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Payment Links
                </Link>
                <Link href="/analytics" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Analytics
                </Link>
                <Link href="/settings" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                  Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent mb-2">Settings</h1>
          <p className="text-gray-600">Manage your API keys and integration settings</p>
        </div>

        <Card className="mb-8 border-gray-200 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                <Key className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900">API Keys</CardTitle>
                <CardDescription className="text-gray-600">
                  Manage API keys for Clients.AI integration
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {newKey && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800 mb-2">
                      API Key Created Successfully
                    </p>
                    <p className="text-xs text-green-700 mb-3">
                      Save this key now. You won't be able to see it again!
                    </p>
                    <div className="flex items-center gap-2">
                      <Input
                        value={newKey}
                        readOnly
                        className="font-mono text-sm border-green-200 bg-white"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(newKey)}
                        className="border-green-200 hover:border-green-300 hover:bg-green-50"
                      >
                        {copiedKey ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setNewKey(null)}
                        className="hover:bg-green-50"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mb-6">
              <Input
                placeholder="API Key Name (e.g., Production)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
              />
              <Button
                onClick={handleCreateApiKey}
                disabled={creatingKey || !newKeyName.trim()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
              >
                {creatingKey ? 'Creating...' : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Key
                  </>
                )}
              </Button>
            </div>

            {apiKeys.length === 0 ? (
              <p className="text-gray-500 text-sm">No API keys created yet</p>
            ) : (
              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg border border-gray-200 hover:border-indigo-200 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-indigo-600" />
                        <span className="font-medium text-gray-900">{key.name}</span>
                        <code className="text-xs bg-gradient-to-r from-gray-100 to-indigo-100 px-2 py-1 rounded-full text-gray-700">
                          {key.key_prefix}...
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Created {formatDateTime(key.created_at)}
                        {key.last_used && ` • Last used ${formatDateTime(key.last_used)}`}
                      </p>
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
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900">API Documentation</CardTitle>
                <CardDescription className="text-gray-600">
                  Learn how to integrate Enclose.AI with Clients.AI
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700">Base URL</Label>
              <Input
                value={`${process.env.NEXT_PUBLIC_APP_URL}/api/v1`}
                readOnly
                className="font-mono text-sm border-gray-200 bg-gray-50 mt-1"
              />
            </div>

            <div>
              <Label className="text-gray-700">Authentication</Label>
              <p className="text-sm text-gray-600 mt-1">
                Include your API key in the Authorization header:
              </p>
              <pre className="mt-2 p-3 bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 rounded-lg text-sm">
                {`Authorization: Bearer encl_your_api_key_here`}
              </pre>
            </div>

            <div>
              <Label className="text-gray-700">Create Checkout</Label>
              <p className="text-sm text-gray-600 mt-1">POST /checkout</p>
              <pre className="mt-2 p-3 bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 rounded-lg text-sm overflow-x-auto">
{`{
  "agent_id": "agent_123",
  "customer_email": "customer@example.com",
  "product_name": "Premium Package",
  "amount": 99.99,
  "currency": "usd"
}`}
              </pre>
            </div>

            <div>
              <Label className="text-gray-700">Response</Label>
              <pre className="mt-2 p-3 bg-gradient-to-r from-gray-50 to-purple-50 border border-gray-200 rounded-lg text-sm overflow-x-auto">
{`{
  "success": true,
  "checkout_url": "https://checkout.stripe.com/pay/...",
  "payment_link_id": "link_abc123"
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}