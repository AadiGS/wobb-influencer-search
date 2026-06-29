import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Platform } from '@/types'
import { Layout } from '@/components/Layout'
import { PlatformFilter } from '@/components/PlatformFilter'
import ProfileList from '@/components/ProfileList'
import { extractProfiles, filterProfiles } from '@/utils/dataHelpers'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const platform = (searchParams.get('platform') as Platform) || 'instagram'
  const [searchQuery, setSearchQuery] = useState('')

  const allProfiles = useMemo(() => extractProfiles(platform), [platform])
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  )

  function handlePlatformChange(p: Platform) {
    setSearchParams({ platform: p })
    setSearchQuery('')
  }

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
        onChange={handlePlatformChange}
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
