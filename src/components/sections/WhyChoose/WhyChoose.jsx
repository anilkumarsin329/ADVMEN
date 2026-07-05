/**
 * WhyChoose.jsx — Enhanced with Premium Graphics
 * Better animations, visual hierarchy, and interactive elements
 */

import { motion } from 'framer-motion'
import { FiZap, FiTarget, FiEye, FiTrendingUp } from 'react-icons/fi'

const values = [
  {
    title: 'Engineering-First',
    desc: 'We write performant, clean React/Next.js architectures with zero bloating, targeting high speeds.',
    icon: FiZap,
    color: 'from-orange-500/20 to-orange-600/10',
    borderColor: 'rgba(255, 107, 0, 0.3)',
    number: '01',
  },
  {
    title: 'Design Purity',
    desc: 'We honor your brand guidelines and Figma layouts down to the single pixel, ensuring high-fidelity results.',
    icon: FiEye,
    color: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    number: '02',
  },
  {
    title: 'Full Transparency',
    desc: 'Work directly with senior developers and creative directors. No account management bloat or hidden overhead.',
    icon: FiTarget,
    color: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    number: '03',
  },
  {
    title: 'Scale & Performance',
    desc: 'Systems designed to load fast, rank high on search engines, and handle enterprise-level user traffic.',
    icon: FiTrendingUp,
    color: 'from-green-500/20 to-green-600/10',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    number: '04',
  },
]

const WhyChoose = () => {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
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
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      <div className="container relative z-10">
        
        {/* Header Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block mb-4">
            <span
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: 'rgba(255, 107, 0, 0.1)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                color: 'var(--color-orange)',
              }}
            >
              💎 Our Values
            </span>
          </div>
          <h2 className="section-title mt-4">Why Ambitious Brands Partner with Us</h2>
          <p
            className="mt-4 text-lg"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: '1.7',
            }}
          >
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
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div
                  className="relative h-full p-8 rounded-2xl cursor-default flex flex-col justify-between overflow-hidden transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${val.color.split(' ')[1]} 0%, ${val.color.split(' ')[3]} 100%)`,
                    border: `1.5px solid ${val.borderColor}`,
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    minHeight: '300px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 60px ${val.borderColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                    e.currentTarget.style.borderColor = val.borderColor.replace('0.3', '0.6')
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.borderColor = val.borderColor
                  }}
                >
                  {/* Animated background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${val.borderColor} 0%, transparent 70%)`,
                      filter: 'blur(40px)',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Number Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${val.borderColor}40`,
                          border: `1px solid ${val.borderColor}`,
                        }}
                      >
                        <Icon size={24} style={{ color: 'var(--color-orange)' }} />
                      </div>
                      <span
                        className="font-mono text-2xl font-extrabold opacity-30 group-hover:opacity-60 transition-opacity duration-300"
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
                      className="group-hover:text-orange-400"
                    >
                      {val.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-small)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                      }}
                    >
                      {val.desc}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="relative z-10 mt-6 flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                    <span className="text-xs font-semibold">Explore</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
