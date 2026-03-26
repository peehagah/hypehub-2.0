import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'agora'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min atrás`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`
  return `${Math.floor(seconds / 86400)}d atrás`
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

/** Extract the step label from a pipeline step filename.
 *  e.g. "step-02-rodrigo-radar.md" → "Rodrigo Radar"
 *       "step-01-research-focus-checkpoint.md" → "Research Focus Checkpoint"
 */
export function stepLabel(filename: string): string {
  return filename
    .replace(/^step-\d+-/, '')
    .replace(/\.md$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Extract step number from filename, e.g. "step-02-..." → 2 */
export function stepNumber(filename: string): number {
  const m = filename.match(/^step-(\d+)/)
  return m ? parseInt(m[1], 10) : 0
}

export function isCheckpointStep(filename: string): boolean {
  return filename.includes('checkpoint')
}

/** Agent color from role/id */
export function agentColor(id: string): string {
  const colors: Record<string, string> = {
    'rodrigo-radar': '#3b82f6',
    'ivan-instagram': '#ff4dca',
    'yuri-youtube': '#ff6b6b',
    'vera-veredito': '#22c55e',
    'tiago-trafego': '#f59e0b',
  }
  return colors[id] ?? '#9b59ff'
}

/** Status → label */
export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    idle: 'Aguardando',
    working: 'Trabalhando',
    delivering: 'Entregando',
    done: 'Concluído',
    checkpoint: 'Checkpoint',
    running: 'Rodando',
    completed: 'Completo',
  }
  return labels[status] ?? status
}
