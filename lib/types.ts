// ── Client Brief ──────────────────────────────────────────────────────────

export interface ClientBrief {
  clientName: string
  niche: string
  instagram: string
  youtube: string
  operator: string
  product: { name: string; price: string }
  goals: { instagram: string; youtube: string }
  audience: string[]
  painPoints: string[]
  cadence: string
  egoMethod: {
    E: string
    G: string
    O: string
  }
  contentPillars: string[]
}

// ── Squad (from squad.yaml) ────────────────────────────────────────────────

export interface SquadAgentRef {
  id: string
  name: string
  icon: string
}

export interface Squad {
  code: string
  name: string
  description: string
  icon: string
  version: string
  mode: string
  agents: SquadAgentRef[]
  skills: string[]
  data: string[]
  investigation?: { enriched: boolean; notes?: string }
}

// ── Pipeline (from pipeline/pipeline.yaml) ─────────────────────────────────

export interface Pipeline {
  name: string
  version: string
  steps: string[]
  checkpoints: string[]
  on_reject?: Record<string, string[]>
}

export interface PipelineStep {
  filename: string
  stepNumber: number
  label: string
  isCheckpoint: boolean
}

// ── Agent config (from agents/*.agent.md) ─────────────────────────────────

export interface AgentConfig {
  id: string
  name: string
  icon: string
  role: string
  /** Short summary extracted from the Role section */
  summary: string
  execution: string
  /** Input → Output description */
  input?: string
  output?: string
}

// ── Output files (from output/) ────────────────────────────────────────────

export interface OutputFile {
  filename: string
  sizeBytes: number
  modifiedAt: string
}

// ── WebSocket real-time state (matches Pipeline Runner) ────────────────────

export type AgentStatus = 'idle' | 'working' | 'delivering' | 'done' | 'checkpoint'
export type SquadRunStatus = 'idle' | 'running' | 'completed' | 'checkpoint'

export interface AgentRunState {
  id: string
  name: string
  icon: string
  status: AgentStatus
  deliverTo: string | null
}

export interface Handoff {
  from: string
  to: string
  message: string
  completedAt: string
}

export interface SquadRunState {
  squad: string
  status: SquadRunStatus
  step: { current: number; total: number; label: string }
  agents: AgentRunState[]
  handoff: Handoff | null
  startedAt: string | null
  updatedAt: string
}

export interface SquadInfo {
  code: string
  name: string
  description: string
  icon: string
  agents: string[]
}

export type WsMessage =
  | { type: 'SNAPSHOT'; squads: SquadInfo[]; activeStates: Record<string, SquadRunState> }
  | { type: 'SQUAD_ACTIVE'; squad: string; state: SquadRunState }
  | { type: 'SQUAD_UPDATE'; squad: string; state: SquadRunState }
  | { type: 'SQUAD_INACTIVE'; squad: string }
