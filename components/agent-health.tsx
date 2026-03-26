import { Users } from 'lucide-react'
import { cn, agentColor } from '@/lib/utils'
import type { AgentConfig } from '@/lib/types'

interface AgentHealthProps {
  agents: AgentConfig[]
  squadName?: string
}

export function AgentHealth({ agents, squadName }: AgentHealthProps) {
  return (
    <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Users size={16} className="text-slate-400" />
        <h3 className="text-sm font-semibold text-white">
          {squadName ? `Agentes — ${squadName}` : 'Agentes'}
        </h3>
        <span className="ml-auto text-xs text-slate-500">{agents.length} total</span>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-8 text-slate-600">
          <p className="text-sm">Nenhum agente configurado</p>
        </div>
      ) : (
        <div className="space-y-2">
          {agents.map((agent) => {
            const color = agentColor(agent.id)
            return (
              <div
                key={agent.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-[#2a2d3e] bg-[#0f1117]"
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${color}20` }}
                >
                  {agent.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{agent.name}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{agent.role || agent.summary}</p>
                </div>

                {/* Execution badge */}
                <span
                  className={cn(
                    'text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0',
                    agent.execution?.includes('subagent')
                      ? 'bg-purple/10 text-purple border border-purple/20'
                      : 'bg-[#2a2d3e] text-slate-500'
                  )}
                >
                  {agent.execution?.includes('subagent') ? 'subagent' : 'inline'}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
