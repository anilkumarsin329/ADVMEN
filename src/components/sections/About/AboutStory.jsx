/**
 * AboutStory.jsx — Company Story, Mission & Vision
 */

import { motion } from 'framer-motion'

const AboutStory = () => {
  return (
    <section
      className="relative w-full py-20 overflow-hidden"
      style={{
        background: 'var(--color-black)',
      }}
      aria-label="Company Story & Values"
    >
      {/* Visual background highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.015) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column — The Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-7 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-orange)]" />
              <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>
                Our Heritage
              </span>
            </div>

            <h2 className="section-title">
              Crafting Digital Solutions That Power Modern Businesses.
            </h2>

            <div className="flex flex-col gap-6 text-[rgba(255,255,255,0.7)]" style={{ lineHeight: '1.8' }}>
              <p>
                ADVMEN Technologies began as a core team of senior developers and visual designers frustrated 
                by average agency templates. We set out to create an engineering-first shop that respects design 
                purity, writing clean code that executes fast, performs perfectly, and engages users with premium, 
                fluid motion.
              </p>
              <p>
                Today, we work with ambitious enterprises and startups alike, serving as a dedicated digital arm 
                for engineering and design. We build tools, design interfaces, and implement marketing growth models 
                that help our partners scale effectively, with products crafted with meticulous attention to detail.
              </p>
            </div>
          </motion.div>

          {/* Right Column — Mission & Vision Cards */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 justify-center">
            
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(255,107,0,0.3)' }}
              className="p-8 rounded-2xl cursor-default"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                transition: 'border-color 0.4s ease',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-orange)]" />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Our Mission
                </h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                To empower companies through pixel-perfect design systems, high-speed applications, 
                and advanced digital systems that stand out, scale seamlessly, and generate high value.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -4, borderColor: 'rgba(255,107,0,0.3)' }}
              className="p-8 rounded-2xl cursor-default"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                transition: 'border-color 0.4s ease',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-orange)]" />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Our Vision
                </h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                To build a world-class creative engineering hub recognized for pushing boundaries in 
                UX animation, performance optimization, and reliable technical solutions.
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutStory
