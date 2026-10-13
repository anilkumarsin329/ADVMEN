/**
 * HomeCTA.jsx — Section 13
 * Let's Talk About Your Brand Now
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HomeCTA = () => (
  <section
    id="contact-cta"
    className="relative w-full"
    style={{ background: 'var(--color-black)', padding: 'clamp(3rem, 7vw, 5rem) 0' }}
    aria-label="Talk to ADVMEN"
  >
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
        style={{
          background: 'var(--color-orange)',
          border: '2px solid var(--color-ink)',
          borderRadius: '1rem',
          boxShadow: '8px 8px 0 var(--color-ink)',
          padding: 'clamp(2rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 3rem)',
        }}
      >
        <span className="eyebrow" style={{ color: 'var(--color-ink)' }}>Let’s Talk About Your Brand Now</span>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
            lineHeight: 1.1,
            maxWidth: '820px',
            margin: '0 auto',
            color: 'var(--color-ink)',
          }}
        >
          Your Next Customer Is Already Searching. Make Your Brand Worth Finding.
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4" style={{ marginTop: '2rem' }}>
          <Link to="/contact" className="btn-secondary btn-lg" data-cursor="hover">
            Get a Free Growth Audit
          </Link>
          <Link
            to="/contact"
            className="btn-outline btn-lg"
            style={{ background: 'var(--color-paper-light)' }}
            data-cursor="hover"
          >
            Talk to ADVMEN
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
)

export default HomeCTA
