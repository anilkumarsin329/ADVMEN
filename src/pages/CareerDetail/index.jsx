/**
 * pages/CareerDetail/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Professional Job Detail Page
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMapPin, 
  FiBriefcase, 
  FiAward, 
  FiCheckCircle, 
  FiArrowLeft, 
  FiClock, 
  FiDollarSign, 
  FiShare2, 
  FiSend, 
  FiX, 
  FiAlertCircle, 
  FiExternalLink, 
  FiMessageSquare,
  FiChevronRight,
  FiZap,
  FiStar,
  FiTarget,
  FiUpload,
  FiFileText
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
    skills: ['MongoDB', 'Express', 'React', 'Node.js', 'REST APIs', 'TypeScript', 'Tailwind CSS'], 
    responsibilities: [
      'Architect, develop, and maintain high-performance MERN stack web applications.',
      'Write clean, modular, and reusable code following industry best practices.',
      'Collaborate closely with UI/UX designers, backend engineers, and project leads.',
      'Design and integrate RESTful APIs and microservices.',
      'Optimize database queries in MongoDB for maximum speed and scalability.'
    ], 
    requirements: [
      'Strong proficiency in JavaScript (ES6+), React.js, Node.js, and Express.',
      'Solid understanding of MongoDB database indexing and schema design.',
      'Proficiency with Git version control and GitHub workflows.',
      'Demonstrated problem-solving abilities and debugging skills.',
      'Prior experience with AWS or cloud deployments is a plus.'
    ],
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
    skills: ['Figma', 'Prototyping', 'UI Design', 'Wireframing', 'User Research'], 
    responsibilities: [
      'Assist in designing pixel-perfect web and mobile app interfaces in Figma.',
      'Create interactive prototypes, wireframes, and design components.',
      'Participate in design review sessions and iterate based on feedback.',
      'Build and update ADVMEN design system components.'
    ], 
    requirements: [
      'Basic to intermediate knowledge of Figma or Adobe XD.',
      'Strong visual design sense with attention to alignment, grid, and typography.',
      'Portfolio or design samples showcasing web/mobile concepts.',
      'Enthusiastic to learn modern design trends and user experiences.'
    ],
    salary: 'Stipend: ₹12,000 / month',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=675&fit=crop&q=80',
    isActive: true,
  },
  { 
    id: '3', 
    title: 'App Development Intern', 
    department: 'Engineering', 
    experience: ['Internship (0-6 mos)', 'Fresher (0-1 yr)'], 
    location: 'Jharsa Village, Sector 38, Gurugram / Remote', 
    type: 'Internship', 
    skills: ['React Native', 'Flutter', 'JavaScript', 'REST APIs', 'Firebase'], 
    responsibilities: [
      'Assist in developing cross-platform mobile applications for Android and iOS.',
      'Build responsive and user-friendly mobile user interfaces.',
      'Integrate REST APIs and third-party services in React Native or Flutter.',
      'Fix UI bugs, test mobile components, and optimize performance under senior guidance.'
    ], 
    requirements: [
      'Basic experience with React Native, Flutter, or mobile web development.',
      'Familiarity with JavaScript / Dart fundamentals.',
      'Understanding of API integration and Git version control.',
      'Eagerness to work on live client products.'
    ],
    salary: 'Project + Performance Incentives (Stipend: ₹15,000/mo)',
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
    skills: ['Figma', 'Adobe XD', 'Motion Design', 'Design Systems', 'Micro-Interactions'], 
    responsibilities: [
      'Lead end-to-end design strategy for high-impact web and app client products.',
      'Establish brand guidelines, design systems, and component libraries.',
      'Create high-fidelity interactive motion prototypes.',
      'Conduct user testing and convert complex workflows into intuitive UIs.'
    ], 
    requirements: [
      '3+ years of professional UI/UX design experience in an agency or product startup.',
      'Exceptional Figma portfolio demonstrating SaaS, mobile, or web products.',
      'Strong understanding of design tokens, responsive grids, and design handoff.'
    ],
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
    skills: ['Social Media', 'Content Writing', 'SEO Basics', 'Meta Ads', 'Canva'], 
    responsibilities: [
      'Create engaging social media content and creatives for ADVMEN & client accounts.',
      'Assist in SEO keyword research and blog content drafting.',
      'Monitor campaign metrics and prepare performance reports.'
    ], 
    requirements: [
      'Strong written communication skills in English.',
      'Active social media user with creative mindset.',
      'Basic familiarity with Canva or graphic design tools.'
    ],
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
    skills: ['B2B Sales', 'Client Acquisition', 'CRM', 'Negotiation', 'Lead Generation'], 
    responsibilities: [
      'Identify and acquire B2B clients for software, web, and branding solutions.',
      'Conduct discovery calls, present pitch decks, and close deals.',
      'Maintain pipeline metrics in CRM and nurture long-term client relationships.'
    ], 
    requirements: [
      '1+ years of B2B IT/Agency sales experience.',
      'Outstanding verbal and written negotiation skills.',
      'Self-motivated with proven track record of target achievement.'
    ],
    salary: '₹5 - ₹10 LPA + High Incentives',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=675&fit=crop&q=80',
    isActive: true,
  },
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

const CareerDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

  // Applicant Form State
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
    const fetchJobDetail = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:5000/api/careers/${id}`)
        if (res.ok) {
          const data = await res.json()
          if (data && (data._id || data.id)) {
            setJob({ ...data, id: data._id || data.id })
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('API error, falling back to local dataset:', err)
      }

      // Fallback search in defaultPositions
      const found = defaultPositions.find(p => p.id === String(id) || p.title.toLowerCase().replace(/\s+/g, '-') === String(id).toLowerCase())
      if (found) {
        setJob(found)
      } else {
        setJob(defaultPositions[0])
      }
      setLoading(false)
    }

    fetchJobDetail()
    window.scrollTo(0, 0)
  }, [id])

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

  const openApplyModal = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    setSubmitSuccess(false)
    setFormError('')
    setApplicantForm({
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      resume: '',
      profilePhoto: '',
      experience: job && isInternRole(job) ? 'Fresher / Student (0-1 yr)' : 'Experienced (1-3+ yrs)',
      coverLetter: '',
    })
    setIsApplyModalOpen(true)
  }

  const handleApplySubmit = async (e) => {
    e.preventDefault()
    if (!applicantForm.name || !applicantForm.email || !applicantForm.phone) {
      setFormError('Please fill in Name, Email, and Phone / WhatsApp number.')
      return
    }

    setSubmitting(true)
    setFormError('')

    const payload = {
      jobId: job.id,
      jobTitle: job.title,
      jobDepartment: job.department,
      jobType: job.type,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0b0e] flex items-center justify-center text-white">
        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0b0e] flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-2xl font-bold">Position Not Found</h2>
        <Link to="/careers" className="btn-primary">Back to Careers</Link>
      </div>
    )
  }

  const isIntern = isInternRole(job)

  return (
    <PageTransition>
      <SEOHead
        title={`${job.title} (${job.type}) — ADVMEN Careers`}
        description={`Apply for ${job.title} at ADVMEN Technologies. ${job.location}. ${job.salary || ''}`}
      />

      <div className="w-full bg-[#0d0e12] min-h-screen text-slate-100 font-sans pt-28 pb-20">
        
        {/* ── BREADCRUMB & HEADER SECTION ── */}
        <div className="border-b border-white/10 bg-[#11131a] py-10">
          <div className="container max-w-6xl">
            
            {/* Back Button */}
            <button
              onClick={() => navigate('/careers')}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-orange-500 transition-colors uppercase tracking-wider mb-6"
            >
              <FiArrowLeft size={16} />
              <span>Back to All Careers</span>
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-4">
              <Link to="/careers" className="hover:text-white">Careers</Link>
              <FiChevronRight size={12} />
              <span className="text-orange-500 font-bold">#{job.department.toUpperCase()}</span>
              <FiChevronRight size={12} />
              <span className="text-slate-200 truncate">{job.title}</span>
            </div>

            {/* Title & Key Specs Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-semibold text-slate-300">
                  <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                    isIntern ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  }`}>
                    {isIntern ? <FiAward size={14} /> : <FiBriefcase size={14} />}
                    {job.type || 'Full-Time'}
                  </span>

                  <span className="flex items-center gap-1.5 text-slate-300 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                    <FiMapPin size={14} className="text-orange-500" />
                    {job.location || 'Gurugram / Remote'}
                  </span>

                  {job.salary && (
                    <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                      <FiDollarSign size={14} className="text-emerald-400" />
                      <span>{job.salary}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Primary Apply Action Button */}
              <button
                onClick={openApplyModal}
                className="py-4 px-8 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-xl shadow-orange-600/25 transition-all self-start lg:self-auto flex items-center gap-2 cursor-pointer"
              >
                <FiSend size={16} />
                <span>Apply for Position</span>
              </button>
            </div>

          </div>
        </div>

        {/* ── MAIN CONTENT (2 COLUMNS) ── */}
        <div className="container max-w-6xl mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* LEFT COLUMN: MAIN ROLE SPECIFICATIONS */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Banner Image */}
              {job.image && (
                <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-black">
                  <img 
                    src={job.image.startsWith('/') ? `http://localhost:5000${job.image}` : job.image} 
                    alt={job.title} 
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop&q=80'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-transparent opacity-80" />
                </div>
              )}

              {/* Role Overview */}
              <div className="bg-[#14161f] p-8 rounded-3xl border border-white/10 shadow-xl space-y-4">
                <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                  <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                  About the Role
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  ADVMEN Technologies is looking for a passionate <strong className="text-white">{job.title}</strong> to join our high-growth team in Gurugram. In this role, you will work on live high-impact client products, collaborate directly with founders and senior engineers, and build cutting-edge web & mobile technology.
                </p>
              </div>

              {/* Key Responsibilities */}
              {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
                <div className="bg-[#14161f] p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                  <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                    Key Responsibilities
                  </h3>
                  <div className="space-y-3">
                    {job.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                        <FiCheckCircle className="text-emerald-400 mt-1 flex-shrink-0" size={16} />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements & Qualifications */}
              {Array.isArray(job.requirements) && job.requirements.length > 0 && (
                <div className="bg-[#14161f] p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                  <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                    Requirements & Qualifications
                  </h3>
                  <div className="space-y-3">
                    {job.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack & Required Skills */}
              {Array.isArray(job.skills) && job.skills.length > 0 && (
                <div className="bg-[#14161f] p-8 rounded-3xl border border-white/10 shadow-xl space-y-4">
                  <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                    Required Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {job.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-orange-500/10 border border-orange-500/30 text-orange-400 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* What You Get / Perks */}
              <div className="bg-[#14161f] p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                  <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                  Why Work With ADVMEN?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <FiZap className="text-orange-500" size={16} />
                      <span>Live Client Exposure</span>
                    </div>
                    <p className="text-slate-400">Work directly on real-world production codebases and client deliverables.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <FiStar className="text-amber-400" size={16} />
                      <span>Mentorship & Guidance</span>
                    </div>
                    <p className="text-slate-400">Learn from seasoned senior full-stack developers and design leads.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <FiAward className="text-emerald-400" size={16} />
                      <span>Offer Letter & Certificate</span>
                    </div>
                    <p className="text-slate-400">Official completion certificates, letter of recommendation & PPO opportunities.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <FiTarget className="text-blue-400" size={16} />
                      <span>Competitive Incentives</span>
                    </div>
                    <p className="text-slate-400">Performance bonuses, monthly stipends, and growth incentives.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: SIDEBAR SUMMARY CARD */}
            <div className="space-y-6">
              
              {/* Sticky Summary Card */}
              <div className="bg-[#14161f] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl sticky top-32 space-y-6">
                <h3 className="font-display font-bold text-lg text-white border-b border-white/10 pb-4">
                  Job Overview
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="font-mono text-slate-400 uppercase text-[10px] block font-bold">Department</span>
                    <span className="font-bold text-white text-sm">{job.department}</span>
                  </div>

                  <div>
                    <span className="font-mono text-slate-400 uppercase text-[10px] block font-bold">Role Level / Track</span>
                    <span className="font-bold text-amber-400 text-sm">{job.type} ({isIntern ? 'Entry-Level' : 'Experienced'})</span>
                  </div>

                  <div>
                    <span className="font-mono text-slate-400 uppercase text-[10px] block font-bold">Location</span>
                    <span className="font-bold text-white text-sm">{job.location}</span>
                  </div>

                  <div>
                    <span className="font-mono text-slate-400 uppercase text-[10px] block font-bold">Salary Package / Stipend</span>
                    <span className="font-bold text-emerald-400 font-mono text-sm">{job.salary || 'Best in Industry'}</span>
                  </div>

                  <div>
                    <span className="font-mono text-slate-400 uppercase text-[10px] block font-bold">Experience Range</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Array.isArray(job.experience) && job.experience.map((exp, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-300 font-mono">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <button
                    onClick={openApplyModal}
                    className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs uppercase tracking-widest font-bold shadow-lg shadow-orange-600/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiSend size={14} />
                    <span>Apply for this Role</span>
                  </button>

                  {isIntern && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 leading-tight">
                      <FiMessageSquare size={13} className="inline text-emerald-400 mr-1" /> <strong>Intern Candidate Note:</strong> Submitting application will provide instant access to our Official WhatsApp Group!
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* ── APPLY NOW MODAL FORM & WHATSAPP SUCCESS SCREEN ── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isApplyModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/40"
              onClick={() => setIsApplyModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-[#161824] border border-slate-700/60 border-t-4 border-t-orange-500 rounded-[24px] p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <button 
                  onClick={() => setIsApplyModalOpen(false)}
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
                      Apply for {job.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
                      {isInternRole(job) ? <span className="inline-flex items-center gap-1 text-amber-400 font-bold"><FiAward size={12} /> Internship Track</span> : <span className="inline-flex items-center gap-1 text-blue-400 font-bold"><FiBriefcase size={12} /> Experienced Track</span>} • {job.department}
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
                              id="photo-upload-detail"
                              onChange={(e) => handleFileUpload(e, 'photo')}
                              className="hidden"
                            />
                            <label
                              htmlFor="photo-upload-detail"
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
                              id="resume-upload-detail"
                              onChange={(e) => handleFileUpload(e, 'resume')}
                              className="hidden"
                            />
                            <label
                              htmlFor="resume-upload-detail"
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
                        Thank you, <strong className="text-white">{applicantForm.name}</strong>! Your application for <strong className="text-orange-400">{job.title}</strong> has been received by our hiring team.
                      </p>
                    </div>

                    {/* WHATSAPP GROUP INTEGRATION FOR INTERNS */}
                    {isInternRole(job) ? (
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
                      onClick={() => setIsApplyModalOpen(false)}
                      className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </PageTransition>
  )
}

export default CareerDetail
