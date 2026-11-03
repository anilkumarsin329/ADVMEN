/**
 * scripts/prerender.mjs
 * ─────────────────────────────────────────────────────────────
 * Post-build prerender. Serves `dist/` locally, opens every public route in
 * headless Chromium, and saves the rendered HTML to `dist/<route>/index.html`
 * so crawlers get the H1, copy, FAQ, links, canonical, OG/Twitter tags and
 * JSON-LD in the raw HTML ("view-source").
 *
 *  - The untouched SPA shell is kept as `dist/app-shell.html` and is what
 *    Vercel serves for routes that are not prerendered (see vercel.json).
 *  - API calls are blocked while rendering, so output is deterministic
 *    (static fallback data) and never bakes in stale DB content.
 *  - Best effort: if no browser is available, or a route fails, the build still
 *    succeeds and that route simply stays a normal client-rendered page.
 *    Set PRERENDER_STRICT=1 to fail the build instead.
 *
 * Env: CHROME_PATH (browser binary), PRERENDER_STRICT, PRERENDER_SKIP=1
 * ─────────────────────────────────────────────────────────────
 */

import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const SITE = 'https://www.advmen.com'
const STRICT = process.env.PRERENDER_STRICT === '1'
const CONCURRENCY = 3

// Public routes that are not (or should not be) listed in sitemap.xml
const EXTRA_ROUTES = [
  '/digital-marketing-services-usa',
  '/digital-marketing-services-uae',
  '/digital-marketing-services-europe',
  '/services/android-app-development',
  '/data-deletion',
]

// Routes that intentionally point their canonical at another URL
const ALIAS_ROUTES = new Set(['/services/android-app-development'])

const log = (...a) => console.log('[prerender]', ...a)
const bail = (msg) => {
  console.warn(`[prerender] ${msg}`)
  process.exit(STRICT ? 1 : 0)
}

if (process.env.PRERENDER_SKIP === '1') bail('PRERENDER_SKIP=1, skipping.')
if (!fs.existsSync(path.join(DIST, 'index.html'))) bail('dist/index.html not found. Run `vite build` first.')

// ── Pristine SPA shell (never overwritten once saved) ───────────
const shellPath = path.join(DIST, 'app-shell.html')
if (!fs.existsSync(shellPath)) fs.copyFileSync(path.join(DIST, 'index.html'), shellPath)
const shell = fs.readFileSync(shellPath)

// ── Route list ──────────────────────────────────────────────────
const routes = new Set(['/'])
const sitemapFile = path.join(ROOT, 'public', 'sitemap.xml')
if (fs.existsSync(sitemapFile)) {
  for (const m of fs.readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    routes.add(new URL(m[1]).pathname.replace(/\/+$/, '') || '/')
  }
}
EXTRA_ROUTES.forEach((r) => routes.add(r))
try {
  const { featuredCaseStudies } = await import(pathToFileURL(path.join(ROOT, 'src/data/caseStudies.js')).href)
  featuredCaseStudies.forEach((c) => routes.add(`/work/${c.slug}`))
} catch (e) {
  log('could not read featured case studies:', e.message)
}

// ── Browser ─────────────────────────────────────────────────────
const findLocalBrowser = () => {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)
  return candidates.find((p) => fs.existsSync(p))
}

let browser
try {
  const { default: puppeteer } = await import('puppeteer-core')
  let launch = { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
  const local = findLocalBrowser()
  if (local) {
    launch.executablePath = local
  } else {
    const { default: chromium } = await import('@sparticuz/chromium')
    launch = { headless: 'shell', args: chromium.args, executablePath: await chromium.executablePath() }
  }
  browser = await puppeteer.launch(launch)
  log('browser:', launch.executablePath)
} catch (e) {
  bail(`no usable browser (${e.message}). Leaving the SPA build as is.`)
}

// ── Static server with SPA fallback ─────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.xml': 'application/xml', '.txt': 'text/plain', '.mp4': 'video/mp4',
}
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const file = path.normalize(path.join(DIST, pathname))
  const isAsset = file.startsWith(DIST) && pathname !== '/' && fs.existsSync(file) && fs.statSync(file).isFile()
    && !file.endsWith(`${path.sep}index.html`) && !file.endsWith('app-shell.html')
  if (isAsset) {
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  } else {
    res.writeHead(200, { 'Content-Type': MIME['.html'] })
    res.end(shell)
  }
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const PORT = server.address().port
// "localhost" so the app treats this as a local environment (no warmup ping, etc.)
const ORIGIN = `http://localhost:${PORT}`

// ── Page cleanup that runs inside the browser before serialising ─
const tidyDocument = () => {
  const lastOnly = (selector) => {
    const groups = new Map()
    document.head.querySelectorAll(selector).forEach((el) => {
      const key = el.getAttribute('name') || el.getAttribute('property') || el.getAttribute('rel')
      groups.set(key, [...(groups.get(key) || []), el])
    })
    groups.forEach((els) => els.slice(0, -1).forEach((el) => el.remove()))
  }
  // Helmet appends after the static defaults, so the last tag of each kind is the page's own
  lastOnly('meta[name="description"], meta[name="keywords"], meta[name="robots"], link[rel="canonical"]')
  lastOnly('meta[property^="og:"], meta[name^="twitter:"]')
  // document.title reads the first <title>, which is the page's own; drop the static default
  document.head.querySelectorAll('title').forEach((el, i) => { if (i > 0) el.remove() })
  const robots = document.head.querySelector('meta[name="robots"]')?.content || ''
  document.head.querySelector('meta[name="googlebot"]')?.remove()
  if (/noindex/i.test(robots)) document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove())
  else if ([...document.head.querySelectorAll('script[type="application/ld+json"]')].some((s) => s.id !== 'static-schema')) {
    document.getElementById('static-schema')?.remove()
  }
  // Third-party scripts injected on load; the inline originals stay for real visitors
  document.querySelectorAll('script[src*="googletagmanager"], script[src*="fbevents"]').forEach((s) => s.remove())
  document.documentElement.className = document.documentElement.className.replace(/\blenis[\w-]*\b/g, '').trim()
  if (!document.documentElement.className) document.documentElement.removeAttribute('class')
  document.documentElement.removeAttribute('style')
  document.body.removeAttribute('style')
  document.getElementById('root')?.setAttribute('data-prerendered', 'true')
}

const renderRoute = async (route) => {
  const page = await browser.newPage()
  try {
    await page.setViewport({ width: 1366, height: 900 })
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const u = new URL(req.url())
      const sameOrigin = u.origin === ORIGIN
      const heavy = ['image', 'media', 'font'].includes(req.resourceType())
      // External hosts, API calls and heavy media are skipped: only HTML structure matters here
      if (!sameOrigin || u.pathname.startsWith('/api/') || heavy) return req.abort()
      return req.continue()
    })
    await page.goto(ORIGIN + route, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForFunction(
      () => document.querySelector('#root h1') && document.body.style.overflow !== 'hidden',
      { timeout: 30000 }
    )
    await new Promise((r) => setTimeout(r, 900)) // lazy sections, Helmet commit
    await page.evaluate(tidyDocument)
    const html = await page.content()
    const info = await page.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      links: document.querySelectorAll('#root a[href^="/"]').length,
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      robots: document.querySelector('meta[name="robots"]')?.content || '',
      ogImage: !!document.querySelector('meta[property="og:image"]'),
      twitter: !!document.querySelector('meta[name="twitter:card"]'),
      title: document.title,
    }))
    return { route, html, info }
  } finally {
    await page.close()
  }
}

const results = []
const failures = []
const queue = [...routes]
const worker = async () => {
  while (queue.length) {
    const route = queue.shift()
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        results.push(await renderRoute(route))
        break
      } catch (e) {
        if (attempt === 2) failures.push({ route, error: e.message })
      }
    }
  }
}
log(`rendering ${routes.size} routes…`)
await Promise.all(Array.from({ length: CONCURRENCY }, worker))
await browser.close()
server.close()

// ── Write output ────────────────────────────────────────────────
results.sort((a, b) => a.route.localeCompare(b.route))
for (const { route, html } of results) {
  const out = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
}

// ── Report ──────────────────────────────────────────────────────
const problems = []
console.log('\nroute'.padEnd(52) + 'h1 h2 links canonical robots')
for (const { route, info } of results) {
  const expected = SITE + (route === '/' ? '/' : route)
  const issues = []
  if (info.h1 !== 1) issues.push(`h1=${info.h1}`)
  if (!info.canonical) issues.push('no canonical')
  else if (info.canonical !== expected && !ALIAS_ROUTES.has(route)) issues.push(`canonical=${info.canonical}`)
  if (!info.ogImage || !info.twitter) issues.push('missing og/twitter')
  if (issues.length) problems.push(`${route}: ${issues.join(', ')}`)
  console.log(route.padEnd(52) + `${info.h1}  ${String(info.h2).padEnd(2)} ${String(info.links).padEnd(5)} ${info.canonical ? 'ok  ' : 'NO  '}    ${/noindex/i.test(info.robots) ? 'noindex' : 'index'}`)
}
log(`done: ${results.length} prerendered, ${failures.length} failed`)
failures.forEach((f) => console.warn(`  FAILED ${f.route}: ${f.error}`))
problems.forEach((p) => console.warn(`  CHECK ${p}`))
if (STRICT && (failures.length || problems.length)) process.exit(1)
