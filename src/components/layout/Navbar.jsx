/**
 * components/layout/Navbar.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — Premium Navbar (Fixed Mobile Toggle)
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
import { LoaderContext } from '@context/LoaderContext'
import { navLinks } from '@data/navigation'
import { COMPANY } from '@utils/constants'
import { cn } from '@utils/formatters'
import { gsap } from '@utils/gsapConfig'
import BrandLogo from '@components/common/BrandLogo'
import { cachedFetch } from '@utils/apiCache'
import { FiChevronDown } from 'react-icons/fi'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const FALLBACK_SERVICES = [
  { _id: '1', title: 'SEO Services',               slug: 'seo' },
  { _id: '2', title: 'AEO & GEO Services',          slug: 'aeo-geo' },
  { _id: '3', title: 'Branding',                    slug: 'branding' },
  { _id: '4', title: 'Performance Marketing',       slug: 'performance-marketing' },
  { _id: '5', title: 'Social Media Marketing',      slug: 'social-media-marketing' },
  { _id: '6', title: 'Content Marketing',           slug: 'content-marketing' },
  { _id: '7', title: 'Website Development',         slug: 'website-development' },
  { _id: '8', title: 'App Development',             slug: 'app-development' },
]

// Combined services are shown as two separate dropdown entries
const SPLIT_SERVICES = [
  {
    test: /seo\s*(&|and)\s*geo/i,
    items: [
      { title: 'SEO Optimization', slug: 'seo' },
      { title: 'GEO Optimization', slug: 'aeo-geo' },
    ],
  },
  {
    test: /android\s*(&|and)\s*ios/i,
    items: [
      { title: 'Android App Development', slug: 'app-development/android' },
      { title: 'iOS App Development',     slug: 'app-development/ios' },
    ],
  },
]

const splitServices = (list) =>
  list.flatMap((svc) => {
    const rule = SPLIT_SERVICES.find((r) => r.test.test(svc.title || ''))
    return rule ? rule.items.map((item) => ({ ...item, _id: item.slug })) : [svc]
  })

// ── Mobile menu link animation variants ───────────────────────
const menuItemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: (i) => ({
    opacity: 0,
    x: -30,
    transition: { duration: 0.3, delay: i * 0.04, ease: [0.7, 0, 0.84, 0] },
  }),
}

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] } },
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [services, setServices] = useState(FALLBACK_SERVICES)
  const servicesRef = useRef(null)
  const servicesTimeoutRef = useRef(null)
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

  // ── Fetch services for dropdown ──────────────────────────
  useEffect(() => {
    cachedFetch(`${API_BASE}/api/services`)
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.services || data?.data || []
        if (list.length > 0) setServices(list)
      })
      .catch(() => {})
  }, [])

  // ── Close services dropdown on outside click ──────────────
  useEffect(() => {
    const handler = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
            ? 'py-2.5 lg:py-3 bg-[var(--color-black)] border-b-2 border-[var(--color-ink)]'
            : 'py-3 lg:py-5 bg-[var(--color-black)] border-b-2 border-[var(--color-ink)]'
        )}
        style={{
          paddingTop: `max(0.625rem, env(safe-area-inset-top))`,
          pointerEvents: 'auto',
          opacity: startEntrance ? 1 : 0,
        }}
      >
        <div className="container flex items-center justify-between">

          {/* ── Logo ──────────────────────────────────────── */}
          <Link
            ref={logoRef}
            to="/"
            className="relative z-10 flex items-center group"
            aria-label="ADVMEN — Home"
          >
            <BrandLogo />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-10"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              if (link.label === 'Services') {
                return (
                  <div
                    key={link.href}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={() => {
                      clearTimeout(servicesTimeoutRef.current)
                      setServicesOpen(true)
                    }}
                    onMouseLeave={() => {
                      servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150)
                    }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        'relative font-mono text-sm font-medium flex items-center gap-1',
                        'transition-colors duration-300 py-2 group',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded px-2',
                        isActive(link.href)
                          ? 'text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      )}
                    >
                      {link.label}
                      <FiChevronDown
                        size={14}
                        className={cn('transition-transform duration-300', servicesOpen ? 'rotate-180' : '')}
                      />
                      <span
                        className={cn(
                          'absolute -bottom-1 left-1/2 -translate-x-1/2 h-px rounded-full bg-[var(--color-orange)]',
                          'transition-all duration-300 ease-[var(--ease-out-expo)]',
                          isActive(link.href) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                        )}
                        aria-hidden="true"
                      />
                    </Link>

                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-[var(--color-border-subtle)] overflow-hidden"
                          style={{ background: 'var(--color-surface-1)', boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}
                        >
                          {splitServices(services).map((svc) => (
                            <Link
                              key={svc._id || svc.slug}
                              to={`/services/${svc.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] hover:bg-[rgba(255,107,0,0.06)] transition-colors duration-200 border-b border-[var(--color-border-subtle)] last:border-0"
                            >
                              {svc.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'relative font-mono text-sm font-medium',
                    'transition-colors duration-300 py-2 group',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded px-2',
                    isActive(link.href)
                      ? 'text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-1/2 -translate-x-1/2 h-px rounded-full',
                      'bg-[var(--color-orange)]',
                      'transition-all duration-300 ease-[var(--ease-out-expo)]',
                      isActive(link.href)
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    )}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="btn-secondary btn-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-full"
            >
              Get Audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* ── Hamburger ─────────────────────────────────── */}
          <button
            ref={hamburgerRef}
            className="lg:hidden relative z-[9999] w-11 h-11 flex flex-col items-center justify-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded p-1"
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
            className="fixed inset-0 z-[9998] flex flex-col lg:hidden bg-[var(--color-surface-0)]"
            style={{
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
              style={{ background: 'radial-gradient(circle at 80% 20%, rgba(232,93,4,0.08) 0%, transparent 60%)' }}
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
                    {link.label === 'Services' ? (
                      <div className="border-b border-[var(--color-border-subtle)]">
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(p => !p)}
                          className="group flex items-center justify-between py-4 w-full px-2 focus-visible:outline-none"
                        >
                          <span className={cn(
                            'font-display font-bold text-2xl sm:text-[2.5rem] leading-none tracking-tight transition-colors duration-300',
                            isActive(link.href) ? 'text-[var(--color-orange)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-orange)]'
                          )}>
                            {link.label}
                          </span>
                          <FiChevronDown
                            size={22}
                            className={cn('text-[var(--color-text-tertiary)] transition-transform duration-300', mobileServicesOpen ? 'rotate-180 text-[var(--color-orange)]' : '')}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pb-4 pl-2">
                                {splitServices(services).map((svc) => (
                                  <Link
                                    key={svc._id || svc.slug}
                                    to={`/services/${svc.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleMenuItemClick}
                                    className="text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] py-2 transition-colors duration-200"
                                  >
                                    → {svc.title}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
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
                        <span className={cn(
                          'font-display font-bold text-2xl sm:text-[2.5rem] leading-none tracking-tight transition-colors duration-300',
                          isActive(link.href) ? 'text-[var(--color-orange)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-orange)]'
                        )}>
                          {link.label}
                        </span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                          className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-orange)] group-hover:translate-x-1 transition-all duration-300"
                          aria-hidden="true"
                        >
                          <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    )}
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
                {/* Catalog button hidden for now — re-enable when catalog goes live
                <Link 
                  to="/catalog" 
                  onClick={handleMenuItemClick}
                  className="btn-secondary btn-lg w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded flex items-center gap-2"
                >
                  View Catalog
                </Link>
                */}
                <Link 
                  to="/contact" 
                  onClick={handleMenuItemClick}
                  className="btn-primary btn-lg w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded"
                >
                  Start a Project
                </Link>
                <p className="type-caption text-center text-[var(--color-text-tertiary)]">
                  info@advmen.com
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
