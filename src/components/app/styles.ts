// Shared class strings so buttons look the same across the app.
const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 min-h-11'

export const btnPrimary = `${base} bg-ink text-paper hover:bg-volt hover:text-ink`
export const btnVolt = `${base} bg-volt text-ink hover:bg-ink hover:text-volt`
export const btnSecondary = `${base} border border-ink/25 text-ink hover:border-ink hover:bg-ink/5`
export const card = 'rounded-3xl border border-ink/10 bg-card'
export const inputClass =
  'w-full rounded-2xl border border-ink/20 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink/40 transition-colors focus:border-ink focus:outline-none sm:text-sm'
