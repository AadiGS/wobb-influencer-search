import { useState } from 'react'

const COLORS = [
  '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444',
  '#F97316', '#10B981', '#06B6D4', '#6366F1',
]

function colorFor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return COLORS[Math.abs(hash) % COLORS.length]
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

interface AvatarProps {
  src: string
  alt: string
  className?: string
}

export function Avatar({ src, alt, className = '' }: AvatarProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`${className} flex items-center justify-center text-white font-semibold text-sm shrink-0`}
        style={{ backgroundColor: colorFor(alt) }}
        aria-label={alt}
      >
        {initials(alt)}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
