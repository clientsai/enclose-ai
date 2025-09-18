import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required Supabase environment variables')
  console.error('NEXT_PUBLIC_SUPABASE_URL exists:', !!supabaseUrl)
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!supabaseAnonKey)
  console.error('URL value:', supabaseUrl ? 'Set' : 'Missing')
  console.error('Key value:', supabaseAnonKey ? 'Set' : 'Missing')

  if (typeof window !== 'undefined') {
    console.error('Running on client side')
    console.error('Window location:', window.location.href)
  } else {
    console.error('Running on server side')
  }
}

// Client-side Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null as any

// Server-side Supabase client with admin privileges
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient<Database>(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null as any

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function signOut() {
  return await supabase.auth.signOut()
}