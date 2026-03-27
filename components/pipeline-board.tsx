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
    <div className="glass-panel p-6 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
      <div className="flex items-center gap-3 mb-6">
        <GitBranch size={18} className="text-purple-400" />
        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Fluxo Operacional</h3>
        <span className="ml-auto text-[10px] font-black text-slate-500 uppercase tracking-widest">{totalSteps} STAGES</span>
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
                'flex items-center gap-4 px-4 py-3 rounded-2xl border transition-all duration-300',
                step.isCheckpoint
                  ? isDone
                    ? 'border-purple-500/20 bg-purple-500/5'
                    : isActive
                    ? 'border-orange-500/30 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
                    : 'border-white/5 bg-white/[0.02]'
                  : isDone
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : isActive
                  ? 'border-purple-500/30 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                  : 'border-white/5 bg-white/[0.02]'
              )}
            >
              {/* Step icon */}
              <div className="flex-shrink-0">
                {step.isCheckpoint ? (
                  <CircleDot
                    size={16}
                    className={cn(
                      isDone ? 'text-purple-400' : isActive ? 'text-orange-400 animate-pulse' : 'text-slate-700'
                    )}
                  />
                ) : isDone ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : isActive ? (
                  <Loader2 size={16} className="text-purple-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-800" />
                )}
              </div>

              {/* Step number */}
              <span
                className={cn(
                  'text-[10px] font-black w-6 flex-shrink-0 tracking-tighter',
                  isDone ? 'text-emerald-500' : isActive ? 'text-purple-400' : 'text-slate-700'
                )}
              >
                {String(step.stepNumber).padStart(2, '0')}
              </span>

              {/* Label */}
              <span
                className={cn(
                  'text-[11px] font-bold flex-1 truncate uppercase tracking-tight',
                  isDone
                    ? 'text-slate-500 line-through decoration-slate-700'
                    : isActive
                    ? 'text-white'
                    : 'text-slate-600'
                )}
              >
                {step.label}
              </span>

              {/* Status Badge */}
              {isActive && (
                 <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-purple-500 text-white animate-pulse uppercase tracking-widest">
                    ACTIVE
                 </span>
              )}
              
              {step.isCheckpoint && !isDone && (
                <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                  CHECKPOINT
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Footer */}
      {runState && (
        <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <span className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  runState.status === 'running' ? "bg-emerald-500" : "bg-orange-500"
               )}></span>
               <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">
                  {runState.status === 'running' ? 'Executando Pipeline' : 'Aguardando Checkpoint'}
               </p>
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
               {currentStep} / {totalSteps} COMPLETO
            </span>
          </div>
          
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden p-[1px] border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-700 ease-out"
              style={{ width: `${Math.round((currentStep / totalSteps) * 100)}%` }}
            />
          </div>
          
          {runState.step?.label && (
             <p className="text-[9px] font-bold text-slate-500 italic text-right uppercase tracking-tighter">
                Log: {runState.step.label}
             </p>
          )}
        </div>
      )}
    </div>
  )
}
