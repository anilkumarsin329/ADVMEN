/* eslint-disable react-refresh/only-export-components */
/**
 * context/LoaderContext.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — Page Loader Context
 *
 * Controls the global preloader state.
 * When isLoading is true, the Preloader component is visible.
 * Once assets are ready, call setLoadingComplete() to dismiss.
 * ─────────────────────────────────────────────────────────────
 */

import { createContext, useState, useCallback } from 'react'

export const LoaderContext = createContext(null)

export const LoaderProvider = ({ children }) => {
  const [isLoading,     setIsLoading]     = useState(false)
  const [progress,      setProgress]      = useState(100)
  const [startEntrance, setStartEntrance] = useState(true)

  const setLoadingComplete = useCallback(() => {
    setProgress(100)
    // Small delay so the 100% state is visible before dismissal
    setTimeout(() => setIsLoading(false), 200)
  }, [])

  const updateProgress = useCallback((value) => {
    setProgress(Math.min(Math.max(value, 0), 100))
  }, [])

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        progress,
        setLoadingComplete,
        updateProgress,
        startEntrance,
        setStartEntrance,
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}
