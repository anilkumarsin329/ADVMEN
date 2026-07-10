/**
 * AboutBackground.jsx
 * Subtle dark background — consistent with Hero but more subdued.
 * Content is always the focus here.
 */

const AboutBackground = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 overflow-hidden pointer-events-none"
    style={{ zIndex: 0 }}
  >
    {/* Base */}
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(180deg, #121215 0%, #160f0c 50%, #121215 100%)' }}
    />

    {/* Subtle grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)',
      }}
    />

    {/* Top-right warm orb */}
    <div
      className="absolute"
      style={{
        top: '-10%',
        right: '-5%',
        width: '45vw',
        height: '45vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }}
    />

    {/* Bottom-left cool orb */}
    <div
      className="absolute"
      style={{
        bottom: '-15%',
        left: '-8%',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204,85,0,0.04) 0%, transparent 60%)',
        filter: 'blur(100px)',
      }}
    />

    {/* Noise */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        opacity: 0.5,
        mixBlendMode: 'overlay',
      }}
    />
  </div>
)

export default AboutBackground
