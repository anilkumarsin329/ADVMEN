/**
 * AboutTeam.jsx — Core leadership team cards
 */

import { motion } from 'framer-motion'

const teamData = [
  {
    name: 'Amritpal Singh',
    role: 'Co-founder & CEO',
    initials: 'AS',
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF8C38 100%)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Abhishek Devrani',
    role: 'Co-founder & CTO',
    initials: 'AD',
    gradient: 'linear-gradient(135deg, #0A0A0A 0%, #FF6B00 100%)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&q=80',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Sarah Jenkins',
    role: 'Creative Director',
    initials: 'SJ',
    gradient: 'linear-gradient(135deg, #FF8C38 0%, #FF4500 100%)',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop&q=80',
    socials: { linkedin: '#', dribbble: '#' },
  },
  {
    name: 'Rajesh Kumar',
    role: 'Technical Lead',
    initials: 'RK',
    gradient: 'linear-gradient(135deg, #FF3D00 0%, #FF8C38 100%)',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop&q=80',
    socials: { linkedin: '#', github: '#' },
  },
]

const AboutTeam = () => {
  return (
    <section
      className="relative w-full py-24"
      style={{
        background: 'var(--color-black)',
      }}
      aria-label="Core Team"
    >
      <div className="container relative z-10">
        
        {/* Title */}
        <div className="mb-16">
          <span className="eyebrow">Our Crew</span>
          <h2 className="section-title mt-4">The Minds Behind ADVMEN</h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              whileHover={{ y: -6, borderColor: 'rgba(255,107,0,0.25)' }}
              className="group relative flex flex-col p-6 rounded-2xl cursor-default"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.4s ease',
              }}
            >
              
              {/* Premium Avatar Container */}
              <div
                className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 flex items-center justify-center"
                style={{
                  background: 'var(--color-surface-1)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {/* Fallback background flow gradient */}
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    background: member.gradient,
                  }}
                />

                {/* Fallback Initials */}
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--weight-bold)',
                    fontSize: '3rem',
                    color: 'var(--color-white)',
                    opacity: 0.25,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    userSelect: 'none',
                  }}
                  className="absolute"
                >
                  {member.initials}
                </span>

                {/* Profile headshot image */}
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
              </div>

              {/* Name & Role */}
              <div className="flex-1 flex flex-col justify-end">
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-caption)',
                    color: 'var(--color-orange)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '1rem',
                  }}
                >
                  {member.role}
                </p>
              </div>

              {/* Social Links Popover */}
              <div className="flex items-center gap-3">
                {Object.keys(member.socials).map((platform) => (
                  <a
                    key={platform}
                    href={member.socials[platform]}
                    className="p-2 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] hover:border-[var(--color-orange)] transition-colors duration-300"
                    aria-label={`${member.name} ${platform}`}
                  >
                    <span className="text-[0.68rem] font-mono uppercase tracking-wider">
                      {platform}
                    </span>
                  </a>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default AboutTeam
