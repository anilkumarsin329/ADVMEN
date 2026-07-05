/**
 * components/ui/PortfolioCard.jsx
 * Portfolio / work item card with image hover and overlay.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@utils/formatters'
import { Tag } from './Badge'

const PortfolioCard = ({ item, index = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className={cn('group', className)}
  >
    <Link to={`/work/${item.slug}`} className="block">
      {/* Image */}
      <div className="relative overflow-hidden rounded-[var(--radius-2xl)] aspect-[4/3] bg-[var(--color-surface-2)] mb-4">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="img-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div className="absolute-fill bg-[var(--gradient-mesh)] flex items-center justify-center">
            <span className="text-[var(--color-text-tertiary)] text-[var(--text-small)]">No image</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
          <span className="inline-flex items-center gap-1.5 text-[var(--text-small)] font-medium text-white">
            View Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>

        {/* Year badge */}
        <span className="absolute top-3 right-3 badge-gray text-[10px]">{item.year}</span>
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text-primary)] group-hover:text-[var(--color-orange)] transition-colors duration-300 mb-1">
            {item.title}
          </h3>
          <p className="text-[var(--text-small)] text-[var(--color-text-tertiary)]">{item.category}</p>
        </div>
      </div>

      {/* Tags */}
      {item.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
    </Link>
  </motion.div>
)

export default PortfolioCard
