/**
 * pages/PrivacyPolicy/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Privacy Policy
 * ─────────────────────────────────────────────────────────────
 */

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <SEOHead title="Privacy Policy — ADVMEN Technologies" noIndex />
      <section
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '6rem',
          background: 'var(--color-black)',
          minHeight: '100vh',
        }}
        aria-label="Privacy Policy"
      >
        <div className="container max-w-4xl relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]">
            Compliance Details
          </span>
          <h1 className="section-title mt-4 mb-8">Privacy Policy</h1>
          
          <div className="flex flex-col gap-6 text-[var(--color-text-secondary)]" style={{ lineHeight: '1.8' }}>
            <p className="font-mono text-xs">Last Updated: July 05, 2026</p>
            <p>
              At ADVMEN Technologies Pvt. Ltd., we respect your private details. This Privacy Policy details how we accumulate, utilize, and protect search metrics and contact records provided via our contact panels.
            </p>
            
            <h3 className="font-display font-bold text-lg text-white mt-4">1. Information Accumulation</h3>
            <p>
              We collect contact information (Full Name, Email Address, Phone Number, Subject, Message details) directly when you transmit project inquiries via our contact form or subscribe to our briefings.
            </p>

            <h3 className="font-display font-bold text-lg text-white mt-4">2. Technical Analytics</h3>
            <p>
              We run technical scripts (such as Google Analytics) to audit traffic records, browser specifications, and user interactions to continuously optimize page rendering latency.
            </p>

            <h3 className="font-display font-bold text-lg text-white mt-4">3. Data Preservation</h3>
            <p>
              All records are stored on secure cloud databases protected by server-side firewall systems and encryption keys. We do not sell or lease your records to third-party marketing services.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default PrivacyPolicy
