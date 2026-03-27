'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, X, Terminal, Loader2, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  squadCode: string
  squadName: string
}

type RunStatus = 'idle' | 'running' | 'done' | 'error'

export function PipelineRunner({ squadCode, squadName }: Props) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<RunStatus>('idle')
  const [lines, setLines] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null)

  const command = `/opensquad run ${squadCode}`

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [status])

  function handleClose() {
    if (status === 'running') {
      readerRef.current?.cancel()
    }
    setOpen(false)
    setStatus('idle')
    setLines([])
  }

  async function runPipeline() {
    setStatus('running')
    setLines([])

    try {
      const res = await fetch('/api/pipeline/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ squadCode }),
      })

      if (!res.ok || !res.body) {
        setLines((l) => [...l, `✗ Erro HTTP ${res.status}`])
        setStatus('error')
        return
      }

      const reader = res.body.getReader()
      readerRef.current = reader
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''

        for (const part of parts) {
          const dataPart = part.replace(/^data: /, '').trim()
          if (!dataPart) continue
          try {
            const msg = JSON.parse(dataPart)
            if (msg.text) {
              setLines((l) => {
                const last = l[l.length - 1] ?? ''
                // Append to last line if no newline, else push new line
                if (msg.text.includes('\n')) {
                  const chunks = (last + msg.text).split('\n')
                  return [...l.slice(0, -1), ...chunks]
                }
                return [...l.slice(0, -1), last + msg.text]
              })
            }
            if (msg.done) {
              setStatus(msg.exitCode === 0 ? 'done' : 'error')
            }
          } catch {
            // not JSON, ignore
          }
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setLines((l) => [...l, `✗ ${message}`])
      setStatus('error')
    }
  }

  async function copyCommand() {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)] group"
      >
        <Play size={14} className="fill-emerald-400 group-hover:scale-110 transition-transform" />
        Executar Automação
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
        >
          <div className="w-full max-w-2xl glass-panel border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent shadow-2xl flex flex-col overflow-hidden animate-zoom-in"
               style={{ maxHeight: '85vh' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[1.2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg">
                  <Terminal size={20} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-tight">Console de Operações</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{squadName}</p>
                </div>
              </div>
              <button 
                onClick={handleClose} 
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Command bar */}
            <div className="px-8 py-4 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
              <div className="flex-1 flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl px-4 py-3 font-mono text-[11px]">
                <span className="text-slate-600 font-bold">$</span>
                <span className="text-emerald-400 font-bold tracking-tight">{command}</span>
              </div>
              <button
                onClick={copyCommand}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-[9px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Terminal output */}
            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto p-8 font-mono text-[11px] leading-relaxed text-slate-400 bg-black/40 scrollbar-none selection:bg-emerald-500/20"
              style={{ minHeight: '300px' }}
            >
              {status === 'idle' && (
                 <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-30">
                    <Terminal size={32} className="mb-4" />
                    <p className="font-bold uppercase tracking-widest">Console pronto para execução.</p>
                 </div>
              )}
              {lines.map((line, i) => (
                <div key={i} className={cn(
                  "py-0.5",
                  line.startsWith('✓') ? 'text-emerald-400 font-black' :
                  line.startsWith('✗') ? 'text-red-400 font-black' :
                  line.startsWith('[stderr]') ? 'text-orange-500/70' :
                  line.startsWith('#') || line.startsWith('##') ? 'text-purple-400 font-black uppercase tracking-tight' :
                  'text-slate-400'
                )}>
                  {line || '\u00A0'}
                </div>
              ))}
              {status === 'running' && (
                <div className="flex items-center gap-2 mt-2">
                   <div className="w-1.5 h-3.5 bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest">Waiting for output...</span>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="px-8 py-6 border-t border-white/5 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-4">
                {status === 'running' && (
                  <div className="flex items-center gap-3">
                    <Loader2 size={16} className="text-emerald-400 animate-spin" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">Running Task</span>
                  </div>
                )}
                {status === 'done' && (
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-400" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Execution Finished</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-3">
                    <AlertCircle size={16} className="text-red-400" />
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Fatal System Error</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {(status === 'idle' || status === 'done' || status === 'error') && (
                  <button
                    onClick={runPipeline}
                    className="flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-black bg-emerald-500 text-black hover:bg-emerald-400 transition-all uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <Play size={14} className="fill-black" />
                    {status === 'idle' ? 'Start Run' : 'Re-run Operation'}
                  </button>
                )}
                {status === 'running' && (
                  <button
                    onClick={() => { readerRef.current?.cancel(); setStatus('error'); }}
                    className="flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-black bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all uppercase tracking-widest"
                  >
                    <X size={14} />
                    Terminate
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
