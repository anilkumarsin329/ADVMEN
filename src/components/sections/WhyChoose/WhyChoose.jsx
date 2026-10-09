/**
 * WhyChoose.jsx — Enhanced with Premium Graphics
 * Better animations, visual hierarchy, and interactive elements
 */

import { motion } from 'framer-motion'
import { FiZap, FiTarget, FiEye, FiTrendingUp, FiAward } from 'react-icons/fi'

const values = [
  {
    title: 'Synergy',
    desc: 'SEO, AEO, GEO, content, branding, performance marketing, and web solutions work together as one connected growth strategy.',
    icon: FiZap,
    number: '01',
  },
  {
    title: 'Reach',
    desc: 'India-first expertise with the capability to support brands targeting competitive international markets across the USA, UAE & Europe.',
    icon: FiTrendingUp,
    number: '02',
  },
  {
    title: 'Visibility',
    desc: 'Visibility beyond traditional rankings, including answer-based and AI-powered search experiences.',
    icon: FiEye,
    number: '03',
  },
  {
    title: 'Intelligence',
    desc: 'Real data and insights so you can target the right traffic, get genuine leads, boost conversions, and drive business results.',
    icon: FiTarget,
    number: '04',
  },
  {
    title: 'Impact',
    desc: 'Connecting visibility with purposeful digital experiences created to guide audiences from discovery to meaningful action.',
    icon: FiAward,
    number: '05',
  },
  {
    title: 'Precision',
    desc: 'Every strategy starts with understanding your audience, competition, search behaviour, market, and your real business goals.',
    icon: FiTarget,
    number: '06',
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
          pointerEvents: 'none',
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
          background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
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
          <h2 className="section-title mt-4">
            Not Just Another Agency. <span className="text-orange-gradient">Here's Why ADVMEN Leads</span>
          </h2>
          <p className="section-subtitle">
            We combine technical excellence with creative vision to deliver results that exceed expectations.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </section>
  )
}

export default WhyChoose
