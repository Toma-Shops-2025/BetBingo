import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  supabaseUrl || 'https://nlyujvvgglcymygaxhhi.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5seXVqdnZnZ2xjeW15Z2F4aGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NjUyNDksImV4cCI6MjA3MDA0MTI0OX0.o88EOgi9NgmHmau1nnT8D3G8AIdUBuFLR9_CelubzxA'
)

export type { User, Session } from '@supabase/supabase-js'