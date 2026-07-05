/**
 * hooks/useWindowSize.js
 * ─────────────────────────────────────────────────────────────
 * Returns the current window dimensions, updated on resize.
 * Used to conditionally enable/disable Three.js on mobile.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width:  typeof window !== 'undefined' ? window.innerWidth  : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    let timeoutId

    const handleResize = () => {
      // Debounce resize events
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
      }, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return size
}
