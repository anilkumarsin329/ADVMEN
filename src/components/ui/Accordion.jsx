/**
 * components/ui/Accordion.jsx
 * Animated accordion / FAQ component.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/formatters'

const AccordionItem = ({ item, isOpen, onToggle }) => (
  <div
    className={cn(
      'border-b border-[var(--color-border-subtle)] transition-colors duration-300',
      isOpen && 'border-[var(--color-border-orange)]'
    )}
  >
    <button
      className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span
        className={cn(
          'font-display font-medium text-[var(--text-h4)] transition-colors duration-300',
          isOpen ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
        )}
      >
        {item.question}
      </span>
      <span
        className={cn(
          'w-8 h-8 rounded-full border flex-shrink-0 flex items-center justify-center',
          'transition-all duration-300',
          isOpen
            ? 'border-[var(--color-border-orange)] bg-[var(--color-glass-orange-8)] rotate-45'
            : 'border-[var(--color-border-default)] bg-transparent'
        )}
        aria-hidden="true"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <p className="pb-5 text-[var(--text-body)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
            {item.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const Accordion = ({ items = [], allowMultiple = false, className }) => {
  const [openItems, setOpenItems] = useState(new Set())

  const toggle = (id) => {
    setOpenItems((prev) => {
      const next = new Set(allowMultiple ? prev : [])
      prev.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className={cn('w-full', className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  )
}

export default Accordion
