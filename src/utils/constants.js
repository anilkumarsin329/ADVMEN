/**
 * utils/constants.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — Global Constants
 *
 * Single source of truth for all magic strings, numbers,
 * and configuration values used across the application.
 * ─────────────────────────────────────────────────────────────
 */

// ── Company Info ─────────────────────────────────────────────
export const COMPANY = {
  name:        'ADVMEN Technologies Pvt. Ltd.',
  shortName:   'ADVMEN',
  tagline:     'We Build Brands That Dominate.',
  description: 'ADVMEN is a premier full-service digital agency specializing in branding, web & app development, digital marketing, and performance campaigns for ambitious businesses across India.',
  email:       'info@advmen.com',
  phone:       '+91 83750 08009',
  address:     'Orchid Center, 3rd Floor, Golf Course Road, SEC-53, Gurugram, HR - 122002, India',
  website:     'https://www.advmen.com',
  founded:     '2026',
}

// ── API Configuration ─────────────────────────────────────────
export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const { hostname } = window.location
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return 'https://advmen-backend.onrender.com'
    }
  }
  return 'http://localhost:5000'
}

export const API_BASE_URL = getApiBaseUrl()

export const getImageUrl = (path) => {
  if (!path || typeof path !== 'string' || !path.trim()) return null
  let finalPath = path.trim().replace(/\\/g, '/')

  if (finalPath.startsWith('data:') || finalPath.startsWith('blob:')) {
    return finalPath
  }

  const base = getApiBaseUrl()

  // Replace any stored localhost:5000 or api.advmen.com URLs with current base
  if (
    finalPath.includes('localhost:5000') ||
    finalPath.includes('127.0.0.1:5000') ||
    finalPath.includes('api.advmen.com')
  ) {
    finalPath = finalPath
      .replace(/^https?:\/\/(localhost|127\.0\.0\.1):5000/i, base)
      .replace(/^https?:\/\/api\.advmen\.com/i, base)
  }

  if (finalPath.startsWith('http://') || finalPath.startsWith('https://')) {
    return finalPath
  }

  const cleanPath = finalPath.startsWith('/') ? finalPath : `/${finalPath}`

  // Backend uploaded files
  if (cleanPath.startsWith('/uploads/') || cleanPath.startsWith('/api/')) {
    return `${base}${cleanPath}`
  }

  // Bare filename (no slashes) — treat as R2/media file
  if (!finalPath.includes('/')) {
    return `${base}/api/media/${finalPath}`
  }

  // Static frontend public assets
  return cleanPath
}

// ── Social Links ─────────────────────────────────────────────
export const SOCIAL = {
  instagram: 'https://www.instagram.com/advmen.in?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
  linkedin:  'https://www.linkedin.com/in/govind-goyal-5653643b6/',
}

// ── Navigation ───────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Services',   href: '/services' },
  { label: 'Work',       href: '/work' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Contact',    href: '/contact' },
]

// ── Services ─────────────────────────────────────────────────
export const SERVICES = [
  { id: 'branding',           label: 'Branding',            slug: 'branding' },
  { id: 'digital-marketing',  label: 'Digital Marketing',   slug: 'digital-marketing' },
  { id: 'web-development',    label: 'Web Development',     slug: 'web-development' },
  { id: 'app-development',    label: 'App Development',     slug: 'app-development' },
  { id: 'political-campaigns',label: 'Political Campaigns', slug: 'political-campaigns' },
  { id: 'media-production',   label: 'Media Production',    slug: 'media-production' },
  { id: 'content-creation',   label: 'Content Creation',    slug: 'content-creation' },
  { id: 'seo',                label: 'SEO',                 slug: 'seo' },
  { id: 'advertising',        label: 'Advertising',         slug: 'advertising' },
]

// ── Animation Durations (ms) ──────────────────────────────────
export const DURATION = {
  fast:    0.3,
  base:    0.6,
  slow:    1.0,
  slower:  1.5,
}

// ── Animation Easings (GSAP format) ──────────────────────────
export const EASE = {
  outExpo:    'expo.out',
  inOutExpo:  'expo.inOut',
  outBack:    'back.out(1.7)',
  outElastic: 'elastic.out(1, 0.5)',
  linear:     'none',
}

// ── Three.js Config ───────────────────────────────────────────
export const THREE_CONFIG = {
  particleCount:       2500,
  particleCountMobile: 800,
  maxPixelRatio:       2,
  cameraFov:           75,
  cameraNear:          0.1,
  cameraFar:           1000,
  cameraZ:             5,
}

// ── Breakpoints (px) — mirrors Tailwind config ────────────────
export const BREAKPOINTS = {
  xs:   375,
  sm:   640,
  md:   768,
  lg:   1024,
  xl:   1280,
  '2xl': 1536,
  '3xl': 1920,
}

// ── SEO Defaults ─────────────────────────────────────────────
export const SEO_DEFAULTS = {
  title:       'ADVMEN — We Build Brands That Dominate',
  description: 'ADVMEN is a premium branding, digital marketing, web & app development, and political campaign agency helping businesses grow.',
  keywords:    'branding, digital marketing, web development, app development, SEO, advertising, political campaigns, media production',
  ogImage:     '/images/og/og-default.jpg',
  twitterCard: 'summary_large_image',
}
