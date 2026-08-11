/**
 * HeroBackground.jsx — High-Performance Enterprise Hero Background
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
      }}
    >
      {/* Dark surface fallback */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-surface-0, #121215)',
          zIndex: 0,
        }}
      />

      {/* High-priority enterprise 3D hero visual image */}
      <img
        src="/Hero%20section%20iamge.png"
        alt=""
        fetchPriority="high"
        decoding="async"
        loading="eager"
        width="1920"
        height="1080"
        className="hero-bg-image"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '85% center',
          zIndex: 1,
          display: 'block',
        }}
      />

      {/* Dark gradient overlay for crystal-clear readability */}
      <div
        className="hero-bg-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Top & bottom subtle darkening vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(18, 18, 21, 0.35) 0%, transparent 20%, transparent 80%, rgba(18, 18, 21, 0.5) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
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
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.08) 0%, rgba(255, 107, 0, 0) 70%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default HeroBackground


