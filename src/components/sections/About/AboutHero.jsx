/**
 * AboutHero.jsx — Executive Founder Profile & Leadership Section
 */

import { useEffect, useRef } from 'react'
import { FiBriefcase, FiTarget, FiUsers, FiZap, FiAward } from 'react-icons/fi'
import { gsap } from '@utils/gsapConfig'

const founderHighlights = [
  {
    icon: FiBriefcase,
    text: '8-9+ years of experience in Media, Technology & Brand Communication',
  },
  {
    icon: FiTarget,
    text: 'Expertise in Digital Strategy, Technology Solutions, Communications & Social Campaigns',
  },
  {
    icon: FiUsers,
    text: "Leads the Foundation's Strategy, Technology, Media Relations & Public Outreach",
  },
  {
    icon: FiZap,
    text: 'Passionate about leveraging technology and community participation to create sustainable social impact.',
  },
]

const AboutHero = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-hero-stagger', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'calc(var(--navbar-height) + clamp(1.5rem, 3vw, 2.5rem))',
        paddingBottom: 'clamp(4rem, 6vw, 6rem)',
        background: 'var(--color-black)',
      }}
      aria-label="Founder & Leadership"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column — Founder Details & Key Highlights */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
            <div className="about-hero-stagger flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-orange)]" />
              <span 
                className="type-eyebrow uppercase font-mono tracking-widest text-xs" 
                style={{ color: 'var(--color-orange)' }}
              >
                LEADERSHIP & VISION
              </span>
            </div>

            <div className="about-hero-stagger space-y-1">
              <h1
                className="font-display font-bold text-white tracking-tight"
                style={{
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                  lineHeight: 1.08,
                }}
              >
                Mr. Govind Goyal
              </h1>
              <div className="text-[var(--color-orange)] font-semibold text-lg sm:text-xl font-body">
                Co-Founder & Director
              </div>
            </div>

            {/* Highlights List */}
            <div className="about-hero-stagger space-y-3 mt-1">
              {founderHighlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-300 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-500/15 border border-orange-500/25 text-[var(--color-orange)] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={17} />
                    </div>
                    <p className="text-gray-200 text-xs sm:text-sm leading-relaxed font-body font-normal">
                      {item.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column — Clean Luxury Portrait Image Frame */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden border border-orange-500/25 shadow-[0_20px_60px_rgba(255,107,0,0.12)] bg-gray-950 group">
              <img
                src="/about image/Advmen Founder.jpeg"
                alt="Govind Goyal — Co-Founder & Director"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Subtle top-to-bottom vignette overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(18, 18, 21, 0.4) 0%, transparent 40%)',
                }}
              />

              {/* Floating Leadership Badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/40 flex items-center gap-2 shadow-lg">
                <FiAward className="text-[var(--color-orange)]" size={14} />
                <span className="text-white font-mono text-xs font-bold">
                  8+ Years Leadership
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutHero
