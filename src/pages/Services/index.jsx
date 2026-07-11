/**
 * pages/Services/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Services Grid Page
 * Fully Responsive - Mobile, Tablet, Desktop optimized
 * Smaller card sizes
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'

import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { services } from '@data/services'

const Services = () => {
  const headerRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current || !headerRef.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

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

          gsap.from('.service-card-neo', {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 0.3,
          })
        }, headerRef)

        return () => ctx.revert()
      },
      { threshold: 0.15 }
    )

    obs.observe(headerRef.current)
    return () => obs.disconnect()
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
          paddingTop: 'calc(var(--navbar-height) + clamp(2rem, 5vw, 4rem))',
          paddingBottom: 'clamp(3rem, 8vw, 6rem)',
          background: 'var(--color-black)',
        }}
        aria-label="Services Introduction"
      >
        {/* Animated background glows */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 'clamp(300px, 50vw, 600px)',
            height: 'clamp(300px, 50vw, 600px)',
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
            width: 'clamp(250px, 40vw, 500px)',
            height: 'clamp(250px, 40vw, 500px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />

        <div 
          className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10"
          style={{ 
            zIndex: 1,
            maxWidth: '100%',
          }}
        >
          {/* Header section */}
          <div className="max-w-3xl flex flex-col gap-4 sm:gap-6 mb-12 sm:mb-14 md:mb-16 lg:mb-20">
            <div className="services-stagger flex items-center gap-3">
              <span className="w-6 sm:w-8 h-px bg-[var(--color-orange)]" />
              <span 
                className="type-eyebrow text-xs sm:text-sm"
                style={{ color: 'var(--color-orange)' }}
              >
                Our Capabilities
              </span>
            </div>

            <h1
              className="services-stagger section-title"
              style={{
                fontSize: 'clamp(1.75rem, 6vw, 4rem)',
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
                lineHeight: '1.6',
                maxWidth: '620px',
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              }}
            >
              We craft modular systems, clean interfaces, and organic traffic growth tools tailored to start-ups
              and large enterprises. Select a service to see our key features and execution workflows.
            </p>
          </div>

          {/* Services Grid - Fully Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-12 sm:mb-14 md:mb-16 lg:mb-20">
            {services.map((service, idx) => (
              <div key={service.id} className="service-card-neo group">
                <Link
                  to={`/services/${service.slug}`}
                  className="block h-full"
                >
                  <div
                    className="relative rounded-lg sm:rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer flex flex-col h-full"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 107, 0, 0.15)',
                      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.4)'
                      e.currentTarget.style.boxShadow =
                        '0 12px 40px rgba(255, 107, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.15)'
                      e.currentTarget.style.boxShadow =
                        '0 6px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                    }}
                  >
                    {/* Image Container - Responsive Height */}
                    <div 
                      className="relative w-full flex items-center justify-center overflow-hidden flex-shrink-0"
                      style={{
                        height: 'clamp(140px, 35vw, 200px)',
                        background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(20, 20, 20, 0.8) 100%)',
                        borderBottom: '1px solid rgba(255, 107, 0, 0.1)',
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="transition-transform duration-500 group-hover:scale-105"
                        style={{
                          maxWidth: '95%',
                          maxHeight: '95%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          objectPosition: 'center',
                        }}
                        loading="lazy"
                      />
                      {/* Image Overlay */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-0 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 0, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)',
                        }}
                      />
                    </div>

                    {/* Content Container - Responsive Padding */}
                    <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
                      {/* Service Number */}
                      <div
                        className="text-xs font-mono font-bold tracking-widest mb-2 sm:mb-2.5"
                        style={{
                          color: 'var(--color-orange)',
                          opacity: 0.6,
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      {/* Title - Responsive Font */}
                      <h3
                        className="font-display font-bold mb-1.5 transition-colors duration-300 group-hover:text-orange-400"
                        style={{ 
                          color: 'var(--color-text-primary)',
                          lineHeight: '1.2',
                          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        }}
                      >
                        {service.title}
                      </h3>

                      {/* Description - Responsive Font */}
                      <p
                        className="mb-2 sm:mb-3 flex-grow transition-colors duration-300"
                        style={{ 
                          color: 'var(--color-text-secondary)',
                          lineHeight: '1.4',
                          fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
                        }}
                      >
                        {service.description}
                      </p>

                      {/* Features - Responsive */}
                      <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3 pt-2 sm:pt-3 border-t border-[rgba(255,255,255,0.05)]">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125 mt-0.5"
                              style={{ background: 'var(--color-orange)' }}
                            />
                            <span style={{ color: 'var(--color-text-secondary)' }} className="leading-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Arrow - Responsive */}
                      <div className="flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 mt-auto">
                        <span className="text-xs sm:text-sm font-semibold">Learn More</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom callout section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8"
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* background highlight glow */}
            <div
              className="absolute top-1/2 right-0 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            <div className="relative z-10 flex flex-col gap-3 max-w-xl">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Need a Bespoke Solution?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
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
              className="relative z-10 btn-primary btn-lg shine whitespace-nowrap text-sm sm:text-base"
              data-cursor="hover"
            >
              Let's Discuss
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .service-card-neo {
            transition: transform 0.3s ease;
          }
          
          .service-card-neo:active {
            transform: scale(0.98);
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .service-card-neo {
            min-height: 420px;
          }
        }

        /* Desktop optimizations */
        @media (min-width: 1025px) {
          .service-card-neo {
            min-height: 450px;
          }
        }
      `}</style>
    </PageTransition>
  )
}

export default Services
