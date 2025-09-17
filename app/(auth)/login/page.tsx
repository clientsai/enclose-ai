'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Mail, Lock, CheckCircle } from 'lucide-react'
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Set user_id cookie for API routes
      document.cookie = `user_id=${data.user?.id}; path=/`

      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <Section className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card hover className="bg-white/90 backdrop-blur-md border-gray-100 shadow-2xl">
            <div className="p-8">
              <header className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <Logo size="lg" />
                </div>
                <Stack gap="small" align="center">
                  <Eyebrow icon={<CheckCircle className="w-4 h-4" />}>
                    Secure Authentication
                  </Eyebrow>
                  <Heading as="h1" size="h2">Welcome Back</Heading>
                  <Text muted className="max-w-sm">
                    Sign in to your account to continue
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

          <footer className="mt-8 text-center">
            <Text size="small" muted>
              Protected by enterprise-grade security
            </Text>
          </footer>
        </div>
      </Section>
    </main>
  )
}