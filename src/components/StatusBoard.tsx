import { status } from '../data/content'

export default function StatusBoard() {
  return (
    <section aria-labelledby="status-heading" className="border-y border-ink/10 bg-sand/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-16">
        <h2 id="status-heading" className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Where VYBE is today
        </h2>
        <p className="mt-2 max-w-2xl text-ink/70">
          VYBE is an early build. Here is exactly what you can try now and what is still to come.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 bg-card p-6">
            <span className="rounded-full bg-volt px-3 py-1 text-xs font-semibold">In the app demo</span>
            <ul className="mt-5 space-y-3">
              {status.works.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden="true">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-ink/60">{status.caveat}</p>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-card p-6">
            <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold">Planned, not built yet</span>
            <ul className="mt-5 space-y-3">
              {status.planned.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                  <span aria-hidden="true" className="text-ink/40">
                    &ndash;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
