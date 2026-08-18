/**
 * admin/components/AdminHeader.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Header Component
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const AdminHeader = ({ toggleSidebar, isCollapsed, toggleCollapse }) => {
  const { user, logout } = useAdminAuth()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard':
        return 'Overview'
      case '/admin/catalog':
        return 'Catalog'
      case '/admin/services':
        return 'Service'
      case '/admin/portfolio':
        return 'Work'
      case '/admin/careers':
        return 'Careers'
      case '/admin/blog':
        return 'Blog'
      case '/admin/contacts':
        return 'Contact'
      case '/admin/settings':
        return 'Site Settings'
      case '/admin/profile':
        return 'Profile'
      case '/admin/help':
        return 'Help'
      default:
        return 'Overview'
    }
  }

  const getInitials = (name) => {
    if (!name) return 'AD'
    const parts = name.trim().split(/\s+/)
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const adminName = user?.name || 'Super Admin'
  const adminEmail = user?.email || 'superadmin@gmail.com'

  return (
    <header 
      className="sticky top-0 z-20 w-full h-[70px] flex items-center justify-between px-6 sm:px-8 border-b"
      style={{
        background: 'var(--admin-card-bg)',
        borderColor: 'var(--admin-border)',
        boxShadow: 'var(--admin-shadow-sm)',
      }}
      role="banner"
    >
      {/* Left side: Mobile Trigger + Desktop Collapse Trigger + Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg bg-transparent border text-[var(--admin-text-secondary)] hover:text-[var(--color-orange)] transition-colors cursor-pointer"
          style={{ borderColor: 'var(--admin-border)' }}
          data-cursor="hover"
          aria-label="Open mobile navigation drawer"
        >
          <FiMenu size={20} />
        </button>

        {/* Desktop Sidebar Collapse Trigger */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-2 rounded-lg bg-transparent border text-[var(--admin-text-secondary)] hover:text-[var(--color-orange)] transition-colors cursor-pointer"
          style={{ borderColor: 'var(--admin-border)' }}
          data-cursor="hover"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FiMenu size={20} />
        </button>

        <h1 
          className="font-display font-extrabold text-base sm:text-lg uppercase tracking-wider leading-none"
          style={{ color: 'var(--admin-text-primary)' }}
        >
          {getPageTitle()}
        </h1>
      </div>

      {/* Right side: Clickable Admin Dropdown (email/avatar) */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 focus:outline-none cursor-pointer group text-left"
          data-cursor="hover"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <div className="hidden sm:flex flex-col text-right">
            <span 
              className="font-body text-xs font-bold leading-tight group-hover:text-[var(--color-orange)] transition-colors"
              style={{ color: 'var(--admin-text-primary)' }}
            >
              {adminEmail}
            </span>
            <span 
              className="font-mono text-[9px] uppercase tracking-wider leading-tight mt-0.5"
              style={{ color: 'var(--admin-text-tertiary)' }}
            >
              {adminName}
            </span>
          </div>

          {/* Initials Avatar Badge */}
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-xs group-hover:border-[var(--color-orange)] transition-colors"
            style={{
              background: 'rgba(255, 107, 0, 0.08)',
              border: '1px solid rgba(255, 107, 0, 0.25)',
              color: 'var(--color-orange)',
              boxShadow: 'var(--admin-shadow-sm)',
            }}
          >
            {getInitials(adminName)}
          </div>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {dropdownOpen && (
            <>
              {/* Invisible backdrop to dismiss when clicking outside */}
              <div 
                className="fixed inset-0 z-30 bg-transparent cursor-default"
                onClick={() => setDropdownOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 mt-2.5 w-48 z-40 p-2"
                style={{
                  background: 'var(--admin-card-bg)',
                  border: '1px solid var(--admin-border)',
                  boxShadow: 'var(--admin-shadow-md)',
                  borderRadius: '16px',
                }}
              >
                {/* Header User info summary */}
                <div className="px-3 py-2 flex flex-col gap-0.5 border-b mb-1.5" style={{ borderColor: 'var(--admin-border)' }}>
                  <span className="font-body font-bold text-[10px] text-[var(--admin-text-primary)] truncate">
                    {adminName}
                  </span>
                  <span className="font-mono text-[8px] text-[var(--admin-text-tertiary)] truncate">
                    {adminEmail}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    setDropdownOpen(false)
                    logout()
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-body text-xs font-bold uppercase tracking-wider text-[var(--admin-text-secondary)] hover:text-[var(--color-orange)] hover:bg-[rgba(255,107,0,0.06)] transition-all cursor-pointer"
                  data-cursor="hover"
                >
                  <FiLogOut size={14} className="shrink-0" />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

    </header>
  )
}

export default AdminHeader
