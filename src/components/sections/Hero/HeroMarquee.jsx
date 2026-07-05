/**
 * components/sections/Hero/HeroMarquee.jsx
 * ─────────────────────────────────────────────────────────────
 * Infinite trust / client marquee strip.
 * Pure CSS animation — no third-party dependency.
 * Uses the existing `marquee` keyframe from animations.css.
 * ─────────────────────────────────────────────────────────────
 */

const trustItems = [
  { name: 'TechVentures'   },
  { name: 'NexusCorp'      },
  { name: 'GreenLeaf'      },
  { name: 'PrimeMedia'     },
  { name: 'AlphaBuilders'  },
  { name: 'SwiftLogistics' },
  { name: 'BrightFuture'   },
  { name: 'PeakFinance'    },
  { name: 'UrbanStyle'     },
  { name: 'CoreHealth'     },
]

// Duplicate items so the loop is seamless
const items = [...trustItems, ...trustItems]

const MarqueeItem = ({ name }) => (
  <div className="flex items-center gap-3 mx-10 shrink-0 group cursor-default">
    <span
      className="w-1.5 h-1.5 rounded-full shrink-0"
      style={{
        background: 'var(--color-border-strong)',
        transition: 'background 0.3s',
      }}
      aria-hidden="true"
    />
    <span
      className="whitespace-nowrap font-display font-semibold uppercase"
      style={{
        fontSize: 'var(--text-small)',
        color: 'var(--color-text-tertiary)',
        letterSpacing: '0.08em',
      }}
    >
      {name}
    </span>
  </div>
)

const HeroMarquee = () => (
  <div
    className="relative w-full overflow-hidden"
    aria-label="Trusted by leading brands"
    role="marquee"
  >
    {/* Top border */}
    <div
      className="absolute top-0 left-0 right-0 h-px pointer-events-none"
      style={{ background: 'linear-gradient(90deg, transparent, var(--color-border-subtle), transparent)' }}
      aria-hidden="true"
    />
    {/* Bottom border */}
    <div
      className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
      style={{ background: 'linear-gradient(90deg, transparent, var(--color-border-subtle), transparent)' }}
      aria-hidden="true"
    />

    {/* Left fade mask */}
    <div
      className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to right, var(--color-black), transparent)' }}
      aria-hidden="true"
    />
    {/* Right fade mask */}
    <div
      className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to left, var(--color-black), transparent)' }}
      aria-hidden="true"
    />

    {/* Scrolling track */}
    <div
      className="flex py-4"
      style={{
        width: 'max-content',
        animation: 'marquee 30s linear infinite',
        willChange: 'transform',
      }}
    >
      {items.map((item, i) => (
        <MarqueeItem key={`${item.name}-${i}`} name={item.name} />
      ))}
    </div>
  </div>
)

export default HeroMarquee
