import { features } from '../data/content'

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Made for groups of friends, not strangers on a leaderboard.
      </h2>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.title}
            className={`group flex flex-col justify-between rounded-3xl border border-ink/10 p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              f.wide
                ? 'bg-ink text-paper sm:col-span-2 lg:col-span-2'
                : 'bg-paper hover:border-ink/30'
            }`}
          >
            <div>
              <h3 className="font-display text-2xl font-bold">{f.title}</h3>
              <p
                className={`mt-3 max-w-md text-sm leading-relaxed ${
                  f.wide ? 'text-paper/70' : 'text-ink/65'
                }`}
              >
                {f.text}
              </p>
            </div>
            <span
              className={`mt-8 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                f.wide ? 'bg-volt text-ink' : 'bg-sand text-ink/70'
              }`}
            >
              Planned
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
