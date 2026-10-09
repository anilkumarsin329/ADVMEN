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
        alt=""
        className="hero-bg-image"
        fetchpriority="high"
        decoding="async"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.6,
          mixBlendMode: 'multiply',
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'auto',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: '40vw',
          height: '40vw',
          maxHeight: '480px',
          maxWidth: '480px',
          background: 'radial-gradient(circle, rgba(232,93,0,0.12) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default HeroBackground
