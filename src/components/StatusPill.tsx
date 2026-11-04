interface StatusPillProps {
  label?: string
  dark?: boolean
}

export default function StatusPill({ label = 'Early build', dark = false }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
        dark ? 'bg-paper text-ink' : 'bg-ink text-paper'
      }`}
    >
      <span className="size-2 rounded-full bg-flare" aria-hidden="true" />
      {label}
    </span>
  )
}
