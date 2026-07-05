/**
 * components/common/ScrollProgress.jsx
 * ─────────────────────────────────────────────────────────────
 * Thin orange progress bar fixed at the top of the viewport.
 * Driven by native scroll position — no library needed.
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@utils/gsapConfig'

const ScrollProgress = () => {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      const progress   = docHeight > 0 ? scrollTop / docHeight : 0
      gsap.set(bar, { scaleX: progress, transformOrigin: 'left' })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--gradient-orange)',
        zIndex: 'calc(var(--z-sticky) + 1)',
        transformOrigin: 'left',
        scaleX: 0,
        willChange: 'transform',
        boxShadow: '0 0 8px rgba(255,107,0,0.5)',
        pointerEvents: 'none',
      }}
    />
  )
}

export default ScrollProgress
