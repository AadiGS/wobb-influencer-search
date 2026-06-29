import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { VerifiedBadge } from '@/components/VerifiedBadge'
import { Avatar } from '@/components/Avatar'
import type { FullUserProfile, Platform, ProfileDetailResponse, UserProfileSummary } from '@/types'
import { formatFollowers, formatEngagementRate } from '@/utils/formatters'
import { loadProfileByUsername } from '@/utils/profileLoader'
import { extractProfiles } from '@/utils/dataHelpers'
import useShortlistStore from '@/store/useShortlistStore'

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

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const platform = searchParams.get('platform') || 'instagram'

  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null)
  const [fallback, setFallback] = useState<UserProfileSummary | null>(null)
  const [loaded, setLoaded] = useState(false)

  const { addToShortlist, isInShortlist } = useShortlistStore()

  useEffect(() => {
    if (!username) return
    loadProfileByUsername(username).then((data) => {
      if (data) {
        setProfileData(data)
      } else {
        // No detailed JSON — fall back to search-data summary
        const profiles = extractProfiles(platform as Platform)
        const found = profiles.find((p) => p.username === username) ?? null
        setFallback(found)
      }
      setLoaded(true)
    })
  }, [username, platform])

  if (!username) {
    return (
      <Layout>
        <p className="text-slate-500">Invalid profile</p>
      </Layout>
    )
  }

  if (!loaded) {
    return (
      <Layout>
        <p className="text-slate-400">Loading...</p>
      </Layout>
    )
  }

  // Merge: prefer detailed JSON, otherwise use search summary cast to FullUserProfile
  const user: FullUserProfile = profileData
    ? profileData.data.user_profile
    : (fallback as FullUserProfile)

  if (!user) {
    return (
      <Layout>
        <p className="text-red-600 mb-4">Profile not found for @{username}</p>
        <button onClick={() => navigate('/')} className="text-blue-600 underline text-sm">
          Back to search
        </button>
      </Layout>
    )
  }

  const inShortlist = isInShortlist(user.user_id)

  const stats: { label: string; value: string | number | undefined }[] = [
    { label: 'Followers', value: formatFollowers(user.followers) },
    { label: 'Engagement Rate', value: formatEngagementRate(user.engagement_rate) },
    ...(user.engagements !== undefined ? [{ label: 'Engagements', value: formatFollowers(user.engagements) }] : []),
    ...(user.posts_count !== undefined ? [{ label: 'Posts', value: user.posts_count }] : []),
    ...(user.avg_likes !== undefined ? [{ label: 'Avg Likes', value: formatFollowers(user.avg_likes) }] : []),
    ...(user.avg_comments !== undefined ? [{ label: 'Avg Comments', value: user.avg_comments }] : []),
    ...(user.avg_views !== undefined && user.avg_views > 0
      ? [{ label: 'Avg Views', value: formatFollowers(user.avg_views) }]
      : []),
  ]

  return (
    <Layout>
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 hover:gap-2 transition-all text-blue-600 text-sm mb-6 cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to search
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
          <Avatar
            src={user.picture}
            alt={user.fullname}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-slate-200 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{user.fullname}</h2>
              <VerifiedBadge verified={user.is_verified} />
            </div>
            <p className="text-slate-500 text-sm mt-0.5">@{user.username}</p>
            {platformBadge[platform] && (
              <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${platformBadge[platform]}`}>
                {platformLabel[platform]}
              </span>
            )}
            {user.description && (
              <p className="text-slate-600 text-sm mt-2">{user.description}</p>
            )}

            <div className="mt-4 flex items-center justify-center sm:justify-start gap-3 flex-wrap">
              {inShortlist ? (
                <button
                  disabled
                  className="w-full sm:w-auto bg-green-50 text-green-700 border border-green-200 rounded-lg px-4 py-2 text-sm cursor-default"
                >
                  ✓ Added to Shortlist
                </button>
              ) : (
                <button
                  onClick={() => addToShortlist(user, platform as Platform)}
                  className="w-full sm:w-auto bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition-colors"
                >
                  + Add to Shortlist
                </button>
              )}

              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 text-sm hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                  View on {platformLabel[platform] ?? platform}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
