/**
 * components/ui/Badge.jsx
 * Badge and Tag components — status indicators and category labels.
 */

import { cn } from '@utils/formatters'

const variantMap = {
  orange:  'badge-orange',
  gray:    'badge-gray',
  success: 'badge-success',
  error:   'badge-error',
  warning: 'badge-warning',
}

export const Badge = ({ variant = 'orange', dot = false, children, className }) => (
  <span className={cn(variantMap[variant], className)}>
    {dot && (
      <span
        className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0"
        aria-hidden="true"
      />
    )}
    {children}
  </span>
)

export const Tag = ({ children, className, onClick }) => (
  <span
    className={cn('tag', onClick && 'cursor-pointer', className)}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
  >
    {children}
  </span>
)

export default Badge
