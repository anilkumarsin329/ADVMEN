/**
 * Services.jsx — Phase 2
 * Premium services showcase with glassmorphism cards
 * Hover animations and smooth transitions
 */

import { useRef, useEffect } from 'react'
import { gsap } from '@utils/gsapConfig'
import { FiTarget, FiCode, FiEdit3, FiTrendingUp, FiSmartphone, FiZap } from 'react-icons/fi'
import ServiceCard from './ServiceCard'

const servicesData = [
  {
    id: 1,
    title: 'Brand Strategy',
    description: 'Craft compelling brand identities that resonate with your audience and stand out in the market.',
    icon: FiTarget,
    features: ['Brand Positioning', 'Market Research', 'Competitive Analysis'],
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'Build fast, scalable, and beautiful websites that convert visitors into customers.',
    icon: FiCode,
    features: ['Responsive Design', 'Performance Optimization', 'SEO Ready'],
  },
  {
    id: 3,
    title: 'Creative Design',
    description: 'Stunning visual designs that capture attention and communicate your brand message effectively.',
    icon: FiEdit3,
    features: ['UI/UX Design', 'Motion Graphics', 'Brand Guidelines'],
  },
  {
    id: 4,
    title: 'Performance Marketing',
    description: 'Data-driven marketing strategies that deliver measurable results and maximize ROI.',
    icon: FiTrendingUp,
    features: ['Campaign Strategy', 'Analytics', 'Conversion Optimization'],
  },
  {
    id: 5,
    title: 'App Development',
    description: 'Native and cross-platform mobile apps built with cutting-edge technology.',
    icon: FiSmartphone,
    features: ['iOS Development', 'Android Development', 'Cross-Platform'],
  },
  {
    id: 6,
    title: 'Digital Strategy',
    description: 'Comprehensive digital transformation strategies for modern businesses.',
    icon: FiZap,
    features: ['Digital Audit', 'Roadmap Planning', 'Implementation'],
  },
]

const Services = () => {
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
          // Headline
          gsap.from('.services-headline', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'expo.out',
          })

          // Description
          gsap.from('.services-desc', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'expo.out',
            delay: 0.1,
          })

          // Cards
          gsap.from('.service-card', {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.08,
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
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        background: 'var(--color-black)',
      }}
      aria-label="Our Services"
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
        <div className="max-w-2xl mb-16 sm:mb-20">
          <h2
            className="services-headline font-display font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '1rem',
            }}
          >
            Services Built for Growth
          </h2>
          <p
            className="services-desc"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Comprehensive digital solutions designed to elevate your brand and drive measurable business results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
