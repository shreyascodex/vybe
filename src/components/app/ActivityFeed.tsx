import type { Activity, ActivityKind } from '../../types'
import { timeAgo } from '../../lib/dates'

const dots: Record<ActivityKind, string> = {
  proof: 'bg-volt',
  checkin: 'bg-ink',
  milestone: 'bg-flare',
  join: 'bg-sand border border-ink/20',
  create: 'bg-volt',
}

interface ActivityFeedProps {
  items: Activity[]
  limit?: number
}

export default function ActivityFeed({ items, limit = 6 }: ActivityFeedProps) {
  const shown = items.slice(0, limit)
  return (
    <ul className="space-y-4">
      {shown.map((item) => (
        <li key={item.id} className="flex gap-3">
          <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${dots[item.kind]}`} aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm leading-snug">
              <strong className="font-semibold">{item.actor}</strong> {item.text}
            </p>
            <p className="mt-0.5 text-xs text-ink/50">{timeAgo(item.at)}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
