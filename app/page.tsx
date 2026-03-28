import Link from 'next/link'
import {
  Bot,
  Zap,
  Target,
  Users,
  ArrowUpRight,
  FileText,
  GitBranch,
} from 'lucide-react'
import { listSquads, loadAgents, listOutputs } from '@/lib/squads'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const squads = listSquads()

  const totalAgents = squads.reduce((sum, s) => sum + (s.agents?.length ?? 0), 0)
  const totalOutputs = squads.reduce((sum, s) => sum + listOutputs(s.code).length, 0)
  const totalSteps = squads.reduce((sum, s) => sum + (s.skills?.length ?? 0), 0)

  return (
    <div className="min-h-screen p-6 lg:p-10 space-y-10 animate-fade-in max-w-[1600px] mx-auto pb-24">

      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
            Overview <span className="text-purple-500 italic">Pedro</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
            HypeHUB NEO · IA Hub · {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-2 flex items-center gap-2 border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Sistema Ativo</span>
          </div>
        </div>
      </header>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Squads Ativos', value: squads.length, trend: 'configurados', icon: Users, color: 'text-cyan-400' },
          { label: 'Agentes IA', value: totalAgents, trend: 'especializados', icon: Bot, color: 'text-purple-400' },
          { label: 'Skills', value: totalSteps, trend: 'instaladas', icon: Zap, color: 'text-orange-400' },
          { label: 'Outputs', value: totalOutputs, trend: 'arquivos gerados', icon: FileText, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 glass-panel-interactive relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-white">{stat.value}</h3>
              <span className={`text-[10px] font-bold ${stat.color}`}>{stat.trend}</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
          </div>
        ))}
      </div>

      {/* ── Squads ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
            <Users size={16} className="text-cyan-400" /> Meus Squads
          </h2>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{squads.length} CONFIGURADOS</span>
        </div>

        {squads.length === 0 ? (
          <div className="glass-panel p-16 text-center border-white/5">
            <Bot size={40} className="mx-auto text-slate-700 mb-4" />
            <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Nenhum squad configurado</p>
            <p className="text-xs text-slate-600 mt-2 font-medium italic">Use /opensquad create para criar um squad.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {squads.map((squad) => {
              const outputs = listOutputs(squad.code)
              const agents = loadAgents(squad.code)
              return (
                <Link
                  key={squad.code}
                  href={`/workspace/${squad.code}`}
                  className="glass-panel p-6 border-white/5 hover:bg-white/[0.06] hover:border-purple-500/20 transition-all group block"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center text-3xl flex-shrink-0 shadow-lg bg-purple-500/10 border border-purple-500/20 group-hover:scale-105 transition-transform">
                      {squad.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-white uppercase tracking-tight truncate">{squad.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">{squad.description}</p>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Agentes', value: agents.length, icon: Bot, color: 'text-purple-400' },
                      { label: 'Pipeline', value: squad.skills?.length ?? 0, icon: GitBranch, color: 'text-cyan-400' },
                      { label: 'Outputs', value: outputs.length, icon: Target, color: 'text-emerald-400' },
                    ].map((m) => (
                      <div key={m.label} className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                        <p className={`text-lg font-black ${m.color}`}>{m.value}</p>
                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {outputs.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Último output</p>
                      <p className="text-[10px] text-slate-500 font-mono truncate">
                        {outputs[0].filename.split('/').pop()}
                      </p>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}
