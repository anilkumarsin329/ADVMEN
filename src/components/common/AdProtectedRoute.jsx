import { Navigate, Outlet } from 'react-router-dom'
import { useAdAuth } from '../../context/AdAuthContext'

const AdProtectedRoute = ({ allowedRoles }) => {
  const { adUser, loading } = useAdAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="spinner" />
      </div>
    )
  }

  if (!adUser) {
    return <Navigate to="/ad-space/owner/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(adUser.role)) {
    // If not authorized role, maybe redirect to their specific dashboard
    const dashboardRoute = adUser.role === 'owner' 
      ? '/ad-space/owner/dashboard' 
      : '/ad-space/advertiser/dashboard'
    return <Navigate to={dashboardRoute} replace />
  }

  return <Outlet />
}

export default AdProtectedRoute
