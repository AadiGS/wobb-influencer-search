import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-[#1E1B4B] text-white px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
            <span className="font-bold text-white text-sm">W</span>
          </div>
          <span className="font-bold text-xl ml-2">wobb</span>
        </div>
        <span className="text-blue-300 text-sm">Influencer Discovery</span>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
