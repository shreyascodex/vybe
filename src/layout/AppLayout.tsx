import { Outlet } from 'react-router-dom'
import ToastHost from '../components/app/ToastHost'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import MobileNav from './MobileNav'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      <AppSidebar />
      <div className="flex min-w-0 flex-col">
        <AppHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-14 lg:pt-8">
          <p className="mb-6 rounded-2xl border border-ink/10 bg-sand/70 px-4 py-3 text-xs leading-relaxed text-ink/70">
            <strong className="font-semibold text-ink">Demo mode.</strong> Challenges, members and
            check-ins are sample data held in this browser tab. Nothing is sent to a server or saved,
            and a refresh resets everything.
          </p>
          <Outlet />
        </main>
      </div>
      <MobileNav />
      <ToastHost />
    </div>
  )
}
