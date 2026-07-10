/**
 * Hero.jsx — Completely Rebuilt Premium Hero Section
 *
 * Layout:
 *  - Desktop: 12-column grid. Columns 1–5 (45% width) left content, Columns 6–12 (55% width) right 3D Canvas.
 *  - Mobile/Tablet: Stacked layout, text first, 3D Canvas below, height auto.
 *
 * Spacing: Professional 8px spacing scale.
 */

import { useRef, useEffect, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoaderContext } from '@context/LoaderContext'
import { gsap } from '@utils/gsapConfig'

import HeroBackground      from './HeroBackground'
import HeroHeadline        from './HeroHeadline'
import HeroStats           from './HeroStats'
import HeroScrollIndicator from './HeroScrollIndicator'
import MagneticButton      from '@components/ui/MagneticButton'

// ── Ripple button wrapper ──────────────────────────────────────
const RippleButton = ({ children, className, to, primary }) => {
  const btnRef = useRef(null)

  const handleClick = useCallback((e) => {
    const btn  = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const ripple = document.createElement('span')
    const size   = Math.max(rect.width, rect.height) * 2
    Object.assign(ripple.style, {
      position:     'absolute',
      width:        `${size}px`,
      height:       `${size}px`,
      left:         `${x - size / 2}px`,
      top:          `${y - size / 2}px`,
      borderRadius: '50%',
      background:   primary ? 'rgba(255,255,255,0.18)' : 'rgba(255,107,0,0.15)',
      transform:    'scale(0)',
      animation:    'rippleEffect 0.6s ease-out forwards',
      pointerEvents:'none',
    })
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 650)
  }, [primary])

  return (
    <MagneticButton strength={0.28}>
      <Link
        ref={btnRef}
        to={to}
        className={className}
        onClick={handleClick}
        data-cursor="hover"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {children}
      </Link>
    </MagneticButton>
  )
}

// ── Hero Component ─────────────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
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
          paddingTop: 'clamp(2rem, 5vw, 4rem)',
          paddingBottom: 'clamp(2rem, 5vw, 4rem)',
          opacity: startEntrance ? 1 : 0,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full h-full">

          {/* ── LEFT COLUMN — 45% width on desktop ───────────── */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 lg:gap-8">

            {/* Company name */}
            <div className="hero-stagger flex items-center gap-3">
              <span
                style={{
                  display: 'block',
                  width: '2rem',
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
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
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
                    marginLeft: '0.4em',
                    fontWeight: 'var(--weight-regular)',
                    opacity: 0.75,
                  }}
                >
                  Technologies
                </span>
              </p>
            </div>

            {/* Headline */}
            <div className="hero-stagger">
              <HeroHeadline />
            </div>

            {/* CTA Buttons */}
            <div className="hero-stagger flex flex-wrap items-center gap-4">
              <RippleButton to="/contact" className="btn-primary btn-lg shine" primary>
                Start a Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </RippleButton>

              <RippleButton to="/services" className="btn-secondary btn-lg">
                Our Services
              </RippleButton>
            </div>

            {/* Stats */}
            <div className="hero-stagger">
              <div
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(255,107,0,0.25), rgba(255,255,255,0.06) 60%, transparent)',
                  marginBottom: '1.25rem',
                }}
                aria-hidden="true"
              />
              <HeroStats />
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
    </section>
  )
}

export default Hero
