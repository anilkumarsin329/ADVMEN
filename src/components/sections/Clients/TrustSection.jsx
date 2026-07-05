/**
 * TrustSection.jsx — Clients & Trust Metrics with Marquee
 */

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'
import MarqueeLib from 'react-fast-marquee'

// Handle both default export and named export
const Marquee = MarqueeLib?.default || MarqueeLib

const trustMetrics = [
  { value: '99.9%', label: 'Uptime SLA', desc: 'Enterprise-grade hosting setups with high availability and immediate fault recovery.' },
  { value: '$20M+', label: 'Client Revenue', desc: 'Direct digital sales, signups, and customer acquisition driven by our platforms.' },
  { value: '24/7', label: 'Tech Monitoring', desc: 'Real-time uptime checking, threat scanning, and database state protection.' },
  { value: '100%', label: 'Clean Code Audits', desc: 'Semantically built front-ends conforming to modern security and design systems.' },
]

const clientLogos = [
  { name: 'TechVentures', initials: 'TV' },
  { name: 'GreenLeaf', initials: 'GL' },
  { name: 'Nexus Corp', initials: 'NC' },
  { name: 'Fortune 500', initials: 'F5' },
  { name: 'FinTech Pro', initials: 'FP' },
  { name: 'E-Commerce', initials: 'EC' },
  { name: 'TechVentures', initials: 'TV' },
  { name: 'GreenLeaf', initials: 'GL' },
]

const TrustSection = () => {
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        const ctx = gsap.context(() => {
          gsap.from('.trust-headline', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'expo.out',
          })

          gsap.from('.trust-desc', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'expo.out',
            delay: 0.1,
          })

          gsap.from('.trust-metric', {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 0.2,
          })

          gsap.from('.clients-section', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'expo.out',
            delay: 0.4,
          })
        }, sectionRef)

        return () => ctx.revert()
      },
      { threshold: 0.15 }
    )

    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        background: 'var(--color-black)',
      }}
      aria-label="Trusted Clients"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative container" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2
            className="trust-headline font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '1rem',
            }}
          >
            Built for Scale, Speed & Compliance
          </h2>
          <p
            className="trust-desc"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Enterprise-grade infrastructure trusted by leading brands worldwide.
          </p>
        </div>

        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {trustMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="trust-metric p-6 sm:p-8 rounded-2xl cursor-default"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,107,0,0.15)',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.01)'
                e.currentTarget.style.borderColor = 'rgba(255,107,0,0.15)'
              }}
            >
              <span
                className="font-display text-4xl font-extrabold text-[var(--color-orange)] mb-3 block"
              >
                {m.value}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                {m.label}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.5',
                }}
              >
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Clients Section */}
        <div className="clients-section">
          <div className="mb-8">
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--color-text-primary)',
                marginBottom: '1rem',
              }}
            >
              Trusted by Industry Leaders
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--color-text-secondary)',
              }}
            >
              We partner with ambitious brands across industries.
            </p>
          </div>

          {/* Client Logos Marquee */}
          <div
            style={{
              borderRadius: '1rem',
              border: '1px solid rgba(255,107,0,0.15)',
              background: 'rgba(255,255,255,0.01)',
              backdropFilter: 'blur(12px)',
              padding: '2rem 0',
              overflow: 'hidden',
            }}
          >
            <Marquee gradient={false} speed={40} pauseOnHover>
              {clientLogos.map((client, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '180px',
                    height: '80px',
                    marginRight: '2rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(255,107,0,0.05)',
                    border: '1px solid rgba(255,107,0,0.1)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C38 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.75rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-white)',
                      }}
                    >
                      {client.initials}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {client.name}
                    </span>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Active Clients', value: '50+' },
              { label: 'Projects Delivered', value: '200+' },
              { label: 'Team Members', value: '25+' },
              { label: 'Years Experience', value: '8+' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(255,107,0,0.05)',
                  border: '1px solid rgba(255,107,0,0.1)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-orange)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--color-text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
