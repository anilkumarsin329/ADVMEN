/**
 * admin/pages/AdminDashboard.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Dashboard Overview Page
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiBriefcase, FiFileText, FiLayers } from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'

const AdminDashboard = () => {
  const { token } = useAdminAuth()

  const [stats, setStats] = useState({
    contacts: 48,
    careers: 14,
    blogs: 18,
    portfolio: 12,
  })
  const [recentContacts, setRecentContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', date: 'Aug 16, 2026' },
    { id: 2, name: 'Alice Smith', email: 'alice@example.com', date: 'Aug 15, 2026' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', date: 'Aug 14, 2026' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', date: 'Aug 12, 2026' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', date: 'Aug 10, 2026' },
  ])
  const [recentCareers, setRecentCareers] = useState([
    { id: 1, name: 'John Doe', role: 'MERN Stack Developer', date: 'Aug 17, 2026' },
    { id: 2, name: 'Sarah Connor', role: 'UI/UX Designer', date: 'Aug 16, 2026' },
    { id: 3, name: 'David Miller', role: 'Full App Developer', date: 'Aug 15, 2026' },
    { id: 4, name: 'Jessica Taylor', role: 'Digital Marketing Specialist', date: 'Aug 13, 2026' },
    { id: 5, name: 'James Wilson', role: 'Sales Executive', date: 'Aug 11, 2026' },
  ])

  useEffect(() => {
    if (token === 'mock_advmen_admin_token_xyz123') {
      return
    }

    const fetchDashboardData = async () => {
      const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {}

      try {
        // Fetch Contacts
        const contactsRes = await fetch('http://localhost:5000/api/admin/contacts', { headers: authHeader })
        if (contactsRes.ok) {
          const contactsData = await contactsRes.json()
          setStats((prev) => ({ ...prev, contacts: contactsData.length || prev.contacts }))
          if (Array.isArray(contactsData) && contactsData.length > 0) {
            setRecentContacts(
              contactsData.slice(0, 5).map((c, i) => ({
                id: c._id || i,
                name: c.name,
                email: c.email,
                date: new Date(c.createdAt || c.date || Date.now()).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }),
              }))
            )
          }
        }
      } catch (err) {
        console.warn('Could not fetch contacts stats:', err)
      }

      try {
        // Fetch Careers
        const careersRes = await fetch('http://localhost:5000/api/admin/careers', { headers: authHeader })
        if (careersRes.ok) {
          const careersData = await careersRes.json()
          setStats((prev) => ({ ...prev, careers: careersData.length || prev.careers }))
          if (Array.isArray(careersData) && careersData.length > 0) {
            setRecentCareers(
              careersData.slice(0, 5).map((c, i) => ({
                id: c._id || i,
                name: c.name,
                role: c.role || c.position || 'Applicant',
                date: new Date(c.createdAt || c.date || Date.now()).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }),
              }))
            )
          }
        }
      } catch (err) {
        console.warn('Could not fetch careers stats:', err)
      }

      // Try fetching generic blogs & portfolio counts if available
      try {
        const blogsRes = await fetch('http://localhost:5000/api/blog')
        if (blogsRes.ok) {
          const blogsData = await blogsRes.json()
          setStats((prev) => ({ ...prev, blogs: blogsData.length || prev.blogs }))
        }
      } catch (err) {
        console.warn('Could not fetch blog posts stats:', err)
      }

      try {
        const portfolioRes = await fetch('http://localhost:5000/api/portfolio')
        if (portfolioRes.ok) {
          const portfolioData = await portfolioRes.json()
          setStats((prev) => ({ ...prev, portfolio: portfolioData.length || prev.portfolio }))
        }
      } catch (err) {
        console.warn('Could not fetch portfolio stats:', err)
      }
    }

    fetchDashboardData()
  }, [token])

  const getFormattedDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    return new Date().toLocaleDateString('en-US', options)
  }

  const statCardsData = [
    { 
      id: 'contacts', 
      label: 'Total Contacts', 
      subLabel: 'messages received', 
      count: stats.contacts, 
      icon: FiMail 
    },
    { 
      id: 'careers', 
      label: 'Job Applications', 
      subLabel: 'candidates applied', 
      count: stats.careers, 
      icon: FiBriefcase 
    },
    { 
      id: 'blogs', 
      label: 'Blog Posts', 
      subLabel: 'articles published', 
      count: stats.blogs, 
      icon: FiFileText 
    },
    { 
      id: 'portfolio', 
      label: 'Portfolio Projects', 
      subLabel: 'projects showcased', 
      count: stats.portfolio, 
      icon: FiLayers 
    },
  ]

  return (
    <div className="w-full flex flex-col gap-8 text-[var(--admin-text-primary)]">
      
      {/* ── HEADER OVERVIEW BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 
            className="text-2xl font-bold font-display leading-tight uppercase tracking-wider"
            style={{ color: 'var(--admin-text-primary)' }}
          >
            Overview
          </h2>
          <span 
            className="font-mono text-xs mt-1.5 block uppercase tracking-wider"
            style={{ color: 'var(--admin-text-secondary)' }}
          >
            {getFormattedDate()}
          </span>
        </div>

        {/* Sync Badge */}
        <div 
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider"
          style={{
            background: '#e6f7ed',
            border: '1px solid rgba(17, 122, 58, 0.12)',
            boxShadow: 'var(--admin-shadow-sm)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span style={{ color: '#117a3a' }}>
            System Live and Synchronized
          </span>
        </div>
      </div>

      {/* ── STATS ROW (4 Cards) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {statCardsData.map((card, idx) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 flex flex-col justify-between"
              style={{
                background: 'var(--admin-card-bg)',
                border: '1px solid var(--admin-border)',
                boxShadow: 'var(--admin-shadow-md)',
                borderRadius: '24px',
                minHeight: '190px',
              }}
            >
              {/* Icon container */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center border text-lg self-start"
                style={{
                  background: 'rgba(255, 107, 0, 0.06)',
                  borderColor: 'rgba(255, 107, 0, 0.18)',
                  color: 'var(--color-orange)',
                  boxShadow: 'var(--admin-shadow-sm)',
                }}
              >
                <Icon />
              </div>

              {/* Counts and details */}
              <div className="mt-4">
                <span 
                  className="font-display font-extrabold text-3xl block leading-tight tracking-tight"
                  style={{ color: 'var(--admin-text-primary)' }}
                >
                  {card.count}
                </span>
                <span 
                  className="font-body font-bold text-xs block mt-1.5"
                  style={{ color: 'var(--admin-text-primary)' }}
                >
                  {card.label}
                </span>
                <span 
                  className="font-mono text-[9px] uppercase tracking-wider block mt-0.5"
                  style={{ color: 'var(--admin-text-tertiary)' }}
                >
                  {card.subLabel}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── RECENT ACTIVITY TABLES (2 Columns) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        
        {/* Recent Contact Submissions */}
        <div 
          className="p-6 sm:p-8 flex flex-col relative overflow-hidden"
          style={{
            background: 'var(--admin-card-bg)',
            border: '1px solid var(--admin-border)',
            boxShadow: 'var(--admin-shadow-md)',
            borderRadius: '24px',
            minHeight: '380px',
          }}
        >
          <h3 
            className="font-display font-bold text-sm uppercase tracking-wider mb-6"
            style={{ color: 'var(--admin-text-primary)' }}
          >
            Recent Contact Messages
          </h3>

          {/* Table content (blurred by overlay) */}
          <div className="flex-1 w-full overflow-x-auto select-none opacity-20 pointer-events-none">
            <table className="w-full text-left font-body text-xs">
              <thead>
                <tr 
                  className="border-b font-mono uppercase tracking-wider"
                  style={{ 
                    borderColor: 'var(--admin-border)',
                    color: 'var(--admin-text-tertiary)' 
                  }}
                >
                  <th className="pb-3.5 pl-2">Name</th>
                  <th className="pb-3.5">Email</th>
                  <th className="pb-3.5 pr-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody 
                className="divide-y"
                style={{ divideColor: 'var(--admin-border)' }}
              >
                {recentContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td 
                      className="py-3.5 pl-2 font-semibold"
                      style={{ color: 'var(--admin-text-primary)' }}
                    >
                      {contact.name}
                    </td>
                    <td 
                      className="py-3.5"
                      style={{ color: 'var(--admin-text-secondary)' }}
                    >
                      {contact.email}
                    </td>
                    <td 
                      className="py-3.5 pr-2 text-right font-mono text-[10px]"
                      style={{ color: 'var(--admin-text-tertiary)' }}
                    >
                      {contact.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* "Coming Soon" Centered Overlay */}
          <div 
            className="absolute inset-0 bg-[rgba(255,255,255,0.7)] backdrop-blur-[2px] flex flex-col items-center justify-center z-10 p-6 text-center"
          >
            <span className="badge-orange font-mono tracking-widest text-[10px] py-1.5 px-4 mb-3 shadow-[0_0_10px_rgba(255,107,0,0.15)]">
              COMING SOON
            </span>
            <p 
              className="font-body text-xs max-w-[280px] leading-relaxed"
              style={{ color: 'var(--admin-text-secondary)' }}
            >
              Integrations for reviewing direct contact inquiries are in development.
            </p>
          </div>
        </div>

        {/* Recent Job Applications */}
        <div 
          className="p-6 sm:p-8 flex flex-col relative overflow-hidden"
          style={{
            background: 'var(--admin-card-bg)',
            border: '1px solid var(--admin-border)',
            boxShadow: 'var(--admin-shadow-md)',
            borderRadius: '24px',
            minHeight: '380px',
          }}
        >
          <h3 
            className="font-display font-bold text-sm uppercase tracking-wider mb-6"
            style={{ color: 'var(--admin-text-primary)' }}
          >
            Recent Job Applications
          </h3>

          {/* Table content (blurred by overlay) */}
          <div className="flex-1 w-full overflow-x-auto select-none opacity-20 pointer-events-none">
            <table className="w-full text-left font-body text-xs">
              <thead>
                <tr 
                  className="border-b font-mono uppercase tracking-wider"
                  style={{ 
                    borderColor: 'var(--admin-border)',
                    color: 'var(--admin-text-tertiary)' 
                  }}
                >
                  <th className="pb-3.5 pl-2">Name</th>
                  <th className="pb-3.5">Role</th>
                  <th className="pb-3.5 pr-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody 
                className="divide-y animate-none"
                style={{ divideColor: 'var(--admin-border)' }}
              >
                {recentCareers.map((career) => (
                  <tr key={career.id}>
                    <td 
                      className="py-3.5 pl-2 font-semibold"
                      style={{ color: 'var(--admin-text-primary)' }}
                    >
                      {career.name}
                    </td>
                    <td 
                      className="py-3.5"
                      style={{ color: 'var(--admin-text-secondary)' }}
                    >
                      {career.role}
                    </td>
                    <td 
                      className="py-3.5 pr-2 text-right font-mono text-[10px]"
                      style={{ color: 'var(--admin-text-tertiary)' }}
                    >
                      {career.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* "Coming Soon" Centered Overlay */}
          <div 
            className="absolute inset-0 bg-[rgba(255,255,255,0.7)] backdrop-blur-[2px] flex flex-col items-center justify-center z-10 p-6 text-center"
          >
            <span className="badge-orange font-mono tracking-widest text-[10px] py-1.5 px-4 mb-3 shadow-[0_0_10px_rgba(255,107,0,0.15)]">
              COMING SOON
            </span>
            <p 
              className="font-body text-xs max-w-[280px] leading-relaxed"
              style={{ color: 'var(--admin-text-secondary)' }}
            >
              Integrations for reviewing job applications are in development.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AdminDashboard
