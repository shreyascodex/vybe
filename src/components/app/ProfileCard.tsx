import type { UserProfile } from '../../types'
import Avatar from './Avatar'
import { card } from './styles'

interface ProfileCardProps {
  user: UserProfile
  stats: { label: string; value: string | number }[]
}

export default function ProfileCard({ user, stats }: ProfileCardProps) {
  return (
    <section className={`${card} p-6 sm:p-8`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Avatar name={user.name} className="size-20 text-3xl" />
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">{user.name}</h2>
          <p className="text-sm text-ink/60">
            @{user.username} &middot; {user.memberSince}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/75">{user.bio}</p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-sand/70 p-4">
            <dd className="font-display text-3xl font-extrabold">{s.value}</dd>
            <dt className="mt-1 text-xs text-ink/60">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
