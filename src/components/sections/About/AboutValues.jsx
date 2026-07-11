/**
 * AboutValues.jsx — Core Values Section
 */

import { motion } from 'framer-motion'

const AboutValues = () => {
  const values = [
    {
      title: 'Excellence',
      description: 'We pursue perfection in every pixel, every line of code, and every interaction. Quality is non-negotiable.',
      icon: '✨',
    },
    {
      title: 'Innovation',
      description: 'We stay ahead of trends, experiment boldly, and push the boundaries of what\'s possible in digital design.',
      icon: '🚀',
    },
    {
      title: 'Integrity',
      description: 'We build trust through transparency, honest communication, and delivering on our promises consistently.',
      icon: '🤝',
    },
    {
      title: 'Collaboration',
      description: 'We believe the best solutions emerge from diverse perspectives working together toward a shared vision.',
      icon: '🎯',
    },
    {
      title: 'Impact',
      description: 'We measure success by the tangible results we deliver—growth, engagement, and lasting value for our partners.',
      icon: '📈',
    },
    {
      title: 'Craft',
      description: 'We take pride in our work, treating every project as an opportunity to create something remarkable and timeless.',
      icon: '🎨',
    },
  ]

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'clamp(2rem, 5vw, 4rem)',
        paddingBottom: 'clamp(2rem, 5vw, 4rem)',
        background: 'var(--color-black)',
      }}
      aria-label="Core Values"
    >
      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-[var(--color-orange)]" />
            <span 
              className="type-eyebrow" 
              style={{ 
                color: 'var(--color-orange)',
                fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
              }}
            >
              What Drives Us
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            }}
          >
            Our Core Values
          </motion.h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-2xl cursor-default group"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.4s ease',
              }}
            >
              <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.75rem',
                }}
              >
                {value.title}
              </h3>
              <p 
                style={{ 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: '1.6', 
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                }}
              >
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutValues
