import { Link, useLocation } from 'react-router-dom'
import Logo from '../components/Logo'
import Avatar from '../components/app/Avatar'
import Icon from '../components/app/Icon'
import { useDemo } from '../context/DemoContext'
import { navItems } from '../data/navigation'

export default function AppSidebar() {
  const { pathname } = useLocation()
  const { user } = useDemo()

  return (
    <aside className="sticky top-0 hidden h-screen flex-col bg-ink px-5 py-6 text-paper lg:flex">
      <Link to="/" aria-label="VYBE website home" className="px-2">
        <Logo light />
      </Link>

      <nav className="mt-10 flex-1" aria-label="App">
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const active = item.isActive(pathname)
            const isCreate = item.id === 'create'
            return (
              <li key={item.id}>
                <Link
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition-colors ${
                    isCreate
                      ? 'mt-4 bg-volt text-ink hover:bg-paper'
                      : active
                        ? 'bg-paper/12 text-paper'
                        : 'text-paper/65 hover:bg-paper/8 hover:text-paper'
                  }`}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="space-y-4 border-t border-paper/10 pt-5">
        <Link
          to="/app/profile"
          className="flex items-center gap-3 rounded-2xl px-2 py-1 transition-colors hover:bg-paper/8"
        >
          <Avatar name={user.name} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">{user.name}</span>
            <span className="block truncate text-xs text-paper/55">@{user.username}</span>
          </span>
        </Link>
        <Link to="/" className="block px-2 text-xs text-paper/50 transition-colors hover:text-volt">
          &larr; Back to website
        </Link>
      </div>
    </aside>
  )
}
