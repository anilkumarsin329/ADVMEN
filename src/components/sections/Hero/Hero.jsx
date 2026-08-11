/**
 * Hero.jsx — 10/10 Enterprise IT & Digital Agency Hero Section
 * 
 * - High visual contrast & typography hierarchy
 * - Precise brand copy & enterprise value proposition
 * - High performance LCP asset integration
 * - Accessible micro-interactions & reduced-motion fallback
 */

import { useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoaderContext } from '@context/LoaderContext'
import { gsap } from '@utils/gsapConfig'

import HeroBackground from './HeroBackground'
import HeroStats from './HeroStats'
import HeroScrollIndicator from './HeroScrollIndicator'
import MagneticButton from '@components/ui/MagneticButton'

// ── Enterprise Button Component ──────────────────────────────────
const EnterpriseButton = ({ children, to, variant = 'primary', onClick }) => {
  const isPrimary = variant === 'primary'

  const primaryStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.625rem',
    minHeight: '48px',
    padding: '0.875rem 1.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.01em',
    color: '#FFFFFF',
    background: 'linear-gradient(135deg, #FF6B00 0%, #FF8526 100%)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(255, 107, 0, 0.28)',
    border: '1px solid rgba(255, 107, 0, 0.5)',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    textDecoration: 'none',
    cursor: 'pointer',
  }

  const secondaryStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.625rem',
    minHeight: '48px',
    padding: '0.875rem 1.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.01em',
    color: '#F5F5F5',
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    textDecoration: 'none',
    cursor: 'pointer',
  }

  const baseStyle = isPrimary ? primaryStyle : secondaryStyle

  return (
    <MagneticButton strength={0.2}>
      <Link
        to={to}
        onClick={onClick}
        className="w-full sm:w-auto text-center"
        data-cursor="hover"
        style={baseStyle}
        onMouseEnter={(e) => {
          if (isPrimary) {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(255, 107, 0, 0.45)'
          } else {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
            e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.35)'
          }
        }}
        onMouseLeave={(e) => {
          if (isPrimary) {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 107, 0, 0.28)'
          } else {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)'
          }
        }}
      >
        {children}
      </Link>
    </MagneticButton>
  )
}

// ── Hero Main Component ──────────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const { startEntrance } = useContext(LoaderContext)

  useEffect(() => {
    if (!startEntrance) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      if (leftRef.current) {
        gsap.set(leftRef.current.querySelectorAll('.hero-stagger'), { opacity: 1, y: 0 })
      }
      return
    }

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        opacity: 0,
        y: 24,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, leftRef)

    return () => ctx.revert()
  }, [startEntrance])

  return (
    <section
      ref={sectionRef}
      className="hero-section-responsive"
      aria-label="Hero — ADVMEN Technologies"
    >
      <HeroBackground />

      {/* ── Hero Container ────────────────────────────────────────── */}
      <div
        ref={leftRef}
        className="container hero-container-responsive"
        style={{
          opacity: startEntrance ? 1 : 0,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full">
          {/* ── LEFT COLUMN: Text Content & CTAs ───────────────── */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-4.5 lg:gap-6">
            
            {/* Brand Accent Label */}
            <div className="hero-stagger flex items-center gap-2.5">
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: '#FF6B00',
                  borderRadius: '1px',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  lineHeight: 1,
                }}
              >
                <span style={{ color: '#FF6B00', fontWeight: 700, letterSpacing: '0.08em' }}>
                  ADVMEN
                </span>
                <span
                  style={{
                    color: 'rgba(245, 245, 245, 0.65)',
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    marginLeft: '0.35em',
                  }}
                >
                  Technologies
                </span>
              </p>
            </div>

            {/* Main Headline */}
            <div className="hero-stagger">
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.15rem, 4.5vw, 4.15rem)',
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                  maxWidth: '620px',
                  marginBottom: '1rem',
                }}
              >
                We Build Brands<br />
                That<br />
                <span
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #FF6B00 0%, #FFA048 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Dominate Markets
                </span>
              </h1>

              {/* Supporting Text */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)',
                  color: 'var(--color-text-secondary, #AAAAAA)',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                  fontWeight: 400,
                }}
              >
                We build high-performance websites, applications, and digital solutions that help ambitious businesses grow.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-stagger flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <EnterpriseButton to="/contact" variant="primary">
                <span>Book a Strategy Call</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path
                    d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </EnterpriseButton>

              <EnterpriseButton to="/work" variant="secondary">
                <span>View Case Studies</span>
              </EnterpriseButton>
            </div>

            {/* Trust Signals */}
            <div className="hero-stagger pt-1">
              <div
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(255,107,0,0.35) 0%, rgba(255,255,255,0.08) 60%, transparent)',
                  marginBottom: '0.875rem',
                }}
                aria-hidden="true"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(245, 245, 245, 0.75)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                  }}
                >
                  Trusted by Industry Leaders
                </p>
                <HeroStats />
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Visual Anchor Space on Desktop ───── */}
          <div className="hidden lg:block lg:col-span-6" aria-hidden="true" />
        </div>
      </div>

      {/* ── Scroll Indicator ───────────────────────────────────── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex"
        style={{ zIndex: 10 }}
      >
        <HeroScrollIndicator />
      </div>
    </section>
  )
}

export default Hero

