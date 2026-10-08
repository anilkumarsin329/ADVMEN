import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLayers } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'
import { API_BASE_URL, getImageUrl } from '@utils/constants'
import { cachedFetch } from '@utils/apiCache'
import { services as defaultServices } from '@data/services'

const LAYERS = [
  { layer: 'LAYER 01', title: 'SEO', desc: 'Technical health, content and links for classic rankings.' },
  { layer: 'LAYER 02', title: 'AEO', desc: 'Direct answers, FAQ schema and snippets for answer boxes.' },
  { layer: 'LAYER 03', title: 'GEO', desc: 'Entities and citations so LLMs recommend you by name.' },
]

const SPECIALISE = ['Healthcare', 'Real Estate', 'E-Commerce / D2C', 'Education / Edtech', 'Beauty']

const Services = ({ isPage = false }) => {
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)
  const [servicesData, setServicesData] = useState(defaultServices)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await cachedFetch(`${API_BASE_URL}/api/services`)
        if (res) {
          setServicesData(Array.isArray(res) && res.length > 0 ? res : defaultServices)
        } else {
          setServicesData(defaultServices)
        }
      } catch (err) {
        console.warn('API connection failed for Services:', err)
        setServicesData(defaultServices)
      } finally {
        setIsLoading(false)
      }
    }
    loadServices()
  }, [])

  useEffect(() => {
    if (isLoading || servicesData.length === 0 || !sectionRef.current) return

    let ctx
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        ctx = gsap.context(() => {
          if (sectionRef.current.querySelector('.services-headline')) {
            gsap.fromTo('.services-headline',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
            )
          }
          if (sectionRef.current.querySelector('.services-desc')) {
            gsap.fromTo('.services-desc',
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.1 }
            )
          }
          if (sectionRef.current.querySelector('.service-card')) {
            gsap.fromTo('.service-card',
              { opacity: 0, y: 40, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'expo.out', stagger: 0.08, delay: 0.2 }
            )
          }
        }, sectionRef)
      },
      { threshold: 0.15 }
    )

    obs.observe(sectionRef.current)
    return () => {
      obs.disconnect()
      if (ctx) ctx.revert()
    }
  }, [isLoading, servicesData])

  const threeLayersBlock = (
    <div className="mt-16 sm:mt-20">
      <div className="mb-8">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem', fontWeight: 700 }}>Our SEO Approach</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>One Team. Three Search Layers.</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {LAYERS.map((item) => (
          <div key={item.layer} style={{ padding: '1.75rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,107,0,0.15)', backdropFilter: 'blur(12px)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-orange)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>{item.layer}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.6rem' }}>{item.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: '2rem 2.5rem', borderRadius: '1rem', background: 'rgba(255,107,0,0.04)', border: '1px solid rgba(255,107,0,0.15)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.25rem', fontWeight: 700 }}>We Specialise In</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {SPECIALISE.map(tag => (
            <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-orange)', background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)', padding: '0.55rem 1.25rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: isPage ? 'calc(var(--navbar-height) + clamp(2rem, 5vw, 4rem))' : 'clamp(3rem, 8vw, 6rem)',
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
        background: 'var(--color-black)',
      }}
      aria-label="Our Services"
    >
      {/* Background glows */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '20%', left: '10%', width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', right: '5%', width: 'clamp(250px, 40vw, 500px)', height: 'clamp(250px, 40vw, 500px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', animation: 'float 10s ease-in-out infinite reverse' }} />

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10" style={{ zIndex: 1, maxWidth: '100%' }}>

        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          <div className="inline-block mb-3 sm:mb-4">
            <span
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-widest uppercase inline-flex items-center gap-1.5"
              style={{ background: 'rgba(255, 107, 0, 0.1)', border: '1px solid rgba(255, 107, 0, 0.3)', color: 'var(--color-orange)' }}
            >
              <FiLayers size={14} /> Our Expertise
            </span>
          </div>
          <h2
            className="services-headline font-display font-bold"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)' }}
          >
            Our Capabilities
          </h2>
          <p
            className="services-desc"
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', color: 'var(--color-text-secondary)', lineHeight: '1.6', maxWidth: '90%' }}
          >
            High-Performance Solutions Built for Growth. We craft modular systems, clean interfaces, and organic traffic growth tools tailored to start-ups and large enterprises.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {isLoading ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--color-orange)] border-t-transparent animate-spin" />
            </div>
          ) : servicesData.map((service, idx) => (
            <div key={service.id || service._id} className="service-card group">
              <Link to={`/services/${service.slug}`} className="block h-full cursor-pointer">
                <div
                  className="relative card-glass flex flex-col h-full transition-all duration-300 hover:border-[rgba(255,107,0,0.3)] hover:shadow-xl"
                  style={{ minHeight: '400px', background: 'var(--color-surface-1)' }}
                >
                  <div
                    className="relative w-full flex items-center justify-center overflow-hidden flex-shrink-0"
                    style={{ height: 'clamp(140px, 35vw, 200px)', background: 'linear-gradient(135deg, rgba(30,30,30,0.8) 0%, rgba(20,20,20,0.8) 100%)', borderBottom: '1px solid rgba(255,107,0,0.1)' }}
                  >
                    <img
                      src={getImageUrl(service.image)}
                      alt={service.title}
                      width="600" height="200"
                      className="transition-transform duration-500 group-hover:scale-105"
                      style={{ maxWidth: '95%', maxHeight: '95%', width: 'auto', height: 'auto', objectFit: 'contain', objectPosition: 'center' }}
                      loading="lazy" decoding="async"
                    />
                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,107,0,0.15) 0%, rgba(0,0,0,0.4) 100%)' }} />
                  </div>

                  <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
                    <div className="text-xs font-mono font-bold tracking-widest mb-2 sm:mb-2.5" style={{ color: 'var(--color-orange)', opacity: 0.6 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display font-bold mb-1.5 transition-colors duration-300 group-hover:text-orange-400" style={{ color: 'var(--color-text-primary)', lineHeight: '1.2', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                      {service.title}
                    </h3>
                    <p className="mb-2 sm:mb-3 flex-grow transition-colors duration-300" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.4', fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' }}>
                      {service.description}
                    </p>
                    <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3 pt-2 sm:pt-3 border-t border-[rgba(255,255,255,0.05)]">
                      {Array.isArray(service.features) && service.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125 mt-0.5" style={{ background: 'var(--color-orange)' }} />
                          <span style={{ color: 'var(--color-text-secondary)' }} className="leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-orange)] transition-all duration-300 transform group-hover:translate-x-1 mt-auto pt-2">
                      <span className="text-xs sm:text-sm font-semibold">Learn More</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Three Search Layers — always after grid */}
        {threeLayersBlock}

        {/* Callout — only on /services page */}
        {isPage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-16 sm:mt-20 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8"
            style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)' }}
          >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)', filter: 'blur(50px)' }} />
            <div className="relative z-10 flex flex-col gap-3 max-w-xl">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)' }}>
                Need a Bespoke Solution?
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                If your project requirements span across multiple service modules, or you require a custom product, our creative architects can consult with your technical team to map a custom plan.
              </p>
            </div>
            <Link to="/contact" className="relative z-10 btn-primary btn-lg shine whitespace-nowrap text-sm sm:text-base" data-cursor="hover">
              Let's Discuss
            </Link>
          </motion.div>
        )}

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        @media (max-width: 640px) {
          .service-card { transition: transform 0.3s ease; }
          .service-card:active { transform: scale(0.98); }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .service-card { min-height: 420px; }
        }
        @media (min-width: 1025px) {
          .service-card { min-height: 450px; }
        }
      `}</style>
    </section>
  )
}

export default Services
