/**
 * TrustSection.jsx — Clients & Trust Metrics with Valid React Icons
 */

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'
import MarqueeLib from 'react-fast-marquee'
import { API_BASE_URL, getImageUrl } from '@utils/constants'
import { FiTrendingUp, FiShield, FiClock, FiCheckCircle, FiArrowRight, FiGitBranch, FiZap, FiAward, FiDollarSign, FiShoppingCart } from 'react-icons/fi'
import { stats } from '@data/stats'

// Handle both default export and named export
const Marquee = MarqueeLib?.default || MarqueeLib

const trustMetrics = [
  { title: 'Reliable Infrastructure', desc: 'Production-ready hosting and deployment setups designed for stability, availability, and performance.', icon: FiShield },
  { title: 'Performance First', desc: 'Fast-loading websites and applications optimized for better user experience, performance, and business growth.', icon: FiTrendingUp },
  { title: 'Ongoing Tech Support', desc: 'Maintenance, monitoring, bug fixes, security updates, and technical assistance through dedicated support plans.', icon: FiClock },
  { title: 'Secure & Clean Development', desc: 'Structured, maintainable code with security-conscious development and regular quality checks.', icon: FiCheckCircle },
]

const TrustSection = () => {
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)
  const [clientLogos, setClientLogos] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/clients`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setClientLogos(data)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return

    let ctx

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        ctx = gsap.context(() => {
          if (sectionRef.current.querySelector('.trust-headline')) {
            gsap.fromTo('.trust-headline',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
            )
          }

          if (sectionRef.current.querySelector('.trust-desc')) {
            gsap.fromTo('.trust-desc',
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.1 }
            )
          }

          if (sectionRef.current.querySelector('.trust-metric')) {
            gsap.fromTo('.trust-metric',
              { opacity: 0, y: 30, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'expo.out', stagger: 0.08, delay: 0.2 }
            )
          }

          if (sectionRef.current.querySelector('.clients-section')) {
            gsap.fromTo('.clients-section',
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.4 }
            )
          }
        }, sectionRef)
      },
      { threshold: 0.15 }
    )

    obs.observe(sectionRef.current)
    return () => {
      obs.disconnect()
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'calc(var(--section-padding-y) * 0.75)',
        paddingBottom: 'calc(var(--section-padding-y) * 0.75)',
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
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-block mb-4">
            <span
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase inline-flex items-center gap-1.5"
              style={{
                background: 'rgba(255, 107, 0, 0.1)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                color: 'var(--color-orange)',
              }}
            >
              <FiShield size={14} /> OUR COMMITMENT
            </span>
          </div>
          <h2
            className="trust-headline font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '1rem',
            }}
          >
            Built for Scale, Speed & Reliability
          </h2>
          <p
            className="trust-desc"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            Reliable digital solutions with ongoing support, performance optimization, and secure development practices.
          </p>
        </div>

        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {trustMetrics.map((m, i) => {
            const Icon = m.icon
            return (
              <div
                key={m.title}
                className="trust-metric p-6 sm:p-7 rounded-2xl cursor-default group flex flex-col h-full"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,107,0,0.1)',
                  backdropFilter: 'blur(12px)',
                  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,107,0,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="mb-5 p-3 w-fit rounded-xl bg-orange-500/10 transition-transform duration-300 ease-out group-hover:scale-110">
                  <Icon size={22} style={{ color: 'var(--color-orange)' }} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '0.625rem',
                  }}
                >
                  {m.title}
                </h3>
                <p
                  className="mt-auto"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'rgba(245, 245, 245, 0.7)',
                    lineHeight: '1.6',
                  }}
                >
                  {m.desc}
                </p>
              </div>
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
              background: 'rgba(255,255,255,0.02)',
              padding: '2rem 0',
              overflow: 'hidden',
            }}
          >
            {clientLogos.length > 0 && (
              <Marquee gradient={false} speed={40} pauseOnHover>
                {clientLogos.map((client, i) => (
                  <motion.div
                    key={client._id || i}
                    whileHover={{ scale: 1.04, y: -4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '210px',
                      height: '110px',
                      marginRight: '1.75rem',
                      borderRadius: '1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1.5px solid rgba(255,107,0,0.15)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: '0.85rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,107,0,0.15)'
                      e.currentTarget.style.background = 'rgba(255,107,0,0.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,107,0,0.15)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.6rem',
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <img 
                        src={getImageUrl(client.logo)} 
                        alt={client.companyName} 
                        style={{
                          maxHeight: '52px',
                          maxWidth: '90%',
                          objectFit: 'contain',
                          borderRadius: '6px',
                          filter: 'none',
                          opacity: 1,
                          transition: 'transform 0.3s ease',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--color-text-primary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontWeight: '600',
                          textAlign: 'center',
                          marginTop: '2px',
                        }}
                      >
                        {client.companyName}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </Marquee>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, i) => (
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
                  {stat.value}{stat.suffix}
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
