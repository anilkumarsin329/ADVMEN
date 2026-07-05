/**
 * components/ui/GlassCard.jsx
 * Premium glassmorphism card component.
 */

import { cn } from '@utils/formatters'

const variantMap = {
  default: 'card',
  glass:   'card-glass',
  orange:  'card-orange',
}

const GlassCard = ({
  variant  = 'glass',
  padding  = 'md',
  hover    = true,
  children,
  className,
  as: Tag  = 'div',
  ...props
}) => {
  const paddingMap = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
    xl:   'p-10',
  }

  return (
    <Tag
      className={cn(
        variantMap[variant],
        paddingMap[padding],
        !hover && 'hover:transform-none hover:shadow-[var(--shadow-card)]',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default GlassCard
