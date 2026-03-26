import { CheckCircle2, GitBranch, CircleDot, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PipelineStep, SquadRunState } from '@/lib/types'

interface PipelineBoardProps {
  steps: PipelineStep[]
  runState?: SquadRunState | null
}

export function PipelineBoard({ steps, runState }: PipelineBoardProps) {
  const currentStep = runState?.step?.current ?? 0
  const totalSteps = steps.length

  return (
    <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d2e] p-5">
      <div className="flex items-center gap-2 mb-5">
        <GitBranch size={16} className="text-slate-400" />
        <h3 className="text-sm font-semibold text-white">Pipeline</h3>
        <span className="ml-auto text-xs text-slate-500">{totalSteps} steps</span>
        {runState && (
          <span
            className={cn(
              'text-[10px] font-semibold px-2 py-0.5 rounded-full',
              runState.status === 'running'
                ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                : runState.status === 'checkpoint'
                ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20'
                : runState.status === 'completed'
                ? 'bg-coral/15 text-coral border border-coral/20'
                : 'bg-[#2a2d3e] text-slate-500'
            )}
          >
            {runState.status === 'running'
              ? 'Rodando'
              : runState.status === 'checkpoint'
              ? '⚡ Checkpoint'
              : runState.status === 'completed'
              ? 'Completo'
              : 'Aguardando'}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {steps.map((step, idx) => {
          const stepIdx = idx + 1
          const isDone = runState ? stepIdx < currentStep : false
          const isActive = runState ? stepIdx === currentStep : false
          const isPending = runState ? stepIdx > currentStep : true

          return (
            <div
              key={step.filename}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors',
                step.isCheckpoint
                  ? isDone
                    ? 'border-coral/20 bg-coral/5'
                    : isActive
                    ? 'border-yellow-500/30 bg-yellow-500/10'
                    : 'border-[#2a2d3e] bg-[#0f1117]'
                  : isDone
                  ? 'border-green-500/20 bg-green-500/5'
                  : isActive
                  ? 'border-coral/30 bg-coral/8'
                  : 'border-[#2a2d3e] bg-[#0f1117]'
              )}
            >
              {/* Step icon */}
              <div className="flex-shrink-0">
                {step.isCheckpoint ? (
                  <CircleDot
                    size={14}
                    className={cn(
                      isDone ? 'text-coral' : isActive ? 'text-yellow-400' : 'text-slate-600'
                    )}
                  />
                ) : isDone ? (
                  <CheckCircle2 size={14} className="text-green-400" />
                ) : isActive ? (
                  <Loader2 size={14} className="text-coral animate-spin" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                )}
              </div>

              {/* Step number */}
              <span
                className={cn(
                  'text-[10px] font-mono font-semibold w-6 flex-shrink-0',
                  isDone ? 'text-green-500' : isActive ? 'text-coral' : 'text-slate-600'
                )}
              >
                {String(step.stepNumber).padStart(2, '0')}
              </span>

              {/* Label */}
              <span
                className={cn(
                  'text-xs flex-1 truncate',
                  isDone
                    ? 'text-slate-400'
                    : isActive
                    ? 'text-white font-medium'
                    : 'text-slate-500'
                )}
              >
                {step.label}
              </span>

              {/* Checkpoint badge */}
              {step.isCheckpoint && (
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-500 border border-yellow-500/20 flex-shrink-0">
                  CHECKPOINT
                </span>
              )}

              {/* Active step label from runState */}
              {isActive && runState?.step?.label && (
                <span className="text-[10px] text-coral/70 flex-shrink-0 truncate max-w-[120px]">
                  {runState.step.label}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar when running */}
      {runState && runState.status === 'running' && totalSteps > 0 && (
        <div className="mt-4 pt-4 border-t border-[#2a2d3e]">
          <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
            <span>Progresso</span>
            <span>{currentStep}/{totalSteps} steps</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#2a2d3e] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-brand transition-all duration-500"
              style={{ width: `${Math.round((currentStep / totalSteps) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
