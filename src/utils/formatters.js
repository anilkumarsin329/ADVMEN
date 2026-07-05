/**
 * utils/formatters.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — General Utility Functions
 * ─────────────────────────────────────────────────────────────
 */

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes safely, resolving conflicts.
 * Use this instead of template literals for conditional classes.
 *
 * @param {...any} inputs - Class names or conditional objects
 * @returns {string}
 */
export const cn = (...inputs) => twMerge(clsx(inputs))

/**
 * Formats a number with commas (e.g. 1000 → "1,000").
 * @param {number} num
 */
export const formatNumber = (num) =>
  new Intl.NumberFormat('en-IN').format(num)

/**
 * Truncates a string to a given length with ellipsis.
 * @param {string} str
 * @param {number} maxLength
 */
export const truncate = (str, maxLength = 100) =>
  str.length > maxLength ? `${str.slice(0, maxLength)}...` : str

/**
 * Converts a string to a URL-safe slug.
 * @param {string} str
 */
export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Delays execution for a given number of milliseconds.
 * @param {number} ms
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Checks if the current device is a touch device.
 */
export const isTouchDevice = () =>
  'ontouchstart' in window || navigator.maxTouchPoints > 0

/**
 * Checks if the current device is mobile (< 768px).
 */
export const isMobile = () => window.innerWidth < 768

/**
 * Clamps a number between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max)
