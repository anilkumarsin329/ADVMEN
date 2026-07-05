/**
 * Services.jsx — Enhanced with Premium Graphics
 * Better visual hierarchy, animated icons, gradient backgrounds
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
    gradient: 'from-orange-500/20 to-orange-600/10',
    borderColor: 'rgba(255, 107, 0, 0.3)',
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'Build fast, scalable, and beautiful websites that convert visitors into customers.',
    icon: FiCode,
    features: ['Responsive Design', 'Performance Optimization', 'SEO Ready'],
    gradient: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    id: 3,
    title: 'Creative Design',
    description: 'Stunning visual designs that capture attention and communicate your brand message effectively.',
    icon: FiEdit3,
    features: ['UI/UX Design', 'Motion Graphics', 'Brand Guidelines'],
    gradient: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'rgba(168, 85, 247, 0.3)',
  },
  {
    id: 4,
    title: 'Performance Marketing',
    description: 'Data-driven marketing strategies that deliver measurable results and maximize ROI.',
    icon: FiTrendingUp,
    features: ['Campaign Strategy', 'Analytics', 'Conversion Optimization'],
    gradient: 'from-green-500/20 to-green-600/10',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  {
    id: 5,
    title: 'App Development',
    description: 'Native and cross-platform mobile apps built with cutting-edge technology.',
    icon: FiSmartphone,
    features: ['iOS Development', 'Android Development', 'Cross-Platform'],
    gradient: 'from-pink-500/20 to-pink-600/10',
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  {
    id: 6,
    title: 'Digital Strategy',
    description: 'Comprehensive digital transformation strategies for modern businesses.',
    icon: FiZap,
    features: ['Digital Audit', 'Roadmap Planning', 'Implementation'],
    gradient: 'from-cyan-500/20 to-cyan-600/10',
    borderColor: 'rgba(34, 211, 238, 0.3)',
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
      {/* Animated background glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      <div className="relative container" style={{ zIndex: 1 }}>
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
              ✨ Our Expertise
            </span>
          </div>
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
            <div key={service.id} className="service-card group">
              <div
                className={`relative h-full p-8 rounded-2xl backdrop-blur-md transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden`}
                style={{
                  background: `linear-gradient(135deg, ${service.gradient.split(' ')[1]} 0%, ${service.gradient.split(' ')[3]} 100%)`,
                  border: `1.5px solid ${service.borderColor}`,
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                }}
              >
                {/* Animated background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${service.borderColor} 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className="mb-6 p-4 rounded-xl w-fit transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${service.borderColor}40`,
                      border: `1px solid ${service.borderColor}`,
                    }}
                  >
                    {service.icon && <service.icon size={28} style={{ color: 'var(--color-orange)' }} />}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display font-bold text-xl mb-3 group-hover:text-orange-400 transition-colors duration-300"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm mb-6 flex-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: 'var(--color-orange)' }}
                        />
                        <span style={{ color: 'var(--color-text-secondary)' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                    <span className="text-sm font-semibold">Learn More</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default Services
