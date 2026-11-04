// SAMPLE DATA for the landing-page preview. Names and scores are fictional.
export interface Standing {
  name: string
  score: string
  percent: number
}

export interface PreviewScenario {
  id: string
  chip: string
  category: string
  title: string
  meta: string[]
  rules: string
  stakes: string
  proof: {
    by: string
    time: string
    kind: 'text' | 'photo' | 'screenshot'
    text?: string
    caption?: string
  }
  result: {
    basis: string
    standings: Standing[]
    forfeit: string
  }
}

export const previewScenarios: PreviewScenario[] = [
  {
    id: 'study',
    chip: 'Study',
    category: 'Study',
    title: 'Exam Prep Sprint',
    meta: ['21 days', 'Daily check-in', 'Text proof'],
    rules: 'Two sentences on what you studied. At least 45 minutes of focused work.',
    stakes: 'Last place buys snacks for the next study night.',
    proof: {
      by: 'Riya',
      time: '9:40 PM',
      kind: 'text',
      text: 'Finished two chapters of organic chemistry and did 20 practice problems.',
    },
    result: {
      basis: 'Ranked by valid check-ins',
      standings: [
        { name: 'Riya', score: '20 of 21', percent: 95 },
        { name: 'Kabir', score: '18 of 21', percent: 86 },
        { name: 'Neha', score: '17 of 21', percent: 81 },
        { name: 'Dev', score: '12 of 21', percent: 57 },
      ],
      forfeit: 'Dev buys snacks for the next study night.',
    },
  },
  {
    id: 'cooking',
    chip: 'Lifestyle',
    category: 'Lifestyle',
    title: 'Cook at Home Streak',
    meta: ['14 days', 'Daily check-in', 'Photo proof'],
    rules: 'Photograph the plate. Takeaway and reheated meals do not count.',
    stakes: 'Last place cooks for everyone on Sunday.',
    proof: {
      by: 'Mira',
      time: '8:15 PM',
      kind: 'photo',
      caption: "Sample photo: tonight's dinner",
    },
    result: {
      basis: 'Ranked by valid check-ins',
      standings: [
        { name: 'Mira', score: '14 of 14', percent: 100 },
        { name: 'Neha', score: '12 of 14', percent: 86 },
        { name: 'Aman', score: '10 of 14', percent: 71 },
        { name: 'Sana', score: '7 of 14', percent: 50 },
      ],
      forfeit: 'Sana cooks for everyone on Sunday.',
    },
  },
  {
    id: 'gaming',
    chip: 'Gaming',
    category: 'Gaming',
    title: 'Ranked Ladder Climb',
    meta: ['21 days', 'Weekly check-in', 'Screenshot proof'],
    rules: 'One screenshot of your rank screen each week, with the date visible.',
    stakes: 'Last place plays support for a week.',
    proof: {
      by: 'Ishaan',
      time: 'Sunday, 6:05 PM',
      kind: 'screenshot',
      caption: 'Sample screenshot: weekly rank screen',
    },
    result: {
      basis: 'Ranked by points (10 per valid check-in)',
      standings: [
        { name: 'Ishaan', score: '30 pts', percent: 100 },
        { name: 'Aman', score: '20 pts', percent: 67 },
        { name: 'Dev', score: '20 pts', percent: 67 },
        { name: 'Kabir', score: '10 pts', percent: 33 },
      ],
      forfeit: 'Kabir plays support for a week.',
    },
  },
]
