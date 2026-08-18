/**
 * admin/routes/AdminProtectedRoute.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Protected Route
 * ─────────────────────────────────────────────────────────────
 */

import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'

const AdminProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAdminAuth()

  // Full screen loading spinner with dark background & orange spinner
  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-black)]"
        style={{ background: 'var(--color-black)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-dashed border-[var(--color-orange)] animate-spin" />
          <span 
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Authenticating Admin...
          </span>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  // Render child routes if authenticated
  return <Outlet />
}

export default AdminProtectedRoute
