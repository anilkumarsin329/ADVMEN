/**
 * PortfolioCard.jsx — Premium Portfolio Project Card
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { getImageUrl } from '@utils/constants'

const PortfolioCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      to={project.caseStudyUrl || `/work/${project.slug}`}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-[rgba(17,17,17,0.02)]">
        {/* Skeleton */}
        <div className="absolute inset-0 bg-[rgba(17,17,17,0.04)] animate-pulse" />
        {/* Actual Image */}
        <img
          src={getImageUrl(project.image) || null}
          alt={project.title}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          width="800"
          height="450"
          className="w-full h-full object-cover transition-transform duration-500 relative z-10"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isHovered
              ? 'rgba(0,0,0,0.4)'
              : 'rgba(0,0,0,0.2)',
          }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--color-white)',
              background: 'rgba(232,93,4,0.8)',
              padding: '0.4rem 0.8rem',
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'var(--weight-semibold)',
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Arrow Icon */}
        <div
          className="absolute bottom-4 right-4 z-10 transition-all duration-500"
          style={{
            transform: isHovered ? 'translate(4px, -4px)' : 'translate(0, 0)',
            opacity: isHovered ? 1 : 0.6,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(232,93,4,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-white)',
            }}
          >
            <FiArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="p-6 transition-all duration-500"
        style={{
          background: 'var(--color-surface-1)',
          border: '1px solid var(--color-border-subtle)',
          backdropFilter: 'blur(12px)',
          borderTop: 'none',
          borderRadius: '0 0 1rem 1rem',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-surface-2)'
          e.currentTarget.style.borderColor = 'rgba(232,93,4,0.35)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--color-surface-1)'
          e.currentTarget.style.borderColor = 'var(--color-border-subtle)'
        }}
      >
        {/* Title */}
        <h3
          className="group-hover:text-[var(--color-orange)] transition-colors duration-300 mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.5',
            marginBottom: '1rem',
          }}
        >
          {project.tagline}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {(project.technologies || project.tech || []).slice(0, 3).map((tech, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-text-tertiary)',
                background: 'rgba(232,93,4,0.05)',
                border: '1px solid rgba(232,93,4,0.1)',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {tech}
            </span>
          ))}
          {(project.technologies || project.tech || []).length > 3 && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-text-tertiary)',
                padding: '0.3rem 0.6rem',
              }}
            >
              +{(project.technologies || project.tech || []).length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default PortfolioCard
