/**
 * data/navigation.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Navigation Data
 * ─────────────────────────────────────────────────────────────
 */

export const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Catalog',  href: '/catalog' },
  { label: 'Work',     href: '/work' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/contact' },
]

export const footerLinks = {
  company: [
    { label: 'About Us',  href: '/about' },
    { label: 'Our Work',  href: '/work' },
    { label: 'Blog',      href: '/blog' },
    { label: 'Careers',   href: '/careers' },
    { label: 'Contact',   href: '/contact' },
  ],
  services: [
    { label: 'Branding',          href: '/services/branding' },
    { label: 'Digital Marketing', href: '/services/digital-marketing' },
    { label: 'Web Development',   href: '/services/web-development' },
    { label: 'App Development',   href: '/services/app-development' },
    { label: 'SEO',               href: '/services/seo' },
  ],
  legal: [
    { label: 'Privacy Policy',    href: '/privacy-policy' },
    { label: 'Terms of Service',  href: '/terms-of-service' },
  ],
}
