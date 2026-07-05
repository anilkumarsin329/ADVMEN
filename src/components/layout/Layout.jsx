/**
 * components/layout/Layout.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Root Layout
 *
 * • Lenis smooth scroll (synced to GSAP ScrollTrigger)
 * • ScrollProgress bar
 * • FloatingActions (WhatsApp, Call, ScrollToTop)
 * • Navbar + Footer wrapper
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@utils/gsapConfig'
import Navbar          from './Navbar'
import Footer          from './Footer'
import ScrollProgress  from '@components/common/ScrollProgress'
import FloatingActions from '@components/common/FloatingActions'
import ChatWidget      from '@components/common/ChatWidget'

const Layout = ({ children }) => {
  const lenisRef = useRef(null)
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [location.pathname])

  useEffect(() => {
    const lenis = new Lenis({
      duration:        1.2,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:     'vertical',
      smoothWheel:     true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll position to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for the RAF loop — avoids double RAF
    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: 'var(--color-black)' }}
    >
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Fixed navigation */}
      <Navbar />

      {/* Page content */}
      <main id="main-content" role="main">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating action buttons */}
      <FloatingActions />

      {/* Chat widget */}
      <ChatWidget />
    </div>
  )
}

export default Layout
