/**
 * admin/pages/AdminSettings.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Settings page (Coming Soon)
 * ─────────────────────────────────────────────────────────────
 */

import { motion } from 'framer-motion'
import { FiSliders } from 'react-icons/fi'

const AdminSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center"
      style={{ color: 'var(--admin-text-primary)' }}
    >
      <div 
        className="p-10 sm:p-12 flex flex-col items-center justify-center max-w-xl w-full"
        style={{
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'var(--admin-shadow-md)',
          borderRadius: '24px',
        }}
      >
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center border text-3xl mb-6"
          style={{
            background: 'rgba(255, 107, 0, 0.06)',
            borderColor: 'rgba(255, 107, 0, 0.18)',
            color: 'var(--color-orange)',
            boxShadow: 'var(--admin-shadow-sm)',
          }}
        >
          <FiSliders />
        </div>

        <span className="badge-orange font-mono tracking-widest text-[10px] py-1.5 px-4 mb-4 shadow-[0_0_10px_rgba(255,107,0,0.15)] animate-pulse">
          COMING SOON
        </span>

        <h2 
          className="text-xl sm:text-2xl font-bold font-display leading-tight uppercase tracking-wider mb-3"
          style={{ color: 'var(--admin-text-primary)' }}
        >
          Site Settings
        </h2>

        <p 
          className="font-body text-xs sm:text-sm leading-relaxed max-w-[340px]"
          style={{ color: 'var(--admin-text-secondary)' }}
        >
          Configure global site settings and integrations. Integration in progress.
        </p>
      </div>
    </motion.div>
  )
}

export default AdminSettings
