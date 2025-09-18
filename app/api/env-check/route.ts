import { NextResponse } from 'next/server'

export async function GET() {
  // Only show in development or with a secret key
  const isDev = process.env.NODE_ENV === 'development'
  const hasSecretKey = process.env.DEBUG_SECRET === 'check-env-vars-2024'

  if (!isDev && !hasSecretKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    VERCEL: !!process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
  }

  const missing = []
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_APP_URL'
  ]

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key)
    }
  }

  return NextResponse.json({
    status: missing.length === 0 ? 'OK' : 'ERROR',
    missing,
    envVars,
    message: missing.length > 0
      ? `Missing ${missing.length} required environment variable(s)`
      : 'All required environment variables are set'
  })
}