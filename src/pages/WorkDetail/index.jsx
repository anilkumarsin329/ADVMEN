/**
 * pages/WorkDetail/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — Case Study / Work Details Page
 * ─────────────────────────────────────────────────────────────
 */

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@utils/gsapConfig'

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'
import { API_BASE_URL, getImageUrl } from '@utils/constants'
import { cachedFetch } from '@/utils/apiCache'

import { portfolioProjects } from '@data/portfolio'
import { featuredCaseStudies } from '@data/caseStudies'

const fallbackCaseStudies = [...portfolioProjects, ...featuredCaseStudies]

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
        // First try Case Studies API endpoint
        let success = false;
        try {
          const data = await cachedFetch(`${API_BASE_URL}/api/case-studies/${slug}`)
          if (data.data) {
            setDetails(data.data)
            success = true;
          } else if (data.title) {
            setDetails(data)
            success = true;
          }
        } catch (e) {}

        if (success) return;
        
        // Next try Portfolio API endpoint
        try {
          const data = await cachedFetch(`${API_BASE_URL}/api/portfolio/${slug}`)
          setDetails(data)
          return
        } catch (e) {}

        // Fallback to static items
        const fallback = fallbackCaseStudies.find(
          item => item.slug === slug || String(item.id) === String(slug) || `case-study-${item.id}` === slug
        )
        if (fallback) {
          setDetails(fallback)
        } else {
          navigate('/404')
        }
      } catch (err) {
        console.warn('API error, checking fallback data:', err)
        const fallback = fallbackCaseStudies.find(
          item => item.slug === slug || String(item.id) === String(slug) || `case-study-${item.id}` === slug
        )
        if (fallback) {
          setDetails(fallback)
        } else {
          navigate('/404')
        }
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

  const heroText = details.tagline || details.summary || details.description
  const results = details.results?.length
    ? details.results
    : (details.metrics || []).map(m => ({ metric: m.value, label: m.label }))

  return (
    <PageTransition>
      <SEOHead
        title={`${details.client} Case Study — ADVMEN`}
        description={heroText}
        schemaType="project"
        schemaData={{
          projectName: `${details.client} — ${details.title}`,
          about: details.category,
          breadcrumbs: [
            { name: 'Home', url: 'https://www.advmen.com/' },
            { name: 'Work', url: 'https://www.advmen.com/work' },
            { name: details.client, url: `https://www.advmen.com/work/${details.slug}` }
          ]
        }}
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
                {details.title || details.client}
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
                {heroText}
              </p>

              {/* Hero Cover Image Banner */}
              {details.image && typeof details.image === 'string' && details.image.trim() !== '' && (
                <div className="case-stagger w-full mt-6 rounded-2xl overflow-hidden border border-ink/25 shadow-2xl aspect-[16/9] max-h-[500px]">
                  <img loading="lazy" decoding="async"
                    src={getImageUrl(details.image, 1280) || null}
                    alt={details.title || details.client}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Main Content */}
              <div className="lg:col-span-2 flex flex-col gap-12">
                {details.description && (
                  <div className="flex flex-col gap-4">
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Project Overview
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.75',
                      }}
                    >
                      {details.description}
                    </p>
                  </div>
                )}

                {/* Challenge */}
                {details.challenge && (
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
                )}

                {/* Solution */}
                {details.solution && (
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
                )}

                {/* Results Grid */}
                {results.length > 0 && (
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((res, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '1.5rem',
                          borderRadius: '1rem',
                          background: 'rgba(232,93,4,0.02)',
                          border: '1px solid rgba(232,93,4,0.1)',
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
                )}

                {/* Detailed sections */}
                {details.sections?.map((sec) => (
                  <div key={sec.heading} className="flex flex-col gap-4">
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {sec.heading}
                    </h2>
                    {sec.body && (
                      <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', lineHeight: '1.75' }}>
                        {sec.body}
                      </p>
                    )}
                    {sec.points?.length > 0 && (
                      <ul className="flex flex-col gap-3">
                        {sec.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex gap-3"
                            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', lineHeight: '1.65' }}
                          >
                            <span
                              aria-hidden="true"
                              style={{ marginTop: '0.55rem', width: 6, height: 6, borderRadius: '50%', background: 'var(--color-orange)', flexShrink: 0 }}
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {details.note && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--color-text-tertiary)',
                      lineHeight: '1.6',
                      borderLeft: '2px solid rgba(232,93,4,0.4)',
                      paddingLeft: '1rem',
                    }}
                  >
                    {details.note}
                  </p>
                )}
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-8">
                {/* Project Info */}
                <div
                  className="p-8 rounded-2xl cursor-default"
                  style={{
                    background: 'var(--color-surface-1)',
                    border: '1px solid var(--color-border-subtle)',
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
                    {details.client && (
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
                    )}
                    {details.industry && (
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
                          Industry
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                          {details.industry}
                        </div>
                      </div>
                    )}
                    {details.scope && (
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
                          Scope
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                          {details.scope}
                        </div>
                      </div>
                    )}
                    {(details.duration || details.year) && (
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
                          Duration / Year
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.92rem',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          {details.duration || details.year}
                        </div>
                      </div>
                    )}

                    {(details.projectLink || details.projectUrl || details.link) && (
                      <div className="pt-2">
                        <a
                          href={details.projectLink || details.projectUrl || details.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-ink font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                        >
                          <span>View Live Project</span>
                          <FiExternalLink size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech Stack */}
                {details.tech && details.tech.length > 0 && (
                  <div
                    className="p-8 rounded-2xl cursor-default"
                    style={{
                      background: 'var(--color-surface-1)',
                      border: '1px solid var(--color-border-subtle)',
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
                            background: 'var(--color-surface-2)',
                            border: '1px solid var(--color-border-subtle)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {details.tags && details.tags.length > 0 && (
                  <div
                    className="p-8 rounded-2xl cursor-default"
                    style={{
                      background: 'var(--color-surface-1)',
                      border: '1px solid var(--color-border-subtle)',
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
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {details.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full font-mono text-[0.68rem] uppercase"
                          style={{
                            background: 'var(--color-surface-2)',
                            border: '1px solid var(--color-border-subtle)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

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
