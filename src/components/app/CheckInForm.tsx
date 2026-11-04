import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Challenge } from '../../types'
import { useDemo } from '../../context/DemoContext'
import { btnPrimary, inputClass } from './styles'

export default function CheckInForm({ challenge }: { challenge: Challenge }) {
  const { submitCheckIn } = useDemo()
  const [note, setNote] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const needsFile = challenge.proofType !== 'Text'

  // Local preview only. The file is never uploaded anywhere.
  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null)
    setError(null)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (needsFile && !file) {
      setError(`Choose an image to submit as ${challenge.proofType.toLowerCase()} proof.`)
      return
    }
    if (!needsFile && note.trim().length < 3) {
      setError('Write a short note describing your progress.')
      return
    }
    submitCheckIn(challenge.id, { note: note.trim(), fileName: file?.name })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {needsFile && (
        <div>
          <label htmlFor="proof-file" className="mb-2 block text-sm font-semibold">
            {challenge.proofType} proof
          </label>
          <input
            id="proof-file"
            type="file"
            accept="image/*"
            onChange={onFile}
            className="block w-full text-sm file:mr-4 file:min-h-10 file:rounded-full file:border-0 file:bg-ink file:px-4 file:text-sm file:font-semibold file:text-paper hover:file:bg-ink/80"
          />
          {preview && (
            <img src={preview} alt="Selected proof preview" className="mt-3 max-h-48 rounded-2xl border border-ink/10" />
          )}
        </div>
      )}

      <div>
        <label htmlFor="proof-note" className="mb-2 block text-sm font-semibold">
          {needsFile ? 'Note (optional)' : 'Describe your progress'}
        </label>
        <textarea
          id="proof-note"
          rows={3}
          value={note}
          onChange={(e) => {
            setNote(e.target.value)
            setError(null)
          }}
          maxLength={280}
          className={inputClass}
          placeholder="What did you do today?"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-flare">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className={btnPrimary}>
          Submit check-in
        </button>
        <p className="text-xs text-ink/55">Demo: proof stays in this browser tab and is not uploaded.</p>
      </div>
    </form>
  )
}
