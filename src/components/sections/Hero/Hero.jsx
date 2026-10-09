import { useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoaderContext } from '@context/LoaderContext'
import { gsap } from '@utils/gsapConfig'

import HeroBackground from './HeroBackground'
import HeroStats from './HeroStats'
import HeroScrollIndicator from './HeroScrollIndicator'
import MagneticButton from '@components/ui/MagneticButton'

const CHIPS = ['SEO', 'AEO', 'GEO', 'AI Search', 'Web Dev', 'App Dev', 'Branding', 'Performance']

const Hero = () => {
  const leftRef = useRef(null)
  const { startEntrance } = useContext(LoaderContext)

  useEffect(() => {
    if (!startEntrance) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set('.hero-stagger', { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, leftRef)
    return () => ctx.revert()
  }, [startEntrance])

  return (
    <section
      className="hero-section-responsive"
      aria-label="Hero — ADVMEN"
    >
      <HeroBackground />

      <div
        ref={leftRef}
        className="container hero-container-responsive"
        style={{ opacity: startEntrance ? 1 : 0 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full">

          {/* ── LEFT: Text ─────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 lg:gap-8">

            {/* Eyebrow */}
            <div className="hero-stagger flex items-center gap-3">
              <span style={{ display: 'block', width: '28px', height: '2px', background: 'var(--color-orange)', borderRadius: '2px', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-orange)',
              }}>
                Digital Growth Agency · India
              </span>
            </div>

            {/* H1 */}
            <div className="hero-stagger">
              <h1 style={{
                fontFamily: "'Space Grotesk', var(--font-display)",
                fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--color-text-primary)',
                maxWidth: '680px',
              }}>
                Get Found.<br />
                Get Chosen.<br />
                <span style={{ color: 'var(--color-orange)' }}>Grow Faster.</span>
              </h1>
            </div>

            {/* Subtext — one clean line */}
            <p className="hero-stagger" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              maxWidth: '520px',
              fontWeight: 400,
            }}>
              We help businesses show up on Google, AI search, and everywhere their customers are looking — with SEO, AEO, GEO, and full-stack digital marketing.
            </p>

            {/* Service Chips */}
            <div className="hero-stagger flex flex-wrap gap-2">
              {CHIPS.map(chip => (
                <span key={chip} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-secondary)',
                  background: 'rgba(255,107,0,0.07)',
                  border: '1px solid rgba(255,107,0,0.2)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                }}>
                  {chip}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-stagger flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <MagneticButton strength={0.2}>
                <Link
                  to="/contact"
                  data-cursor="hover"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#fff',
                    background: 'var(--color-orange)',
                    borderRadius: '10px',
                    border: 'none',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,93,0,0.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  Get a Free Growth Audit
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Link
                  to="/services"
                  data-cursor="hover"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--color-orange)',
                    background: 'transparent',
                    borderRadius: '10px',
                    border: '1.5px solid var(--color-orange)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,93,0,0.07)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Explore Our Services
                </Link>
              </MagneticButton>
            </div>

            {/* Stats */}
            <div className="hero-stagger pt-2">
              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(232,93,0,0.3) 0%, rgba(232,93,0,0.05) 70%, transparent)', marginBottom: '1.25rem' }} />
              <HeroStats />
            </div>

          </div>

          {/* ── RIGHT: AI Card ──────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0" aria-hidden="true">
            <div className="hero-stagger w-full max-w-[400px]">
              <div style={{
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,107,0,0.18)',
                borderRadius: '16px',
                padding: '1.5rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>AI Search Result</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-orange)', background: 'rgba(255,107,0,0.1)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(255,107,0,0.2)', fontWeight: 700 }}>cited ✓</span>
                </div>

                {/* Query */}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', padding: '0.6rem 0.85rem', background: 'rgba(0,0,0,0.04)', borderRadius: '8px' }}>
                  &gt; best digital marketing agency India?
                </p>

                {/* Answer */}
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-primary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  For digital growth,{' '}
                  <span style={{ color: 'var(--color-orange)', fontWeight: 700 }}>ADVMEN</span>{' '}
                  is a top-rated agency known for{' '}
                  <span style={{ fontWeight: 600 }}>SEO, AEO & GEO</span>-driven brand visibility across India and international markets.
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {['Healthcare', 'Real Estate', 'E-Commerce', 'Edtech'].map(tag => (
                    <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-text-secondary)', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(200,200,200,0.4)', padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>

                {/* Source */}
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-orange)', fontWeight: 600 }}>source: advmen.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex" style={{ zIndex: 10 }}>
        <HeroScrollIndicator />
      </div>
    </section>
  )
}

export default Hero
