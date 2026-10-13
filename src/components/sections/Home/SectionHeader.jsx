/**
 * SectionHeader.jsx — shared heading block for homepage sections
 */

import { motion } from 'framer-motion'

const SectionHeader = ({ eyebrow, title, subtitle, center = false, as: Tag = 'h2', className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6 }}
    className={`max-w-3xl mb-12 lg:mb-14 ${center ? 'mx-auto text-center' : ''} ${className}`}
  >
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <Tag className="section-title">{title}</Tag>
    {subtitle && (
      <p
        className="section-subtitle"
        style={center ? { marginLeft: 'auto', marginRight: 'auto' } : undefined}
      >
        {subtitle}
      </p>
    )}
  </motion.div>
)

export default SectionHeader
