/**
 * apiCache.js — Stale-while-revalidate API cache
 *
 * The backend runs on Render's free tier and can take 20-30s to wake up.
 * To keep the site instant:
 *  - Responses are persisted in localStorage (survives tabs & revisits)
 *  - Fresh data (< FRESH_MS) is returned without any network call
 *  - Stale data (< MAX_STALE_MS) is returned immediately and refreshed
 *    in the background, so a sleeping backend never blocks rendering
 *  - Identical in-flight requests are shared
 */

const FRESH_MS = 5 * 60 * 1000              // serve without refetch
const MAX_STALE_MS = 7 * 24 * 60 * 60 * 1000 // serve stale + revalidate
const FETCH_TIMEOUT_MS = 30000
const CACHE_VERSION = 'v3'

const memCache = {}
const inflight = {}

const keyFor = (url) => `apicache:${CACHE_VERSION}:${url}`

const readStored = (url) => {
  try {
    const stored = localStorage.getItem(keyFor(url))
    return stored ? JSON.parse(stored) : null
  } catch (_) {
    return null
  }
}

const writeStored = (url, entry) => {
  try {
    localStorage.setItem(keyFor(url), JSON.stringify(entry))
  } catch (_) {}
}

const network = (url) => {
  if (inflight[url]) return inflight[url]

  inflight[url] = fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    })
    .then((data) => {
      const entry = { data, ts: Date.now() }
      memCache[url] = entry
      writeStored(url, entry)
      return data
    })
    .finally(() => {
      delete inflight[url]
    })

  return inflight[url]
}

export const cachedFetch = async (url) => {
  const now = Date.now()
  const entry = memCache[url] || readStored(url)

  if (entry && now - entry.ts < MAX_STALE_MS) {
    memCache[url] = entry
    if (now - entry.ts >= FRESH_MS) {
      // Stale: show it now, refresh quietly for the next view
      network(url).catch(() => {})
    }
    return entry.data
  }

  return network(url)
}
