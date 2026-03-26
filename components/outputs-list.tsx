'use client'

import { useState } from 'react'
import { FileText, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import { formatBytes, timeAgo } from '@/lib/utils'
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
      <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-8 text-center">
        <FileText size={32} className="mx-auto text-slate-700 mb-3" />
        <p className="text-sm text-slate-500">Nenhum output gerado ainda</p>
        <p className="text-xs text-slate-600 mt-1">Execute o pipeline para gerar conteúdo</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {outputs.map((file) => {
        const isOpen = expanded === file.filename
        const isLoading = loading === file.filename
        const content = contents[file.filename]

        return (
          <div
            key={file.filename}
            className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] overflow-hidden"
          >
            <button
              onClick={() => toggle(file.filename)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
            >
              <FileText size={14} className="text-coral flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{file.filename}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] text-slate-600 flex items-center gap-1">
                    <Clock size={9} />
                    {timeAgo(file.modifiedAt)}
                  </span>
                  <span className="text-[10px] text-slate-600">{formatBytes(file.sizeBytes)}</span>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp size={14} className="text-slate-500 flex-shrink-0" />
              ) : (
                <ChevronDown size={14} className="text-slate-500 flex-shrink-0" />
              )}
            </button>

            {isOpen && (
              <div className="border-t border-[#2a2d3e] px-4 py-4">
                {isLoading ? (
                  <div className="text-xs text-slate-500 animate-pulse">Carregando...</div>
                ) : content ? (
                  <pre className="text-xs text-slate-400 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto font-mono">
                    {content}
                  </pre>
                ) : (
                  <p className="text-xs text-slate-600">Não foi possível carregar o arquivo.</p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
