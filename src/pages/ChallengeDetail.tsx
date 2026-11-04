import { Link, useParams } from 'react-router-dom'
import Avatar from '../components/app/Avatar'
import ChallengeProgress from '../components/app/ChallengeProgress'
import CheckInForm from '../components/app/CheckInForm'
import EmptyState from '../components/app/EmptyState'
import Icon from '../components/app/Icon'
import ReceiptTile from '../components/app/ReceiptTile'
import StatusBadge from '../components/app/StatusBadge'
import { btnPrimary, btnSecondary, card } from '../components/app/styles'
import { useDemo } from '../context/DemoContext'
import {
  canCheckIn,
  checkInState,
  dayNumber,
  endDate,
  getStatus,
  leaderboard,
  nextCheckInLabel,
  requiredCheckIns,
  timeProgress,
} from '../lib/challenge'
import { formatDate } from '../lib/dates'
import { usePageTitle } from '../lib/usePageTitle'

export default function ChallengeDetail() {
  const { id } = useParams()
  const { challenges, joinChallenge } = useDemo()
  const c = challenges.find((x) => x.id === id)
  usePageTitle(c ? c.title : 'Challenge not found')

  if (!c) {
    return (
      <EmptyState
        title="Challenge not found"
        text="It may have been removed, or demo data was reset when the page refreshed."
        action={
          <Link to="/app/challenges" className={btnPrimary}>
            Back to my challenges
          </Link>
        }
      />
    )
  }

  const status = getStatus(c)
  const state = checkInState(c)
  const board = leaderboard(c)
  const pointsBased = c.scoring === 'Points-based'

  const details: [string, string][] = [
    ['Visibility', c.visibility === 'public' ? 'Public' : 'Private'],
    ['Check-in frequency', c.frequency],
    ['Proof type', c.proofType],
    ['Scoring', c.scoring],
    ['Starts', formatDate(c.startDate)],
    ['Ends', formatDate(endDate(c))],
    ['Check-ins needed', String(requiredCheckIns(c))],
  ]

  return (
    <div className="space-y-6">
      <Link to="/app/challenges" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/65 hover:text-ink">
        <Icon name="back" className="size-4" />
        My challenges
      </Link>

      <header className={`${card} p-6 sm:p-8`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/70">{c.category}</span>
          <StatusBadge status={status} />
          {c.visibility === 'private' && (
            <span className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/70">Private</span>
          )}
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{c.title}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">{c.description}</p>
        <p className="mt-4 text-sm text-ink/55">
          Created by {c.creatorName} &middot; {c.participants} {c.participants === 1 ? 'member' : 'members'}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          {c.joined ? (
            <section className={`${card} p-6`} aria-labelledby="progress-heading">
              <h2 id="progress-heading" className="font-display text-xl font-bold">
                Your progress
              </h2>
              <div className="mt-4">
                <ChallengeProgress
                  percent={timeProgress(c)}
                  label={status === 'upcoming' ? 'Not started' : `Day ${dayNumber(c)} of ${c.durationDays}`}
                  detail={`${c.myCheckIns} of ${requiredCheckIns(c)} check-ins`}
                />
              </div>
              <p className="mt-4 text-sm text-ink/65">
                <strong className="font-semibold text-ink">{state.label}.</strong> {nextCheckInLabel(c)}
              </p>
            </section>
          ) : (
            <section className={`${card} p-6`}>
              <h2 className="font-display text-xl font-bold">Join this challenge</h2>
              <p className="mt-2 text-sm text-ink/65">
                {status === 'completed'
                  ? 'This challenge has finished.'
                  : 'Join to submit check-ins and appear on the leaderboard. Joining is a demo action and is not saved.'}
              </p>
              {status !== 'completed' && c.visibility === 'public' && (
                <button type="button" className={`${btnPrimary} mt-4`} onClick={() => joinChallenge(c.id)}>
                  Join challenge
                </button>
              )}
            </section>
          )}

          {canCheckIn(c) && (
            <section className={`${card} p-6`} aria-labelledby="checkin-heading">
              <h2 id="checkin-heading" className="font-display text-xl font-bold">
                Submit today&rsquo;s check-in
              </h2>
              <div className="mt-4">
                <CheckInForm challenge={c} />
              </div>
            </section>
          )}

          {c.joined && status === 'completed' && <ReceiptTile challenge={c} />}

          <section className={`${card} p-6`} aria-labelledby="rules-heading">
            <h2 id="rules-heading" className="font-display text-xl font-bold">
              Rules
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{c.rules}</p>
            {c.reward && (
              <p className="mt-4 rounded-2xl bg-flare px-4 py-3 text-sm font-semibold">Reward: {c.reward}</p>
            )}
          </section>

          <section className={`${card} p-6`} aria-labelledby="details-heading">
            <h2 id="details-heading" className="font-display text-xl font-bold">
              Details
            </h2>
            <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-2 text-sm">
                  <dt className="text-ink/60">{label}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className={`${card} h-fit p-6`} aria-labelledby="board-heading">
          <h2 id="board-heading" className="font-display text-xl font-bold">
            Leaderboard
          </h2>
          {board.length > 0 ? (
            <ol className="mt-4 space-y-3">
              {board.map((m) => (
                <li
                  key={m.name}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${m.isYou ? 'bg-volt/50' : ''}`}
                >
                  <span className="w-5 text-sm font-bold text-ink/50">{m.rank}</span>
                  <Avatar name={m.name} className="size-8 text-xs" />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">{m.name}</span>
                  <span className="text-sm text-ink/65">
                    {pointsBased ? `${m.checkIns * 10} pts` : `${m.checkIns} check-ins`}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-sm text-ink/60">No one has checked in yet.</p>
          )}
          <p className="mt-4 text-xs leading-relaxed text-ink/50">
            {pointsBased ? 'Demo scoring: 10 points per check-in. ' : ''}
            {board.length < c.participants
              ? `Showing ${board.length} of ${c.participants} members in this demo.`
              : ''}
          </p>
          {c.joined && (
            <Link to="/app/challenges" className={`${btnSecondary} mt-4 w-full`}>
              Back to my challenges
            </Link>
          )}
        </aside>
      </div>
    </div>
  )
}
