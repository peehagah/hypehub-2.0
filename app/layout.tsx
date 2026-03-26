import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { listSquads } from '@/lib/squads'

export const metadata: Metadata = {
  title: 'Opensquad Dashboard',
  description: 'Multi-agent pipeline management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const squads = listSquads()

  return (
    <html lang="pt-BR">
      <body className="flex h-screen overflow-hidden bg-background text-slate-200">
        <Sidebar squads={squads} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  )
}
