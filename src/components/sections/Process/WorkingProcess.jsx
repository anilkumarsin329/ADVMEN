/**
 * WorkingProcess.jsx — Our 4D Growth Framework
 * Discover · Develop · Distribute · Drive
 */

import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Discover', desc: 'We dig into your market, study your audience, check out competitors, understand search habits, and clarify your business goals.' },
  { num: '02', title: 'Develop', desc: 'We build a game plan that fits: SEO, content, branding, your website, and digital strategies tailored to the real opportunities.' },
  { num: '03', title: 'Distribute', desc: 'We put your brand where your audience actually spends time, like search engines, social platforms, content hubs.' },
  { num: '04', title: 'Drive', desc: 'We measure quality traffic, leads, conversions, and any other signals that show business growth. Our team uses that data to keep tuning your strategy.' },
]

const WorkingProcess = () => (
  <section
    className="relative w-full"
    style={{ background: 'var(--color-black)', padding: 'clamp(3.5rem, 8vw, 6rem) 0' }}
    aria-label="Our 4D Growth Framework"
  >
    <div className="container relative z-10">
      <div className="max-w-3xl mb-12 lg:mb-14">
        <span className="eyebrow">Our 4D Growth Framework</span>
        <h2 className="section-title">A Structured Approach to Digital Growth</h2>
        <p className="section-subtitle">
          Good digital marketing is rarely the result of one isolated campaign. It’s about really knowing your audience,
          the competition, and your own goals. You build solid foundations, get your message out the right way, and keep
          learning from what works (and what doesn’t).
        </p>
        <p className="section-subtitle" style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
          Our 4D framework keeps that process connected.
        </p>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {steps.map((step, i) => (
          <motion.li
            key={step.num}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card relative flex flex-col"
            style={{ padding: '1.5rem', background: i === 3 ? 'var(--color-orange)' : 'var(--color-surface-1)' }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '3rem',
                lineHeight: 1,
                color: i === 3 ? 'var(--color-ink)' : 'var(--color-orange)',
                marginBottom: '1rem',
              }}
            >
              {step.num}
            </span>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.6rem' }}>{step.title}</h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: i === 3 ? 'var(--color-ink)' : undefined }}>{step.desc}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
)

export default WorkingProcess
