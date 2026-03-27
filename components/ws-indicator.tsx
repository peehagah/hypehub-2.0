'use client'

import { useEffect, useRef, useState } from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WsMessage, SquadRunState } from '@/lib/types'

interface WsIndicatorProps {
  onStateUpdate?: (squad: string, state: SquadRunState) => void
  onDisconnect?: (squad: string) => void
}

export function WsIndicator({ onStateUpdate, onDisconnect }: WsIndicatorProps) {
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const retryRef = useRef(1000)
  const disposedRef = useRef(false)

  useEffect(() => {
    disposedRef.current = false

    function connect() {
      if (disposedRef.current) return
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      const ws = new WebSocket(`${protocol}//${window.location.host}/__squads_ws`)
      wsRef.current = ws

      ws.onopen = () => {
        setConnected(true)
        retryRef.current = 1000
      }

      ws.onmessage = (ev) => {
        try {
          const msg: WsMessage = JSON.parse(ev.data)
          if ((msg.type === 'SQUAD_ACTIVE' || msg.type === 'SQUAD_UPDATE') && onStateUpdate) {
            onStateUpdate(msg.squad, msg.state)
          }
          if (msg.type === 'SQUAD_INACTIVE' && onDisconnect) {
            onDisconnect(msg.squad)
          }
        } catch {/* ignore */}
      }

      ws.onclose = () => {
        setConnected(false)
        if (!disposedRef.current) {
          setTimeout(connect, Math.min(retryRef.current, 30000))
          retryRef.current *= 2
        }
      }

      ws.onerror = () => ws.close()
    }

    connect()

    return () => {
      disposedRef.current = true
      wsRef.current?.close()
    }
  }, [onStateUpdate, onDisconnect])

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-2xl text-[10px] font-black border transition-all duration-500 uppercase tracking-widest',
        connected
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
          : 'bg-white/[0.03] text-slate-500 border-white/5'
      )}
      title={connected ? 'Stream de Dados Ativo' : 'Stream de Dados Desconectado'}
    >
      <div className={cn(
        "w-1.5 h-1.5 rounded-full shadow-sm",
        connected ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-slate-700"
      )} />
      {connected ? 'LIVE' : 'OFFLINE'}
    </div>
  )
}
