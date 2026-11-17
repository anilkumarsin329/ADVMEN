/**
 * pages/ServiceDetail/SEOServices.jsx
 * Dedicated landing page for /services/seo
 * SEO / AEO / GEO optimised with structured schema, internal linking,
 * breadcrumbs, FAQPage, HowTo, and speakable markup.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/seo'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`

const TITLE = 'SEO Optimization Services | ADVMEN Technologies'
const DESCRIPTION =
  'Grow qualified organic traffic with SEO optimization services covering technical fixes, content, links, and clear reporting. Book your audit today.'
const KEYWORDS =
  'SEO optimization services, SEO services for businesses, SEO agency, technical SEO services, on-page SEO, off-page SEO, local SEO services, e-commerce SEO, SEO audit and strategy, SEO company India, best SEO agency India, organic search optimization, search engine optimization services, SEO services for small business, B2B SEO services, SEO audit services'

const PAGE_LINKS = [
  { phrase: 'technical SEO services', to: '/services/seo' },
  { phrase: 'on-page SEO', to: '/services/seo' },
  { phrase: 'off-page SEO', to: '/services/seo' },
  { phrase: 'local SEO services', to: '/services/seo' },
  { phrase: 'e-commerce SEO', to: '/services/seo' },
  { phrase: 'SEO audit and strategy', to: '/services/seo' },
  { phrase: 'SEO services for businesses', to: '/services/seo' },
  { phrase: 'AEO & GEO optimization services', to: '/services/aeo-geo' },
  { phrase: 'AEO and GEO optimization', to: '/services/aeo-geo' },
  { phrase: 'AEO and GEO', to: '/services/aeo-geo' },
  { phrase: 'website development team', to: '/services/website-development' },
  { phrase: 'website development', to: '/services/website-development' },
  { phrase: 'digital marketing team', to: '/digital-marketing-services-india' },
  { phrase: 'digital marketing services', to: '/digital-marketing-services-india' },
  { phrase: 'performance marketing', to: '/services/performance-marketing' },
  { phrase: 'content marketing', to: '/services/content-marketing' },
  { phrase: 'social media management', to: '/services/social-media-management' },
  { phrase: 'branding and logo design', to: '/services/branding' },
  { phrase: 'e-commerce website development', to: '/services/website-development/ecommerce' },
  { phrase: 'our work', to: '/work' },
  { phrase: 'contact us', to: '/contact' },
]

const SERVICES = [
  {
    id: 'technical',
    title: 'Technical SEO Services',
    intro: 'Search engines cannot rank what they cannot crawl, render, and index. Our technical SEO services examine:',
    bullets: [
      'Crawlability and indexation: robots.txt rules, XML sitemaps, crawl depth, orphan pages, and index bloat',
      'Canonicalization: canonical tags, parameter URLs, duplicate content, and hreflang for multi-region sites',
      'Speed and Core Web Vitals: Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift',
      'Rendering: JavaScript-dependent content, lazy-loaded elements, and mobile usability',
      'Structured data: Organization, Breadcrumb, Product, and Article schema, validated before release',
      'Status codes and redirects: chains, loops, broken links, and soft 404s',
    ],
    footer: 'Every issue is logged with a severity, an effort estimate, and an owner. We hand developers clear tickets and, where needed, work alongside the website development team so fixes ship cleanly.',
  },
  {
    id: 'onpage',
    title: 'On-Page SEO',
    body: 'Every page should answer one search intent better than the alternatives. Our on-page SEO covers title tags and meta descriptions written for click-through, a logical H1–H3 hierarchy, intent-matched copy, descriptive image alt text, schema markup, and clear calls to action. We also check for keyword cannibalization, where two of your pages compete for the same query and weaken each other.',
  },
  {
    id: 'content',
    title: 'Content and Keyword Strategy',
    body: 'We start with keyword research grouped by intent — informational, commercial, transactional, and local — then map each cluster to a page. A competitor gap analysis shows which topics rivals rank for and you do not. From there, we build a content calendar, brief your writers or support the writing where needed, and refresh older pages that have slipped. Our digital marketing team can then extend winning content into social and email.',
  },
  {
    id: 'internal',
    title: 'Internal Linking and Site Architecture',
    body: 'Internal links tell search engines which pages matter. We flatten deep structures, build topic clusters around your core service pages, connect orphan pages, and rewrite anchor text so authority flows to the pages that generate enquiries and sales.',
  },
  {
    id: 'offpage',
    title: 'Off-Page SEO and Authority',
    body: 'Our off-page SEO strengthens trust signals beyond your website: digital PR, relevant editorial mentions, partner and directory listings, and a backlink profile review that flags low-quality or risky links. We do not buy links or use schemes that put your site at risk.',
  },
  {
    id: 'local',
    title: 'Local SEO Services',
    body: 'Our local SEO services include Google Business Profile optimisation, consistent name, address, and phone data across directories, location landing pages, local schema, and a review-generation and response process. They suit clinics, professional firms, and multi-location brands that must appear when nearby customers search.',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce SEO',
    body: 'Our e-commerce SEO tackles what quietly drains organic revenue: category and subcategory architecture, faceted navigation that spawns thousands of duplicate URLs, thin product descriptions, product and review schema, pagination, and out-of-stock or discontinued product handling.',
  },
]

const PROCESS = [
  { title: 'Audit and Strategy', body: 'We crawl your site, review Google Search Console and GA4 data, assess content and backlinks, and benchmark your competitors. You receive findings in plain language — not a 90-page data dump.' },
  { title: 'Roadmap', body: 'Findings become a prioritised plan ranked by impact and effort, with owners, dependencies, and timelines, so you know what happens in the first 30, 60, and 90 days.' },
  { title: 'Implementation', body: 'Quick wins ship first: indexation fixes, title and heading updates, and internal links. On-page SEO improvements then roll out page by page, starting with your highest-value URLs.' },
  { title: 'Measurement', body: 'We track impressions, clicks, average rankings, organic conversions, and qualified leads. Reports tie search activity to enquiries and revenue, separating branded from non-branded traffic so growth is never overstated.' },
  { title: 'Refinement', body: 'Search behaviour and competitors keep changing. We review results regularly, retire tactics that underperform, and scale those that work, adjusting the roadmap as new data arrives.' },
]

const BENEFITS = [
  { title: 'Clear Priorities', body: 'A ranked list of fixes so budget is spent where it has the most impact.' },
  { title: 'A Healthier Website', body: 'Fewer crawl errors, quicker pages, and a cleaner structure that search engines can read.' },
  { title: 'More Qualified Traffic', body: 'Content that matches what buyers are looking for at each stage of the journey.' },
  { title: 'Transparent Reporting', body: 'Metrics tied to leads and revenue, not vanity numbers that look good but mean nothing.' },
  { title: 'Seamless Collaboration', body: 'One clear process for your developers, writers, and marketers — no crossed wires.' },
]

const AUDIENCES = [
  'Startups that need a search foundation before or at launch',
  'B2B companies with long sales cycles that need qualified leads, not just visits',
  'Clinics, businesses, and service providers that rely on local clients',
  'Online stores dealing with indexing complexity across thousands of URLs',
  'Companies that did a site redesign or migration and saw a drop in traffic',
]

const WHY_ADVMEN = [
  { title: 'Strategy Before Execution', body: 'We start by understanding your business goals, audience, and competitors, then run a full SEO audit and strategy review before recommending a single change.' },
  { title: 'Every Action Has a Purpose', body: 'From technical fixes to content and links, each task is tied to a measurable goal — impressions, clicks, organic conversions, or qualified leads.' },
  { title: 'Optimisation That Works Everywhere', body: 'We plan for search engines, mobile devices, nearby customers, and AI-driven discovery. Explore our AEO & GEO optimization services for the next layer.' },
  { title: 'One Team, Connected Thinking', body: 'As a reliable SEO agency with a website development team and a digital marketing team under one roof, we fix problems at the source and plan with your wider digital presence in mind.' },
  { title: 'Practical, Ready-to-Use Deliverables', body: 'Our SEO optimization services produce prioritised roadmaps, clear developer tickets, honest recommendations, and plain-language reports. We never promise fixed rankings.' },
  { title: 'Built for Long-Term Growth', body: 'We build search foundations that keep working as your business grows, and we can align them with a consistent identity from our branding and logo design team.' },
]

const FAQS = [
  { question: 'What is Included in SEO Optimization Services?', answer: 'The scope usually covers a technical review, on-page improvements, keyword and content strategy, internal linking, authority building, and monthly reporting. Local search and e-commerce SEO work are added where relevant. We define the full scope, deliverables, and reporting cadence before we begin.' },
  { question: 'How Long Does SEO Take to Show Results?', answer: 'Most businesses see early signals — better indexing, impressions, and click-through rate — within a few months. Stronger traffic and lead growth takes longer. Timelines depend on competition, site health, content quality, and how quickly fixes are implemented. Our SEO services for businesses are planned around steady, compounding progress rather than overnight spikes.' },
  { question: 'Do You Provide Technical SEO Audits?', answer: 'Yes. Our technical SEO services begin with a detailed audit of crawlability, speed, structure, indexation, and structured data, followed by a prioritised fix list your developers can act on.' },
  { question: 'Can You Help With Local Search?', answer: 'Yes. Our local SEO services include Google Business Profile optimisation, citations, review strategy, and location-focused content for businesses serving specific areas.' },
  { question: 'Do You Work With Online Stores?', answer: 'Yes. Our e-commerce SEO covers category structure, product pages, filters, pagination, and schema for stores on popular platforms. Share your platform when you contact us.' },
  { question: 'How Do You Measure SEO Performance?', answer: 'We track impressions, clicks, rankings, organic conversions, and qualified leads through Google Search Console and analytics. Each report explains what changed, why it changed, and what we will do next.' },
  { question: 'Can You Recover Traffic After a Website Migration?', answer: 'Often, yes, once the cause is identified: broken redirects, lost pages, changed URLs, or blocked crawling. We audit the migration, fix the issues, and monitor recovery, though results cannot be guaranteed.' },
  { question: 'Do You Guarantee First-Page Google Rankings?', answer: 'No. ADVMEN will not make that promise, and no reputable SEO agency can, because search engines control their own results. We commit to a clear process, honest reporting, and work that improves your chances of being found.' },
  { question: 'How Does SEO Work Alongside AEO and GEO?', answer: 'SEO improves your visibility in classic search results. AEO and GEO optimization extends that to AI-powered answer engines and generative search platforms. Our team covers all three layers, so your content is built to be found however people search.' },
]

const RELATED = [
  { label: 'AEO & GEO / AI Search', to: '/services/aeo-geo' },
  { label: 'Content Marketing', to: '/services/content-marketing' },
  { label: 'Performance Marketing', to: '/services/performance-marketing' },
  { label: 'Digital Marketing', to: '/digital-marketing-services-india' },
  { label: 'Social Media Management', to: '/services/social-media-management' },
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Professional Website Design', to: '/services/professional-website-design' },
  { label: 'E-Commerce Development', to: '/services/website-development/ecommerce' },
  { label: 'Branding & Logo Design', to: '/services/branding' },
  { label: 'Android App Development', to: '/services/app-development/android' },
  { label: 'iOS App Development', to: '/services/app-development/ios' },
  { label: 'Our Work', to: '/work' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

const sectionPad = { padding: 'clamp(3rem, 7vw, 5rem) 0' }
const h2Style = { fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)', lineHeight: 1.15, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }
const h3Style = { fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }
const bodyStyle = { fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text-secondary)' }
const cardStyle = { background: 'var(--color-surface-1)', border: '2px solid var(--color-ink)', borderRadius: '1rem', boxShadow: '4px 4px 0 var(--color-ink)', padding: '1.5rem' }
const bandStyle = { ...sectionPad, background: 'var(--color-surface-2)', borderTop: '2px solid var(--color-ink)', borderBottom: '2px solid var(--color-ink)' }

const link = (text) => autoLink(text, PAGE_LINKS, PAGE_PATH)

const Reveal = ({ children, delay = 0, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay }}
    {...rest}
  >
    {children}
  </motion.div>
)

const SEOServices = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/Image/advmen_service6.webp`}
      schemaData={{
        serviceName: 'SEO Optimization Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'SEO Optimization Services', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: AUDIENCES.map((name) => ({ name })),
        itemsName: 'Who our SEO optimization services are built for',
        image: `${COMPANY.website}/Image/advmen_service6.webp`,
        howTo: {
          name: 'How ADVMEN delivers SEO from audit to measurable growth',
          description: "ADVMEN's five-stage SEO process: audit and strategy, roadmap, implementation, measurement, and refinement.",
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* ── Hero ─────────────────────────────────────────────── */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="SEO optimization services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>SEO Optimization Services</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              SEO Optimization Services That Drive Qualified Leads
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              Your website looks polished, yet it sits on page three where buyers never scroll.
            </p>
            <p style={bodyStyle}>
              Pages go unindexed. Product listings compete against each other. Blog posts attract visits that never become enquiries. And every month your team asks the same question: is SEO actually working?
            </p>
            <p style={bodyStyle}>
              The problem is rarely effort. It is usually a missing system. ADVMEN Technologies delivers SEO optimization services built on three principles: diagnose before acting, fix the foundations before scaling content, and report on the outcomes that matter to revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'SEO Audit' }} className="btn-primary btn-lg" data-cursor="hover">Get an SEO Audit</Link>
              <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">Explore Our Work</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center p-6" style={{ background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }}>
              <img
                src="/Image/advmen_service6.webp"
                alt="SEO optimization services by ADVMEN Technologies"
                width="600"
                height="420"
                decoding="async"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Services ─────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="What our SEO optimization services include">
      <div className="container">
        <h2 className="section-title" style={h2Style}>What Our SEO Optimization Services Include</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          Search performance rests on seven connected layers. We cover each one, so nothing is left to chance.
        </p>
        <div className="flex flex-col gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04} style={cardStyle} className="flex flex-col">
              <h3 style={h3Style}>{s.title}</h3>
              {s.intro && <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>{link(s.intro)}</p>}
              {s.bullets && (
                <ul className="flex flex-col gap-2 mb-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2" style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--color-orange)' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {s.footer && <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{link(s.footer)}</p>}
              {s.body && <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{link(s.body)}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Process ──────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="From audit to measurable growth">
      <div className="container">
        <h2 className="section-title" style={h2Style}>From Audit to Measurable Growth</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Every engagement follows a transparent five-stage workflow.</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="SEO process steps">
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} id={`step-${i + 1}`} delay={(i % 3) * 0.06} style={cardStyle} className="flex flex-col">
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-orange)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                {String(i + 1).padStart(2, '0')} — {p.title}
              </span>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    {/* ── Benefits ─────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Benefits of SEO for your business">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Benefits of SEO for Your Business</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          Our SEO services for businesses are designed for teams that want clarity instead of guesswork. You can expect:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.06} style={cardStyle} className="flex flex-col">
              <h3 style={{ ...h3Style, fontSize: '1.05rem' }}>{b.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{b.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Who it fits ──────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Who our SEO services are built for">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Who Our SEO Services Are Built For</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.75rem' }}>Our SEO optimization services fit:</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AUDIENCES.map((a, i) => (
            <li key={a} className="flex items-start gap-3" style={{ ...cardStyle, padding: '1rem 1.1rem', boxShadow: '3px 3px 0 var(--color-ink)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-orange)', fontSize: '0.8rem', marginTop: '0.2rem', flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--color-ink)' }}>{link(a)}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* ── AEO / GEO ────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="SEO and AI search visibility">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>SEO, AEO, and GEO — Three Layers of Search Visibility</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            Classic SEO improves your visibility in Google and Bing search results. But people now also ask AI-powered platforms — ChatGPT, Perplexity, Google AI Overviews — questions like "best SEO agency for B2B companies" or "which SEO services are worth it for small businesses." These tools pull answers from sources they trust.
          </p>
          <p style={bodyStyle}>
            Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) extend your search strategy to cover those AI-driven results. Clear content structure, FAQ schema, entity signals, and consistent business information across the web all help. We build these foundations into every SEO engagement from day one.
          </p>
          <p style={bodyStyle}>
            No one can guarantee placement in AI answers — each platform picks its own sources. What we can do is make your site technically sound, your content clearly structured, and your brand consistently represented, giving it the best possible chance across every search surface.
          </p>
          <p>
            <Link to="/services/aeo-geo" style={LINK_STYLE}>Explore our AEO &amp; GEO optimization services →</Link>
          </p>
        </div>
      </div>
    </section>

    {/* ── Why ADVMEN ───────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Why brands choose ADVMEN">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Why Brands Choose ADVMEN</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_ADVMEN.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.07} style={cardStyle} className="flex flex-col">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{w.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{link(w.body)}</p>
            </Reveal>
          ))}
        </div>
        <p style={{ ...bodyStyle, marginTop: '1.75rem' }}>
          Beyond SEO, our team covers <Link to="/services/aeo-geo" style={LINK_STYLE}>AEO &amp; GEO optimization</Link> for AI search, <Link to="/services/content-marketing" style={LINK_STYLE}>content marketing</Link>, <Link to="/services/performance-marketing" style={LINK_STYLE}>performance marketing</Link>, <Link to="/services/social-media-management" style={LINK_STYLE}>social media management</Link>, and <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing services</Link> — so every channel supports your organic growth.
        </p>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Start your SEO project">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Ready to Find Out What Is Holding Your Rankings Back?</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>
          Share your website and goals with ADVMEN. We will recommend the right next step — from an SEO audit and strategy discussion to a full roadmap — and send a clear quote.
        </p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          Whether you need SEO optimization services for a new site or a rescue plan for a stalled one, we are ready to talk.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'SEO Consultation' }} className="btn-primary btn-lg" data-cursor="hover">Request a Consultation</Link>
          <Link to="/contact" state={{ plan: 'SEO Audit' }} className="btn-outline btn-lg" data-cursor="hover">Get an SEO Audit</Link>
        </div>
      </div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Frequently asked questions about SEO optimization services">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Frequently Asked Questions</h2>
        <div className="flex flex-col">
          {FAQS.map((f) => (
            <details key={f.question} className="group" style={{ borderBottom: '1px solid var(--color-border-subtle)', padding: '1rem 0' }}>
              <summary className="flex justify-between items-center gap-4 cursor-pointer list-none">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', fontWeight: 600, lineHeight: 1.4 }}>{f.question}</h3>
                <span aria-hidden="true" className="transition-transform duration-300 group-open:rotate-45" style={{ fontSize: '1.4rem', color: 'var(--color-orange)', lineHeight: 1 }}>+</span>
              </summary>
              <p style={{ ...bodyStyle, fontSize: '0.95rem', marginTop: '0.75rem' }}>{link(f.answer)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* ── Related pages ────────────────────────────────────── */}
    <section style={{ padding: '3rem 0 5rem', background: 'var(--color-black)' }} aria-label="Related services and pages">
      <div className="container">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '1rem' }}>
          Explore related services
        </p>
        <ul className="flex flex-wrap gap-3">
          {RELATED.map((r) => (
            <li key={r.to}>
              <Link
                to={r.to}
                className="inline-block text-sm font-semibold transition-colors duration-300 hover:text-[var(--color-orange)]"
                style={{ color: 'var(--color-text-primary)', border: '2px solid var(--color-ink)', borderRadius: '9999px', padding: '0.4rem 1rem' }}
                data-cursor="hover"
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </PageTransition>
)

export default SEOServices
