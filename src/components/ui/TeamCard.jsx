/**
 * components/ui/TeamCard.jsx
 * Team member card with photo, role, and social links.
 */

import { motion } from 'framer-motion'
import { cn } from '@utils/formatters'

const TeamCard = ({ member, index = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className={cn('group', className)}
  >
    {/* Photo */}
    <div className="relative overflow-hidden rounded-[var(--radius-2xl)] aspect-[3/4] bg-[var(--color-surface-2)] mb-4">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="img-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : (
        <div className="absolute-fill bg-[var(--gradient-mesh)] flex items-center justify-center">
          <span className="text-[var(--color-text-tertiary)] text-4xl font-display font-bold">
            {member.name?.[0]}
          </span>
        </div>
      )}

      {/* Social overlay */}
      {member.socials && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5 gap-3">
          {member.socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform}
              className="btn-icon btn-icon-sm bg-[var(--color-glass-white-12)] border-white/20 text-white hover:bg-[var(--color-orange)] hover:border-[var(--color-orange)]"
            >
              {s.icon}
            </a>
          ))}
        </div>
      )}
    </div>

    {/* Info */}
    <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text-primary)] mb-0.5">
      {member.name}
    </h3>
    <p className="type-eyebrow text-[var(--color-orange)]">{member.role}</p>
    {member.bio && (
      <p className="text-[var(--text-small)] text-[var(--color-text-tertiary)] mt-2 truncate-2">
        {member.bio}
      </p>
    )}
  </motion.div>
)

export default TeamCard
