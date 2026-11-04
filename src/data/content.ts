export const navLinks = [
  { label: 'How it works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Fair scoring', href: '#fairness' },
  { label: 'FAQ', href: '#faq' },
]

export const footerLinks = [...navLinks, { label: 'Privacy', href: '#privacy' }]

// What works in the app demo today vs. what is not built yet.
export const status = {
  works: [
    'Browse sample challenges and filter them by topic',
    'Create a challenge with rules, proof type and scoring',
    'Join a challenge and submit a check-in with a note or image',
    'See a leaderboard, streak and result receipt',
  ],
  caveat:
    'This is a demo. It runs on sample data in your browser tab. Nothing is saved or sent anywhere, and a refresh resets it.',
  planned: [
    'Accounts and sign-in',
    'Saving challenges and check-ins',
    'Inviting friends and sharing a challenge with a link',
    'Flagging and resolving disputed check-ins',
    'Private storage for proof photos',
    'Shareable result cards',
    'Challenge templates and seasons',
  ],
}

export const steps = [
  {
    title: 'Start a challenge',
    text: 'Pick a topic, a length, and how it is scored. Add a forfeit for whoever loses.',
  },
  {
    title: 'Invite your group',
    text: 'Send one link. Friends can preview the challenge before they join.',
  },
  {
    title: 'Prove it daily',
    text: 'Check in with a note or photo. Friends will be able to flag anything that looks off.',
  },
  {
    title: 'Settle it',
    text: 'The season ends, the scores lock, and a result card names the winner and the loser.',
  },
]

export type FeatureStatus = 'demo' | 'planned'

export interface Feature {
  title: string
  text: string
  wide: boolean
  status: FeatureStatus
  note: string
}

export const features: Feature[] = [
  {
    title: 'Proof, not promises',
    text: 'Daily check-ins can carry a photo, screenshot or note, so a challenge works for any topic with no wearable needed.',
    wide: true,
    status: 'demo',
    note: 'Submitting proof works in the demo. Group flagging is planned.',
  },
  {
    title: 'Stakes without money',
    text: 'Set a forfeit at the start: coffee, a dare, picking the next challenge.',
    wide: false,
    status: 'demo',
    note: 'The demo stores a reward line. Enforcing it is up to your group.',
  },
  {
    title: 'Fair scoring',
    text: 'Published rules, valid check-ins only, and optional scoring against your own baseline.',
    wide: false,
    status: 'planned',
    note: 'The demo uses a simple version. See the proposed rules below.',
  },
  {
    title: 'Seasons and rivalries',
    text: 'Every challenge is a short season. Your group keeps its history and head-to-head records.',
    wide: false,
    status: 'planned',
    note: 'Needs accounts and saved data first.',
  },
  {
    title: 'One-tap templates',
    text: 'Start from a ready-made challenge and tweak it, instead of facing a blank page.',
    wide: false,
    status: 'planned',
    note: 'Not built yet.',
  },
]

export const fairness = {
  intro:
    'These are the proposed rules. They are not built yet and may change after we test them with real groups. The demo uses a simplified version.',
  rules: [
    {
      title: 'Only valid check-ins count',
      text: 'A check-in is valid if it is inside the check-in window, includes the required proof type, and has not been removed after a flag.',
    },
    {
      title: 'Consistency challenges',
      text: 'Score = valid check-ins divided by check-ins required, shown as a percentage. Ties are broken by the longest streak, then by who finished first.',
    },
    {
      title: 'Points challenges',
      text: 'Each valid check-in earns 10 points. Everyone earns points the same way, so the leaderboard can be checked by hand.',
    },
    {
      title: 'Baseline mode (optional)',
      text: 'For goals with a number, such as minutes read, a member can be scored on improvement over their own starting level, so a beginner can beat an expert.',
    },
  ],
  disputes: [
    'Any member can flag a check-in and say why.',
    'A flagged check-in is held out of the standings until it is resolved.',
    'The other members vote, and the person who was flagged does not vote on their own check-in.',
    'A majority decides. If the vote is tied or nobody votes within 48 hours, the creator decides.',
    "Flags on the creator's own check-ins are decided by the vote alone.",
  ],
}

export const compare = {
  before: [
    'Scores kept in a spreadsheet someone forgets to update',
    'No way to tell who really did it',
    'The loser quietly forgets the forfeit',
    'Everything buried in 400 messages',
  ],
  after: [
    'Scores calculated from clear, published rules',
    'Check-ins carry proof that members can flag',
    'The forfeit is agreed up front and shown on the result card',
    'A shared history of every season your group has played',
  ],
}

export const privacy = {
  email:
    'We will only use your email to contact you about VYBE early access. We will not sell it or share it with advertisers, and you can ask us to delete it at any time.',
  proof: [
    'Proof photos and screenshots should be visible only to members of that challenge.',
    'Photos should be stored privately, never on a public page or in a public link.',
    'Location data embedded in photos should be removed on upload.',
    'Members should be able to delete their proof, and deleting an account should delete its data.',
  ],
  proofNote:
    'These are the principles we are building toward. Photo upload and storage do not exist yet, and the demo never uploads files.',
  testers:
    'We are looking for small friend groups to test early versions. If that is you, sign up above. Feedback from real testers will appear here once we have it.',
}

export const faqs = [
  {
    q: 'Is VYBE available yet?',
    a: 'Not yet. Today there is an app demo that runs on sample data in your browser, and nothing in it is saved. Sign up for early access and we will email you when real accounts open.',
  },
  {
    q: 'Is it only for fitness?',
    a: 'No. A challenge can be about anything your group agrees on: studying, early mornings, cooking, gaming, saving money, or a dare.',
  },
  {
    q: 'How will you stop people cheating?',
    a: 'This is planned, not built. Check-ins carry proof, any member can flag one, and flagged check-ins stay out of the standings until the group resolves it. See the proposed rules above.',
  },
  {
    q: 'Who decides disputes?',
    a: 'In the proposed rules, a majority vote of the other members decides. The creator only breaks a tie or steps in if nobody votes, so the creator does not simply overrule everyone.',
  },
  {
    q: 'Does it involve real money?',
    a: 'No. Stakes are social: forfeits and bragging rights.',
  },
  {
    q: 'What happens to my email?',
    a: 'It is used only to contact you about early access. See the privacy section for details.',
  },
]
