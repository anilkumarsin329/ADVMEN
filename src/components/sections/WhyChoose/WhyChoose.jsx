/**
 * WhyChoose.jsx — Why Choose ADVMEN Section
 */

import { motion } from 'framer-motion'

const values = [
  {
    title: 'Engineering-First',
    desc: 'We write performant, clean React/Next.js architectures with zero bloating, targeting high speeds.',
    icon: '01',
  },
  {
    title: 'Design Purity',
    desc: 'We honor your brand guidelines and Figma layouts down to the single pixel, ensuring high-fidelity results.',
    icon: '02',
  },
  {
    title: 'Full Transparency',
    desc: 'Work directly with senior developers and creative directors. No account management bloat or hidden overhead.',
    icon: '03',
  },
  {
    title: 'Scale & Performance',
    desc: 'Systems designed to load fast, rank high on search engines, and handle enterprise-level user traffic.',
    icon: '04',
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
      <div className="container relative z-10">
        
        {/* Header Title */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow">Our Values</span>
          <h2 className="section-title mt-4">Why Ambitious Brands Partner with Us</h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: 'rgba(255,107,0,0.25)' }}
              className="group p-8 rounded-2xl cursor-default flex flex-col justify-between"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.4s ease',
                minHeight: '260px',
              }}
            >
              <div className="flex flex-col gap-4">
                <span
                  className="font-mono text-3xl font-extrabold text-[var(--color-orange)] opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                >
                  {val.icon}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {val.title}
                </h3>
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhyChoose
