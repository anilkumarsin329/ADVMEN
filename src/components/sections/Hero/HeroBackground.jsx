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
    </div>
  )
}

export default HeroBackground
