/**
 * hooks/useInView.js
 * ─────────────────────────────────────────────────────────────
 * Lightweight wrapper around IntersectionObserver.
 * Returns a [ref, isInView] tuple.
 * Used to trigger CSS/GSAP animations when elements enter viewport.
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from 'react'

/**
 * @param {Object} options
 * @param {number}  options.threshold  - 0–1, default 0.1
 * @param {string}  options.rootMargin - CSS margin, default '0px'
 * @param {boolean} options.once       - Only trigger once, default true
 */
export const useInView = ({
  threshold  = 0.1,
  rootMargin = '0px',
  once       = true,
} = {}) => {
  const ref       = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isInView]
}
