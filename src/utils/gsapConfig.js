/**
 * utils/gsapConfig.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — GSAP Global Configuration
 *
 * Registers all GSAP plugins in one place.
 * Import this file once at the app root (main.jsx or App.jsx).
 *
 * Plugins registered:
 *  - ScrollTrigger  → scroll-based animations
 *  - ScrollToPlugin → programmatic scroll
 *  - TextPlugin     → text scramble effects
 * ─────────────────────────────────────────────────────────────
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'

// Register all plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)

// ── Global GSAP Defaults ──────────────────────────────────────
gsap.defaults({
  ease:     'expo.out',
  duration: 0.6,
})

// ── ScrollTrigger Global Config ───────────────────────────────
ScrollTrigger.config({
  // Prevents layout shift during scroll calculations
  ignoreMobileResize: true,
  // Auto-refresh on resize
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
})

// ── Utility: Create a GSAP context (for cleanup in React) ─────
/**
 * Creates a scoped GSAP context tied to a React ref.
 * Always call ctx.revert() in the useEffect cleanup.
 *
 * @param {Function} fn - Animation setup function
 * @param {React.RefObject} scope - Ref to the container element
 * @returns {gsap.Context}
 */
export const createGsapContext = (fn, scope) => {
  return gsap.context(fn, scope)
}

// ── Utility: Refresh ScrollTrigger ───────────────────────────
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}

// ── Utility: Kill all ScrollTriggers (page transitions) ───────
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

export { gsap, ScrollTrigger, ScrollToPlugin, TextPlugin }
