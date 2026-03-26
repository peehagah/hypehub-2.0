import Link from 'next/link'
import { Users, GitBranch, ArrowRight } from 'lucide-react'
import type { Squad } from '@/lib/types'

interface SquadCardProps {
  squad: Squad
}

export function SquadCard({ squad }: SquadCardProps) {
  return (
    <Link
      href={`/squad/${squad.code}`}
      className="group block rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5 hover:border-coral/40 hover:bg-[#1e2235] transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-brand-subtle border border-coral/20 flex items-center justify-center text-xl flex-shrink-0">
            {squad.icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white leading-tight">{squad.name}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{squad.code}</p>
          </div>
        </div>
        <ArrowRight
          size={14}
          className="text-slate-600 group-hover:text-coral transition-colors mt-0.5"
        />
      </div>

      {/* Description */}
      {squad.description && (
        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
          {squad.description}
        </p>
      )}

      {/* Footer stats */}
      <div className="flex items-center gap-4 pt-3 border-t border-[#2a2d3e]">
        <div className="flex items-center gap-1.5">
          <Users size={12} className="text-slate-600" />
          <span className="text-xs text-slate-500">{squad.agents?.length ?? 0} agentes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GitBranch size={12} className="text-slate-600" />
          <span className="text-xs text-slate-500">{squad.skills?.length ?? 0} skills</span>
        </div>

        {/* Agent icons row */}
        <div className="ml-auto flex items-center -space-x-1.5">
          {(squad.agents ?? []).slice(0, 4).map((agent) => (
            <div
              key={agent.id}
              className="w-6 h-6 rounded-full bg-[#2a2d3e] border border-[#1a1d2e] flex items-center justify-center text-xs"
              title={agent.name}
            >
              {agent.icon}
            </div>
          ))}
          {(squad.agents?.length ?? 0) > 4 && (
            <div className="w-6 h-6 rounded-full bg-[#2a2d3e] border border-[#1a1d2e] flex items-center justify-center text-[9px] text-slate-400">
              +{squad.agents.length - 4}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
