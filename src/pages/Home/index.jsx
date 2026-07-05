import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import Hero from '@components/sections/Hero/Hero'
import HeroMarquee from '@components/sections/Hero/HeroMarquee'
import About from '@components/sections/About/About'
import Services from '@components/sections/Services/Services'
import WhyChoose from '@components/sections/WhyChoose/WhyChoose'
import WorkingProcess from '@components/sections/Process/WorkingProcess'
import Portfolio from '@components/sections/Portfolio/Portfolio'
import TrustSection from '@components/sections/Clients/TrustSection'
import Testimonials from '@components/sections/Testimonials/Testimonials'
import FAQSection from '@components/sections/FAQ/FAQSection'

const Home = () => (
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

export default Home
