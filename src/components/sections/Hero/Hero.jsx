import { useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoaderContext } from '@context/LoaderContext'
import { gsap } from '@utils/gsapConfig'

import HeroBackground from './HeroBackground'
import HeroStats from './HeroStats'
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
        style={{ opacity: startEntrance ? 1 : 0, pointerEvents: startEntrance ? 'auto' : 'none' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full">

          {/* ── LEFT: Text ─────────────────────────────────────── */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 lg:gap-8">

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
                fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--color-text-primary)',
                maxWidth: '760px',
              }}>
                Leading <span style={{ color: 'var(--color-orange)' }}>Digital Growth &amp; Technology</span> Agency in India
              </h1>
            </div>

            {/* Supporting copy */}
            <p className="hero-stagger" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              maxWidth: '600px',
              fontWeight: 400,
            }}>
              ADVMEN combines SEO, AEO, GEO, content, branding, digital marketing, and web &amp; app development to help your business get discovered and chosen across search engines and AI platforms.
            </p>

            {/* Service Chips */}
            <div className="hero-stagger flex flex-wrap gap-2">
              {CHIPS.map(chip => (
                <span key={chip} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-primary)',
                  background: 'transparent',
                  border: '2px solid var(--color-ink)',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
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
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                    background: 'var(--color-orange)',
                    borderRadius: '6px',
                    border: '2px solid var(--color-ink)',
                    boxShadow: '4px 4px 0 var(--color-ink)',
                    textDecoration: 'none',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translate(3px, 3px)'; e.currentTarget.style.boxShadow = '1px 1px 0 var(--color-ink)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--color-ink)' }}
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
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                    background: 'transparent',
                    borderRadius: '6px',
                    border: '2px solid var(--color-ink)',
                    boxShadow: '4px 4px 0 var(--color-ink)',
                    textDecoration: 'none',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-orange)'; e.currentTarget.style.transform = 'translate(3px, 3px)'; e.currentTarget.style.boxShadow = '1px 1px 0 var(--color-ink)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--color-ink)' }}
                >
                  Explore Our Services
                </Link>
              </MagneticButton>
            </div>

            {/* Stats */}
            <div className="hero-stagger pt-2">
              <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(232,93,4,0.3) 0%, rgba(232,93,4,0.05) 70%, transparent)', marginBottom: '1.25rem' }} />
              <HeroStats />
            </div>

          </div>

          {/* ── RIGHT: AI Card ──────────────────────────────────── */}
          <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0" aria-hidden="true">
            <div className="hero-stagger w-full max-w-[400px]">
              <div style={{
                background: 'var(--color-surface-1)',
                border: '2px solid var(--color-ink)',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '6px 6px 0 var(--color-ink)',
              }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0', fontWeight: 600 }}>AI Search Result</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-ink)', background: 'var(--color-orange)', padding: '3px 10px', borderRadius: '20px', border: '2px solid var(--color-ink)', fontWeight: 700 }}>cited ✓</span>
                </div>

                {/* Query */}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', padding: '0.6rem 0.85rem', background: 'var(--color-surface-4)', border: '2px solid var(--color-ink)', borderRadius: '8px' }}>
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
                    <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-text-secondary)', background: 'transparent', border: '2px solid var(--color-ink)', padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0', fontWeight: 500 }}>{tag}</span>
                  ))}
                </div>

                {/* Source */}
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '2px solid var(--color-ink)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-orange)', fontWeight: 600 }}>source: advmen.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
