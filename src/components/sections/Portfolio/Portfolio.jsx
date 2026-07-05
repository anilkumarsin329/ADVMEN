/**
 * Portfolio.jsx — Phase 5
 * Premium portfolio showcase with filtering and animations
 */

import { useRef, useEffect, useState } from 'react'
import { gsap } from '@utils/gsapConfig'
import { portfolioProjects, portfolioCategories } from '@data/portfolio'
import PortfolioCard from './PortfolioCard'

const Portfolio = () => {
  const sectionRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const hasAnimated = useRef(false)

  // Filter projects on the fly (derived state)
  const filteredProjects = activeCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => {
        const categoryMap = {
          'branding': 'Branding',
          'web-development': 'Web Development',
          'app-development': 'App Development',
          'political-campaigns': 'Political Campaigns',
          'media-production': 'Media Production',
        }
        return p.category === categoryMap[activeCategory]
      })

  // GSAP animations
  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        const ctx = gsap.context(() => {
          // Headline
          gsap.from('.portfolio-headline', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'expo.out',
          })

          // Description
          gsap.from('.portfolio-desc', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'expo.out',
            delay: 0.1,
          })

          // Filter buttons
          gsap.from('.portfolio-filter-btn', {
            opacity: 0,
            y: 15,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.05,
            delay: 0.2,
          })

          // Cards
          gsap.from('.portfolio-card', {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.08,
            delay: 0.3,
          })
        }, sectionRef)

        return () => ctx.revert()
      },
      { threshold: 0.15 }
    )

    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        background: 'var(--color-black)',
      }}
      aria-label="Our Portfolio"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative container" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2
            className="portfolio-headline font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '1rem',
            }}
          >
            Our Work Speaks Volumes
          </h2>
          <p
            className="portfolio-desc"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Explore our portfolio of premium digital projects that have transformed businesses and exceeded expectations.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-12 sm:mb-16 flex flex-wrap gap-3">
          {portfolioCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="portfolio-filter-btn transition-all duration-300"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 'var(--weight-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                border: activeCategory === category.id
                  ? '1px solid rgba(255,107,0,0.6)'
                  : '1px solid rgba(255,255,255,0.1)',
                background: activeCategory === category.id
                  ? 'rgba(255,107,0,0.15)'
                  : 'transparent',
                color: activeCategory === category.id
                  ? 'var(--color-orange)'
                  : 'var(--color-text-secondary)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'
                  e.currentTarget.style.background = 'rgba(255,107,0,0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <PortfolioCard project={project} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-text-secondary)',
              }}
            >
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Portfolio
