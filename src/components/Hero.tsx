import { Link } from 'react-router-dom'
import EarlyAccessForm from './EarlyAccessForm'
import ProductPreview from './ProductPreview'

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-8 sm:pt-14 lg:pb-24">
      <div className="grid items-start gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div className="animate-rise">
          <h1 className="relative isolate font-display text-4xl font-extrabold leading-[1] tracking-tight sm:text-6xl lg:text-7xl">
            Prove it. Score it.
            <br />
            <span className="relative inline-block">
              <span
                className="absolute -inset-x-2 bottom-0.5 top-[0.5em] -z-10 -skew-x-6 bg-volt"
                aria-hidden="true"
              />
              Settle it.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
            Challenges for friend groups on any topic: study, fitness, gaming, habits. Check in with
            proof, get scored by clear rules, and finish with a result card.
          </p>

          <div id="early-access" className="mt-7 max-w-lg">
            <EarlyAccessForm id="hero-signup" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              to="/app"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/25 px-5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-ink/5"
            >
              Try the app demo
            </Link>
            <span className="text-sm text-ink/60">Demo with sample data. Nothing is saved.</span>
          </div>
        </div>

        <div className="animate-rise" style={{ animationDelay: '0.12s' }}>
          <ProductPreview />
        </div>
      </div>
    </section>
  )
}
