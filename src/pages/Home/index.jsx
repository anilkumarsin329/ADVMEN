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
import Pricing from '@pages/Pricing'

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

  const homeFaqs = [
    { question: "What services does ADVMEN offer?", answer: "ADVMEN offers 360 digital marketing services, including SEO, AEO, GEO, web development and e-commerce, mobile app development, AI-powered search optimization, digital marketing, API integrations, and custom digital solutions." },
    { question: "Does ADVMEN provide digital marketing services in India?", answer: "Indeed. Whether you are a startup in India or an established business willing to grow your brand digitally, ADVMEN provides digital marketing in India and beyond." },
    { question: "Does ADVMEN work with international businesses?", answer: "Absolutely. ADVMEN collaborates with international businesses, creating digital solutions that fit different markets, audiences, and business goals." },
    { question: "What is the difference between SEO, AEO and GEO?", answer: "SEO improves visibility on search engines. AEO helps your content show up in direct-answer queries, while GEO focuses on visibility across AI-driven search results." },
    { question: "How does ADVMEN help businesses appear in AI search results?", answer: "ADVMEN uses AI search optimization, structured content, entity-focused strategies, and GEO techniques to boost your brand's presence in AI-powered search results." },
    { question: "What is AI search optimization?", answer: "AI search optimization makes your content more relevant and understandable to AI-powered search platforms. It improves the chances of being referenced in AI-generated answers." },
    { question: "Does ADVMEN provide website development services?", answer: "Yes. ADVMEN builds websites that focus on performance, usability, scalability, SEO, and your business needs." },
    { question: "What types of websites does ADVMEN develop?", answer: "ADVMEN develops business sites, corporate websites, service platforms, portfolios, e-commerce sites, web portals, and custom digital platforms." },
    { question: "Does ADVMEN build e-commerce websites?", answer: "Yes. ADVMEN develops e-commerce websites complete with product catalogs, payment gateways, integrations, responsive designs, and scalable features." },
    { question: "Does ADVMEN develop Android and iOS apps?", answer: "Yes, ADVMEN designs and develops Android and iOS apps for speed, smooth user experience, and flawless integration with your digital presence." },
    { question: "What types of mobile applications does ADVMEN build?", answer: "ADVMEN delivers Android app development, iOS app development, cross-platform app development, custom mobile app development, business & enterprise apps, e-commerce apps, booking & service apps, API & backend integration, UI/UX design, and app performance optimization." },
    { question: "Does ADVMEN provide API and third-party integrations?", answer: "Yes. ADVMEN provides API development and third-party integrations to connect websites, mobile applications, e-commerce platforms, and custom digital products." }
  ];

  return (
  <PageTransition>
    <SEOHead
      title="Digital Marketing & Technology Agency in India | ADVMEN"
      description="ADVMEN is a digital marketing and technology agency in India offering SEO, AEO, GEO, AI search optimization, branding, web development and mobile app development."
      schemaType="home"
      canonical="https://www.advmen.com/"
      schemaData={{ faqs: homeFaqs }}
    />
    {/* Phase 0: Hero */}
    <Hero />
    <div className="py-10 bg-[var(--color-black)]">
      <HeroMarquee />
    </div>

    {/* Phase 1: About */}
    {/* <About /> */}

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

    {/* Phase 8: Pricing */}
    <Pricing isPage={false} />

    {/* Phase 9: FAQ */}
    <FAQSection />

    {/* Phase 10: Contact - on dedicated page */}
    {/* Phase 11: Footer - in Layout */}
  </PageTransition>
  )
}

export default Home
