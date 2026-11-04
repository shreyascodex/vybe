import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Avatar from '../components/app/Avatar'
import Icon from '../components/app/Icon'
import { btnVolt } from '../components/app/styles'
import { useDemo } from '../context/DemoContext'

export default function AppHeader() {
  const { user } = useDemo()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function onSearch(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/app/explore?q=${encodeURIComponent(q)}` : '/app/explore')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-10">
        <Link to="/" aria-label="VYBE website home" className="lg:hidden">
          <Logo />
        </Link>

        <form onSubmit={onSearch} className="relative hidden max-w-md flex-1 lg:block" role="search">
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/45" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search public challenges"
            aria-label="Search public challenges"
            className="w-full rounded-full border border-ink/15 bg-card py-2.5 pl-10 pr-4 text-sm placeholder:text-ink/45 focus:border-ink focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-3">
          <span className="rounded-full border border-flare/60 bg-flare/15 px-3 py-1 text-xs font-semibold">
            Demo data
          </span>
          <Link to="/app/challenges/create" className={`${btnVolt} hidden lg:inline-flex`}>
            <Icon name="plus" className="size-4" />
            Create challenge
          </Link>
          <Link to="/app/profile" aria-label="Your profile" className="lg:hidden">
            <Avatar name={user.name} className="size-9 text-sm" />
          </Link>
        </div>
      </div>
    </header>
  )
}
