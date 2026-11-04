import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES, FREQUENCIES, PROOF_TYPES, SCORING_METHODS } from '../../types'
import type { Category, Frequency, NewChallengeInput, ProofType, ScoringMethod, Visibility } from '../../types'
import { useDemo } from '../../context/DemoContext'
import { requiredCheckIns } from '../../lib/challenge'
import { formatDate, todayISO } from '../../lib/dates'
import Icon from './Icon'
import { btnPrimary, btnSecondary, card, inputClass } from './styles'

const DURATIONS = [7, 14, 21, 30, 60, 90]

interface FormState {
  title: string
  description: string
  category: Category
  visibility: Visibility
  startDate: string
  durationDays: number
  frequency: Frequency
  proofType: ProofType
  scoring: ScoringMethod
  rules: string
  reward: string
}

type Errors = Partial<Record<keyof FormState, string>>

const initial: FormState = {
  title: '',
  description: '',
  category: 'Lifestyle',
  visibility: 'private',
  startDate: todayISO(),
  durationDays: 14,
  frequency: 'Daily',
  proofType: 'Photo',
  scoring: 'Consistent check-ins',
  rules: '',
  reward: '',
}

function validate(f: FormState): Errors {
  const e: Errors = {}
  const title = f.title.trim()
  if (title.length < 3) e.title = 'Give your challenge a name of at least 3 characters.'
  else if (title.length > 60) e.title = 'Keep the name under 60 characters.'
  const desc = f.description.trim()
  if (desc.length < 10) e.description = 'Describe the challenge in at least 10 characters.'
  else if (desc.length > 280) e.description = 'Keep the description under 280 characters.'
  if (!f.startDate) e.startDate = 'Choose a start date.'
  else if (f.startDate < todayISO()) e.startDate = 'The start date cannot be in the past.'
  if (f.rules.trim().length < 10) e.rules = 'Write the rules in at least 10 characters.'
  if (f.reward.trim().length > 80) e.reward = 'Keep the reward under 80 characters.'
  return e
}

interface FieldProps {
  label: string
  htmlFor?: string
  hint?: string
  error?: string
  children: ReactNode
}

function Field({ label, htmlFor, hint, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold">
        {label}
      </label>
      {hint && <p className="mb-2 mt-0.5 text-xs text-ink/55">{hint}</p>}
      {!hint && <div className="mb-2" />}
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-sm font-medium text-flare">
          {error}
        </p>
      )}
    </div>
  )
}

interface RadioOption<T extends string> {
  value: T
  label: string
  hint: string
}

interface RadioCardsProps<T extends string> {
  name: string
  value: T
  options: RadioOption<T>[]
  onChange: (value: T) => void
}

function RadioCards<T extends string>({ name, value, options, onChange }: RadioCardsProps<T>) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => (
        <label key={o.value} className="relative block cursor-pointer">
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="peer sr-only"
          />
          <span className="block min-h-16 rounded-2xl border border-ink/20 p-4 transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
            <span className="block text-sm font-semibold">{o.label}</span>
            <span className="mt-0.5 block text-xs opacity-70">{o.hint}</span>
          </span>
        </label>
      ))}
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={`${card} space-y-5 p-6`}>
      <h2 className="font-display text-xl font-bold">{title}</h2>
      {children}
    </section>
  )
}

const proofOptions: RadioOption<ProofType>[] = PROOF_TYPES.map((p) => ({
  value: p,
  label: p,
  hint:
    p === 'Photo'
      ? 'Members upload a photo each check-in'
      : p === 'Text'
        ? 'Members write a short note'
        : 'Members upload a screenshot',
}))

const scoringOptions: RadioOption<ScoringMethod>[] = SCORING_METHODS.map((s) => ({
  value: s,
  label: s,
  hint: s === 'Consistent check-ins' ? 'Rank by how reliably people check in' : 'Each check-in earns points',
}))

const visibilityOptions: RadioOption<Visibility>[] = [
  { value: 'private', label: 'Private', hint: 'Only people you invite' },
  { value: 'public', label: 'Public', hint: 'Listed on Explore' },
]

