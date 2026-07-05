/**
 * AboutVisual.jsx
 * Premium right-side visual composition.
 * Layered glassmorphism cards with service icons + floating animation.
 * GSAP stagger reveal on scroll entry.
 */

import { useRef, useEffect } from 'react'
import { gsap } from '@utils/gsapConfig'

// Service capability cards
const capabilities = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    label: 'Brand Strategy',
    desc:  'Identity that resonates',
    delay: 0,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    label: 'Web Development',
    desc:  'Pixel-perfect execution',
    delay: 0.08,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    label: 'Performance Marketing',
    desc:  'Data-driven growth',
    delay: 0.16,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    label: 'Creative Design',
    desc:  'Visuals that convert',
    delay: 0.24,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'Business Growth',
    desc:  'Scalable strategies',
    delay: 0.32,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
    label: 'App Development',
    desc:  'Native & cross-platform',
    delay: 0.40,
  },
]

// Central brand badge
const BrandBadge = () => (
  <div
    className="about-visual-badge flex flex-col items-center justify-center gap-3"
    style={{
      width:        '160px',
      height:       '160px',
      borderRadius: '50%',
      background:   'radial-gradient(circle at 40% 35%, rgba(255,107,0,0.18) 0%, rgba(255,107,0,0.06) 50%, rgba(10,10,10,0.9) 100%)',
      border:       '1px solid rgba(255,107,0,0.25)',
      boxShadow:    '0 0 40px rgba(255,107,0,0.12), inset 0 0 30px rgba(255,107,0,0.05)',
      backdropFilter: 'blur(20px)',
      flexShrink:   0,
    }}
  >
    <img
      src="/ADVMEN logo.png"
      alt="ADVMEN"
      draggable="false"
      style={{ width: '56px', height: '56px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(255,107,0,0.4))' }}
    />
    <span
      style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.6rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color:         'var(--color-orange)',
      }}
    >
      Since 2019
    </span>
  </div>
)

// Single capability card
const CapabilityCard = ({ icon, label, desc, style, className }) => (
  <div
    className={`about-cap-card ${className || ''}`}
    style={{
      display:        'flex',
      alignItems:     'center',
      gap:            '0.75rem',
      padding:        '0.875rem 1.125rem',
      borderRadius:   '14px',
      background:     'rgba(255,255,255,0.04)',
      border:         '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(16px)',
      boxShadow:      '0 4px 24px rgba(0,0,0,0.3)',
      cursor:         'default',
      transition:     'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
      ...style,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'
      e.currentTarget.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(255,107,0,0.08)'
      e.currentTarget.style.transform   = 'translateY(-3px)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
      e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.3)'
      e.currentTarget.style.transform   = 'translateY(0)'
    }}
  >
    <div
      style={{
        width:        '38px',
        height:       '38px',
        borderRadius: '10px',
        background:   'rgba(255,107,0,0.1)',
        border:       '1px solid rgba(255,107,0,0.15)',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        color:        'var(--color-orange)',
        flexShrink:   0,
      }}
    >
      {icon}
    </div>
    <div style={{ minWidth: 0 }}>
      <p
        style={{
          fontFamily:  'var(--font-display)',
          fontWeight:  600,
          fontSize:    '0.875rem',
          color:       'var(--color-text-primary)',
          lineHeight:  1.2,
          whiteSpace:  'nowrap',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.75rem',
          color:      'var(--color-text-tertiary)',
          marginTop:  '2px',
          whiteSpace: 'nowrap',
        }}
      >
        {desc}
      </p>
    </div>
  </div>
)

const AboutVisual = () => {
  const containerRef = useRef(null)
  const hasAnimated  = useRef(false)

  useEffect(() => {
    if (hasAnimated.current || !containerRef.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        const ctx = gsap.context(() => {
          // Badge entrance
          gsap.from('.about-visual-badge', {
            scale:    0.6,
            opacity:  0,
            duration: 1.0,
            ease:     'back.out(1.4)',
            delay:    0.1,
          })

          // Cards stagger
          gsap.from('.about-cap-card', {
            opacity:  0,
            y:        30,
            scale:    0.92,
            duration: 0.7,
            ease:     'expo.out',
            stagger:  0.07,
            delay:    0.2,
          })

          // Floating badge animation
          gsap.to('.about-visual-badge', {
            y:        -10,
            duration: 3.5,
            ease:     'sine.inOut',
            repeat:   -1,
            yoyo:     true,
            delay:    1.2,
          })
        }, containerRef)

        return () => ctx.revert()
      },
      { threshold: 0.2 }
    )

    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center"
      style={{ minHeight: '520px' }}
    >
      {/* Soft glow behind composition */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          top:          '50%',
          left:         '50%',
          transform:    'translate(-50%, -50%)',
          width:        '380px',
          height:       '380px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
          filter:       'blur(40px)',
          pointerEvents:'none',
        }}
      />

      {/* Grid layout: 2 cols of cards + center badge */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gridTemplateRows:    'repeat(3, auto)',
          gap:                 '12px',
          alignItems:          'center',
          width:               '100%',
          maxWidth:            '580px',
        }}
      >
        {/* Left column — cards 0, 2, 4 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
          <CapabilityCard {...capabilities[0]} />
          <CapabilityCard {...capabilities[2]} />
          <CapabilityCard {...capabilities[4]} />
        </div>

        {/* Center — brand badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
          <BrandBadge />
        </div>

        {/* Right column — cards 1, 3, 5 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
          <CapabilityCard {...capabilities[1]} />
          <CapabilityCard {...capabilities[3]} />
          <CapabilityCard {...capabilities[5]} />
        </div>
      </div>
    </div>
  )
}

export default AboutVisual
