import { useState } from 'react'
import { previewScenarios } from '../data/preview'

type Step = 'challenge' | 'proof' | 'result'

const steps: { id: Step; label: string }[] = [
  { id: 'challenge', label: '1 Challenge' },
  { id: 'proof', label: '2 Proof' },
  { id: 'result', label: '3 Result' },
]

export default function ProductPreview() {
  const [scenarioId, setScenarioId] = useState(previewScenarios[0].id)
  const [step, setStep] = useState<Step>('challenge')
  const s = previewScenarios.find((x) => x.id === scenarioId) ?? previewScenarios[0]

  return (
    <div className="rounded-3xl bg-ink p-5 text-paper shadow-[0_30px_60px_-24px_rgba(18,18,18,0.55)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Sample challenge type">
          {previewScenarios.map((p) => {
            const active = p.id === scenarioId
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => setScenarioId(p.id)}
                className={`min-h-9 rounded-full px-3.5 text-xs font-semibold transition-colors ${
                  active ? 'bg-volt text-ink' : 'border border-paper/25 text-paper/70 hover:text-paper'
                }`}
              >
                {p.chip}
              </button>
            )
          })}
        </div>
        <span className="shrink-0 rounded-full border border-paper/25 px-2.5 py-1 text-xs text-paper/65">
          Sample
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1 rounded-full bg-paper/10 p-1" role="tablist" aria-label="Challenge stages">
        {steps.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={step === t.id}
            onClick={() => setStep(t.id)}
            className={`min-h-9 rounded-full text-xs font-semibold transition-colors ${
              step === t.id ? 'bg-paper text-ink' : 'text-paper/70 hover:text-paper'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-5 min-h-[16.5rem]">
        {step === 'challenge' && (
          <div>
            <p className="text-sm text-paper/55">{s.category}</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight">{s.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.meta.map((m) => (
                <li key={m} className="rounded-full bg-paper/10 px-3 py-1 text-xs text-paper/80">
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-paper/10 p-3.5 text-sm leading-relaxed text-paper/85">
              <span className="font-semibold text-paper">Rules: </span>
              {s.rules}
            </p>
            <p className="mt-3 rounded-2xl bg-flare p-3.5 text-sm font-semibold text-ink">Stakes: {s.stakes}</p>
          </div>
        )}

        {step === 'proof' && (
          <div>
            <p className="text-sm text-paper/55">Check-in for {s.title}</p>
            <div className="mt-3 rounded-2xl bg-paper p-4 text-ink">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{s.proof.by}</span>
                <span className="text-ink/55">{s.proof.time}</span>
              </div>
              {s.proof.kind === 'text' ? (
                <p className="mt-3 text-sm leading-relaxed">&ldquo;{s.proof.text}&rdquo;</p>
              ) : (
                <div className="mt-3 flex h-28 items-center justify-center rounded-xl bg-sand px-3 text-center text-xs text-ink/60">
                  {s.proof.caption}
                </div>
              )}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-paper/65">
              Each check-in carries proof. Group members will be able to flag anything that looks wrong
              (planned, not built yet).
            </p>
          </div>
        )}

        {step === 'result' && (
          <div>
            <p className="text-sm text-paper/55">Final result &middot; {s.result.basis}</p>
            <ul className="mt-3 space-y-3">
              {s.result.standings.map((r, i) => (
                <li key={r.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold">
                      {i === 0 && <span className="mr-2 text-volt">1st</span>}
                      {r.name}
                    </span>
                    <span className="text-paper/60">{r.score}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-paper/10">
                    <div
                      className={`h-full rounded-full ${i === 0 ? 'bg-volt' : 'bg-paper/45'}`}
                      style={{ width: `${r.percent}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-flare p-3.5 text-sm font-semibold text-ink">
              Forfeit: {s.result.forfeit}
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-paper/45">Illustrative sample. Names and scores are made up.</p>
    </div>
  )
}
