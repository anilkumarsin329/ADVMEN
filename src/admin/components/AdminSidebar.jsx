/**
 * admin/components/AdminSidebar.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Sidebar Component
 * ─────────────────────────────────────────────────────────────
 */

import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiGrid, 
  FiMail, 
  FiFileText, 
  FiLayers, 
  FiSettings, 
  FiX,
  FiChevronRight,
  FiUser,
  FiHelpCircle,
  FiBookOpen,
  FiBriefcase
} from 'react-icons/fi'

const navigationItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: FiGrid },
  { label: 'Catalog',   href: '/admin/catalog',   icon: FiBookOpen },
  { label: 'Service',   href: '/admin/services',  icon: FiSettings },
  { label: 'Work',      href: '/admin/portfolio', icon: FiLayers },
  { label: 'Careers',   href: '/admin/careers',   icon: FiBriefcase },
  { label: 'Blog',      href: '/admin/blog',      icon: FiFileText },
  { label: 'Contact',   href: '/admin/contacts',  icon: FiMail },
]

const bottomNavigationItems = [
  { label: 'Profile',  href: '/admin/profile',  icon: FiUser },
  { label: 'Settings', href: '/admin/settings', icon: FiSettings },
  { label: 'Help',     href: '/admin/help',     icon: FiHelpCircle },
]

const AdminSidebarContent = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div 
      className={`h-full flex flex-col justify-between py-6 transition-all duration-300 ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}
      style={{
        background: 'var(--color-surface-1)',
        borderRight: '1px solid rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Top Section — Logo & Nav Links */}
      <div className="flex flex-col gap-8">
        
        {/* Logo and Mobile Close Button */}
        <div className={`flex items-center px-2 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <img 
              src="/ADVMEN logo.png" 
              alt="ADVMEN Logo" 
              className="h-8 w-auto object-contain"
            />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span 
                  className="font-display font-extrabold text-sm uppercase tracking-wider leading-none"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  ADVMEN
                </span>
                <span 
                  className="font-mono text-[9px] uppercase tracking-widest leading-none mt-1"
                  style={{ color: 'var(--color-orange)' }}
                >
                  Admin Panel
                </span>
              </div>
            )}
          </div>

          {/* Close button for mobile drawer */}
          {!isCollapsed && (
            <button 
              onClick={toggleSidebar} 
              className="lg:hidden p-1.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors cursor-pointer"
              data-cursor="hover"
              aria-label="Close sidebar"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1.5" role="navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => {
                  // Close sidebar on mobile after clicking
                  if (window.innerWidth < 1024) {
                    toggleSidebar()
                  }
                }}
                className={({ isActive }) => 
                  `group flex items-center rounded-xl font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-3.5'
                  } ${
                    isActive 
                      ? 'text-[var(--color-orange)] bg-[rgba(255,107,0,0.06)] border-l-2 border-[var(--color-orange)]' 
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] bg-transparent hover:bg-[var(--color-glass-white-4)]'
                  }`
                }
                data-cursor="hover"
                title={isCollapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3.5">
                      <Icon size={16} className="shrink-0" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isCollapsed && (
                      <FiChevronRight 
                        size={14} 
                        className={`shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${
                          isActive ? 'text-[var(--color-orange)] animate-pulse' : 'opacity-40'
                        }`}
                      />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Bottom Section — Tabs */}
      <div className="flex flex-col gap-1.5 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {bottomNavigationItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => {
                // Close sidebar on mobile after clicking
                if (window.innerWidth < 1024) {
                  toggleSidebar()
                }
              }}
              className={({ isActive }) => 
                `group flex items-center rounded-xl font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-3.5'
                } ${
                  isActive 
                    ? 'text-[var(--color-orange)] bg-[rgba(255,107,0,0.06)] border-l-2 border-[var(--color-orange)]' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] bg-transparent hover:bg-[var(--color-glass-white-4)]'
                }`
              }
              data-cursor="hover"
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3.5">
                    <Icon size={16} className="shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <FiChevronRight 
                      size={14} 
                      className={`shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${
                        isActive ? 'text-[var(--color-orange)] animate-pulse' : 'opacity-40'
                      }`}
                    />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </div>

    </div>
  )
}

const AdminSidebar = ({ isOpen, toggleSidebar, isCollapsed }) => {
  return (
    <>
      {/* Desktop Sidebar — Fixed Left */}
      <aside 
        className="hidden lg:block fixed top-0 bottom-0 left-0 z-30 h-screen transition-all duration-300"
        style={{ width: isCollapsed ? '70px' : '260px' }}
        aria-label="Desktop Navigation Sidebar"
      >
        <AdminSidebarContent 
          isCollapsed={isCollapsed} 
          toggleSidebar={toggleSidebar} 
        />
      </aside>

      {/* Mobile Drawer Sidebar — Animated Overlay + Drawer Container */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            
            {/* Blurred Dark Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/60 pointer-events-auto"
            />

            {/* Sidebar drawer container */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative z-50 w-[260px] h-screen flex-shrink-0"
              aria-label="Mobile Navigation Sidebar"
            >
              <AdminSidebarContent 
                isCollapsed={false} 
                toggleSidebar={toggleSidebar} 
              />
            </motion.aside>

          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminSidebar
