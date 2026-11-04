import { useState } from 'react'
import { Link } from 'react-router-dom'
import ChallengeCard from '../components/app/ChallengeCard'
import EmptyState from '../components/app/EmptyState'
import Icon from '../components/app/Icon'
import PageHeader from '../components/app/PageHeader'
import { btnPrimary, btnVolt } from '../components/app/styles'
import { useDemo } from '../context/DemoContext'
import { getStatus } from '../lib/challenge'
import { usePageTitle } from '../lib/usePageTitle'

type Tab = 'active' | 'completed' | 'created'

export default function MyChallenges() {
  usePageTitle('My challenges')
  const { challenges, user } = useDemo()
  const [tab, setTab] = useState<Tab>('active')

  const joined = challenges.filter((c) => c.joined)
  const lists: Record<Tab, typeof joined> = {
    active: joined.filter((c) => getStatus(c) !== 'completed'),
    completed: joined.filter((c) => getStatus(c) === 'completed'),
    created: challenges.filter((c) => c.creatorId === user.id),
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'created', label: 'Created by me' },
  ]

  const shown = lists[tab]

  const empty: Record<Tab, { title: string; text: string; to: string; cta: string }> = {
    active: {
      title: 'No active challenges',
      text: 'Join a public challenge to start competing with a group.',
      to: '/app/explore',
      cta: 'Explore challenges',
    },
    completed: {
      title: 'Nothing completed yet',
      text: 'Finished challenges and their receipts will show up here.',
      to: '/app/explore',
      cta: 'Find a challenge',
    },
    created: {
      title: 'You have not created a challenge',
      text: 'Start one in under a minute and invite your friends.',
      to: '/app/challenges/create',
      cta: 'Create challenge',
    },
  }

  return (
    <div>
      <PageHeader
        title="My challenges"
        subtitle="Everything you have joined or created."
        action={
          <Link to="/app/challenges/create" className={btnVolt}>
            <Icon name="plus" className="size-4" />
            Create challenge
          </Link>
        }
      />

      <div role="tablist" aria-label="Challenge filters" className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const selected = t.id === tab
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls="challenge-panel"
              onClick={() => setTab(t.id)}
              className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors ${
                selected
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/20 text-ink/70 hover:border-ink hover:text-ink'
              }`}
            >
              {t.label}
              <span className={`ml-2 ${selected ? 'text-volt' : 'text-ink/45'}`}>{lists[t.id].length}</span>
            </button>
          )
        })}
      </div>

      <div id="challenge-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {shown.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((c) => (
              <ChallengeCard key={c.id} challenge={c} variant="mine" />
            ))}
          </div>
        ) : (
          <EmptyState
            title={empty[tab].title}
            text={empty[tab].text}
            action={
              <Link to={empty[tab].to} className={btnPrimary}>
                {empty[tab].cta}
              </Link>
            }
          />
        )}
      </div>
    </div>
  )
}
