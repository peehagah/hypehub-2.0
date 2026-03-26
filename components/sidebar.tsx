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
    <>
      {/* Logo */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-5 border-b border-[#2a2d3e]',
          collapsed && 'justify-center px-0'
        )}
      >
        <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg shadow-coral/20">
          <span className="text-white font-bold text-sm leading-none">OS</span>
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-base gradient-text">Opensquad</span>
            <p className="text-[10px] text-slate-500 -mt-0.5">Agent Pipeline Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {/* Dashboard */}
        {[
          { href: '/', label: 'Dashboard', icon: LayoutDashboard },
        ].map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-gradient-to-r from-coral/20 to-purple/10 text-white border border-coral/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5',
                collapsed && 'justify-center px-0'
              )}
            >
              <Icon size={18} className={active ? 'text-coral' : ''} />
              {!collapsed && label}
            </Link>
          )
        })}

        {/* Squads section */}
        {!collapsed && (
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-3 pt-5 pb-1">
            Squads
          </p>
        )}
        {collapsed && <div className="py-2 border-t border-[#2a2d3e] mx-2" />}

        {squads.map((squad) => {
          const href = `/squad/${squad.code}`
          const active = pathname.startsWith(href)
          return (
            <Link
              key={squad.code}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150',
                active ? 'bg-coral/10 text-white border border-coral/15' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5',
                collapsed && 'justify-center px-0'
              )}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 border"
                style={
                  active
                    ? { background: 'rgba(255,107,107,0.2)', borderColor: 'rgba(255,107,107,0.3)' }
                    : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }
                }
              >
                {squad.icon}
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium truncate leading-tight">{squad.name}</p>
                  <p className="text-[10px] text-slate-600 truncate">{squad.agents?.length ?? 0} agentes</p>
                </div>
              )}
            </Link>
          )
        })}

        {/* Sub-links when a squad is active */}
        {squads.map((squad) => {
          const squadHref = `/squad/${squad.code}`
          if (!pathname.startsWith(squadHref)) return null
          const subLinks = [
            { href: `${squadHref}#agentes`, label: 'Agentes', icon: Bot },
            { href: `${squadHref}#pipeline`, label: 'Pipeline', icon: GitBranch },
          ]
          if (collapsed) return null
          return subLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[11px] text-slate-600 hover:text-slate-300 hover:bg-white/5 transition-colors ml-3"
            >
              <Icon size={12} />
              {label}
            </a>
          ))
        })}
      </nav>

      {/* Bottom: operator identity */}
      <div className="border-t border-[#2a2d3e] p-3">
        <div
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors',
            collapsed && 'justify-center px-0'
          )}
        >
          <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            P
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white truncate">Pedro</p>
              <p className="text-[10px] text-slate-500 truncate">Head de Marketing</p>
            </div>
          )}
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3 left-3 z-50 md:hidden w-10 h-10 rounded-xl bg-[#161822] border border-[#2a2d3e] flex items-center justify-center text-slate-400 hover:text-white transition-colors shadow-lg"
      >
        <Menu size={18} />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Desktop */}
      <aside
        className={cn(
          'relative hidden md:flex flex-col h-screen transition-all duration-300 ease-in-out border-r border-[#2a2d3e] flex-shrink-0',
          collapsed ? 'w-16' : 'w-60'
        )}
        style={{ background: '#161822' }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full bg-[#2a2d3e] border border-[#3a3d4e] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#3a3d4e] transition-colors"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
        {navContent}
      </aside>

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col w-72 transition-transform duration-300 border-r border-[#2a2d3e] md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ background: '#161822' }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-[#2a2d3e] flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X size={14} />
        </button>
        {navContent}
      </aside>
    </>
  )
}
