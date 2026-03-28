import { NextResponse } from 'next/server'
import { loadSquad, loadAgents, getPipelineSteps, listOutputs } from '@/lib/squads'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params
  const squad = loadSquad(code)
  if (!squad) {
    return NextResponse.json({ error: 'Squad not found' }, { status: 404 })
  }

  const agents = loadAgents(code)
  const steps = getPipelineSteps(code)
  const outputs = await listOutputs(code)

  return NextResponse.json({ squad, agents, steps, outputs })
}
