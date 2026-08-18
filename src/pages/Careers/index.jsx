/**
 * pages/Careers/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Careers Page
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'
import { 
  FiGlobe, 
  FiTrendingUp, 
  FiAward, 
  FiDollarSign, 
  FiBookOpen, 
  FiUsers, 
  FiCpu, 
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiMapPin
} from 'react-icons/fi'

import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'

const openPositions = [
  { 
    id: 1, 
    title: 'MERN Stack Developer', 
    department: 'Engineering', 
    experience: ['Fresher (0-1 yr)', 'Junior (1-3 yrs)', 'Senior (3+ yrs)'], 
    location: 'Gurugram / Remote', 
    type: 'Full-Time', 
    skills: ['MongoDB', 'Express', 'React', 'Node.js', 'REST APIs'], 
    responsibilities: ['Build scalable web apps', 'Write clean reusable code', 'Collaborate with design team', 'API integration'], 
    requirements: ['Strong JS fundamentals', 'Git proficiency', 'Problem solving skills'] 
  },
  { 
    id: 2, 
    title: 'Full App Developer', 
    department: 'Engineering', 
    experience: ['Junior (1-3 yrs)', 'Senior (3+ yrs)'], 
    location: 'Gurugram / Remote', 
    type: 'Full-Time', 
    skills: ['React Native', 'Flutter', 'Firebase', 'REST APIs'], 
    responsibilities: ['Build cross-platform mobile apps', 'App store deployment', 'Performance optimization'], 
    requirements: ['React Native or Flutter experience', 'Published app preferred', 'Strong debugging skills'] 
  },
  { 
    id: 3, 
    title: 'UI/UX Designer', 
    department: 'Design', 
    experience: ['Fresher (0-1 yr)', 'Junior (1-3 yrs)', 'Senior (3+ yrs)'], 
    location: 'Gurugram / Hybrid', 
    type: 'Full-Time', 
    skills: ['Figma', 'Adobe XD', 'Motion Design', 'Prototyping'], 
    responsibilities: ['Design pixel-perfect UI', 'Create design systems', 'Motion mockups', 'User research'], 
    requirements: ['Strong Figma skills', 'Portfolio required', 'Eye for detail'] 
  },
  { 
    id: 4, 
    title: 'Sales Executive', 
    department: 'Sales', 
    experience: ['Fresher (0-1 yr)', 'Junior (1-3 yrs)'], 
    location: 'Gurugram', 
    type: 'Full-Time', 
    skills: ['B2B Sales', 'Client Acquisition', 'CRM', 'Negotiation'], 
    responsibilities: ['Generate leads', 'Client meetings', 'Close deals', 'Maintain CRM'], 
    requirements: ['Good communication', 'Target driven', 'Prior sales experience preferred'] 
  },
  { 
    id: 5, 
    title: 'Digital Marketing Specialist', 
    department: 'Marketing', 
    experience: ['Fresher (0-1 yr)', 'Junior (1-3 yrs)', 'Senior (3+ yrs)'], 
    location: 'Gurugram / Remote', 
    type: 'Full-Time', 
    skills: ['SEO', 'Google Ads', 'Meta Ads', 'Social Media', 'Analytics'], 
    responsibilities: ['Run paid campaigns', 'SEO audits', 'Content strategy', 'Performance reporting'], 
    requirements: ['Google Ads certified preferred', 'Analytics knowledge', 'Creative thinking'] 
  },
]

const perks = [
  { icon: FiGlobe, title: 'Remote Friendly', desc: 'Work from anywhere' },
  { icon: FiTrendingUp, title: 'Fast Growth', desc: 'Clear career path' },
  { icon: FiAward, title: 'Creative Freedom', desc: 'Your ideas matter' },
  { icon: FiDollarSign, title: 'Competitive Pay', desc: 'Market + performance bonus' },
  { icon: FiBookOpen, title: 'Learning Budget', desc: 'Courses & certifications' },
  { icon: FiUsers, title: 'Young Team', desc: 'Energetic collaborative culture' },
  { icon: FiCpu, title: 'Real Projects', desc: 'Work on live client projects' },
  { icon: FiClock, title: 'Flexible Hours', desc: 'Results over clock-watching' },
]

const Careers = () => {
  const containerRef = useRef(null)
  const positionsRef = useRef(null)
  const perksRef = useRef(null)

  const [selectedDept, setSelectedDept] = useState('All')
  const [expandedPosId, setExpandedPosId] = useState(null)
  const [positions, setPositions] = useState(openPositions)

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/careers')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setPositions(data.map(item => ({ ...item, id: item._id || item.id })))
          }
        }
      } catch (err) {
        console.warn('Backend careers fetch error:', err)
      }
    }
    fetchCareers()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.careers-stagger', {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)',
        duration: 1.0,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.15,
        clearProps: 'all',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const departments = ['All', ...new Set(positions.map(p => p.department))]

  const filteredPositions = positions.filter((pos) => 
    selectedDept === 'All' || pos.department === selectedDept
  )

  const toggleAccordion = (id) => {
    setExpandedPosId((prev) => (prev === id ? null : id))
  }

  return (
    <PageTransition>
      <SEOHead
        title="Careers — ADVMEN Technologies"
        description="Join ADVMEN Technologies - a premium creative-tech agency. View our open positions and build the future of creative tech with us."
      />

      <div ref={containerRef} className="w-full bg-[var(--color-black)] min-h-screen text-[var(--color-text-primary)] font-body">
        
        {/* ── SECTION 1: HERO ── */}
        <section 
          className="relative w-full overflow-hidden flex items-center"
          style={{
            paddingTop: 'calc(var(--navbar-height) + 4rem)',
            paddingBottom: '6rem',
            background: 'var(--gradient-radial-orange)',
          }}
          aria-label="Careers Hero"
        >
          <div className="container relative z-10">
            <div className="max-w-4xl flex flex-col gap-6">
              
              <div className="careers-stagger flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--color-orange)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]">
                  We're Hiring
                </span>
              </div>

              <h1 
                className="careers-stagger section-title"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1.1,
                  fontWeight: 'var(--weight-bold)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                Build the Future of <span className="text-orange-gradient">Creative</span> Tech.
              </h1>

              <p 
                className="careers-stagger type-body-lg"
                style={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  maxWidth: '640px',
                }}
              >
                Join a team of engineers, designers, and growth strategists building brands that dominate. We refuse templates, write fast code, and honor premium design.
              </p>

              <div className="careers-stagger flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() => positionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="btn-primary"
                  data-cursor="hover"
                >
                  View Open Roles
                </button>
                <button
                  onClick={() => perksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="btn-secondary"
                  data-cursor="hover"
                >
                  Learn About Culture
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 2: OPEN POSITIONS ── */}
        <section 
          ref={positionsRef}
          className="w-full relative"
          style={{
            paddingTop: '6rem',
            paddingBottom: '6rem',
            background: 'var(--color-black)',
          }}
          aria-label="Open Positions"
        >
          <div className="container">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-px bg-[var(--color-orange)]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]">
                    Opportunities
                  </span>
                </div>
                <h2 className="text-[var(--text-display-sm)] font-display font-bold leading-tight">
                  Available Positions
                </h2>
              </div>
              
              {/* Department filter tabs */}
              <div className="flex flex-wrap gap-2.5">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDept(dept)
                      setExpandedPosId(null)
                    }}
                    className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300`}
                    style={{
                      background: selectedDept === dept ? 'var(--color-orange)' : 'var(--color-surface-1)',
                      color: selectedDept === dept ? 'var(--color-white-pure)' : 'var(--color-text-secondary)',
                      border: '1px solid rgba(255, 255, 255, 0.03)',
                      boxShadow: selectedDept === dept ? '0 0 15px var(--color-glow-orange-sm)' : 'var(--shadow-neu-convex)',
                    }}
                    data-cursor="hover"
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Positions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPositions.map((pos) => {
                  const isExpanded = expandedPosId === pos.id
                  return (
                    <motion.div
                      layout
                      key={pos.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ 
                        y: -6, 
                        borderColor: 'var(--color-border-orange)', 
                        boxShadow: '0 0 25px var(--color-glow-orange-sm)' 
                      }}
                      className="card group flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[var(--color-surface-1)] shadow-neu-convex"
                      onClick={() => toggleAccordion(pos.id)}
                      data-cursor="hover"
                    >
                      {/* Banner Image Container */}
                      {pos.image ? (
                        <div className="w-full h-48 overflow-hidden relative bg-black/40 border-b border-[rgba(255,255,255,0.08)]">
                          <img 
                            src={pos.image} 
                            alt={pos.title} 
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-1)] via-transparent to-transparent opacity-90" />
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                            <span className="badge-orange shadow-md bg-black/40 border border-orange-500/30">{pos.department}</span>
                            <span className="badge-gray shadow-md bg-black/40">{pos.type}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="px-6 pt-6 flex justify-between items-start">
                          <span className="badge-orange">{pos.department}</span>
                          <span className="badge-gray">{pos.type}</span>
                        </div>
                      )}

                      <div className="p-6 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-display font-bold text-xl mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-orange)] transition-colors">
                            {pos.title}
                          </h3>

                          {/* Badges and Location */}
                          <div className="flex flex-col gap-2.5 font-body text-xs text-[var(--color-text-secondary)] mb-5">
                            <div className="flex items-center gap-2">
                              <FiMapPin className="text-[var(--color-orange)] flex-shrink-0" />
                              <span>{pos.location}</span>
                            </div>
                            
                            {Array.isArray(pos.experience) && pos.experience.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {pos.experience.map((exp, idx) => (
                                  <span key={idx} className="badge-gray text-[10px] py-0.5 px-2">
                                    {exp}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Skills */}
                          {Array.isArray(pos.skills) && pos.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {pos.skills.map((skill, idx) => (
                                <span key={idx} className="badge-orange text-[10px] py-0.5 px-2">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Expandable Accordion Area */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col gap-4">
                                  {Array.isArray(pos.responsibilities) && pos.responsibilities.length > 0 && (
                                    <div>
                                      <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-primary)] mb-2">
                                        Responsibilities
                                      </h4>
                                      <ul className="list-disc pl-4 flex flex-col gap-1 text-xs text-[var(--color-text-secondary)]">
                                        {pos.responsibilities.map((resp, idx) => (
                                          <li key={idx}>{resp}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  
                                  {Array.isArray(pos.requirements) && pos.requirements.length > 0 && (
                                    <div>
                                      <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-primary)] mb-2">
                                        Requirements
                                      </h4>
                                      <ul className="list-disc pl-4 flex flex-col gap-1 text-xs text-[var(--color-text-secondary)]">
                                        {pos.requirements.map((req, idx) => (
                                          <li key={idx}>{req}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  <Link
                                    to="/contact"
                                    onClick={(e) => e.stopPropagation()}
                                    className="btn-primary btn-sm w-full mt-4 text-center flex items-center justify-center"
                                    data-cursor="hover"
                                  >
                                    Apply for this Role
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Card Expand Indicator Arrow */}
                        <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-between items-center text-xs text-[var(--color-text-tertiary)] uppercase font-mono tracking-wider">
                          <span>Click to {isExpanded ? 'collapse' : 'expand'}</span>
                          {isExpanded ? <FiChevronUp className="text-[var(--color-orange)]" /> : <FiChevronDown />}
                        </div>
                      </div>

                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ── SECTION 3: WHY JOIN ADVMEN ── */}
        <section 
          ref={perksRef}
          className="w-full relative"
          style={{
            paddingTop: '6rem',
            paddingBottom: '6rem',
            background: 'var(--color-surface-0)',
          }}
          aria-label="Why Join ADVMEN"
        >
          <div className="container">
            
            {/* Section Title */}
            <div className="max-w-3xl flex flex-col gap-4 mb-16">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--color-orange)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]">
                  Our Culture
                </span>
              </div>
              <h2 className="text-[var(--text-display-sm)] font-display font-bold leading-tight">
                Why Join ADVMEN?
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                We believe in a work environment that inspires innovation, rewards outstanding contribution, and values creative freedom.
              </p>
            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {perks.map((perk, idx) => {
                const IconComponent = perk.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    whileHover={{ 
                      y: -6, 
                      borderColor: 'var(--color-border-orange)', 
                      boxShadow: '0 0 20px var(--color-glow-orange-sm)' 
                    }}
                    className="card p-6 flex flex-col gap-4 text-left transition-colors duration-300"
                    style={{
                      background: 'var(--color-surface-1)',
                      border: '1px solid rgba(255, 255, 255, 0.03)',
                      boxShadow: 'var(--shadow-neu-convex)',
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-glass-orange-8)] border border-[rgba(255,107,0,0.15)] text-[var(--color-orange)] text-xl shadow-neu-convex">
                      <IconComponent />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] mb-1">
                        {perk.title}
                      </h3>
                      <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        {perk.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

          </div>
        </section>



      </div>
    </PageTransition>
  )
}

export default Careers
