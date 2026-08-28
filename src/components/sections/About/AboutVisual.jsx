import { useRef } from 'react'
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

// Single capability card
const CapabilityCard = ({ icon, label, desc, className }) => {
  return (
    <div
      className={`about-cap-card group ${className || ''}`}
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '1rem',
        padding:        '1rem 1.25rem',
        borderRadius:   '16px',
        background:     'var(--color-surface-1)',
        border:         '1px solid rgba(255, 255, 255, 0.015)',
        boxShadow:      'var(--shadow-neu-convex)',
        cursor:         'default',
        transition:     'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, background-color 0.3s ease',
        width:          '100%',
        minHeight:      '80px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,107,0,0.25)'
        e.currentTarget.style.boxShadow   = '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 12px rgba(255, 107, 0, 0.08)'
        e.currentTarget.style.transform   = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.015)'
        e.currentTarget.style.boxShadow   = 'var(--shadow-neu-convex)'
        e.currentTarget.style.transform   = 'translateY(0)'
      }}
    >
      <div
        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
        style={{
          width:        '44px',
          height:       '44px',
          borderRadius: '12px',
          background:   'var(--color-surface-4)',
          boxShadow:    'var(--shadow-neu-inset)',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          color:        'var(--color-orange)',
          flexShrink:   0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p
          style={{
            fontFamily:  'var(--font-display)',
            fontWeight:  600,
            fontSize:    '1rem',
            color:       'var(--color-text-primary)',
            lineHeight:  1.2,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '0.8125rem',
            color:      'var(--color-text-secondary)',
            marginTop:  '4px',
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  )
}

const AboutVisual = () => {
  return (
    <div
      className="relative w-full flex items-start justify-center"
      style={{ minHeight: 'auto' }}
    >
      {/* Soft glow behind composition */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full pointer-events-none filter blur-[40px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Mobile/Tablet layout: Grid of cards */}
      <div className="flex flex-col lg:hidden items-center gap-6 w-full max-w-[600px] px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={i} {...cap} />
          ))}
        </div>
      </div>

      {/* Desktop layout: 2-column Grid (lg and up) */}
      <div
        className="hidden lg:grid"
        style={{
          gridTemplateColumns: '1fr 1fr',
          gap:                 '16px',
          alignItems:          'center',
          width:               '100%',
          maxWidth:            '640px',
        }}
      >
        {/* Left column — cards 0, 2, 4 */}
        <div className="flex flex-col gap-4 w-full">
          <CapabilityCard {...capabilities[0]} />
          <CapabilityCard {...capabilities[2]} />
          <CapabilityCard {...capabilities[4]} />
        </div>

        {/* Right column — cards 1, 3, 5 */}
        <div className="flex flex-col gap-4 w-full">
          <CapabilityCard {...capabilities[1]} />
          <CapabilityCard {...capabilities[3]} />
          <CapabilityCard {...capabilities[5]} />
        </div>
      </div>
    </div>
  )
}

export default AboutVisual
