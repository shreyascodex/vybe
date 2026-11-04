// Local demo state. Everything lives in React state inside the browser tab:
// there is no server, no database and no persistence. A page refresh resets it.
import { createContext, useContext, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type {
  Activity,
  ActivityKind,
  Challenge,
  CheckInProof,
  NewChallengeInput,
  Toast,
  UserProfile,
} from '../types'
import { demoUser, initialActivity, initialChallenges, initialStreak } from '../data/mock'
import { canCheckIn } from '../lib/challenge'
import { diffDays, todayISO } from '../lib/dates'

interface DemoContextValue {
  user: UserProfile
  challenges: Challenge[]
  activity: Activity[]
  streak: number
  toasts: Toast[]
  joinChallenge: (id: string) => void
  createChallenge: (input: NewChallengeInput) => string
  submitCheckIn: (id: string, proof: CheckInProof) => void
  dismissToast: (id: number) => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges)
  const [activity, setActivity] = useState<Activity[]>(initialActivity)
  const [streak, setStreak] = useState(initialStreak.count)
  const [streakDate, setStreakDate] = useState(initialStreak.lastDate)
  const [toasts, setToasts] = useState<Toast[]>([])
  const counter = useRef(0)

  function nextId(): number {
    counter.current += 1
    return counter.current
  }

  function notify(message: string) {
    const id = nextId()
    setToasts((list) => [...list, { id, message }])
    window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3500)
  }

  function dismissToast(id: number) {
    setToasts((list) => list.filter((t) => t.id !== id))
  }

  function addActivity(kind: ActivityKind, actor: string, text: string) {
    const entry: Activity = { id: `a-${nextId()}-${Date.now()}`, kind, actor, text, at: Date.now() }
    setActivity((list) => [entry, ...list])
  }

  function joinChallenge(id: string) {
    const target = challenges.find((c) => c.id === id)
    if (!target || target.joined) return
    setChallenges((list) =>
      list.map((c) => (c.id === id ? { ...c, joined: true, participants: c.participants + 1 } : c)),
    )
    addActivity('join', 'You', `joined ${target.title}`)
    notify(`Demo: you joined ${target.title} (not saved)`)
  }

  function createChallenge(input: NewChallengeInput): string {
    const id = `created-${nextId()}-${Date.now()}`
    const challenge: Challenge = {
      ...input,
      id,
      creatorId: demoUser.id,
      creatorName: 'You',
      participants: 1,
      members: [],
      joined: true,
      myCheckIns: 0,
      lastCheckInDate: null,
    }
    setChallenges((list) => [challenge, ...list])
    addActivity('create', 'You', `created ${input.title}`)
    notify('Demo: challenge created (not saved)')
    return id
  }

  function submitCheckIn(id: string, _proof: CheckInProof) {
    const target = challenges.find((c) => c.id === id)
    if (!target || !canCheckIn(target)) return
    const today = todayISO()
    setChallenges((list) =>
      list.map((c) =>
        c.id === id ? { ...c, myCheckIns: c.myCheckIns + 1, lastCheckInDate: today } : c,
      ),
    )
    if (streakDate !== today) {
      setStreak((s) => (diffDays(streakDate, today) === 1 ? s + 1 : 1))
      setStreakDate(today)
    }
    addActivity('proof', 'You', `submitted proof in ${target.title}`)
    notify('Demo: check-in recorded (not saved)')
  }

  const value: DemoContextValue = {
    user: demoUser,
    challenges,
    activity,
    streak,
    toasts,
    joinChallenge,
    createChallenge,
    submitCheckIn,
    dismissToast,
  }

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used inside <DemoProvider>')
  return ctx
}
