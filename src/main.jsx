/**
 * main.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Application Entry Point
 *
 * Imports the global stylesheet first (critical for Tailwind
 * base styles to apply before any component renders).
 * ─────────────────────────────────────────────────────────────
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Global styles — must be first import
import '@/styles/globals.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
