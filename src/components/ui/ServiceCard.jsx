/**
 * components/ui/ServiceCard.jsx
 * Service card for the services grid section.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@utils/formatters'

const ServiceIcons = {
  brand: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  marketing: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  web: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  app: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
    </svg>
  ),
  political: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  media: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
    </svg>
  ),
  content: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  seo: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  advertising: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h3"/><rect x="9" y="11" width="13" height="10" rx="1"/><path d="M9 15h13"/>
    </svg>
  ),
}

const ServiceCard = ({ service, index = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
  >
    <Link
      to={`/services/${service.slug}`}
      className={cn(
        'card-glass group block h-full',
        'p-6 hover:border-[var(--color-border-orange)]',
        className
      )}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-[var(--color-glass-orange-8)] border border-[var(--color-border-orange)] flex items-center justify-center text-[var(--color-orange)] mb-5 transition-all duration-300 group-hover:bg-[var(--color-glass-orange-12)] group-hover:shadow-[var(--shadow-glow-orange-xs)]">
        {ServiceIcons[service.icon] || ServiceIcons.web}
      </div>

      {/* Title + tagline */}
      <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-orange)] transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-[var(--text-small)] text-[var(--color-text-tertiary)] mb-4 italic">
        {service.tagline}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-1.5">
        {service.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-center gap-2 text-[var(--text-small)] text-[var(--color-text-secondary)]">
            <span className="w-1 h-1 rounded-full bg-[var(--color-orange)] shrink-0" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      {/* Arrow */}
      <div className="mt-5 flex items-center gap-1.5 text-[var(--text-small)] text-[var(--color-text-tertiary)] group-hover:text-[var(--color-orange)] transition-colors duration-300">
        <span>Learn more</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
          <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  </motion.div>
)

export default ServiceCard
