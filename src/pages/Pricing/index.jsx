import SEOHead from '@components/common/SEOHead'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pricingTabs, pricingData, pricingNote } from '@data/pricing'

const Pricing = ({ isPage = true }) => {
  const [activeTab, setActiveTab] = useState(pricingTabs[0])
  // On the home page only the monthly bundles are shown; /pricing has every tab
  const tab = isPage ? activeTab : pricingTabs[0]
  const plans = pricingData[tab]

  return (
  <>
    {isPage && (
      <>
        <SEOHead
          title="Pricing — ADVMEN"
          description="Clear, transparent pricing in INR and USD. Choose the plan that fits your growth goals."
          schemaType="pricing"
          canonical="https://www.advmen.com/pricing"
          schemaData={{
            catalog: {
              name: 'ADVMEN service pricing — starting rates (INR, GST extra)',
              items: pricingTabs.flatMap((t) =>
                pricingData[t].map((p) => ({ name: p.name, minPrice: parseFloat(String(p.inr).replace(/,/g, '')), currency: 'INR' }))
              ),
            },
            breadcrumbs: [
              { name: 'Home', url: 'https://www.advmen.com/' },
              { name: 'Pricing', url: 'https://www.advmen.com/pricing' }
            ]
          }}
        />
      </>
    )}

    <section
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: isPage ? 'calc(var(--navbar-height) + clamp(2rem, 5vw, 4rem))' : 'clamp(3rem, 8vw, 6rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        background: 'var(--color-black)',
      }}
    >
      {/* Glow */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 'clamp(400px, 60vw, 800px)', height: 'clamp(400px, 60vw, 800px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,93,4,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10" style={{ zIndex: 1, maxWidth: '100%' }}>

        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(232,93,4,0.1)', border: '1px solid rgba(232,93,4,0.3)', color: 'var(--color-orange)' }}
          >
            Transparent Pricing
          </span>
          {isPage ? (
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
              ADVMEN Pricing 2026
            </h1>
          ) : (
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
              ADVMEN Pricing 2026
            </h2>
          )}
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 600, color: 'var(--color-orange)', marginBottom: '1rem' }}>
            Starting rates in INR, USD and AED.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'var(--color-text-secondary)', maxWidth: '680px', margin: '0 auto 0.75rem', lineHeight: 1.6 }}>
            Choose a bundle or pick individual services. GST extra.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'var(--color-text-secondary)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            Final quote is confirmed after we understand your requirements and scope.
          </p>
        </div>

        {/* Tabs */}
        {isPage && (
          <div role="tablist" aria-label="Pricing categories" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {pricingTabs.map((t) => {
              const on = t === tab
              return (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActiveTab(t)}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    cursor: 'pointer', padding: '0.6rem 1.1rem', borderRadius: '999px',
                    border: '1px solid rgba(232,93,4,0.35)',
                    background: on ? 'var(--color-orange)' : 'transparent',
                    color: on ? 'var(--color-ink)' : 'var(--color-orange)',
                    fontWeight: on ? 700 : 500,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>
        )}

        {/* Cards */}
        <div className="grid gap-6 max-w-6xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 290px), 1fr))', paddingTop: '0.75rem' }}>
          {plans.map((plan) => (
            <div
              key={`${tab}-${plan.name}`}
              style={{
                position: 'relative',
                padding: '2rem',
                borderRadius: '1.25rem',
                background: plan.tag ? 'rgba(232,93,4,0.08)' : 'var(--color-surface-1)',
                border: plan.tag ? '1.5px solid rgba(232,93,4,0.5)' : '1px solid var(--color-border-subtle)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Tag */}
              {plan.tag && (
                <span style={{ position: 'absolute', top: '-0.75rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-orange)', color: 'var(--color-text-primary)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 1rem', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                  {plan.tag}
                </span>
              )}

              {/* Plan name */}
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-orange)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{plan.name}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{plan.subtitle}</p>

              {/* Price */}
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1 }}>₹{plan.inr}{plan.plus ? '+' : ''}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>${plan.usd}{plan.plus ? '+' : ''}{plan.unitLabel}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(232,93,4,0.85)', marginBottom: '0.25rem' }}>AED {plan.aed}{plan.plus ? '+' : ''}{plan.unitLabel}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-tertiary)', marginBottom: '1.75rem', letterSpacing: '0.05em' }}>{plan.unitWords}</p>

              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--color-border-subtle)', marginBottom: '1.5rem' }} />

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-orange)', flexShrink: 0, marginTop: '0.35rem' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/contact"
                state={{ plan: plan.name }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  marginTop: '2rem', padding: '0.875rem 1.5rem', borderRadius: '12px',
                  background: plan.tag ? 'linear-gradient(135deg, rgba(232,93,4,0.95), rgba(255,122,26,0.95))' : 'rgba(232,93,4,0.08)',
                  border: '1px solid rgba(232,93,4,0.4)',
                  color: plan.tag ? 'var(--color-ink)' : 'var(--color-orange)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,93,4,0.25)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {plan.tag ? `Choose ${plan.name.split(' ')[0]}` : 'Get Started'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '3rem auto 0 auto', lineHeight: '1.6' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Pricing Note:</strong> {pricingNote}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4" style={{ marginTop: '2rem' }}>
          {!isPage && (
            <Link to="/pricing" className="btn-outline btn-lg" data-cursor="hover">View Full Pricing</Link>
          )}
          <Link to="/contact" className="btn-primary btn-lg" data-cursor="hover">Get a Free Growth Audit</Link>
        </div>

      </div>
    </section>
  </>
  )
}

export default Pricing
