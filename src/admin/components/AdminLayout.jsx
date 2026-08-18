/**
 * admin/components/AdminLayout.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Layout Wrapper
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebarDrawer = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div 
      className="h-screen w-full overflow-hidden flex relative"
      style={{ 
        '--admin-bg': '#f4f6f8',
        '--admin-card-bg': '#ffffff',
        '--admin-text-primary': '#121215',
        '--admin-text-secondary': '#555555',
        '--admin-text-tertiary': '#888888',
        '--admin-border': 'rgba(0, 0, 0, 0.06)',
        '--admin-shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        '--admin-shadow-md': '0 4px 20px rgba(0, 0, 0, 0.05)',
        '--admin-shadow-neu-convex': '6px 6px 15px rgba(165, 180, 200, 0.25), -6px -6px 15px rgba(255, 255, 255, 0.8)',
        '--admin-shadow-neu-inset': 'inset 3px 3px 6px rgba(165, 180, 200, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.7)',
        background: 'var(--admin-bg)',
      }}
    >
      {/* Navigation Sidebar Drawer & Desktop Panel */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(false)} 
        isCollapsed={sidebarCollapsed}
      />

      {/* Main Panel Viewport */}
      <div className={`w-full h-screen flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-[70px]' : 'lg:pl-[260px]'}`}>
        {/* Top Header bar */}
        <AdminHeader 
          toggleSidebar={toggleSidebarDrawer} 
          isCollapsed={sidebarCollapsed}
          toggleCollapse={toggleSidebarCollapse}
        />

        {/* Dynamic Inner page content view */}
        <main 
          className="flex-1 w-full p-6 sm:p-8 md:p-10 relative overflow-y-auto"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
