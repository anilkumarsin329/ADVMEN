/**
 * pages/Careers/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Careers Page
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'

const openPositions = [
  {
    title: 'Senior React Developer',
    department: 'Engineering',
    location: 'Mohali, India / Remote',
    type: 'Full-Time',
    desc: 'Looking for a senior React engineer with strong experience in Vite, custom animation rigs (GSAP/Framer Motion), and responsive layout rendering.',
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Mohali, India / Hybrid',
    type: 'Full-Time',
    desc: 'Looking for a designer skilled in Figma design systems, wireframe layout mapping, and motion graphic mockup designs.',
  },
  {
    title: 'SEO & Content Strategist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-Time',
    desc: 'Looking for an SEO specialist experienced in running technical audits, on-page search optimizations, and search ranking campaigns.',
  },
]

const Careers = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.careers-stagger', {
        opacity: 0,
        y: 35,
        filter: 'blur(8px)',
        duration: 1.0,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.15,
        clearProps: 'all',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <SEOHead
        title="Careers — ADVMEN Technologies"
        description="Join our team of creative engineers, visual designers, and search growth strategists."
      />

      <section
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '6rem',
          background: 'var(--color-black)',
        }}
        aria-label="Careers Section"
      >
        <div className="container relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl flex flex-col gap-6 mb-16">
            <div className="careers-stagger flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-orange)]" />
              <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>
                Work With Us
              </span>
            </div>

            <h1
              className="careers-stagger section-title"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                lineHeight: 1.1,
                fontWeight: 'var(--weight-bold)',
                letterSpacing: '-0.02em',
              }}
            >
              Build the Future of <span className="text-orange-gradient">Creative</span> Tech.
            </h1>

            <p
              className="careers-stagger type-body-lg"
              style={{
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '620px',
              }}
            >
              We are always on the hunt for senior talent who refuse templates, write fast code, and honor visual design systems.
            </p>
          </div>

          {/* Job Postings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {openPositions.map((pos, i) => (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(255,107,0,0.2)' }}
                className="group p-8 rounded-2xl flex flex-col justify-between"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  transition: 'border-color 0.4s ease',
                  minHeight: '340px',
                }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start font-mono text-[0.68rem] text-[var(--color-text-tertiary)] uppercase tracking-wider">
                    <span>{pos.department}</span>
                    <span>{pos.type}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--color-text-primary)',
                      lineHeight: '1.35',
                    }}
                  >
                    {pos.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {pos.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.03)] flex justify-between items-center">
                  <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[var(--color-text-tertiary)]">
                    {pos.location}
                  </span>
                  <Link
                    to="/contact"
                    className="font-mono text-xs uppercase tracking-wider text-[var(--color-orange)] hover:underline flex items-center gap-1.5"
                    data-cursor="hover"
                  >
                    Apply Now
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </PageTransition>
  )
}

export default Careers
