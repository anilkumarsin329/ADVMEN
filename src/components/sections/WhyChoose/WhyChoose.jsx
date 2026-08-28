/**
 * WhyChoose.jsx — Enhanced with Premium Graphics
 * Better animations, visual hierarchy, and interactive elements
 */

import { motion } from 'framer-motion'
import { FiZap, FiTarget, FiEye, FiTrendingUp, FiAward } from 'react-icons/fi'

const values = [
  {
    title: 'Engineering-First',
    desc: 'We write performant, clean React/Next.js architectures with zero bloating, targeting high speeds.',
    icon: FiZap,
    number: '01',
  },
  {
    title: 'Design Purity',
    desc: 'We honor your brand guidelines and Figma layouts down to the single pixel, ensuring high-fidelity results.',
    icon: FiEye,
    number: '02',
  },
  {
    title: 'Full Transparency',
    desc: 'Work directly with senior developers and creative directors. No account management bloat or hidden overhead.',
    icon: FiTarget,
    number: '03',
  },
  {
    title: 'Scale & Performance',
    desc: 'Systems designed to load fast, rank high on search engines, and handle enterprise-level user traffic.',
    icon: FiTrendingUp,
    number: '04',
  },
]

const WhyChoose = () => {
  return (
    <section
      className="section"
      style={{
        background: 'var(--color-black)',
      }}
      aria-label="Why Choose ADVMEN"
    >
      {/* Animated background glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      <div className="container relative z-10">
        
        {/* Header Title */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span
              className="badge-orange"
            >
              <FiAward size={14} /> Our Values
            </span>
          </div>
          <h2 className="section-title mt-4">Why Ambitious Brands Partner with Us</h2>
          <p className="section-subtitle">
            We combine technical excellence with creative vision to deliver results that exceed expectations.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group relative h-full flex flex-col"
              >
                <div
                  className="card-glass flex flex-col h-full justify-between"
                  style={{
                    padding: '2rem 1.5rem',
                  }}
                >
                  <div className="flex flex-col gap-5">
                    {/* Number Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <div
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: 'var(--color-surface-4)',
                          boxShadow: 'var(--shadow-neu-inset)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-orange)',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <span
                        className="font-mono text-2xl font-extrabold opacity-20 group-hover:opacity-60 transition-opacity duration-300"
                        style={{ color: 'var(--color-orange)' }}
                      >
                        {val.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--weight-bold)',
                        color: 'var(--color-text-primary)',
                        transition: 'color 0.3s ease',
                      }}
                      className="group-hover:text-[var(--color-orange-light)]"
                    >
                      {val.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                      }}
                    >
                      {val.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
      `}</style>
    </section>
  )
}

export default WhyChoose
