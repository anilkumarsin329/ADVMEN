/**
 * admin/pages/AdminLogin.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Admin Login Page
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAdminAuth } from '@/admin/context/AdminAuthContext'
import SEOHead from '@components/common/SEOHead'

const AdminLogin = () => {
  const { login, isAuthenticated, isLoading } = useAdminAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already authenticated (wait for loading to finish first)
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  // Show spinner while verifying existing session
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'var(--color-black)' }}>
        <div className="w-10 h-10 rounded-full border-4 border-dashed border-[var(--color-orange)] animate-spin" />
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEOHead 
        title="Admin Portal — ADVMEN Technologies" 
        description="ADVMEN Technologies administrator access and backend portal."
      />

      <div 
        className="w-full min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: 'var(--color-black)' }}
      >
        {/* Subtle orange mesh glows in background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(300px, 60vw, 700px)',
            height: 'clamp(300px, 60vw, 700px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center"
          style={{ maxWidth: '440px' }}
        >
          {/* Card Wrapper */}
          <div
            className="w-full flex flex-col items-center"
            style={{
              background: 'var(--color-surface-1)',
              boxShadow: 'var(--shadow-neu-convex)',
              border: '1px solid rgba(255, 255, 255, 0.03)',
              borderRadius: '24px',
              padding: '48px',
            }}
          >
            {/* Logo */}
            <img 
              src="/ADVMEN logo.png" 
              alt="ADVMEN Logo" 
              className="h-12 w-auto mb-6 object-contain"
            />

            {/* Headers */}
            <div className="text-center mb-8">
              <span 
                className="font-mono text-xs uppercase tracking-widest block mb-2"
                style={{ color: 'var(--color-orange)' }}
              >
                ADVMEN Technologies
              </span>
              <h1 
                className="text-2xl font-bold leading-tight"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  color: 'var(--color-text-primary)' 
                }}
              >
                Admin Portal
              </h1>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5" noValidate>
              
              {/* Email Input */}
              <div className="flex flex-col gap-2 relative">
                <label 
                  htmlFor="email" 
                  className="font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#e6e6ec] text-[#121215] border border-transparent rounded-xl p-3.5 font-body text-sm shadow-[inset_3px_3px_6px_rgba(0,0,0,0.12),_inset_-3px_-3px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:border-[rgba(255,107,0,0.3)] transition-all duration-300"
                  placeholder="admin@advmen.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2 relative">
                <label 
                  htmlFor="password" 
                  className="font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#e6e6ec] text-[#121215] border border-transparent rounded-xl p-3.5 pr-11 font-body text-sm shadow-[inset_3px_3px_6px_rgba(0,0,0,0.12),_inset_-3px_-3px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:border-[rgba(255,107,0,0.3)] transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer flex items-center justify-center"
                    tabIndex={-1}
                    data-cursor="hover"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-medium p-3 rounded-lg border text-center"
                  style={{
                    background: 'var(--color-error-bg)',
                    borderColor: 'var(--color-error)',
                    color: 'var(--color-error)'
                  }}
                >
                  {error}
                </motion.div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full mt-2 h-[44px]"
                data-cursor="hover"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 rounded-full border-2 border-dashed border-[var(--color-orange)] animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>

            </form>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default AdminLogin
