import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Hero from '@components/sections/Hero/Hero'
import HeroMarquee from '@components/sections/Hero/HeroMarquee'

// Below-fold sections — lazy loaded to reduce initial bundle
const Services      = lazy(() => import('@components/sections/Services/Services'))
const WhyChoose     = lazy(() => import('@components/sections/WhyChoose/WhyChoose'))
const WorkingProcess = lazy(() => import('@components/sections/Process/WorkingProcess'))
const Portfolio     = lazy(() => import('@components/sections/Portfolio/Portfolio'))
const CaseStudies   = lazy(() => import('@components/sections/CaseStudies/CaseStudies'))
const TrustSection  = lazy(() => import('@components/sections/Clients/TrustSection'))
const Testimonials  = lazy(() => import('@components/sections/Testimonials/Testimonials'))
const FAQSection    = lazy(() => import('@components/sections/FAQ/FAQSection'))
const HomePricing   = lazy(() => import('@components/sections/Home/HomePricing'))
const VisibilityIntro  = lazy(() => import('@components/sections/Home/VisibilityIntro'))
const StrategicVision  = lazy(() => import('@components/sections/Home/StrategicVision'))
const HomeServices     = lazy(() => import('@components/sections/Home/HomeServices'))
const MarketsSection   = lazy(() => import('@components/sections/Home/MarketsSection'))
const IndustriesSection = lazy(() => import('@components/sections/Home/IndustriesSection'))
const HomeCTA          = lazy(() => import('@components/sections/Home/HomeCTA'))

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
    { question: "What types of websites does ADVMEN develop?", answer: "ADVMEN is the leading website development company in India, creating business sites, corporate websites, service platforms, portfolios, e-commerce sites, web portals, and custom digital platforms." },
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
      keywords="digital marketing agency in India, digital marketing company in India, digital marketing services India, AI search optimization, website development in India, mobile app development in India, digital marketing services UAE, digital marketing services Europe, digital marketing services USA"
      canonical="https://www.advmen.com/"
      schemaData={{ faqs: homeFaqs }}
    />
    {/* Phase 0: Hero */}
    <Hero />
    <div className="py-10 bg-[var(--color-black)]">
      <HeroMarquee />
    </div>

    <Suspense fallback={null}>
      {/* Section 2: Data-backed digital strategies */}
      <VisibilityIntro />

      {/* Section 3: Strategic vision → measurable impact */}
      <div className="home-band home-band--tint"><StrategicVision /></div>

      {/* Section 4: Not just another agency (6 pillars) */}
      <WhyChoose />

      {/* Section 5: Digital marketing services India */}
      <div className="home-band home-band--light"><HomeServices /></div>

      {/* Section 6: 4D growth framework */}
      <WorkingProcess />

      {/* Section 7: India & global markets */}
      <div className="home-band home-band--tint"><MarketsSection /></div>

      {/* Section 8: Pricing + add-ons */}
      <HomePricing />

      {/* Section 9: Our work */}
      <div className="home-band home-band--light"><Portfolio /></div>

      {/* Section 10: Results / case studies */}
      <CaseStudies />

      {/* Section 11: Industries we serve */}
      <div className="home-band home-band--tint"><IndustriesSection /></div>

      {/* Existing social-proof blocks (not in the content brief) */}
      <div className="home-band home-band--light"><TrustSection /></div>
      <Testimonials />

      {/* Section 12: FAQ */}
      <div className="home-band home-band--tint"><FAQSection /></div>

      {/* Section 13: Closing CTA */}
      <HomeCTA />
    </Suspense>

  </PageTransition>
  )
}

export default Home
