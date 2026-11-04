import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/app/Icon'
import { navItems } from '../data/navigation'
import type { NavItem } from '../data/navigation'

const order: NavItem['id'][] = ['dashboard', 'explore', 'create', 'mine', 'profile']
const items = order
  .map((id) => navItems.find((n) => n.id === id))
  .filter((n): n is NavItem => n !== undefined)

export default function MobileNav() {
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-paper pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="App"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end px-2">
        {items.map((item) => {
          const active = item.isActive(pathname)
          if (item.id === 'create') {
            return (
              <li key={item.id} className="flex justify-center pb-2">
                <Link
                  to={item.to}
                  aria-label="Create challenge"
                  className="-mt-5 flex size-14 items-center justify-center rounded-full bg-volt text-ink shadow-[0_6px_0_-2px_rgba(18,18,18,0.9)] transition-transform active:translate-y-0.5"
                >
                  <Icon name="plus" className="size-6" />
                </Link>
              </li>
            )
          }
          return (
            <li key={item.id}>
              <Link
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                  active ? 'text-ink' : 'text-ink/50'
                }`}
              >
                <Icon name={item.icon} className="size-5" />
                {item.shortLabel}
                <span
                  className={`h-0.5 w-5 rounded-full ${active ? 'bg-ink' : 'bg-transparent'}`}
                  aria-hidden="true"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
