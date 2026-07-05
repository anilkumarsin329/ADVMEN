/**
 * components/layout/Footer.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Mega Footer
 * Phase 11: Mega Footer complete.
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { footerLinks } from '@data/navigation'
import { COMPANY, SOCIAL } from '@utils/constants'
import { FiInstagram, FiLinkedin, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi'

const socialIcons = [
  { icon: FiInstagram, href: SOCIAL.instagram, label: 'Instagram' },
  { icon: FiLinkedin,  href: SOCIAL.linkedin,  label: 'LinkedIn'  },
  { icon: FiTwitter,   href: SOCIAL.twitter,   label: 'Twitter'   },
  { icon: FiFacebook,  href: SOCIAL.facebook,  label: 'Facebook'  },
  { icon: FiYoutube,   href: SOCIAL.youtube,   label: 'YouTube'   },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Email address is required')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email')
      return
    }

    setError('')
    setSuccess(true)
    setEmail('')
    setTimeout(() => setSuccess(false), 4000)
  }

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer
      className="relative border-t border-[rgba(255,255,255,0.04)]"
      style={{
        background: 'var(--color-black)',
      }}
      aria-label="Footer"
    >
      {/* Accent Orange line */}
      <div
        className="h-[1px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--color-orange) 50%, transparent 100%)',
          opacity: 0.8,
        }}
      />

      <div className="container py-20 relative z-10">
        
        {/* Top Segment: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[rgba(255,255,255,0.04)] mb-16 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link to="/" className="inline-block" data-cursor="hover">
              <img
                src="/ADVMEN logo.png"
                alt={COMPANY.shortName}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.65',
                maxWidth: '380px',
              }}
            >
              We design visual systems and engineer high-performance platforms that capture attention, engage audiences, and build equity for ambitious brands.
            </p>
          </div>

          {/* Newsletter Input Form */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-orange)',
              }}
            >
              Subscribe to our Briefings
            </h4>
            <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-3 max-w-lg w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                className="flex-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-orange)] transition-colors duration-300"
              />
              <button
                type="submit"
                className="btn-primary shine py-3 px-6 text-sm whitespace-nowrap"
                data-cursor="hover"
              >
                Join List
              </button>
            </form>
            {error && <span className="font-mono text-xs text-red-500">{error}</span>}
            {success && (
              <span className="font-mono text-xs text-[var(--color-orange)]">
                Subscribed successfully. Welcome to ADVMEN Briefings!
              </span>
            )}
          </div>

        </div>

        {/* Middle Segment: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          
          {/* Company links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct channels */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
              Inquiries
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                >
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Social connections */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
              Follow Us
            </h4>
            <div className="flex items-center gap-3.5">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] hover:border-[var(--color-orange)] transition-all duration-300 bg-[rgba(255,255,255,0.01)]"
                  data-cursor="hover"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyright & Back-to-top */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.04)] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-xs text-[var(--color-text-tertiary)]">
            © {currentYear} {COMPANY.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-5">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-body text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Back to top scroll button */}
            <button
              onClick={handleBackToTop}
              className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-tertiary)] hover:text-[var(--color-orange)] transition-colors duration-300"
              aria-label="Scroll back to top"
              data-cursor="hover"
            >
              <span>TOP</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M3.5 6.5L7 3l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
