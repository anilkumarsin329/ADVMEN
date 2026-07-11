/**
 * CaseStudies.jsx — Premium Case Studies Section
 * 
 * Features:
 * - Problem → Solution → Process → Results framework
 * - Measurable metrics (leads, traffic, ROI)
 * - Neomorphism UI styling
 * - Before/After comparison
 * - Client testimonials
 * - Strong CTAs
 */

import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@utils/gsapConfig'

const caseStudies = [
  {
    id: 1,
    title: 'E-Commerce Platform Redesign',
    client: 'TechStore Inc.',
    category: 'Web Development',
    problem: 'High bounce rate (68%) and low conversion rate (1.2%) due to outdated UI and poor user experience.',
    solution: 'Complete redesign with modern Neomorphism UI, optimized checkout flow, and mobile-first approach.',
    process: [
      'User research & analytics audit',
      'Wireframing & prototyping',
      'Design system creation',
      'Development & testing',
      'Launch & optimization',
    ],
    results: {
      bounceRate: { before: '68%', after: '32%', change: '-53%' },
      conversion: { before: '1.2%', after: '4.8%', change: '+300%' },
      revenue: { before: '$50K/mo', after: '$180K/mo', change: '+260%' },
      traffic: { before: '10K/mo', after: '45K/mo', change: '+350%' },
    },
    testimonial: 'ADVMEN transformed our online store. The new design is beautiful and our sales tripled in 3 months.',
    testimonialAuthor: 'Sarah Johnson, CEO',
    image: '/Image/advmen_service3.jpeg',
  },
  {
    id: 2,
    title: 'Digital Marketing Campaign',
    client: 'Fashion Brand Co.',
    category: 'Digital Marketing',
    problem: 'Low brand awareness and minimal social media engagement despite large marketing budget.',
    solution: 'Integrated digital marketing strategy with targeted social campaigns, influencer partnerships, and content marketing.',
    process: [
      'Market research & competitor analysis',
      'Strategy development',
      'Content creation & scheduling',
      'Campaign launch & monitoring',
      'Optimization & scaling',
    ],
    results: {
      engagement: { before: '2.1%', after: '12.5%', change: '+495%' },
      followers: { before: '15K', after: '125K', change: '+733%' },
      leads: { before: '50/mo', after: '450/mo', change: '+800%' },
      roi: { before: '1.2x', after: '5.8x', change: '+383%' },
    },
    testimonial: 'The team\'s strategic approach and creative execution exceeded all our expectations. Highly recommended!',
    testimonialAuthor: 'Michael Chen, Marketing Director',
    image: '/Image/advmen_service6.jpeg',
  },
  {
    id: 3,
    title: 'Mobile App Development',
    client: 'FitLife Technologies',
    category: 'App Development',
    problem: 'Needed a cross-platform fitness app with real-time tracking and social features.',
    solution: 'Built React Native app with Firebase backend, real-time analytics, and community features.',
    process: [
      'Requirements gathering',
      'UI/UX design',
      'Backend development',
      'App development',
      'Testing & deployment',
    ],
    results: {
      downloads: { before: '0', after: '50K+', change: 'Launch' },
      rating: { before: 'N/A', after: '4.8/5', change: 'Excellent' },
      activeUsers: { before: '0', after: '15K', change: 'Strong' },
      retention: { before: 'N/A', after: '65%', change: 'High' },
    },
    testimonial: 'ADVMEN delivered a world-class app that our users love. The quality and attention to detail is outstanding.',
    testimonialAuthor: 'David Park, Founder',
    image: '/Image/advmen_service1.jpeg',
  },
  {
    id: 4,
    title: 'SEO & Content Strategy',
    client: 'Global Tech Solutions',
    category: 'SEO & Content',
    problem: 'Ranked on page 5+ for target keywords with minimal organic traffic and poor content structure.',
    solution: 'Comprehensive SEO audit, keyword research, content optimization, and technical SEO improvements.',
    process: [
      'Technical SEO audit',
      'Keyword research & mapping',
      'Content optimization',
      'Link building strategy',
      'Performance tracking',
    ],
    results: {
      ranking: { before: 'Page 5+', after: 'Page 1', change: '+400%' },
      traffic: { before: '2K/mo', after: '35K/mo', change: '+1650%' },
      leads: { before: '15/mo', after: '280/mo', change: '+1767%' },
      roi: { before: '0.8x', after: '6.2x', change: '+675%' },
    },
    testimonial: 'Their SEO strategy transformed our online visibility. We are now the top result for our main keywords.',
    testimonialAuthor: 'Jennifer Lee, VP Marketing',
    image: '/Image/advmen_service9.jpeg',
  },
  {
    id: 5,
    title: 'Brand Identity & Design System',
    client: 'StartUp Ventures Inc.',
    category: 'Branding',
    problem: 'New startup needed complete brand identity, logo, and design system for market launch.',
    solution: 'Created comprehensive brand guidelines, logo design, color palette, typography system, and UI kit.',
    process: [
      'Brand strategy workshop',
      'Logo & visual identity design',
      'Design system creation',
      'Brand guidelines documentation',
      'Implementation support',
    ],
    results: {
      recognition: { before: '0%', after: '78%', change: 'Strong' },
      consistency: { before: 'N/A', after: '100%', change: 'Perfect' },
      timeToMarket: { before: '6 months', after: '2 months', change: '-67%' },
      brandValue: { before: '$0', after: '$2.5M', change: 'Established' },
    },
    testimonial: 'ADVMEN created a brand identity that perfectly captures our vision. Our investors were impressed!',
    testimonialAuthor: 'Alex Rodriguez, Founder',
    image: '/Image/advmen_service4.jpeg',
  },
  {
    id: 6,
    title: 'Video Production & Media',
    client: 'Premium Lifestyle Brand',
    category: 'Media Production',
    problem: 'Needed high-quality promotional videos and product photography for e-commerce and social media.',
    solution: 'Professional video production, product photography, editing, and social media content creation.',
    process: [
      'Concept & storyboarding',
      'Professional filming',
      'Product photography',
      'Post-production & editing',
      'Social media optimization',
    ],
    results: {
      engagement: { before: '1.2%', after: '8.9%', change: '+642%' },
      videoViews: { before: '5K', after: '250K+', change: '+4900%' },
      conversionLift: { before: '2.1%', after: '6.8%', change: '+224%' },
      socialReach: { before: '50K', after: '500K+', change: '+900%' },
    },
    testimonial: 'The video content ADVMEN produced drove massive engagement and sales. Absolutely worth the investment!',
    testimonialAuthor: 'Victoria Chen, CMO',
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
            ease: 'expo.out',
          })

          gsap.from('.case-desc', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'expo.out',
            delay: 0.1,
          })

          gsap.from('.case-study-card', {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.1,
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
        paddingTop: 'clamp(3rem, 8vw, 6rem)',
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
        background: 'var(--color-black)',
      }}
      aria-label="Case Studies"
    >
      {/* Background glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 'clamp(300px, 50vw, 600px)',
          height: 'clamp(300px, 50vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10" style={{ zIndex: 1, maxWidth: '100%' }}>
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-block mb-4">
            <span
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: 'rgba(255, 107, 0, 0.1)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                color: 'var(--color-orange)',
              }}
            >
              📊 Results That Matter
            </span>
          </div>
          <h2
            className="case-headline font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '1rem',
            }}
          >
            Case Studies & Success Stories
          </h2>
          <p
            className="case-desc"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              maxWidth: '90%',
            }}
          >
            See how we've helped businesses achieve measurable growth through strategic solutions and expert execution.
          </p>
        </div>

        {/* Case Studies Grid - 6 Cards in 3 Columns */}
        <div id="case-studies-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {caseStudies.map((study) => (
            <div key={study.id} className="case-study-card group">
              <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1.5px solid rgba(255, 107, 0, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.4)'
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(255, 107, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.15)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                }}
              >
                {/* Image */}
                <div
                  className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black flex items-center justify-center"
                  style={{
                    borderBottom: '1px solid rgba(255, 107, 0, 0.1)',
                  }}
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col gap-6">
                  {/* Header */}
                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-orange)',
                        opacity: 0.7,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {study.category}
                    </div>
                    <h3
                      className="font-display font-bold text-xl mb-2 transition-colors duration-300 group-hover:text-orange-400"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {study.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {study.client}
                    </p>
                  </div>

                  {/* Problem */}
                  <div>
                    <h4
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--color-orange)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Problem
                    </h4>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.5',
                      }}
                    >
                      {study.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--color-orange)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Solution
                    </h4>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.5',
                      }}
                    >
                      {study.solution}
                    </p>
                  </div>

                  {/* Process */}
                  <div>
                    <h4
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--color-orange)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Process
                    </h4>
                    <div className="space-y-2">
                      {study.process.map((step, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--color-orange)',
                              marginTop: '0.4rem',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: '0.85rem',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--color-orange)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '1rem',
                      }}
                    >
                      Measurable Results
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(study.results).map(([key, value]) => (
                        <div
                          key={key}
                          style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            background: 'rgba(255, 107, 0, 0.05)',
                            border: '1px solid rgba(255, 107, 0, 0.1)',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.7rem',
                              color: 'var(--color-text-tertiary)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              marginBottom: '0.5rem',
                            }}
                          >
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div
                            style={{
                              fontSize: '1.1rem',
                              fontWeight: '700',
                              color: 'var(--color-orange)',
                              marginBottom: '0.25rem',
                            }}
                          >
                            {value.after}
                          </div>
                          <div
                            style={{
                              fontSize: '0.75rem',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            {value.before} → {value.change}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      background: 'rgba(255, 107, 0, 0.08)',
                      border: '1px solid rgba(255, 107, 0, 0.15)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                        marginBottom: '0.75rem',
                        fontStyle: 'italic',
                      }}
                    >
                      "{study.testimonial}"
                    </p>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-text-tertiary)',
                        fontWeight: '600',
                      }}
                    >
                      — {study.testimonialAuthor}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/work/case-study-${study.id}`}
                    state={{ from: 'case-studies' }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.875rem 1.5rem',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.95) 0%, rgba(255, 140, 0, 0.9) 100%)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255, 107, 0, 0.4)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 107, 0, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
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

        {/* CTA Section */}
        <div
          className="relative rounded-2xl overflow-hidden p-8 sm:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0.05) 100%)',
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
              marginBottom: '1rem',
            }}
          >
            Ready to Achieve Similar Results?
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: 'var(--color-text-secondary)',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
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
              padding: 'clamp(0.875rem, 2vw, 1.125rem) clamp(1.5rem, 3vw, 2rem)',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.95) 0%, rgba(255, 140, 0, 0.9) 100%)',
              color: '#fff',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
      `}</style>
    </section>
  )
}

export default CaseStudies
