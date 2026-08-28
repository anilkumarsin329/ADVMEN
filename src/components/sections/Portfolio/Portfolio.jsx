/**
 * Portfolio.jsx — Enhanced with Premium Graphics
 * Better animations, visual hierarchy, and interactive elements
 */

import { useRef, useEffect, useState } from 'react'
import { FiBriefcase } from 'react-icons/fi'
import { gsap } from '@utils/gsapConfig'
import { portfolioCategories } from '@data/portfolio'
import { API_BASE_URL } from '@utils/constants'
import PortfolioCard from './PortfolioCard'

const Portfolio = () => {
  const sectionRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const hasAnimated = useRef(false)

  // Fetch portfolio items from database
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolio`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data)
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error fetching portfolio:', err)
        setIsLoading(false)
      })
  }, [])

  // Filter projects on the fly (derived state)
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => {
        const categoryMap = {
          'branding': 'Branding',
          'web-development': 'Web Development',
          'app-development': 'App Development',
          'political-campaigns': 'Political Campaigns',
          'media-production': 'Media Production',
        }
        const targetCategory = categoryMap[activeCategory]?.toLowerCase()
        const projectCategory = p.category?.toLowerCase()
        return projectCategory === targetCategory || projectCategory === activeCategory.toLowerCase()
      })

  // GSAP animations
  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return

    let ctx

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        ctx = gsap.context(() => {
          // Headline
          gsap.fromTo('.portfolio-headline',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
          )

          // Description
          gsap.fromTo('.portfolio-desc',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.1 }
          )

          // Filter buttons
          gsap.fromTo('.portfolio-filter-btn',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.05, delay: 0.2 }
          )

          // Cards
          gsap.fromTo('.portfolio-card',
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'expo.out', stagger: 0.08, delay: 0.3 }
          )
        }, sectionRef)
      },
      { threshold: 0.15 }
    )

    obs.observe(sectionRef.current)
    return () => {
      obs.disconnect()
      if (ctx) ctx.revert()
    }
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
      {/* Animated background glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          animation: 'pulse-slow 6s ease-in-out infinite',
        }}
      />

      <div className="relative container" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase inline-flex items-center gap-1.5"
              style={{
                background: 'rgba(255, 107, 0, 0.1)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                color: 'var(--color-orange)',
              }}
            >
              <FiBriefcase size={14} /> Case Studies
            </span>
          </div>
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
              className="portfolio-filter-btn transition-all duration-300 group"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 'var(--weight-semibold)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '0.7rem 1.4rem',
                borderRadius: '12px',
                border: activeCategory === category.id
                  ? '1.5px solid rgba(255,107,0,0.8)'
                  : '1.5px solid rgba(255,255,255,0.15)',
                background: activeCategory === category.id
                  ? 'rgba(255,107,0,0.2)'
                  : 'rgba(255,255,255,0.02)',
                color: activeCategory === category.id
                  ? 'var(--color-orange)'
                  : 'var(--color-text-secondary)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: activeCategory === category.id
                  ? '0 0 20px rgba(255,107,0,0.15)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'
                  e.currentTarget.style.background = 'rgba(255,107,0,0.08)'
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                }
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div key={project._id || project.id} className="portfolio-card group">
              <div
                className="relative h-full rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,107,0,0.15)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'
                  e.currentTarget.style.background = 'rgba(255,107,0,0.05)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(255,107,0,0.2)'
                  e.currentTarget.style.transform = 'translateY(-8px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.15)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <PortfolioCard project={project} />
              </div>
            </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
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

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}

export default Portfolio
