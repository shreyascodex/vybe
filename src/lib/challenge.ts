import type { Challenge, ChallengeStatus, Member } from '../types'
import { addDays, diffDays, formatDate, parseISO, todayISO } from './dates'

export function endDate(c: Challenge): string {
  return addDays(c.startDate, c.durationDays - 1)
}

export function getStatus(c: Challenge): ChallengeStatus {
  const today = todayISO()
  if (today < c.startDate) return 'upcoming'
  if (today > endDate(c)) return 'completed'
  return 'active'
}

/** Current day of the challenge (0 if not started, capped at the duration). */
export function dayNumber(c: Challenge): number {
  const n = diffDays(c.startDate, todayISO()) + 1
  return Math.min(Math.max(n, 0), c.durationDays)
}

export function timeProgress(c: Challenge): number {
  return Math.round((dayNumber(c) / c.durationDays) * 100)
}

export function requiredCheckIns(c: Pick<Challenge, 'durationDays' | 'frequency'>): number {
  switch (c.frequency) {
    case 'Daily':
      return c.durationDays
    case 'Weekdays':
      return Math.round((c.durationDays * 5) / 7)
    case 'Weekly':
      return Math.ceil(c.durationDays / 7)
  }
}

function isWeekend(iso: string): boolean {
  const dow = parseISO(iso).getDay()
  return dow === 0 || dow === 6
}

export function canCheckIn(c: Challenge): boolean {
  if (!c.joined || getStatus(c) !== 'active') return false
  const today = todayISO()
  if (c.lastCheckInDate === today) return false
  if (c.frequency === 'Weekly' && c.lastCheckInDate && diffDays(c.lastCheckInDate, today) < 7) {
    return false
  }
  if (c.frequency === 'Weekdays' && isWeekend(today)) return false
  return true
}

export interface CheckInState {
  label: string
  tone: 'done' | 'due' | 'idle'
}

export function checkInState(c: Challenge): CheckInState {
  const status = getStatus(c)
  if (status === 'upcoming') return { label: 'Not started', tone: 'idle' }
  if (status === 'completed') return { label: 'Finished', tone: 'idle' }
  if (canCheckIn(c)) return { label: 'Check-in due', tone: 'due' }
  if (c.lastCheckInDate === todayISO()) return { label: 'Checked in today', tone: 'done' }
  if (c.frequency === 'Weekly' && c.lastCheckInDate) return { label: 'Checked in this week', tone: 'done' }
  return { label: 'Rest day', tone: 'idle' }
}

export function nextCheckInLabel(c: Challenge): string {
  const status = getStatus(c)
  if (status === 'upcoming') return `Starts ${formatDate(c.startDate)}`
  if (status === 'completed') return 'Challenge ended'
  const today = todayISO()
  if (c.frequency === 'Weekly') {
    if (c.lastCheckInDate && diffDays(c.lastCheckInDate, today) < 7) {
      return `Next by ${formatDate(addDays(c.lastCheckInDate, 7))}`
    }
    return 'Due this week'
  }
  const dow = parseISO(today).getDay()
  if (c.frequency === 'Weekdays' && (dow === 0 || dow === 6)) return 'Next: Monday'
  if (c.lastCheckInDate !== today) return 'Due today, 11:59 PM'
  if (c.frequency === 'Weekdays' && dow === 5) return 'Next: Monday'
  return 'Next: tomorrow'
}

export interface LeaderboardEntry extends Member {
  isYou: boolean
  rank: number
}

export function leaderboard(c: Challenge): LeaderboardEntry[] {
  const all: Member[] = [...c.members]
  if (c.joined) all.push({ name: 'You', checkIns: c.myCheckIns })
  return all
    .map((m) => ({ ...m, isYou: m.name === 'You' && c.joined }))
    .sort((a, b) => b.checkIns - a.checkIns)
    .map((m, i) => ({ ...m, rank: i + 1 }))
}

export function myRank(c: Challenge): number | null {
  return leaderboard(c).find((e) => e.isYou)?.rank ?? null
}
