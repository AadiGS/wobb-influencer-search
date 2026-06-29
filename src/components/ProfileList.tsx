import { memo } from 'react'
import { Search } from 'lucide-react'
import type { Platform, UserProfileSummary } from '@/types'
import ProfileCard from './ProfileCard'

interface ProfileListProps {
  profiles: UserProfileSummary[]
  platform: Platform
}

function ProfileList({ profiles, platform }: ProfileListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {['Creator', 'Platform', 'Followers', 'Eng. Rate', 'Action'].map((h) => (
              <th
                key={h}
                className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {profiles.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Search size={32} className="text-slate-300" />
                  <p className="text-slate-500">No creators found</p>
                </div>
              </td>
            </tr>
          ) : (
            profiles.map((profile) => (
              <ProfileCard key={profile.user_id} profile={profile} platform={platform} />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default memo(ProfileList)
