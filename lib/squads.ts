import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import type { Squad, Pipeline, AgentConfig, PipelineStep, OutputFile, ClientBrief } from './types'
import { stepLabel, stepNumber, isCheckpointStep } from './utils'

/** Absolute path to /Agency/squads/ */
const SQUADS_DIR = path.join(process.cwd(), '..', 'squads')

// ── Squad list ─────────────────────────────────────────────────────────────

export function listSquads(): Squad[] {
  if (!fs.existsSync(SQUADS_DIR)) return []

  const entries = fs.readdirSync(SQUADS_DIR, { withFileTypes: true })
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => loadSquad(e.name))
    .filter((s): s is Squad => s !== null)
}

export function loadSquad(code: string): Squad | null {
  const file = path.join(SQUADS_DIR, code, 'squad.yaml')
  if (!fs.existsSync(file)) return null
  try {
    const raw = fs.readFileSync(file, 'utf-8')
    const data = yaml.load(raw) as Record<string, unknown>
    return { ...data, code } as Squad
  } catch {
    return null
  }
}

// ── Pipeline ───────────────────────────────────────────────────────────────

export function loadPipeline(squadCode: string): Pipeline | null {
  const file = path.join(SQUADS_DIR, squadCode, 'pipeline', 'pipeline.yaml')
  if (!fs.existsSync(file)) return null
  try {
    const raw = fs.readFileSync(file, 'utf-8')
    return yaml.load(raw) as Pipeline
  } catch {
    return null
  }
}

export function getPipelineSteps(squadCode: string): PipelineStep[] {
  const pipeline = loadPipeline(squadCode)
  if (!pipeline) return []

  return pipeline.steps.map((filename) => ({
    filename,
    stepNumber: stepNumber(filename),
    label: stepLabel(filename),
    isCheckpoint: isCheckpointStep(filename),
  }))
}

// ── Agents ─────────────────────────────────────────────────────────────────

export function loadAgents(squadCode: string): AgentConfig[] {
  const squad = loadSquad(squadCode)
  if (!squad) return []

  return squad.agents
    .map((ref) => loadAgent(squadCode, ref.id, ref.name, ref.icon))
    .filter((a): a is AgentConfig => a !== null)
}

function loadAgent(
  squadCode: string,
  id: string,
  name: string,
  icon: string
): AgentConfig | null {
  const file = path.join(SQUADS_DIR, squadCode, 'agents', `${id}.agent.md`)
  if (!fs.existsSync(file)) {
    // Return minimal config from squad.yaml reference
    return { id, name, icon, role: '', summary: '', execution: 'inline' }
  }

  const content = fs.readFileSync(file, 'utf-8')
  const role = extractSection(content, 'Role') ?? ''
  const summary = role.split('\n')[0]?.trim() ?? ''
  const execution = extractExecution(content)
  const input = extractField(content, 'Input')
  const output = extractField(content, 'Output')

  return { id, name, icon, role: extractRoleTitle(content) ?? role, summary, execution, input, output }
}

// ── Outputs ────────────────────────────────────────────────────────────────

export function listOutputs(squadCode: string): OutputFile[] {
  const dir = path.join(SQUADS_DIR, squadCode, 'output')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith('.') && f.endsWith('.md'))
    .map((filename) => {
      const stat = fs.statSync(path.join(dir, filename))
      return {
        filename,
        sizeBytes: stat.size,
        modifiedAt: stat.mtime.toISOString(),
      }
    })
    .sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime())
}

export function readOutput(squadCode: string, filename: string): string | null {
  const file = path.join(SQUADS_DIR, squadCode, 'output', filename)
  if (!fs.existsSync(file)) return null
  return fs.readFileSync(file, 'utf-8')
}

// ── Client Brief ───────────────────────────────────────────────────────────

