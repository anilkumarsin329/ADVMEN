/**
 * pages/NotFound/index.jsx — 404 Page
 */
import { Link } from 'react-router-dom'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'

const NotFound = () => (
  <PageTransition>
    <SEOHead title="404 — Page Not Found" noIndex />
    <div className="section-full flex-center">
      <div className="container text-center">
        <span className="font-display text-[8rem] font-bold text-orange-gradient leading-none">
          404
        </span>
        <h1 className="section-title mt-4">Page Not Found</h1>
        <p className="section-subtitle mx-auto mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary mt-10 inline-flex">
          Back to Home
        </Link>
      </div>
    </div>
  </PageTransition>
)

export default NotFound
