import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Log environment status (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing')
  console.log('Supabase Key:', supabaseAnonKey ? 'Set' : 'Missing')
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Using fallback values for demo mode.')
}

export const supabase = createClient(
  supabaseUrl || 'https://nlyujvvgglcymygaxhhi.supabase.co',
  supabaseAnonKey || 'demo-key-fallback',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      debug: import.meta.env.DEV,
    }
  }
)

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://nlyujvvgglcymygaxhhi.supabase.co')
}

export type { User, Session } from '@supabase/supabase-js'