import Button from './Button'
import ReceiptCard from './ReceiptCard'

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pb-28">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <h1 className="relative isolate font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Prove it.
            <br />
            Score it.
            <br />
            <span className="relative inline-block">
              <span
                className="absolute -inset-x-2 bottom-1 top-[0.5em] -z-10 -skew-x-6 bg-volt"
                aria-hidden="true"
              />
              Settle it.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/70">
            VYBE turns the challenge your group chat keeps starting into a real season: proof
            check-ins, fair scoring, and a result card with a name on the loser.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#how">See how it works</Button>
            <Button href="#features" variant="secondary">
              What we are building
            </Button>
          </div>

          <p className="mt-6 text-sm text-ink/55">
            Early build. Sign-ups open once accounts and challenges are ready.
          </p>
        </div>

        <div className="animate-rise" style={{ animationDelay: '0.15s' }}>
          <ReceiptCard />
        </div>
      </div>
    </section>
  )
}
