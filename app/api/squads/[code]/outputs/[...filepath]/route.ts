import { NextResponse } from 'next/server'
import { readOutput } from '@/lib/squads'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  { params }: { params: { code: string; filepath: string[] } }
) {
  const relativePath = params.filepath.join('/')
  const content = await readOutput(params.code, relativePath)
  if (content === null) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
  return NextResponse.json({ content })
}
