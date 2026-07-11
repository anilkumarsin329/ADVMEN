/**
 * Hero.jsx — Premium Hero Section with Neomorphism UI
 * 
 * Improvements:
 * - Clear headline with unique value proposition
 * - Strong CTAs: "Book a Strategy Call" + "View Case Studies"
 * - Neomorphism UI styling
 * - Better typography hierarchy
 * - Improved whitespace
 * - Mobile-first responsive design
 */

import { useRef, useEffect, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoaderContext } from '@context/LoaderContext'
import { gsap } from '@utils/gsapConfig'

import HeroBackground from './HeroBackground'
import HeroHeadline from './HeroHeadline'
import HeroStats from './HeroStats'
import HeroScrollIndicator from './HeroScrollIndicator'
import MagneticButton from '@components/ui/MagneticButton'

// ── Neomorphism Button Component ───────────────────────────────
const NeomorphicButton = ({ children, className, to, variant = 'primary', onClick }) => {
  const btnRef = useRef(null)

  const handleClick = useCallback((e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height) * 2
    Object.assign(ripple.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
      borderRadius: '50%',
      background: variant === 'primary' ? 'rgba(255,255,255,0.18)' : 'rgba(255,107,0,0.15)',
      transform: 'scale(0)',
      animation: 'rippleEffect 0.6s ease-out forwards',
      pointerEvents: 'none',
    })
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 650)
  }, [variant])

  const baseStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    padding: 'clamp(0.875rem, 2vw, 1.125rem) clamp(1.5rem, 3vw, 2rem)',
    fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
    fontWeight: '600',
    letterSpacing: '0.02em',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
  }

  const primaryStyle = {
    ...baseStyle,
    background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.95) 0%, rgba(255, 140, 0, 0.9) 100%)',
    color: '#fff',
    boxShadow: '0 8px 24px rgba(255, 107, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 107, 0, 0.4)',
  }

  const secondaryStyle = {
    ...baseStyle,
    background: 'rgba(255, 255, 255, 0.08)',
    color: 'var(--color-text-primary)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    border: '1.5px solid rgba(255, 107, 0, 0.2)',
    backdropFilter: 'blur(10px)',
  }

  const hoverPrimaryStyle = {
    background: 'linear-gradient(135deg, rgba(255, 107, 0, 1) 0%, rgba(255, 150, 0, 0.95) 100%)',
    boxShadow: '0 16px 40px rgba(255, 107, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-2px)',
  }

  const hoverSecondaryStyle = {
    background: 'rgba(255, 255, 255, 0.12)',
    boxShadow: '0 12px 32px rgba(255, 107, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    border: '1.5px solid rgba(255, 107, 0, 0.3)',
    transform: 'translateY(-2px)',
  }

  const finalStyle = variant === 'primary' ? primaryStyle : secondaryStyle

  return (
    <MagneticButton strength={0.28}>
      <Link
        ref={btnRef}
        to={to}
        className={className}
        onClick={(e) => {
          handleClick(e)
          onClick?.(e)
        }}
        data-cursor="hover"
        style={finalStyle}
        onMouseEnter={(e) => {
          const hoverStyle = variant === 'primary' ? hoverPrimaryStyle : hoverSecondaryStyle
          Object.assign(e.currentTarget.style, hoverStyle)
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, finalStyle)
        }}
      >
        {children}
      </Link>
    </MagneticButton>
  )
}

// ── Hero Component ─────────────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const { startEntrance } = useContext(LoaderContext)

  useEffect(() => {
    if (!startEntrance) return

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        opacity: 0,
        y: 36,
        filter: 'blur(8px)',
        duration: 1.0,
        stagger: 0.13,
        ease: 'expo.out',
        delay: 0.35,
        clearProps: 'filter',
      })
    }, leftRef)
    return () => ctx.revert()
  }, [startEntrance])

  return (
    <section
      ref={sectionRef}
      className="relative w-full hero-section-responsive"
      style={{
        minHeight: '100vh',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
      aria-label="Hero — ADVMEN Technologies"
    >
      <HeroBackground />

      {/* ── Main content ─────────────────────────────────────── */}
      <div
        ref={leftRef}
        className="relative container hero-container-responsive"
        style={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          height: '100%',
        paddingTop: 'clamp(5rem, 10vw, 6rem)',
          paddingBottom: 'clamp(2rem, 5vw, 4rem)',
          opacity: startEntrance ? 1 : 0,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full h-full">

          {/* ── LEFT COLUMN — 45% width on desktop ───────────── */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-8 lg:gap-10">

            {/* Company name */}
            <div className="hero-stagger flex items-center gap-2 sm:gap-3">
              <span
                style={{
                  display: 'block',
                  width: 'clamp(0.75rem, 1.5vw, 1.5rem)',
                  height: '1px',
                  background: 'var(--gradient-orange)',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-semibold)',
                  fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}
              >
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
                  ADVMEN
                </span>
                <span
                  style={{
                    color: 'var(--color-text-primary)',
                    marginLeft: '0.25em',
                    fontWeight: 'var(--weight-regular)',
                    opacity: 0.75,
                    fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
                  }}
                >
                  Technologies
                </span>
              </p>
            </div>

            {/* Main Headline - Clear Value Proposition */}
            <div className="hero-stagger">
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 5.5vw, 3.5rem)',
                  fontWeight: 'var(--weight-bold)',
                  lineHeight: '1.15',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                }}
              >
                We Build Brands That
                <span
                  style={{
                    display: 'block',
                    background: 'linear-gradient(90deg, #FF6B00 0%, #FF9A45 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Dominate Markets
                </span>
              </h1>

              {/* Supporting Line */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  maxWidth: '95%',
                  fontWeight: '400',
                }}
              >
                Strategic branding, digital marketing, and web solutions that drive measurable growth for ambitious businesses.
              </p>
            </div>

            {/* CTA Buttons - Primary + Secondary */}
            <div className="hero-stagger flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-5">
              <NeomorphicButton
                to="/contact"
                variant="primary"
              >
                <span>Book a Strategy Call</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9h10M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </NeomorphicButton>

              <NeomorphicButton
                to="/work"
                variant="secondary"
              >
                <span>View Case Studies</span>
              </NeomorphicButton>
            </div>

            {/* Trust Signals */}
            <div className="hero-stagger">
              <div
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(255,107,0,0.25), rgba(255,255,255,0.06) 60%, transparent)',
                  marginBottom: '1.5rem',
                }}
                aria-hidden="true"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p
                  style={{
                    fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
                    color: 'var(--color-text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: '600',
                  }}
                >
                  Trusted by Industry Leaders
                </p>
                <HeroStats />
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN — empty, 3D fills full section bg ── */}
          <div className="col-span-12 lg:col-span-7" aria-hidden="true" />

        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex"
        style={{ zIndex: 10 }}
      >
        <HeroScrollIndicator />
      </div>

      <style>{`
        @keyframes rippleEffect {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
      `}</style>
    </section>
  )
}

export default Hero
