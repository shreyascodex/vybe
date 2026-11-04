import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  text: string
  action?: ReactNode
}

export default function EmptyState({ title, text, action }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-ink/25 px-6 py-12 text-center">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/65">{text}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  )
}
