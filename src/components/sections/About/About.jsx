/**
 * About.jsx — ADVMEN Technologies
 * Premium About section with full mobile responsiveness
 * GSAP scroll-triggered animations
 */

import { useRef, useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@utils/gsapConfig'
import MagneticButton from '@components/ui/MagneticButton'
import AboutBackground from './AboutBackground'
import AboutStats from './AboutStats'
import AboutVisual from './AboutVisual'

const pillars = [
  'Brand Strategy',
  'Creative Design',
  'Web Development',
  'Performance Marketing',
]

const useRipple = () => {
  const ref = useRef(null)
  const handleClick = useCallback((e) => {
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const ripple = document.createElement('span')
    Object.assign(ripple.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      left: `${e.clientX - rect.left - size / 2}px`,
      top: `${e.clientY - rect.top - size / 2}px`,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.15)',
      transform: 'scale(0)',
      animation: 'rippleEffect 0.6s ease-out forwards',
      pointerEvents: 'none',
    })
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 650)
  }, [])
  return { ref, handleClick }
}

const About = () => {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const hasAnimated = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll animations
  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        const ctx = gsap.context(() => {
          // Eyebrow line
          gsap.from('.about-eyebrow-line', {
            scaleX: 0,
            duration: 0.8,
            ease: 'expo.out',
            transformOrigin: 'left',
          })

          // Eyebrow text
          gsap.from('.about-eyebrow-text', {
            opacity: 0,
            x: -16,
            duration: 0.7,
            ease: 'expo.out',
            delay: 0.15,
          })

          // Headline
          gsap.from('.about-headline-line', {
            yPercent: 110,
            opacity: 0,
            duration: 1.0,
            ease: 'expo.out',
            stagger: 0.1,
            delay: 0.2,
          })

          // Description
          gsap.from('.about-desc', {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
            delay: 0.5,
          })

          // Pillars
          gsap.from('.about-pillar', {
            opacity: 0,
            x: -20,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 0.65,
          })

          // Divider
          gsap.from('.about-divider', {
            scaleX: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'expo.out',
            delay: 0.8,
            transformOrigin: 'left',
          })

          // Stats
          gsap.from('.about-stat-item', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 0.9,
          })

          // CTA
          gsap.from('.about-cta', {
            opacity: 0,
            y: 16,
            duration: 0.7,
            ease: 'expo.out',
            delay: 1.05,
          })
        }, leftRef)

        return () => ctx.revert()
      },
      { threshold: isMobile ? 0.15 : 0.12 }
    )

    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [isMobile])

  const { ref: ctaRef, handleClick: handleCtaClick } = useRipple()

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'clamp(2rem, 5vw, 4rem)',
        paddingBottom: 'clamp(2rem, 5vw, 4rem)',
        background: 'var(--color-black)',
      }}
      aria-label="About ADVMEN Technologies"
    >
      <AboutBackground />

      <div className="relative container" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 sm:gap-10 lg:gap-12 items-start lg:items-center">
          {/* LEFT COLUMN */}
          <div ref={leftRef} className="flex flex-col w-full" style={{ gap: 'clamp(1.25rem, 3vh, 2rem)' }}>
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span
                className="about-eyebrow-line"
                style={{
                  display: 'block',
                  width: '2rem',
                  height: '1px',
                  background: 'var(--gradient-orange)',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span
                className="about-eyebrow-text"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                  fontWeight: 'var(--weight-medium)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-orange)',
                }}
              >
                About ADVMEN
              </span>
            </div>

            {/* Headline */}
            <div>
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                }}
              >
                {['We Create Brands', 'That Leave a', 'Lasting Impression.'].map((line, i) => (
                  <div key={i} className="overflow-hidden block" style={{ paddingBottom: '0.04em' }}>
                    <span className="about-headline-line inline-block">
                      {i === 2 ? (
                        <span
                          style={{
                            background: 'linear-gradient(90deg, #FF6B00 0%, #FF9A45 50%, #FF6B00 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'gradientShift 4s ease infinite',
                          }}
                        >
                          Lasting Impression.
                        </span>
                      ) : (
                        line
                      )}
                    </span>
                  </div>
                ))}
              </h2>
            </div>

            {/* Description */}
            <div className="flex flex-col w-full" style={{ gap: '0.75rem', maxWidth: '500px' }}>
              <p
                className="about-desc"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                ADVMEN Technologies is a full-service digital agency built for ambitious brands. We combine strategic thinking with creative execution to deliver results that matter.
              </p>
              <p
                className="about-desc"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                From brand identity to digital growth — we handle every touchpoint of your business with precision and purpose.
              </p>
            </div>

            {/* Service pillars */}
            <div className="flex flex-wrap w-full" style={{ gap: '0.5rem' }}>
              {pillars.map((p) => (
                <span
                  key={p}
                  className="about-pillar inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:border-[rgba(255,107,0,0.3)] hover:bg-[rgba(255,107,0,0.1)]"
                  style={{
                    background: 'rgba(255,107,0,0.07)',
                    border: '1px solid rgba(255,107,0,0.18)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
                    color: 'var(--color-orange-light)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--color-orange)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  {p}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div
              className="about-divider w-full"
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, rgba(255,107,0,0.2), rgba(255,255,255,0.05) 60%, transparent)',
              }}
              aria-hidden="true"
            />

            {/* Stats */}
            <AboutStats />

            {/* Since Badge */}
            <div
              className="about-cta"
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '0.5rem',
              }}
            >
              Since 2019
            </div>

            {/* CTA */}
            <div className="about-cta w-full">
              <MagneticButton strength={0.28}>
                <Link
                  ref={ctaRef}
                  to="/about"
                  onClick={handleCtaClick}
                  className="btn-primary btn-lg shine"
                  data-cursor="hover"
                  style={{ position: 'relative', overflow: 'hidden', width: '100%', justifyContent: 'center' }}
                >
                  Our Story
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative w-full flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <AboutVisual />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
