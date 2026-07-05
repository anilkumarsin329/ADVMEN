/**
 * components/ui/FormControls.jsx
 * Switch, Checkbox, and Radio components.
 */

import { cn } from '@utils/formatters'

export const Switch = ({ checked, onChange, label, disabled, id }) => (
  <label
    htmlFor={id}
    className={cn(
      'inline-flex items-center gap-3 cursor-pointer select-none',
      disabled && 'opacity-40 pointer-events-none'
    )}
  >
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative w-11 h-6 rounded-full transition-all duration-300 focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[var(--color-black)]',
        checked
          ? 'bg-[var(--color-orange)]'
          : 'bg-[var(--color-surface-4)] border border-[var(--color-border-default)]'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm',
          'transition-transform duration-300',
          checked && 'translate-x-5'
        )}
      />
    </button>
    {label && (
      <span className="text-[var(--text-body)] text-[var(--color-text-secondary)]">{label}</span>
    )}
  </label>
)

export const Checkbox = ({ checked, onChange, label, disabled, id, className }) => (
  <label
    htmlFor={id}
    className={cn(
      'inline-flex items-center gap-3 cursor-pointer select-none',
      disabled && 'opacity-40 pointer-events-none',
      className
    )}
  >
    <span
      className={cn(
        'w-5 h-5 rounded-[var(--radius-sm)] border flex-shrink-0 flex items-center justify-center',
        'transition-all duration-200',
        checked
          ? 'bg-[var(--color-orange)] border-[var(--color-orange)]'
          : 'bg-[var(--color-surface-4)] border-[var(--color-border-default)]'
      )}
      onClick={() => onChange?.(!checked)}
      role="checkbox"
      aria-checked={checked}
      id={id}
      tabIndex={0}
      onKeyDown={(e) => e.key === ' ' && onChange?.(!checked)}
    >
      {checked && (
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
          <path d="M1 4L4.5 7.5L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </span>
    {label && (
      <span className="text-[var(--text-body)] text-[var(--color-text-secondary)]">{label}</span>
    )}
  </label>
)

export const Radio = ({ checked, onChange, label, disabled, value, className }) => (
  <label
    className={cn(
      'inline-flex items-center gap-3 cursor-pointer select-none',
      disabled && 'opacity-40 pointer-events-none',
      className
    )}
  >
    <span
      className={cn(
        'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
        'transition-all duration-200',
        checked
          ? 'border-[var(--color-orange)]'
          : 'border-[var(--color-border-default)] bg-[var(--color-surface-4)]'
      )}
      onClick={() => onChange?.(value)}
      role="radio"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => e.key === ' ' && onChange?.(value)}
    >
      {checked && (
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-orange)]" />
      )}
    </span>
    {label && (
      <span className="text-[var(--text-body)] text-[var(--color-text-secondary)]">{label}</span>
    )}
  </label>
)
