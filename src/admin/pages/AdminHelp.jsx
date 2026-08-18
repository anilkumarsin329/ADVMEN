/**
 * admin/pages/AdminHelp.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Help Page
 * ─────────────────────────────────────────────────────────────
 */

import { motion } from 'framer-motion'
import { FiHelpCircle, FiBookOpen, FiMessageCircle, FiMail } from 'react-icons/fi'

const faqs = [
  {
    q: 'How do I add a new portfolio project?',
    a: 'Navigate to the "Portfolio" tab in the sidebar and click the "Add Project" button on the top-right. Fill in details and click publish.',
  },
  {
    q: 'How can I review job candidate submissions?',
    a: 'All candidate files and details will appear under the "Applications" tab. You can download CVs and contact candidates directly.',
  },
  {
    q: 'How do I edit site settings?',
    a: 'Navigate to the "Site Settings" tab to update configuration values, social links, contact emails, and SEO metadata.',
  },
]

const AdminHelp = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-8 max-w-4xl mx-auto"
      style={{ color: 'var(--admin-text-primary)' }}
    >
      <div className="flex flex-col">
        <h2 className="text-xl font-bold font-display uppercase tracking-wider mb-1">
          Help & Support
        </h2>
        <p className="font-body text-xs text-[var(--admin-text-secondary)]">
          Search the user manuals or contact system administrators for technical assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left column: FAQ section */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div 
            className="p-6 sm:p-8 flex flex-col"
            style={{
              background: 'var(--admin-card-bg)',
              border: '1px solid var(--admin-border)',
              boxShadow: 'var(--admin-shadow-md)',
              borderRadius: '24px',
            }}
          >
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[var(--admin-text-primary)] mb-6 flex items-center gap-2">
              <FiHelpCircle className="text-[var(--color-orange)]" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="flex flex-col gap-6 font-body text-xs">
              {faqs.map((faq, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <h4 className="font-bold text-[var(--admin-text-primary)] text-sm">
                    {faq.q}
                  </h4>
                  <p className="text-[var(--admin-text-secondary)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Contact Support Info */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div 
            className="p-6 flex flex-col"
            style={{
              background: 'var(--admin-card-bg)',
              border: '1px solid var(--admin-border)',
              boxShadow: 'var(--admin-shadow-md)',
              borderRadius: '24px',
              height: 'fit-content',
            }}
          >
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[var(--admin-text-primary)] mb-6 flex items-center gap-2">
              <FiMessageCircle className="text-[var(--color-orange)]" />
              <span>Support Contact</span>
            </h3>

            <div className="flex flex-col gap-4 font-body text-xs text-[var(--admin-text-secondary)]">
              <p className="leading-relaxed">
                Need specialized assistance or found a system error? Reach out directly:
              </p>

              <div 
                className="w-full border-t my-2"
                style={{ borderColor: 'var(--admin-border)' }}
              />

              <div className="flex items-center gap-2.5">
                <FiMail className="text-[var(--color-orange)]" size={14} />
                <span>support@advmen.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiBookOpen className="text-[var(--color-orange)]" size={14} />
                <a 
                  href="#" 
                  className="underline hover:text-[var(--color-orange)] transition-colors"
                >
                  System Manuals.pdf
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

    </motion.div>
  )
}

export default AdminHelp
