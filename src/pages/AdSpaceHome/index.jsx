import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsapConfig'
import SEOHead from '../../components/common/SEOHead'
import PageTransition from '../../components/common/PageTransition'
import { adSpaceAPI } from '../../utils/adApi'
import { FiLayout, FiShoppingBag, FiHome, FiTruck, FiMonitor, FiSmartphone, FiArrowLeft } from 'react-icons/fi'

const AdSpaceHome = () => {
  const headerRef = useRef(null)
  const hasAnimated = useRef(false)
  const [stats, setStats] = useState({ totalSpaces: 0, activeCampaigns: 0 })

  useEffect(() => {
    // Quick fetch for stats (or mock it)
    const fetchStats = async () => {
      try {
        const res = await adSpaceAPI.getAll()
        if (res.success) {
          setStats({ totalSpaces: res.data.length, activeCampaigns: Math.floor(Math.random() * 50) + 10 })
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [])

  useEffect(() => {
    if (hasAnimated.current || !headerRef.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        const ctx = gsap.context(() => {
          const staggerEls = headerRef.current.querySelectorAll('.ad-stagger')
          if (staggerEls.length > 0) {
            gsap.from(staggerEls, {
              opacity: 0,
              y: 35,
              filter: 'blur(8px)',
              duration: 1.0,
              stagger: 0.12,
              ease: 'expo.out',
              delay: 0.15,
              clearProps: 'all',
            })
          }
        }, headerRef)

        return () => ctx.revert()
      },
      { threshold: 0.15 }
    )

    obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  const spaceTypes = [
    { title: 'Wall Space', icon: <FiLayout /> },
    { title: 'Shop/Storefront', icon: <FiShoppingBag /> },
    { title: 'Building', icon: <FiHome /> },
    { title: 'Vehicle', icon: <FiTruck /> },
    { title: 'Digital Screen', icon: <FiMonitor /> },
    { title: 'Website/App', icon: <FiSmartphone /> },
  ]

  return (
    <PageTransition>
      <SEOHead
        title="Rent Premium Advertising Spaces — ADVMEN"
        description="Discover and rent premium physical and digital advertising spaces across the city."
      />

      <section
        ref={headerRef}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'var(--color-black)',
          paddingTop: 'calc(var(--navbar-height) + 2rem)',
        }}
      >
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: 'url(/Space.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(30%)'
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          <div className="w-full flex justify-start mb-8 mt-4 ad-stagger">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-500 transition-colors font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-orange-500/50 backdrop-blur-md">
              <FiArrowLeft /> Back to Main Website
            </Link>
          </div>
          <div className="ad-stagger flex items-center gap-3 mb-6 justify-center">
            <span className="w-8 h-px bg-[var(--color-orange)]" />
            <span className="type-eyebrow text-sm" style={{ color: 'var(--color-orange)' }}>
              ADVMEN Space Module
            </span>
            <span className="w-8 h-px bg-[var(--color-orange)]" />
          </div>

          <h1 className="ad-stagger section-title max-w-4xl mx-auto mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.1,
              fontWeight: 'var(--weight-bold)',
            }}
          >
            Rent Premium <span className="text-orange-gradient">Advertising</span> Spaces.
          </h1>

          <p className="ad-stagger type-body-lg max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            Connect with property owners to rent physical and digital ad spaces. Whether it's a prominent wall, a vehicle, or a digital billboard, maximize your brand's reach.
          </p>

          <div className="ad-stagger flex flex-wrap justify-center gap-6 mb-16">
            <Link to="/ad-space/owner/register" className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:shadow-[0_0_40px_rgba(255,107,0,0.5)]">
              List Your Space
            </Link>
            <Link to="/ad-space/browse" className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Find Ad Space
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="ad-stagger grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mx-auto p-6 rounded-2xl border border-[rgba(255,107,0,0.15)] bg-white/5 backdrop-blur-md">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-display font-bold text-white">{stats.totalSpaces}+</span>
              <span className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider text-center">Total Spaces</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-display font-bold text-white">50+</span>
              <span className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider text-center">Cities</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-display font-bold text-white">{stats.activeCampaigns}+</span>
              <span className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider text-center">Active Campaigns</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-display font-bold text-white">100%</span>
              <span className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider text-center">Happy Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works & Space Types */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Explore Space Types</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Find the perfect medium for your next advertising campaign.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {spaceTypes.map((type, i) => (
              <Link to={`/ad-space/browse?type=${type.title}`} key={i} className="group p-6 rounded-2xl border border-[rgba(255,107,0,0.15)] bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center text-center backdrop-blur-md">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform text-orange-500">{type.icon}</span>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">{type.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold text-white mb-3">List or Browse</h3>
              <p className="text-slate-400 text-sm">Owners list their available spaces. Advertisers browse and filter by location and price.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold text-white mb-3">Book & Pay</h3>
              <p className="text-slate-400 text-sm">Send a booking request. Once approved by the owner, pay securely via Razorpay.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Go Live & Earn</h3>
              <p className="text-slate-400 text-sm">Upload creatives. We verify them and put the ad live. Owners earn their payout automatically.</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default AdSpaceHome
