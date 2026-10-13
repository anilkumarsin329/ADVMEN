import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { COMPANY } from '@utils/constants'

const SERVICES = [
  { to: '/services/seo', label: 'SEO', desc: 'Technical SEO, intent research, structured data, local and ecommerce SEO.' },
  { to: '/services/aeo-geo', label: 'AEO, GEO & AI Search', desc: 'Visibility in answer engines and AI-powered search experiences.' },
  { to: '/services/content-marketing', label: 'Content Marketing', desc: 'Search-led content built around what your audience actually looks for.' },
  { to: '/services/branding', label: 'Branding', desc: 'Strategy, identity and digital brand assets that feel consistent.' },
  { to: '/services/performance-marketing', label: 'Performance Marketing', desc: 'Paid search and social campaigns shaped by real business goals.' },
  { to: '/services/social-media-marketing', label: 'Social Media Marketing', desc: 'Strategy, content calendars and platform management.' },
  { to: '/services/website-development', label: 'Website Development', desc: 'Fast, responsive, conversion-focused websites and ecommerce.' },
  { to: '/services/app-development', label: 'App Development', desc: 'Android, iOS and cross-platform mobile applications.' },
]

const STEPS = [
  { n: '01', t: 'Discover', d: 'Market, audience, competitors, search habits and business goals.' },
  { n: '02', t: 'Develop', d: 'A tailored plan across SEO, content, branding and your website.' },
  { n: '03', t: 'Distribute', d: 'Putting your brand where your audience actually spends time.' },
  { n: '04', t: 'Drive', d: 'Measuring traffic, leads and conversions, then tuning the strategy.' },
]

