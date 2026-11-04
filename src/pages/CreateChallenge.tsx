import CreateChallengeForm from '../components/app/CreateChallengeForm'
import PageHeader from '../components/app/PageHeader'
import { usePageTitle } from '../lib/usePageTitle'

export default function CreateChallenge() {
  usePageTitle('Create challenge')
  return (
    <div>
      <PageHeader
        title="Create a challenge"
        subtitle="Set the rules, pick how it is scored, and decide what is at stake."
      />
      <CreateChallengeForm />
    </div>
  )
}
