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

// ── Lazy Load Wrapper with Retry ──────────────────────────────
// Automatically reloads the page once if a ChunkLoadError occurs 
// (common after a new production deployment).
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );
    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        return window.location.reload();
      }
      throw error;
    }
  });

// ── Pages (lazy loaded) ───────────────────────────────────────
const Home           = lazyWithRetry(() => import('@pages/Home'))
const About          = lazyWithRetry(() => import('@pages/About'))
const Services       = lazyWithRetry(() => import('@pages/Services'))
const ServiceDetail  = lazyWithRetry(() => import('@pages/ServiceDetail'))
const Work           = lazyWithRetry(() => import('@pages/Work'))
const WorkDetail     = lazyWithRetry(() => import('@pages/WorkDetail'))
const PortfolioDetail = lazyWithRetry(() => import('@pages/PortfolioDetail'))
const Blog           = lazyWithRetry(() => import('@pages/Blog'))
const BlogPost       = lazyWithRetry(() => import('@pages/BlogPost'))
const Catalog        = lazyWithRetry(() => import('@pages/Catalog'))
const Contact        = lazyWithRetry(() => import('@pages/Contact'))
const Careers        = lazyWithRetry(() => import('@pages/Careers'))
const CareerDetail   = lazyWithRetry(() => import('@pages/CareerDetail'))
const PrivacyPolicy  = lazyWithRetry(() => import('@pages/PrivacyPolicy'))
const TermsOfService = lazyWithRetry(() => import('@pages/TermsOfService'))
const NotFound       = lazyWithRetry(() => import('@pages/NotFound'))

// ── Admin Pages & Route Protections ───────────────────────────
import AdminProtectedRoute from '@/admin/routes/AdminProtectedRoute'
import { AdminAuthProvider } from '@/admin/context/AdminAuthContext'
import AdminLayout from '@/admin/components/AdminLayout'
const AdminLogin     = lazyWithRetry(() => import('@/admin/pages/AdminLogin'))
const AdminDashboard = lazyWithRetry(() => import('@/admin/pages/AdminDashboard'))
const AdminContacts  = lazyWithRetry(() => import('@/admin/pages/AdminContacts'))
const AdminCareers   = lazyWithRetry(() => import('@/admin/pages/AdminCareers'))
const AdminApplications = lazyWithRetry(() => import('@/admin/pages/AdminApplications'))
const AdminBlog      = lazyWithRetry(() => import('@/admin/pages/AdminBlog'))
const AdminPortfolio = lazyWithRetry(() => import('@/admin/pages/AdminPortfolio'))
const AdminServices  = lazyWithRetry(() => import('@/admin/pages/AdminServices'))
const AdminSettings  = lazyWithRetry(() => import('@/admin/pages/AdminSettings'))
const AdminProfile   = lazyWithRetry(() => import('@/admin/pages/AdminProfile'))
const AdminHelp      = lazyWithRetry(() => import('@/admin/pages/AdminHelp'))
const AdminCatalog   = lazyWithRetry(() => import('@/admin/pages/AdminCatalog'))
const AdminCatalogOrders = lazyWithRetry(() => import('@/admin/pages/AdminCatalogOrders'))

const AdminAdSpaces    = lazyWithRetry(() => import('@/admin/pages/AdminAdSpaces'))
const AdminAdBookings  = lazyWithRetry(() => import('@/admin/pages/AdminAdBookings'))
const AdminAdUsers     = lazyWithRetry(() => import('@/admin/pages/AdminAdUsers'))
const AdminAdCommission = lazyWithRetry(() => import('@/admin/pages/AdminAdCommission'))
const AdminAdPayouts   = lazyWithRetry(() => import('@/admin/pages/AdminAdPayouts'))
const AdminAdAnalytics = lazyWithRetry(() => import('@/admin/pages/AdminAdAnalytics'))

// ── Ad Space Module Pages ─────────────────────────────────────
const AdSpaceHome = lazyWithRetry(() => import('./pages/AdSpaceHome'))
const AdSpaceBrowse = lazyWithRetry(() => import('./pages/AdSpaceBrowse'))
const AdSpaceDetail = lazyWithRetry(() => import('./pages/AdSpaceDetail'))
const AdSpaceOwnerRegister = lazyWithRetry(() => import('./pages/AdSpaceOwnerRegister'))
const AdSpaceOwnerLogin = lazyWithRetry(() => import('./pages/AdSpaceOwnerLogin'))
const AdSpaceAdvertiserRegister = lazyWithRetry(() => import('./pages/AdSpaceAdvertiserRegister'))
const AdSpaceAdvertiserLogin = lazyWithRetry(() => import('./pages/AdSpaceAdvertiserLogin'))
const AdSpaceOwnerDashboard = lazyWithRetry(() => import('./pages/AdSpaceOwnerDashboard'))
const AdSpaceAdvertiserDashboard = lazyWithRetry(() => import('./pages/AdSpaceAdvertiserDashboard'))
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