const marketData = {
  india: {
    code: 'IN',
    name: 'India',
    title: 'Digital Marketing Services in India',
    h1: 'Digital Marketing Services in India',
    description: 'Get your brand noticed across India. ADVMEN handles search, content, branding, performance marketing and digital experiences that get results.',
    slug: 'digital-marketing-services-india',
    areaServed: 'IN',
    context: 'India sits at the centre of our digital marketing offerings. We create strategies that help businesses stand out and grow even as the market shifts and new trends pop up — across search, answer engines, social platforms and AI-powered discovery.',
    focus: [
      'Local and national SEO for competitive Indian categories',
      'Content and search strategy for diverse, multi-city audiences',
      'Websites and mobile apps built for performance on every device',
    ],
    currency: 'INR',
    prices: [
      { plan: 'Starter — SEO Foundation', range: '₹30K–45K / month' },
      { plan: 'Growth — SEO + AEO', range: '₹70K–1.2L / month' },
      { plan: 'Dominate — SEO + AEO + GEO', range: '₹1.5L–3L / month' },
    ],
    faqs: [
      { question: 'Does ADVMEN provide digital marketing services in India?', answer: 'Indeed. Whether you are a startup in India or an established business willing to grow your brand digitally, ADVMEN provides digital marketing in India and beyond.' },
      { question: 'Which digital marketing services do you offer in India?', answer: 'SEO, AEO, GEO and AI search optimization, content marketing, branding, performance marketing, social media marketing, website development and mobile app development.' },
      { question: 'How much do your digital marketing packages cost in India?', answer: 'Packages start at ₹30K–45K per month for SEO Foundation. Final pricing depends on scope, competition, website size, content volume and deliverables.' },
    ],
  },
  usa: {
    code: 'US',
    name: 'USA',
    title: 'Digital Marketing Services for the USA',
    h1: 'Digital Marketing Services for the USA',
    description: 'Reach US audiences with search, content, and growth strategies that match the fast-moving, competitive landscape of the US.',
    slug: 'digital-marketing-services-usa',
    areaServed: 'US',
    context: 'ADVMEN provides digital marketing and technology solutions for companies targeting the USA. Our strategists dive into the market, understand local audiences, competition and search behaviour, and customize every strategy to fit it.',
    focus: [
      'Search, AEO and GEO strategies for highly competitive US categories',
      'Content and authority building that earns trust with US buyers',
      'Performance campaigns aligned with the wider growth strategy',
    ],
    currency: 'USD',
    prices: [
      { plan: 'Starter — SEO Foundation', range: '$400–600 / month' },
      { plan: 'Growth — SEO + AEO', range: '$900–1,500 / month' },
      { plan: 'Dominate — SEO + AEO + GEO', range: '$2,000–3,500 / month' },
    ],
    faqs: [
      { question: 'Does ADVMEN work with businesses in the USA?', answer: 'Absolutely. ADVMEN collaborates with international businesses, creating digital solutions that fit different markets, audiences, and business goals.' },
      { question: 'Do you tailor strategy to the US market?', answer: 'Yes. Audiences behave differently, competition shifts and search patterns vary, so each strategy is customized to the market you want to tap into.' },
      { question: 'What does a US SEO package cost?', answer: 'Packages start at $400–600 per month for SEO Foundation, with final pricing confirmed after scoping your requirements.' },
    ],
  },
  uae: {
    code: 'AE',
    name: 'UAE',
    title: 'Digital Marketing Services for the UAE',
    h1: 'Digital Marketing Services for the UAE',
    description: 'Develop search visibility and digital presence for businesses targeting audiences across the UAE.',
    slug: 'digital-marketing-services-uae',
    areaServed: 'AE',
    context: 'ADVMEN supports businesses in the UAE with digital marketing and technology solutions built around local audiences, competition and search patterns — so your brand is easier to discover, trust and choose.',
    focus: [
      'Search visibility and local discovery for UAE audiences',
      'Branding and content that communicate your value with clarity',
      'Websites and digital products built for conversion',
    ],
    currency: 'AED',
    prices: [
      { plan: 'Starter — SEO Foundation', range: 'AED 1,500–2,200 / month' },
      { plan: 'Growth — SEO + AEO', range: 'AED 3,300–5,500 / month' },
      { plan: 'Dominate — SEO + AEO + GEO', range: 'AED 7,350–12,850 / month' },
    ],
    faqs: [
      { question: 'Does ADVMEN provide digital marketing services in the UAE?', answer: 'Yes. ADVMEN provides digital marketing and technology solutions for companies in India, USA, UAE and Europe.' },
      { question: 'Can you help with AI search visibility in the UAE?', answer: 'Yes. We use AI search optimization, structured content, entity-focused strategies and GEO techniques to boost your presence in AI-powered search results.' },
      { question: 'What are your UAE package prices?', answer: 'Packages start at AED 1,500–2,200 per month for SEO Foundation. Final pricing depends on scope, competition and target market.' },
    ],
  },
  europe: {
    code: 'EU',
    name: 'Europe',
    title: 'Digital Marketing Services for Europe',
    h1: 'Digital Marketing Services for Europe',
    description: 'Build digital growth strategies designed around European audiences, markets, and search behaviour.',
    slug: 'digital-marketing-services-europe',
    areaServed: '150',
    context: 'Europe is not one market. We design digital growth strategies around the audiences, competition and search behaviour of the European markets you want to reach — with clear scope and reporting throughout.',
    focus: [
      'Market-by-market search and content strategy',
      'Authority building and digital PR for European audiences',
      'Technical foundations and structured data that scale',
    ],
    currency: 'EUR',
    prices: [
      { plan: 'Starter — SEO Foundation', range: '€350–550 / month' },
      { plan: 'Growth — SEO + AEO', range: '€800–1,350 / month' },
      { plan: 'Dominate — SEO + AEO + GEO', range: '€1,800–3,200 / month' },
    ],
    faqs: [
      { question: 'Does ADVMEN work with European businesses?', answer: 'Absolutely. ADVMEN collaborates with international businesses, creating digital solutions that fit different markets, audiences, and business goals.' },
      { question: 'What is the difference between SEO, AEO and GEO?', answer: 'SEO improves visibility on search engines. AEO helps your content show up in direct-answer queries, while GEO focuses on visibility across AI-driven search results.' },
      { question: 'How much do European packages cost?', answer: 'Packages start at €350–550 per month for SEO Foundation. Final pricing depends on scope, competition, website size and deliverables.' },
    ],
  },
}

const MARKET_ORDER = ['india', 'usa', 'uae', 'europe']

