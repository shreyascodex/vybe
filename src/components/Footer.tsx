import Logo from './Logo'
import EarlyAccessForm from './EarlyAccessForm'
import { footerLinks } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <Logo light />
            <p className="mt-4 max-w-md font-display text-3xl font-extrabold leading-tight">
              Be first to start a challenge with your friends.
            </p>
            <p className="mt-3 max-w-md text-sm text-paper/60">
              VYBE is an early build. The app preview is a demo with sample data.
            </p>
          </div>
          <div>
            <EarlyAccessForm id="footer-signup" variant="dark" />
          </div>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-paper/60 transition-colors hover:text-volt">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 border-t border-paper/10 pt-6 text-xs text-paper/40">
          &copy; {new Date().getFullYear()} VYBE. Early build.
        </p>
      </div>
    </footer>
  )
}
