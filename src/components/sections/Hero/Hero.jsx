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
import HeroGrowthGraph from './HeroGrowthGraph'
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
    color: 'var(--color-text-inverse, #FFE6CF)',
    background: 'linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-light) 100%)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px var(--color-glass-orange-20)',
    border: '1px solid var(--color-border-orange)',
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
    color: 'var(--color-text-primary, #141418)',
    background: 'transparent',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '12px',
    border: '1px solid var(--color-border-strong)',
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
            e.currentTarget.style.boxShadow = '0 8px 28px var(--color-border-orange-strong)'
          } else {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.background = 'var(--color-surface-1)'
            e.currentTarget.style.borderColor = 'var(--color-border-orange)'
          }
        }}
        onMouseLeave={(e) => {
          if (isPrimary) {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px var(--color-glass-orange-20)'
          } else {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'var(--color-border-strong)'
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
      aria-label="Hero — ADVMEN"
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
                  background: 'var(--color-orange)',
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
                <span style={{ color: 'var(--color-orange)', fontWeight: 700, letterSpacing: '0.08em' }}>
                  ADVMEN
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
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-text-primary)',
                  maxWidth: '700px',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                We Build Digital<br />
                Experiences That<br />
                <span
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-light) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Drive Business Growth.
                </span>
              </h1>

              {/* Supporting Text */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)',
                  color: 'var(--color-text-secondary)',
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
                  background: 'linear-gradient(90deg, var(--color-border-orange) 0%, var(--color-border-subtle) 60%, transparent)',
                  marginBottom: '0.875rem',
                }}
                aria-hidden="true"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-secondary)',
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
          <div className="hidden lg:block lg:col-span-6 h-full relative" aria-hidden="true">
            <div className="absolute inset-0 flex items-center justify-center">
              <HeroGrowthGraph />
            </div>
          </div>
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

