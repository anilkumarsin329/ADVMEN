/**
 * components/ui/Dropdown.jsx
 * Custom dropdown select with animated menu.
 */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/formatters'

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  className,
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (option) => {
    onChange?.(option.value)
    setOpen(false)
  }

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'input w-full flex items-center justify-between gap-2 text-left',
          !selected && 'text-[var(--color-text-tertiary)]'
        )}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={cn('shrink-0 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={cn(
              'absolute z-[var(--z-dropdown)] top-full left-0 right-0 mt-1',
              'bg-[var(--color-surface-3)] border border-[var(--color-border-default)]',
              'rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden py-1'
            )}
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option)}
                className={cn(
                  'px-4 py-2.5 cursor-pointer text-[var(--text-body)] transition-colors duration-150',
                  option.value === value
                    ? 'text-[var(--color-orange)] bg-[var(--color-glass-orange-8)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-glass-white-6)]'
                )}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
