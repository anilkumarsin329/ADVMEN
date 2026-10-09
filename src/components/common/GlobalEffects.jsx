/**
 * GlobalEffects.jsx — Optimized, scroll-smooth version
 * Removed canvas RAF loop + heavy blur filters that caused jank
 */

const GlobalEffects = () => (
  <>
    {/* Noise texture — CSS only, zero JS */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        willChange: 'auto',
      }}
    />

    {/* Static gradient orbs — no animation, no blur filter */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-8%',
        width: '55vw',
        height: '55vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 65%)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-8%',
        width: '45vw',
        height: '45vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204,85,0,0.03) 0%, transparent 65%)',
      }} />
    </div>
  </>
)

export default GlobalEffects
