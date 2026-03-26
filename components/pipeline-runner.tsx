'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, X, Terminal, Loader2, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react'

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
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/30 transition-all"
      >
        <Play size={14} className="fill-green-400" />
        Executar Pipeline
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
        >
          <div className="w-full max-w-2xl rounded-2xl border border-[#2a2d3e] bg-[#0f1117] shadow-2xl overflow-hidden flex flex-col"
               style={{ maxHeight: '80vh' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2d3e]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Terminal size={15} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Executar Pipeline</p>
                  <p className="text-[11px] text-slate-500">{squadName}</p>
                </div>
              </div>
              <button onClick={handleClose} className="w-7 h-7 rounded-lg bg-[#2a2d3e] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <X size={13} />
              </button>
            </div>

            {/* Command bar */}
            <div className="px-5 py-3 border-b border-[#2a2d3e] flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-[#161822] border border-[#2a2d3e] rounded-lg px-3 py-2 font-mono text-xs text-slate-300">
                <span className="text-slate-600">$</span>
                <span className="text-green-400">{command}</span>
              </div>
              <button
                onClick={copyCommand}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2a2d3e] text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>

            {/* Terminal output */}
            {status !== 'idle' && (
              <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-slate-300 bg-[#080a0f] scrollbar-none"
                style={{ minHeight: '200px' }}
              >
                {lines.map((line, i) => (
                  <div key={i} className={
                    line.startsWith('✓') ? 'text-green-400' :
                    line.startsWith('✗') ? 'text-red-400' :
                    line.startsWith('[stderr]') ? 'text-yellow-500/70' :
                    line.startsWith('#') || line.startsWith('##') ? 'text-coral font-semibold' :
                    'text-slate-300'
                  }>
                    {line || '\u00A0'}
                  </div>
                ))}
                {status === 'running' && (
                  <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5" />
                )}
              </div>
            )}

            {/* Footer actions */}
            <div className="px-5 py-4 border-t border-[#2a2d3e] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {status === 'running' && (
                  <><Loader2 size={14} className="text-green-400 animate-spin" />
                  <span className="text-xs text-slate-400">Executando...</span></>
                )}
                {status === 'done' && (
                  <><CheckCircle size={14} className="text-green-400" />
                  <span className="text-xs text-green-400">Pipeline finalizado</span></>
                )}
                {status === 'error' && (
                  <><AlertCircle size={14} className="text-red-400" />
                  <span className="text-xs text-red-400">Erro na execução</span></>
                )}
              </div>

              <div className="flex items-center gap-2">
                {status === 'idle' && (
                  <p className="text-xs text-slate-600 mr-2">
                    Executa o pipeline completo com todos os agentes
                  </p>
                )}
                {(status === 'idle' || status === 'done' || status === 'error') && (
                  <button
                    onClick={runPipeline}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-500 hover:bg-green-400 text-black transition-colors"
                  >
                    <Play size={13} className="fill-black" />
                    {status === 'idle' ? 'Executar' : 'Executar novamente'}
                  </button>
                )}
                {status === 'running' && (
                  <button
                    onClick={() => { readerRef.current?.cancel(); setStatus('error'); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <X size={13} />
                    Cancelar
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
