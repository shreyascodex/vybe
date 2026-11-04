import { Link } from 'react-router-dom'
import ActivityFeed from '../components/app/ActivityFeed'
import ChallengeCard from '../components/app/ChallengeCard'
import EmptyState from '../components/app/EmptyState'
import Icon from '../components/app/Icon'
import StatCard from '../components/app/StatCard'
import { btnPrimary, btnSecondary, card } from '../components/app/styles'
import { useDemo } from '../context/DemoContext'
import { canCheckIn, getStatus } from '../lib/challenge'
import { greeting } from '../lib/dates'
import { usePageTitle } from '../lib/usePageTitle'

export default function Dashboard() {
  usePageTitle('Dashboard')
  const { user, challenges, activity, streak } = useDemo()

  const mine = challenges.filter((c) => c.joined)
  const active = mine.filter((c) => getStatus(c) === 'active')
  const completed = mine.filter((c) => getStatus(c) === 'completed')
  const totalCheckIns = mine.reduce((sum, c) => sum + c.myCheckIns, 0)
  const dueCount = active.filter(canCheckIn).length

  // Challenges that need a check-in come first.
  const sorted = [...active].sort((a, b) => Number(canCheckIn(b)) - Number(canCheckIn(a)))
  const shown = sorted.slice(0, 4)

  return (
    <div className="space-y-10">
      <section>
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {greeting()}, {user.name}
        </h1>
        <p className="mt-1.5 text-ink/65">
          Ready to prove yourself?{' '}
          {dueCount > 0
            ? `You have ${dueCount} check-in${dueCount > 1 ? 's' : ''} due today.`
            : 'Every check-in is done for today.'}
        </p>
      </section>

      <section aria-label="Overview" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Active challenges" value={active.length} hint={`${dueCount} due today`} icon="flag" />
        <StatCard label="Current streak" value={`${streak} days`} hint="Keep it going" icon="flame" tone="volt" />
        <StatCard label="Check-ins completed" value={totalCheckIns} hint="Across all challenges" icon="check" />
        <StatCard label="Challenges completed" value={completed.length} hint="Finished seasons" icon="trophy" tone="ink" />
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <section aria-labelledby="active-heading">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="active-heading" className="font-display text-2xl font-bold">
              Active challenges
            </h2>
            <Link to="/app/challenges" className="text-sm font-semibold underline decoration-volt decoration-2 underline-offset-4">
              View all
            </Link>
          </div>

          {shown.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {shown.map((c) => (
                <ChallengeCard key={c.id} challenge={c} variant="mine" />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No active challenges"
              text="Join a public challenge or start your own to see it here."
              action={
                <Link to="/app/explore" className={btnPrimary}>
                  Explore challenges
                </Link>
              }
            />
          )}
        </section>

        <div className="space-y-6">
          <section className={`${card} p-5`} aria-labelledby="quick-heading">
            <h2 id="quick-heading" className="font-display text-xl font-bold">
              Quick actions
            </h2>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link to="/app/challenges/create" className={`${btnPrimary} justify-between`}>
                Create challenge <Icon name="arrow" className="size-4" />
              </Link>
              <Link to="/app/explore" className={`${btnSecondary} justify-between`}>
                Explore challenges <Icon name="arrow" className="size-4" />
              </Link>
              <Link to="/app/challenges" className={`${btnSecondary} justify-between`}>
                View my challenges <Icon name="arrow" className="size-4" />
              </Link>
            </div>
          </section>

          <section className={`${card} p-5`} aria-labelledby="activity-heading">
            <h2 id="activity-heading" className="font-display text-xl font-bold">
              Recent activity
            </h2>
            <div className="mt-4">
              <ActivityFeed items={activity} limit={6} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
