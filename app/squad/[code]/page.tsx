import { notFound } from 'next/navigation'
import { loadSquad, loadAgents, getPipelineSteps, listOutputs, loadClientBrief } from '@/lib/squads'
import { SquadDetailClient } from '@/components/squad-detail-client'

interface Props {
  params: { code: string }
}

export default function SquadPage({ params }: Props) {
  const squad = loadSquad(params.code)
  if (!squad) notFound()

  const agents = loadAgents(params.code)
  const steps = getPipelineSteps(params.code)
  const outputs = listOutputs(params.code)
  const brief = loadClientBrief(params.code)

  return (
    <SquadDetailClient
      squad={squad}
      agents={agents}
      steps={steps}
      outputs={outputs}
      brief={brief}
    />
  )
}
