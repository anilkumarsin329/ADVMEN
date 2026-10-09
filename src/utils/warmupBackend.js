/**
 * warmupBackend.js
 * Render.com free tier cold start fix.
 * Sends a lightweight ping to backend on app load so it wakes up
 * before user actually needs data.
 */

import { API_BASE_URL } from './constants'

export const warmupBackend = () => {
  // Only in production
  if (
    typeof window === 'undefined' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) return

  // Fire and forget — don't block anything
  fetch(`${API_BASE_URL}/api/health`, {
    method: 'GET',
    signal: AbortSignal.timeout(15000),
  }).catch(() => {
    // Silent fail — warmup is best-effort
  })
}
