/**
 * HomePricing.jsx — Section 8
 * Digital Marketing Pricing for India & Global Markets (+ optional add-ons)
 * The full price book lives on /pricing.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const PLANS = [
  {
    name: 'Starter — SEO Foundation',
    cta: 'Get Started',
    prices: ['₹30K–45K / month', '$400–600 / month', '€350–550 / month', 'AED 1,500–2,200 / month'],
    lead: 'Includes:',
    features: [
      'Technical SEO Audit',
      'On-Page Optimization for up to 10 pages',
      'Google Business Profile optimization where applicable',
      '4 Content Pieces',
      'Monthly Performance Report',
    ],
  },
  {
    name: 'Growth — SEO + AEO',
    cta: 'Choose Growth',
    featured: true,
    prices: ['₹70K–1.2L / month', '$900–1,500 / month', '€800–1,350 / month', 'AED 3,300–5,500 / month'],
    lead: 'Includes everything in Starter, plus:',
    features: [
      'Schema Implementation',
      'FAQ & Answer Optimization',
      'Featured Snippet Targeting',
      '8 Content Pieces',
      'Link Building',
      'Conversion Tracking',
      'Bi-Weekly Strategy Calls',
    ],
  },
  {
    name: 'Dominate — SEO + AEO + GEO',
    cta: 'Discuss Your Growth Plan',
    prices: ['₹1.5L–3L / month', '$2,000–3,500 / month', '€1,800–3,200 / month', 'AED 7,350–12,850 / month'],
    lead: 'Includes everything in Growth, plus:',
    features: [
      'AI Search Visibility Tracking',
      'Brand Mention & Citation Building',
      '12+ Content Pieces',
      'Conversion Rate Optimization',
      'Weekly Reporting',
      'Dedicated Account Manager',
    ],
  },
]

const ADDONS = [
  {
    name: 'Performance Ads Management',
    prices: ['From ₹25K/month + ad spend', 'From $300/month + ad spend'],
    desc: 'Campaign management designed around defined acquisition and performance objectives.',
    to: '/services/performance-marketing',
  },
  {
    name: 'Conversion-Focused Website / Landing Page',
    prices: ['From ₹40K one-time', 'From $500 one-time'],
    desc: 'Purpose-built digital experiences designed to support specific campaigns, offers, and conversion journeys.',
    to: '/services/website-development',
  },
  {
    name: 'AI Visibility Audit',
    prices: ['₹15K one-time', '$200 one-time'],
    desc: "A focused review of your brand's current visibility and representation across relevant AI-driven search experiences.",
    to: '/services/aeo-geo',
  },
]

const PRICING_NOTE =
  'Package prices are indicative starting ranges. Final pricing depends on scope, competition, website size, content volume, target market, and required deliverables. Currency conversions are rounded for website display and may be reviewed periodically.'

const HomePricing = () => (
  <section
    id="pricing-section"
    className="relative w-full"
    style={{ background: 'var(--color-black)', padding: 'clamp(3.5rem, 8vw, 6rem) 0' }}
    aria-label="Digital marketing pricing for India and global markets"
  >
    <div className="container">
      <SectionHeader
        eyebrow="Transparent Pricing"
        title="Digital Marketing Pricing for India & Global Markets"
        subtitle="Choose Your Plan. Build Brand at Your Pace."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 mb-10" style={{ maxWidth: '1000px' }}>
        <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>
          The right investment depends on your website’s complexity, your market, content needs, competitors, and how
          aggressively you want to grow.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>
          We offer clear packages as a starting range. We’ll confirm your price after learning your requirements and
          defining the appropriate scope.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PLANS.map((plan, i) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card flex flex-col"
            style={{
              padding: '1.75rem',
              background: plan.featured ? 'rgba(232,93,4,0.08)' : 'var(--color-surface-1)',
              borderColor: plan.featured ? 'var(--color-orange)' : undefined,
            }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{plan.name}</h3>
            <ul className="flex flex-col gap-1 mb-5" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              {plan.prices.map((p, idx) => (
                <li key={p} style={{ fontWeight: idx === 0 ? 700 : 500, color: idx === 0 ? 'var(--color-orange)' : 'var(--color-text-secondary)' }}>
                  {p}
                </li>
              ))}
            </ul>
            <p style={{ fontWeight: 600, marginBottom: '0.6rem', fontSize: '0.9rem' }}>{plan.lead}</p>
            <ul className="flex flex-col gap-2 mb-6 flex-grow">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--color-orange)', marginTop: '0.45rem' }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              state={{ plan: plan.name }}
              className={plan.featured ? 'btn-primary btn-sm text-center' : 'btn-outline btn-sm text-center'}
              style={{ height: 'auto', padding: '0.7rem 1rem', whiteSpace: 'normal' }}
              data-cursor="hover"
            >
              {plan.cta}
            </Link>
          </motion.article>
        ))}
      </div>

      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginTop: '2rem', maxWidth: '900px' }}>
        <strong style={{ color: 'var(--color-text-primary)' }}>Pricing Note:</strong> {PRICING_NOTE}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-16">
        <Link to="/pricing" className="btn-outline btn-lg" data-cursor="hover">View Full Pricing</Link>
        <Link to="/contact" className="btn-primary btn-lg" data-cursor="hover">Get a Free Growth Audit</Link>
      </div>

      <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '1.5rem' }}>Optional Digital Growth Add-Ons</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ADDONS.map((a) => (
          <article key={a.name} className="card flex flex-col" style={{ padding: '1.5rem', background: 'var(--color-surface-1)' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>
              <Link to={a.to} style={{ color: 'inherit' }}>{a.name}</Link>
            </h3>
            <ul className="mb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-orange)', fontWeight: 600 }}>
              {a.prices.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{a.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default HomePricing
