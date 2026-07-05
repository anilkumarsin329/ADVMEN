/**
 * HeroStats.jsx — Animated count-up statistics
 * Premium spacing, gradient numbers, hover accent lines.
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@utils/gsapConfig'
import { stats } from '@data/stats'

const StatItem = ({ stat, index, inView }) => {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true
    const obj = { val: 0 }
    gsap.to(obj, {
      val: stat.value,
      duration: 2.0,
      delay: index * 0.18,
      ease: 'power3.out',
      onUpdate: () => setCount(Math.floor(obj.val)),
    })
  }, [inView, stat.value, index])

  return (
    <div
      className="flex flex-col group"
      style={{ gap: '0.35rem' }}
    >
      {/* Number + suffix */}
      <div className="flex items-baseline" style={{ gap: '0.1em' }}>
        <span
          className="font-display font-bold tabular-nums"
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            lineHeight: 1,
            background: 'var(--gradient-orange)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {count}
        </span>
        <span
          className="font-display font-bold"
          style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
            lineHeight: 1,
            color: 'var(--color-orange)',
          }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--color-text-tertiary)',
        }}
      >
        {stat.label}
      </span>

      {/* Hover accent */}
      <div
        className="h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: 'var(--gradient-orange)' }}
        aria-hidden="true"
      />
    </div>
  )
}

const HeroStats = () => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-4"
      style={{ gap: 'clamp(1.25rem, 3vw, 2.5rem)' }}
    >
      {stats.map((stat, i) => (
        <StatItem key={stat.id} stat={stat} index={i} inView={inView} />
      ))}
    </div>
  )
}

export default HeroStats
