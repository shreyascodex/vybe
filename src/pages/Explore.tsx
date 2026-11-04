import { Link, useSearchParams } from 'react-router-dom'
import CategoryFilter from '../components/app/CategoryFilter'
import type { CategoryValue } from '../components/app/CategoryFilter'
import ChallengeCard from '../components/app/ChallengeCard'
import EmptyState from '../components/app/EmptyState'
import Icon from '../components/app/Icon'
import PageHeader from '../components/app/PageHeader'
import { btnSecondary, btnVolt, inputClass } from '../components/app/styles'
import { useState } from 'react'
import { useDemo } from '../context/DemoContext'
import { getStatus } from '../lib/challenge'
import { usePageTitle } from '../lib/usePageTitle'

export default function Explore() {
  usePageTitle('Explore')
  const { challenges } = useDemo()
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState<CategoryValue>('All')
  const query = params.get('q') ?? ''

  function setQuery(value: string) {
    setParams(value ? { q: value } : {}, { replace: true })
  }

  const needle = query.trim().toLowerCase()
  const results = challenges.filter((c) => {
    if (c.visibility !== 'public' || getStatus(c) === 'completed') return false
    if (category !== 'All' && c.category !== category) return false
    if (!needle) return true
    return [c.title, c.description, c.category, c.creatorName].some((field) =>
      field.toLowerCase().includes(needle),
    )
  })

  const filtering = needle !== '' || category !== 'All'

  return (
    <div>
      <PageHeader
        title="Explore challenges"
        subtitle="Public challenges you can join. Joining works in this demo only."
        action={
          <Link to="/app/challenges/create" className={btnVolt}>
            <Icon name="plus" className="size-4" />
            Create challenge
          </Link>
        }
      />

      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/45" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, topic or creator"
            aria-label="Search challenges"
            className={`${inputClass} pl-11`}
          />
        </div>
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <p className="mb-4 mt-6 text-sm text-ink/60" aria-live="polite">
        {results.length} {results.length === 1 ? 'challenge' : 'challenges'}
        {filtering ? ' match your filters' : ' available'}
      </p>

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((c) => (
            <ChallengeCard key={c.id} challenge={c} variant="explore" />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No challenges found"
          text="Try a different search or category, or start the challenge yourself."
          action={
            <button
              type="button"
              className={btnSecondary}
              onClick={() => {
                setQuery('')
                setCategory('All')
              }}
            >
              Clear filters
            </button>
          }
        />
      )}
    </div>
  )
}
