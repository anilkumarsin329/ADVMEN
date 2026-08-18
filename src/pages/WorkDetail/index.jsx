/**
 * pages/WorkDetail/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Case Study / Work Details Page
 * ─────────────────────────────────────────────────────────────
 */

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'


const WorkDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/portfolio/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setDetails(data)
        } else {
          navigate('/404')
        }
      } catch (err) {
        console.warn('API error, redirecting to 404:', err)
        navigate('/404')
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [slug, navigate])

  const handleBackClick = () => {
    if (location.state?.from === 'case-studies') {
      navigate('/', { state: { scrollTo: 'case-studies-section' } })
      setTimeout(() => {
        const caseStudiesSection = document.getElementById('case-studies-section')
        if (caseStudiesSection) {
          caseStudiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 500)
    } else {
      navigate(-1)
    }
  }

  useEffect(() => {
    if (loading || !details) return
    const ctx = gsap.context(() => {
      gsap.from('.case-stagger', {
        opacity: 0,
        y: 35,
        filter: 'blur(8px)',
        duration: 1.0,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.1,
        clearProps: 'all',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [details, loading])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--color-black)]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-orange)] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!details) return null

  return (
    <PageTransition>
      <SEOHead
        title={`${details.client} Case Study — ADVMEN`}
        description={details.tagline}
      />

      <div
        ref={containerRef}
        className="w-full"
        style={{ background: 'var(--color-black)' }}
      >
        
        {/* Back Button */}
        <div
          style={{
            paddingTop: 'calc(var(--navbar-height) + 2rem)',
            paddingBottom: '2rem',
          }}
        >
          <div className="container">
            <button
              onClick={handleBackClick}
              className="case-stagger flex items-center gap-2 transition-all duration-300 hover:gap-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--color-text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              data-cursor="hover"
            >
              <FiArrowLeft size={18} />
              Back to Case Studies
            </button>
          </div>
        </div>

        {/* Project Hero */}
        <section style={{ paddingBottom: '3rem' }}>
          <div className="container">
            <div className="max-w-3xl flex flex-col gap-4">
              {/* Category */}
              <span
                className="case-stagger"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-orange)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                Case Study
              </span>

              {/* Title */}
              <h1
                className="case-stagger font-display font-bold"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {details.client}
              </h1>

              {/* Description */}
              <p
                className="case-stagger"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  maxWidth: '700px',
                }}
              >
                {details.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Main Content */}
              <div className="lg:col-span-2 flex flex-col gap-12">
                {/* Overview */}
                <div className="flex flex-col gap-4">
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    The Challenge
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.75',
                    }}
                  >
                    {details.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="flex flex-col gap-4">
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    The Solution
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.75',
                    }}
                  >
                    {details.solution}
                  </p>
                </div>

                {/* Results Grid */}
                <div className="flex flex-col gap-6">
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Results & Impact
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {details.results.map((res, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '1.5rem',
                          borderRadius: '1rem',
                          background: 'rgba(255,107,0,0.02)',
                          border: '1px solid rgba(255,107,0,0.1)',
                          textAlign: 'center',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.75rem',
                            fontWeight: 'var(--weight-bold)',
                            color: 'var(--color-orange)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {res.metric}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--color-text-tertiary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-8">
                {/* Project Info */}
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
                      fontSize: '1.2rem',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--color-text-primary)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    Project Details
                  </h3>
                  <div className="flex flex-col gap-5">
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--color-text-tertiary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '0.25rem',
                        }}
                      >
                        Client
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.92rem',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {details.client}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--color-text-tertiary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '0.25rem',
                        }}
                      >
                        Duration
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.92rem',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {details.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
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
                      fontSize: '1.2rem',
                      fontWeight: 'var(--weight-bold)',
                      color: 'var(--color-text-primary)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {details.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full font-mono text-[0.68rem] uppercase"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Start Similar Project CTA */}
                <Link
                  to="/contact"
                  className="w-full btn-primary btn-lg shine flex items-center justify-center gap-2 py-3.5"
                  data-cursor="hover"
                >
                  Start Similar Project
                  <FiExternalLink size={16} />
                </Link>
              </div>

            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}

export default WorkDetail
