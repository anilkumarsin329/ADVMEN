/**
 * FAQSection.jsx — Interactive Accordion FAQ block
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqData = [
  {
    question: 'What services does ADVMEN offer?',
    answer: 'ADVMEN offers 360 digital marketing services, including SEO, AEO, GEO, web development and e-commerce, mobile app development, AI-powered search optimization, digital marketing, API integrations, and custom digital solutions.',
  },
  {
    question: 'Does ADVMEN provide digital marketing services in India?',
    answer: 'Indeed. Whether you are a startup in India or an established business willing to grow your brand digitally, ADVMEN provides digital marketing in India and beyond.',
  },
  {
    question: 'Does ADVMEN work with international businesses?',
    answer: 'Absolutely. ADVMEN collaborates with international businesses, creating digital solutions that fit different markets, audiences, and business goals.',
  },
  {
    question: 'What is the difference between SEO, AEO and GEO?',
    answer: 'SEO improves visibility on search engines. AEO helps your content show up in direct-answer queries, while GEO focuses on visibility across AI-driven search results.',
  },
  {
    question: 'How does ADVMEN help businesses appear in AI search results?',
    answer: 'ADVMEN uses AI search optimization, structured content, entity-focused strategies, and GEO techniques to boost your brand\'s presence in AI-powered search results.',
  },
  {
    question: 'What is AI search optimization?',
    answer: 'AI search optimization makes your content more relevant and understandable to AI-powered search platforms. It improves the chances of being referenced in AI-generated answers.',
  },
  {
    question: 'Does ADVMEN provide website development services?',
    answer: 'Yes. ADVMEN builds websites that focus on performance, usability, scalability, SEO, and your business needs.',
  },
  {
    question: 'What types of websites does ADVMEN develop?',
    answer: 'ADVMEN develops business sites, corporate websites, service platforms, portfolios, e-commerce sites, web portals, and custom digital platforms.',
  },
  {
    question: 'Does ADVMEN build e-commerce websites?',
    answer: 'Yes. ADVMEN develops e-commerce websites complete with product catalogs, payment gateways, integrations, responsive designs, and scalable features.',
  },
  {
    question: 'Does ADVMEN develop Android and iOS apps?',
    answer: 'Yes, ADVMEN designs and develops Android and iOS apps for speed, smooth user experience, and flawless integration with your digital presence.',
  },
  {
    question: 'What types of mobile applications does ADVMEN build?',
    answer: 'ADVMEN delivers Android app development, iOS app development, cross-platform app development, custom mobile app development, business & enterprise apps, e-commerce apps, booking & service apps, API & backend integration, UI/UX design, and app performance optimization.',
  },
  {
    question: 'Does ADVMEN provide API and third-party integrations?',
    answer: 'Yes. ADVMEN provides API development and third-party integrations to connect websites, mobile applications, e-commerce platforms, and custom digital products.',
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
            <h2 className="section-title text-2xl md:text-3xl lg:text-4xl">Frequently Asked Questions</h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              Everything you need to know about our digital marketing and technology services.
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
