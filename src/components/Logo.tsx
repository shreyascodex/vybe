interface LogoProps {
  light?: boolean
}

export default function Logo({ light = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={light ? '#D2F53C' : '#121212'} />
        <path
          d="M8 10l8 13 8-13"
          fill="none"
          stroke={light ? '#121212' : '#D2F53C'}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`font-display text-xl font-extrabold tracking-tight ${
          light ? 'text-paper' : 'text-ink'
        }`}
      >
        VYBE
      </span>
    </span>
  )
}
