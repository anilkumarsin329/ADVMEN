/**
 * HomeServices.jsx — Section 5
 * Our Digital Marketing Services India
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { API_BASE_URL, getImageUrl } from '@utils/constants'
import { cachedFetch } from '@utils/apiCache'
import SectionHeader from './SectionHeader'

const SERVICES = [
  {
    title: 'SEO',
    image: '/Image/advmen_service6.webp',
    href: '/services/seo',
    apiSlug: 'seo-geo-optimization',
    desc: 'Our SEO services in India go way beyond chasing keyword rankings. We combine technical SEO, smart intent research, content strategy, on-page fixes, internal linking, structured data, local and ecommerce SEO, digital PR, and building your digital authority.',
    label: 'Key capabilities',
    items: ['Technical SEO', 'Keyword & Search Intent Research', 'On-Page SEO', 'Content Strategy', 'Internal Linking', 'Structured Data', 'Local SEO', 'Ecommerce SEO', 'Digital PR', 'Authority Building'],
  },
  {
    title: 'AEO & GEO / AI Search Optimization',
    image: '/Image/advmen_service10.webp',
    href: '/services/aeo-geo',
    apiSlug: 'seo-geo-optimization',
    desc: 'Search is becoming increasingly conversational. Audiences are using AI tools to dig into brands. Our AEO and GEO services help you showcase your expertise so search engines, answer engines, and AI systems pick up exactly what you offer.',
    items: ['Conversational query research', 'Search-intent analysis', 'Entity optimization', 'Topical authority', 'FAQ and question-led content', 'Schema and structured data', 'Author and brand credibility signals', 'Internal linking and site architecture', 'Relevant third-party mentions', 'AI search visibility monitoring'],
  },
  {
    title: 'Branding',
    image: '/Image/advmen_service4.webp',
    href: '/services/branding',
    apiSlug: 'branding-logo-design',
    desc: 'A real brand is so much more than just a logo. We help businesses craft a unified look and voice across all the digital platforms. From brand strategy and identity to supporting digital assets, we bring consistency to how your business looks, communicates, and presents its value.',
    items: ['Brand Strategy', 'Brand Identity', 'Logo Design', 'Visual Systems', 'Digital Brand Assets', 'Brand Communication'],
  },
  {
    title: 'Performance Marketing',
    image: '/Image/advmen_service5.webp',
    href: '/services/performance-marketing',
    desc: 'Paid media should do more than rack up views. We run performance-driven campaigns shaped by your actual business goals, your audience, and the channels that matter. From campaign planning and creative direction to optimization and reporting, we align paid acquisition with the wider digital strategy.',
    items: ['Paid Search', 'Social Ads', 'Campaign Strategy', 'Conversion Optimization', 'Performance Analytics'],
  },
  {
    title: 'Social Media Marketing',
    image: '/Image/advmen_service7.webp',
    href: '/services/social-media-marketing',
    apiSlug: 'social-media-management',
    desc: 'Social media is where brands build familiarity, drive conversations and stay connected to your audience. Our social media marketing in India is a combination of strategy, creative content planning, publishing and performance tracking to build a real and lasting digital presence.',
    items: ['Social Media Strategy', 'Content Planning', 'Content Calendars', 'Creative Direction', 'Platform Management', 'Audience Engagement', 'Performance Analysis'],
  },
  {
    title: 'Content Marketing',
    image: '/Image/advmen_service9.webp',
    href: '/services/content-marketing',
    desc: 'Good content must be more than just filler on a website. We are a content marketing agency in India that puts your audience first. We create content based on what people are searching for and what your brand stands for.',
    items: ['Content Strategy & Planning', 'SEO Content & Blog Writing', 'Website & Service Page Content', 'Leadership & Authority Content', 'AEO & AI-Search Content', 'Content Refresh & Optimisation', 'Content Distribution & Repurposing', 'Content Performance & Insights'],
  },
  {
    title: 'Website Development',
    image: '/Image/advmen_service1.webp',
    href: '/services/website-development',
    apiSlug: 'professional-website-design',
    desc: 'Think of your website as your digital headquarters. We combine smart design, usability, solid performance and a strong technical foundation to build responsive, modern, conversion-focused sites.',
    items: ['Custom Website Development', 'Business Website Development', 'Corporate Website Development', 'Healthcare Website Development', 'E-commerce Development', 'Landing Page Development', 'UI/UX Design', 'Website Performance Optimization', 'CMS Development', 'API Integration'],
  },
  {
    title: 'App Development',
    image: '/Image/advmen_service2.webp',
    href: '/services/app-development',
    apiSlug: 'app-development',
    desc: 'We design and develop scalable mobile applications for startups, businesses and enterprises. From customer-facing mobile apps to custom business applications, ADVMEN combines UI/UX, development, API integration and performance optimization to build reliable digital products.',
    items: ['Android App Development', 'iOS App Development', 'Cross-Platform App Development', 'Custom Mobile App Development', 'Business & Enterprise Apps', 'E-commerce Apps', 'Booking & Service Apps', 'API & Backend Integration', 'UI/UX Design', 'App Performance Optimization'],
  },
]

const DEEP_LINKS = [
  { label: 'Android App Development', to: '/services/app-development/android' },
  { label: 'iOS App Development', to: '/services/app-development/ios' },
  { label: 'Professional Website Design', to: '/services/professional-website-design' },
  { label: 'Social Media Management', to: '/services/social-media-marketing' },
  { label: 'Digital Marketing Pricing', to: '/pricing' },
  { label: 'View All Services', to: '/services' },
]

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HomeServices = () => {
  const [apiImages, setApiImages] = useState({})

  // Use the illustrated service artwork from the CMS when it exists
  useEffect(() => {
    let alive = true
    cachedFetch(`${API_BASE_URL}/api/services`)
      .then((res) => {
        if (!alive || !Array.isArray(res)) return
        const map = {}
        res.forEach((r) => { if (r.slug && r.image) map[r.slug] = getImageUrl(r.image) })
        setApiImages(map)
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  return (
    <section
      id="services-section"
      className="relative w-full"
      style={{ background: 'var(--color-black)', padding: 'clamp(3.5rem, 8vw, 6rem) 0' }}
      aria-label="Our digital marketing services in India"
    >
      <div className="container">
        <SectionHeader
          eyebrow="What We Do"
          title="Our Digital Marketing Services India"
          subtitle="SEO, AEO, GEO, branding, performance, social, content, websites and apps — built to work together as one growth system."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((svc, i) => {
            const img = (svc.apiSlug && apiImages[svc.apiSlug]) || svc.image
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="service-card group"
              >
                <Link to={svc.href} className="block h-full cursor-pointer" data-cursor="hover">
                  <div
                    className="card-glass flex flex-col h-full"
                    style={{ minHeight: '470px', background: 'var(--color-surface-1)' }}
                  >
                    {/* Image */}
                    <div
                      className="relative w-full flex items-center justify-center overflow-hidden flex-shrink-0"
                      style={{
                        height: 'clamp(160px, 28vw, 210px)',
                        background: 'var(--color-surface-2)',
                        borderBottom: '2px solid var(--color-ink)',
                      }}
                    >
                      <img
                        src={img}
                        alt={svc.title}
                        width="600"
                        height="210"
                        loading="lazy"
                        decoding="async"
                        className="transition-transform duration-500 group-hover:scale-105"
                        style={{ maxWidth: '92%', maxHeight: '92%', width: 'auto', height: 'auto', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs font-mono font-bold tracking-widest mb-2" style={{ color: 'var(--color-orange)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3
                        className="font-display font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--color-orange)]"
                        style={{ color: 'var(--color-text-primary)', lineHeight: 1.2, fontSize: '1.2rem' }}
                      >
                        {svc.title}
                      </h3>
                      <p className="mb-4 flex-grow" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                        {svc.desc}
                      </p>

                      <div className="space-y-1.5 mb-4 pt-3" style={{ borderTop: '1.5px solid var(--color-border-subtle)' }}>
                        {svc.items.slice(0, 3).map((item) => (
                          <div key={item} className="flex items-start gap-2 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: 'var(--color-orange)' }} />
                            <span style={{ color: 'var(--color-text-secondary)' }} className="leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 mt-auto transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--color-orange)' }}>
                        <span className="text-sm font-semibold">Learn More</span>
                        <ArrowIcon />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Deep links to specific service pages (App Development sub-pages etc.) */}
        <nav className="mt-10" aria-label="More service pages">
          <p className="text-xs font-mono font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
            Explore more services
          </p>
          <ul className="flex flex-wrap gap-3">
            {DEEP_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-block text-sm font-semibold transition-colors duration-300 hover:text-[var(--color-orange)]"
                  style={{ color: 'var(--color-text-primary)', border: '2px solid var(--color-ink)', borderRadius: '9999px', padding: '0.4rem 1rem' }}
                  data-cursor="hover"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default HomeServices
