/**
 * HeroHeadline.jsx — Premium GSAP line-by-line reveal
 * Each line slides up from a clip mask independently.
 * "POWERFUL" gets a premium animated orange gradient.
 */

import { useRef, useEffect } from 'react'
import { gsap } from '@utils/gsapConfig'

const lines = [
  { text: 'WE BUILD',    gradient: false },
  { text: 'POWERFUL',    gradient: true  },
  { text: 'DIGITAL',     gradient: false },
  { text: 'EXPERIENCES', gradient: false },
]

const HeroHeadline = ({ onComplete }) => {
  const containerRef = useRef(null)
  const hasAnimated  = useRef(false)

  useEffect(() => {
    if (hasAnimated.current || !containerRef.current) return
    hasAnimated.current = true

    const ctx = gsap.context(() => {
      gsap.set('.hl-line-inner', { yPercent: 105, opacity: 0 })

      gsap.to('.hl-line-inner', {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.1,
        delay: 0.25,
        onComplete: () => onComplete?.(),
      })
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef}>
      <h1 className="hero-headline-text select-none">
        {lines.map((line, i) => (
          <div
            key={i}
            className="overflow-hidden block"
            style={{ paddingBottom: '0.08em' }}
          >
            <span
              className="hl-line-inner inline-block"
              style={
                line.gradient
                  ? {
                      background: 'linear-gradient(90deg, #FF6B00 0%, #FF9A45 40%, #FF6B00 100%)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'gradientShift 3s ease infinite',
                    }
                  : { color: 'var(--color-text-primary)' }
              }
            >
              {line.text}
            </span>
          </div>
        ))}
      </h1>
    </div>
  )
}

export default HeroHeadline
