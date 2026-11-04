import { useState } from 'react'
import type { FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface EarlyAccessFormProps {
  /** Unique id prefix, because the form appears more than once on the page. */
  id: string
  variant?: 'light' | 'dark'
}

const endpoint: string | undefined = import.meta.env.VITE_EARLY_ACCESS_ENDPOINT
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EarlyAccessForm({ id, variant = 'light' }: EarlyAccessFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const dark = variant === 'dark'

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Honeypot: real visitors never see or fill this field.
    const data = new FormData(e.currentTarget)
    if (data.get('website')) {
      setStatus('success')
      return
    }

    const value = email.trim()
    if (!emailPattern.test(value)) {
      setStatus('error')
      setMessage('Enter a valid email address.')
      return
    }

    if (!endpoint) {
      console.warn('VITE_EARLY_ACCESS_ENDPOINT is not set, so no email was sent anywhere. See README.')
      setStatus('error')
      setMessage('Signup is not connected yet, so your email was not saved. Please try again soon.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: value, source: 'vybe-landing' }),
      })
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
      setMessage('Something went wrong and your email was not saved. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className="rounded-2xl bg-volt px-5 py-4 text-sm font-semibold text-ink"
      >
        Thanks. We will email you when early access opens.
      </p>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-note`}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          className={`min-h-12 w-full flex-1 rounded-full border px-5 text-base transition-colors focus:outline-none sm:text-sm ${
            dark
              ? 'border-paper/25 bg-paper/10 text-paper placeholder:text-paper/40 focus:border-volt'
              : 'border-ink/25 bg-card text-ink placeholder:text-ink/40 focus:border-ink'
          }`}
        />
        {/* Honeypot field */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={submitting}
          className={`min-h-12 shrink-0 rounded-full px-6 text-sm font-semibold transition-all duration-200 disabled:opacity-60 ${
            dark ? 'bg-volt text-ink hover:bg-paper' : 'bg-ink text-paper hover:bg-volt hover:text-ink'
          }`}
        >
          {submitting ? 'Sending...' : 'Get early access'}
        </button>
      </div>

      {status === 'error' && (
        <p role="alert" className={`mt-2.5 text-sm font-medium ${dark ? 'text-volt' : 'text-flare'}`}>
          {message}
        </p>
      )}

      <p id={`${id}-note`} className={`mt-3 text-xs leading-relaxed ${dark ? 'text-paper/55' : 'text-ink/55'}`}>
        We will only use your email to tell you about VYBE early access. We will not sell or share it, and
        you can ask us to delete it at any time.{' '}
        <a href="#privacy" className="underline underline-offset-2 hover:text-volt">
          Privacy details
        </a>
      </p>
    </form>
  )
}
