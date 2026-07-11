/**
 * pages/WorkDetail/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Case Study / Work Details Page
 * ─────────────────────────────────────────────────────────────
 */

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { portfolioItems } from '@data/portfolio'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'

const caseStudyDetails = {
  'case-study-1': {
    tagline: 'E-Commerce Platform Redesign - Complete transformation with modern UI and optimized checkout flow.',
    challenge: 'High bounce rate (68%) and low conversion rate (1.2%) due to outdated UI and poor user experience.',
    solution: 'Complete redesign with modern Neomorphism UI, optimized checkout flow, and mobile-first approach.',
    results: [
      { metric: '+300%', label: 'Conversion Rate' },
      { metric: '+260%', label: 'Revenue Growth' },
      { metric: '-53%', label: 'Bounce Rate' },
    ],
    tech: ['React', 'Tailwind CSS', 'Figma', 'Performance Optimization'],
    client: 'TechStore Inc.',
    duration: '8 Weeks',
  },
  'case-study-2': {
    tagline: 'Digital Marketing Campaign - Integrated strategy with targeted social campaigns and influencer partnerships.',
    challenge: 'Low brand awareness and minimal social media engagement despite large marketing budget.',
    solution: 'Integrated digital marketing strategy with targeted social campaigns, influencer partnerships, and content marketing.',
    results: [
      { metric: '+800%', label: 'Lead Generation' },
      { metric: '+733%', label: 'Follower Growth' },
      { metric: '+495%', label: 'Engagement Rate' },
    ],
    tech: ['Meta Ads API', 'Analytics', 'Content Strategy', 'Influencer Outreach'],
    client: 'Fashion Brand Co.',
    duration: '6 Weeks',
  },
  'case-study-3': {
    tagline: 'Mobile App Development - Cross-platform fitness app with real-time tracking and social features.',
    challenge: 'Needed a cross-platform fitness app with real-time tracking and social features.',
    solution: 'Built React Native app with Firebase backend, real-time analytics, and community features.',
    results: [
      { metric: '50K+', label: 'Downloads' },
      { metric: '4.8/5', label: 'App Rating' },
      { metric: '65%', label: 'Retention Rate' },
    ],
    tech: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    client: 'FitLife Technologies',
    duration: '12 Weeks',
  },
  'case-study-4': {
    tagline: 'SEO & Content Strategy - Comprehensive optimization driving massive organic traffic growth.',
    challenge: 'Ranked on page 5+ for target keywords with minimal organic traffic and poor content structure.',
    solution: 'Comprehensive SEO audit, keyword research, content optimization, and technical SEO improvements.',
    results: [
      { metric: '+1650%', label: 'Organic Traffic' },
      { metric: 'Page 1', label: 'Ranking Position' },
      { metric: '+1767%', label: 'Lead Generation' },
    ],
    tech: ['SEO Audit', 'Keyword Research', 'Content Optimization', 'Technical SEO'],
    client: 'Global Tech Solutions',
    duration: '10 Weeks',
  },
  'case-study-5': {
    tagline: 'Brand Identity & Design System - Complete visual identity for startup market launch.',
    challenge: 'New startup needed complete brand identity, logo, and design system for market launch.',
    solution: 'Created comprehensive brand guidelines, logo design, color palette, typography system, and UI kit.',
    results: [
      { metric: '100%', label: 'Brand Consistency' },
      { metric: '78%', label: 'Brand Recognition' },
      { metric: '$2.5M', label: 'Brand Value' },
    ],
    tech: ['Figma', 'Brand Strategy', 'Design Systems', 'Visual Identity'],
    client: 'StartUp Ventures Inc.',
    duration: '4 Weeks',
  },
  'case-study-6': {
    tagline: 'Video Production & Media - Professional content creation driving massive engagement.',
    challenge: 'Needed high-quality promotional videos and product photography for e-commerce and social media.',
    solution: 'Professional video production, product photography, editing, and social media content creation.',
    results: [
      { metric: '+4900%', label: 'Video Views' },
      { metric: '+900%', label: 'Social Reach' },
      { metric: '+224%', label: 'Conversion Lift' },
    ],
    tech: ['Video Production', 'Photography', 'Post-Production', 'Social Media'],
    client: 'Premium Lifestyle Brand',
    duration: '6 Weeks',
  },
}

const WorkDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const details = caseStudyDetails[slug]
  const containerRef = useRef(null)

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
    if (!details) {
      navigate('/404')
    }
  }, [details, navigate])

  useEffect(() => {
    if (!details) return
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
  }, [details])

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
