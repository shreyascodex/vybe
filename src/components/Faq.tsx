import { faqs } from '../data/content'

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
      <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Questions
      </h2>

      <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold transition-colors hover:text-ink/70 [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                className="text-2xl font-normal leading-none transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-xl leading-relaxed text-ink/65">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
