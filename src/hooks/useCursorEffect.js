/**
 * hooks/useCursorEffect.js
 * ─────────────────────────────────────────────────────────────
 * Manages the custom cursor state.
 * Exposes cursor type so components can change cursor appearance
 * on hover (e.g. 'default', 'hover', 'drag', 'text', 'hidden').
 * ─────────────────────────────────────────────────────────────
 */

import { useContext } from 'react'
import { CursorContext } from '@context/CursorContext'

export const useCursorEffect = () => {
  const context = useContext(CursorContext)

  if (!context) {
    throw new Error('useCursorEffect must be used within CursorContext.Provider')
  }

  return context
}
