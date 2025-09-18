/* Transformed: Pull Quote, Stat Row, Definition List, Do/Don't List, Toggle Reveal, Highlight Row */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Mail, Lock, User, CheckCircle, Shield, X, ChevronDown, ChevronUp } from 'lucide-react'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import Logo from '@/components/Logo'

import { Section, Stack, Grid } from '@/components/premium/Section'
import { Heading, Text, Eyebrow } from '@/components/premium/Typography'
import { Button, Card, Divider, Badge } from '@/components/premium/UI'
import { FormField, Label, Input } from '@/components/premium/Forms'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Check if Supabase is properly configured
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-4">
            <Shield className="w-12 h-12 text-red-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration Error</h2>
          <p className="text-gray-600 mb-6">
            The application is not properly configured. Please contact support or check the deployment settings.
          </p>
          <Link href="/">
            <Button className="w-full">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized')
      }

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Create user record in enclose_users table
        const { error: dbError } = await supabase
          .from('enclose_users')
          .insert([{
            id: authData.user.id,
            email: formData.email,
            name: formData.fullName,
          }] as any)

        if (dbError) {
          console.error('Database error:', dbError)
          // Continue anyway as the auth user was created
        }

        // Set user_id cookie
        document.cookie = `user_id=${authData.user.id}; path=/`

        router.push('/dashboard')
      }
    } catch (error: any) {
      setError(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <Section className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Pull Quote */}
          <blockquote className="text-center mb-12">
            <p className="text-2xl font-serif italic text-gray-700 mb-4">
              "Enclose.AI transformed our payment infrastructure in just minutes.
              The Stripe integration is seamless and our conversion rates increased by 40%."
            </p>
            <footer className="text-sm text-gray-500">
              — Sarah Chen, CTO at TechFlow Labs
            </footer>
          </blockquote>

          {/* Stat Row */}
          <div className="grid grid-cols-3 gap-8 mb-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                10,000+
              </div>
              <div className="text-sm text-gray-600 mt-1">Active Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                $2.5B
              </div>
              <div className="text-sm text-gray-600 mt-1">Processed Annually</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                99.99%
              </div>
              <div className="text-sm text-gray-600 mt-1">Uptime SLA</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Registration Form */}
            <article className="w-full">
              <Card hover className="bg-white/90 backdrop-blur-md border-gray-100 shadow-2xl overflow-hidden">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />

                  <div className="relative p-8">
                    <header className="text-center mb-8">
                      <div className="flex justify-center mb-6">
                        <Logo size="lg" />
                      </div>
                      <Stack gap="small" align="center">
                        <div className="flex items-center gap-2 justify-center">
                          <Badge variant="success" size="sm">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Start accepting payments in minutes
                          </Badge>
                        </div>
                        <Heading as="h1" size="h2">Create Your Account</Heading>
                        <Text muted className="max-w-sm">
                          Join thousands of businesses already using our platform
                        </Text>
                      </Stack>
                    </header>

                    <form onSubmit={handleRegister} className="space-y-5">
                      <Grid cols={2} gap="small">
                        <div className="col-span-2 sm:col-span-1">
                          <FormField>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              type="text"
                              placeholder="John Doe"
                              icon={<User className="h-4 w-4 text-gray-400" />}
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              required
                            />
                          </FormField>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <FormField>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              icon={<Mail className="h-4 w-4 text-gray-400" />}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                          </FormField>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <FormField>
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="8+ characters"
                              icon={<Lock className="h-4 w-4 text-gray-400" />}
                              value={formData.password}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                              required
                              minLength={8}
                            />
                          </FormField>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <FormField>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="Re-enter password"
                              icon={<Lock className="h-4 w-4 text-gray-400" />}
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                              required
                            />
                          </FormField>
                        </div>
                      </Grid>

                      {error && (
                        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                          <Text size="small" className="text-red-600">
                            {error}
                          </Text>
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        gradient
                        className="w-full"
                        disabled={loading}
                        icon={<ArrowRight className="h-4 w-4" />}
                      >
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </Button>

                      <div className="flex items-start gap-2 p-3 bg-indigo-50/50 rounded-lg">
                        <Shield className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <Text size="small" className="text-gray-600">
                          By creating an account, you agree to our{' '}
                          <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                            Privacy Policy
                          </Link>
                        </Text>
                      </div>
                    </form>
                  </div>
                </div>

                <Divider />

                <footer className="px-8 py-4 bg-gradient-to-br from-gray-50/50 to-indigo-50/30">
                  <Text size="small" className="text-center text-gray-600">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:underline"
                    >
                      Sign in
                    </Link>
                  </Text>
                </footer>
              </Card>
            </article>

            {/* Side Content */}
            <div className="space-y-8">
              {/* Definition List */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Features</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium text-gray-900">OAuth Integration</dt>
                    <dd className="text-sm text-gray-600 mt-1">
                      Secure authentication using industry-standard OAuth 2.0 protocol for seamless Stripe connection
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Payment Links</dt>
                    <dd className="text-sm text-gray-600 mt-1">
                      Generate secure, customizable payment links that work across all devices and platforms
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Webhook Events</dt>
                    <dd className="text-sm text-gray-600 mt-1">
                      Real-time notifications for payment status updates, refunds, and dispute handling
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">API Access</dt>
                    <dd className="text-sm text-gray-600 mt-1">
                      RESTful API with comprehensive documentation for seamless integration with Clients.AI
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Do/Don't List */}
              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security Tips</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" /> Do
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Use a unique password
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Enable 2FA when available
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Use your business email
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                      <X className="w-4 h-4 mr-1" /> Don't
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        Share your credentials
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        Use simple passwords
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        Ignore security alerts
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Toggle Reveal */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full text-left flex items-center justify-between text-gray-900 font-medium hover:text-indigo-600 transition-colors"
                >
                  <span>Show integration details</span>
                  {showDetails ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {showDetails && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 space-y-2">
                    <p>After registration, you'll be able to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Connect your Stripe account via OAuth</li>
                      <li>Create unlimited payment links</li>
                      <li>Access our REST API endpoints</li>
                      <li>View real-time analytics</li>
                      <li>Configure webhook endpoints</li>
                      <li>Manage team members and permissions</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Highlight Row */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-medium text-gray-900 text-sm">Quick Setup</div>
              <div className="text-xs text-gray-600 mt-1">Under 2 minutes</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-medium text-gray-900 text-sm">Bank-Level Security</div>
              <div className="text-xs text-gray-600 mt-1">AES-256 encryption</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <div className="text-2xl mb-2">🌍</div>
              <div className="font-medium text-gray-900 text-sm">Global Reach</div>
              <div className="text-xs text-gray-600 mt-1">135+ currencies</div>
            </div>
          </div>

          <div className="mt-8">
            <Stack gap="small" align="center">
              <Text size="small" muted>
                Trusted by 10,000+ businesses worldwide
              </Text>
              <div className="flex items-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
                ))}
              </div>
            </Stack>
          </div>
        </div>
      </Section>
    </main>
  )
}