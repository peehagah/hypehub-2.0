import Link from 'next/link'
import { ArrowRight, Bot, GitBranch, Instagram, Play, Target, Zap } from 'lucide-react'
import { listSquads, loadAgents, loadClientBrief, getPipelineSteps, listOutputs } from '@/lib/squads'
import { agentColor } from '@/lib/utils'

export default function DashboardPage() {
  const squads = listSquads()

  // Pre-load data for each squad to show on the dashboard
  const squadsWithData = squads.map((squad) => ({
    squad,
    agents: loadAgents(squad.code),
    steps: getPipelineSteps(squad.code),
    outputs: listOutputs(squad.code),
    brief: loadClientBrief(squad.code),
  }))

  const totalAgents = squadsWithData.reduce((sum, s) => sum + s.agents.length, 0)
  const totalSteps = squadsWithData.reduce((sum, s) => sum + s.steps.length, 0)
  const totalOutputs = squadsWithData.reduce((sum, s) => sum + s.outputs.length, 0)

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-[1400px] mx-auto">

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          <span className="gradient-text">Opensquad</span>
          <span className="text-slate-500 font-normal text-lg ml-3">· Agent Pipeline Platform</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}
        </p>
      </div>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Squads', value: squads.length, icon: Zap, color: '#ff6b6b', sub: 'pipelines ativos' },
          { label: 'Agentes', value: totalAgents, icon: Bot, color: '#ff4dca', sub: 'especializados' },
          { label: 'Pipeline steps', value: totalSteps, icon: GitBranch, color: '#9b59ff', sub: 'checkpoints incluídos' },
          { label: 'Outputs gerados', value: totalOutputs, icon: Target, color: '#3b82f6', sub: 'arquivos em output/' },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">{label}</p>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                <Icon size={13} style={{ color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-[10px] text-slate-600 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Squad cards ── */}
      {squadsWithData.map(({ squad, agents, steps, outputs, brief }) => (
        <div key={squad.code} className="space-y-6">

          {/* Squad header */}
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.2)' }}
              >
                {squad.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{squad.name}</h2>
                  <span className="text-[10px] font-mono text-slate-600 bg-[#2a2d3e] px-2 py-0.5 rounded">
                    {squad.code}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-0.5 max-w-xl">{squad.description}</p>
              </div>
            </div>
            <Link
              href={`/squad/${squad.code}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity"
            >
              Ver squad completo
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Client context (if brief loaded) */}
          {brief && (
            <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
              <div className="flex items-start justify-between flex-wrap gap-4">
                {/* Client identity */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand-subtle border border-coral/20 flex items-center justify-center text-xl flex-shrink-0">
                    🎯
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Cliente</p>
                    <h3 className="text-base font-bold text-white">{brief.clientName}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{brief.niche}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Instagram size={11} className="text-pink-400" />
                        @{brief.instagram.split('—')[0].trim()}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Play size={11} className="text-red-400" />
                        @{brief.youtube.split('—')[0].trim()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Goals */}
                <div className="flex items-center gap-3">
                  <div className="text-center px-4 py-3 rounded-xl border border-[#2a2d3e] bg-[#0f1117]">
                    <p className="text-[10px] text-slate-600 uppercase mb-1">Meta Instagram</p>
                    <p className="text-lg font-bold text-white">500k</p>
                    <p className="text-[10px] text-slate-600">em 6 meses</p>
                  </div>
                  <div className="text-center px-4 py-3 rounded-xl border border-[#2a2d3e] bg-[#0f1117]">
                    <p className="text-[10px] text-slate-600 uppercase mb-1">Meta YouTube</p>
                    <p className="text-lg font-bold text-white">100k</p>
                    <p className="text-[10px] text-slate-600">inscritos</p>
                  </div>
                  <div className="text-center px-4 py-3 rounded-xl border border-[#2a2d3e] bg-[#0f1117]">
                    <p className="text-[10px] text-slate-600 uppercase mb-1">Produto</p>
                    <p className="text-lg font-bold text-white">R$10–12k</p>
                    <p className="text-[10px] text-slate-600">mentoria/ano</p>
                  </div>
                </div>
              </div>

              {/* Método EGO */}
              <div className="mt-5 pt-4 border-t border-[#2a2d3e]">
                <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Método EGO</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { key: 'E', label: 'Essência', color: '#ff6b6b', text: brief.egoMethod.E },
                    { key: 'G', label: 'Generosidade', color: '#22c55e', text: brief.egoMethod.G },
                    { key: 'O', label: 'Ousadia', color: '#9b59ff', text: brief.egoMethod.O },
                  ].map(({ key, label, color, text }) => (
                    <div
                      key={key}
                      className="flex items-start gap-3 px-3 py-3 rounded-xl border"
                      style={{ background: `${color}08`, borderColor: `${color}20` }}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: `${color}20`, color }}
                      >
                        {key}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-white">{label}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Agents grid */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-2">
              <Bot size={13} />
              Agentes do squad
              <span className="text-slate-600">· {agents.length} especializados</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {agents.map((agent) => {
                const color = agentColor(agent.id)
                return (
                  <div
                    key={agent.id}
                    className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-4 hover:border-[#3a3d4e] transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                      style={{ background: `${color}18`, border: `1px solid ${color}25` }}
                    >
                      {agent.icon}
                    </div>
                    <p className="text-xs font-semibold text-white leading-tight">{agent.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{agent.role || agent.summary}</p>
                    <div className="mt-3 flex items-center gap-1.5">
                      <span
                        className="text-[9px] font-medium px-1.5 py-0.5 rounded border"
                        style={{
                          background: agent.execution?.includes('subagent') ? 'rgba(155,89,255,0.12)' : 'rgba(255,255,255,0.05)',
                          color: agent.execution?.includes('subagent') ? '#9b59ff' : '#6b7280',
                          borderColor: agent.execution?.includes('subagent') ? 'rgba(155,89,255,0.2)' : 'transparent',
                        }}
                      >
                        {agent.execution?.includes('subagent') ? 'subagent' : 'inline'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pipeline quick view */}
          <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-white flex items-center gap-2">
                <GitBranch size={14} className="text-slate-400" />
                Pipeline — {steps.length} steps
              </p>
              <Link
                href={`/squad/${squad.code}#pipeline`}
                className="text-xs text-coral hover:text-coral-light transition-colors"
              >
                Ver completo →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {steps.map((step, idx) => {
                const isCheckpoint = step.isCheckpoint
                return (
                  <div key={step.filename} className="flex items-center gap-1.5">
                    <div
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium border"
                      style={
                        isCheckpoint
                          ? { background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)', color: '#f59e0b' }
                          : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)', color: '#94a3b8' }
                      }
                    >
                      <span className="font-mono opacity-60">{String(step.stepNumber).padStart(2, '0')}</span>
                      <span className="ml-1 max-w-[90px] truncate">{step.label}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <span className="text-slate-800 text-xs">›</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Outputs */}
          {outputs.length > 0 ? (
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 flex items-center gap-3">
              <Target size={16} className="text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">
                  {outputs.length} output{outputs.length !== 1 ? 's' : ''} gerado{outputs.length !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-slate-500">{outputs.map((o) => o.filename).join(', ')}</p>
              </div>
              <Link
                href={`/squad/${squad.code}`}
                className="ml-auto text-xs text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
              >
                Ver outputs <ArrowRight size={11} />
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border border-[#2a2d3e] bg-[#0f1117] p-4 flex items-center gap-3">
              <Target size={14} className="text-slate-700 flex-shrink-0" />
              <p className="text-xs text-slate-600">
                Nenhum output gerado ainda — execute o pipeline com{' '}
                <code className="text-coral bg-coral/10 px-1 py-0.5 rounded text-[10px]">/opensquad run {squad.code}</code>
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Empty state */}
      {squads.length === 0 && (
        <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-12 text-center">
          <Zap size={40} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-400 font-medium mb-2">Nenhum squad encontrado</p>
          <p className="text-slate-600 text-sm mb-4">
            Use <code className="text-coral bg-coral/10 px-1.5 py-0.5 rounded">/opensquad create</code> no seu IDE para criar um squad
          </p>
        </div>
      )}
    </div>
  )
}
