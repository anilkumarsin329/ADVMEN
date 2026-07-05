/**
 * pages/TermsOfService/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Terms of Service
 * ─────────────────────────────────────────────────────────────
 */

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'

const TermsOfService = () => {
  return (
    <PageTransition>
      <SEOHead title="Terms of Service — ADVMEN Technologies" noIndex />
      <section
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '6rem',
          background: 'var(--color-black)',
          minHeight: '100vh',
        }}
        aria-label="Terms of Service"
      >
        <div className="container max-w-4xl relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]">
            Legal Terms
          </span>
          <h1 className="section-title mt-4 mb-8">Terms of Service</h1>
          
          <div className="flex flex-col gap-6 text-[var(--color-text-secondary)]" style={{ lineHeight: '1.8' }}>
            <p className="font-mono text-xs">Last Updated: July 05, 2026</p>
            <p>
              By accessing this digital platform, you agree to respect the terms of engagement of ADVMEN Technologies Pvt. Ltd.
            </p>
            
            <h3 className="font-display font-bold text-lg text-white mt-4">1. Project Engagements</h3>
            <p>
              All service inquiries, timeline schedules, and design deliverables are governed under dedicated technical contracts signed between client teams and ADVMEN leadership.
            </p>

            <h3 className="font-display font-bold text-lg text-white mt-4">2. Proprietary Intellectual Property</h3>
            <p>
              The design layouts, code assets, custom cursor animations, WebGL setups, and SVG logo marks displayed on this platform are owned by ADVMEN Technologies and may not be copied or repurposed without direct permission.
            </p>

            <h3 className="font-display font-bold text-lg text-white mt-4">3. Governing Jurisdiction</h3>
            <p>
              These Terms of Service are governed and audited according to the corporate laws of India, under Mohali/Punjab jurisdiction limits.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default TermsOfService
