/**
 * AboutOffice.jsx — Culture & workspace gallery with Lightbox
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const spacesData = [
  {
    title: 'The Design Lab',
    desc: 'Where UI layout pixels, color models, and interactive mockups are engineered.',
    initials: 'LAB',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop&q=80',
    glow: 'radial-gradient(circle at 10% 20%, rgba(255,107,0,0.12) 0%, transparent 60%)',
    longDesc: 'Our Design Lab is where visual aesthetics meet structural layout logic. Equipped with professional design software, responsive testing rigs, and color-calibrated displays, this space is dedicated to crafting brand guidelines, component designs, and immersive layouts.',
  },
  {
    title: 'The War Room',
    desc: 'Strategy mapping, architecture blueprints, and code reviews take place here.',
    initials: 'WAR',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=80',
    glow: 'radial-gradient(circle at 90% 80%, rgba(255,61,0,0.12) 0%, transparent 60%)',
    longDesc: 'The War Room is the collaborative brain of our agency. Equipped with writeable wall surfaces and smart presentation tools, this is where we map API contracts, review codebase architectures, draft database schemas, and align client requirements.',
  },
  {
    title: 'Collaborative Space',
    desc: 'Open zones for pair programming, brainstorming, and cross-team alignment.',
    initials: 'COLLAB',
    image: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&h=600&fit=crop&q=80',
    glow: 'radial-gradient(circle at 20% 80%, rgba(255,140,56,0.1) 0%, transparent 60%)',
    longDesc: 'Our Open Collaborative Space is designed to break down vertical team silos. It features flexible seating, hot desks, and lounge pods optimized for quick brainstorms, peer programming sessions, and product design walk-throughs.',
  },
  {
    title: 'Deep Focus Zone',
    desc: 'Quiet pods equipped with multi-monitors optimized for production code compilation.',
    initials: 'FOCUS',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=600&fit=crop&q=80',
    glow: 'radial-gradient(circle at 80% 20%, rgba(204,85,0,0.12) 0%, transparent 60%)',
    longDesc: 'The Deep Focus Zone is a quiet sanctuary optimized for intensive coding and debugging cycles. Featuring soundproof partitions, ergonomic setups, and multi-monitor setups, this space ensures developers have zero distractions.',
  },
]

const AboutOffice = () => {
  const [activeSpace, setActiveSpace] = useState(null)

  return (
    <section
      className="relative w-full py-24"
      style={{
        background: 'var(--color-black)',
      }}
      aria-label="Workspace Gallery"
    >
      <div className="container relative z-10">
        
        {/* Title */}
        <div className="mb-16">
          <span className="eyebrow">Our Space</span>
          <h2 className="section-title mt-4">The Creative Ecosystem</h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {spacesData.map((space, i) => (
            <motion.div
              key={space.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -6, borderColor: 'rgba(255,107,0,0.2)' }}
              onClick={() => setActiveSpace(space)}
              className="group relative h-80 rounded-2xl p-8 overflow-hidden flex flex-col justify-end cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.03)',
                backdropFilter: 'blur(16px)',
                transition: 'border-color 0.4s ease',
              }}
              data-cursor="hover"
            >
              {/* Fallback Glow background */}
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: space.glow,
                }}
              />

              {/* Generative Dot Grid visual */}
              <div
                className="absolute inset-0 opacity-10 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)',
                  WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)',
                }}
              />

              {/* The Office Photo (blended with opacity for luxury dark theme) */}
              <img
                src={space.image}
                alt={space.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-750 pointer-events-none"
              />

              {/* Initials Accent Label */}
              <div
                className="absolute top-8 right-8 font-mono text-[var(--color-orange)] opacity-20 group-hover:opacity-40 transition-opacity duration-500 text-3xl font-bold uppercase tracking-widest pointer-events-none"
              >
                {space.initials}
              </div>

              {/* Content Panel */}
              <div className="relative z-10 flex flex-col gap-2 pointer-events-none">
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {space.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6',
                    maxWidth: '440px',
                  }}
                >
                  {space.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeSpace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSpace(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full p-8 lg:p-10 rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(15,15,15,0.7)',
                border: '1px solid rgba(255,107,0,0.18)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
              }}
            >
              {/* Blended background image on Lightbox */}
              <img
                src={activeSpace.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
              />

              {/* Close Button */}
              <button
                onClick={() => setActiveSpace(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[rgba(255,255,255,0.08)] text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] hover:border-[var(--color-orange)] transition-colors duration-300 relative z-10"
                aria-label="Close Lightbox"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Lightbox content */}
              <div className="flex flex-col gap-5 relative z-10">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-orange)]">
                  {activeSpace.initials} Space Overview
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {activeSpace.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.7',
                  }}
                >
                  {activeSpace.longDesc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default AboutOffice
