/**
 * utils/autoLink.jsx
 * Turns the first occurrence of each known phrase in a plain string into an
 * internal <Link>. Links are plain (follow) links — no rel="nofollow".
 */

import { Link } from 'react-router-dom'

export const LINK_STYLE = {
  color: 'var(--color-orange)',
  fontWeight: 600,
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
}

// Longest phrases first so "digital marketing company in India" wins over "India"
export const INTERNAL_LINKS = [
  { phrase: 'digital marketing company in India', to: '/digital-marketing-services-india' },
  { phrase: 'digital marketing services in India', to: '/digital-marketing-services-india' },
  { phrase: 'digital marketing agency in India', to: '/digital-marketing-services-india' },
  { phrase: 'social media marketing in India', to: '/services/social-media-marketing' },
  { phrase: 'content marketing agency in India', to: '/services/content-marketing' },
  { phrase: 'website development company in India', to: '/services/website-development' },
  { phrase: 'digital marketing in India', to: '/digital-marketing-services-india' },
  { phrase: 'SEO services in India', to: '/services/seo' },
  { phrase: 'AI search optimization', to: '/services/aeo-geo' },
  { phrase: 'AEO and GEO services', to: '/services/aeo-geo' },
  { phrase: 'mobile app development', to: '/services/app-development' },
  { phrase: 'Android app development', to: '/services/app-development/android' },
  { phrase: 'iOS app development', to: '/services/app-development/ios' },
  { phrase: 'e-commerce websites', to: '/services/website-development' },
  { phrase: 'web development', to: '/services/website-development' },
  { phrase: 'Search Engine Optimization', to: '/services/seo' },
  { phrase: 'Answer Engine Optimization', to: '/services/aeo-geo' },
  { phrase: 'Generative Engine Optimization', to: '/services/aeo-geo' },
  { phrase: 'performance marketing', to: '/services/performance-marketing' },
  { phrase: 'content marketing', to: '/services/content-marketing' },
  { phrase: 'branding', to: '/services/branding' },
  { phrase: 'case studies', to: '/work' },
  { phrase: 'USA', to: '/digital-marketing-services-usa' },
  { phrase: 'UAE', to: '/digital-marketing-services-uae' },
  { phrase: 'Europe', to: '/digital-marketing-services-europe' },
  { phrase: 'SEO', to: '/services/seo' },
  { phrase: 'GEO', to: '/services/aeo-geo' },
  { phrase: 'AEO', to: '/services/aeo-geo' },
]

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * @param {string} text
 * @param {Array<{phrase:string,to:string}>} [links] candidate links (first match of each wins, no overlaps)
 * @param {string} [currentPath] skip links pointing at the page we are already on
 */
export const autoLink = (text, links = INTERNAL_LINKS, currentPath = '') => {
  const usable = links.filter((l) => l.to !== currentPath)
  const found = []

  usable.forEach(({ phrase, to }) => {
    const re = new RegExp(`(?<![A-Za-z])${escapeRe(phrase)}(?![A-Za-z])`, 'i')
    const m = re.exec(text)
    if (!m) return
    const start = m.index
    const end = start + m[0].length
    if (found.some((f) => start < f.end && end > f.start)) return
    if (found.some((f) => f.to === to)) return
    found.push({ start, end, to, label: m[0] })
  })

  if (!found.length) return text

  found.sort((a, b) => a.start - b.start)
  const out = []
  let cursor = 0
  found.forEach((f, i) => {
    if (f.start > cursor) out.push(text.slice(cursor, f.start))
    out.push(
      <Link key={`${f.to}-${i}`} to={f.to} style={LINK_STYLE}>
        {f.label}
      </Link>
    )
    cursor = f.end
  })
  if (cursor < text.length) out.push(text.slice(cursor))
  return out
}