export default function CreateChallengeForm() {
  const { createChallenge } = useDemo()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Errors>({})

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      document.getElementById(`field-${first}`)?.focus()
      return
    }
    const input: NewChallengeInput = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      visibility: form.visibility,
      startDate: form.startDate,
      durationDays: form.durationDays,
      frequency: form.frequency,
      proofType: form.proofType,
      scoring: form.scoring,
      rules: form.rules.trim(),
      reward: form.reward.trim() || undefined,
    }
    const id = createChallenge(input)
    navigate(`/app/challenges/${id}`)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-6">
        <Section title="Basics">
          <Field label="Challenge name" htmlFor="field-title" error={errors.title}>
            <input
              id="field-title"
              className={inputClass}
              value={form.title}
              maxLength={60}
              placeholder="e.g. 6 AM Wake-Up Club"
              onChange={(e) => update('title', e.target.value)}
            />
          </Field>
          <Field
            label="Description"
            htmlFor="field-description"
            hint="What is the challenge and why would friends join?"
            error={errors.description}
          >
            <textarea
              id="field-description"
              rows={3}
              className={inputClass}
              value={form.description}
              maxLength={280}
              onChange={(e) => update('description', e.target.value)}
            />
          </Field>
          <Field label="Category" htmlFor="field-category">
            <select
              id="field-category"
              className={inputClass}
              value={form.category}
              onChange={(e) => update('category', e.target.value as Category)}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Visibility">
            <RadioCards name="visibility" value={form.visibility} options={visibilityOptions} onChange={(v) => update('visibility', v)} />
          </Field>
        </Section>

        <Section title="Schedule">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Start date" htmlFor="field-startDate" error={errors.startDate}>
              <input
                id="field-startDate"
                type="date"
                min={todayISO()}
                className={inputClass}
                value={form.startDate}
                onChange={(e) => update('startDate', e.target.value)}
              />
            </Field>
            <Field label="Duration" htmlFor="field-durationDays">
              <select
                id="field-durationDays"
                className={inputClass}
                value={form.durationDays}
                onChange={(e) => update('durationDays', Number(e.target.value))}
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d} days
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Check-in frequency" htmlFor="field-frequency">
              <select
                id="field-frequency"
                className={inputClass}
                value={form.frequency}
                onChange={(e) => update('frequency', e.target.value as Frequency)}
              >
                {FREQUENCIES.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </Field>
          </div>
        </Section>

        <Section title="Proof and scoring">
          <Field label="Proof type" hint="What members submit with each check-in.">
            <RadioCards name="proof" value={form.proofType} options={proofOptions} onChange={(v) => update('proofType', v)} />
          </Field>
          <Field label="Scoring method" hint="How the leaderboard ranks members.">
            <RadioCards name="scoring" value={form.scoring} options={scoringOptions} onChange={(v) => update('scoring', v)} />
          </Field>
        </Section>

        <Section title="Rules and reward">
          <Field
            label="Challenge rules"
            htmlFor="field-rules"
            hint="Be specific so nobody can argue about what counts."
            error={errors.rules}
          >
            <textarea
              id="field-rules"
              rows={4}
              className={inputClass}
              value={form.rules}
              onChange={(e) => update('rules', e.target.value)}
            />
          </Field>
          <Field
            label="Completion reward (optional)"
            htmlFor="field-reward"
            hint="Stakes without money: a coffee, a dare, picking the next challenge."
            error={errors.reward}
          >
            <input
              id="field-reward"
              className={inputClass}
              value={form.reward}
              maxLength={80}
              onChange={(e) => update('reward', e.target.value)}
            />
          </Field>
        </Section>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className={btnPrimary}>
            Create challenge
          </button>
          <button type="button" className={btnSecondary} onClick={() => navigate('/app/challenges')}>
            Cancel
          </button>
        </div>
      </div>

      <aside className="h-fit lg:sticky lg:top-24" aria-label="Challenge preview">
        <div className={`${card} p-6`}>
          <p className="text-xs font-semibold text-ink/55">Preview</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/70">{form.category}</span>
            <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold">
              {form.visibility === 'public' ? 'Public' : 'Private'}
            </span>
          </div>
          <h3 className="mt-4 font-display text-xl font-bold leading-snug">
            {form.title.trim() || 'Your challenge name'}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/65">
            {form.description.trim() || 'Your description will appear here.'}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li className="flex items-center gap-2">
              <Icon name="clock" className="size-4" />
              {form.durationDays} days, starts {form.startDate ? formatDate(form.startDate) : 'TBD'}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="check" className="size-4" />
              {form.frequency} check-ins &middot; {requiredCheckIns(form)} needed
            </li>
            <li className="flex items-center gap-2">
              <Icon name="flag" className="size-4" />
              {form.proofType} proof &middot; {form.scoring}
            </li>
          </ul>
          {form.reward.trim() && (
            <p className="mt-4 rounded-2xl bg-flare px-3 py-2 text-sm font-semibold">Reward: {form.reward.trim()}</p>
          )}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink/50">
          Demo: creating a challenge adds it to this browser tab only. It is not saved to a server.
        </p>
      </aside>
    </form>
  )
}
