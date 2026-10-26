/**
 * MarketsSection.jsx — Section 7
 * Digital Marketing Services for India & Global Markets
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { LINK_STYLE } from '@utils/autoLink'

const MARKETS = [
  {
    code: 'IN',
    name: 'India',
    desc: 'Get your brand noticed across India. We handle search, content, branding, performance, and deliver digital experiences that get results.',
    cta: 'Digital Marketing Services India',
    href: '/digital-marketing-services-india',
  },
  {
    code: 'US',
    name: 'USA',
    desc: 'Reach US audiences with search, content, and growth strategies that match the fast-moving, competitive landscape of the US.',
    cta: 'Digital Marketing Services USA',
    href: '/digital-marketing-services-usa',
  },
  {
    code: 'AE',
    name: 'UAE',
    desc: 'Develop search visibility and digital presence for businesses targeting audiences across the UAE.',
    cta: 'Digital Marketing Services UAE',
    href: '/digital-marketing-services-uae',
  },
  {
    code: 'EU',
    name: 'Europe',
    desc: 'Build digital growth strategies designed around European audiences, markets, and search behaviour.',
    cta: 'Digital Marketing Services Europe',
    href: '/digital-marketing-services-europe',
  },
]

const MarketsSection = () => (
  <section
    id="markets-section"
    className="relative w-full"
    style={{
      background: 'var(--color-surface-2)',
      borderTop: '2px solid var(--color-ink)',
      borderBottom: '2px solid var(--color-ink)',
      padding: 'clamp(3.5rem, 8vw, 6rem) 0',
    }}
    aria-label="Digital marketing services for India and global markets"
  >
    <div className="container">
      <SectionHeader
        eyebrow="Global Reach"
        title="Digital Marketing Services for India & Global Markets"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-12">
        <p style={{ fontSize: '1.0625rem', lineHeight: 1.75 }}>
          <Link to="/digital-marketing-services-india" style={LINK_STYLE}>India</Link> sits at the centre of our digital marketing offerings. We create digital marketing strategies that help
          businesses stand out and grow, even as the market shifts and new trends pop up.
        </p>
        <p style={{ fontSize: '1.0625rem', lineHeight: 1.75 }}>
          Our team also works with brands looking to make an impact in the{' '}
          <Link to="/digital-marketing-services-usa" style={LINK_STYLE}>USA</Link>,{' '}
          <Link to="/digital-marketing-services-uae" style={LINK_STYLE}>UAE</Link>, and{' '}
          <Link to="/digital-marketing-services-europe" style={LINK_STYLE}>Europe</Link>. Our strategists dive
          into each market, understand local audiences, competition, and search behaviour.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {MARKETS.map((m, i) => (
          <motion.article
            key={m.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card flex flex-col"
            style={{ padding: '1.5rem', background: 'var(--color-surface-1)' }}
          >
            <span
              aria-hidden="true"
              style={{
                alignSelf: 'flex-start',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.8rem',
                padding: '0.2rem 0.65rem',
                border: '2px solid var(--color-ink)',
                borderRadius: '9999px',
                background: 'var(--color-orange)',
                color: 'var(--color-ink)',
                marginBottom: '1rem',
              }}
            >
              {m.code}
            </span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>{m.name}</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem', flexGrow: 1 }}>{m.desc}</p>
            <Link to={m.href} className="btn-primary btn-sm self-start text-center" style={{ height: 'auto', padding: '0.6rem 1rem', whiteSpace: 'normal', lineHeight: 1.3 }} data-cursor="hover">
              {m.cta}
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
)

export default MarketsSection
