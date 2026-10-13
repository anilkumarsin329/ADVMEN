/**
 * StrategicVision.jsx — Section 3
 * We Turn Strategic Vision into Measurable Impact
 */

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const PARAGRAPHS = [
  'We’re here to help brands build strong digital foundations, communicate their value with clarity, and create meaningful visibility across traditional search and emerging AI-powered discovery.',
  'Our team of digital marketing experts treat your brand with extra TLC. From strategy, positioning, content, search visibility, paid ads, websites, to digital products, we handle it all.',
  'As ADVMEN expands its footprint across international markets, it provides digital marketing and technology solutions for companies in India, USA, UAE and Europe.',
]

const StrategicVision = () => (
  <section
    className="relative w-full"
    style={{
      background: 'var(--color-surface-2)',
      borderTop: '2px solid var(--color-ink)',
      borderBottom: '2px solid var(--color-ink)',
      padding: 'clamp(3.5rem, 8vw, 6rem) 0',
    }}
    aria-label="Strategic vision"
  >
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Who We Are"
            title="We Turn Strategic Vision into Measurable Impact"
            className="!mb-0"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: '1.0625rem', lineHeight: 1.75, marginTop: '1.25rem', color: 'var(--color-text-primary)', fontWeight: 500 }}
          >
            ADVMEN Technologies is a digital marketing company in India built around the changing way people search,
            evaluate, and choose businesses.
          </motion.p>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-5">
          {PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              style={{ fontSize: '1.0625rem', lineHeight: 1.75 }}
            >
              {text}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              marginTop: '0.5rem',
              padding: '1.5rem 1.75rem',
              border: '2px solid var(--color-ink)',
              borderRadius: '0.875rem',
              background: 'var(--color-surface-1)',
              boxShadow: '5px 5px 0 var(--color-ink)',
            }}
          >
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-ink)', marginBottom: '0.5rem' }}>
              Each market is different. Where you go matters.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>
              Audiences behave differently, competition shifts, search patterns vary, and business dynamics are
              different. So, there’s no standard approach to work. Each strategy is customized to fit the market you
              wish to tap into.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
)

export default StrategicVision
