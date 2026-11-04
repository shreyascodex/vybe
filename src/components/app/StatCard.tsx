import Icon from './Icon'
import type { IconName } from './Icon'

interface StatCardProps {
  label: string
  value: string | number
  hint?: string
  icon: IconName
  tone?: 'default' | 'volt' | 'ink'
}

const tones = {
  default: 'bg-card border border-ink/10',
  volt: 'bg-volt',
  ink: 'bg-ink text-paper',
}

export default function StatCard({ label, value, hint, icon, tone = 'default' }: StatCardProps) {
  return (
    <div className={`rounded-3xl p-5 ${tones[tone]}`}>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${tone === 'ink' ? 'text-paper/70' : 'text-ink/65'}`}>{label}</p>
        <Icon name={icon} className="size-5 opacity-70" />
      </div>
      <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">{value}</p>
      {hint && <p className={`mt-1 text-xs ${tone === 'ink' ? 'text-paper/60' : 'text-ink/60'}`}>{hint}</p>}
    </div>
  )
}
