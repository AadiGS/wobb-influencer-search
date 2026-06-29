import { memo } from 'react'
import { Search } from 'lucide-react'
import type { Platform, UserProfileSummary } from '@/types'
import ProfileCard from './ProfileCard'

interface ProfileListProps {
  profiles: UserProfileSummary[]
  platform: Platform
}

const headers = [
  { label: 'Creator',    className: 'w-[55%] sm:w-[40%]' },
  { label: 'Platform',  className: 'hidden sm:table-cell sm:w-[15%]' },
  { label: 'Followers', className: 'w-[25%] sm:w-[15%]' },
  { label: 'Eng. Rate', className: 'hidden sm:table-cell sm:w-[15%]' },
  { label: 'Action',    className: 'w-[20%] sm:w-[15%] text-right sm:text-left' },
]

function ProfileList({ profiles, platform }: ProfileListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full table-fixed">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {headers.map((h) => (
                <th
                  key={h.label}
                  className={`text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 sm:px-4 py-3 ${h.className}`}
                >
                  {h.label}
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
