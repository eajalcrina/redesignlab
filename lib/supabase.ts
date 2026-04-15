import { createClient } from '@supabase/supabase-js'

// Publishable/anon key is safe to expose in the browser — RLS policies on each
// table enforce that anon can only INSERT (never SELECT/UPDATE/DELETE).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw at build time — allow the site to render without data capture
  // if env vars are not set. Submissions will fail gracefully.
  // eslint-disable-next-line no-console
  console.warn('[supabase] NEXT_PUBLIC_SUPABASE_URL or ANON_KEY not set. Data capture disabled.')
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null

export const isSupabaseConfigured = Boolean(supabase)
