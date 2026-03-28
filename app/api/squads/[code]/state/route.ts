import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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
  const stateFile = path.join(resolveSquadsDir(), params.code, 'state.json')
  if (!fs.existsSync(stateFile)) {
    return NextResponse.json(null)
  }
  try {
    const raw = fs.readFileSync(stateFile, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json(null)
  }
}
