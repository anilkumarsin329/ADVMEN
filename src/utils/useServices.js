/**
 * utils/useServices.js
 * Shared services list (API + fallback) used by Navbar dropdown and Footer.
 */

import { useState, useEffect } from 'react'
import { cachedFetch } from '@utils/apiCache'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const FALLBACK_SERVICES = [
  { _id: '1', title: 'SEO Services',               slug: 'seo' },
  { _id: '2', title: 'AEO & GEO Services',          slug: 'aeo-geo' },
  { _id: '3', title: 'Branding',                    slug: 'branding' },
  { _id: '4', title: 'Performance Marketing',       slug: 'performance-marketing' },
  { _id: '5', title: 'Social Media Marketing',      slug: 'social-media-marketing' },
  { _id: '6', title: 'Content Marketing',           slug: 'content-marketing' },
  { _id: '7', title: 'Website Development',         slug: 'website-development' },
  { _id: '8', title: 'App Development',             slug: 'app-development' },
]

// Combined services are shown as two separate entries
const SPLIT_SERVICES = [
  {
    test: /seo\s*(&|and)\s*geo/i,
    items: [
      { title: 'SEO Optimization', slug: 'seo' },
      { title: 'AEO & GEO Optimization', slug: 'aeo-geo' },
    ],
  },
  {
    test: /android\s*(&|and)\s*ios/i,
    items: [
      { title: 'Android App Development', slug: 'app-development/android' },
      { title: 'iOS App Development',     slug: 'app-development/ios' },
    ],
  },
]

export const splitServices = (list) =>
  list.flatMap((svc) => {
    const rule = SPLIT_SERVICES.find((r) => r.test.test(svc.title || ''))
    return rule ? rule.items.map((item) => ({ ...item, _id: item.slug })) : [svc]
  })

export const useServices = () => {
  const [services, setServices] = useState(FALLBACK_SERVICES)

  useEffect(() => {
    cachedFetch(`${API_BASE}/api/services`)
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.services || data?.data || []
        if (list.length > 0) setServices(list)
      })
      .catch(() => {})
  }, [])

  return services
}
