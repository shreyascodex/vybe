import type { Challenge } from '../../types'
import { endDate, leaderboard, myRank, requiredCheckIns } from '../../lib/challenge'
import { formatDate, ordinal } from '../../lib/dates'

export default function ReceiptTile({ challenge: c }: { challenge: Challenge }) {
  const rank = myRank(c)
  const total = leaderboard(c).length
  return (
    <div className="rounded-3xl bg-ink p-5 text-paper">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-paper/55">Challenge receipt</p>
          <h3 className="mt-1 font-display text-lg font-extrabold leading-snug">{c.title}</h3>
        </div>
        {rank !== null && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
              rank === 1 ? 'bg-volt text-ink' : 'border border-paper/30 text-paper/80'
            }`}
          >
            {ordinal(rank)} of {total}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-paper/70">
        {c.myCheckIns} of {requiredCheckIns(c)} check-ins &middot; ended {formatDate(endDate(c))}
      </p>
      {c.reward && (
        <p className="mt-3 rounded-2xl bg-flare px-3 py-2 text-sm font-semibold text-ink">
          Reward: {c.reward}
        </p>
      )}
    </div>
  )
}
