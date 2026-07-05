/**
 * pages/ServiceDetail/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Dedicated Service Detail Page
 * Phase 2: Dynamic Service details complete.
 * ─────────────────────────────────────────────────────────────
 */

import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import ServiceIcon   from '@components/sections/Services/ServiceIcon'
import { services } from '@data/services'

const workflowSteps = [
  { step: '01', title: 'Discovery & Mapping', desc: 'We align on requirements, audit existing architectures, and design strategic blueprints.' },
  { step: '02', title: 'Creative Engineering', desc: 'Our visual artists build design systems while engineers code fast, interactive solutions.' },
  { step: '03', title: 'Deploy & Optimize', desc: 'We launch on production servers, run speed test checks, and scale organic search traffic.' },
]

const ServiceDetail = () => {
  const { slug }   = useParams()
  const service    = services.find((s) => s.slug === slug)

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

          {/* Featured Image Banner */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              style={{
                width: '100%',
                aspectRatio: '21 / 9',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(255,107,0,0.05) 0%, rgba(255,107,0,0.02) 100%)',
                border: '1px solid rgba(255,107,0,0.12)',
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-75 hover:opacity-90 hover:scale-101 transition-all duration-750 pointer-events-none"
              />
            </motion.div>
          </section>

          {/* Execution Timeline / Workflow */}
          <div className="mb-24">
            <div className="mb-12">
              <span className="eyebrow">Execution</span>
              <h2 className="section-title mt-4">Our Service Workflow</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workflowSteps.map((stepData) => (
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
    </PageTransition>
  )
}

export default ServiceDetail
