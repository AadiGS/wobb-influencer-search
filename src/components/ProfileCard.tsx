import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import type { Platform, UserProfileSummary } from '@/types'
import { VerifiedBadge } from './VerifiedBadge'
import { formatFollowers, formatEngagementRate } from '@/utils/formatters'
import useShortlistStore from '@/store/useShortlistStore'

interface ProfileCardProps {
  profile: UserProfileSummary
  platform: Platform
}

const platformBadge: Record<Platform, string> = {
  instagram: 'bg-pink-100 text-pink-700',
  youtube: 'bg-red-100 text-red-700',
  tiktok: 'bg-slate-100 text-slate-700',
}

const platformLabel: Record<Platform, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

function ProfileCard({ profile, platform }: ProfileCardProps) {
  const navigate = useNavigate()
  const { addToShortlist, isInShortlist } = useShortlistStore()
  const inShortlist = isInShortlist(profile.user_id)

  return (
    <tr
      onClick={() => navigate(`/profile/${profile.username}?platform=${platform}`)}
      className="cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={profile.picture}
            alt={profile.fullname}
            className="w-11 h-11 rounded-full object-cover shrink-0"
          />
          <div>
            <div className="font-medium text-slate-900 text-sm flex items-center">
              {profile.fullname}
              <VerifiedBadge verified={profile.is_verified} />
            </div>
            <div className="text-slate-500 text-xs">@{profile.username}</div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${platformBadge[platform]}`}>
          {platformLabel[platform]}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-slate-900 font-medium">
        {formatFollowers(profile.followers)}
      </td>

      <td className="px-4 py-3 text-sm text-slate-900">
        {formatEngagementRate(profile.engagement_rate)}
      </td>

      <td className="px-4 py-3">
        {inShortlist ? (
          <button
            disabled
            className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 border border-green-200 rounded-lg px-3 py-1.5 text-sm cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Check size={16} />
            Added
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white rounded-lg px-3 py-1.5 text-sm hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              addToShortlist(profile, platform)
            }}
          >
            + Add
          </button>
        )}
      </td>
    </tr>
  )
}

export default memo(ProfileCard)
