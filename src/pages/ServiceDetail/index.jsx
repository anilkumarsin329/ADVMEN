/**
 * pages/ServiceDetail/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Dedicated Service Detail Page
 * Phase 2: Dynamic Service details complete.
 * ─────────────────────────────────────────────────────────────
 */

import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import ServiceIcon   from '@components/sections/Services/ServiceIcon'
import { getServiceBySlug } from '@data/services'
import { API_BASE_URL, getImageUrl } from '@utils/constants'
import { FiX } from 'react-icons/fi'

const defaultWorkflowSteps = [
  { step: '01', title: 'Discovery & Mapping', desc: 'We align on requirements, audit existing architectures, and design strategic blueprints.' },
  { step: '02', title: 'Creative Engineering', desc: 'Our visual artists build design systems while engineers code fast, interactive solutions.' },
  { step: '03', title: 'Deploy & Optimize', desc: 'We launch on production servers, run speed test checks, and scale organic search traffic.' },
]

const ServiceDetail = () => {
  const { slug }   = useParams()
  let decodedSlug = slug
  try {
    decodedSlug = decodeURIComponent(slug || '')
  } catch (e) {
    /* ignore decode error */
  }

  const fallback   = getServiceBySlug(slug) || getServiceBySlug(decodedSlug)
  const [serviceData, setServiceData] = useState(fallback)
  const [loading, setLoading]         = useState(!fallback)

  useEffect(() => {
    let isMounted = true
    const localMatch = getServiceBySlug(slug) || getServiceBySlug(decodedSlug)
    if (localMatch) {
      setServiceData((prev) => prev || localMatch)
    }

    const fetchServiceData = async () => {
      try {
        const fetchSlug = encodeURIComponent(slug || '')
        const res = await fetch(`${API_BASE_URL}/api/services/${fetchSlug}`)
        if (res.ok) {
          const data = await res.json()
          if (data && (data.title || data.name) && isMounted) {
            setServiceData({
              ...localMatch,
              ...data,
              title: data.title || data.name || localMatch?.title,
              features: (Array.isArray(data.features) && data.features.length > 0)
                ? data.features
                : (data.featuresString ? data.featuresString.split(',').map(s => s.trim()) : localMatch?.features || []),
              image: data.image
                ? (data.image.startsWith('/') ? getImageUrl(data.image) : data.image)
                : (localMatch?.image || '/Image/advmen_service1.jpeg'),
              icon: data.icon || localMatch?.icon || 'web',
              workflow: (Array.isArray(data.workflow) && data.workflow.length > 0)
                ? data.workflow
                : (localMatch?.workflow || defaultWorkflowSteps)
            })
          }
        }
      } catch (err) {
        console.warn('API error fetching service detail:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchServiceData()
    return () => { isMounted = false }
  }, [slug])

  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsImageModalOpen(false)
    }
    if (isImageModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isImageModalOpen])

  const service = serviceData || getServiceBySlug(slug) || getServiceBySlug(decodedSlug)

  if (!service) {
    return (
      <div
        className="section-full flex-center"
        style={{ background: 'var(--color-black)', minHeight: '100vh' }}
      >
        <div className="container text-center flex flex-col items-center gap-6">
          <span className="font-mono text-[var(--color-orange)] text-sm uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="section-title">Service Not Found</h1>
          <p className="type-body text-[var(--color-text-secondary)] max-w-md">
            The service path you are looking for does not exist or has been relocated in our system.
          </p>
          <Link to="/services" className="btn-primary btn-lg mt-4">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <SEOHead
        title={`${service.title} — ADVMEN Technologies`}
        description={service.description}
      />

      <section
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '6rem',
          background: 'var(--color-black)',
        }}
        aria-label={`${service.title} Detail`}
      >
        {/* Glow overlay */}
        <div
          className="absolute top-0 right-0 w-[50vw] h-[50vh] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,0,0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="container relative z-10">
          
          {/* Breadcrumb / Back Link */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 group mb-10 text-[var(--color-text-tertiary)] hover:text-[var(--color-orange)] transition-colors duration-300"
            data-cursor="hover"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="group-hover:-translate-x-1 transition-transform duration-300">
              <path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-mono text-xs uppercase tracking-wider">Back to Services</span>
          </Link>

          {/* Service Hero Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            
            {/* Left Col — Info */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div
                  className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(255,107,0,0.04)',
                    border: '1px solid rgba(255,107,0,0.08)',
                  }}
                >
                  <ServiceIcon name={service.icon} size={28} />
                </div>
                <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>
                  Service Module
                </span>
              </div>

              <h1
                className="section-title"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                  lineHeight: 1.1,
                  fontWeight: 'var(--weight-bold)',
                  letterSpacing: '-0.02em',
                }}
              >
                {service.title}
              </h1>

              <p
                className="type-body-lg text-[var(--color-text-secondary)]"
                style={{ lineHeight: '1.7', maxWidth: '600px' }}
              >
                {service.description}
              </p>
            </div>

            {/* Right Col — Bullet Capabilities Card */}
            <div className="col-span-12 lg:col-span-5">
              <div
                className="p-8 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Key Capabilities
                </h3>

                <ul className="flex flex-col gap-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--color-orange)' }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-small)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Featured Image Banner - Industrial Grand Design (Zero Cropping) */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onClick={() => setIsImageModalOpen(true)}
                className="relative w-full rounded-2xl overflow-hidden border border-[rgba(255,107,0,0.25)] shadow-2xl bg-[#090a0f] flex items-center justify-center p-3 sm:p-6 cursor-pointer group min-h-[260px] max-h-[480px] md:max-h-[520px]"
                title="Click to expand full image"
              >
                {/* Ambient Blurred Glow Background */}
                {service.image && (
                  <img
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110 pointer-events-none select-none transition-opacity duration-500 group-hover:opacity-45"
                  />
                )}

                {/* Industrial Glass Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-0" />

                {/* Main Foreground Image - object-contain prevents ANY cropping */}
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="relative z-10 w-full h-auto max-h-[450px] md:max-h-[490px] object-contain mx-auto rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                ) : (
                  <div className="py-20 text-center text-gray-500 font-mono text-sm relative z-10">No Graphic Image Available</div>
                )}

                {/* Hover Click-to-Expand Indicator Badge */}
                <div className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-lg bg-black/80 border border-[rgba(255,107,0,0.3)] text-xs font-mono text-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 pointer-events-none backdrop-blur-md shadow-lg">
                  <svg className="w-3.5 h-3.5 text-[var(--color-orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Click to Expand
                </div>
              </motion.div>
            </div>
          </section>

          {/* Execution Timeline / Workflow */}
          <div className="mb-24">
            <div className="mb-12">
              <span className="eyebrow">Execution</span>
              <h2 className="section-title mt-4">Our Service Workflow</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(service.workflow || defaultWorkflowSteps).map((stepData) => (
                <div
                  key={stepData.step}
                  className="p-8 rounded-2xl flex flex-col gap-4"
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span
                    className="font-display text-3xl font-extrabold text-[var(--color-orange)] opacity-40"
                  >
                    {stepData.step}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {stepData.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-small)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {stepData.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Conversion CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="p-8 lg:p-12 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8"
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="relative z-10 flex flex-col gap-2 max-w-xl">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Inquire About {service.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                }}
              >
                Let's schedule a session to outline your timeline, tech specs, and target metrics for {service.title}.
              </p>
            </div>

            <Link
              to="/contact"
              className="relative z-10 btn-primary btn-lg shine"
              data-cursor="hover"
            >
              Start Project
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Fullscreen Image Lightbox Modal */}
      {isImageModalOpen && service.image && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative max-w-6xl max-h-[92vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 sm:right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 z-10 flex items-center justify-center border border-white/10"
              title="Close (Esc)"
            >
              <FiX size={24} />
            </button>

            {/* Expanded Full Resolution Image */}
            <div className="w-full h-full flex items-center justify-center overflow-auto rounded-2xl border border-[rgba(255,107,0,0.3)] bg-black/70 shadow-2xl p-2 sm:p-4">
              <img
                src={service.image}
                alt={service.title}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl select-none"
              />
            </div>
            
            {/* Caption */}
            <div className="mt-3 text-center text-xs font-mono text-gray-400 max-w-xl truncate">
              {service.title}
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  )
}

export default ServiceDetail
