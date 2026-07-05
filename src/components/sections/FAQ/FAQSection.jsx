/**
 * FAQSection.jsx — Interactive Accordion FAQ block
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqData = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Timeline spans between 4 to 12 weeks depending on scope complexity. A custom brand identity usually requires 4-6 weeks, while a bespoke React/Next.js corporate website requires 8-12 weeks from mapping to production release.',
  },
  {
    question: 'Do you work with early startups or only enterprises?',
    answer: 'We collaborate with both. For early-stage startups, we focus on launching high-speed MVPs, interactive SaaS front-ends, and clear brand identity. For enterprises, we audit existing system architectures, build headless migrations, and design scalable design libraries.',
  },
  {
    question: 'What technologies do you use for web development?',
    answer: 'We build primarily using React 19, Vite, Next.js, and Tailwind CSS. For interactive 3D assets, we integrate Three.js, React Three Fiber, and custom WebGL engines. For page transitions and scroll physics, we configure GSAP, Framer Motion, and Lenis.',
  },
  {
    question: 'How do you handle project communication?',
    answer: 'We set up dedicated Slack channels for instant technical syncs, share Figma workspace files for design feedback, and run bi-weekly video sprint reviews to walk through deployment updates.',
  },
  {
    question: 'Do you provide post-launch support and hosting?',
    answer: 'Yes. We offer monthly maintenance packages covering core package updates, cloud server configurations, threat monitoring, and technical SEO updates to keep your search ranking status stable.',
  },
]

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className="border-b border-[var(--color-border-subtle)] py-4 md:py-5 cursor-pointer transition-all duration-300 hover:border-[var(--color-orange)]/30"
      onClick={onClick}
    >
      <div className="flex justify-between items-start md:items-center gap-3 md:gap-4">
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            fontWeight: 'var(--weight-semibold)',
            color: isOpen ? 'var(--color-orange)' : 'var(--color-text-primary)',
            transition: 'color 0.3s ease',
            lineHeight: '1.4',
          }}
        >
          {question}
        </h3>
        
        {/* Toggle icon */}
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[var(--color-text-tertiary)] flex-shrink-0 mt-1 md:mt-0"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="w-4 h-4 md:w-[18px] md:h-[18px]">
            <path d="M9 3.75v10.5M3.75 9h10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 1.5vw, 0.92rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        background: 'var(--color-black)',
      }}
      aria-label="FAQ"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Title */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <span className="eyebrow text-xs md:text-sm">FAQ</span>
            <h2 className="section-title text-2xl md:text-3xl lg:text-4xl">Got Questions?</h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              Here are answers to the most common questions regarding our process, technologies, and pricing structures.
            </p>
          </div>

          {/* Right Accordion */}
          <div className="col-span-1 md:col-span-2 lg:col-span-8 flex flex-col w-full">
            {faqData.map((item, index) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default FAQSection
