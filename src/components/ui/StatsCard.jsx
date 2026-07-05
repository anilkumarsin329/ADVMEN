/**
 * components/ui/StatsCard.jsx
 * Animated stats / number card.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@utils/formatters'

const useCountUp = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

const StatsCard = ({ stat, index = 0, className }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCountUp(stat.value, 1600, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'card-glass p-6 text-center group',
        className
      )}
    >
      <div className="font-display font-bold text-[var(--text-display-md)] leading-none text-[var(--color-text-primary)] mb-2">
        <span className="text-gradient-orange">{count}</span>
        <span className="text-[var(--color-orange)]">{stat.suffix}</span>
      </div>
      <p className="type-label text-[var(--color-text-tertiary)]">{stat.label}</p>
    </motion.div>
  )
}

export default StatsCard
