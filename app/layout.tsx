import './globals.css'
import Link from 'next/link'
import NotificationBell from '@/components/NotificationBell'

export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return (
    <html lang="hr">
      <body>
        <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Link className="font-semibold" href="/">Marisha Studio</Link>
              <nav className="flex items-center gap-4 text-sm">
                <Link className="link" href="/tasks">Zadaci</Link>
                <Link className="link" href="/admin/services">Admin: Usluge</Link>
              </nav>
            </div>
            <NotificationBell />
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  )
}
