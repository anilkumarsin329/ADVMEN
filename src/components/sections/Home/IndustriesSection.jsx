/**
 * IndustriesSection.jsx — Section 11
 * Industries We Serve
 *
 * The brief supplies the heading and positioning copy only. The industry
 * chips below mirror the verticals ADVMEN already serves in its work
 * portfolio — edit INDUSTRIES to add or remove any.
 */

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const INDUSTRIES = [
  'Healthcare',
  'Real Estate',
  'E-Commerce & D2C',
  'Education & Edtech',
  'Hospitality & Travel',
  'Legal & Professional Services',
  'Food & Delivery',
  'Technology & AI Platforms',
  'Events & Entertainment',
  'Non-Profit & Foundations',
]

const IndustriesSection = () => (
  <section
    id="industries-section"
    className="relative w-full"
    style={{ background: 'var(--color-black)', padding: 'clamp(3.5rem, 8vw, 6rem) 0' }}
    aria-label="Industries we serve"
  >
    <div className="container">
      <SectionHeader
        eyebrow="Industries We Serve"
        title="Your Market Isn’t Generic. Neither Is Our Strategy."
        subtitle="ADVMEN curates digital strategies that are tailored to the real market, audience, and business model, rather than forcing every organization into the same marketing framework."
      />

      <ul className="flex flex-wrap gap-3" aria-label="Industries">
        {INDUSTRIES.map((name, i) => (
          <motion.li
            key={name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-ink)',
              border: '2px solid var(--color-ink)',
              borderRadius: '9999px',
              padding: '0.55rem 1.25rem',
              background: i === 0 ? 'var(--color-orange)' : 'transparent',
            }}
          >
            {name}
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
)

export default IndustriesSection
