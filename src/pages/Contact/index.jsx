/**
 * pages/Contact/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Contact Us Page
 * Phase 10: Contact Page complete.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { gsap } from '@utils/gsapConfig'
import { EMAILJS } from '@utils/constants'

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import FAQSection    from '@components/sections/FAQ/FAQSection'

// Initialize EmailJS
if (EMAILJS.publicKey) {
  emailjs.init(EMAILJS.publicKey)
}

const Contact = () => {
  const containerRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-stagger', {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)',
        duration: 1.0,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.15,
        clearProps: 'all',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) newErrors.message = 'Message text is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Send email via EmailJS
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
          to_email: 'hello@advmen.com',
        }
      )

      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setIsSubmitting(false)
      setErrors({ submit: 'Failed to send message. Please try again.' })
    }
  }

  return (
    <PageTransition>
      <SEOHead
        title="Contact Us — ADVMEN Technologies"
        description="Get in touch with ADVMEN for project consulting, branding queries, or frontend engineering collaborations."
      />

      <section
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '4rem',
          background: 'var(--color-black)',
        }}
        aria-label="Contact Section"
      >
        <div className="container relative z-10">
          
          {/* Header Title */}
          <div className="max-w-3xl flex flex-col gap-6 mb-16">
            <div className="contact-stagger flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-orange)]" />
              <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>
                Start a conversation
              </span>
            </div>

            <h1
              className="contact-stagger section-title"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                lineHeight: 1.1,
                fontWeight: 'var(--weight-bold)',
                letterSpacing: '-0.02em',
              }}
            >
              Let's Build Something <span className="text-orange-gradient">Exceptional</span>.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            
            {/* Left Column — Contact Info Cards */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
              
              {/* Address details */}
              <div
                className="p-8 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-4">
                  Headquarters
                </h3>
                <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  ADVMEN Technologies Pvt. Ltd.<br />
                  Jharsa Village, Sector 38,<br />
                  Gurugram (Gurgaon), Haryana, India<br />
                  <span className="text-xs text-[var(--color-text-tertiary)] mt-2 block">Near Medanta – The Medicity</span>
                </p>
                <div className="flex flex-col gap-3 font-mono text-xs text-[var(--color-text-secondary)]">
                  <span>Mon - Fri: 9:00 AM - 6:00 PM (IST)</span>
                  <span>Sat - Sun: Closed</span>
                </div>
              </div>

              {/* Direct channels */}
              <div
                className="p-8 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-4">
                  Direct Connections
                </h3>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:hello@advmen.com"
                    className="flex justify-between items-center group font-mono text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                  >
                    <span>hello@advmen.com</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M3.5 7h7M8.5 4.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="tel:+918375008009"
                    className="flex justify-between items-center group font-mono text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                  >
                    <span>+91 83750 08009</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M3.5 7h7M8.5 4.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/918375008009?text=Hi%20ADVMEN%20Technologies%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                    className="flex justify-between items-center group font-mono text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors duration-300"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>WhatsApp Chat</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M3.5 7h7M8.5 4.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Google Map Embed */}
              <div
                className="h-64 rounded-2xl overflow-hidden relative"
                style={{
                  border: '1px solid rgba(255,255,255,0.03)',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.8234567890123!2d77.0592!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6c6c6c6c6c7%3A0x1234567890abcdef!2sJharsa%20Village%2C%20Sector%2038%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ADVMEN Technologies Location"
                />
              </div>

            </div>

            {/* Right Column — Premium Contact Form */}
            <div className="col-span-12 lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="p-8 lg:p-10 rounded-2xl flex flex-col gap-6"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,107,0,0.08)',
                  backdropFilter: 'blur(16px)',
                }}
                noValidate
              >
                
                {/* Name */}
                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Full Name <span className="text-[var(--color-orange)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-orange)] focus:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                  {errors.name && <span className="text-red-500 text-xs font-mono mt-1">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Email Address <span className="text-[var(--color-orange)]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-orange)] focus:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && <span className="text-red-500 text-xs font-mono mt-1">{errors.email}</span>}
                </div>

                {/* Phone & Subject split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-orange)] focus:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                      placeholder="+91 99999 99999"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-orange)] focus:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                      placeholder="Project Inquiry"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Project details / message <span className="text-[var(--color-orange)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-orange)] focus:bg-[rgba(255,255,255,0.04)] transition-all duration-300 resize-none"
                    placeholder="Briefly describe your objectives..."
                    required
                  />
                  {errors.message && <span className="text-red-500 text-xs font-mono mt-1">{errors.message}</span>}
                </div>

                {/* Submitting Message Feedback overlays */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg text-sm text-center font-mono"
                    style={{
                      background: 'rgba(255,107,0,0.08)',
                      border: '1px solid var(--color-orange)',
                      color: 'var(--color-orange)',
                    }}
                  >
                    Your message was transmitted successfully. We will reply within 24 hours.
                  </motion.div>
                )}

                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg text-sm text-center font-mono"
                    style={{
                      background: 'rgba(255,0,0,0.08)',
                      border: '1px solid #ff4444',
                      color: '#ff4444',
                    }}
                  >
                    {errors.submit}
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary btn-lg shine mt-4 py-3 flex items-center justify-center gap-2"
                  data-cursor="hover"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-dashed border-black animate-spin" />
                  ) : (
                    'Transmit Message'
                  )}
                </button>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* Integrate the FAQ accordion */}
      <FAQSection />
    </PageTransition>
  )
}

export default Contact
