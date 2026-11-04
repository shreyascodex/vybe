import { privacy } from '../data/content'

export default function Trust() {
  return (
    <section id="privacy" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Privacy, and what happens to proof photos.
      </h2>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-ink/10 bg-card p-7">
          <h3 className="font-display text-xl font-bold">Your email</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{privacy.email}</p>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-card p-7">
          <h3 className="font-display text-xl font-bold">Proof photos (planned)</h3>
          <ul className="mt-3 space-y-2.5">
            {privacy.proof.map((p) => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                <span aria-hidden="true" className="text-ink/40">
                  &ndash;
                </span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink/55">{privacy.proofNote}</p>
        </div>
      </div>

      <div className="mt-5 rounded-3xl bg-ink p-7 text-paper">
        <h3 className="font-display text-xl font-bold text-volt">Help us test it</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/75">{privacy.testers}</p>
      </div>
    </section>
  )
}
