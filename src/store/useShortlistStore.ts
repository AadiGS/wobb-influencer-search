import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserProfileSummary, Platform, ShortlistItem } from '@/types'

interface ShortlistStore {
  items: ShortlistItem[]
  addToShortlist(profile: UserProfileSummary, platform: Platform): void
  removeFromShortlist(userId: string): void
  clearShortlist(): void
  isInShortlist(userId: string): boolean
}

const useShortlistStore = create<ShortlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToShortlist(profile, platform) {
        if (get().items.some(i => i.user_id === profile.user_id)) return
        set(state => ({
          items: [...state.items, { ...profile, platform, addedAt: new Date().toISOString() }],
        }))
      },

      removeFromShortlist(userId) {
        set(state => ({
          items: state.items.filter(i => i.user_id !== userId),
        }))
      },

      clearShortlist() {
        set({ items: [] })
      },

      isInShortlist(userId) {
        return get().items.some(i => i.user_id === userId)
      },
    }),
    {
      name: 'wobb-shortlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useShortlistStore
