'use client'

import { useState, useCallback } from 'react'
import {
  LayoutDashboard,
  GitBranch,
  Users,
  FileText,
  CheckCircle2,
  Instagram,
  Play,
  Target,
  Bot,
  BookOpen,
} from 'lucide-react'
import { cn, agentColor } from '@/lib/utils'
import { PipelineBoard } from '@/components/pipeline-board'
import { OutputsList } from '@/components/outputs-list'
import { WsIndicator } from '@/components/ws-indicator'
import type { Squad, AgentConfig, PipelineStep, OutputFile, SquadRunState, ClientBrief } from '@/lib/types'

const TABS = ['Visão Geral', 'Agentes', 'Pipeline', 'Outputs', 'Brief'] as const
type Tab = (typeof TABS)[number]

interface SquadDetailClientProps {
  squad: Squad
  agents: AgentConfig[]
  steps: PipelineStep[]
  outputs: OutputFile[]
  brief: ClientBrief | null
}

export function SquadDetailClient({ squad, agents, steps, outputs, brief }: SquadDetailClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Visão Geral')
  const [runStates, setRunStates] = useState<Record<string, SquadRunState>>({})

  const handleStateUpdate = useCallback((code: string, state: SquadRunState) => {
    setRunStates((prev) => ({ ...prev, [code]: state }))
  }, [])

  const handleDisconnect = useCallback((code: string) => {
    setRunStates((prev) => {
      const next = { ...prev }
      delete next[code]
      return next
    })
  }, [])

  const runState = runStates[squad.code] ?? null
  const checkpoints = steps.filter((s) => s.isCheckpoint)
  const agentSteps = steps.filter((s) => !s.isCheckpoint)

  const tabIcons: Record<Tab, React.ReactNode> = {
    'Visão Geral': <LayoutDashboard size={14} />,
    Agentes: <Bot size={14} />,
    Pipeline: <GitBranch size={14} />,
    Outputs: <FileText size={14} />,
    Brief: <BookOpen size={14} />,
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.22)' }}
        >
          {squad.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-white">{squad.name}</h1>
            {brief && (
              <span className="text-xs text-slate-500 bg-[#2a2d3e] px-2.5 py-1 rounded-full">
                Cliente: {brief.clientName}
              </span>
            )}
          </div>
          <p className="text-slate-500 text-sm mt-1 line-clamp-2">{squad.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <WsIndicator onStateUpdate={handleStateUpdate} onDisconnect={handleDisconnect} />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot" />
            {squad.mode ?? 'Ativo'}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div>
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
          <div className="flex items-center gap-1 border-b border-[#2a2d3e] mb-6 min-w-max md:min-w-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-3 md:px-4 py-2.5 text-sm font-medium transition-all duration-150 border-b-2 -mb-px flex items-center gap-1.5 whitespace-nowrap min-h-[44px]',
                  activeTab === tab
                    ? 'border-coral text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                )}
              >
                {tabIcons[tab]}
                {tab}
                {tab === 'Outputs' && outputs.length > 0 && (
                  <span className="text-[10px] bg-coral/20 text-coral px-1.5 py-0.5 rounded-full">
                    {outputs.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─────────── Visão Geral ─────────── */}
        {activeTab === 'Visão Geral' && (
          <div className="space-y-6 animate-fade-in">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Agentes', value: agents.length, sub: 'especializados', color: '#ff4dca' },
                { label: 'Pipeline steps', value: steps.length, sub: `${checkpoints.length} checkpoints`, color: '#9b59ff' },
                { label: 'Skills', value: squad.skills?.length ?? 0, sub: squad.skills?.slice(0, 2).join(', ') || '—', color: '#3b82f6' },
                { label: 'Outputs', value: outputs.length, sub: 'arquivos gerados', color: '#22c55e' },
              ].map(({ label, value, sub, color }) => (
                <div key={label} className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">{label}</p>
                  <p className="text-3xl font-bold text-white">{value}</p>
                  <p className="text-[10px] text-slate-600 mt-1 truncate">{sub}</p>
                  <div className="mt-2 h-0.5 rounded-full" style={{ background: `${color}40` }} />
                </div>
              ))}
            </div>

            {/* Client brief summary */}
            {brief && (
              <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Contexto do cliente</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Identity */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-coral/10 border border-coral/20 flex items-center justify-center text-xl">🎯</div>
                      <div>
                        <p className="text-sm font-bold text-white">{brief.clientName}</p>
                        <p className="text-xs text-slate-500">{brief.niche}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Instagram size={12} className="text-pink-400" />
                        @{brief.instagram.split('—')[0].trim()}
                      </span>
                      <span className="text-slate-700">·</span>
                      <span className="flex items-center gap-1.5">
                        <Play size={12} className="text-red-400" />
                        @{brief.youtube.split('—')[0].trim()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-3 py-2 rounded-lg bg-[#0f1117] border border-[#2a2d3e] text-center flex-1">
                        <p className="text-[10px] text-slate-600 mb-1">Meta IG</p>
                        <p className="text-sm font-bold text-white">500k</p>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-[#0f1117] border border-[#2a2d3e] text-center flex-1">
                        <p className="text-[10px] text-slate-600 mb-1">Meta YT</p>
                        <p className="text-sm font-bold text-white">100k</p>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-[#0f1117] border border-[#2a2d3e] text-center flex-1">
                        <p className="text-[10px] text-slate-600 mb-1">Produto</p>
                        <p className="text-sm font-bold text-white">R$10k</p>
                      </div>
                    </div>
                  </div>

                  {/* Método EGO */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Método EGO</p>
                    <div className="space-y-2">
                      {[
                        { k: 'E', label: 'Essência', color: '#ff6b6b', text: brief.egoMethod.E },
                        { k: 'G', label: 'Generosidade', color: '#22c55e', text: brief.egoMethod.G },
                        { k: 'O', label: 'Ousadia', color: '#9b59ff', text: brief.egoMethod.O },
                      ].map(({ k, label, color, text }) => (
                        <div key={k} className="flex items-start gap-2.5 px-3 py-2 rounded-lg border" style={{ background: `${color}08`, borderColor: `${color}20` }}>
                          <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${color}25`, color }}>{k}</span>
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold text-white">{label}</p>
                            <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pipeline snapshot + Agents side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PipelineBoard steps={steps} runState={runState} />

              {/* Agent quick list */}
              <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                <p className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Bot size={14} className="text-slate-400" />
                  Agentes
                  <span className="text-xs text-slate-500 ml-1">{agents.length} no squad</span>
                </p>
                <div className="space-y-2">
                  {agents.map((agent) => {
                    const color = agentColor(agent.id)
                    const live = runState?.agents?.find((a) => a.id === agent.id)
                    return (
                      <div key={agent.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0f1117] border border-[#2a2d3e]">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: `${color}18` }}>
                          {agent.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{agent.name}</p>
                          <p className="text-[10px] text-slate-600 truncate">{agent.role || agent.summary}</p>
                        </div>
                        <span
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={
                            live?.status === 'working'
                              ? { background: 'rgba(34,197,94,0.15)', color: '#4ade80' }
                              : live?.status === 'done'
                              ? { background: 'rgba(255,107,107,0.15)', color: '#ff6b6b' }
                              : { background: 'rgba(255,255,255,0.05)', color: '#6b7280' }
                          }
                        >
                          {live?.status ?? 'idle'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Live handoff */}
            {runState?.handoff && (
              <div className="rounded-xl border border-coral/20 bg-coral/5 p-4 flex items-start gap-3">
                <Bot size={16} className="text-coral mt-0.5 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="text-xs font-semibold text-coral mb-0.5">
                    Handoff em progresso: {runState.handoff.from} → {runState.handoff.to}
                  </p>
                  <p className="text-xs text-slate-400">{runState.handoff.message}</p>
                </div>
              </div>
            )}

            {/* Outputs preview */}
            {outputs.length > 0 && (
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <Target size={12} />
                  Últimos outputs gerados
                </p>
                <div className="space-y-1.5">
                  {outputs.slice(0, 3).map((f) => (
                    <div key={f.filename} className="flex items-center gap-2 text-xs">
                      <FileText size={11} className="text-green-500 flex-shrink-0" />
                      <span className="text-slate-400 font-mono">{f.filename}</span>
                      <span className="ml-auto text-slate-600">{(f.sizeBytes / 1024).toFixed(1)}KB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────── Agentes ─────────── */}
        {activeTab === 'Agentes' && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-slate-500">
              {agents.length} agentes especializados no squad <strong className="text-white">{squad.name}</strong>
            </p>
            {agents.map((agent) => {
              const color = agentColor(agent.id)
              const live = runState?.agents?.find((a) => a.id === agent.id)
              return (
                <div key={agent.id} className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      {agent.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="text-base font-bold text-white">{agent.name}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">{agent.role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {live && (
                            <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                              {live.status}
                            </span>
                          )}
                          <span
                            className="text-[10px] font-medium px-2 py-1 rounded-full border"
                            style={
                              agent.execution?.includes('subagent')
                                ? { background: 'rgba(155,89,255,0.12)', color: '#9b59ff', borderColor: 'rgba(155,89,255,0.25)' }
                                : { background: 'rgba(255,255,255,0.05)', color: '#6b7280', borderColor: 'transparent' }
                            }
                          >
                            {agent.execution?.includes('subagent') ? '⚡ subagent' : '→ inline'}
                          </span>
                        </div>
                      </div>

                      {agent.summary && (
                        <p className="text-sm text-slate-400 mt-3 leading-relaxed">{agent.summary}</p>
                      )}

                      {(agent.input || agent.output) && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {agent.input && (
                            <div className="px-3 py-2.5 rounded-lg bg-[#0f1117] border border-[#2a2d3e]">
                              <p className="text-[9px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Input</p>
                              <p className="text-[11px] text-slate-400 font-mono break-all">{agent.input}</p>
                            </div>
                          )}
                          {agent.output && (
                            <div className="px-3 py-2.5 rounded-lg bg-[#0f1117] border border-[#2a2d3e]">
                              <p className="text-[9px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Output</p>
                              <p className="text-[11px] text-slate-400 font-mono break-all">{agent.output}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Skills indicator */}
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        {squad.skills?.map((skill) => (
                          <span key={skill} className="text-[9px] px-2 py-0.5 rounded bg-[#2a2d3e] text-slate-500 font-mono">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ─────────── Pipeline ─────────── */}
        {activeTab === 'Pipeline' && (
          <div className="space-y-6 animate-fade-in">
            <PipelineBoard steps={steps} runState={runState} />

            {/* Checkpoints detail */}
            {checkpoints.length > 0 && (
              <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                <p className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-yellow-400" />
                  Checkpoints — pontos de decisão humana
                  <span className="text-xs text-slate-500 ml-1">{checkpoints.length} no pipeline</span>
                </p>
                <div className="space-y-2">
                  {checkpoints.map((cp) => (
                    <div
                      key={cp.filename}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5"
                    >
                      <span className="text-[10px] font-mono font-bold text-yellow-600 w-8 flex-shrink-0">
                        {String(cp.stepNumber).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{cp.label}</p>
                        <p className="text-[10px] text-slate-600 font-mono mt-0.5">{cp.filename}</p>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-yellow-500/15 text-yellow-500 border border-yellow-500/20 flex-shrink-0">
                        CHECKPOINT
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-600 border-t border-[#2a2d3e] pt-3">
                  Nos checkpoints, o pipeline pausa e aguarda sua aprovação antes de continuar.
                </p>
              </div>
            )}

            {/* Agent flow */}
            <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
              <p className="text-sm font-semibold text-white mb-4">Fluxo de execução dos agentes</p>
              <div className="flex items-center gap-2 flex-wrap">
                {agentSteps.map((step, idx) => {
                  const matched = agents.find((a) =>
                    step.label.toLowerCase().split(' ').some((w) => w.length > 3 && a.name.toLowerCase().includes(w))
                  )
                  const color = matched ? agentColor(matched.id) : '#4a4d5e'
                  return (
                    <div key={step.filename} className="flex items-center gap-2">
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium"
                        style={{ background: `${color}12`, borderColor: `${color}25`, color }}
                      >
                        {matched?.icon && <span>{matched.icon}</span>}
                        <span>{step.label}</span>
                      </div>
                      {idx < agentSteps.length - 1 && (
                        <span className="text-slate-700 text-sm">→</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─────────── Outputs ─────────── */}
        {activeTab === 'Outputs' && (
          <div className="animate-fade-in">
            <p className="text-xs text-slate-500 mb-4">
              Arquivos gerados em <code className="text-coral bg-coral/10 px-1.5 py-0.5 rounded text-[10px]">squads/{squad.code}/output/</code>
            </p>
            <OutputsList outputs={outputs} squadCode={squad.code} />
          </div>
        )}

        {/* ─────────── Brief ─────────── */}
        {activeTab === 'Brief' && (
          <div className="space-y-6 animate-fade-in">
            {!brief ? (
              <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-8 text-center">
                <BookOpen size={32} className="mx-auto text-slate-700 mb-3" />
                <p className="text-sm text-slate-500">Nenhum client brief encontrado</p>
                <p className="text-xs text-slate-600 mt-1">Adicione um arquivo em pipeline/data/client-brief-*.md</p>
              </div>
            ) : (
              <>
                {/* Identity */}
                <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Identidade do cliente</p>
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="w-14 h-14 rounded-2xl bg-coral/10 border border-coral/20 flex items-center justify-center text-2xl">🎯</div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-white">{brief.clientName}</h2>
                      <p className="text-sm text-slate-500 mt-1">{brief.niche}</p>
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Instagram size={12} className="text-pink-400" />
                          @{brief.instagram.split('—')[0].trim()}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Play size={12} className="text-red-400" />
                          @{brief.youtube.split('—')[0].trim()}
                        </span>
                        <span className="text-xs text-slate-500">Operador: {brief.operator}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product + Goals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                    <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Produto principal</p>
                    <p className="text-lg font-bold text-white">{brief.product.name}</p>
                    <p className="text-2xl font-bold text-coral mt-1">{brief.product.price}</p>
                    <p className="text-xs text-slate-500 mt-1">por ano · 1 ano de acompanhamento</p>
                  </div>
                  <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                    <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Meta Instagram</p>
                    <p className="text-4xl font-bold text-white">500k</p>
                    <p className="text-xs text-slate-500 mt-2">seguidores · 6 meses</p>
                    {brief.cadence && <p className="text-[10px] text-slate-600 mt-1">{brief.cadence}</p>}
                  </div>
                  <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                    <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Meta YouTube</p>
                    <p className="text-4xl font-bold text-white">100k</p>
                    <p className="text-xs text-slate-500 mt-2">inscritos · 6 meses</p>
                  </div>
                </div>

                {/* Método EGO */}
                <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Método EGO — Framework autoral</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { k: 'E', label: 'Essência', color: '#ff6b6b', text: brief.egoMethod.E },
                      { k: 'G', label: 'Generosidade', color: '#22c55e', text: brief.egoMethod.G },
                      { k: 'O', label: 'Ousadia', color: '#9b59ff', text: brief.egoMethod.O },
                    ].map(({ k, label, color, text }) => (
                      <div key={k} className="rounded-xl p-4 border" style={{ background: `${color}08`, borderColor: `${color}20` }}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold" style={{ background: `${color}20`, color }}>{k}</span>
                          <p className="text-sm font-bold text-white">{label}</p>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audience + Pain points */}
                {(brief.audience.length > 0 || brief.painPoints.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {brief.audience.length > 0 && (
                      <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Personas da audiência</p>
                        <div className="space-y-2">
                          {brief.audience.map((a, i) => (
                            <div key={i} className="flex items-start gap-2.5 px-3 py-2 rounded-lg bg-[#0f1117] border border-[#2a2d3e]">
                              <span className="text-xs font-bold text-coral flex-shrink-0">{i + 1}.</span>
                              <p className="text-xs text-slate-400 leading-relaxed">{a}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {brief.painPoints.length > 0 && (
                      <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Dores principais</p>
                        <div className="space-y-2">
                          {brief.painPoints.map((pain, i) => (
                            <div key={i} className="flex items-start gap-2.5 px-3 py-2 rounded-lg bg-[#0f1117] border border-[#2a2d3e]">
                              <Target size={11} className="text-coral mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-slate-400 leading-relaxed">{pain}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Content pillars */}
                {brief.contentPillars.length > 0 && (
                  <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Pilares de conteúdo</p>
                    <div className="flex flex-wrap gap-2">
                      {brief.contentPillars.map((pillar, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-coral/10 text-coral border border-coral/20"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
