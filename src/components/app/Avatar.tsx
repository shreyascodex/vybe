const palette = ['bg-volt text-ink', 'bg-flare text-ink', 'bg-sand text-ink', 'bg-ink text-paper']

function pick(name: string): string {
  let sum = 0
  for (const ch of name) sum += ch.charCodeAt(0)
  return palette[sum % palette.length]
}

interface AvatarProps {
  name: string
  className?: string
}

export default function Avatar({ name, className = 'size-10 text-sm' }: AvatarProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display font-extrabold ${pick(
        name,
      )} ${className}`}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}
