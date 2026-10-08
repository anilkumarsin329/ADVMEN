import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'STARTER',
    subtitle: 'SEO Package',
    inr: '₹5K–₹8K',
    usd: '$60–$90',
    aed: 'AED 1,500–2,250',
    scope: 'per month',
    tag: null,
    features: [
      'Technical audit',
      'On-page optimization up to 10 pages',
      'Google Business Profile',
      'Keyword research',
      'Monthly report',
    ],
  },
  {
    name: 'GROWTH',
    subtitle: 'SEO + AEO + AI Overview',
    inr: '₹15K–₹25K',
    usd: '$180–$300',
    aed: 'AED 3,300–5,500',
    scope: 'per month',
    tag: 'Most Popular',
    features: [
      'Everything in Starter',
      'Schema markup',
      'AI-focused content & keyword targeting',
      '5 social posts/month',
      'Link building & competitor research',
      'Weekly strategy call',
    ],
  },
  {
    name: 'ENTERPRISE',
    subtitle: 'SEO + AEO + GEO',
    inr: '₹25K–₹50K',
    usd: '$300–$600',
    aed: 'AED 5,500–12,500',
    scope: 'per month',
    tag: 'Best Value',
    features: [
      'Everything in Growth',
      'AI search visibility (GEO)',
      'Advanced schema & technical SEO',
      '12 social posts/month',
      'CRO & monthly reporting',
      'Lead and revenue tracking',
    ],
  },
]

const Pricing = ({ isPage = true }) => (
  <>
    {isPage && (
      <>
        <SEOHead
          title="Pricing — ADVMEN"
          description="Clear, transparent pricing in INR and USD. Choose the plan that fits your growth goals."
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
      <div aria-hidden="true" style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 'clamp(400px, 60vw, 800px)', height: 'clamp(400px, 60vw, 800px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10" style={{ zIndex: 1, maxWidth: '100%' }}>

        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)', color: 'var(--color-orange)' }}
          >
            Transparent Pricing
          </span>
          <h1
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}
          >
            Clear pricing in INR and USD
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            No hidden fees. No surprises. Pick a plan and let's get to work.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                position: 'relative',
                padding: '2rem',
                borderRadius: '1.25rem',
                background: plan.tag === 'Most Popular' ? 'rgba(255,107,0,0.06)' : 'rgba(255,255,255,0.01)',
                border: plan.tag === 'Most Popular' ? '1.5px solid rgba(255,107,0,0.4)' : '1px solid rgba(255,107,0,0.15)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Tag */}
              {plan.tag && (
                <span style={{ position: 'absolute', top: '-0.75rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-orange)', color: '#000', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 1rem', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                  {plan.tag}
                </span>
              )}

              {/* Plan name */}
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-orange)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{plan.name}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{plan.subtitle}</p>

              {/* Price */}
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1 }}>{plan.inr}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{plan.usd} / month</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,107,0,0.7)', marginBottom: '0.25rem' }}>{plan.aed} / month</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginBottom: '1.75rem', letterSpacing: '0.05em' }}>{plan.scope}</p>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '1.5rem' }} />

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
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  marginTop: '2rem', padding: '0.875rem 1.5rem', borderRadius: '12px',
                  background: plan.tag === 'Most Popular' ? 'linear-gradient(135deg, rgba(255,107,0,0.95), rgba(255,140,0,0.9))' : 'rgba(255,107,0,0.08)',
                  border: '1px solid rgba(255,107,0,0.4)',
                  color: plan.tag === 'Most Popular' ? '#000' : 'var(--color-orange)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,0,0.25)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                Get Started
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p style={{ textAlign: 'center', marginTop: '3rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Need a custom plan?{' '}
          <Link to="/contact" style={{ color: 'var(--color-orange)', textDecoration: 'none', fontWeight: 600 }}>Talk to us →</Link>
        </p>

      </div>
    </section>
  </>
)

export default Pricing
