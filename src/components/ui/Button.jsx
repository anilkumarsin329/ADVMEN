/**
 * components/ui/Button.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Button Component
 *
 * Variants: primary | secondary | ghost | outline | icon
 * Sizes:    sm | md | lg | xl
 * States:   default | hover | active | disabled | loading
 * ─────────────────────────────────────────────────────────────
 */

import { forwardRef } from 'react'
import { cn } from '@utils/formatters'

const variantClasses = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
  outline:   'btn-outline',
}

const sizeClasses = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

const Button = forwardRef(({
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  disabled = false,
  icon,
  iconRight,
  children,
  className,
  as: Tag = 'button',
  ...props
}, ref) => {
  const isDisabled = disabled || loading

  return (
    <Tag
      ref={ref}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled}
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && 'opacity-40 pointer-events-none',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner spinner-sm" aria-hidden="true" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
          {children && <span>{children}</span>}
          {iconRight && <span className="shrink-0" aria-hidden="true">{iconRight}</span>}
        </>
      )}
    </Tag>
  )
})

Button.displayName = 'Button'

export default Button
