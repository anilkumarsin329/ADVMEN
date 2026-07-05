/**
 * AboutHero.jsx — Premium Intro Section (Responsive)
 */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@utils/gsapConfig'

const AboutHero = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-hero-stagger', {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)',
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out',
        delay: 0.2,
        clearProps: 'all',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'calc(var(--navbar-height) + clamp(2rem, 5vw, 4rem))',
        paddingBottom: 'clamp(2rem, 5vw, 4rem)',
        background: 'var(--color-black)',
      }}
      aria-label="About Hero"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column — Text */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            <div className="about-hero-stagger flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-orange)]" />
              <span 
                className="type-eyebrow" 
                style={{ 
                  color: 'var(--color-orange)',
                  fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                }}
              >
                About ADVMEN
              </span>
            </div>

            <h1
              className="about-hero-stagger section-title"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
                fontWeight: 'var(--weight-bold)',
                letterSpacing: '-0.02em',
              }}
            >
              We are the <span className="text-orange-gradient">Architects</span> of Digital Dominance.
            </h1>

            <p
              className="about-hero-stagger type-body-lg"
              style={{
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '600px',
                fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
              }}
            >
              ADVMEN Technologies is a premium creative engineering agency. We blend bold design aesthetics 
              with high-performance software engineering to build digital ecosystems that elevate brands, 
              dominate markets, and accelerate business growth.
            </p>
          </div>

          {/* Right Column — Premium Floating Orb */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <motion.div
              animate={{
                y: [-12, 12, -12],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative rounded-full flex items-center justify-center"
              style={{
                width: 'clamp(200px, 50vw, 320px)',
                height: 'clamp(200px, 50vw, 320px)',
                background: 'radial-gradient(circle at 30% 30%, rgba(255,107,0,0.15) 0%, transparent 60%)',
                border: '1px solid rgba(255,107,0,0.12)',
                boxShadow: 'inset 0 0 24px rgba(255,107,0,0.05)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Core solid glow */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 'clamp(60px, 15vw, 96px)',
                  height: 'clamp(60px, 15vw, 96px)',
                  background: 'var(--color-orange)',
                  filter: 'blur(40px)',
                  opacity: 0.35,
                }}
              />

              {/* Glass Ring 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full border border-dashed border-[rgba(255,255,255,0.08)]"
                style={{
                  inset: 'clamp(0.5rem, 2vw, 1rem)',
                }}
              />

              {/* Glass Ring 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full border border-double border-[rgba(255,107,0,0.15)]"
                style={{
                  inset: 'clamp(1.5rem, 4vw, 2.5rem)',
                }}
              />

              {/* Subtle Tech Brand Initials */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-bold)',
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                  color: 'var(--color-white)',
                  opacity: 0.18,
                  letterSpacing: '0.05em',
                }}
              >
                AM
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutHero
