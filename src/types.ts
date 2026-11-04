export const CATEGORIES = [
  'Fitness',
  'Study',
  'Productivity',
  'Gaming',
  'Lifestyle',
  'Other',
] as const
export type Category = (typeof CATEGORIES)[number]

export const PROOF_TYPES = ['Photo', 'Text', 'Screenshot'] as const
export type ProofType = (typeof PROOF_TYPES)[number]

export const SCORING_METHODS = ['Consistent check-ins', 'Points-based'] as const
export type ScoringMethod = (typeof SCORING_METHODS)[number]

export const FREQUENCIES = ['Daily', 'Weekdays', 'Weekly'] as const
export type Frequency = (typeof FREQUENCIES)[number]

export type Visibility = 'public' | 'private'
export type ChallengeStatus = 'upcoming' | 'active' | 'completed'

export interface Member {
  name: string
  checkIns: number
}

export interface Challenge {
  id: string
  title: string
  description: string
  category: Category
  visibility: Visibility
  startDate: string // YYYY-MM-DD
  durationDays: number
  frequency: Frequency
  proofType: ProofType
  scoring: ScoringMethod
  rules: string
  reward?: string
  creatorId: string
  creatorName: string
  participants: number
  members: Member[] // other members shown on the leaderboard (not including you)
  joined: boolean
  myCheckIns: number
  lastCheckInDate: string | null
}

export type NewChallengeInput = Pick<
  Challenge,
  | 'title'
  | 'description'
  | 'category'
  | 'visibility'
  | 'startDate'
  | 'durationDays'
  | 'frequency'
  | 'proofType'
  | 'scoring'
  | 'rules'
  | 'reward'
>

export interface CheckInProof {
  note: string
  fileName?: string
}

export type ActivityKind = 'proof' | 'checkin' | 'milestone' | 'join' | 'create'

export interface Activity {
  id: string
  kind: ActivityKind
  actor: string
  text: string
  at: number // epoch ms
}

export interface UserProfile {
  id: string
  name: string
  username: string
  bio: string
  memberSince: string
}

export interface Toast {
  id: number
  message: string
}
