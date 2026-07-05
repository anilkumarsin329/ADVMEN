/**
 * utils/constants.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Global Constants
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
  email:       'hello@advmen.com',
  phone:       '+91 83750 08009',
  address:     'India',
  website:     'https://advmen.com',
  founded:     '2020',
}

// ── Social Links ─────────────────────────────────────────────
export const SOCIAL = {
  instagram:  'https://instagram.com/advmen',
  linkedin:   'https://linkedin.com/company/advmen',
  twitter:    'https://twitter.com/advmen',
  facebook:   'https://facebook.com/advmen',
  youtube:    'https://youtube.com/@advmen',
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

// ── EmailJS Config (keys from .env) ──────────────────────────
export const EMAILJS = {
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID  || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '',
}

// ── SEO Defaults ─────────────────────────────────────────────
export const SEO_DEFAULTS = {
  title:       'ADVMEN Technologies — We Build Brands That Dominate',
  description: 'ADVMEN Technologies is a premium branding, digital marketing, web & app development, and political campaign agency helping businesses grow.',
  keywords:    'branding, digital marketing, web development, app development, SEO, advertising, political campaigns, media production',
  ogImage:     '/images/og/og-default.jpg',
  twitterCard: 'summary_large_image',
}
