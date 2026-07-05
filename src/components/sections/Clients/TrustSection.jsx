/**
 * TrustSection.jsx — Clients & Trust Metrics with Valid React Icons
 */

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'
import MarqueeLib from 'react-fast-marquee'
import { FiTrendingUp, FiShield, FiClock, FiCheckCircle, FiArrowRight, FiGitBranch, FiZap, FiAward, FiDollarSign, FiShoppingCart } from 'react-icons/fi'

// Handle both default export and named export
const Marquee = MarqueeLib?.default || MarqueeLib

const trustMetrics = [
  { value: '99.9%', label: 'Uptime SLA', desc: 'Enterprise-grade hosting setups with high availability and immediate fault recovery.', icon: FiShield },
  { value: '$20M+', label: 'Client Revenue', desc: 'Direct digital sales, signups, and customer acquisition driven by our platforms.', icon: FiTrendingUp },
  { value: '24/7', label: 'Tech Monitoring', desc: 'Real-time uptime checking, threat scanning, and database state protection.', icon: FiClock },
  { value: '100%', label: 'Clean Code Audits', desc: 'Semantically built front-ends conforming to modern security and design systems.', icon: FiCheckCircle },
]

const clientLogos = [
  { name: 'TechVentures', initials: 'TV', color: '#FF6B00', icon: FiArrowRight },
  { name: 'GreenLeaf', initials: 'GL', color: '#22C55E', icon: FiGitBranch },
  { name: 'Nexus Corp', initials: 'NC', color: '#3B82F6', icon: FiZap },
  { name: 'Fortune 500', initials: 'F5', color: '#8B5CF6', icon: FiAward },
  { name: 'FinTech Pro', initials: 'FP', color: '#EC4899', icon: FiDollarSign },
  { name: 'E-Commerce', initials: 'EC', color: '#06B6D4', icon: FiShoppingCart },
  { name: 'TechVentures', initials: 'TV', color: '#FF6B00', icon: FiArrowRight },
  { name: 'GreenLeaf', initials: 'GL', color: '#22C55E', icon: FiGitBranch },
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
      {/* Background glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      <div className="relative container" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: 'rgba(255, 107, 0, 0.1)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                color: 'var(--color-orange)',
              }}
            >
              ✨ Enterprise Trust
            </span>
          </div>
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
          {trustMetrics.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="trust-metric p-6 sm:p-8 rounded-2xl cursor-default group"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,107,0,0.15)',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,107,0,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(255,107,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.01)'
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="mb-4 p-3 w-fit rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                  <Icon size={24} style={{ color: 'var(--color-orange)' }} />
                </div>
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
            )
          })}
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
              borderRadius: '1.5rem',
              border: '1px solid rgba(255,107,0,0.15)',
              background: 'rgba(255,255,255,0.01)',
              backdropFilter: 'blur(12px)',
              padding: '2.5rem 0',
              overflow: 'hidden',
            }}
          >
            <Marquee gradient={false} speed={40} pauseOnHover>
              {clientLogos.map((client, i) => {
                const IconComponent = client.icon
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '200px',
                      height: '100px',
                      marginRight: '2rem',
                      borderRadius: '1rem',
                      background: `linear-gradient(135deg, ${client.color}15 0%, ${client.color}08 100%)`,
                      border: `1.5px solid ${client.color}30`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${client.color}60`
                      e.currentTarget.style.boxShadow = `0 10px 40px ${client.color}20`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${client.color}30`
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      {/* Logo Circle with Icon */}
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${client.color} 0%, ${client.color}dd 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.5rem',
                          fontWeight: 'var(--weight-bold)',
                          color: 'white',
                          boxShadow: `0 8px 24px ${client.color}40`,
                          border: '2px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        <IconComponent size={28} />
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--color-text-secondary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontWeight: '600',
                        }}
                      >
                        {client.name}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  background: 'rgba(255,107,0,0.05)',
                  border: '1px solid rgba(255,107,0,0.15)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,107,0,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,107,0,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.15)'
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
      `}</style>
    </section>
  )
}

export default TrustSection
