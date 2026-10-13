/**
 * components/layout/Layout.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — Root Layout
 *
 * • Lenis smooth scroll (synced to GSAP ScrollTrigger)
 * • ScrollProgress bar
 * • FloatingActions (WhatsApp, Call, ScrollToTop)
 * • Navbar + Footer wrapper
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useLayoutEffect, useRef } from 'react'
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

  // Never let the browser restore a stale scroll offset between routes
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  // Always land at the top of the new page (route + query change).
  // Runs before paint, then re-asserts after the exit/enter transition so a
  // long page that shrinks/grows can't leave the viewport mid-page.
  useLayoutEffect(() => {
    if (location.hash) return
    const html = document.documentElement
    const toTop = () => {
      html.style.scrollBehavior = 'auto'
      window.scrollTo(0, 0)
      html.scrollTop = 0
      document.body.scrollTop = 0
      const lenis = lenisRef.current
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
      ScrollTrigger.refresh()
    }
    toTop()
    const t1 = setTimeout(toTop, 60)
    const t2 = setTimeout(() => { toTop(); html.style.scrollBehavior = '' }, 420)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [location.pathname, location.search, location.hash])

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
    window.__lenis = lenis

    // Sync Lenis scroll position to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for the RAF loop — avoids double RAF
    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      if (window.__lenis === lenis) window.__lenis = null
    }
  }, [])

  return (
    <div
      className="relative min-h-screen overflow-x-clip"
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
