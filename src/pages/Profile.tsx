import { Link } from 'react-router-dom'
import EmptyState from '../components/app/EmptyState'
import ProfileCard from '../components/app/ProfileCard'
import ReceiptTile from '../components/app/ReceiptTile'
import { btnPrimary } from '../components/app/styles'
import { useDemo } from '../context/DemoContext'
import { getStatus } from '../lib/challenge'
import { usePageTitle } from '../lib/usePageTitle'

export default function Profile() {
  usePageTitle('Profile')
  const { user, challenges, streak } = useDemo()

  const mine = challenges.filter((c) => c.joined)
  const completed = mine.filter((c) => getStatus(c) === 'completed')
  const totalCheckIns = mine.reduce((sum, c) => sum + c.myCheckIns, 0)

  return (
    <div className="space-y-10">
      <ProfileCard
        user={user}
        stats={[
          { label: 'Challenges completed', value: completed.length },
          { label: 'Current streak', value: `${streak} days` },
          { label: 'Total check-ins', value: totalCheckIns },
        ]}
      />

      <section aria-labelledby="receipts-heading">
        <h2 id="receipts-heading" className="mb-4 font-display text-2xl font-bold">
          Recent challenge receipts
        </h2>
        {completed.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {completed.map((c) => (
              <Link key={c.id} to={`/app/challenges/${c.id}`} className="block transition-transform hover:-translate-y-0.5">
                <ReceiptTile challenge={c} />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No receipts yet"
            text="Finish a challenge and its receipt will appear here."
            action={
              <Link to="/app/explore" className={btnPrimary}>
                Explore challenges
              </Link>
            }
          />
        )}
      </section>

      <p className="text-xs text-ink/50">
        Profile details are fictional demo data. Editing the profile is not available yet.
      </p>
    </div>
  )
}
