import { compare } from '../data/content'

export default function Compare() {
  return (
    <section id="why" className="border-y border-ink/10 bg-sand/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Your group chat can start a challenge. It cannot finish one.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/65">
          The right-hand column is what VYBE is being built to do. The app demo shows part of it with sample
          data.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 bg-paper p-8">
            <h3 className="font-display text-xl font-bold text-ink/60">Group chat + spreadsheet</h3>
            <ul className="mt-6 space-y-4">
              {compare.before.map((item) => (
                <li key={item} className="flex gap-3 text-ink/65">
                  <span className="mt-0.5 text-flare" aria-hidden="true">
                    &times;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-ink p-8 text-paper">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-xl font-bold text-volt">VYBE</h3>
              <span className="rounded-full border border-paper/30 px-2.5 py-0.5 text-xs text-paper/70">
                Goal, not shipped yet
              </span>
            </div>
            <ul className="mt-6 space-y-4">
              {compare.after.map((item) => (
                <li key={item} className="flex gap-3 text-paper/80">
                  <span className="mt-0.5 text-volt" aria-hidden="true">
                    &#10003;
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
