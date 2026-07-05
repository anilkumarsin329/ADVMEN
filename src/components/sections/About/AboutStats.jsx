/**
 * AboutStats.jsx — Count-up impact statistics
 */

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const Counter = ({ value, suffix = '', duration = 1.8 }) => {
  const end = parseInt(value, 10)
  const isNumber = !isNaN(end)
  const [count, setCount] = useState(() => (isNumber ? 0 : value))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView || !isNumber) return
    let start = 0
    if (start === end) return

    const startTime = performance.now()

    const updateCount = (timestamp) => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress)
      const current = Math.floor(easeProgress * end)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, isNumber, end, duration])

  return (
    <span ref={ref} className="font-display">
      {count}
      {suffix}
    </span>
  )
}

const statsData = [
  { value: '150', suffix: '+', label: 'Projects Delivered' },
  { value: '50', suffix: '+', label: 'Happy Clients' },
  { value: '5', suffix: '+', label: 'Years Active' },
  { value: '99', suffix: '%', label: 'Retention Rate' },
]

const AboutStats = ({ isPage = false }) => {
  if (isPage) {
    return (
      <section
        className="relative w-full py-16"
        style={{
          background: 'linear-gradient(180deg, var(--color-black) 0%, rgba(255,107,0,0.02) 50%, var(--color-black) 100%)',
        }}
        aria-label="Impact Stats"
      >
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat) => (
              <div
                key={stat.label}
                className="about-stat-item flex flex-col items-center justify-center p-6 text-center rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h2
                  className="text-[3.25rem] lg:text-[4rem] font-bold tracking-tight text-[var(--color-text-primary)] leading-none mb-3"
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-caption)',
                    color: 'var(--color-text-tertiary)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Inline layout for Homepage About block
  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      {statsData.map((stat) => (
        <div
          key={stat.label}
          className="about-stat-item flex flex-col gap-2 p-5 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span className="text-3xl font-extrabold text-[var(--color-orange)]">
            <Counter value={stat.value} suffix={stat.suffix} />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default AboutStats
