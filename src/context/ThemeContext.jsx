/* eslint-disable react-refresh/only-export-components */
/**
 * context/ThemeContext.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Theme Context
 *
 * Currently manages the dark luxury theme.
 * Scaffolded for future light mode toggle if needed.
 * ─────────────────────────────────────────────────────────────
 */

import { createContext, useState, useCallback, useContext } from 'react'

export const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  // ADVMEN is dark-first; light mode is a future feature
  const [theme, setTheme] = useState('dark')

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme} className="min-h-screen">
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
