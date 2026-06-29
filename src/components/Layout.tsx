import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white px-4 sm:px-6 py-4 shadow-sm border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/wobb logo.png" alt="Wobb" className="h-8 w-auto object-contain" />
        </div>
        <span className="text-slate-400 text-xs sm:text-sm">Influencer Discovery</span>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  )
}
