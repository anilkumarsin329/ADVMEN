/**
 * HomeServices.jsx — Section 5
 * Our Digital Marketing Services India
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const SERVICES = [
  {
    title: 'SEO',
    image: '/Image/advmen_service6.webp',
    href: '/services/seo',
    desc: 'Our SEO services in India go way beyond chasing keyword rankings. We combine technical SEO, smart intent research, content strategy, on-page fixes, internal linking, structured data, local and ecommerce SEO, digital PR, and building your digital authority.',
    label: 'Key capabilities',
    items: ['Technical SEO', 'Keyword & Search Intent Research', 'On-Page SEO', 'Content Strategy', 'Internal Linking', 'Structured Data', 'Local SEO', 'Ecommerce SEO', 'Digital PR', 'Authority Building'],
  },
  {
    title: 'AEO & GEO / AI Search Optimization',
    image: '/Image/advmen_service10.webp',
    href: '/services/aeo-geo',
    desc: 'Search is becoming increasingly conversational. Audiences are using AI tools to dig into brands. Our AEO and GEO services help you showcase your expertise so search engines, answer engines, and AI systems pick up exactly what you offer.',
    items: ['Conversational query research', 'Search-intent analysis', 'Entity optimization', 'Topical authority', 'FAQ and question-led content', 'Schema and structured data', 'Author and brand credibility signals', 'Internal linking and site architecture', 'Relevant third-party mentions', 'AI search visibility monitoring'],
  },
  {
    title: 'Branding',
    image: '/Image/advmen_service4.webp',
    href: '/services/branding',
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
    desc: 'Think of your website as your digital headquarters. We combine smart design, usability, solid performance and a strong technical foundation to build responsive, modern, conversion-focused sites.',
    items: ['Custom Website Development', 'Business Website Development', 'Corporate Website Development', 'Healthcare Website Development', 'E-commerce Development', 'Landing Page Development', 'UI/UX Design', 'Website Performance Optimization', 'CMS Development', 'API Integration'],
  },
  {
    title: 'App Development',
    image: '/Image/advmen_service2.webp',
    href: '/services/app-development',
    desc: 'We design and develop scalable mobile applications for startups, businesses and enterprises. From customer-facing mobile apps to custom business applications, ADVMEN combines UI/UX, development, API integration and performance optimization to build reliable digital products.',
    items: ['Android App Development', 'iOS App Development', 'Cross-Platform App Development', 'Custom Mobile App Development', 'Business & Enterprise Apps', 'E-commerce Apps', 'Booking & Service Apps', 'API & Backend Integration', 'UI/UX Design', 'App Performance Optimization'],
  },
]

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HomeServices = () => (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
            className="card group flex flex-col"
          >
            <Link
              to={s.href}
              data-cursor="hover"
              aria-label={`${s.title} — learn more`}
              className="block overflow-hidden"
              style={{ height: '150px', borderBottom: '2px solid var(--color-ink)', background: 'var(--color-surface-2)' }}
            >
              <img
                src={s.image}
                alt={s.title}
                width="480"
                height="150"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="flex flex-col flex-grow" style={{ padding: '1rem 1.1rem 1.1rem' }}>
              <div className="flex items-baseline gap-2 mb-2">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-orange)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: '1.05rem', lineHeight: 1.25 }}>{s.title}</h3>
              </div>

              <p className="line-clamp-3" style={{ fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '0.85rem' }}>
                {s.desc}
              </p>

              <ul className="flex flex-wrap gap-1.5 mb-4">
                {s.items.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                      border: '1.5px solid var(--color-ink)',
                      borderRadius: '9999px',
                      padding: '0.12rem 0.55rem',
                    }}
                  >
                    {item}
                  </li>
                ))}
                {s.items.length > 3 && (
                  <li style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 700, color: 'var(--color-orange)', padding: '0.12rem 0.2rem' }}>
                    +{s.items.length - 3} more
                  </li>
                )}
              </ul>

              <Link
                to={s.href}
                className="btn-outline btn-sm mt-auto self-start"
                data-cursor="hover"
              >
                Learn More <ArrowIcon />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
)

export default HomeServices
