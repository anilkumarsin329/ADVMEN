/**
 * components/ui/AnimatedDivider.jsx
 * Decorative animated divider line.
 */

import { motion } from 'framer-motion'
import { cn } from '@utils/formatters'

const AnimatedDivider = ({
  variant = 'gradient',
  dot     = false,
  className,
}) => {
  const lineClass = variant === 'gradient' ? 'divider-gradient' : 'divider'

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: 'left' }}
      className={cn('relative w-full', className)}
    >
      <hr className={lineClass} />
      {dot && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-orange)] shadow-[var(--shadow-glow-orange-xs)]"
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}

export default AnimatedDivider
