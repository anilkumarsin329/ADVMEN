/**
 * components/layout/Footer.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — Clean & Responsive Footer
 * ─────────────────────────────────────────────────────────────
 */

import { Link } from 'react-router-dom'
import { footerLinks } from '@data/navigation'
import { COMPANY, SOCIAL } from '@utils/constants'
import { FiInstagram, FiLinkedin, FiArrowUp } from 'react-icons/fi'

const socialIcons = [
  { icon: FiInstagram, href: SOCIAL.instagram, label: 'Instagram' },
  { icon: FiLinkedin,  href: SOCIAL.linkedin,  label: 'LinkedIn'  },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer
      className="relative w-full px-6 md:px-12 py-16 md:py-24"
      style={{
        background: 'var(--color-black)',
      }}
      aria-label="Footer"
    >
      <div className="container max-w-[1400px] mx-auto">
        
        {/* Company Description */}
        <div className="mb-12 max-w-3xl">
          <p className="font-body text-sm font-medium text-[var(--color-text-secondary)] leading-relaxed">
            ADVMEN Technologies connects strategy, creativity, and state-of-the-art technology to build digital experiences that attract audiences, earn trust, and create growth.
          </p>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 items-start">
          
          {/* Quick Links */}
          <div className="lg:col-span-6 flex flex-col">
            <h4 className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mb-6">
              Quick Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              {/* Company Links */}
              <ul className="flex flex-col gap-4">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Services Links */}
              <ul className="flex flex-col gap-4">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mb-6">
              Contact
            </h4>
            <ul className="flex flex-col gap-5 text-sm font-medium text-[var(--color-text-primary)]">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-[var(--color-orange)] transition-colors duration-300"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="hover:text-[var(--color-orange)] transition-colors duration-300"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="text-xs text-[var(--color-text-secondary)] font-normal pt-1">
                Serving In: India | USA | Canada | UAE | Australia | UK | Oman | GCC
              </li>
              <li className="leading-relaxed pt-2">
                ADVMEN Technologies Private Limited<br />
                Orchid Center, 3rd Floor, Golf Course Road, SEC-53, Gurugram, HR - 122002, India
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mb-6">
              Follow Us
            </h4>
            <div className="flex gap-5">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--color-text-primary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                  data-cursor="hover"
                >
                  <Icon size={20} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-body font-medium text-[var(--color-text-tertiary)] w-full">
          <p>© {currentYear} {COMPANY.name}. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="hover:text-[var(--color-text-primary)] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            
            <button
              onClick={handleBackToTop}
              className="flex items-center gap-1.5 hover:text-[var(--color-orange)] font-mono uppercase tracking-widest transition-colors duration-300 ml-2"
              aria-label="Scroll back to top"
              data-cursor="hover"
            >
              <span>TOP</span>
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
