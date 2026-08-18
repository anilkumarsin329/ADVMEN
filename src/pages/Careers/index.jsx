/**
 * pages/Careers/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Careers Page (Dedicated Intern & Experienced Sections)
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  FiMapPin,
  FiBriefcase,
  FiZap,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiExternalLink,
  FiSend,
  FiMessageSquare,
  FiUpload
} from 'react-icons/fi'

import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/FyTxa7MaOOkC2qXelS2kzj?s=cl&p=a&mlu=4'

const defaultPositions = [
  { 
    id: '1', 
    title: 'MERN Stack Developer', 
    department: 'Engineering', 
    experience: ['Junior (1-3 yrs)', 'Senior (3+ yrs)'], 
    location: 'Gurugram / Remote', 
    type: 'Full-Time', 
    skills: ['MongoDB', 'Express', 'React', 'Node.js', 'REST APIs'], 
    responsibilities: ['Build scalable web apps', 'Write clean reusable code', 'Collaborate with design team', 'API integration'], 
    requirements: ['Strong JS fundamentals', 'Git proficiency', 'Problem solving skills'],
    salary: '₹6 - ₹12 LPA',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop&q=80',
    isActive: true,
  },
  { 
    id: '2', 
    title: 'Web & UI/UX Design Intern', 
    department: 'Design', 
    experience: ['Internship (0-6 mos)', 'Fresher (0-1 yr)'], 
    location: 'Gurugram / Hybrid', 
    type: 'Internship', 
    skills: ['Figma', 'Prototyping', 'UI Design', 'Wireframing'], 
    responsibilities: ['Assist in designing web layouts', 'Create UI components in Figma', 'Participate in design reviews'], 
    requirements: ['Basic Figma knowledge', 'Portfolio or design samples', 'Eagerness to learn'],
    salary: 'Stipend: ₹12,000 / month',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=675&fit=crop&q=80',
    isActive: true,
  },
  { 
    id: '3', 
    title: 'Frontend Development Intern', 
    department: 'Engineering', 
    experience: ['Internship (0-6 mos)', 'Fresher (0-1 yr)'], 
    location: 'Gurugram / Remote', 
    type: 'Internship', 
    skills: ['HTML', 'CSS', 'JavaScript', 'React Basics'], 
    responsibilities: ['Build responsive web pages', 'Fix frontend bugs', 'Work with React & Tailwind'], 
    requirements: ['Solid HTML/CSS/JS basics', 'Good problem solving skills', 'Personal projects'],
    salary: 'Stipend: ₹15,000 / month',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop&q=80',
    isActive: true,
  },
  { 
    id: '4', 
    title: 'UI/UX Designer (Senior)', 
    department: 'Design', 
    experience: ['Junior (1-3 yrs)', 'Senior (3+ yrs)'], 
    location: 'Gurugram / Hybrid', 
    type: 'Full-Time', 
    skills: ['Figma', 'Adobe XD', 'Motion Design', 'Design Systems'], 
    responsibilities: ['Design pixel-perfect UI', 'Create design systems', 'Motion mockups', 'User research'], 
    requirements: ['Strong Figma skills', 'Portfolio required', 'Eye for detail'],
    salary: '₹8 - ₹14 LPA',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=675&fit=crop&q=80',
    isActive: true,
  },
  { 
    id: '5', 
    title: 'Digital Marketing & Growth Intern', 
    department: 'Marketing', 
    experience: ['Internship (0-6 mos)', 'Fresher (0-1 yr)'], 
    location: 'Gurugram / Remote', 
    type: 'Internship', 
    skills: ['Social Media', 'Content Writing', 'SEO Basics', 'Canva'], 
    responsibilities: ['Create social posts', 'Assist in SEO optimization', 'Draft outreach emails'], 
    requirements: ['Good written communication', 'Active social media user', 'Creative mindset'],
    salary: 'Stipend: ₹10,000 / month',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&q=80',
    isActive: true,
  },
  { 
    id: '6', 
    title: 'Sales & Client Acquisition Executive', 
    department: 'Sales', 
    experience: ['Junior (1-3 yrs)', 'Senior (3+ yrs)'], 
    location: 'Gurugram', 
    type: 'Full-Time', 
    skills: ['B2B Sales', 'Client Acquisition', 'CRM', 'Negotiation'], 
    responsibilities: ['Generate leads', 'Client meetings', 'Close deals', 'Maintain CRM'], 
    requirements: ['Good communication', 'Target driven', 'Prior sales experience preferred'],
    salary: '₹5 - ₹10 LPA + Incentives',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=675&fit=crop&q=80',
    isActive: true,
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

const isInternRole = (pos) => {
  if (!pos) return false
  const typeLower = (pos.type || '').toLowerCase()
  const titleLower = (pos.title || '').toLowerCase()
  const expStr = Array.isArray(pos.experience) ? pos.experience.join(' ').toLowerCase() : ''

  return typeLower.includes('intern') || 
         titleLower.includes('intern') || 
         expStr.includes('intern') || 
         expStr.includes('fresher (0-1 yr)') ||
         expStr.includes('0-6 mos')
}

const Careers = () => {
  const containerRef = useRef(null)
  const positionsRef = useRef(null)
  const perksRef = useRef(null)

  const [selectedTab, setSelectedTab] = useState('All') // 'All', 'Intern', 'Experienced'
  const [selectedDept, setSelectedDept] = useState('All')
  const [expandedPosId, setExpandedPosId] = useState(null)
  const [positions, setPositions] = useState(defaultPositions)

  // Modals state
  const [viewModalJob, setViewModalJob] = useState(null)
  const [applyModalJob, setApplyModalJob] = useState(null)

  // Form State
  const [applicantForm, setApplicantForm] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    resume: '',
    experience: '',
    coverLetter: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formError, setFormError] = useState('')

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

  // Filter positions by Department & Tab
  const filteredPositions = positions.filter((pos) => {
    const matchesDept = selectedDept === 'All' || pos.department === selectedDept
    if (selectedTab === 'Intern') return matchesDept && isInternRole(pos)
    if (selectedTab === 'Experienced') return matchesDept && !isInternRole(pos)
    return matchesDept
  })

  // Separate array groups for dual section view
  const internPositions = filteredPositions.filter(isInternRole)
  const experiencedPositions = filteredPositions.filter(pos => !isInternRole(pos))

  const toggleAccordion = (id) => {
    setExpandedPosId((prev) => (prev === id ? null : id))
  }

  const [uploadingResume, setUploadingResume] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    if (type === 'resume') setUploadingResume(true)
    if (type === 'photo') setUploadingPhoto(true)
    setFormError('')

    try {
      const res = await fetch('http://localhost:5000/api/applications/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        if (type === 'resume') {
          setApplicantForm(prev => ({ ...prev, resume: data.url }))
        } else if (type === 'photo') {
          setApplicantForm(prev => ({ ...prev, profilePhoto: data.url }))
        }
      } else {
        setFormError(data.message || 'File upload failed')
      }
    } catch (err) {
      setFormError('File upload error: ' + err.message)
    } finally {
      if (type === 'resume') setUploadingResume(false)
      if (type === 'photo') setUploadingPhoto(false)
    }
  }

  // Open Apply Modal
  const openApplyModal = (job) => {
    setApplyModalJob(job)
    setViewModalJob(null)
    setSubmitSuccess(false)
    setFormError('')
    setApplicantForm({
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      resume: '',
      profilePhoto: '',
      experience: isInternRole(job) ? 'Fresher / Student (0-1 yr)' : 'Experienced (1-3+ yrs)',
      coverLetter: '',
    })
  }

  // Submit Application Handler
  const handleApplySubmit = async (e) => {
    e.preventDefault()
    if (!applicantForm.name || !applicantForm.email || !applicantForm.phone) {
      setFormError('Please fill in Name, Email, and Phone / WhatsApp number.')
      return
    }

    setSubmitting(true)
    setFormError('')

    const payload = {
      jobId: applyModalJob.id,
      jobTitle: applyModalJob.title,
      jobDepartment: applyModalJob.department,
      jobType: applyModalJob.type,
      ...applicantForm,
    }

    try {
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setSubmitSuccess(true)
      } else {
        const errData = await res.json()
        setFormError(errData.message || 'Failed to submit application. Please try again.')
      }
    } catch (err) {
      setFormError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Helper to safely resolve high-res image URLs
  const getDisplayImage = (pos) => {
    if (!pos) return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop&q=80'
    let img = pos.image || pos.imageUrl || ''
    if (img && typeof img === 'string') {
      if (img.startsWith('/uploads') || img.startsWith('/api/media')) {
        return `http://localhost:5000${img}`
      }
      if (img.startsWith('http://') || img.startsWith('https://')) {
        return img
      }
    }

    const deptImages = {
      'Design': 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=675&fit=crop&q=80',
      'Engineering': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop&q=80',
      'Marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&q=80',
      'Sales': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=675&fit=crop&q=80',
    }
    return deptImages[pos.department] || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop&q=80'
  }

  // Render Card Component
  const renderPositionCard = (pos) => {
    const isExpanded = expandedPosId === pos.id
    const isIntern = isInternRole(pos)
    const cardImage = getDisplayImage(pos)

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
          borderColor: 'rgba(255, 107, 0, 0.4)', 
          boxShadow: '0 10px 30px rgba(255, 107, 0, 0.15)' 
        }}
        className="group flex flex-col justify-between transition-all duration-300 relative overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[#12141a] p-4 shadow-xl"
        data-cursor="hover"
      >
        {/* Banner Image Container */}
        <Link 
          to={`/careers/${pos.id}`}
          className="w-full h-52 overflow-hidden relative rounded-2xl bg-[#1c1f2b] border border-[rgba(255,255,255,0.06)] cursor-pointer block"
        >
          <img 
            src={cardImage} 
            alt={pos.title} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
            onError={(e) => {
              e.target.onerror = null
              e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop&q=80'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-transparent to-transparent opacity-80" />
          
          {/* Floating Level Badge */}
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className={`shadow-lg px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 border ${
              isIntern 
                ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-amber-500/10' 
                : 'bg-blue-500/25 text-blue-300 border-blue-500/50 shadow-blue-500/10'
            }`}>
              {isIntern ? <><FiAward size={12} /> INTERNSHIP</> : <><FiBriefcase size={12} /> FULL-TIME</>}
            </span>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-4 pt-4 flex flex-col justify-between flex-1">
          <div>
            {/* Hashtag Department */}
            <span className="font-mono font-bold text-xs uppercase tracking-widest text-[#ff6b00] block mb-1">
              #{pos.department || 'TECH'}
            </span>

            {/* Job Title */}
            <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-[#ff6b00] transition-colors leading-tight cursor-pointer">
              <Link to={`/careers/${pos.id}`}>{pos.title}</Link>
            </h3>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-4">
              <FiMapPin className="text-[#ff6b00] flex-shrink-0" size={14} />
              <span>{pos.location || 'Gurugram / Remote'}</span>
            </div>

            {/* Skill / Experience Pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {Array.isArray(pos.experience) && pos.experience.map((exp, idx) => (
                <span key={`exp-${idx}`} className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                  {exp}
                </span>
              ))}
              {Array.isArray(pos.skills) && pos.skills.slice(0, 2).map((skill, idx) => (
                <span key={`skill-${idx}`} className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  {skill}
                </span>
              ))}
            </div>

            {/* Salary */}
            {pos.salary && (
              <div className="text-xs font-mono text-emerald-400 font-bold mb-4 flex items-center gap-1.5">
                <FiDollarSign className="text-emerald-400" size={14} />
                <span>{pos.salary}</span>
              </div>
            )}
          </div>

          {/* Action Buttons: VIEW DETAILS & APPLY NOW */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
            <Link
              to={`/careers/${pos.id}`}
              className="flex-1 py-2.5 px-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all text-center"
              data-cursor="hover"
            >
              View Details
            </Link>
            <button
              onClick={() => openApplyModal(pos)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md shadow-orange-600/20 text-center cursor-pointer"
              data-cursor="hover"
            >
              Apply Now
            </button>
          </div>
        </div>

      </motion.div>
    )
  }

  return (
    <PageTransition>
      <SEOHead
        title="Careers & Internships — ADVMEN Technologies"
        description="Join ADVMEN Technologies. View open internship and experienced full-time roles across engineering, design, and growth."
      />

      <div ref={containerRef} className="w-full bg-[var(--color-black)] min-h-screen text-[var(--color-text-primary)] font-body">
        
        {/* ── HERO SECTION ── */}
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
                  JOIN OUR TEAM
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
                Join a team of engineers, designers, and growth strategists building brands that dominate. We offer dedicated internship tracks and senior experienced engineering roles.
              </p>

              <div className="careers-stagger flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() => positionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="btn-primary"
                  data-cursor="hover"
                >
                  Explore Positions
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

        {/* ── POSITIONS SECTION ── */}
        <section 
          ref={positionsRef}
          className="w-full relative"
          style={{
            paddingTop: '5rem',
            paddingBottom: '6rem',
            background: 'var(--color-black)',
          }}
          aria-label="Open Positions"
        >
          <div className="container">
            
            {/* Header & Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 border-b border-[rgba(255,255,255,0.08)] pb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-px bg-[var(--color-orange)]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]">
                    Opportunities Registry
                  </span>
                </div>
                <h2 className="text-[var(--text-display-sm)] font-display font-bold leading-tight">
                  Available Openings
                </h2>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'All', label: 'All Opportunities', icon: FiZap },
                  { id: 'Intern', label: 'Internship & Entry-Level', icon: FiAward },
                  { id: 'Experienced', label: 'Experienced Roles', icon: FiBriefcase },
                ].map((tab) => {
                  const TabIcon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSelectedTab(tab.id)
                        setExpandedPosId(null)
                      }}
                      className="px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2"
                      style={{
                        background: selectedTab === tab.id ? 'var(--color-orange)' : 'var(--color-surface-1)',
                        color: selectedTab === tab.id ? '#ffffff' : 'var(--color-text-secondary)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: selectedTab === tab.id ? '0 0 20px var(--color-glow-orange-sm)' : 'none',
                      }}
                    >
                      <TabIcon size={14} className={tab.id === 'Intern' ? 'text-amber-400' : tab.id === 'Experienced' ? 'text-blue-400' : ''} />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Department Pills */}
            <div className="flex flex-wrap gap-2.5 mb-12">
              <span className="text-xs font-mono uppercase text-slate-400 self-center mr-2">Department:</span>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => {
                    setSelectedDept(dept)
                    setExpandedPosId(null)
                  }}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
                  style={{
                    background: selectedDept === dept ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: selectedDept === dept ? 'var(--color-orange)' : 'var(--color-text-secondary)',
                    border: selectedDept === dept ? '1px solid rgba(255, 107, 0, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* SECTION A: INTERNSHIP & ENTRY LEVEL */}
            {(selectedTab === 'All' || selectedTab === 'Intern') && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <FiAward size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Internship & Entry-Level Programs
                    </h3>
                    <p className="text-xs text-slate-400">
                      Designed for students, freshers (0-1 yr), and early-career developers & designers ready for live project exposure.
                    </p>
                  </div>
                </div>

                {internPositions.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 text-xs">
                    No internship openings currently listed for this department.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <AnimatePresence mode="popLayout">
                      {internPositions.map(renderPositionCard)}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}

            {/* SECTION B: EXPERIENCED ROLES */}
            {(selectedTab === 'All' || selectedTab === 'Experienced') && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <FiBriefcase size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Experienced & Senior Professional Roles
                    </h3>
                    <p className="text-xs text-slate-400">
                      For developers, designers, and growth managers with 1+ to 3+ years of experience leading projects.
                    </p>
                  </div>
                </div>

                {experiencedPositions.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 text-xs">
                    No experienced openings currently listed for this department.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <AnimatePresence mode="popLayout">
                      {experiencedPositions.map(renderPositionCard)}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}

          </div>
        </section>

        {/* ── WHY JOIN ADVMEN ── */}
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
            <div className="max-w-3xl flex flex-col gap-4 mb-16">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--color-orange)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]">
                  Our Culture & Perks
                </span>
              </div>
              <h2 className="text-[var(--text-display-sm)] font-display font-bold leading-tight">
                Why Join ADVMEN?
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {perks.map((perk, idx) => {
                const IconComponent = perk.icon
                return (
                  <div
                    key={idx}
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
                  </div>
                )
              })}
            </div>
          </div>
        </section>

      </div>

      {/* ── JOB DETAILS & APPLY MODALS ── */}
      {typeof document !== 'undefined' && createPortal(
        <>
          <AnimatePresence>
            {viewModalJob && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/40"
                onClick={() => setViewModalJob(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#161824] border border-slate-700/60 border-t-4 border-t-orange-500 rounded-[24px] p-6 sm:p-8 text-white relative shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <button 
                    onClick={() => setViewModalJob(null)}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  >
                    <FiX size={20} />
                  </button>

                  <span className="font-mono text-xs uppercase tracking-widest text-orange-500 font-bold block mb-2">
                    #{viewModalJob.department || 'TECH'}
                  </span>
                  <h2 className="text-3xl font-display font-bold mb-3 leading-tight text-white">{viewModalJob.title}</h2>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mb-6 bg-[#1e2230] p-3 rounded-xl border border-slate-700/50">
                    <span className="flex items-center gap-1.5 font-semibold"><FiMapPin className="text-orange-500" /> {viewModalJob.location}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">{viewModalJob.type}</span>
                    {viewModalJob.salary && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400 font-mono font-bold">{viewModalJob.salary}</span>
                      </>
                    )}
                  </div>

                  {/* Responsibilities */}
                  {Array.isArray(viewModalJob.responsibilities) && viewModalJob.responsibilities.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Key Responsibilities</h4>
                      <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300 leading-relaxed">
                        {viewModalJob.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Requirements */}
                  {Array.isArray(viewModalJob.requirements) && viewModalJob.requirements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Requirements & Qualifications</h4>
                      <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300 leading-relaxed">
                        {viewModalJob.requirements.map((req, i) => <li key={i}>{req}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Apply Button inside View Details Modal */}
                  <div className="pt-4 border-t border-slate-700/60 flex justify-end gap-3">
                    <button
                      onClick={() => openApplyModal(viewModalJob)}
                      className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-mono text-xs uppercase tracking-widest font-bold text-white shadow-lg transition-all text-center cursor-pointer"
                    >
                      Apply for this Position Now
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── APPLY NOW MODAL FORM & WHATSAPP SUCCESS SCREEN ── */}
          <AnimatePresence>
            {applyModalJob && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/40"
                onClick={() => setApplyModalJob(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg bg-[#161824] border border-slate-700/60 border-t-4 border-t-orange-500 rounded-[24px] p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <button 
                    onClick={() => setApplyModalJob(null)}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  >
                    <FiX size={20} />
                  </button>

                  {!submitSuccess ? (
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-orange-500 font-bold block mb-1">
                        Application Form
                      </span>
                      <h3 className="text-2xl font-bold font-display text-white mb-1">
                        Apply for {applyModalJob.title}
                      </h3>
                      <p className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
                        {isInternRole(applyModalJob) ? <span className="flex items-center gap-1 text-amber-400 font-bold"><FiAward size={12} /> Internship Track</span> : <span className="flex items-center gap-1 text-blue-400 font-bold"><FiBriefcase size={12} /> Experienced Track</span>} • {applyModalJob.department}
                      </p>

                      {formError && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
                          <FiAlertCircle size={16} />
                          <span>{formError}</span>
                        </div>
                      )}

                      <form onSubmit={handleApplySubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rahul Sharma"
                            value={applicantForm.name}
                            onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#1e2230] border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-all font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">Email Address *</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. rahul@gmail.com"
                              value={applicantForm.email}
                              onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-[#1e2230] border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-all font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">WhatsApp / Phone *</label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. +91 9876543210"
                              value={applicantForm.phone}
                              onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-[#1e2230] border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Profile Photo File Upload */}
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold flex items-center justify-between">
                              <span>Profile Photo</span>
                              {uploadingPhoto && <span className="text-[10px] text-orange-400 font-mono animate-pulse">Uploading...</span>}
                            </label>
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                id="photo-upload-main"
                                onChange={(e) => handleFileUpload(e, 'photo')}
                                className="hidden"
                              />
                              <label
                                htmlFor="photo-upload-main"
                                className="w-full px-4 py-3 rounded-xl bg-[#1e2230] border border-dashed border-slate-600 hover:border-orange-500 text-xs text-slate-300 flex items-center justify-between cursor-pointer transition-all"
                              >
                                <span className="truncate max-w-[170px] font-medium">
                                  {applicantForm.profilePhoto ? '✓ Photo Uploaded' : 'Choose Photo (JPG/PNG)'}
                                </span>
                                <FiUpload className="text-orange-400 flex-shrink-0" size={15} />
                              </label>
                            </div>
                          </div>

                          {/* Resume File Upload */}
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold flex items-center justify-between">
                              <span>Upload Resume *</span>
                              {uploadingResume && <span className="text-[10px] text-orange-400 font-mono animate-pulse">Uploading...</span>}
                            </label>
                            <div className="relative">
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                id="resume-upload-main"
                                onChange={(e) => handleFileUpload(e, 'resume')}
                                className="hidden"
                              />
                              <label
                                htmlFor="resume-upload-main"
                                className="w-full px-4 py-3 rounded-xl bg-[#1e2230] border border-dashed border-slate-600 hover:border-orange-500 text-xs text-slate-300 flex items-center justify-between cursor-pointer transition-all"
                              >
                                <span className="truncate max-w-[170px] font-medium">
                                  {applicantForm.resume ? '✓ Resume Uploaded' : 'Choose Resume (PDF/DOC)'}
                                </span>
                                <FiUpload className="text-orange-400 flex-shrink-0" size={15} />
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Portfolio / LinkedIn URL */}
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">Portfolio / LinkedIn Link</label>
                          <input
                            type="url"
                            placeholder="https://linkedin.com/in/... or https://github.com/..."
                            value={applicantForm.portfolio}
                            onChange={(e) => setApplicantForm({ ...applicantForm, portfolio: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#1e2230] border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-all font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">Experience / Status</label>
                          <input
                            type="text"
                            placeholder="e.g. Student / Fresher 2026 or 2 yrs Experience"
                            value={applicantForm.experience}
                            onChange={(e) => setApplicantForm({ ...applicantForm, experience: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#1e2230] border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-all font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">Cover Letter / Message</label>
                          <textarea
                            rows={3}
                            placeholder="Briefly tell us why you are interested in this role..."
                            value={applicantForm.coverLetter}
                            onChange={(e) => setApplicantForm({ ...applicantForm, coverLetter: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#1e2230] border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-all resize-none font-medium"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                        >
                          <FiSend size={14} />
                          <span>{submitting ? 'Submitting Application...' : 'Submit Application Now'}</span>
                        </button>
                      </form>
                    </div>
                  ) : (
                    /* SUCCESS CONFIRMATION & WHATSAPP GROUP LINK (SPECIAL FOR INTERNS) */
                    <div className="text-center py-4 space-y-6">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-lg border border-emerald-500/30">
                        <FiCheckCircle />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold font-display text-white mb-2">Application Submitted Successfully</h3>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                          Thank you, <strong className="text-white">{applicantForm.name}</strong>! Your application for <strong className="text-orange-400">{applyModalJob.title}</strong> has been received by our hiring team.
                        </p>
                      </div>

                      {/* WHATSAPP GROUP INTEGRATION FOR INTERNS */}
                      {isInternRole(applyModalJob) ? (
                        <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-left space-y-4 shadow-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl flex-shrink-0">
                              <FiMessageSquare />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-emerald-300">Join Official ADVMEN Interns WhatsApp Group</h4>
                              <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider block">Exclusive for Intern Candidates</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            Please join our official WhatsApp group for instant onboarding updates, task assignments, and direct communication with mentors:
                          </p>

                          <a
                            href={WHATSAPP_GROUP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-center cursor-pointer"
                          >
                            <FiExternalLink size={16} />
                            <span>Join Official WhatsApp Group Now</span>
                          </a>
                        </div>
                      ) : (
                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300">
                          Our HR team will review your application and contact you via email or phone shortly for the next interview rounds.
                        </div>
                      )}

                      <button
                        onClick={() => setApplyModalJob(null)}
                        className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all"
                      >
                        Close Window
                      </button>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}

    </PageTransition>
  )
}

export default Careers
