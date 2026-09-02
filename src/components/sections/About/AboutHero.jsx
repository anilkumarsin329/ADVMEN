/**
 * AboutHero.jsx — Executive Founder Profile & Leadership Section
 */

import { useEffect, useRef } from 'react'
import { FiBriefcase, FiTarget, FiUsers, FiZap, FiAward, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { gsap } from '@utils/gsapConfig'
import MagneticButton from '@components/ui/MagneticButton'

const founderHighlights = [
  {
    icon: FiBriefcase,
    text: '8+ years of experience in Media, Technology & Brand Communication',
  },
  {
    icon: FiTarget,
    text: 'Expertise in Digital Strategy, Technology Solutions, Communications & Social Campaigns',
  },
  {
    icon: FiUsers,
    text: "Leads ADVMEN's Strategy, Technology, Client Relations & Business Development",
  },
  {
    icon: FiZap,
    text: 'Passionate about leveraging technology and data-driven strategies to deliver measurable business outcomes.',
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
      aria-label="About ADVMEN & Leadership"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column — Company Intro First, Then Founder Details */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            
            {/* Eyebrow */}
            <div className="about-hero-stagger flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-orange)]" />
              <span 
                className="type-eyebrow uppercase font-mono tracking-widest text-xs" 
                style={{ color: 'var(--color-orange)' }}
              >
                ABOUT ADVMEN & LEADERSHIP
              </span>
            </div>

            {/* 1️⃣ COMPANY INTRODUCTION FIRST */}
            <div className="about-hero-stagger space-y-3">
              <h1
                className="font-display font-bold text-white tracking-tight"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
                  lineHeight: 1.12,
                }}
              >
                Crafting High-Impact Digital Solutions That Power Modern Businesses.
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-body font-normal max-w-2xl">
                ADVMEN Technologies is a premier full-service digital agency built for forward-thinking brands. 
                We combine strategic vision, web engineering, brand identity, and performance marketing to deliver 
                tailored digital products that scale modern enterprises.
              </p>
            </div>

            {/* Subtle Divider */}
            <div className="about-hero-stagger w-full h-px bg-gradient-to-r from-orange-500/30 via-white/10 to-transparent my-0.5" />

            {/* 2️⃣ FOUNDER SECTION (Chota Founder Intro) */}
            <div className="about-hero-stagger flex flex-col gap-4 bg-white/[0.02] border border-white/10 p-5 sm:p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden">
              {/* Background ambient glow decoration */}
              <div 
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
                }}
              />

              {/* Founder Name & Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-orange)] mb-0.5">
                    FOUNDER & DIRECTOR
                  </div>
                  <h2 className="font-display font-bold text-white text-xl sm:text-2xl tracking-tight">
                    Mr. Govind Goyal
                  </h2>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 font-mono text-xs font-semibold w-fit">
                  <FiAward size={13} />
                  <span>8+ Years Leadership</span>
                </div>
              </div>

              {/* Founder Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {founderHighlights.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-300 shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/25 text-[var(--color-orange)] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={15} />
                      </div>
                      <p className="text-gray-200 text-xs leading-relaxed font-body font-normal">
                        {item.text}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="about-hero-stagger pt-1">
              <MagneticButton strength={0.25}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-semibold text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>LET'S TALK</span>
                  <FiArrowRight size={16} />
                </Link>
              </MagneticButton>
            </div>

          </div>

          {/* Right Column — Founder Portrait Frame */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0 lg:sticky lg:top-28">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden border border-orange-500/25 shadow-[0_20px_60px_rgba(255,107,0,0.12)] bg-gray-950 group">
              <img
                src="/about-image/Advmen Founder.jpeg"
                alt="Mr. Govind Goyal — Co-Founder & Director"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Vignette overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(18, 18, 21, 0.7) 0%, rgba(18, 18, 21, 0.1) 50%, transparent 100%)',
                }}
              />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-black/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col gap-0.5">
                <span className="text-white font-display font-bold text-base">
                  Mr. Govind Goyal
                </span>
                <span className="text-[var(--color-orange)] font-mono text-xs font-medium">
                  Co-Founder & Director — ADVMEN Technologies
                </span>
              </div>

              {/* Floating Leadership Badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/40 flex items-center gap-2 shadow-lg">
                <FiAward className="text-[var(--color-orange)]" size={14} />
                <span className="text-white font-mono text-xs font-bold">
                  Leadership & Vision
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

