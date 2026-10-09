import React from 'react'

const BrandLogo = ({
  mode = 'image',
  size = 'normal',
  className = ''
}) => {
  const imgSize =
    size === 'small'
      ? 'w-9 h-9 sm:w-10 sm:h-10'
      : size === 'large'
      ? 'w-14 h-14 sm:w-16 sm:h-16'
      : 'w-11 h-11 sm:w-12 sm:h-12'

  return (
    <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
      {/* Logo Image */}
      <img
        src="/ADVMEN logo.png"
        alt="ADVMEN"
        className={`${imgSize} object-contain transition-transform duration-300 group-hover:scale-105`}
        draggable="false"
      />
      {/* Brand Name */}
      <div className="flex flex-col justify-center leading-none">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 800,
            letterSpacing: '0.18em',
            color: 'var(--color-text-primary)',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          ADV<span style={{ color: 'var(--color-orange)' }}>M</span>EN
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.12em',
            color: 'var(--color-text-tertiary)',
            textTransform: 'uppercase',
            marginTop: '3px',
            lineHeight: 1,
          }}
        >
          Technologies
        </span>
      </div>
    </div>
  )
}

export default BrandLogo
