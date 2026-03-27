'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  GitBranch,
  Bot,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Squad } from '@/lib/types'

interface SidebarProps {
  squads: Squad[]
}

export function Sidebar({ squads }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Brand Logo */}
      <div
        className={cn(
          'flex items-center gap-4 px-6 py-8 border-b border-white/5',
          collapsed && 'justify-center px-0'
        )}
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <span className="text-white font-black text-lg">AG</span>
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <span className="font-black text-xl tracking-tight text-white italic">HypeHUB <span className="not-italic text-purple-500">NEO</span></span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IA Hub · Online</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-none">
        <p className={cn(
          "text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-4",
          collapsed && "hidden"
        )}>
          Menu Principal
        </p>
        
        {[
          { href: '/', label: 'Overview', icon: LayoutDashboard },
        ].map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300',
                active
                  ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5',
                collapsed && 'justify-center px-0'
              )}
            >
              <Icon size={20} className={cn(
                'transition-transform duration-300 group-hover:scale-110',
                active ? 'text-purple-400' : 'text-slate-500'
              )} />
              {!collapsed && label}
              {active && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              )}
            </Link>
          )
        })}

        {/* Squads Detail */}
        {!collapsed && (
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 pt-8 mb-4">
            Meus Squads
          </p>
        )}
        
        <div className="space-y-1">
          {squads.map((squad) => {
            const href = `/workspace/${squad.code}`
            const active = pathname.startsWith(href)
            return (
              <div key={squad.code} className="space-y-1">
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300',
                    active ? 'bg-white/5 text-white' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5',
                    collapsed && 'justify-center px-0'
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300",
                      active ? "bg-purple-500/20 border border-purple-500/30 scale-110" : "bg-white/5 border border-white/10 group-hover:border-white/20"
                    )}
                  >
                    {squad.icon}
                  </div>
                  {!collapsed && (
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate leading-tight tracking-wide">{squad.name}</p>
                      <p className="text-[10px] text-slate-600 font-medium truncate uppercase tracking-tighter mt-0.5">
                        {squad.agents?.length ?? 0} Agentes Ativos
                      </p>
                    </div>
                  )}
                </Link>

                {/* Sub-links Expanders */}
                {active && !collapsed && (
                  <div className="ml-12 pl-4 border-l border-white/5 space-y-1 animate-fade-in py-1">
                    <a href={`${href}#agentes`} className="flex items-center gap-2 py-2 text-[11px] font-bold text-slate-500 hover:text-purple-400 transition-colors">
                      <Bot size={14} /> Monitor de Dados
                    </a>
                    <a href={`${href}#pipeline`} className="flex items-center gap-2 py-2 text-[11px] font-bold text-slate-500 hover:text-purple-400 transition-colors">
                      <GitBranch size={14} /> Automação Pipeline
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* Operator Status */}
      <div className="p-6">
        <div className="glass-panel p-4 flex items-center gap-3 border border-white/10">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-black">
              P
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#060810] z-10"></div>
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1 animate-fade-in">
              <p className="text-sm font-black text-white truncate">Pedro H.</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-6 left-6 z-50 md:hidden w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-white transition-all shadow-2xl active:scale-90"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-fade-in" onClick={() => setMobileOpen(false)} />
      )}

      {/* Desktop Persistent Sidebar */}
      <aside
        className={cn(
          'relative hidden md:flex flex-col h-screen transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] glass-sidebar z-30',
          collapsed ? 'w-24' : 'w-80'
        )}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-10 z-10 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform active:scale-95"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
        {navContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col w-[85%] max-w-[320px] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] glass-sidebar md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full shadow-none'
        )}
      >
        {navContent}
      </aside>
    </>
  )
}
