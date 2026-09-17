/**
 * AboutTeam.jsx — Core Leadership & Team Cards (Responsive)
 */

import { motion } from 'framer-motion'
import { FiLinkedin, FiTwitter, FiGithub, FiUserPlus } from 'react-icons/fi'

const teamData = [
  {
    name: 'Mr. Govind Goyal',
    role: 'Founder',
    initials: 'GG',
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF8C38 100%)',
    image: '/about-image/Advmen Founder.webp',
    bio: '8+ years of experience in Media, Technology & Brand Communication. Leads Strategy & Outreach.',
    isPlaceholder: false,
  },
  {
    name: 'Chirag Verma',
    role: 'Director',
    initials: 'CV',
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF8C38 100%)',
    image: '/about-image/Chirag Verma — Director.jpeg',
    bio: 'Experienced in business strategy, operations, team leadership, business development, and driving organizational growth.',
    isPlaceholder: false,
  },
  {
    name: 'Anil Kumar Singh',
    role: 'Senior Developer & CIO',
    initials: 'AS',
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #E05600 100%)',
    image: '/about-image/Advmen Anil kumar sing Senior Developer & CIO.webp',
    bio: 'Leads core IT infrastructure, cloud architecture, and enterprise software engineering.',
    isPlaceholder: false,
  },

  {
    name: 'Abhay Sanwal',
    role: 'Senior UI/UX Developer & TL',
    initials: 'AS',
    gradient: 'linear-gradient(135deg, #FF5500 0%, #FF8C38 100%)',
    image: '/about-image/Advmen abhay UI UX developer.webp',
    bio: 'Crafts pixel-perfect digital interfaces, design systems, and modern web user experiences.',
    isPlaceholder: false,
  },
  {
    name: 'Krishna Kumar',
    role: 'Senior MERN Stack Developer',
    initials: 'KK',
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF8526 100%)',
    image: '/about-image/Advmen Krishna kumar Mern stack developer.webp',
    bio: 'Specializes in full-stack JavaScript engineering, Node.js REST APIs, MongoDB schemas, and scalable web apps.',
    isPlaceholder: false,
  },
  {
    name: 'Aman',
    role: 'Senior App Developer',
    initials: 'A',
    gradient: 'linear-gradient(135deg, #FF8526 0%, #E05600 100%)',
    image: '/about-image/Advmen Aman app developer.webp',
    bio: 'Builds high-performance native & cross-platform mobile applications for iOS and Android ecosystems.',
    isPlaceholder: false,
  },
]

const AboutTeam = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'clamp(2.5rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
        background: 'var(--color-black)',
      }}
      aria-label="Core Team"
    >
      <div className="container relative z-10">
        
        {/* Title */}
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <span 
            className="eyebrow"
            style={{
              fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
              color: 'var(--color-orange)',
            }}
          >
            OUR LEADERSHIP & TEAM
          </span>
          <h2 
            className="section-title mt-2 font-display font-bold text-gray-100"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            }}
          >
            The Minds Behind ADVMEN
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
            Meet the engineers, strategists, and designers driving innovation and business growth.
          </p>
        </div>

        {/* Team Grid (3 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamData.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col p-5 sm:p-6 rounded-2xl cursor-default transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              
              {/* Image Container */}
              <div
                className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-black flex items-center justify-center border border-white/10"
                style={{ background: '#000000' }}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 bg-black"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
                    <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/20 text-[var(--color-orange)] flex items-center justify-center mb-2">
                      <FiUserPlus size={24} />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400">
                      Position Reserved
                    </span>
                  </div>
                )}
                
                {/* Subtle gradient vignette */}
                {member.image && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(18, 18, 21, 0.7) 0%, transparent 50%)',
                    }}
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-gray-100 group-hover:text-[var(--color-orange)] transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-[var(--color-orange)] uppercase tracking-wider mt-0.5">
                    {member.role}
                  </div>
                  <p className="text-xs text-gray-400 mt-2.5 leading-relaxed font-body">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutTeam
