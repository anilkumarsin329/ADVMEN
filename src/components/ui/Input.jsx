/**
 * components/ui/Input.jsx
 * Input, Textarea, and Label form components.
 */

import { forwardRef } from 'react'
import { cn } from '@utils/formatters'

export const InputLabel = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={cn('input-label', className)}>
    {children}
  </label>
)

export const Input = forwardRef(({
  error,
  success,
  className,
  ...props
}, ref) => (
  <input
    ref={ref}
    className={cn(
      'input',
      error   && 'input-error',
      success && 'input-success',
      className
    )}
    {...props}
  />
))
Input.displayName = 'Input'

export const Textarea = forwardRef(({
  error,
  success,
  className,
  ...props
}, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'textarea',
      error   && 'input-error',
      success && 'input-success',
      className
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export const FormField = ({ label, htmlFor, error, hint, children, className }) => (
  <div className={cn('flex flex-col gap-2', className)}>
    {label && <InputLabel htmlFor={htmlFor}>{label}</InputLabel>}
    {children}
    {error && (
      <p className="text-[var(--color-error)] text-[var(--text-caption)] mt-1">{error}</p>
    )}
    {hint && !error && (
      <p className="text-[var(--color-text-tertiary)] text-[var(--text-caption)] mt-1">{hint}</p>
    )}
  </div>
)

export default Input
