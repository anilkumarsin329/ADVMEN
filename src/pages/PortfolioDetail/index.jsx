/**
 * pages/PortfolioDetail/index.jsx
 * Portfolio case study detail page
 */

import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { getProjectBySlug } from '@data/portfolio'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'

const PortfolioDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = getProjectBySlug(slug)

  useEffect(() => {
    if (!project) {
      navigate('/404')
    }
  }, [project, navigate])

  if (!project) return null

  return (
    <PageTransition>
      <SEOHead
        title={`${project.title} — Case Study | ADVMEN`}
        description={project.description}
      />

      {/* Back Button */}
      <div
        style={{
          paddingTop: 'var(--section-padding-y)',
          paddingBottom: '2rem',
          background: 'var(--color-black)',
        }}
      >
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 transition-all duration-300 hover:gap-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <FiArrowLeft size={18} />
            Back to Portfolio
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section
        style={{
          paddingTop: '2rem',
          paddingBottom: '4rem',
          background: 'var(--color-black)',
        }}
      >
        <div className="container">
          <div className="max-w-3xl">
            {/* Category */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-orange)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                display: 'inline-block',
              }}
            >
              {project.category}
            </span>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              {project.title}
            </h1>

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              {project.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-all duration-300 hover:gap-3"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 'var(--weight-semibold)',
                  color: 'var(--color-white)',
                  background: 'var(--color-orange)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                }}
              >
                View Live Project
                <FiExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section
        style={{
          paddingBottom: '4rem',
          background: 'var(--color-black)',
        }}
      >
        <div className="container">
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(255,107,0,0.05) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,107,0,0.15)',
            }}
          >
            <div style={{ fontSize: '4rem', opacity: 0.2 }}>📸</div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section
        style={{
          paddingBottom: '4rem',
          background: 'var(--color-black)',
        }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 flex flex-col gap-12">
              {/* Challenge */}
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  The Challenge
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.8',
                  }}
                >
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  Our Solution
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.8',
                  }}
                >
                  {project.solution}
                </p>
              </div>

              {/* Before/After */}
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Before & After
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div
                    style={{
                      padding: '1.5rem',
                      borderRadius: '1rem',
                      background: 'rgba(255,107,0,0.05)',
                      border: '1px solid rgba(255,107,0,0.1)',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Before
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                      }}
                    >
                      {project.beforeAfter.before}
                    </p>
                  </div>

                  {/* After */}
                  <div
                    style={{
                      padding: '1.5rem',
                      borderRadius: '1rem',
                      background: 'rgba(255,107,0,0.1)',
                      border: '1px solid rgba(255,107,0,0.2)',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-orange)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      After
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                      }}
                    >
                      {project.beforeAfter.after}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-8">
              {/* Results */}
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,107,0,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Results
                </h3>
                <div className="flex flex-col gap-4">
                  {Object.entries(project.results).map(([key, result]) => (
                    <div key={key}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--color-text-tertiary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {result.label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.75rem',
                          fontWeight: 'var(--weight-bold)',
                          color: 'var(--color-orange)',
                        }}
                      >
                        {result.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,107,0,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-tertiary)',
                        background: 'rgba(255,107,0,0.05)',
                        border: '1px solid rgba(255,107,0,0.1)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div
                  style={{
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    background: 'rgba(255,107,0,0.05)',
                    border: '1px solid rgba(255,107,0,0.15)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                      fontStyle: 'italic',
                    }}
                  >
                    "{project.testimonial.quote}"
                  </p>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {project.testimonial.author}
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
                      {project.testimonial.role}, {project.testimonial.company}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default PortfolioDetail
