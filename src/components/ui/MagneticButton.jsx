/**
 * components/ui/MagneticButton.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Magnetic Button
 *
 * Pulls toward the cursor when hovered — signature premium effect.
 * Wraps any child element with magnetic behaviour.
 * ─────────────────────────────────────────────────────────────
 */

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/formatters'

const MagneticButton = ({
  children,
  strength   = 0.35,
  className,
  ...props
}) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const el   = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    setPosition({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.5 }}
      className={cn('inline-flex', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default MagneticButton
