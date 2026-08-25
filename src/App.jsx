/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Application Root
 *
 * Responsibilities:
 *  1. Wraps the app in all context providers
 *  2. Configures React Router with all routes
 *  3. Renders Preloader, CustomCursor, GlobalEffects globally
 *  4. Wraps routes in AnimatePresence for page transitions
 *  5. Initialises GSAP plugins (via gsapConfig import)
 * ─────────────────────────────────────────────────────────────
 */

import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'

// ── Context Providers ─────────────────────────────────────────
import { LoaderProvider }  from '@context/LoaderContext'
import { CursorProvider }  from '@context/CursorContext'
import { ThemeProvider }   from '@context/ThemeContext'
import { AdAuthProvider }  from './context/AdAuthContext'

// ── Global GSAP setup ─────────────────────────────────────────
import '@/utils/gsapConfig'

// ── Layout ────────────────────────────────────────────────────
import Layout        from '@components/layout/Layout'
import Preloader     from '@components/common/Preloader'
import GlobalEffects from '@components/common/GlobalEffects'

// ── Pages (lazy loaded) ───────────────────────────────────────
const Home           = lazy(() => import('@pages/Home'))
const About          = lazy(() => import('@pages/About'))
const Services       = lazy(() => import('@pages/Services'))
const ServiceDetail  = lazy(() => import('@pages/ServiceDetail'))
const Work           = lazy(() => import('@pages/Work'))
const WorkDetail     = lazy(() => import('@pages/WorkDetail'))
const PortfolioDetail = lazy(() => import('@pages/PortfolioDetail'))
const Blog           = lazy(() => import('@pages/Blog'))
const BlogPost       = lazy(() => import('@pages/BlogPost'))
const Catalog        = lazy(() => import('@pages/Catalog'))
const Contact        = lazy(() => import('@pages/Contact'))
const Careers        = lazy(() => import('@pages/Careers'))
const CareerDetail   = lazy(() => import('@pages/CareerDetail'))
const PrivacyPolicy  = lazy(() => import('@pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('@pages/TermsOfService'))
const NotFound       = lazy(() => import('@pages/NotFound'))

// ── Admin Pages & Route Protections ───────────────────────────
import AdminProtectedRoute from '@/admin/routes/AdminProtectedRoute'
import { AdminAuthProvider } from '@/admin/context/AdminAuthContext'
import AdminLayout from '@/admin/components/AdminLayout'
const AdminLogin     = lazy(() => import('@/admin/pages/AdminLogin'))
const AdminDashboard = lazy(() => import('@/admin/pages/AdminDashboard'))
const AdminContacts  = lazy(() => import('@/admin/pages/AdminContacts'))
const AdminCareers   = lazy(() => import('@/admin/pages/AdminCareers'))
const AdminApplications = lazy(() => import('@/admin/pages/AdminApplications'))
const AdminBlog      = lazy(() => import('@/admin/pages/AdminBlog'))
const AdminPortfolio = lazy(() => import('@/admin/pages/AdminPortfolio'))
const AdminServices  = lazy(() => import('@/admin/pages/AdminServices'))
const AdminSettings  = lazy(() => import('@/admin/pages/AdminSettings'))
const AdminProfile   = lazy(() => import('@/admin/pages/AdminProfile'))
const AdminHelp      = lazy(() => import('@/admin/pages/AdminHelp'))
const AdminCatalog   = lazy(() => import('@/admin/pages/AdminCatalog'))
const AdminCatalogOrders = lazy(() => import('@/admin/pages/AdminCatalogOrders'))

const AdminAdSpaces    = lazy(() => import('@/admin/pages/AdminAdSpaces'))
const AdminAdBookings  = lazy(() => import('@/admin/pages/AdminAdBookings'))
const AdminAdUsers     = lazy(() => import('@/admin/pages/AdminAdUsers'))
const AdminAdCommission = lazy(() => import('@/admin/pages/AdminAdCommission'))
const AdminAdPayouts   = lazy(() => import('@/admin/pages/AdminAdPayouts'))
const AdminAdAnalytics = lazy(() => import('@/admin/pages/AdminAdAnalytics'))

// ── Ad Space Module Pages ─────────────────────────────────────
const AdSpaceHome = lazy(() => import('./pages/AdSpaceHome'))
const AdSpaceBrowse = lazy(() => import('./pages/AdSpaceBrowse'))
const AdSpaceDetail = lazy(() => import('./pages/AdSpaceDetail'))
const AdSpaceOwnerRegister = lazy(() => import('./pages/AdSpaceOwnerRegister'))
const AdSpaceOwnerLogin = lazy(() => import('./pages/AdSpaceOwnerLogin'))
const AdSpaceAdvertiserRegister = lazy(() => import('./pages/AdSpaceAdvertiserRegister'))
const AdSpaceAdvertiserLogin = lazy(() => import('./pages/AdSpaceAdvertiserLogin'))
const AdSpaceOwnerDashboard = lazy(() => import('./pages/AdSpaceOwnerDashboard'))
const AdSpaceAdvertiserDashboard = lazy(() => import('./pages/AdSpaceAdvertiserDashboard'))
import AdProtectedRoute from './components/common/AdProtectedRoute'

// ── Page loading fallback ─────────────────────────────────────
const PageFallback = () => (
  <div
    className="section-full flex-center"
    style={{ minHeight: '100vh' }}
  >
    <div
      className="spinner"
      role="status"
      aria-label="Loading page"
    />
  </div>
)

// ── Public Animated Routes (with Navbar/Footer Layout) ────────
const PublicRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"                 element={<Home />} />
        <Route path="/about"            element={<About />} />
        <Route path="/services"         element={<Services />} />
        <Route path="/services/:slug"   element={<ServiceDetail />} />
        <Route path="/work"             element={<Work />} />
        <Route path="/work/:slug"       element={<WorkDetail />} />
        <Route path="/portfolio/:slug"  element={<PortfolioDetail />} />
        <Route path="/blog"             element={<Blog />} />
        <Route path="/blog/:slug"       element={<BlogPost />} />
        <Route path="/catalog"          element={<Catalog />} />
        <Route path="/contact"          element={<Contact />} />
        <Route path="/careers"          element={<Careers />} />
        <Route path="/careers/:id"      element={<CareerDetail />} />
        <Route path="/privacy-policy"   element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        {/* Ad Space Module Routes */}
        <Route path="/ad-space" element={<AdSpaceHome />} />
        <Route path="/ad-space/browse" element={<AdSpaceBrowse />} />
        <Route path="/ad-space/owner/register" element={<AdSpaceOwnerRegister />} />
        <Route path="/ad-space/owner/login" element={<AdSpaceOwnerLogin />} />
        <Route path="/ad-space/advertiser/register" element={<AdSpaceAdvertiserRegister />} />
        <Route path="/ad-space/advertiser/login" element={<AdSpaceAdvertiserLogin />} />
        <Route path="/ad-space/:id" element={<AdSpaceDetail />} />

        {/* Protected Ad Routes */}
        <Route element={<AdProtectedRoute allowedRoles={['owner']} />}>
          <Route path="/ad-space/owner/dashboard" element={<AdSpaceOwnerDashboard />} />
        </Route>
        <Route element={<AdProtectedRoute allowedRoles={['advertiser']} />}>
          <Route path="/ad-space/advertiser/dashboard" element={<AdSpaceAdvertiserDashboard />} />
        </Route>

        <Route path="*"                 element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

// ── Admin Routes (NO public Navbar/Footer) ─────────────────────
const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminProtectedRoute />}>
      <Route index element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="dashboard"    element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="contacts"     element={<AdminLayout><AdminContacts /></AdminLayout>} />
      <Route path="careers"      element={<AdminLayout><AdminCareers /></AdminLayout>} />
      <Route path="applications" element={<AdminLayout><AdminApplications /></AdminLayout>} />
      <Route path="blog"         element={<AdminLayout><AdminBlog /></AdminLayout>} />
      <Route path="portfolio"    element={<AdminLayout><AdminPortfolio /></AdminLayout>} />
      <Route path="services"     element={<AdminLayout><AdminServices /></AdminLayout>} />
      <Route path="settings"     element={<AdminLayout><AdminSettings /></AdminLayout>} />
      <Route path="profile"      element={<AdminLayout><AdminProfile /></AdminLayout>} />
      <Route path="help"         element={<AdminLayout><AdminHelp /></AdminLayout>} />
      <Route path="catalog"      element={<AdminLayout><AdminCatalog /></AdminLayout>} />
      <Route path="catalog-orders" element={<AdminLayout><AdminCatalogOrders /></AdminLayout>} />
      <Route path="ad-spaces"    element={<AdminLayout><AdminAdSpaces /></AdminLayout>} />
      <Route path="ad-bookings"  element={<AdminLayout><AdminAdBookings /></AdminLayout>} />
      <Route path="ad-users"     element={<AdminLayout><AdminAdUsers /></AdminLayout>} />
      <Route path="ad-commission" element={<AdminLayout><AdminAdCommission /></AdminLayout>} />
      <Route path="ad-payouts"   element={<AdminLayout><AdminAdPayouts /></AdminLayout>} />
      <Route path="ad-analytics" element={<AdminLayout><AdminAdAnalytics /></AdminLayout>} />
    </Route>
  </Routes>
)

// ── Root Router — splits admin vs public ──────────────────────
const RootRouter = () => {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Suspense fallback={<PageFallback />}>
        <AdminRoutes />
      </Suspense>
    )
  }

  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <PublicRoutes />
      </Suspense>
    </Layout>
  )
}

// ── Root App ──────────────────────────────────────────────────
const App = () => (
  <AdminAuthProvider>
    <HelmetProvider>
      <LoaderProvider>
        <AdAuthProvider>
          <CursorProvider>
            <ThemeProvider>
              <BrowserRouter>
                <GlobalEffects />
                <Preloader />
                <RootRouter />
              </BrowserRouter>
            </ThemeProvider>
          </CursorProvider>
        </AdAuthProvider>
      </LoaderProvider>
    </HelmetProvider>
  </AdminAuthProvider>
)

export default App
