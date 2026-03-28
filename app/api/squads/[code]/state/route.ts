import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { supabase, hasSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

function resolveSquadsDir(): string {
  if (process.env.SQUADS_DIR) return process.env.SQUADS_DIR
  const internal = path.join(process.cwd(), 'data', 'squads')
  if (fs.existsSync(internal)) return internal
  return path.join(process.cwd(), '..', 'squads')
}

export async function GET(
  _req: Request,
  { params }: { params: { code: string } }
) {
  // Supabase first (works on Vercel)
  if (hasSupabase && supabase) {
    const { data } = await supabase
      .from('pipeline_states')
      .select('state')
      .eq('squad_code', params.code)
      .maybeSingle()
    return NextResponse.json(data?.state ?? null)
  }

  // Filesystem fallback (local dev without Supabase)
  const stateFile = path.join(resolveSquadsDir(), params.code, 'state.json')
  if (!fs.existsSync(stateFile)) return NextResponse.json(null)
  try {
    return NextResponse.json(JSON.parse(fs.readFileSync(stateFile, 'utf-8')))
  } catch {
    return NextResponse.json(null)
  }
}
