import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import Compare from '../components/Compare'
import Faq from '../components/Faq'
import Footer from '../components/Footer'

export default function Landing() {
  useEffect(() => {
    document.title = 'VYBE | Prove it. Score it. Settle it.'
  }, [])

  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Compare />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
