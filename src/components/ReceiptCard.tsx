interface Standing {
  name: string
  points: number
  percent: number
}

const standings: Standing[] = [
  { name: 'Aman', points: 21, percent: 100 },
  { name: 'Riya', points: 18, percent: 86 },
  { name: 'Dev', points: 12, percent: 57 },
  { name: 'Mira', points: 9, percent: 43 },
]

export default function ReceiptCard() {
  return (
    <div className="relative mx-auto w-full max-w-md rotate-2 rounded-3xl bg-ink p-6 text-paper shadow-[0_30px_60px_-20px_rgba(18,18,18,0.55)] transition-transform duration-300 hover:rotate-0 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-paper/55">Challenge receipt</p>
          <h3 className="mt-1 font-display text-2xl font-extrabold">7-day 6 AM wake-up</h3>
        </div>
        <span className="shrink-0 rounded-full border border-paper/25 px-3 py-1 text-xs font-medium text-paper/70">
          Sample
        </span>
      </div>

      <ul className="mt-6 space-y-4">
        {standings.map((s, i) => (
          <li key={s.name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-semibold">
                {i === 0 && <span className="mr-2 text-volt">1st</span>}
                {s.name}
              </span>
              <span className="text-paper/60">{s.points} pts</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-paper/10">
              <div
                className={`h-full rounded-full ${i === 0 ? 'bg-volt' : 'bg-paper/45'}`}
                style={{ width: `${s.percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-7 rounded-2xl bg-flare p-4 text-ink">
        <p className="text-sm font-semibold">Forfeit owed</p>
        <p className="mt-1 font-display text-lg font-bold leading-snug">
          Dev and Mira buy the coffee.
        </p>
      </div>

      <p className="mt-5 text-xs text-paper/45">
        Illustrative preview. Names and scores are made up.
      </p>
    </div>
  )
}
