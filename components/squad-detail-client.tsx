'use client'

import { useState, useEffect, useCallback } from 'react'
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
import { PipelineRunner } from '@/components/pipeline-runner'
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

  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) setGreeting('Bom dia')
    else if (hour >= 12 && hour < 18) setGreeting('Boa tarde')
    else setGreeting('Boa noite')
  }, [])

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
      <div className="glass-panel p-8 flex flex-wrap items-center gap-6 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
        <div
          className="w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl flex-shrink-0 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}
        >
          {squad.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic">
               {greeting ? `${greeting}, ` : ''}<span className="not-italic text-purple-500">Pedro</span>
            </h1>
            {brief && (
              <span className="text-[10px] font-black text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest">
                Cliente: {brief.clientName}
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mt-2 font-medium leading-relaxed max-w-2xl">{squad.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <WsIndicator squadCode={squad.code} onStateUpdate={handleStateUpdate} onDisconnect={handleDisconnect} />
          <PipelineRunner squadCode={squad.code} squadName={squad.name} />
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            {squad.mode ?? 'ONLINE'}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="space-y-8">
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
          <div className="flex items-center gap-2 border-b border-white/5 mb-8 min-w-max md:min-w-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-6 py-4 text-[10px] font-black transition-all duration-300 border-b-2 -mb-px flex items-center gap-2 uppercase tracking-[0.2em]',
                  activeTab === tab
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                )}
              >
                {tabIcons[tab]}
                {tab}
                {tab === 'Outputs' && outputs.length > 0 && (
                  <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20">
                    {outputs.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─────────── Visão Geral ─────────── */}
        {activeTab === 'Visão Geral' && (
          <div className="space-y-8 animate-fade-in">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Agentes', value: agents.length, sub: 'especializados', color: 'text-pink-400', glow: 'rgba(236,72,153,0.1)' },
                { label: 'Pipeline steps', value: steps.length, sub: `${checkpoints.length} checkpoints`, color: 'text-purple-400', glow: 'rgba(168,85,247,0.1)' },
                { label: 'Skills', value: squad.skills?.length ?? 0, sub: squad.skills?.slice(0, 2).join(', ') || '—', color: 'text-cyan-400', glow: 'rgba(6,182,212,0.1)' },
                { label: 'Outputs', value: outputs.length, sub: 'arquivos gerados', color: 'text-emerald-400', glow: 'rgba(16,185,129,0.1)' },
              ].map(({ label, value, sub, color, glow }) => (
                <div key={label} className="glass-panel p-6 glass-panel-interactive border-white/5 relative overflow-hidden group">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">{label}</p>
                  <p className={cn("text-4xl font-black transition-transform duration-300 group-hover:scale-105", color)}>{value}</p>
                  <p className="text-[10px] font-bold text-slate-600 mt-2 uppercase tracking-tight truncate">{sub}</p>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full blur-2xl transition-colors" style={{ background: glow }}></div>
                </div>
              ))}
            </div>

            {/* Client context (if brief loaded) */}
            {brief && (
              <div className="glass-panel p-8 border-white/5 bg-gradient-to-br from-pink-500/[0.03] to-transparent">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Contexto Estratégico do Cliente</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Identity */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(236,72,153,0.2)]">🎯</div>
                      <div>
                        <p className="text-lg font-black text-white uppercase tracking-tight">{brief.clientName}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{brief.niche}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-bold">
                      <span className="flex items-center gap-2 text-slate-400 hover:text-pink-400 transition-colors cursor-pointer">
                        <Instagram size={14} className="text-pink-400" />
                        @{brief.instagram.split('—')[0].trim()}
                      </span>
                      <span className="text-white/10">|</span>
                      <span className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors cursor-pointer">
                        <Play size={14} className="text-red-400" />
                        @{brief.youtube.split('—')[0].trim()}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Meta IG', val: '500k' },
                        { label: 'Meta YT', val: '100k' },
                        { label: 'Ticket', val: 'R$10k' },
                      ].map(m => (
                        <div key={m.label} className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-center transition-transform hover:scale-105">
                          <p className="text-[9px] font-black text-slate-500 uppercase mb-1">{m.label}</p>
                          <p className="text-sm font-black text-white">{m.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Método EGO */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Framework: Método EGO</p>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { k: 'E', label: 'Essência', color: 'text-pink-400', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.2)', text: brief.egoMethod.E },
                        { k: 'G', label: 'Generosidade', color: 'text-emerald-400', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', text: brief.egoMethod.G },
                        { k: 'O', label: 'Ousadia', color: 'text-purple-400', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)', text: brief.egoMethod.O },
                      ].map(({ k, label, color, bg, border, text }) => (
                        <div key={k} className="flex items-start gap-4 px-4 py-3 rounded-2xl border bg-white/[0.02] hover:bg-white/[0.05] transition-colors" style={{ borderColor: border }}>
                          <span className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 shadow-lg", color)} style={{ background: bg }}>{k}</span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-black text-white uppercase tracking-wider">{label}</p>
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1 line-clamp-2">{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pipeline snapshot + Agents side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PipelineBoard steps={steps} runState={runState} />

              {/* Agent quick list */}
              <div className="glass-panel p-6 border-white/5 bg-gradient-to-br from-purple-500/[0.03] to-transparent">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                    <Bot size={18} className="text-purple-400" />
                    Agentes Ativos
                  </h3>
                  <span className="text-[10px] font-black text-slate-500">{agents.length} MEMBROS</span>
                </div>
                <div className="space-y-3">
                  {agents.map((agent) => {
                    const color = agentColor(agent.id)
                    const live = runState?.agents?.find((a) => a.id === agent.id)
                    const isActive = live?.status === 'working'
                    return (
                      <div key={agent.id} className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-all group">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-transform group-hover:scale-110 shadow-lg" style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
                          {agent.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-white uppercase tracking-tight truncate">{agent.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold truncate uppercase tracking-tighter">{agent.role || agent.summary}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <span
                            className="text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm"
                            style={
                              isActive
                                ? { background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(52,211,153,0.2)' }
                                : live?.status === 'done'
                                ? { background: 'rgba(236,72,153,0.1)', color: '#ec4899', border: '1px solid rgba(236,72,153,0.2)' }
                                : { background: 'rgba(255,255,255,0.03)', color: '#64748b', border: '1px solid rgba(255,255,255,0.05)' }
                            }
                          >
                            {isActive ? 'WORKING' : (live?.status ?? 'IDLE')}
                          </span>
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Live handoff */}
            {runState?.handoff && (
              <div className="glass-panel p-6 border-purple-500/20 bg-purple-500/5 flex items-start gap-4 animate-pulse">
                <Bot size={20} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-black text-purple-400 mb-1 uppercase tracking-widest">
                    Handoff: {runState.handoff.from} → {runState.handoff.to}
                  </p>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{runState.handoff.message}</p>
                </div>
              </div>
            )}

            {/* Outputs preview */}
            {outputs.length > 0 && (
              <div className="glass-panel p-6 border-emerald-500/10 bg-emerald-500/[0.02]">
                <p className="text-[10px] font-black text-emerald-400 mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                  <Target size={14} />
                  Últimos Outputs Gerados
                </p>
                <div className="space-y-2">
                  {outputs.slice(0, 3).map((f) => (
                    <div key={f.filename} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                      <FileText size={14} className="text-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-slate-400 font-mono truncate">{f.filename}</span>
                      <span className="ml-auto text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{(f.sizeBytes / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────── Agentes ─────────── */}
        {activeTab === 'Agentes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {agents.map((agent) => {
              const color = agentColor(agent.id)
              const live = runState?.agents?.find((a) => a.id === agent.id)
              return (
                <div key={agent.id} className="glass-panel p-8 glass-panel-interactive border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                  <div className="flex items-start gap-6">
                    <div
                      className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-4xl flex-shrink-0 shadow-xl"
                      style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      {agent.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-black text-white uppercase tracking-tight">{agent.name}</h3>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">{agent.role}</p>
                        </div>
                        {live && (
                          <span className="text-[9px] font-black px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                            {live.status}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 mt-4 leading-relaxed font-medium">{agent.summary || 'Nenhuma descrição técnica fornecida.'}</p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className="text-[9px] font-black px-2 py-1 rounded bg-white/5 border border-white/5 text-slate-500 uppercase tracking-widest">
                          {agent.execution?.includes('subagent') ? '⚡ NEXT-GEN SUBAGENT' : '→ INLINE CORE'}
                        </span>
                        {squad.skills?.slice(0, 3).map((skill) => (
                          <span key={skill} className="text-[9px] font-black px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/10 uppercase tracking-widest">
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
          <div className="space-y-8 animate-fade-in">
            <PipelineBoard steps={steps} runState={runState} />

            {/* Checkpoints detail */}
            {checkpoints.length > 0 && (
              <div className="glass-panel p-8 border-white/5">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-orange-400" />
                    Pontos de Decisão (Checkpoints)
                  </h3>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{checkpoints.length} PONTOS</span>
                </div>
                <div className="space-y-3">
                  {checkpoints.map((cp) => (
                    <div key={cp.filename} className="flex items-center gap-4 p-4 rounded-2xl border border-orange-500/10 bg-orange-500/[0.03] hover:bg-orange-500/[0.05] transition-colors group">
                      <span className="text-xs font-black text-orange-600 w-8 group-hover:scale-110 transition-transform">
                        {String(cp.stepNumber).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-white uppercase tracking-wide">{cp.label}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{cp.filename}</p>
                      </div>
                      <span className="text-[9px] font-black px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                        Aprovação Necessária
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────── Outputs ─────────── */}
        {activeTab === 'Outputs' && (
          <div className="animate-fade-in glass-panel p-8 border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Repositório de Outputs</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Storage: <code className="text-purple-400 ml-1">outputs/</code>
              </p>
            </div>
            <OutputsList outputs={outputs} squadCode={squad.code} />
          </div>
        )}

        {/* ─────────── Brief ─────────── */}
        {activeTab === 'Brief' && (
          <div className="space-y-8 animate-fade-in">
            {!brief ? (
              <div className="glass-panel p-20 text-center border-white/5">
                <BookOpen size={48} className="mx-auto text-slate-700 mb-6" />
                <p className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">Nenhum Client Brief Encontrado</p>
                <p className="text-xs text-slate-600 mt-2 font-medium italic">Adicione o arquivo estrategico no diretório correspondente.</p>
              </div>
            ) : (
              <>
                {/* Identity */}
                <div className="glass-panel p-8 border-white/5 bg-gradient-to-br from-purple-500/[0.02] to-transparent">
                  <div className="flex items-start gap-8 flex-wrap">
                    <div className="w-20 h-20 rounded-[2rem] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-4xl shadow-xl">🎯</div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{brief.clientName}</h2>
                      <p className="text-sm text-slate-400 mt-2 font-bold uppercase tracking-widest">{brief.niche}</p>
                      <div className="flex items-center gap-6 mt-6 flex-wrap">
                        <span className="flex items-center gap-2 text-[11px] font-black text-pink-400 uppercase tracking-widest">
                          <Instagram size={14} /> @{brief.instagram.split('—')[0].trim()}
                        </span>
                        <span className="flex items-center gap-2 text-[11px] font-black text-red-500 uppercase tracking-widest">
                          <Play size={14} /> @{brief.youtube.split('—')[0].trim()}
                        </span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-l border-white/10 pl-6">Operador: {brief.operator}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Goals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Produto Principal', val: brief.product.name, sub: brief.product.price, sub2: 'Contrato Anual', color: 'text-purple-400' },
                    { label: 'Meta Instagram', val: '500k', sub: 'Seguidores', sub2: 'Horizonte 6 meses', color: 'text-pink-400' },
                    { label: 'Meta YouTube', val: '100k', sub: 'Inscritos', sub2: 'Crescimento Orgânico', color: 'text-red-400' },
                  ].map(g => (
                    <div key={g.label} className="glass-panel p-8 border-white/5 relative overflow-hidden">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">{g.label}</p>
                      <p className={cn("text-3xl font-black uppercase tracking-tight", g.color)}>{g.val}</p>
                      <p className="text-xl font-black text-white mt-1">{g.sub}</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter mt-2">{g.sub2}</p>
                    </div>
                  ))}
                </div>

                {/* Framework EGO */}
                <div className="glass-panel p-8 border-white/5">
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Framework Estratégico: Método EGO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { k: 'E', label: 'Essência', color: 'text-pink-400', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.2)', text: brief.egoMethod.E },
                      { k: 'G', label: 'Generosidade', color: 'text-emerald-400', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', text: brief.egoMethod.G },
                      { k: 'O', label: 'Ousadia', color: 'text-purple-400', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)', text: brief.egoMethod.O },
                    ].map(({ k, label, color, bg, border, text }) => (
                      <div key={k} className="glass-panel p-6 border shadow-inner" style={{ background: bg, borderColor: border }}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shadow-lg", color)} style={{ background: 'rgba(255,255,255,0.05)' }}>{k}</span>
                          <p className="text-xs font-black text-white uppercase tracking-wider">{label}</p>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audience + Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel p-8 border-white/5">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Personas Alvo</h3>
                    <div className="space-y-3">
                      {brief.audience.map((a, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                          <span className="text-xs font-black text-purple-600">{i + 1}</span>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-panel p-8 border-white/5">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Pilares de Conteúdo</h3>
                    <div className="flex flex-wrap gap-2">
                       {brief.contentPillars.map((pillar, i) => (
                        <span key={i} className="px-4 py-2 rounded-xl text-[10px] font-black bg-white/5 text-slate-400 border border-white/10 uppercase tracking-widest hover:text-white hover:border-purple-500/50 transition-all cursor-default">
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
