import type { ChallengeStatus } from '../../types'

const styles: Record<ChallengeStatus, string> = {
  active: 'bg-volt text-ink',
  upcoming: 'bg-sand text-ink',
  completed: 'bg-ink text-paper',
}

const labels: Record<ChallengeStatus, string> = {
  active: 'Active',
  upcoming: 'Upcoming',
  completed: 'Completed',
}

export default function StatusBadge({ status }: { status: ChallengeStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
