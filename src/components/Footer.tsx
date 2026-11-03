import Logo from './Logo'
import StatusPill from './StatusPill'
import { navLinks } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm font-display text-3xl font-extrabold leading-tight">
              Start the challenge. We will keep score.
            </p>
            <div className="mt-6">
              <StatusPill dark />
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-paper/60 transition-colors hover:text-volt"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-14 border-t border-paper/10 pt-6 text-xs text-paper/40">
          &copy; {new Date().getFullYear()} VYBE. Early build.
        </p>
      </div>
    </footer>
  )
}
