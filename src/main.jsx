/**
 * main.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — Application Entry Point
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
import { warmupBackend } from '@/utils/warmupBackend'

// Wake up Render.com backend immediately on page load
warmupBackend()

const rootEl = document.getElementById('root')

// Prerendered HTML (see scripts/prerender.mjs) stays on screen, in an overlay, until the
// app has rendered its first frame — no blank flash, and crawlers still read it in #root.
if (rootEl.hasAttribute('data-prerendered') && rootEl.firstChild) {
  const overlay = document.createElement('div')
  overlay.id = 'prerender-overlay'
  overlay.setAttribute('aria-hidden', 'true')
  overlay.append(...rootEl.childNodes)
  document.body.appendChild(overlay)
  rootEl.removeAttribute('data-prerendered')

  // The prerendered <head> tags are replaced by react-helmet-async's own, so route changes
  // update them instead of leaving stale duplicates (e.g. an old canonical) behind.
  document.head
    .querySelectorAll(
      'title, meta[name="description"], meta[name="keywords"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], script[type="application/ld+json"]:not(#static-schema)'
    )
    .forEach((el) => el.remove())

  const dismiss = () => { observer.disconnect(); overlay.remove() }
  const observer = new MutationObserver(() => { if (rootEl.childElementCount > 0) dismiss() })
  observer.observe(rootEl, { childList: true })
  setTimeout(dismiss, 6000)
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
)
