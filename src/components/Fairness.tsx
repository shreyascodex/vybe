import { fairness } from '../data/content'

export default function Fairness() {
  return (
    <section id="fairness" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold">Proposed rules, not built yet</span>
      <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        How scoring is meant to be fair.
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/65">{fairness.intro}</p>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-ink/10 bg-card p-7">
          <h3 className="font-display text-2xl font-bold">Scoring</h3>
          <dl className="mt-5 space-y-5">
            {fairness.rules.map((r) => (
              <div key={r.title}>
                <dt className="text-sm font-semibold">{r.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink/70">{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-3xl bg-ink p-7 text-paper">
          <h3 className="font-display text-2xl font-bold">If someone disputes a check-in</h3>
          <ol className="mt-5 space-y-3">
            {fairness.disputes.map((d, i) => (
              <li key={d} className="flex gap-3 text-sm leading-relaxed text-paper/80">
                <span className="font-display font-extrabold text-volt">{i + 1}</span>
                {d}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
