/**
 * components/ui/SectionHeading.jsx
 * Reusable section heading with eyebrow, title, subtitle, and divider.
 */

import { motion } from 'framer-motion'
import { cn } from '@utils/formatters'

const SectionHeading = ({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  align    = 'left',
  size     = 'md',
  divider  = false,
  className,
}) => {
  const sizeMap = {
    sm: 'text-[var(--text-display-sm)]',
    md: 'text-[var(--text-display-md)]',
    lg: 'text-[var(--text-display-lg)]',
    xl: 'text-[var(--text-display-xl)]',
  }

  const alignMap = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex flex-col gap-4', alignMap[align], className)}
    >
      {eyebrow && (
        <span className="eyebrow">{eyebrow}</span>
      )}

      <h2
        className={cn(
          'font-display font-bold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-[var(--color-text-primary)]',
          sizeMap[size]
        )}
      >
        {title}
        {titleHighlight && (
          <>
            {' '}
            <span className="text-gradient-orange">{titleHighlight}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'text-[var(--text-body-lg)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]',
            align === 'center' && 'max-w-[560px]'
          )}
        >
          {subtitle}
        </p>
      )}

      {divider && (
        <div
          className={cn(
            'h-px w-16 bg-[var(--color-orange)] mt-1',
            align === 'center' && 'self-center'
          )}
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}

export default SectionHeading
