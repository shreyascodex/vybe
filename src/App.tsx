import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { DemoProvider } from './context/DemoContext'
import AppLayout from './layout/AppLayout'
import ChallengeDetail from './pages/ChallengeDetail'
import CreateChallenge from './pages/CreateChallenge'
import Dashboard from './pages/Dashboard'
import Explore from './pages/Explore'
import Landing from './pages/Landing'
import MyChallenges from './pages/MyChallenges'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'

// Scroll to the top on page changes, but leave in-page anchors (#how, #faq) alone.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <DemoProvider>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="explore" element={<Explore />} />
            <Route path="challenges" element={<MyChallenges />} />
            <Route path="challenges/create" element={<CreateChallenge />} />
            <Route path="challenges/:id" element={<ChallengeDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound inApp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DemoProvider>
    </BrowserRouter>
  )
}
