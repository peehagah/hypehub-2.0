import { notFound } from 'next/navigation'
import { loadSquad, loadAgents, getPipelineSteps, listOutputs, loadClientBrief } from '@/lib/squads'
import { SquadDetailClient } from '@/components/squad-detail-client'

interface Props {
  params: { client: string }
}

export default function SquadPage({ params }: Props) {
  const squad = loadSquad(params.client)
  if (!squad) notFound()

  const agents = loadAgents(params.client)
  const steps = getPipelineSteps(params.client)
  const outputs = listOutputs(params.client)
  const brief = loadClientBrief(params.client)

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
