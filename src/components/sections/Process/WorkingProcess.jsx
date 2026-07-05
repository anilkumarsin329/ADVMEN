/**
 * WorkingProcess.jsx — 7-Step Agency Execution Process
 */

import { useEffect, useRef } from 'react'
import { gsap } from '@utils/gsapConfig'

const steps = [
  { num: '01', title: 'Discovery', desc: 'Auditing existing systems, mapping project goals, specs, and outlining milestones.' },
  { num: '02', title: 'Strategy', desc: 'Selecting tech stack architecture, creating navigation models, and visual directions.' },
  { num: '03', title: 'Design', desc: 'Refining wireframes into high-fidelity custom design systems and user journey paths.' },
  { num: '04', title: 'Development', desc: 'Writing clean, semantic React code and setting up responsive API systems.' },
  { num: '05', title: 'Testing', desc: 'Performing speed optimization audits, cross-device QA verification, and security checks.' },
  { num: '06', title: 'Launch', desc: 'Domain mapping, setting up hosting services, and pushing final files to production.' },
  { num: '07', title: 'Support', desc: 'Continuous performance monitoring, analytics tracking, and scaling updates.' },
]

const WorkingProcess = () => {
  const containerRef = useRef(null)
  const lineRef      = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      )
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
      aria-label="Working Process"
    >
      <div className="container relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mb-20">
          <span className="eyebrow">How We Work</span>
          <h2 className="section-title mt-4">A Systematic Approach to Digital Execution</h2>
        </div>

        {/* Timeline Stack */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical progression line */}
          <div
            className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-4 bottom-4 w-px"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            aria-hidden="true"
          />

          <div
            ref={lineRef}
            className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-4 bottom-4 w-px origin-top"
            style={{
              background: 'var(--gradient-orange)',
              boxShadow: '0 0 8px rgba(255,107,0,0.6)',
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={step.num}
                  className="relative flex flex-col lg:flex-row items-start lg:items-center w-full"
                >
                  
                  {/* Bullet Dot */}
                  <div
                    className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{
                      background: 'var(--color-black)',
                      border: '2px solid rgba(255,107,0,0.6)',
                      zIndex: 3,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)]" />
                  </div>

                  {/* Left block (Desktop) */}
                  <div
                    className={`w-full lg:w-[45%] pl-14 lg:pl-0 ${
                      isEven ? 'lg:text-right lg:pr-8' : 'lg:order-2 lg:pl-8'
                    }`}
                  >
                    <div className="flex items-baseline justify-start lg:justify-end gap-2 mb-1">
                      <span className="font-display font-black text-2xl text-[var(--color-orange)]">
                        {step.num}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.25rem',
                          fontWeight: 'var(--weight-bold)',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-small)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                        maxWidth: isEven ? 'none' : '400px',
                      }}
                      className={`${isEven ? 'lg:ml-auto lg:max-w-[400px]' : ''}`}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Right block (Desktop spacer) */}
                  <div className="hidden lg:block w-[10%]" />
                  <div className={`hidden lg:block w-[45%] ${isEven ? 'lg:order-2' : ''}`} />

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}

export default WorkingProcess
