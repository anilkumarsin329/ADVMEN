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
import { API_BASE_URL, getImageUrl } from '@utils/constants'

import { portfolioProjects } from '@data/portfolio'

const fallbackCaseStudies = [
  ...portfolioProjects,
  {
    id: 1,
    slug: 'case-study-1',
    title: 'E-Commerce Platform Redesign',
    client: 'TechStore Inc.',
    category: 'Web Development',
    tagline: 'Complete e-commerce platform redesign with modern UI, optimized checkout flow, and mobile-first performance.',
    description: 'Complete e-commerce platform redesign with modern UI, optimized checkout flow, and mobile-first performance.',
    challenge: 'Legacy e-commerce store was suffering from slow page load speeds, high cart abandonment, and poor mobile user experience.',
    solution: 'Designed and built a modern headless e-commerce application with React and Next.js, featuring instantaneous page transitions and optimized checkout.',
    results: [
      { metric: '+15%', label: 'Conversion Rate' },
      { metric: '30%', label: 'Faster Load Speed' },
    ],
    image: '/Image/advmen_service3.jpeg',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Stripe'],
    tags: ['E-Commerce', 'Web Development', 'UI/UX']
  },
  {
    id: 2,
    slug: 'case-study-2',
    title: 'Digital Marketing Campaign',
    client: 'Fashion Brand Co.',
    category: 'Digital Marketing',
    tagline: 'Integrated digital marketing campaign driving multi-channel lead acquisition and brand awareness.',
    description: 'Integrated digital marketing campaign driving multi-channel lead acquisition and brand awareness.',
    challenge: 'Brand lacked multi-channel digital visibility and high customer acquisition cost across paid channels.',
    solution: 'Implemented targeted social media ad campaigns, influencer marketing partnerships, and data-driven conversion funnel optimization.',
    results: [
      { metric: '+40%', label: 'Monthly Leads' },
      { metric: '+25%', label: 'Social Engagement' },
    ],
    image: '/Image/advmen_service6.jpeg',
    tech: ['Google Ads', 'Meta Ads', 'SEO', 'Analytics', 'Funnel Design'],
    tags: ['Digital Marketing', 'Growth', 'Lead Gen']
  },
  {
    id: 3,
    slug: 'case-study-3',
    title: 'Mobile App Development',
    client: 'FitLife Technologies',
    category: 'App Development',
    tagline: 'Cross-platform fitness mobile application built with real-time tracking and active community features.',
    description: 'Cross-platform fitness mobile application built with real-time tracking and active community features.',
    challenge: 'Users needed a seamless, real-time activity tracker with social features that worked offline.',
    solution: 'Built a cross-platform mobile application using React Native with local caching, health API integrations, and community leaderboards.',
    results: [
      { metric: '500+', label: 'App Downloads' },
      { metric: '4.5/5', label: 'Store Rating' },
    ],
    image: '/Image/advmen_service1.jpeg',
    tech: ['React Native', 'Firebase', 'GraphQL', 'HealthKit'],
    tags: ['App Development', 'Mobile', 'Fitness']
  },
  {
    id: 4,
    slug: 'case-study-4',
    title: 'SEO & Content Strategy',
    client: 'Global Tech Solutions',
    category: 'SEO & Content',
    tagline: 'Technical SEO overhaul, keyword mapping, and content optimization positioning client on Page 1.',
    description: 'Technical SEO overhaul, keyword mapping, and content optimization positioning client on Page 1.',
    challenge: 'Low domain authority and organic search visibility compared to established market competitors.',
    solution: 'Executed a complete technical SEO audit, restructured site architecture, and launched high-converting content hubs.',
    results: [
      { metric: '+60%', label: 'Organic Traffic' },
      { metric: 'Page 1', label: 'Keyword Rankings' },
    ],
    image: '/Image/advmen_service9.jpeg',
    tech: ['Technical SEO', 'Content Strategy', 'Ahrefs', 'Search Console'],
    tags: ['SEO', 'Content', 'Growth']
  },
  {
    id: 5,
    slug: 'case-study-5',
    title: 'Brand Identity & Design System',
    client: 'StartUp Ventures Inc.',
    category: 'Branding',
    tagline: 'Complete brand guidelines, visual identity design system, and UI kit for high-impact market launch.',
    description: 'Complete brand guidelines, visual identity design system, and UI kit for high-impact market launch.',
    challenge: 'Inconsistent brand messaging and lack of a structured UI component library for upcoming products.',
    solution: 'Crafted a holistic brand strategy, logo guidelines, typography, and a comprehensive Figma design system.',
    results: [
      { metric: '5+', label: 'Brand Assets' },
      { metric: '2 Weeks', label: 'Fast Delivery' },
    ],
    image: '/Image/advmen_service4.jpeg',
    tech: ['Figma', 'Brand Strategy', 'UI/UX Design', 'Design Systems'],
    tags: ['Branding', 'Design System', 'UI/UX']
  },
  {
    id: 6,
    slug: 'case-study-6',
    title: 'Video Production & Media',
    client: 'Premium Lifestyle Brand',
    category: 'Media Production',
    tagline: 'High-converting video production and lifestyle product photography for social media campaigns.',
    description: 'High-converting video production and lifestyle product photography for social media campaigns.',
    challenge: 'Low ad engagement rates on social channels due to generic stock imagery.',
    solution: 'Produced high-definition lifestyle promotional videos and commercial product photography tailored for high-converting ads.',
    results: [
      { metric: '5K+', label: 'Video Views' },
      { metric: '+20%', label: 'Engagement Lift' },
    ],
    image: '/Image/advmen_service5.jpeg',
    tech: ['Video Production', '4K Cinema', 'Color Grading', 'Motion Graphics'],
    tags: ['Media Production', 'Video', 'Creative']
  }
]

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
        let res = await fetch(`${API_BASE_URL}/api/case-studies/${slug}`)
        if (res.ok) {
          const data = await res.json()
          if (data.data) {
            setDetails(data.data)
            return
          } else if (data.title) {
            setDetails(data)
            return
          }
        }
        
        // Next try Portfolio API endpoint
        res = await fetch(`${API_BASE_URL}/api/portfolio/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setDetails(data)
          return
        }

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
                {details.tagline || details.description}
              </p>

              {/* Hero Cover Image Banner */}
              {details.image && (
                <div className="case-stagger w-full mt-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/9] max-h-[500px]">
                  <img
                    src={getImageUrl(details.image)}
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
                {details.results && details.results.length > 0 && (
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
                )}
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
                          className="w-full px-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
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
                )}

                {/* Tags */}
                {details.tags && details.tags.length > 0 && (
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
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {details.tags.map((t) => (
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
