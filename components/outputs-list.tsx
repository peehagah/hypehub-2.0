'use client'

import { useState } from 'react'
import { FileText, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import { formatBytes, timeAgo, cn } from '@/lib/utils'
import type { OutputFile } from '@/lib/types'

interface OutputsListProps {
  outputs: OutputFile[]
  squadCode: string
}

export function OutputsList({ outputs, squadCode }: OutputsListProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [contents, setContents] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<string | null>(null)

  async function toggle(filename: string) {
    if (expanded === filename) {
      setExpanded(null)
      return
    }
    setExpanded(filename)
    if (contents[filename]) return
    setLoading(filename)
    try {
      const res = await fetch(`/api/squads/${squadCode}/outputs/${filename}`)
      if (res.ok) {
        const { content } = await res.json()
        setContents((prev) => ({ ...prev, [filename]: content }))
      }
    } finally {
      setLoading(null)
    }
  }

  if (outputs.length === 0) {
    return (
      <div className="glass-panel p-20 text-center border-white/5 bg-white/[0.01]">
        <FileText size={48} className="mx-auto text-slate-800 mb-6" />
        <p className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">Repositório Vazio</p>
        <p className="text-xs text-slate-600 mt-2 font-medium italic">Execute a automação para capturar e gerar arquivos.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {outputs.map((file) => {
        const isOpen = expanded === file.filename
        const isLoading = loading === file.filename
        const content = contents[file.filename]

        return (
          <div
            key={file.filename}
            className={cn(
               "glass-panel border-white/5 transition-all duration-500 overflow-hidden",
               isOpen ? "bg-white/[0.05] shadow-[0_0_30px_rgba(255,255,255,0.02)]" : "bg-white/[0.01] hover:bg-white/[0.03]"
            )}
          >
            <button
              onClick={() => toggle(file.filename)}
              className="w-full flex items-center gap-6 px-6 py-5 text-left transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FileText size={18} className="text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-white uppercase tracking-tight truncate">{file.filename}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-tighter">
                    <Clock size={10} className="text-slate-600" />
                    {timeAgo(file.modifiedAt)}
                  </span>
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest leading-none bg-purple-500/10 px-2 py-0.5 rounded">
                     {formatBytes(file.sizeBytes)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">{isOpen ? 'CLOSE' : 'PREVIEW'}</span>
                 {isOpen ? (
                   <ChevronUp size={16} className="text-white" />
                 ) : (
                   <ChevronDown size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                 )}
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-white/5 px-8 py-8 animate-fade-in bg-black/20">
                {isLoading ? (
                  <div className="flex items-center gap-3">
                     <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Carregando Buffers...</span>
                  </div>
                ) : content ? (
                  <div className="relative group/pre">
                    <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-purple-500/20"></div>
                    <pre className="text-[11px] text-slate-400 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto font-mono scrollbar-none selection:bg-purple-500/30">
                      {content}
                    </pre>
                  </div>
                ) : (
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Erro na Leitura do Disco.</p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
