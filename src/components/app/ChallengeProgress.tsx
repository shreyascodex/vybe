interface ChallengeProgressProps {
  percent: number
  label: string
  detail?: string
}

export default function ChallengeProgress({ percent, label, detail }: ChallengeProgressProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
        <span className="font-semibold">{label}</span>
        {detail && <span className="text-ink/60">{detail}</span>}
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={label}
      >
        <div className="h-full rounded-full bg-ink transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
