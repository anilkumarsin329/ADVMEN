/**
 * pages/DataDeletion/index.jsx
 * ADVMEN Technologies — Data Deletion Request Page (required by Meta/Facebook)
 */

import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'

const DataDeletion = () => {
  return (
    <PageTransition>
      <SEOHead title="Data Deletion Request — ADVMEN Technologies" noIndex />
      <section
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '6rem',
          background: 'var(--color-black)',
          minHeight: '100vh',
        }}
        aria-label="Data Deletion Request"
      >
        <div className="container max-w-4xl relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]">
            Your Rights
          </span>
          <h1 className="section-title mt-4 mb-8">Data Deletion Request</h1>

          <div className="flex flex-col gap-6 text-[var(--color-text-secondary)]" style={{ lineHeight: '1.8' }}>
            <p className="font-mono text-xs">Last Updated: July 05, 2026</p>

            <p>
              At ADVMEN Technologies Pvt. Ltd., we respect your right to control your personal data. If you have interacted with our website or connected via Facebook/Meta and wish to have your data deleted, you may submit a deletion request.
            </p>

            <h3 className="font-display font-bold text-lg text-white mt-4">How to Request Data Deletion</h3>
            <p>
              To request deletion of your personal data collected by ADVMEN Technologies, please contact us via email with the subject line <span className="text-white font-semibold">"Data Deletion Request"</span>:
            </p>
            <p>
              📧 <a href="mailto:info@advmen.com" className="text-[var(--color-orange)] hover:underline">info@advmen.com</a>
            </p>

            <p>Please include the following in your request:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 pl-2">
              <li>Your full name</li>
              <li>Email address associated with your data</li>
              <li>Description of the data you want deleted</li>
            </ul>

            <h3 className="font-display font-bold text-lg text-white mt-4">What Data We Delete</h3>
            <p>
              Upon a verified request, we will delete all personal information associated with you including contact form submissions, newsletter subscriptions, and any analytics identifiers linked to your profile.
            </p>

            <h3 className="font-display font-bold text-lg text-white mt-4">Processing Time</h3>
            <p>
              We will process your request within <span className="text-white font-semibold">30 business days</span> and send a confirmation to your email once the deletion is complete.
            </p>

            <h3 className="font-display font-bold text-lg text-white mt-4">Contact Us</h3>
            <p>
              For any questions regarding data deletion, reach us at{' '}
              <a href="mailto:info@advmen.com" className="text-[var(--color-orange)] hover:underline">info@advmen.com</a>{' '}
              or call <a href="tel:+918375008009" className="text-[var(--color-orange)] hover:underline">+91 83750 08009</a>.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default DataDeletion
