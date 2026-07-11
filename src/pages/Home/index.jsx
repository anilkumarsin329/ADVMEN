import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Hero from '@components/sections/Hero/Hero'
import HeroMarquee from '@components/sections/Hero/HeroMarquee'
import About from '@components/sections/About/About'
import Services from '@components/sections/Services/Services'
import WhyChoose from '@components/sections/WhyChoose/WhyChoose'
import WorkingProcess from '@components/sections/Process/WorkingProcess'
import Portfolio from '@components/sections/Portfolio/Portfolio'
import CaseStudies from '@components/sections/CaseStudies/CaseStudies'
import TrustSection from '@components/sections/Clients/TrustSection'
import Testimonials from '@components/sections/Testimonials/Testimonials'
import FAQSection from '@components/sections/FAQ/FAQSection'

const Home = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo === 'case-studies-section') {
      setTimeout(() => {
        const element = document.getElementById('case-studies-section')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 500)
    }
  }, [location.state])

  return (
  <PageTransition>
    <SEOHead
      title="We Build Brands That Dominate"
      description="ADVMEN Technologies — Premium branding, digital marketing, web & app development agency. Creating brands, building businesses, growing companies."
    />
    {/* Phase 0: Hero */}
    <Hero />
    <div className="py-10 bg-[var(--color-black)]">
      <HeroMarquee />
    </div>

    {/* Phase 1: About */}
    <About />

    {/* Phase 2: Services */}
    <Services />

    {/* Phase 3: Why Choose ADVMEN */}
    <WhyChoose />

    {/* Phase 4: Working Process */}
    <WorkingProcess />

    {/* Phase 5: Portfolio */}
    <Portfolio />

    {/* Phase 5.5: Case Studies - NEW */}
    <CaseStudies />

    {/* Phase 6: Clients */}
    <TrustSection />

    {/* Phase 7: Testimonials */}
    <Testimonials />

    {/* Phase 9: FAQ */}
    <FAQSection />

    {/* Phase 10: Contact - on dedicated page */}
    {/* Phase 11: Footer - in Layout */}
  </PageTransition>
  )
}

export default Home
