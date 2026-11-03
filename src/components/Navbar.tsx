import { useState } from 'react'
import Logo from './Logo'
import StatusPill from './StatusPill'
import { navLinks } from '../data/content'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <a href="#top" aria-label="VYBE home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink/65 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <StatusPill />
        </div>

        <button
          type="button"
          className="flex size-10 flex-col items-center justify-center gap-1.5 rounded-full border border-ink/15 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span className={`h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-5 pb-6 pt-3 md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink/10 py-3 text-base font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <StatusPill />
          </div>
        </div>
      )}
    </header>
  )
}
