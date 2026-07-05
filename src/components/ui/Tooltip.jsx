/**
 * components/ui/Tooltip.jsx
 * Hover tooltip with directional positioning.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/formatters'

const positionStyles = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowStyles = {
  top:    'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-surface-3)] border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-surface-3)] border-l-transparent border-r-transparent border-t-transparent',
  left:   'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-surface-3)] border-t-transparent border-b-transparent border-r-transparent',
  right:  'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-surface-3)] border-t-transparent border-b-transparent border-l-transparent',
}

const Tooltip = ({ content, position = 'top', children, className }) => {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute z-[var(--z-tooltip)] pointer-events-none whitespace-nowrap',
              'px-3 py-1.5 rounded-[var(--radius-md)]',
              'bg-[var(--color-surface-3)] border border-[var(--color-border-default)]',
              'text-[var(--text-caption)] text-[var(--color-text-primary)]',
              'shadow-[var(--shadow-md)]',
              positionStyles[position]
            )}
          >
            {content}
            <span
              className={cn('absolute w-0 h-0 border-4', arrowStyles[position])}
              aria-hidden="true"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

export default Tooltip
