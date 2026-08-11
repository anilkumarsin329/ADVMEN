/**
 * CaseStudies.jsx — Premium Compact Case Studies Section
 * 
 * Features:
 * - High-impact, compact enterprise case study cards (~460px height)
 * - Key metric highlight badges (Conversion, Revenue, Leads, Traffic)
 * - Sleek card image banner with category pill
 * - Direct routing to full case study detail views
 */

import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiTrendingUp } from 'react-icons/fi'
import { gsap } from '@utils/gsapConfig'

const caseStudies = [
  {
    id: 1,
    title: 'E-Commerce Platform Redesign',
    client: 'TechStore Inc.',
    category: 'Web Development',
    summary: 'Complete e-commerce platform redesign with modern UI, optimized checkout flow, and mobile-first performance.',
    metrics: [
      { value: '+300%', label: 'Conversion Rate' },
      { value: '$180K/mo', label: 'Monthly Revenue' },
    ],
    image: '/Image/advmen_service3.jpeg',
  },
  {
    id: 2,
    title: 'Digital Marketing Campaign',
    client: 'Fashion Brand Co.',
    category: 'Digital Marketing',
    summary: 'Integrated digital marketing campaign driving multi-channel lead acquisition and brand awareness.',
    metrics: [
      { value: '+800%', label: 'Monthly Leads' },
      { value: '+495%', label: 'Social Engagement' },
    ],
    image: '/Image/advmen_service6.jpeg',
  },
  {
    id: 3,
    title: 'Mobile App Development',
    client: 'FitLife Technologies',
    category: 'App Development',
    summary: 'Cross-platform fitness mobile application built with real-time tracking and active community features.',
    metrics: [
      { value: '50K+', label: 'App Downloads' },
      { value: '4.8/5', label: 'Store Rating' },
    ],
    image: '/Image/advmen_service1.jpeg',
  },
  {
    id: 4,
    title: 'SEO & Content Strategy',
    client: 'Global Tech Solutions',
    category: 'SEO & Content',
    summary: 'Technical SEO overhaul, keyword mapping, and content optimization positioning client on Page 1.',
    metrics: [
      { value: '+1650%', label: 'Organic Traffic' },
      { value: '+1767%', label: 'Qualified Leads' },
    ],
    image: '/Image/advmen_service9.jpeg',
  },
  {
    id: 5,
    title: 'Brand Identity & Design System',
    client: 'StartUp Ventures Inc.',
    category: 'Branding',
    summary: 'Complete brand guidelines, visual identity design system, and UI kit for high-impact market launch.',
    metrics: [
      { value: '$2.5M', label: 'Established Value' },
      { value: '78%', label: 'Market Recognition' },
    ],
    image: '/Image/advmen_service4.jpeg',
  },
  {
    id: 6,
    title: 'Video Production & Media',
    client: 'Premium Lifestyle Brand',
    category: 'Media Production',
    summary: 'High-converting video production and lifestyle product photography for social media campaigns.',
    metrics: [
      { value: '250K+', label: 'Video Views' },
      { value: '+642%', label: 'Engagement Lift' },
    ],
    image: '/Image/advmen_service5.jpeg',
  },
]

const CaseStudies = () => {
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        const ctx = gsap.context(() => {
          gsap.from('.case-headline', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          })

          gsap.from('.case-desc', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.1,
          })

          gsap.from('.case-study-card', {
            opacity: 0,
            y: 36,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 0.2,
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
        paddingTop: 'clamp(4rem, 8vw, 6rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        background: 'var(--color-black)',
      }}
      aria-label="Case Studies"
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 'clamp(300px, 50vw, 600px)',
          height: 'clamp(300px, 50vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-block mb-3.5">
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase inline-flex items-center gap-1.5"
              style={{
                background: 'rgba(255, 107, 0, 0.1)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                color: 'var(--color-orange)',
              }}
            >
              <FiTrendingUp size={14} /> Results That Matter
            </span>
          </div>
          <h2
            className="case-headline font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '0.875rem',
            }}
          >
            Case Studies & Success Stories
          </h2>
          <p
            className="case-desc"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9375rem, 1.25vw, 1.125rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              maxWidth: '620px',
            }}
          >
            See how we've helped ambitious businesses achieve measurable growth through strategic solutions and expert execution.
          </p>
        </div>

        {/* Compact Case Studies Grid (3 Columns) */}
        <div id="case-studies-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {caseStudies.map((study) => (
            <div key={study.id} className="case-study-card group flex flex-col h-full">
              <div
                className="relative rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 107, 0, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.4)'
                  e.currentTarget.style.boxShadow = '0 16px 44px rgba(255, 107, 0, 0.15)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.15)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <div>
                  {/* Top Image Banner */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-900">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(18, 18, 21, 0.85) 0%, transparent 60%)',
                      }}
                    />

                    {/* Category Pill */}
                    <span
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase"
                      style={{
                        background: 'rgba(18, 18, 21, 0.85)',
                        border: '1px solid rgba(255, 107, 0, 0.4)',
                        color: '#FF6B00',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {study.category}
                    </span>
                  </div>

                  {/* Content Header & Summary */}
                  <div className="p-6 flex flex-col gap-2.5">
                    <div
                      style={{
                        fontSize: '0.725rem',
                        color: 'var(--color-text-tertiary, #888888)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {study.client}
                    </div>

                    <h3
                      className="font-display font-bold text-xl transition-colors duration-300 group-hover:text-[var(--color-orange)]"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {study.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.55',
                      }}
                      className="line-clamp-2"
                    >
                      {study.summary}
                    </p>

                    {/* Highlight Metrics Grid (2 Badges) */}
                    <div className="grid grid-cols-2 gap-3 pt-3">
                      {study.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl flex flex-col justify-center"
                          style={{
                            background: 'rgba(255, 107, 0, 0.06)',
                            border: '1px solid rgba(255, 107, 0, 0.14)',
                          }}
                        >
                          <span className="font-display font-bold text-lg text-[var(--color-orange)]">
                            {m.value}
                          </span>
                          <span
                            className="text-[0.675rem] uppercase tracking-wider text-[var(--color-text-tertiary)] mt-0.5"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/work/case-study-${study.id}`}
                    state={{ from: 'case-studies' }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.95) 0%, rgba(255, 140, 0, 0.9) 100%)',
                      border: '1px solid rgba(255, 107, 0, 0.4)',
                      boxShadow: '0 4px 16px rgba(255, 107, 0, 0.2)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 0, 0.35)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 107, 0, 0.2)'
                    }}
                  >
                    Read Full Case Study
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bottom Banner */}
        <div
          className="relative rounded-2xl overflow-hidden p-8 sm:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.08) 0%, rgba(255, 107, 0, 0.03) 100%)',
            border: '1.5px solid rgba(255, 107, 0, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: '0.875rem',
            }}
          >
            Ready to Achieve Similar Results?
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: 'var(--color-text-secondary)',
              maxWidth: '580px',
              margin: '0 auto 1.75rem',
            }}
          >
            Let's discuss your project and create a custom strategy to drive measurable growth for your business.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.95) 0%, rgba(255, 140, 0, 0.9) 100%)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 107, 0, 0.4)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(255, 107, 0, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Book a Strategy Call
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9h10M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
