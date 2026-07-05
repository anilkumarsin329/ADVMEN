/* eslint-disable react-refresh/only-export-components */
/**
 * context/CursorContext.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Custom Cursor Context
 *
 * Provides cursor type state globally so any component can
 * change the cursor appearance without prop drilling.
 *
 * Cursor types:
 *  'default' → standard circle cursor
 *  'hover'   → enlarged cursor (links, buttons)
 *  'drag'    → drag indicator (carousels)
 *  'text'    → text cursor (editable fields)
 *  'hidden'  → invisible (video players)
 * ─────────────────────────────────────────────────────────────
 */

import { createContext, useState, useCallback } from 'react'

export const CursorContext = createContext(null)

export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState('default')
  const [isVisible,  setIsVisible]  = useState(false)

  const setCursor  = useCallback((type) => setCursorType(type), [])
  const showCursor = useCallback(() => setIsVisible(true),  [])
  const hideCursor = useCallback(() => setIsVisible(false), [])

  return (
    <CursorContext.Provider value={{ cursorType, isVisible, setCursor, showCursor, hideCursor }}>
      {children}
    </CursorContext.Provider>
  )
}
