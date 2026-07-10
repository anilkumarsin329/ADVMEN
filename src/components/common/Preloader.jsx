/**
 * Preloader.jsx — ADVMEN Technologies
 * Fixed: logo ref is now only the <img> — GSAP y-animation
 * never shifts the SVG ring container, so it stays centered.
 */

import { useContext, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { LoaderContext } from '@context/LoaderContext'
import { gsap } from '@utils/gsapConfig'

const PreloaderInner = () => {
  const { isLoading, progress, updateProgress, setLoadingComplete, setStartEntrance } = useContext(LoaderContext)

  const wrapperRef  = useRef(null)
  const curtainRef  = useRef(null)
  const logoImgRef  = useRef(null)   // only the <img> — GSAP animates this
  const strokeRef   = useRef(null)
  const counterRef  = useRef(null)
  const barFillRef  = useRef(null)
  const taglineRef  = useRef(null)
  const progressRef = useRef(null)
  const hasExited   = useRef(false)
  const startTime   = useRef(0)

  // Lock body scroll
  useEffect(() => {
    startTime.current = Date.now()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Simulate progress
  useEffect(() => {
    if (!isLoading) return
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5
      if (current >= 100) {
        updateProgress(100)
        clearInterval(interval)
      } else {
        updateProgress(Math.floor(current))
      }
    }, 60)
    return () => clearInterval(interval)
  }, [isLoading, updateProgress])

  // Entrance — animate only logo img, tagline, progress block
  useEffect(() => {
    if (!wrapperRef.current) return

    gsap.set([logoImgRef.current, taglineRef.current, progressRef.current], {
      opacity: 0,
      y: 18,
    })
    gsap.set(strokeRef.current, { strokeDashoffset: 600 })

    const tl = gsap.timeline()
    tl.to(logoImgRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.2 })
      .to(strokeRef.current,   { strokeDashoffset: 0, duration: 1.2, ease: 'expo.inOut' }, '-=0.4')
      .to(taglineRef.current,  { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.5')
      .to(progressRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, '-=0.3')

    return () => tl.kill()
  }, [])

  // Counter + bar
  useEffect(() => {
    if (counterRef.current) {
      counterRef.current.textContent = String(progress).padStart(3, '0')
    }
    if (barFillRef.current) {
      gsap.to(barFillRef.current, { width: `${progress}%`, duration: 0.4, ease: 'expo.out' })
    }
  }, [progress])

  // Exit
  useEffect(() => {
    if (progress < 100 || hasExited.current) return
    const elapsed  = Date.now() - startTime.current
    const minDelay = Math.max(0, 800 - elapsed)

    const timer = setTimeout(() => {
      hasExited.current = true
      document.body.style.overflow = ''

      if (setStartEntrance) {
        setStartEntrance(true)
      }

      gsap.timeline({ onComplete: () => setLoadingComplete() })
        .to(curtainRef.current, { scaleY: 1, duration: 0.7, ease: 'expo.inOut', transformOrigin: 'bottom' })
        .to(wrapperRef.current, { opacity: 0, duration: 0.25 }, '-=0.15')
        .set(wrapperRef.current, { display: 'none' })
    }, minDelay)

    return () => clearTimeout(timer)
  }, [progress, setLoadingComplete, setStartEntrance])

  if (!isLoading) return null

  return (
    <div
      ref={wrapperRef}
      role="status"
      aria-label="Loading ADVMEN Technologies"
      aria-live="polite"
      style={{
        position:       'fixed',
        top:            '50%',
        left:           '50%',
        transform:      'translate(-50%, -50%)',
        width:          '100vw',
        height:         '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        zIndex:         999999,
        overflow:       'hidden',
        background:     'var(--color-black)',
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,107,0,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Center content — no transforms on this wrapper */}
      <div
        style={{
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '1.5rem',
          position:       'relative',
          zIndex:         1,
        }}
      >
        {/* Ring + logo — ring container has explicit size so absolute SVG fills it */}
        <div
          style={{
            position:       'relative',
            width:          '120px',
            height:         '120px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
          }}
        >
          {/* Animated SVG ring — position absolute inside the 120×120 box */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <circle
              ref={strokeRef}
              cx="60" cy="60" r="54"
              stroke="url(#preloaderGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset="600"
            />
            <defs>
              <linearGradient id="preloaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FF8C38" />
              </linearGradient>
            </defs>
          </svg>

          {/* Logo img — only this element gets GSAP y-animation */}
          <img
            ref={logoImgRef}
            src="/ADVMEN logo.png"
            alt="ADVMEN"
            draggable="false"
            style={{
              position:   'relative',
              zIndex:     1,
              width:      '68px',
              height:     '68px',
              objectFit:  'contain',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            fontWeight:    500,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color:         'var(--color-text-tertiary)',
            margin:        0,
          }}
        >
          ADVMEN TECHNOLOGIES
        </p>

        {/* Progress */}
        <div
          ref={progressRef}
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            gap:            '0.75rem',
            width:          '180px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span
              ref={counterRef}
              style={{
                fontFamily:         'var(--font-display)',
                fontWeight:         700,
                fontSize:           '2.25rem',
                lineHeight:         1,
                color:              'var(--color-text-primary)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              000
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize:   '1.25rem',
                color:      'var(--color-orange)',
              }}
            >
              %
            </span>
          </div>

          {/* Bar */}
          <div
            style={{
              width:        '100%',
              height:       '1px',
              background:   'var(--color-border-subtle)',
              borderRadius: '999px',
              overflow:     'hidden',
              position:     'relative',
            }}
          >
            <div
              ref={barFillRef}
              style={{
                position:     'absolute',
                top:          0,
                left:         0,
                bottom:       0,
                width:        '0%',
                background:   'var(--gradient-orange)',
                borderRadius: '999px',
                boxShadow:    '0 0 8px rgba(255,107,0,0.6)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Exit curtain */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        style={{
          position:        'absolute',
          inset:           0,
          background:      'var(--color-black)',
          transform:       'scaleY(0)',
          transformOrigin: 'bottom',
          pointerEvents:   'none',
          zIndex:          2,
        }}
      />
    </div>
  )
}

const Preloader = () => {
  if (typeof document === 'undefined') return null
  return createPortal(<PreloaderInner />, document.body)
}

export default Preloader
