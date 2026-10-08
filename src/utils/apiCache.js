/**
 * apiCache.js — Simple in-memory + sessionStorage API cache
 * Data persists for the browser session so repeat visits don't re-fetch.
 */

const TTL_MS = 10 * 60 * 1000 // 10 minutes

const memCache = {}

export const cachedFetch = async (url) => {
  const now = Date.now()

  // 1. Check in-memory cache first (fastest)
  if (memCache[url] && now - memCache[url].ts < TTL_MS) {
    return memCache[url].data
  }

  // 2. Check sessionStorage (survives page navigation within same tab)
  try {
    const stored = sessionStorage.getItem(`apicache:${url}`)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (now - parsed.ts < TTL_MS) {
        memCache[url] = parsed
        return parsed.data
      }
    }
  } catch (_) {}

  // 3. Fetch from network
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()

  const entry = { data, ts: now }
  memCache[url] = entry

  try {
    sessionStorage.setItem(`apicache:${url}`, JSON.stringify(entry))
  } catch (_) {}

  return data
}
