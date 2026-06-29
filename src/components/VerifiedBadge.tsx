import { BadgeCheck } from 'lucide-react'

interface VerifiedBadgeProps {
  verified: boolean
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null
  return <BadgeCheck size={16} className="inline text-blue-600 ml-1 shrink-0" />
}
