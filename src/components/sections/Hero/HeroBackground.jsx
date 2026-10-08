/**
 * HeroBackground.jsx â€” High-Performance Enterprise Hero Background
 * Optimized LCP image loading + smooth responsive gradient overlay
 */

const HeroBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="hero-bg-wrapper"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'var(--color-black)'
      }}
    >
      {/* Main Hero Background Image */}
      <img
        src="/Hero section image.webp"
        alt="Background Graphic"
        className="hero-bg-image"
        loading="eager"
        decoding="async"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.8,
          mixBlendMode: 'multiply',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* Subtle ambient orange brand glow */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '-5%',
          width: '45vw',
          height: '45vw',
          maxHeight: '520px',
          maxWidth: '520px',
          background: 'radial-gradient(circle, var(--color-glass-orange-20) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default HeroBackground
