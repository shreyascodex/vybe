import { Link } from 'react-router-dom'
import type { Challenge } from '../../types'
import { useDemo } from '../../context/DemoContext'
import {
  checkInState,
  dayNumber,
  getStatus,
  nextCheckInLabel,
  requiredCheckIns,
  timeProgress,
} from '../../lib/challenge'
import { formatDate } from '../../lib/dates'
import ChallengeProgress from './ChallengeProgress'
import Icon from './Icon'
import StatusBadge from './StatusBadge'
import { btnPrimary, btnSecondary, card } from './styles'

interface ChallengeCardProps {
  challenge: Challenge
  variant: 'mine' | 'explore'
}

const toneStyles = {
  done: 'bg-volt/60 text-ink',
  due: 'bg-flare text-ink',
  idle: 'bg-sand text-ink/70',
}

export default function ChallengeCard({ challenge: c, variant }: ChallengeCardProps) {
  const { joinChallenge } = useDemo()
  const status = getStatus(c)
  const state = checkInState(c)
  const viewLink = `/app/challenges/${c.id}`

  return (
    <article className={`${card} flex flex-col p-5 transition-shadow hover:shadow-md sm:p-6`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/70">
          {c.category}
        </span>
        <StatusBadge status={status} />
        {c.visibility === 'private' && (
          <span className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/70">
            Private
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-bold leading-snug">{c.title}</h3>

      {variant === 'explore' && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/65">{c.description}</p>
      )}

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink/65">
        <li className="flex items-center gap-1.5">
          <Icon name="clock" className="size-4" />
          {c.durationDays} days
        </li>
        <li className="flex items-center gap-1.5">
          <Icon name="users" className="size-4" />
          {c.participants} {c.participants === 1 ? 'member' : 'members'}
        </li>
        {variant === 'explore' && (
          <li className="flex items-center gap-1.5">
            <Icon name="flag" className="size-4" />
            {status === 'upcoming'
              ? `Starts ${formatDate(c.startDate)}`
              : `Day ${dayNumber(c)} of ${c.durationDays}`}
          </li>
        )}
      </ul>

      {variant === 'mine' && (
        <div className="mt-5 space-y-4">
          <ChallengeProgress
            percent={timeProgress(c)}
            label={status === 'upcoming' ? 'Not started' : `Day ${dayNumber(c)} of ${c.durationDays}`}
            detail={`${c.myCheckIns} of ${requiredCheckIns(c)} check-ins`}
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneStyles[state.tone]}`}>
              {state.label}
            </span>
            <span className="text-xs text-ink/60">{nextCheckInLabel(c)}</span>
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {variant === 'explore' ? (
          <>
            {c.joined ? (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-volt/60 px-5 text-sm font-semibold">
                <Icon name="check" className="size-4" />
                Joined
              </span>
            ) : (
              <button type="button" className={btnPrimary} onClick={() => joinChallenge(c.id)}>
                Join challenge
              </button>
            )}
            <Link to={viewLink} className={btnSecondary}>
              View
            </Link>
          </>
        ) : (
          <Link to={viewLink} className={btnPrimary}>
            View challenge
          </Link>
        )}
      </div>
    </article>
  )
}
