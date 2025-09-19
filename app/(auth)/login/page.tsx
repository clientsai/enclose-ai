/* Transformed: Two-Column Split, Accordion (Native), Info Pill Group, Checklist, Inset Note */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Mail, Lock, CheckCircle, Shield, Zap, Globe, AlertCircle, Info } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

import { Section, Stack } from '@/components/premium/Section'
import { Heading, Text, Eyebrow } from '@/components/premium/Typography'
import { Button, Card, Divider } from '@/components/premium/UI'
import { FormField, Label, Input } from '@/components/premium/Forms'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized')
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Set user_id cookie for API routes
      document.cookie = `user_id=${data.user?.id}; path=/`

      router.push('/dashboard')
    } catch (error: any) {
      // Modernize error messages - Jony Ive style: clean, human, minimal
      if (error.message?.includes('Email not confirmed')) {
        setError('verify-email')
      } else if (error.message?.includes('Invalid login credentials')) {
        setError('invalid-credentials')
      } else {
        setError(error.message || 'Failed to sign in')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Two-Column Split */}
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 text-white">
          <div>
            <div className="mb-8">
              <Logo size="lg" variant="light" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Secure Payment Infrastructure for Modern Apps</h2>

            {/* Checklist */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-300 mr-3 mt-0.5">✓</span>
                <span>Connect Stripe in seconds with OAuth</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-300 mr-3 mt-0.5">✓</span>
                <span>Generate secure payment links instantly</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-300 mr-3 mt-0.5">✓</span>
                <span>PCI-compliant infrastructure</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-300 mr-3 mt-0.5">✓</span>
                <span>Real-time analytics dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-300 mr-3 mt-0.5">✓</span>
                <span>135+ currencies supported</span>
              </li>
            </ul>

            {/* Info Pill Group */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur text-sm">
                <Shield className="w-3 h-3 mr-1.5" />
                PCI DSS Level 1
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur text-sm">
                <Zap className="w-3 h-3 mr-1.5" />
                99.99% Uptime
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur text-sm">
                <Globe className="w-3 h-3 mr-1.5" />
                Global Scale
              </span>
            </div>
          </div>

          <div>
            {/* Accordion (Native) */}
            <details className="mb-4">
              <summary className="cursor-pointer text-white/90 hover:text-white transition-colors font-medium">
                Why choose Enclose.AI?
              </summary>
              <div className="mt-3 pl-4 text-white/80 text-sm border-l-2 border-white/30">
                We provide the fastest way to integrate Stripe payments into your Clients.AI agents.
                No complex setup, no API key management, just instant OAuth connection and you're ready
                to start processing payments globally.
              </div>
            </details>

            <details className="mb-4">
              <summary className="cursor-pointer text-white/90 hover:text-white transition-colors font-medium">
                How secure is it?
              </summary>
              <div className="mt-3 pl-4 text-white/80 text-sm border-l-2 border-white/30">
                We're PCI DSS Level 1 compliant, the highest level of security certification.
                All payment data is encrypted with AES-256 and transmitted over TLS 1.3.
                We never store card details - everything flows directly through Stripe's secure infrastructure.
              </div>
            </details>

            <details>
              <summary className="cursor-pointer text-white/90 hover:text-white transition-colors font-medium">
                What about pricing?
              </summary>
              <div className="mt-3 pl-4 text-white/80 text-sm border-l-2 border-white/30">
                Start free with our 14-day trial. After that, pay only for what you use with
                transparent per-transaction pricing. No setup fees, no monthly minimums,
                and you can cancel anytime.
              </div>
            </details>
          </div>
        </div>

        <Section className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Card hover className="bg-white/90 backdrop-blur-md border-gray-100 shadow-2xl">
              <div className="p-8">
                <header className="text-center mb-8">
                  <div className="flex justify-center mb-6 lg:hidden">
                    <Logo size="lg" />
                  </div>
                  <Stack gap="small" align="center">
                    <Eyebrow icon={<CheckCircle className="w-4 h-4" />}>
                      Secure Authentication
                    </Eyebrow>
                    <Heading as="h1" size="h2">Welcome Back</Heading>
                    <Text muted className="max-w-sm">
                      Sign in to your account to continue
                      {/* Inset Note */}
                      <span className="inline-block ml-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium">
                        OAuth 2.0
                      </span>
                    </Text>
                  </Stack>
                </header>

                <form onSubmit={handleLogin} className="space-y-5">
                  <FormField>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      icon={<Mail className="h-4 w-4 text-gray-400" />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      icon={<Lock className="h-4 w-4 text-gray-400" />}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormField>

                  {/* Modern error display - Jony Ive inspired: subtle, clean, human */}
                  {error === 'verify-email' && (
                    <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 p-4 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-sm">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Check your inbox</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            We've sent a confirmation link to your email.
                            Click it to activate your account and start your journey.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {error === 'invalid-credentials' && (
                    <div className="rounded-2xl bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200/50 p-4 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center shadow-sm">
                            <Info className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Let's try again</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            The email or password doesn't match our records.
                            Double-check and give it another go.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && error !== 'verify-email' && error !== 'invalid-credentials' && (
                    <div className="rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 p-4 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-400 rounded-full flex items-center justify-center shadow-sm">
                            <AlertCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Something went wrong</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{error}</p>
                        </div>
                      </div>
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
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline transition-colors font-medium"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Divider />

              <div className="px-8 py-4 bg-gradient-to-br from-gray-50/50 to-indigo-50/30">
                <Text size="small" className="text-center text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:underline"
                  >
                    Sign up
                  </Link>
                </Text>
              </div>
            </Card>

          </div>
        </Section>
      </div>
    </main>
  )
}