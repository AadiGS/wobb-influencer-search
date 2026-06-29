import { useState, useMemo } from 'react'
import type { Platform } from '@/types'
import { Layout } from '@/components/Layout'
import { PlatformFilter } from '@/components/PlatformFilter'
import ProfileList from '@/components/ProfileList'
import { extractProfiles, filterProfiles } from '@/utils/dataHelpers'

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [searchQuery, setSearchQuery] = useState('')

  const allProfiles = useMemo(() => extractProfiles(platform), [platform])
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  )

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Discover Creators</h1>
        <p className="text-slate-500 text-sm mt-1">
          Find and shortlist the perfect influencers for your campaigns
        </p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p)
          setSearchQuery('')
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-sm text-slate-500 mb-4">
        Showing {filtered.length} of {allProfiles.length} creators on {platform}
      </p>

      <ProfileList profiles={filtered} platform={platform} />
    </Layout>
  )
}
