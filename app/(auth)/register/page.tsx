'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Mail, Lock, User, CheckCircle, Shield } from 'lucide-react'
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
          .insert({
            id: authData.user.id,
            email: formData.email,
            name: formData.fullName,
          })

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
      <Section className="min-h-screen flex items-center justify-center">
        <article className="w-full max-w-lg">
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
        </article>
      </Section>
    </main>
  )
}