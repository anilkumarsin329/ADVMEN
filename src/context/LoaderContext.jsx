/* eslint-disable react-refresh/only-export-components */
/**
 * context/LoaderContext.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Page Loader Context
 *
 * Controls the global preloader state.
 * When isLoading is true, the Preloader component is visible.
 * Once assets are ready, call setLoadingComplete() to dismiss.
 * ─────────────────────────────────────────────────────────────
 */

import { createContext, useState, useCallback } from 'react'

export const LoaderContext = createContext(null)

export const LoaderProvider = ({ children }) => {
  const [isLoading,   setIsLoading]   = useState(true)
  const [progress,    setProgress]    = useState(0)

  const setLoadingComplete = useCallback(() => {
    setProgress(100)
    // Small delay so the 100% state is visible before dismissal
    setTimeout(() => setIsLoading(false), 600)
  }, [])

  const updateProgress = useCallback((value) => {
    setProgress(Math.min(Math.max(value, 0), 100))
  }, [])

  return (
    <LoaderContext.Provider value={{ isLoading, progress, setLoadingComplete, updateProgress }}>
      {children}
    </LoaderContext.Provider>
  )
}
