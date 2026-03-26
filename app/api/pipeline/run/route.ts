import { NextRequest } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { squadCode } = await req.json()
  if (!squadCode) {
    return new Response('Missing squadCode', { status: 400 })
  }

  const agencyDir = path.join(process.cwd(), '..')

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

      proc.stdout.on('data', (chunk: Buffer) => {
        const lines = chunk.toString().split('\n')
        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const parsed = JSON.parse(line)
            if (parsed.type === 'assistant' && parsed.message?.content) {
              for (const block of parsed.message.content) {
                if (block.type === 'text' && block.text) {
                  send(block.text)
                }
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

      proc.on('close', (code) => {
        send(`\n\n✓ Pipeline finalizado (exit ${code})`)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, exitCode: code })}\n\n`))
        controller.close()
      })

      proc.on('error', (err) => {
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
