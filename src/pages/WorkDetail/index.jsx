/**
 * pages/WorkDetail/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Case Study / Work Details Page
 * Updated to render optimized Unsplash HD images and Link components.
 * ─────────────────────────────────────────────────────────────
 */

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { portfolioItems } from '@data/portfolio'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'

const caseStudyDetails = {
  'luxe-fashion-brand': {
    tagline: 'Crafting a unified visual identity and digital storefront for an editorial fashion house.',
    challenge: 'The brand struggled to translate its physical luxury presence into a digital platform, experiencing high checkout drops and disjointed social identity.',
    solution: 'We developed an immersive layout, integrated a custom typography system, and mapped out a high-conversion checkout pipeline.',
    results: [
      { metric: '+240%', label: 'Mobile Sales' },
      { metric: '2.8x', label: 'ROAS Increase' },
      { metric: '100%', label: 'Brand Alignment' },
    ],
    tech: ['Figma', 'Shopify Liquid', 'Brand Strategy', 'Visual Identity'],
    client: 'Luxe Editorial Group',
    duration: '6 Weeks',
  },
  'fintech-saas': {
    tagline: 'A super-charged, performance-focused React analytics corporate platform.',
    challenge: 'Legacy system dashboards suffered from slow loading times, high data rendering delays, and security compliance issues.',
    solution: 'We engineered a headless dashboard front-end utilizing modular React components and deployed on highly secure serverless static layers.',
    results: [
      { metric: '0.4s', label: 'Load Duration' },
      { metric: '99%', label: 'Lighthouse Score' },
      { metric: '+120%', label: 'Active Signups' },
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Vercel', 'Highcharts'],
    client: 'Apex Fintech Corp',
    duration: '8 Weeks',
  },
  'real-estate-marketplace': {
    tagline: 'A seamless, interactive property listings marketplace connecting buyers and brokers.',
    challenge: 'Users struggled with slow search indexing, messy filtering options, and inaccurate property map positioning.',
    solution: 'We integrated instant Algolia search indexing, customized map layers, and simplified scheduling forms.',
    results: [
      { metric: '-40%', label: 'Search Latency' },
      { metric: '+85%', label: 'Lead Conversions' },
      { metric: '24/7', label: 'Uptime Monitoring' },
    ],
    tech: ['Next.js', 'Algolia API', 'Google Maps API', 'Node.js'],
    client: 'Villas & Co',
    duration: '10 Weeks',
  },
  'health-wellness-app': {
    tagline: 'Cross-platform mobile application optimized for tracking health goals and daily workouts.',
    challenge: 'High user churn due to complex menu patterns and sluggish performance on mid-range Android devices.',
    solution: 'We simplified user navigation paths, streamlined local state management, and optimized native assets compilation.',
    results: [
      { metric: '4.9★', label: 'App Store Rating' },
      { metric: '-30%', label: 'User Churn Rate' },
      { metric: '1M+', label: 'Active Users' },
    ],
    tech: ['React Native', 'Redux Toolkit', 'Node.js', 'MongoDB'],
    client: 'VitaLife Health',
    duration: '12 Weeks',
  },
  'corporate-branding': {
    tagline: 'Standardizing corporate assets and brand kits for global scale expansion.',
    challenge: 'Inconsistent brand representation across multiple regional branches, weakening brand equity.',
    solution: 'We designed a modern visual system guidelines kit covering decks, prints, signs, and web stylesheets.',
    results: [
      { metric: '100%', label: 'Brand Compliance' },
      { metric: '-50%', label: 'Asset Design Time' },
      { metric: '15+', label: 'Offices Aligned' },
    ],
    tech: ['Visual Systems', 'Deck Templates', 'Typography Guides', 'Asset Libraries'],
    client: 'OmniCorp Global',
    duration: '4 Weeks',
  },
  'political-campaign': {
    tagline: 'Strategic voter outreach and digital campaigning platform.',
    challenge: 'Scattered voter communication channels leading to low campaign turnout and community engagement.',
    solution: 'We developed customized regional landing pages, set up voter survey funnels, and ran optimized social ads.',
    results: [
      { metric: '+300%', label: 'Voter Engagement' },
      { metric: '500K+', label: 'Inquiries Received' },
      { metric: '4.8x', label: 'Media ROI' },
    ],
    tech: ['Funnel Design', 'Meta Ads API', 'SMS Integrations', 'Analytics Panels'],
    client: 'Alliance for Progress',
    duration: '5 Weeks',
  },
  'media-studio': {
    tagline: 'An immersive digital portal showcasing media productions, documentaries, and creative clips.',
    challenge: 'Slow loading times on high-resolution video thumbnails, leading to high bounce rates.',
    solution: 'We optimized video compression settings, developed custom lazy-loaded video cards, and added smooth canvas transitions.',
    results: [
      { metric: '-60%', label: 'Bounce Rate' },
      { metric: '+140%', label: 'Play Sessions' },
      { metric: '0.6s', label: 'Thumb Load Time' },
    ],
    tech: ['HTML5 Video API', 'GSAP', 'Cloudinary CDN', 'React'],
    client: 'Focus Frame Studios',
    duration: '7 Weeks',
  },
  'e-learning-platform': {
    tagline: 'A collaborative, highly accessible portal providing structured online courses.',
    challenge: 'Low course completion rates due to poor desktop UI layout responsiveness.',
    solution: 'We refactored user course views, added progress track badges, and integrated real-time quiz feedback panels.',
    results: [
      { metric: '+80%', label: 'Course Completions' },
      { metric: '4.8/5', label: 'User Feedback' },
      { metric: '10K+', label: 'Enrolled Students' },
    ],
    tech: ['React', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
    client: 'EduCore Academy',
    duration: '9 Weeks',
  },
}

const WorkDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = portfolioItems.find((p) => p.slug === slug)
  const details = caseStudyDetails[slug]
  const containerRef = useRef(null)

  useEffect(() => {
    if (!project) {
      navigate('/404')
    }
  }, [project, navigate])

  useEffect(() => {
    if (!project) return
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
  }, [project])

  if (!project || !details) return null

  // Get related projects
  const relatedProjects = portfolioItems
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3)

  return (
    <PageTransition>
      <SEOHead
        title={`${project.title} — ADVMEN Portfolio`}
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
              onClick={() => navigate(-1)}
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
              Back to Portfolio
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
                {project.category}
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
                {project.title}
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

              {/* Tags */}
              <div className="case-stagger flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--color-text-tertiary)',
                      background: 'rgba(255,107,0,0.05)',
                      border: '1px solid rgba(255,107,0,0.1)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image Section */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(255,107,0,0.05) 0%, rgba(255,107,0,0.02) 100%)',
                border: '1px solid rgba(255,107,0,0.12)',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-85 hover:opacity-100 hover:scale-102 transition-all duration-750 pointer-events-none"
              />
            </motion.div>
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
                        Year
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.92rem',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {project.year}
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

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section
            style={{
              paddingTop: '6rem',
              paddingBottom: '6rem',
              borderTop: '1px solid rgba(255,107,0,0.1)',
            }}
          >
            <div className="container">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: '2.5rem',
                }}
              >
                Related Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((related) => (
                  <Link
                    key={related.id}
                    to={`/work/${related.slug}`}
                    className="group p-6 rounded-2xl flex flex-col justify-between"
                    style={{
                      background: 'rgba(255,255,255,0.015)',
                      border: '1px solid rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      minHeight: '200px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,107,0,0.25)'
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                    data-cursor="hover"
                  >
                    <div>
                      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--color-orange)]">
                        {related.category}
                      </span>
                      <h3
                        className="group-hover:text-[var(--color-orange)] transition-colors duration-300 mt-2"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.25rem',
                          fontWeight: 'var(--weight-bold)',
                          color: 'var(--color-text-primary)',
                          lineHeight: '1.3',
                        }}
                      >
                        {related.title}
                      </h3>
                    </div>

                    <span className="font-mono text-[0.68rem] text-[var(--color-text-tertiary)] uppercase tracking-wider mt-4">
                      Year: {related.year}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </PageTransition>
  )
}

export default WorkDetail
