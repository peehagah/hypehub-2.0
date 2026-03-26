import { NextResponse } from 'next/server'
import { listSquads } from '@/lib/squads'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const squads = listSquads()
    return NextResponse.json(squads)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
