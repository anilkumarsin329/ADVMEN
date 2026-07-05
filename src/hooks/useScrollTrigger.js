/**
 * hooks/useScrollTrigger.js
 * ─────────────────────────────────────────────────────────────
 * Wraps GSAP ScrollTrigger setup inside a React hook.
 * Handles context creation and cleanup automatically.
 *
 * Usage:
 *   const containerRef = useScrollTrigger((gsap, container) => {
 *     gsap.from('.my-element', { opacity: 0, y: 40, scrollTrigger: { ... } })
 *   })
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'

/**
 * @param {Function} animationFn - Receives (gsap, containerEl)
 * @param {Array}    deps        - useEffect dependency array
 */
export const useScrollTrigger = (animationFn, deps = []) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationFn(gsap, containerRef.current)
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}
