import { 
  Bot, 
  Instagram, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  LayoutGrid, 
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Monitor
} from 'lucide-react'
import { listSquads } from '@/lib/squads'

export default function DashboardPage() {
  const squads = listSquads()

  // Mock data for the Premium Feel based on user request
  const instagramMetrics = {
    followers: '128.4k',
    reach: '+12.5%',
    engagement: '5.2%',
    postsToday: 3,
    totalPosts: 12
  }

  const agentTasks = [
    { id: 1, agent: 'Estrategista', task: 'Análise de tendências concluída', time: '12min atrás' },
    { id: 2, agent: 'Copywriter', task: 'Legendas para Reels geradas', time: '45min atrás' },
    { id: 3, agent: 'Designer', task: 'Carrossel "Método EGO" finalizado', time: '1h atrás' },
  ]

  const competitorInsights = [
    { name: 'Concorrente A', status: 'Postou novo Reels', impact: 'Alto' },
    { name: 'Concorrente B', status: 'Mudança na Bio detectada', impact: 'Médio' },
  ]

  return (
    <div className="min-h-screen p-6 lg:p-10 space-y-10 animate-fade-in max-w-[1600px] mx-auto pb-24">
      
      {/* ── Header Area ── */}
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
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Scraper Ativo</span>
          </div>
          <button className="glass-panel p-2 border-white/10 hover:bg-white/5 transition-colors">
            <Search size={18} className="text-slate-400" />
          </button>
        </div>
      </header>

      {/* ── Top Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Alcance 24h', value: '1.2M', trend: '+14%', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Posts Hoje', value: instagramMetrics.postsToday, trend: 'Meta: 5', icon: Instagram, color: 'text-pink-400' },
          { label: 'Tasks IA', value: '24', trend: '100% Sucesso', icon: Bot, color: 'text-purple-400' },
          { label: 'Engajamento', value: '8.4%', trend: 'Acima da média', icon: Zap, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 glass-panel-interactive relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-xl bg-white/5 border border-white/5", stat.color)}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-white">{stat.value}</h3>
              <span className={cn("text-[10px] font-bold", stat.color)}>{stat.trend}</span>
            </div>
            {/* Background Glow Deco */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ── Left Column: Metrics & Content (8 cols) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Visual Metric: Engagement Chart Placeholder Area */}
          <div className="glass-panel p-8 min-h-[400px] flex flex-col justify-between border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-white">Engajamento Semanal</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Performance por Postagem</p>
              </div>
              <div className="flex gap-2">
                <button className="text-[10px] font-black text-white px-3 py-1 bg-white/10 rounded-full border border-white/10">Views</button>
                <button className="text-[10px] font-black text-slate-500 px-3 py-1 hover:text-white transition-colors">Likes</button>
              </div>
            </div>
            
            <div className="flex-1 flex items-end gap-2 px-2 pb-4">
              {/* Animated Bars Mockup */}
              {[40, 70, 45, 90, 65, 80, 50, 85, 60, 95].map((h, i) => (
                <div key={i} className="flex-1 group relative cursor-pointer">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500/20 to-purple-500 rounded-t-lg transition-all duration-500 group-hover:to-pink-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-panel px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    <span className="text-[10px] font-bold text-white tracking-widest">{(h * 1234).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Últimos 10 Dias de Operação</p>
              <div className="flex items-center gap-1 text-emerald-400 font-black text-xs">
                <ArrowUpRight size={14} />
                +24.8% CRESCIMENTO
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Completed Tasks */}
            <div className="glass-panel p-6 border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-purple-400" /> Tasks Concluídas
                </h3>
                <span className="text-[10px] font-bold text-slate-500">HOJE</span>
              </div>
              <div className="space-y-4">
                {agentTasks.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-xs font-black text-purple-400">
                        {t.agent[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-none">{t.task}</p>
                        <p className="text-[10px] text-slate-500 mt-1">{t.agent}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 italic whitespace-nowrap">{t.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Scraper */}
            <div className="glass-panel p-6 border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Search size={16} className="text-orange-400" /> Radar Concorrência
                </h3>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest leading-none">Scanning</span>
                </div>
              </div>
              <div className="space-y-4 text-[11px]">
                {competitorInsights.map((c, i) => (
                  <div key={i} className="flex gap-4 items-start border-b border-white/5 pb-4 last:border-0">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400">
                      <Monitor size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-black text-white uppercase tracking-tighter">{c.name}</p>
                        <span className="text-[9px] font-black text-slate-500">{c.impact} IMPACTO</span>
                      </div>
                      <p className="text-slate-400 mt-0.5 font-medium">{c.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── Right Column: Instagram Preview & Squads (4 cols) ── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Instagram Post Count Widget */}
          <div className="glass-panel p-8 border-white/5 relative overflow-hidden bg-gradient-to-br from-pink-500/10 to-transparent">
            <Instagram size={40} className="absolute -top-4 -right-4 text-pink-500/10 rotate-12" />
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8">Posts no Dia</h3>
            <div className="flex justify-center items-center py-6">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="70" className="stroke-white/5 fill-none" strokeWidth="12" />
                  <circle 
                    cx="80" cy="80" r="70" 
                    className="stroke-pink-500 fill-none transition-all duration-1000" 
                    strokeWidth="12" 
                    strokeDasharray="440" 
                    strokeDashoffset={440 - (440 * (instagramMetrics.postsToday / 5))}
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))' }}
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-4xl font-black text-white leading-none">{instagramMetrics.postsToday}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">de 5 Meta</p>
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] font-bold text-slate-500 mt-4 leading-relaxed tracking-wide">
              Faltam <span className="text-pink-400">2 posts</span> para bater a meta<br/>definida pelo Agente Estratégico.
            </p>
          </div>

          {/* Active Squads Quick List */}
          <div className="glass-panel p-6 border-white/5">
             <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
                <Users size={16} className="text-cyan-400" /> Squads Ativos
             </h3>
             <div className="space-y-3">
                {squads.map(s => (
                  <div key={s.code} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-white tracking-wide uppercase">{s.name}</p>
                      <p className="text-[9px] font-bold text-slate-500 tracking-widest mt-0.5">ESTADO: OPERANDO</p>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-600 group-hover:text-cyan-400" />
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all">
                Configurar Novos Agentes
             </button>
          </div>

        </div>

      </div>

    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
