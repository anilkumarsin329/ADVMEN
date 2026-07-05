/**
 * pages/Services/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Services Grid Page
 * Phase 2: Services Grid complete.
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'

import SEOHead     from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import ServiceCard from '@components/sections/Services/ServiceCard'
import { services } from '@data/services'

const Services = () => {
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-stagger', {
        opacity: 0,
        y: 35,
        filter: 'blur(8px)',
        duration: 1.0,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.15,
        clearProps: 'all',
      })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <SEOHead
        title="Services — ADVMEN Technologies"
        description="Explore our creative design, React engineering, marketing, and SEO growth services."
      />

      <section
        ref={headerRef}
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '6rem',
          background: 'var(--color-black)',
        }}
        aria-label="Services Introduction"
      >
        <div className="container relative z-10">
          
          {/* Header section */}
          <div className="max-w-3xl flex flex-col gap-6 mb-16">
            <div className="services-stagger flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-orange)]" />
              <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>
                Our Capabilities
              </span>
            </div>

            <h1
              className="services-stagger section-title"
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                lineHeight: 1.15,
                fontWeight: 'var(--weight-bold)',
                letterSpacing: '-0.02em',
              }}
            >
              High-Performance Solutions Built for <span className="text-orange-gradient">Growth</span>.
            </h1>

            <p
              className="services-stagger type-body-lg"
              style={{
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '620px',
              }}
            >
              We craft modular systems, clean interfaces, and organic traffic growth tools tailored to start-ups 
              and large enterprises. Select a service to see our key features and execution workflows.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Bottom callout section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-20 p-8 lg:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8"
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* background highlight glow */}
            <div
              className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            <div className="relative z-10 flex flex-col gap-3 max-w-xl">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Need a Bespoke Solution?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                }}
              >
                If your project requirements span across multiple service modules, or you require a custom product, 
                our creative architects can consult with your technical team to map a custom plan.
              </p>
            </div>

            <Link
              to="/contact"
              className="relative z-10 btn-primary btn-lg shine whitespace-nowrap"
              data-cursor="hover"
            >
              Let's Discuss
            </Link>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  )
}

export default Services
