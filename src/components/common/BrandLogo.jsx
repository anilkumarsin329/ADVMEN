/**
 * components/common/BrandLogo.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Official Brand Logo Component
 * - Renders the complete, authentic "AM" Monogram Logo
 * - Includes exact "A D V M E N" typography & "For Every Brandman" tagline
 * - 100% Transparent blending with zero black box outline
 * ─────────────────────────────────────────────────────────────
 */

import React from 'react'

const BrandLogo = ({ 
  mode = 'image', // 'image' | 'vector'
  size = 'normal', // 'small' | 'normal' | 'large'
  className = ''
}) => {
  // Height and width sizing for circular container
  const circleSize = 
    size === 'small' 
      ? 'w-9 h-9 sm:w-10 sm:h-10' 
      : size === 'large' 
      ? 'w-14 h-14 sm:w-16 sm:h-16' 
      : 'w-11 h-11 sm:w-12 sm:h-12'

  if (mode === 'image') {
    return (
      <div className={`inline-flex items-center select-none group ${className}`}>
        <div
          className={`${circleSize} rounded-full overflow-hidden flex items-center justify-center p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--color-orange)]`}
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(30,30,35,0.9), rgba(5,5,8,0.95))',
            border: '1.5px solid rgba(255, 107, 0, 0.4)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(255, 107, 0, 0.2)',
          }}
        >
          <img
            src="/ADVMEN logo.png"
            alt="ADVMEN Technologies — For Every Brandman"
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={{
              mixBlendMode: 'screen',
              filter: 'contrast(140%) brightness(110%)',
            }}
            draggable="false"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* ── AM Monogram Icon SVG ── */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <div className="absolute -inset-1 rounded-full bg-[#FF6B00]/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <svg
          className={`${imgHeight} w-auto relative z-10 transition-transform duration-300 group-hover:scale-105`}
          viewBox="0 0 110 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* White 'A' Left Leg & Slope */}
          <path
            d="M12 68L40 18L58 48"
            stroke="white"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* White 'A' Horizontal Crossbar */}
          <path
            d="M24 50H46"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Orange 'M' Inner V-Valley */}
          <path
            d="M50 38L70 68L88 28"
            stroke="#FF6B00"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* White 'M' Right Vertical Leg */}
          <path
            d="M88 28V68"
            stroke="white"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Typography Column ── */}
      <div className="flex flex-col justify-center leading-none">
        {/* ADVMEN with Chevron A and Orange M */}
        <div className="flex items-center gap-1 font-display font-black text-white text-lg sm:text-xl tracking-[0.2em]" style={{ letterSpacing: '0.2em' }}>
          <span className="text-[var(--color-orange)] font-bold">^</span>
          <span>D</span>
          <span>V</span>
          <span className="text-[var(--color-orange)]">M</span>
          <span>E</span>
          <span>N</span>
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-3 h-px bg-[var(--color-orange)]/60" />
          <span className="font-mono text-[0.52rem] sm:text-[0.58rem] text-gray-300 uppercase tracking-[0.14em]">
            For Every Brandman
          </span>
          <span className="w-3 h-px bg-[var(--color-orange)]/60" />
        </div>
      </div>
    </div>
  )
}

export default BrandLogo
