/**
 * admin/pages/AdminProfile.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Profile Page
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiShield, FiCheck } from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'

const AdminProfile = () => {
  const { user } = useAdminAuth()

  const [name, setName] = useState(user?.name || 'Super Admin')
  const [email, setEmail] = useState(user?.email || 'admin@advmen.com')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saved, setSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3500)
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordSaved(true)
    setTimeout(() => setPasswordSaved(false), 3500)
  }

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
          Profile Settings
        </h2>
        <p className="font-body text-xs text-[var(--admin-text-secondary)]">
          Manage your account credentials and personal preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left column: User Summary Info Card */}
        <div 
          className="md:col-span-1 p-6 flex flex-col items-center text-center justify-start h-fit"
          style={{
            background: 'var(--admin-card-bg)',
            border: '1px solid var(--admin-border)',
            boxShadow: 'var(--admin-shadow-md)',
            borderRadius: '24px',
          }}
        >
          {/* Avatar Initials Badge */}
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center font-display font-extrabold text-2xl mb-4"
            style={{
              background: 'rgba(255, 107, 0, 0.08)',
              border: '2px solid rgba(255, 107, 0, 0.25)',
              color: 'var(--color-orange)',
              boxShadow: 'var(--admin-shadow-sm)',
            }}
          >
            {name.slice(0, 2).toUpperCase()}
          </div>

          <h3 className="font-body font-bold text-sm leading-tight text-[var(--admin-text-primary)]">
            {name}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--admin-text-tertiary)] mt-1.5 block">
            {user?.role || 'Super Admin'}
          </span>

          <div 
            className="w-full border-t my-6"
            style={{ borderColor: 'var(--admin-border)' }}
          />

          <div className="w-full flex flex-col gap-3.5 text-left font-body text-xs text-[var(--admin-text-secondary)]">
            <div className="flex items-center gap-2.5">
              <FiMail className="text-[var(--color-orange)] shrink-0" size={14} />
              <span className="truncate">{email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiShield className="text-[var(--color-orange)] shrink-0" size={14} />
              <span>Full Control Permissions</span>
            </div>
          </div>
        </div>

        {/* Right column: Edit Details Form */}
        <div className="md:col-span-2 flex flex-col gap-8">
          
          {/* General Details Card */}
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
              <FiUser className="text-[var(--color-orange)]" />
              <span>Personal Details</span>
            </h3>

            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--admin-text-secondary)]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#e6e6ec] text-[#121215] border border-transparent rounded-xl p-3 font-body text-xs shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),_inset_-2px_-2px_4px_rgba(255,255,255,0.7)] focus:outline-none focus:border-[rgba(255,107,0,0.25)] transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--admin-text-secondary)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#e6e6ec] text-[#121215] border border-transparent rounded-xl p-3 font-body text-xs shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),_inset_-2px_-2px_4px_rgba(255,255,255,0.7)] focus:outline-none focus:border-[rgba(255,107,0,0.25)] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-2">
                <button
                  type="submit"
                  className="btn-primary py-2 px-6 h-[38px] text-xs font-semibold uppercase tracking-wider"
                  data-cursor="hover"
                >
                  Save Changes
                </button>

                {saved && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <FiCheck size={14} /> Profile updated successfully
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Change Password Card */}
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
              <FiLock className="text-[var(--color-orange)]" />
              <span>Security Settings</span>
            </h3>

            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--admin-text-secondary)]">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#e6e6ec] text-[#121215] border border-transparent rounded-xl p-3 font-body text-xs shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),_inset_-2px_-2px_4px_rgba(255,255,255,0.7)] focus:outline-none focus:border-[rgba(255,107,0,0.25)] transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--admin-text-secondary)]">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-[#e6e6ec] text-[#121215] border border-transparent rounded-xl p-3 font-body text-xs shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),_inset_-2px_-2px_4px_rgba(255,255,255,0.7)] focus:outline-none focus:border-[rgba(255,107,0,0.25)] transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--admin-text-secondary)]">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-[#e6e6ec] text-[#121215] border border-transparent rounded-xl p-3 font-body text-xs shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),_inset_-2px_-2px_4px_rgba(255,255,255,0.7)] focus:outline-none focus:border-[rgba(255,107,0,0.25)] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-2">
                <button
                  type="submit"
                  className="btn-primary py-2 px-6 h-[38px] text-xs font-semibold uppercase tracking-wider"
                  data-cursor="hover"
                >
                  Update Password
                </button>

                {passwordSaved && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <FiCheck size={14} /> Password updated successfully
                  </span>
                )}
              </div>
            </form>
          </div>

        </div>

      </div>

    </motion.div>
  )
}

export default AdminProfile
