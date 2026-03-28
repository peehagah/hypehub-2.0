import { NextRequest } from 'next/server'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { supabaseAdmin, hasSupabase } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function resolveAgencyDir() {
  return path.join(process.cwd(), '..')
}

/** Push state.json content to Supabase */
async function syncState(squadCode: string, raw: string) {
  if (!hasSupabase || !supabaseAdmin) return
  try {
    const state = JSON.parse(raw)
    await supabaseAdmin
      .from('pipeline_states')
      .upsert({ squad_code: squadCode, state, updated_at: new Date().toISOString() })
  } catch { /* ignore parse errors */ }
}

/** Upload all .md files from output dir to Supabase */
async function syncOutputs(squadCode: string, agencyDir: string) {
  if (!hasSupabase || !supabaseAdmin) return
  const outputDir = path.join(agencyDir, 'squads', squadCode, 'output')
  if (!fs.existsSync(outputDir)) return

  const files: Array<{ filepath: string; content: string; size: number }> = []

  function walk(dir: string, relBase: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue
      const full = path.join(dir, entry.name)
      const rel = relBase ? `${relBase}/${entry.name}` : entry.name
      if (entry.isDirectory()) {
        walk(full, rel)
      } else if (entry.name.endsWith('.md')) {
        const content = fs.readFileSync(full, 'utf-8')
        files.push({ filepath: rel, content, size: Buffer.byteLength(content, 'utf-8') })
      }
    }
  }

  walk(outputDir, '')

  for (const file of files) {
    await supabaseAdmin
      .from('pipeline_outputs')
      .upsert({
        squad_code: squadCode,
        filepath: file.filepath,
        content: file.content,
        size_bytes: file.size,
        created_at: new Date().toISOString(),
      }, { onConflict: 'squad_code,filepath' })
  }
}

export async function POST(req: NextRequest) {
  const { squadCode } = await req.json()
  if (!squadCode) {
    return new Response('Missing squadCode', { status: 400 })
  }

  const agencyDir = resolveAgencyDir()
  const stateFile = path.join(agencyDir, 'squads', squadCode, 'state.json')
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: data })}\n\n`))
      }

      send(`Iniciando pipeline: ${squadCode}\n`)
      send(`Diretório: ${agencyDir}\n\n`)

      const proc = spawn(
        'claude',
        ['-p', `/opensquad run ${squadCode}`, '--output-format', 'stream-json', '--verbose'],
        {
          cwd: agencyDir,
          env: { ...process.env },
          stdio: ['pipe', 'pipe', 'pipe'],
        }
      )

      // ── State.json polling → Supabase ──────────────────────────────────────
      let lastStateStr = ''
      const stateInterval = setInterval(async () => {
        if (!fs.existsSync(stateFile)) return
        try {
          const raw = fs.readFileSync(stateFile, 'utf-8')
          if (raw === lastStateStr) return
          lastStateStr = raw
          await syncState(squadCode, raw)
        } catch { /* ignore */ }
      }, 1000)

      proc.stdout.on('data', (chunk: Buffer) => {
        const lines = chunk.toString().split('\n')
        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const parsed = JSON.parse(line)
            if (parsed.type === 'assistant' && parsed.message?.content) {
              for (const block of parsed.message.content) {
                if (block.type === 'text' && block.text) send(block.text)
              }
            } else if (parsed.type === 'result' && parsed.result) {
              send(parsed.result)
            }
          } catch {
            if (line.trim()) send(line + '\n')
          }
        }
      })

      proc.stderr.on('data', (chunk: Buffer) => {
        send(`[stderr] ${chunk.toString()}`)
      })

      proc.on('close', async (code) => {
        clearInterval(stateInterval)

        // Final state sync
        if (fs.existsSync(stateFile)) {
          await syncState(squadCode, fs.readFileSync(stateFile, 'utf-8'))
        }

        // Upload all outputs to Supabase
        send(`\nSincronizando outputs...\n`)
        await syncOutputs(squadCode, agencyDir)

        send(`\n\n✓ Pipeline finalizado (exit ${code})`)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, exitCode: code })}\n\n`))
        controller.close()
      })

      proc.on('error', (err) => {
        clearInterval(stateInterval)
        send(`\n✗ Erro ao iniciar processo: ${err.message}`)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, error: err.message })}\n\n`))
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
