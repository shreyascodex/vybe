import { Link } from 'react-router-dom'
import EmptyState from '../components/app/EmptyState'
import { btnPrimary } from '../components/app/styles'
import { usePageTitle } from '../lib/usePageTitle'

interface NotFoundProps {
  inApp?: boolean
}

export default function NotFound({ inApp = false }: NotFoundProps) {
  usePageTitle('Page not found')
  const content = (
    <EmptyState
      title="This page does not exist"
      text="The link may be wrong or the page may have moved."
      action={
        <Link to={inApp ? '/app' : '/'} className={btnPrimary}>
          {inApp ? 'Back to dashboard' : 'Back to VYBE'}
        </Link>
      }
    />
  )
  if (inApp) return content
  return <div className="mx-auto max-w-lg px-5 py-24">{content}</div>
}
