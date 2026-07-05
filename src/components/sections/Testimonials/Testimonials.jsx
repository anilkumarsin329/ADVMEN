/**
 * Testimonials.jsx — Premium Testimonials Section with Carousel
 */

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'
import { testimonials } from '@data/testimonials'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const initialsMap = {
  'Rajesh Kumar': 'RK',
  'Priya Sharma': 'PS',
  'Arjun Mehta': 'AM',
  'Vikram Singh': 'VS',
  'Neha Desai': 'ND',
  'Amit Patel': 'AP',
}

const gradientMap = {
  'Rajesh Kumar': 'linear-gradient(135deg, #FF6B00 0%, #FF8C38 100%)',
  'Priya Sharma': 'linear-gradient(135deg, #0A0A0A 0%, #FF6B00 100%)',
  'Arjun Mehta': 'linear-gradient(135deg, #FF3D00 0%, #FF8C38 100%)',
  'Vikram Singh': 'linear-gradient(135deg, #FF6B00 0%, #FFB366 100%)',
  'Neha Desai': 'linear-gradient(135deg, #FF8C38 0%, #FF6B00 100%)',
  'Amit Patel': 'linear-gradient(135deg, #FF6B00 0%, #FF3D00 100%)',
}

const Testimonials = () => {
  const sectionRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const hasAnimated = useRef(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // GSAP animations
  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        const ctx = gsap.context(() => {
          gsap.from('.testimonials-headline', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'expo.out',
          })

          gsap.from('.testimonials-desc', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'expo.out',
            delay: 0.1,
          })

          gsap.from('.testimonial-card', {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 0.2,
          })
        }, sectionRef)

        return () => ctx.revert()
      },
      { threshold: isMobile ? 0.15 : 0.12 }
    )

    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [isMobile])

  const itemsPerView = isMobile ? 1 : 3
  const maxIndex = Math.ceil(testimonials.length / itemsPerView) - 1

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
  }

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        background: 'var(--color-black)',
      }}
      aria-label="Client Testimonials"
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
        <div className="max-w-2xl mb-12 sm:mb-16 flex justify-between items-start">
          <div>
            <h2
              className="testimonials-headline font-display font-bold"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                marginBottom: '1rem',
              }}
            >
              Trusted by Industry Leaders
            </h2>
            <p
              className="testimonials-desc"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '500px',
              }}
            >
              See what our clients say about working with ADVMEN Technologies.
            </p>
          </div>

          {/* Navigation Buttons */}
          {!isMobile && (
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(255,107,0,0.15)]"
                style={{
                  background: 'rgba(255,107,0,0.08)',
                  border: '1px solid rgba(255,107,0,0.15)',
                  color: 'var(--color-orange)',
                  cursor: 'pointer',
                }}
                aria-label="Previous testimonials"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(255,107,0,0.15)]"
                style={{
                  background: 'rgba(255,107,0,0.08)',
                  border: '1px solid rgba(255,107,0,0.15)',
                  color: 'var(--color-orange)',
                  cursor: 'pointer',
                }}
                aria-label="Next testimonials"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Testimonials Grid/Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {visibleTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="testimonial-card p-6 sm:p-8 rounded-2xl cursor-default flex flex-col justify-between"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,107,0,0.15)',
                backdropFilter: 'blur(12px)',
                minHeight: '380px',
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
              {/* Top part — rating & quote */}
              <div className="flex flex-col gap-4">
                {/* Stars */}
                <div className="flex items-center gap-1.5 text-[var(--color-orange)]">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <svg key={idx} width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  ))}
                </div>

                {/* Service Badge */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-orange)',
                    background: 'rgba(255,107,0,0.1)',
                    border: '1px solid rgba(255,107,0,0.2)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: 'fit-content',
                  }}
                >
                  {t.service}
                </span>

                {/* Quote text */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.65',
                    fontStyle: 'italic',
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Bottom part — Client details */}
              <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-[rgba(255,255,255,0.04)]">
                {/* Result */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--color-text-tertiary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Result
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--color-orange)',
                    }}
                  >
                    {t.result}
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-3">
                  {/* Client Avatar Image */}
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-display font-bold text-xs text-[var(--color-white)] relative flex-shrink-0"
                    style={{
                      border: '1.5px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{ background: gradientMap[t.name] || 'var(--gradient-orange)' }}
                    />
                    <span className="relative z-10 select-none">{initialsMap[t.name] || 'C'}</span>
                    
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {t.name}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-text-tertiary)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-lg transition-all duration-300"
              style={{
                background: 'rgba(255,107,0,0.08)',
                border: '1px solid rgba(255,107,0,0.15)',
                color: 'var(--color-orange)',
                cursor: 'pointer',
              }}
              aria-label="Previous testimonials"
            >
              <FiChevronLeft size={20} />
            </button>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: i === currentIndex ? 'var(--color-orange)' : 'rgba(255,107,0,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-lg transition-all duration-300"
              style={{
                background: 'rgba(255,107,0,0.08)',
                border: '1px solid rgba(255,107,0,0.15)',
                color: 'var(--color-orange)',
                cursor: 'pointer',
              }}
              aria-label="Next testimonials"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
