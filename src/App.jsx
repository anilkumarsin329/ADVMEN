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
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'

// ── Context Providers ─────────────────────────────────────────
import { LoaderProvider }  from '@context/LoaderContext'
import { CursorProvider }  from '@context/CursorContext'
import { ThemeProvider }   from '@context/ThemeContext'

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
const PrivacyPolicy  = lazy(() => import('@pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('@pages/TermsOfService'))
const NotFound       = lazy(() => import('@pages/NotFound'))

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

// ── Animated Routes ───────────────────────────────────────────
const AnimatedRoutes = () => {
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
        <Route path="/privacy-policy"   element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*"                 element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

// ── Root App ──────────────────────────────────────────────────
const App = () => (
  <HelmetProvider>
    <LoaderProvider>
      <CursorProvider>
        <ThemeProvider>
          <BrowserRouter>
            {/* Global background effects — behind everything */}
            <GlobalEffects />

            {/* Preloader — covers viewport on first load */}
            <Preloader />

            {/* Main app shell */}
            <Layout>
              <Suspense fallback={<PageFallback />}>
                <AnimatedRoutes />
              </Suspense>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </CursorProvider>
    </LoaderProvider>
  </HelmetProvider>
)

export default App
