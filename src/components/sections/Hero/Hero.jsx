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
    color: 'var(--color-orange)',
    background: 'transparent',
    borderRadius: '12px',
    border: '1.5px solid var(--color-orange)',
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
            e.currentTarget.style.background = 'rgba(232,93,0,0.08)'
            e.currentTarget.style.borderColor = 'var(--color-orange-dark)'
          }
        }}
        onMouseLeave={(e) => {
          if (isPrimary) {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px var(--color-glass-orange-20)'
          } else {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'var(--color-orange)'
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
                Your Customers<br />
                Ask AI First.{' '}
                <span
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-light) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Get Named In The Answer.
                </span>
              </h1>

              {/* Supporting Text */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.6,
                  maxWidth: '540px',
                  fontWeight: 600,
                }}
              >
                ADVMEN runs <span style={{ color: 'var(--color-orange)', fontWeight: 800 }}>SEO, AEO and GEO</span> so your brand shows up in <span style={{ color: 'var(--color-orange)', fontWeight: 800 }}>Google, AI Overviews, ChatGPT</span> and <span style={{ color: 'var(--color-orange)', fontWeight: 800 }}>Perplexity</span>.
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
          <div className="col-span-12 lg:col-span-6 h-full relative flex flex-col justify-end lg:justify-center items-center lg:items-end mt-12 lg:mt-0" aria-hidden="true">

            {/* AI Citation Mockup Card */}
            <div className="hero-stagger relative z-10 w-full max-w-[480px] lg:mt-32 lg:mr-8 xl:mr-16">
              <div
                style={{
                  background: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,107,0,0.2)',
                  borderRadius: '14px',
                  padding: '1.25rem 1.5rem',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                }}
              >
                {/* Query bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>AI Search</span>
                  <span style={{ flex: 1, height: '1px', background: 'rgba(200,200,200,0.3)' }} />
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--color-orange)', background: 'rgba(255,107,0,0.1)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(255,107,0,0.2)', fontWeight: 600 }}>cited ✓</span>
                </div>

                {/* Query */}
                <p style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', fontWeight: 500 }}>
                  &gt; best digital marketing agency in Delhi?
                </p>

                {/* AI Answer */}
                <p style={{ fontSize: '0.9rem', fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)', lineHeight: 1.6, marginBottom: '1rem', fontWeight: 600 }}>
                  For digital growth, top picks are{' '}
                  <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Competitor</span>,{' '}
                  <span style={{ color: 'var(--color-orange)', fontWeight: 800, fontSize: '0.95rem' }}>ADVMEN</span>{' '}
                  and{' '}
                  <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Competitor</span>.{' '}
                  ADVMEN is known for <span style={{ color: 'var(--color-orange)', fontWeight: 800 }}>SEO, AEO & GEO-driven</span> brand visibility.
                </p>

                {/* Source + Industries */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-orange)', fontWeight: 600 }}>source: advmen.com</span>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {['healthcare', 'real estate', 'e-commerce', 'edtech'].map(tag => (
                      <span key={tag} style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(200,200,200,0.5)', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
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

