import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL ?? ''
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

/** Available when SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY are set */
export const supabase = url && anonKey ? createClient(url, anonKey) : null

/** Available when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set (writes) */
export const supabaseAdmin = url && serviceKey ? createClient(url, serviceKey) : null

export const hasSupabase = Boolean(url && (anonKey || serviceKey))
