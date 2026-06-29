import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useShortlistStore from '@/store/useShortlistStore'
import { ListChecks, X, Users } from 'lucide-react'

const platformBadge: Record<string, string> = {
  instagram: 'bg-pink-100 text-pink-700',
  youtube: 'bg-red-100 text-red-700',
  tiktok: 'bg-slate-100 text-slate-700',
}

const platformLabel: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

export default function ShortlistDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { items, removeFromShortlist, clearShortlist } = useShortlistStore()

  const drawerRef = useRef<HTMLDivElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        drawerRef.current && !drawerRef.current.contains(target) &&
        fabRef.current && !fabRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      {/* FAB */}
      <button
        ref={fabRef}
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 relative w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center"
        aria-label="Open shortlist"
      >
        <ListChecks size={24} />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
            {items.length}
          </span>
        )}
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-96 max-h-[70vh] rounded-2xl bg-white shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-40"
          >
            {/* Drag handle */}
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-0 cursor-grab" />

            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-semibold text-slate-900">My Shortlist</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-2">
                  {items.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {items.length > 0 && (
                  <button
                    onClick={clearShortlist}
                    className="text-xs text-red-500 hover:text-red-700 mr-3"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Users size={32} className="text-slate-300" />
                  <p className="text-sm text-slate-500">No creators shortlisted yet</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.user_id}
                    className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                  >
                    <img
                      src={item.picture}
                      alt={item.fullname}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <button
                        className="text-sm font-medium text-slate-900 truncate block w-full text-left hover:text-blue-600 transition-colors"
                        onClick={() => {
                          navigate(`/profile/${item.username}?platform=${item.platform}`)
                          setIsOpen(false)
                        }}
                      >
                        {item.fullname}
                      </button>
                      <p className="text-xs text-slate-500 truncate">@{item.username}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${platformBadge[item.platform] ?? 'bg-slate-100 text-slate-700'}`}>
                      {platformLabel[item.platform] ?? item.platform}
                    </span>
                    <button
                      onClick={() => removeFromShortlist(item.user_id)}
                      className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                      aria-label={`Remove ${item.fullname}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
