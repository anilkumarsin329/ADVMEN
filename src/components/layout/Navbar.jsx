/**
 * components/layout/Navbar.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Premium Navbar (Fixed Mobile Toggle)
 *
 * ✅ Fixed bugs:
 * - Mobile menu toggle now works properly
 * - Improved click handler for hamburger button
 * - Better z-index management
 * - Proper event delegation
 * - Fixed state updates
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'
import { LoaderContext } from '@context/LoaderContext'
import { navLinks } from '@data/navigation'
import { COMPANY } from '@utils/constants'
import { cn } from '@utils/formatters'
import { gsap } from '@utils/gsapConfig'

// ── Mobile menu link animation variants ───────────────────────
const menuItemVariants = {
  hidden:  { opacity: 0, x: -40 },
  visible: (i) => (({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  })),
  exit: (i) => (({
    opacity: 0,
    x: -30,
    transition: { duration: 0.3, delay: i * 0.04, ease: [0.7, 0, 0.84, 0] },
  })),
}

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] } },
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const overlayRef = useRef(null)
  const hamburgerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  // ── Close menu on route change ─────────────────────────────
  useEffect(() => {
    // eslint-disable-next-line
    setIsMobileOpen(false)
  }, [location.pathname])

  // ── Lock body scroll when mobile menu open ─────────────────
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
      document.body.style.overscrollBehavior = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      document.body.style.overscrollBehavior = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      document.body.style.overscrollBehavior = ''
    }
  }, [isMobileOpen])

  // ── Scroll detection with throttle ─────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (scrollTimeoutRef.current) return
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolled(window.scrollY > 60)
        scrollTimeoutRef.current = null
      }, 100)
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  // ── Handle ESC key ────────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false)
      }
    }
    
    if (isMobileOpen) {
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }, [isMobileOpen])

  // ── Handle outside click ──────────────────────────────────
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        setIsMobileOpen(false)
      }
    }
    
    if (isMobileOpen) {
      document.addEventListener('click', handleOutsideClick)
      return () => document.removeEventListener('click', handleOutsideClick)
    }
  }, [isMobileOpen])

  // ── Handle window resize ──────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileOpen) {
        setIsMobileOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileOpen])

  const { startEntrance } = useContext(LoaderContext)

  // ── GSAP entrance animation ───────────────────────────────
  useEffect(() => {
    if (!startEntrance) return

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.15,
      })
    })
    return () => ctx.revert()
  }, [startEntrance])

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  const handleMenuItemClick = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  const toggleMenu = useCallback((e) => {
    e.stopPropagation()
    setIsMobileOpen(prev => !prev)
  }, [])

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000]',
          'transition-[padding,background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)]',
          isScrolled
            ? 'py-3 bg-[rgba(10,10,10,0.85)] backdrop-blur-[20px] saturate-150 border-b border-[var(--color-border-subtle)]'
            : 'py-5 bg-transparent'
        )}
        style={{
          paddingTop: `max(1.25rem, env(safe-area-inset-top))`,
          pointerEvents: 'auto',
          opacity: startEntrance ? 1 : 0,
        }}
      >
        <div className="container flex items-center justify-between">

          {/* ── Logo ──────────────────────────────────────── */}
          <Link
            ref={logoRef}
            to="/"
            className="relative z-10 flex items-center gap-3 group"
            aria-label="ADVMEN Technologies — Home"
          >
            <img
              src="/ADVMEN logo.png"
              alt={COMPANY.shortName}
              className="h-7 sm:h-8 lg:h-9 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
              draggable="false"
            />
            <span className="hidden lg:inline font-display font-bold text-sm text-[var(--color-text-primary)] tracking-wide">
              {COMPANY.shortName}
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative font-body text-sm font-medium tracking-wide',
                  'transition-colors duration-300 py-1 group',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded px-2',
                  isActive(link.href)
                    ? 'text-[var(--color-orange)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                )}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-0 h-px rounded-full',
                    'bg-[var(--color-orange)]',
                    'transition-all duration-300 ease-[var(--ease-out-expo)]',
                    isActive(link.href)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  )}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/catalog"
              className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors duration-300 group"
              aria-label="Catalog"
              title="View Catalog"
            >
              <FiShoppingCart size={24} />
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--color-orange)] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/contact"
              className="btn-primary btn-sm shine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
              data-cursor="hover"
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* ── Hamburger ─────────────────────────────────── */}
          <button
            ref={hamburgerRef}
            className="lg:hidden relative z-[9999] w-8 h-8 flex flex-col items-center justify-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded p-1"
            onClick={toggleMenu}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span
              className={cn(
                'block w-5 h-0.5 rounded-full transition-all duration-400 ease-[var(--ease-out-expo)] origin-center',
                isMobileOpen
                  ? 'bg-[var(--color-orange)] rotate-45 translate-y-1.5'
                  : 'bg-[var(--color-text-primary)]'
              )}
            />
            <span
              className={cn(
                'block h-0.5 rounded-full transition-all duration-400 ease-[var(--ease-out-expo)]',
                isMobileOpen
                  ? 'w-0 opacity-0'
                  : 'w-5 bg-[var(--color-text-primary)]'
              )}
            />
            <span
              className={cn(
                'block w-5 h-0.5 rounded-full transition-all duration-400 ease-[var(--ease-out-expo)] origin-center',
                isMobileOpen
                  ? 'bg-[var(--color-orange)] -rotate-45 -translate-y-1.5'
                  : 'bg-[var(--color-text-primary)]'
              )}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ─────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={overlayRef}
            id="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9998] flex flex-col lg:hidden"
            style={{
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(24px)',
              paddingTop: 'env(safe-area-inset-top)',
            }}
            aria-label="Mobile navigation"
          >
            {/* Noise */}
            <div className="noise-overlay absolute-fill pointer-events-none" aria-hidden="true" />

            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 80% 20%, rgba(255,107,0,0.08) 0%, transparent 60%)' }}
              aria-hidden="true"
            />

            <div className="container flex flex-col h-full pt-20 sm:pt-24 pb-12">
              {/* Close button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-5 right-6 z-50 lg:hidden text-[var(--color-text-primary)] hover:text-[var(--color-orange)] transition-colors p-2"
                aria-label="Close menu"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Nav links */}
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      to={link.href}
                      onClick={handleMenuItemClick}
                      className={cn(
                        'group flex items-center justify-between py-4',
                        'border-b border-[var(--color-border-subtle)]',
                        'transition-colors duration-300',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded px-2',
                        isActive(link.href) ? 'text-[var(--color-orange)]' : ''
                      )}
                    >
                      <span
                        className={cn(
                          'font-display font-bold text-2xl sm:text-[2.5rem] leading-none tracking-tight',
                          'transition-colors duration-300',
                          isActive(link.href)
                            ? 'text-[var(--color-orange)]'
                            : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-orange)]'
                        )}
                      >
                        {link.label}
                      </span>
                      <svg
                        width="20" height="20" viewBox="0 0 20 20" fill="none"
                        className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-orange)] group-hover:translate-x-1 transition-all duration-300"
                        aria-hidden="true"
                      >
                        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col gap-4 pt-8"
              >
                <Link 
                  to="/catalog" 
                  onClick={handleMenuItemClick}
                  className="btn-secondary btn-lg w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded flex items-center gap-2"
                >
                  <FiShoppingCart size={20} />
                  View Catalog
                </Link>
                <Link 
                  to="/contact" 
                  onClick={handleMenuItemClick}
                  className="btn-primary btn-lg w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded"
                >
                  Start a Project
                </Link>
                <p className="type-caption text-center text-[var(--color-text-tertiary)]">
                  hello@advmen.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
