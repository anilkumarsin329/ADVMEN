import React from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { COMPANY } from '@utils/constants'

const marketData = {
  india: {
    title: 'Digital Marketing Services in India',
    h1: 'Best Digital Marketing Agency in India',
    description: 'Grow your business with the best digital marketing services in India. Local SEO, content, and performance marketing tailored for the Indian market.',
    slug: 'digital-marketing-services-india',
    areaServed: 'IN',
    pricingContext: 'Cost-effective solutions in INR tailored for startups, SMEs, and enterprises in India.',
    context: 'With the rapid digitalization in India, standing out requires a strong local presence. We help you dominate local searches, connect with a diverse audience, and scale your brand across the country.',
  },
  usa: {
    title: 'Digital Marketing Services in USA',
    h1: 'Premium Digital Marketing Agency in USA',
    description: 'Data-driven digital marketing services in the USA. We help US businesses dominate search and outpace competitors with advanced SEO and AEO.',
    slug: 'digital-marketing-services-usa',
    areaServed: 'US',
    pricingContext: 'Transparent, ROI-focused pricing in USD designed for competitive US markets.',
    context: 'The US market is highly competitive. We leverage AI Search Optimization, advanced Performance Marketing, and highly targeted branding to ensure your business captures market share in a crowded landscape.',
  },
  uae: {
    title: 'Digital Marketing Services in UAE',
    h1: 'Top Digital Marketing Services in UAE',
    description: 'Elevate your brand in the UAE with our premium digital marketing services. Bilingual campaigns, SEO, and branding for Dubai and beyond.',
    slug: 'digital-marketing-services-uae',
    areaServed: 'AE',
    pricingContext: 'Premium marketing packages in AED designed for the dynamic Gulf market.',
    context: 'From Dubai to Abu Dhabi, the UAE market demands high-quality, culturally relevant messaging. We deliver bilingual digital strategies, luxury brand positioning, and localized SEO to capture high-value audiences.',
  },
  europe: {
    title: 'Digital Marketing Services in Europe',
    h1: 'Digital Marketing Agency for Europe',
    description: 'GDPR-compliant digital marketing services across Europe. Scale your brand internationally with SEO, AEO, and localized content strategies.',
    slug: 'digital-marketing-services-europe',
    areaServed: '150', // Code for Europe in UN M49 used in Schema sometimes, or 'EU'
    pricingContext: 'Flexible EUR pricing models ensuring compliance and high performance across borders.',
    context: 'Navigating the European market means respecting GDPR while driving growth across multiple languages and cultures. We build robust, compliant, and highly effective marketing funnels tailored to European consumers.',
  }
}

const MarketPage = ({ market }) => {
  const data = marketData[market] || marketData.india

  return (
    <PageTransition>
      <SEOHead
        title={data.title}
        description={data.description}
        schemaType="market"
        canonical={`${COMPANY.website}/${data.slug}`}
        schemaData={{
          serviceName: data.title,
          areaServed: data.areaServed,
          breadcrumbs: [
            { name: 'Home', url: COMPANY.website },
            { name: data.title, url: `${COMPANY.website}/${data.slug}` }
          ]
        }}
      />
      <div className="section-full pt-32 pb-20 px-4 md:px-8 min-h-screen" style={{ background: 'var(--color-black)', color: 'var(--color-text-primary)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '1rem' }}>
              {data.areaServed} Market
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              {data.h1}
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--color-text-secondary)', maxWidth: '680px', lineHeight: 1.7 }}>
              {data.description}
            </p>
          </div>

          {/* Market Context Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div style={{ background: 'var(--color-surface-1)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--color-border-subtle)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-orange)', marginBottom: '1rem' }}>
                Why {market.toUpperCase()} Market?
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {data.context}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Pricing & Engagement</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{data.pricingContext}</p>
            </div>
            
            <div style={{ background: 'var(--color-surface-1)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--color-border-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>Our Core Services</h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { to: '/services/seo', label: 'Search Engine Optimization (SEO)' },
                  { to: '/services/aeo-geo', label: 'AEO & GEO Strategies' },
                  { to: '/services/ai-search-optimization', label: 'AI Search Optimization' },
                  { to: '/services/website-development', label: 'Custom Website Development' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-orange)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                    >
                      <span style={{ color: 'var(--color-orange)' }}>→</span> {label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div style={{ marginTop: '2rem' }}>
                <Link to="/contact" className="btn-primary">
                  Get a Free Growth Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default MarketPage
