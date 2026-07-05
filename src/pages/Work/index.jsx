/**
 * pages/Work/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Portfolio Grid Page
 * Phase 5: Portfolio Grid complete.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { portfolioItems, getPortfolioCategories } from '@data/portfolioItems'

const categories = getPortfolioCategories()

const Work = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-stagger', {
        opacity: 0,
        y: 35,
        filter: 'blur(8px)',
        duration: 1.0,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.15,
        clearProps: 'all',
      })
    }, headerRef)
    return () => ctx.revert()
  }, [])

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <PageTransition>
      <SEOHead
        title="Our Work — ADVMEN Technologies"
        description="Explore our portfolio of high-impact web systems, creative branding cases, and digital campaigns."
      />

      <section
        ref={headerRef}
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '6rem',
          background: 'var(--color-black)',
        }}
        aria-label="Portfolio Grid"
      >
        <div className="container relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl flex flex-col gap-6 mb-12">
            <div className="work-stagger flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-orange)]" />
              <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>
                Case Studies
              </span>
            </div>

            <h1
              className="work-stagger section-title"
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                lineHeight: 1.15,
                fontWeight: 'var(--weight-bold)',
                letterSpacing: '-0.02em',
              }}
            >
              Immersive Digital <span className="text-orange-gradient">Products</span> & Brands.
            </h1>
          </div>

          {/* Category Filters */}
          <div className="work-stagger flex flex-wrap gap-3 mb-12 border-b border-[var(--color-border-subtle)] pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300"
                style={{
                  background: activeCategory === cat ? 'var(--gradient-orange)' : 'rgba(255,255,255,0.02)',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.05)',
                  color: activeCategory === cat ? 'var(--color-black)' : 'var(--color-text-secondary)',
                  fontWeight: activeCategory === cat ? 'bold' : 'normal',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Staggered Portfolio Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <Link
                    to={`/work/${item.slug}`}
                    className="group relative flex flex-col p-4 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(12px)',
                    }}
                    data-cursor="hover"
                  >
                    {/* Visual Card Image Box fallback */}
                    <div
                      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #111 0%, #1c0b00 100%)',
                        border: '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      {/* Scale inner design on hover */}
                      <div className="absolute inset-0 opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 bg-radial-gradient"
                        style={{
                          background: 'radial-gradient(circle, var(--color-orange) 0%, transparent 70%)',
                          filter: 'blur(40px)',
                        }}
                      />

                      {/* Floating Text initials placeholder */}
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 'var(--weight-black)',
                          fontSize: '3.5rem',
                          color: 'var(--color-white)',
                          opacity: 0.12,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.title.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--color-orange)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Card heading */}
                    <h3
                      className="group-hover:text-[var(--color-orange)] transition-colors duration-300"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Sub title / Year */}
                    <div className="flex justify-between items-center mt-3">
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          color: 'var(--color-text-tertiary)',
                        }}
                      >
                        {item.year}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  )
}

export default Work
