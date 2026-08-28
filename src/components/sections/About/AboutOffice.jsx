/**
 * AboutOffice.jsx — Culture & Workspace Gallery with Interactive Lightbox
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMaximize2, FiMapPin } from 'react-icons/fi'

const officePhotos = [
  {
    id: 1,
    title: 'Development & Engineering Floor',
    category: 'Engineering Zone',
    image: '/about image/Advmen1.jpeg',
    description: 'High-performance engineering floor equipped for deep software development and system architecture.',
  },
  {
    id: 2,
    title: 'Technology & Tech Stack Suite',
    category: 'Tech Suite',
    image: '/about image/Advmen2.jpeg',
    description: 'Dedicated tech setup for cloud management, backend compiling, and real-time app testing.',
  },
  {
    id: 3,
    title: 'Creative UI/UX Design Studio',
    category: 'Design Studio',
    image: '/about image/Advmen3.jpeg',
    description: 'Where UI layout mockups, color systems, and brand design prototypes are engineered.',
  },
  {
    id: 4,
    title: 'Executive Conference & Strategy Room',
    category: 'War Room',
    image: '/about image/Advmen4.jpeg',
    description: 'High-tech conference environment for client presentations and strategic roadmap planning.',
  },
  {
    id: 5,
    title: 'Brainstorming & Innovation Pods',
    category: 'Innovation Zone',
    image: '/about image/Advmen5.jpeg',
    description: 'Collaborative open spaces for pair programming and cross-team strategy sessions.',
  },
  {
    id: 6,
    title: 'Client Collaboration & Media Hub',
    category: 'Media Hub',
    image: '/about image/Advmen6.jpeg',
    description: 'Media production, video editing, and client interaction studio.',
  },
  {
    id: 7,
    title: 'Operations & Strategy HQ',
    category: 'Headquarters',
    image: '/about image/Advmen8.jpeg',
    description: 'Central operations hub managing project delivery and client growth strategies.',
  },
]

const AboutOffice = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <section
      className="relative w-full py-20 sm:py-24"
      style={{
        background: 'var(--color-black)',
      }}
      aria-label="Workspace Gallery"
    >
      <div className="container relative z-10">
        
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-2">
            <FiMapPin className="text-[var(--color-orange)]" size={16} />
            <span className="eyebrow uppercase font-mono tracking-widest text-xs text-[var(--color-orange)]">
              OUR WORKSPACE & CULTURE
            </span>
          </div>
          <h2 className="section-title mt-2 font-display font-bold text-gray-100 text-2xl sm:text-4xl">
            Inside the ADVMEN Ecosystem
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
            Explore our state-of-the-art office infrastructure where engineering meets design excellence.
          </p>
        </div>

        {/* Office Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {officePhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-900 border border-white/10 hover:border-orange-500/40 transition-all duration-500"
            >
              {/* Photo */}
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
                style={{
                  background: 'linear-gradient(to top, rgba(18, 18, 21, 0.9) 0%, rgba(18, 18, 21, 0.2) 60%, transparent 100%)',
                }}
              />

              {/* Category Pill */}
              <span className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md border border-orange-500/30 text-[var(--color-orange)] font-mono text-[10px] font-bold uppercase tracking-wider rounded-full">
                {photo.category}
              </span>

              {/* Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FiMaximize2 size={14} />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-display font-bold text-base text-gray-100 group-hover:text-[var(--color-orange)] transition-colors line-clamp-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                  {photo.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Lightbox Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div>
                  <span className="text-[var(--color-orange)] font-mono text-xs font-bold uppercase tracking-wider">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="text-white font-bold text-lg">{selectedPhoto.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Lightbox Image */}
              <div className="relative aspect-video w-full bg-black">
                <img 
                  src={selectedPhoto.image} 
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain" 
                />
              </div>

              {/* Lightbox Description */}
              <div className="p-4 bg-black/60 text-gray-300 text-sm">
                {selectedPhoto.description}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default AboutOffice