export function loadClientBrief(squadCode: string): ClientBrief | null {
  const dir = path.join(SQUADS_DIR, squadCode, 'pipeline', 'data')
  if (!fs.existsSync(dir)) return null

  // Find the client brief file
  const files = fs.readdirSync(dir).filter((f) => f.startsWith('client-brief'))
  if (files.length === 0) return null

  const raw = fs.readFileSync(path.join(dir, files[0]), 'utf-8')

  const clientName = extractMdField(raw, 'Quem é (.+)') ?? extractLine(raw, '# Client Brief:')?.replace('# Client Brief:', '').trim() ?? 'Cliente'
  const niche = extractInlineField(raw, 'Nicho') ?? ''
  const instagram = extractInlineField(raw, 'Instagram') ?? ''
  const youtube = extractInlineField(raw, 'YouTube') ?? ''
  const operator = extractInlineField(raw, 'Operador') ?? ''

  // Product
  const priceMatch = raw.match(/Preço:\s*(.+)/i)
  const product = {
    name: 'Mentoria Individual',
    price: priceMatch ? priceMatch[1].trim() : '',
  }

  // Goals
  const igGoal = raw.match(/Instagram:\s*([\d\w]+ seguidores[^)\n]*)/i)
  const ytGoal = raw.match(/YouTube:\s*([\d\w]+ inscritos[^)\n]*)/i)
  const goals = {
    instagram: igGoal ? igGoal[1].trim() : '500k seguidores',
    youtube: ytGoal ? ytGoal[1].trim() : '100k inscritos',
  }

  // Audience
  const audience: string[] = []
  const vendedorMatch = raw.match(/Vendedor Travado[^:]*:\*\*\s*(.+)/i)
  const aspiranteMatch = raw.match(/Aspirante[^:]*:\*\*\s*(.+)/i)
  if (vendedorMatch) audience.push(vendedorMatch[1].trim())
  if (aspiranteMatch) audience.push(aspiranteMatch[1].trim())

  // Pain points — lines after "Dores principais:"
  const painSection = raw.match(/Dores principais[^:]*:([\s\S]*?)(?=\n---|\n##)/i)
  const painPoints = painSection
    ? painSection[1].split('\n').filter((l) => l.trim().startsWith('-')).map((l) => l.replace(/^-\s*/, '').trim())
    : []

  // Cadência
  const cadenceMatch = raw.match(/Cadência[^:]*:\s*(.+)/i)
  const cadence = cadenceMatch ? cadenceMatch[1].trim() : ''

  // Método EGO
  const egoE = raw.match(/\*\*E\s*—[^:*]*:\*\*\s*(.+)/i)
  const egoG = raw.match(/\*\*G\s*—[^:*]*:\*\*\s*(.+)/i)
  const egoO = raw.match(/\*\*O\s*—[^:*]*:\*\*\s*(.+)/i)
  const egoMethod = {
    E: egoE ? egoE[1].trim() : '',
    G: egoG ? egoG[1].trim() : '',
    O: egoO ? egoO[1].trim() : '',
  }

  // Content pillars
  const pillarsSection = raw.match(/Pilares de Conteúdo[\s\S]*?\n((?:\|[^\n]+\n)+)/i)
  const contentPillars = pillarsSection
    ? pillarsSection[1].split('\n')
        .filter((l) => l.startsWith('|') && !l.includes('---') && !l.toLowerCase().includes('pilar'))
        .map((l) => l.split('|')[1]?.trim() ?? '')
        .filter(Boolean)
    : []

  return { clientName, niche, instagram, youtube, operator, product, goals, audience, painPoints, cadence, egoMethod, contentPillars }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function extractSection(md: string, heading: string): string | null {
  const re = new RegExp(`###\\s+${heading}\\s*\\n([\\s\\S]*?)(?=\\n###|\\n##|$)`, 'i')
  const m = md.match(re)
  return m ? m[1].trim() : null
}

function extractRoleTitle(md: string): string | null {
  // Look for "# AgentName — Title" pattern
  const m = md.match(/^#\s+.+?—\s+(.+)$/m)
  return m ? m[1].trim() : null
}

function extractExecution(md: string): string {
  const m = md.match(/\*\*Execution[^:]*:\*\*\s*(.+)/i)
  return m ? m[1].trim() : 'inline'
}

function extractField(md: string, field: string): string | undefined {
  const re = new RegExp(`\\*\\*${field}[^:]*:\\*\\*\\s*\`?([^\`\n]+)\`?`, 'i')
  const m = md.match(re)
  return m ? m[1].trim() : undefined
}

function extractMdField(md: string, pattern: string): string | null {
  const re = new RegExp(`## ${pattern}`, 'i')
  const m = md.match(re)
  if (!m) return null
  // Extract the capture group if present
  const groupMatch = md.match(new RegExp(`## ${pattern}`))
  return groupMatch ? groupMatch[1]?.trim() ?? null : null
}

function extractLine(md: string, prefix: string): string | null {
  const line = md.split('\n').find((l) => l.startsWith(prefix))
  return line ?? null
}

function extractInlineField(md: string, field: string): string | null {
  const re = new RegExp(`\\*\\*${field}[^:]*:\\*\\*\\s*@?([^\n]+)`, 'i')
  const m = md.match(re)
  if (!m) return null
  return m[1].trim().replace(/^@/, '')
}
