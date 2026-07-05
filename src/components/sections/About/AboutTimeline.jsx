/**
 * AboutTimeline.jsx — Interactive vertical milestone timeline
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@utils/gsapConfig'

const milestones = [
  {
    year: '2019',
    title: 'Company Founding',
    description: 'ADVMEN was established with a focus on writing high-performance bespoke software and custom CMS platforms.',
  },
  {
    year: '2021',
    title: 'Global Expansion',
    description: 'Secured projects across Europe, USA, and Asia, growing our talent pool to include dedicated UX engineers and cloud architects.',
  },
  {
    year: '2023',
    title: 'Creative Engineering Focus',
    description: 'Pioneered WebGL, Three.js, and immersive vector animation designs, earning recognition for creative UI/UX excellence.',
  },
  {
    year: '2025',
    title: 'Next-Gen Ecosystems Launch',
    description: 'Shipped high-load enterprise platforms and introduced headless commerce frameworks powered by lightning-fast APIs.',
  },
]

const AboutTimeline = () => {
  const containerRef = useRef(null)
  const lineRef      = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Line Progress Animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: true,
          },
        }
      )

      // 2. Cards Fade / Slide in staggered
      milestones.forEach((_, index) => {
        gsap.fromTo(
          `.timeline-item-${index}`,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: `.timeline-item-${index}`,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 overflow-hidden"
      style={{
        background: 'var(--color-black)',
      }}
      aria-label="Timeline"
    >
      <div className="container relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <span className="eyebrow mx-auto">Milestones</span>
          <h2 className="section-title mt-4">Our Growth Journey</h2>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Track Line — Gray Background */}
          <div
            className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            aria-hidden="true"
          />

          {/* Vertical Fill Line — Animated Orange */}
          <div
            ref={lineRef}
            className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 origin-top"
            style={{
              background: 'var(--gradient-orange)',
              boxShadow: '0 0 10px rgba(255,107,0,0.8)',
            }}
            aria-hidden="true"
          />

          {/* Milestone Items */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={item.year}
                  className={`timeline-item-${index} relative flex flex-col lg:flex-row items-start lg:items-center w-full`}
                >
                  
                  {/* Outer circle marker */}
                  <div
                    className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: 'var(--color-black)',
                      border: '2px solid rgba(255,255,255,0.15)',
                      zIndex: 3,
                    }}
                  >
                    {/* Inner orange core indicator */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-orange)]" />
                  </div>

                  {/* Left spacer / Card column (Desktop) */}
                  <div
                    className={`w-full lg:w-[46%] pl-12 lg:pl-0 ${
                      isEven ? 'lg:text-right lg:pr-8' : 'lg:order-2 lg:pl-8'
                    }`}
                  >
                    {/* Year stamp */}
                    <div
                      className="font-display font-bold text-3xl lg:text-4xl text-[var(--color-orange)] mb-2"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {item.year}
                    </div>

                    {/* Card */}
                    <div
                      className="p-6 rounded-2xl cursor-default text-left"
                      style={{
                        background: 'rgba(255,255,255,0.015)',
                        border: '1px solid rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(12px)',
                        display: 'inline-block',
                        width: '100%',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.2rem',
                          fontWeight: 'var(--weight-bold)',
                          color: 'var(--color-text-primary)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-small)',
                          color: 'var(--color-text-secondary)',
                          lineHeight: '1.6',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right spacer (Desktop) */}
                  <div className="hidden lg:block w-[8%]" />
                  <div className={`hidden lg:block w-[46%] ${isEven ? 'lg:order-2' : ''}`} />

                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutTimeline
