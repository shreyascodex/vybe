import { steps } from '../data/content'

export default function HowItWorks() {
  return (
    <section id="how" className="border-y border-ink/10 bg-sand/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          From &ldquo;I bet I can&rdquo; to a settled score in four steps.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/65">
          This is the planned flow. The app demo covers steps 1 and 3 with sample data. Invites and
          shared results are not built yet.
        </p>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="group rounded-3xl border border-ink/10 bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink/30 hover:shadow-lg"
            >
              <span className="font-display text-5xl font-extrabold text-ink/15 transition-colors group-hover:text-flare">
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
