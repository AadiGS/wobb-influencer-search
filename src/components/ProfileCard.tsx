import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import type { Platform, UserProfileSummary } from '@/types'
import { VerifiedBadge } from './VerifiedBadge'
import { Avatar } from './Avatar'
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
      {/* Creator cell */}
      <td className="px-3 sm:px-4 py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar
            src={profile.picture}
            alt={profile.fullname}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <div className="font-medium text-slate-900 text-sm flex items-center flex-wrap gap-x-0.5 leading-snug">
              <span className="truncate max-w-[120px] sm:max-w-none">{profile.fullname}</span>
              <VerifiedBadge verified={profile.is_verified} />
            </div>
            <div className="text-slate-500 text-xs truncate">@{profile.username}</div>
            {/* Platform badge — visible on mobile only */}
            <span className={`sm:hidden mt-1 inline-block text-xs px-1.5 py-0.5 rounded-full font-medium ${platformBadge[platform]}`}>
              {platformLabel[platform]}
            </span>
          </div>
        </div>
      </td>

      {/* Platform — hidden on mobile */}
      <td className="hidden sm:table-cell px-4 py-3">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${platformBadge[platform]}`}>
          {platformLabel[platform]}
        </span>
      </td>

      {/* Followers */}
      <td className="px-3 sm:px-4 py-3 text-sm text-slate-900 font-medium whitespace-nowrap">
        {formatFollowers(profile.followers)}
      </td>

      {/* Eng. Rate — hidden on mobile */}
      <td className="hidden sm:table-cell px-4 py-3 text-sm text-slate-900 whitespace-nowrap">
        {formatEngagementRate(profile.engagement_rate)}
      </td>

      {/* Action */}
      <td className="px-3 sm:px-4 py-3 text-right sm:text-left">
        {inShortlist ? (
          <button
            disabled
            className="inline-flex items-center gap-1 sm:gap-1.5 bg-green-50 text-green-600 border border-green-200 rounded-lg px-2 sm:px-3 py-1.5 text-xs sm:text-sm cursor-default whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            <Check size={14} />
            <span className="hidden sm:inline">Added</span>
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white rounded-lg px-2 sm:px-3 py-1.5 text-xs sm:text-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
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
