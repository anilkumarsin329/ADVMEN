import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../../utils/gsapConfig'
import { FiHome, FiTarget, FiTrendingUp } from 'react-icons/fi'

const AdSpaceSection = () => {
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        const ctx = gsap.context(() => {
          const staggerEls = sectionRef.current.querySelectorAll('.adspace-stagger')
          if (staggerEls.length > 0) {
            gsap.from(staggerEls, {
              opacity: 0,
              y: 40,
              filter: 'blur(8px)',
              duration: 1.0,
              stagger: 0.15,
              ease: 'expo.out',
              delay: 0.1,
              clearProps: 'all',
            })
          }
        }, sectionRef)

        return () => ctx.revert()
      },
      { threshold: 0.15 }
    )

    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const features = [
    {
      icon: <FiHome />,
      title: 'List Your Space',
      desc: 'Earn passive income by renting your walls, vehicles, storefronts & more.',
    },
    {
      icon: <FiTarget />,
      title: 'Browse & Book',
      desc: 'Find the perfect ad space by location, type, size and budget.',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Track & Earn',
      desc: 'Real-time campaign tracking, secure payments and automatic payouts.',
    }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        background: 'var(--color-black)',
        paddingTop: 'clamp(3rem, 8vw, 6rem)',
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
      }}
      aria-label="Advertising Space Module"
    >
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'url(/Space.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(20%)'
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        <div className="flex items-center gap-4 mb-6 adspace-stagger relative">
          <span className="w-8 h-px bg-[var(--color-orange)]" />
          <span className="type-eyebrow text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--color-orange)' }}>
            ADVMEN Ad Spaces
          </span>
          <span className="w-8 h-px bg-[var(--color-orange)]" />
        </div>

        <div className="relative w-full text-left md:text-center flex flex-col md:items-center items-start">
          {/* Subtle Background Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[150px] sm:w-[400px] sm:h-[200px] bg-orange-500/20 blur-[100px] sm:blur-[120px] rounded-[100%] pointer-events-none -z-10 mix-blend-screen" />
          
          <h2 className="adspace-stagger section-title max-w-4xl mb-6 text-white font-display relative z-10"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: '-0.02em'
            }}
          >
            Advertise Smarter.<br />
            <span className="text-[#f97316]">Reach Further.</span>
          </h2>

          <p className="adspace-stagger max-w-2xl mb-16 text-slate-300 relative z-10 font-medium"
            style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)' }}
          >
            Rent physical and digital ad spaces across India. List your property or launch your next campaign.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mb-16">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="adspace-stagger flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 107, 0, 0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="text-5xl mb-6 text-orange-500">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="adspace-stagger">
          <Link 
            to="/ad-space" 
            className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-600/20 text-lg"
          >
            Explore Ad Spaces
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AdSpaceSection
