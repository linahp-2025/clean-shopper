/**
 * Supabase client
 *
 * Single shared instance for the entire app.
 * Credentials are read from .env.local — never hardcoded.
 * .env.local is covered by *.local in .gitignore and will never be committed.
 *
 * Usage:
 *   import { supabase } from '@/lib/supabase'
 *   const { data, error } = await supabase.from('products').select('*')
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase credentials. ' +
    'Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.local.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
