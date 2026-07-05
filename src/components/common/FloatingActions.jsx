/**
 * components/common/FloatingActions.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Floating Action Buttons
 *
 * • WhatsApp quick contact
 * • Phone call shortcut
 * • Scroll to top (appears after 400px scroll)
 * • Animated tooltips on hover
 * • Staggered entrance animation
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'
import { COMPANY } from '@utils/constants'
import { cn } from '@utils/formatters'

// ── Individual FAB ─────────────────────────────────────────────
const FAB = ({ icon, label, onClick, href, color, className }) => {
  const [showTip, setShowTip] = useState(false)
  const Tag = href ? 'a' : 'button'

  const props = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick, type: 'button' }

  return (
    <div className="relative flex items-center justify-end">
      {/* Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.span
            initial={{ opacity: 0, x: 8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.9 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-full mr-3 whitespace-nowrap pointer-events-none"
            style={{
              background: 'var(--color-surface-3)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-primary)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <Tag
        {...props}
        aria-label={label}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center',
          'shadow-[var(--shadow-lg)] transition-all duration-300',
          'hover:scale-110 hover:shadow-[var(--shadow-xl)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]',
          className
        )}
        style={{ background: color }}
      >
        {icon}
      </Tag>
    </div>
  )
}

// ── WhatsApp icon ──────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

// ── Phone icon ─────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)

// ── Arrow up icon ──────────────────────────────────────────────
const ArrowUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
)

// ── Main component ─────────────────────────────────────────────
const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const containerRef = useRef(null)

  // Show scroll-to-top after 400px
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      const items = document.querySelectorAll('.fab-item')
      if (items.length > 0) {
        gsap.from(items, {
          opacity: 0,
          x: 40,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          delay: 2.5,
        })
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const whatsappNumber = COMPANY.phone.replace(/\D/g, '')
  const whatsappUrl    = `https://wa.me/${whatsappNumber}?text=Hi%20ADVMEN%2C%20I%27d%20like%20to%20discuss%20a%20project.`
  const callUrl        = `tel:${COMPANY.phone}`

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-5 z-[var(--z-toast)] flex flex-col items-end gap-3"
      aria-label="Quick contact actions"
    >
      {/* Scroll to top — conditional */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="fab-item"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <FAB
              icon={<ArrowUpIcon />}
              label="Back to Top"
              onClick={scrollToTop}
              color="var(--color-surface-3)"
              className="text-[var(--color-text-primary)] border border-[var(--color-border-default)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingActions
