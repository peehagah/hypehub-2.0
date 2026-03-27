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
    <html lang="pt-BR" className="dark">
      <body className="flex h-screen overflow-hidden text-white antialiased selection:bg-purple-500/30">
        {/* Version ID to verify code refresh */}
        <div className="fixed top-2 left-20 z-[9999] bg-purple-600 text-[8px] font-black px-2 py-0.5 rounded text-white shadow-lg pointer-events-none uppercase tracking-widest animate-pulse">
           v2.0 - GLASS - {new Date().toLocaleTimeString()}
        </div>
        
        <Sidebar squads={squads} />
        <main className="flex-1 overflow-y-auto scroll-smooth relative z-0">
          {children}
        </main>
      </body>
    </html>
  )
}
