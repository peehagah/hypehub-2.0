'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { SquadRunState } from '@/lib/types'

interface WsIndicatorProps {
  squadCode: string
  onStateUpdate?: (squad: string, state: SquadRunState) => void
  onDisconnect?: (squad: string) => void
}

export function WsIndicator({ squadCode, onStateUpdate, onDisconnect }: WsIndicatorProps) {
  const [live, setLive] = useState(false)
  const activeRef = useRef(true)

  useEffect(() => {
    activeRef.current = true

    async function poll() {
      if (!activeRef.current) return
      try {
        const res = await fetch(`/api/squads/${squadCode}/state`, { cache: 'no-store' })
        if (!activeRef.current) return
        if (res.ok) {
          const state: SquadRunState | null = await res.json()
          if (state && state.status === 'running') {
            setLive(true)
            onStateUpdate?.(squadCode, state)
          } else if (state) {
            setLive(false)
            onStateUpdate?.(squadCode, state)
          } else {
            setLive(false)
            onDisconnect?.(squadCode)
          }
        } else {
          setLive(false)
          onDisconnect?.(squadCode)
        }
      } catch {
        if (activeRef.current) {
          setLive(false)
          onDisconnect?.(squadCode)
        }
      }
    }

    poll()
    const interval = setInterval(poll, 2000)

    return () => {
      activeRef.current = false
      clearInterval(interval)
    }
  }, [squadCode, onStateUpdate, onDisconnect])

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-2xl text-[10px] font-black border transition-all duration-500 uppercase tracking-widest',
        live
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
          : 'bg-white/[0.03] text-slate-500 border-white/5'
      )}
      title={live ? 'Pipeline em execução' : 'Aguardando execução'}
    >
      <div className={cn(
        'w-1.5 h-1.5 rounded-full',
        live ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-700'
      )} />
      {live ? 'LIVE' : 'IDLE'}
    </div>
  )
}
