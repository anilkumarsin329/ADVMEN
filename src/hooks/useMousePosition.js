/**
 * hooks/useMousePosition.js
 * ─────────────────────────────────────────────────────────────
 * Tracks the mouse position in both pixel and normalised
 * (-1 to 1) coordinates. Used by Three.js scenes and the
 * custom cursor component.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react'

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // Normalised coordinates for Three.js (-1 to 1)
  const normalised = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      normalised.current = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return { position, normalised }
}
