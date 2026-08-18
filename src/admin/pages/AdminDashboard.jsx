/**
 * admin/pages/AdminDashboard.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Dashboard Overview Page (Live Real-Time Data)
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiMail, 
  FiBriefcase, 
  FiFileText, 
  FiLayers, 
  FiArrowRight, 
  FiGrid, 
  FiRefreshCw,
  FiUsers,
  FiAward
} from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import { API_BASE_URL } from '@utils/constants'

const AdminDashboard = () => {
  const { token } = useAdminAuth()

  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    contactsCount: 0,
    applicationsCount: 0,
    careersCount: 0,
    blogsCount: 0,
    portfolioCount: 0,
    servicesCount: 0,
  })

  const [recentContacts, setRecentContacts] = useState([])
  const [recentApplications, setRecentApplications] = useState([])
  const [recentCareers, setRecentCareers] = useState([])

  const fetchDashboardRealData = async () => {
    setLoading(true)
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {}

    try {
      // 1. Fetch Contact Inquiries
      const contactsRes = await fetch(`${API_BASE_URL}/api/contact`, { headers })
      if (contactsRes.ok) {
        const result = await contactsRes.json()
        const data = result.data || result
        if (Array.isArray(data)) {
          setStats((prev) => ({ ...prev, contactsCount: data.length }))
          setRecentContacts(data.slice(0, 5))
        }
      }
    } catch (err) {
      console.warn('Contacts fetch error:', err)
    }

    try {
      // 2. Fetch Job Applications (REAL LIVE DATA)
      const appsRes = await fetch(`${API_BASE_URL}/api/applications`, { headers })
      if (appsRes.ok) {
        const result = await appsRes.json()
        const data = result.data || result
        if (Array.isArray(data)) {
          setStats((prev) => ({ ...prev, applicationsCount: data.length }))
          setRecentApplications(data.slice(0, 5))
        }
      }
    } catch (err) {
      console.warn('Applications fetch error:', err)
    }

    try {
      // 3. Fetch Job Openings (Careers)
      const careersRes = await fetch(`${API_BASE_URL}/api/careers/all`, { headers })
      if (careersRes.ok) {
        const data = await careersRes.json()
        if (Array.isArray(data)) {
          setStats((prev) => ({ ...prev, careersCount: data.length }))
          setRecentCareers(data.slice(0, 5))
        }
      }
    } catch (err) {
      console.warn('Careers fetch error:', err)
    }

    try {
      // 4. Fetch Blog Articles
      const blogsRes = await fetch(`${API_BASE_URL}/api/blog/all`, { headers })
      if (blogsRes.ok) {
        const data = await blogsRes.json()
        if (Array.isArray(data)) {
          setStats((prev) => ({ ...prev, blogsCount: data.length }))
        }
      }
    } catch (err) {
      console.warn('Blogs fetch error:', err)
    }

    try {
      // 5. Fetch Portfolio Projects
      const portfolioRes = await fetch(`${API_BASE_URL}/api/portfolio/all`, { headers })
      if (portfolioRes.ok) {
        const data = await portfolioRes.json()
        if (Array.isArray(data)) {
          setStats((prev) => ({ ...prev, portfolioCount: data.length }))
        }
      }
    } catch (err) {
      console.warn('Portfolio fetch error:', err)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchDashboardRealData()
  }, [token])

  const getFormattedDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    return new Date().toLocaleDateString('en-US', options)
  }

  const statCardsData = [
    { 
      id: 'contacts', 
      label: 'Contact Messages', 
      subLabel: 'real-time inquiries', 
      count: stats.contactsCount, 
      icon: FiMail,
      path: '/admin/contacts',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    { 
      id: 'applications', 
      label: 'Job Applicants', 
      subLabel: 'interns & full-time', 
      count: stats.applicationsCount, 
      icon: FiUsers,
      path: '/admin/applications',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    { 
      id: 'careers', 
      label: 'Career Listings', 
      subLabel: 'job openings active', 
      count: stats.careersCount, 
      icon: FiBriefcase,
      path: '/admin/careers',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    { 
      id: 'blogs', 
      label: 'Blog Articles', 
      subLabel: 'editorial posts', 
      count: stats.blogsCount, 
      icon: FiFileText,
      path: '/admin/blog',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ]

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 font-sans">
      
      {/* HEADER OVERVIEW BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <FiGrid size={24} />
            </span>
            System Overview
          </h2>
          <span className="text-xs font-semibold text-slate-500 mt-1 block">
            {getFormattedDate()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardRealData}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all shadow-sm flex items-center gap-2 text-xs font-bold"
            title="Refresh Real-Time Data"
          >
            <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Live Data</span>
          </button>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Database Synchronized</span>
          </div>
        </div>
      </div>

      {/* STATS ROW (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCardsData.map((card, idx) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <Link 
                to={card.path}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between block group"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-xl ${card.bgColor} ${card.textColor} flex items-center justify-center text-xl shadow-sm`}>
                    <Icon />
                  </div>
                  <FiArrowRight className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" size={18} />
                </div>

                <div className="mt-5">
                  <span className="font-bold text-3xl text-slate-900 block leading-tight tracking-tight">
                    {loading ? '...' : card.count}
                  </span>
                  <span className="font-bold text-xs text-slate-700 block mt-1">
                    {card.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mt-0.5">
                    {card.subLabel}
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* RECENT ACTIVITY TABLES (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Job Applicants (REAL DATA) */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <FiUsers size={18} className="text-emerald-500" />
                Recent Candidate Applications
              </h3>
              <Link to="/admin/applications" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View All <FiArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : recentApplications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                <FiUsers size={32} className="mb-2 text-slate-300" />
                <p className="text-xs font-semibold text-slate-500">No applications received yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 pl-1 w-10 text-center">#</th>
                      <th className="pb-3">Candidate</th>
                      <th className="pb-3">Applied Position</th>
                      <th className="pb-3 text-right pr-1">Track</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentApplications.map((app, index) => {
                      const isIntern = (app.jobType || '').toLowerCase().includes('intern')
                      return (
                        <tr key={app._id || app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 pl-1 text-center font-mono font-bold text-slate-400 text-xs">
                            {index + 1}
                          </td>
                          <td className="py-3">
                            <div className="font-bold text-slate-800 text-xs">{app.name}</div>
                            <div className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">{app.email}</div>
                          </td>
                          <td className="py-3">
                            <div className="font-semibold text-slate-700 text-xs truncate max-w-[160px]">{app.jobTitle}</div>
                            <div className="text-[10px] text-slate-400 font-medium">{app.phone}</div>
                          </td>
                          <td className="py-3 text-right pr-1">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isIntern ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                            }`}>
                              {isIntern ? <FiAward size={10} /> : <FiBriefcase size={10} />}
                              {app.jobType || 'Full-Time'}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact Messages (REAL DATA) */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <FiMail size={18} className="text-orange-500" />
                Recent Contact Messages
              </h3>
              <Link to="/admin/contacts" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                View All <FiArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : recentContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                <FiMail size={32} className="mb-2 text-slate-300" />
                <p className="text-xs font-semibold text-slate-500">No contact messages received yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 pl-1">Client</th>
                      <th className="pb-3">Subject / Industry</th>
                      <th className="pb-3 text-right pr-1">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentContacts.map((contact) => (
                      <tr key={contact._id || contact.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 pl-1">
                          <div className="font-bold text-slate-800 text-xs">{contact.name}</div>
                          <div className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">{contact.email}</div>
                        </td>
                        <td className="py-3">
                          <div className="font-semibold text-slate-700 text-xs truncate max-w-[160px]">{contact.subject || 'General Inquiry'}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{contact.industry || contact.budget || 'Inquiry'}</div>
                        </td>
                        <td className="py-3 text-right pr-1">
                          {contact.status === 'New' || !contact.status ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              New
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                              {contact.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  )
}

export default AdminDashboard
