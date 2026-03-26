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
        'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border',
        connected
          ? 'bg-green-500/10 text-green-400 border-green-500/20'
          : 'bg-[#2a2d3e] text-slate-500 border-transparent'
      )}
      title={connected ? 'Pipeline Runner conectado' : 'Pipeline Runner desconectado'}
    >
      {connected ? <Wifi size={10} /> : <WifiOff size={10} />}
      {connected ? 'Live' : 'Offline'}
    </div>
  )
}