const Eyebrow = ({ children }) => <span className="eyebrow">{children}</span>

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
          faqs: data.faqs,
          breadcrumbs: [
            { name: 'Home', url: COMPANY.website },
            { name: data.title, url: `${COMPANY.website}/${data.slug}` },
          ],
        }}
      />

      {/* Hero */}
      <section
        style={{
          background: 'var(--color-black)',
          paddingTop: 'calc(var(--navbar-height) + clamp(2.5rem, 6vw, 5rem))',
          paddingBottom: 'clamp(3rem, 7vw, 5rem)',
        }}
      >
        <div className="container">
          <Eyebrow>{data.name} Market</Eyebrow>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              lineHeight: 1.1,
              maxWidth: '860px',
              marginBottom: '1.25rem',
            }}
          >
            {data.h1}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', maxWidth: '680px', lineHeight: 1.7, marginBottom: '2rem' }}>
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary btn-lg" data-cursor="hover">Get a Free Growth Audit</Link>
            <Link to="/pricing" className="btn-outline btn-lg" data-cursor="hover">View Full Pricing</Link>
          </div>
        </div>
      </section>

      {/* Context + focus */}
      <section
        style={{
          background: 'var(--color-surface-2)',
          borderBlock: '2px solid var(--color-ink)',
          padding: 'clamp(3rem, 7vw, 5rem) 0',
        }}
      >
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <Eyebrow>Why ADVMEN</Eyebrow>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)' }}>
              Each market is different. Where you go matters.
            </h2>
            <p style={{ marginTop: '1.25rem', fontSize: '1.05rem', lineHeight: 1.75 }}>{data.context}</p>
          </div>
          <ul className="flex flex-col gap-4">
            {data.focus.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3"
                style={{
                  padding: '1rem 1.25rem',
                  border: '2px solid var(--color-ink)',
                  borderRadius: '0.75rem',
                  background: 'var(--color-surface-1)',
                  boxShadow: '3px 3px 0 var(--color-ink)',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}
              >
                <span aria-hidden="true" style={{ color: 'var(--color-orange)', fontWeight: 800 }}>→</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section style={{ background: 'var(--color-black)', padding: 'clamp(3rem, 7vw, 5rem) 0' }}>
        <div className="container">
          <Eyebrow>What We Offer</Eyebrow>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '2rem' }}>
            Services for {data.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              >
                <Link to={s.to} className="card flex flex-col h-full" style={{ padding: '1.25rem' }} data-cursor="hover">
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{s.label}</h3>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem', flexGrow: 1 }}>{s.desc}</p>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-orange)' }}>Learn More →</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section
        style={{
          background: 'var(--color-surface-1)',
          borderBlock: '2px solid var(--color-ink)',
          padding: 'clamp(3rem, 7vw, 5rem) 0',
        }}
      >
        <div className="container">
          <Eyebrow>Our 4D Growth Framework</Eyebrow>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '2rem' }}>
            A structured approach to growth in {data.name}
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((st) => (
              <li key={st.n} className="card" style={{ padding: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.25rem', color: 'var(--color-orange)', lineHeight: 1 }}>{st.n}</span>
                <h3 style={{ fontSize: '1.15rem', margin: '0.6rem 0 0.4rem' }}>{st.t}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{st.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: 'var(--color-black)', padding: 'clamp(3rem, 7vw, 5rem) 0' }}>
        <div className="container">
          <Eyebrow>Pricing in {data.currency}</Eyebrow>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '2rem' }}>
            Choose your plan. Build brand at your pace.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.prices.map((p, i) => (
              <div
                key={p.plan}
                className="card"
                style={{ padding: '1.5rem', background: i === 1 ? 'var(--color-orange)' : 'var(--color-surface-1)' }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.6rem' }}>{p.plan}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-ink)' }}>{p.range}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.25rem', fontSize: '0.875rem', maxWidth: '760px' }}>
            Package prices are indicative starting ranges. Final pricing depends on scope, competition, website size,
            content volume, target market, and required deliverables.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          background: 'var(--color-surface-2)',
          borderBlock: '2px solid var(--color-ink)',
          padding: 'clamp(3rem, 7vw, 5rem) 0',
        }}
      >
        <div className="container" style={{ maxWidth: '900px' }}>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1.5rem' }}>
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {data.faqs.map((f) => (
              <details
                key={f.question}
                style={{
                  border: '2px solid var(--color-ink)',
                  borderRadius: '0.75rem',
                  background: 'var(--color-surface-1)',
                  padding: '1rem 1.25rem',
                }}
              >
                <summary style={{ cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-ink)' }}>
                  {f.question}
                </summary>
                <p style={{ marginTop: '0.75rem', lineHeight: 1.7 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other markets + CTA */}
      <section style={{ background: 'var(--color-black)', padding: 'clamp(3rem, 7vw, 5rem) 0' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>
            Let’s talk about your brand
          </h2>
          <p style={{ maxWidth: '560px', margin: '0 auto 1.75rem' }}>
            Your next customer is already searching. Make your brand worth finding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/contact" className="btn-primary btn-lg" data-cursor="hover">Get a Free Growth Audit</Link>
            <Link to="/contact" className="btn-outline btn-lg" data-cursor="hover">Talk to ADVMEN</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3" aria-label="Other markets">
            {MARKET_ORDER.filter((m) => m !== market).map((m) => (
              <Link key={m} to={`/${marketData[m].slug}`} className="tag" data-cursor="hover">
                {marketData[m].title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default MarketPage
