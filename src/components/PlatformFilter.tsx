import { Search, Camera, Play, Music2 } from 'lucide-react'
import type { Platform } from '@/types'
import { PLATFORMS, getPlatformLabel } from '@/utils/dataHelpers'

const platformIcons: Record<Platform, React.ReactNode> = {
  instagram: <Camera size={16} className="inline mr-1.5 shrink-0" />,
  youtube: <Play size={16} className="inline mr-1.5 shrink-0" />,
  tiktok: <Music2 size={16} className="inline mr-1.5 shrink-0" />,
}

interface PlatformFilterProps {
  selected: Platform
  onChange: (platform: Platform) => void
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1 flex sm:inline-flex mb-4">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
              selected === p
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {platformIcons[p]}
            <span>{getPlatformLabel(p)}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search creators by name or username..."
          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pl-9 bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  )
}
