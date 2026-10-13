/**
 * VisibilityIntro.jsx — Section 2
 * Data-Backed Digital Strategies That Drive Business Growth
 */

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const CHANNELS = [
  'Search Engine Optimization (SEO)',
  'Answer Engine Optimization (AEO)',
  'Generative Engine Optimization (GEO)',
  'AI Search Optimization',
  'Content Marketing',
  'Branding & Strategy',
  'Performance Marketing',
  'Social Media',
  'Websites & App Development',
]

const VisibilityIntro = () => (
  <section
    className="relative w-full"
    style={{ background: 'var(--color-black)', padding: 'clamp(3.5rem, 8vw, 6rem) 0' }}
    aria-label="Data-backed digital strategies"
  >
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-6">
          <SectionHeader
            eyebrow="Visibility Everywhere"
            title="Data-Backed Digital Strategies That Drive Business Growth"
            className="!mb-0"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: '1.0625rem', lineHeight: 1.75, marginTop: '1.25rem' }}
          >
            Online visibility is no longer limited to ranking on Google. Your customers should find you everywhere:
            search results, instant answers, local listings, social media, AI search, even chatbots. Your brand needs
            to be visible on all the digital platforms that matter for your business growth.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{ fontSize: '1.0625rem', lineHeight: 1.75, marginTop: '1rem' }}
          >
            ADVMEN Technologies helps you build a presence that works. We make your business easy to find in search,
            answer confidently in AI-driven chat windows, and make your brand easier to discover, trust, and choose.
          </motion.p>
        </div>

        <ul className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="What we cover">
          {CHANNELS.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="flex items-center gap-3"
              style={{
                padding: '0.9rem 1.1rem',
                border: '2px solid var(--color-ink)',
                borderRadius: '0.75rem',
                background: i % 5 === 0 ? 'var(--color-orange)' : 'var(--color-surface-1)',
                boxShadow: '3px 3px 0 var(--color-ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
              }}
            >
              <span aria-hidden="true" style={{ opacity: 0.6 }}>{String(i + 1).padStart(2, '0')}</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

export default VisibilityIntro
