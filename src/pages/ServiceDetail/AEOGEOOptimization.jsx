/**
 * pages/ServiceDetail/AEOGEOOptimization.jsx
 * Dedicated landing page for /services/aeo-geo-optimization
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/aeo-geo-optimization'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`

const TITLE = 'AEO and GEO Optimization Services | ADVMEN Technologies'
const DESCRIPTION =
  'Get found in AI answers. Our AEO and GEO optimization services improve content clarity, entity signals, and AI visibility. Book an audit today.'
const KEYWORDS =
  'AEO and GEO optimization services, answer engine optimization, generative engine optimization, GEO services, AEO services, AI search optimization, AI visibility optimization, structured data for SEO, content optimization for AI search, AEO agency, GEO agency, AI search visibility, generative search optimization, entity optimization, AI overview optimization'

const PAGE_LINKS = [
  { phrase: 'SEO team', to: '/services/seo' },
  { phrase: 'SEO Optimization', to: '/services/seo' },
  { phrase: 'SEO foundation', to: '/services/seo' },
  { phrase: 'traditional SEO', to: '/services/seo' },
  { phrase: 'search strategy', to: '/services/seo' },
  { phrase: 'Branding and logo design team', to: '/services/branding' },
  { phrase: 'branding team', to: '/services/branding' },
  { phrase: 'Branding and Logo Design', to: '/services/branding' },
  { phrase: 'website development team', to: '/services/website-development' },
  { phrase: 'Website Development', to: '/services/website-development' },
  { phrase: 'web development team', to: '/services/website-development' },
  { phrase: 'portfolio and case studies', to: '/work' },
  { phrase: 'our work', to: '/work' },
  { phrase: 'contact us', to: '/contact' },
]

const SERVICES = [
  {
    id: 'entity',
    title: 'Entity Clarity and Brand Consistency',
    body: 'We define your brand as a clear entity: one consistent name, service descriptions, address and contact details, leadership and author information, and links between your website and your key profiles. We audit mismatches across your site, directories, and social profiles, then align them so every platform reads the same story.',
  },
  {
    id: 'answer',
    title: 'Answer-Led Content',
    body: 'Our AEO services restructure pages around the real questions your buyers ask. We lead with a direct answer, then add context, evidence, and next steps. Definition blocks, step-by-step sections, comparison tables, and well-built FAQs make passages easy to extract without making the page feel robotic to human readers.',
  },
  {
    id: 'topical',
    title: 'Topical Coverage and Content Gaps',
    body: 'We map the questions, comparisons, and objections around your services, find the gaps your competitors have already filled, and plan new content with your writers or alongside them. This content optimization for AI search also strengthens your traditional rankings, because depth and clarity help both.',
  },
  {
    id: 'schema',
    title: 'Structured Data and Markup',
    body: 'We implement structured data for SEO and validate Organization, Service, Article, Product, Person, and breadcrumb markup where it fits the content, and FAQ markup only where the visible content and current Google guidelines support it. No schema type guarantees AI inclusion, and we say so plainly.',
  },
  {
    id: 'crawl',
    title: 'Crawlability and Technical Access',
    body: 'We review robots.txt rules, meta directives, how key content renders, XML sitemaps, canonical tags, page speed, and internal linking, and we help you decide which crawlers to allow. When changes touch your code, our website development team handles implementation.',
  },
  {
    id: 'credibility',
    title: 'Source Credibility and Off-Site Signals',
    body: 'We strengthen E-E-A-T signals with expert author bios, reviewer credits, original insights, and citations to reputable sources, then support them with digital PR, quality mentions, and reviews. We never fabricate credentials, reviews, or links.',
  },
  {
    id: 'generative',
    title: 'Generative Search Visibility',
    body: 'Our GEO services focus on how your brand appears in generative answers on platforms such as ChatGPT, Google AI Overviews, Gemini, Perplexity, and Microsoft Copilot. We test real buyer prompts, record where you are mentioned or missing, study which sources are cited, and benchmark you against competitors.',
  },
]

const PROCESS = [
  { title: 'Discovery and Baseline', body: 'We learn your services, audience, and goals, then test a set of real buyer prompts across major AI platforms to see how your brand is described today.' },
  { title: 'Audit', body: 'We review content, entity consistency, markup, crawl access, and off-site signals, and compare your presence in AI answers with that of your competitors.' },
  { title: 'Roadmap', body: 'Findings become a prioritized plan ranked by impact and effort, with owners, dependencies, and timelines, so you always know what comes next.' },
  { title: 'Implementation', body: 'We restructure content, add markup, fix technical barriers, and support off-site work in focused sprints. We collaborate with your developers and content team through briefs, tickets, and approvals.' },
  { title: 'Monitoring and Refinement', body: 'Our AI visibility optimization reporting tracks citations, brand mentions, referral traffic from AI platforms, impressions and clicks in Google Search Console, branded search demand, and qualified leads. AI outputs shift, so we sample on a regular schedule and adjust the plan.' },
]

const AUDIENCES = [
  'B2B companies with research-heavy buying journeys',
  'Professional and service firms that rely on trust',
  'Healthcare and wellness brands that need accurate, credible information',
  'E-commerce brands whose products are compared and recommended',
  'SaaS and technology companies with complex offers to explain',
  'Brands already investing in SEO that want to extend it to AI platforms',
]

const WHY_ADVMEN = [
  { title: 'Strategy Before Execution', body: 'We start by understanding your business goals, audience, and the questions buyers actually ask, then audit before recommending a single change.' },
  { title: 'Every Action Has a Purpose', body: 'From entity fixes to content and markup, each task is tied to a measurable goal — citations, mentions, impressions, clicks, or qualified leads.' },
  { title: 'Optimization That Works Everywhere', body: 'We plan for search engines, voice assistants, mobile users, and generative platforms, because your customers move between all of them.' },
  { title: 'One Team, Connected Thinking', body: 'With our website development team, SEO team, and digital marketing teams under one roof, your visibility plan is built with your wider digital presence in mind.' },
  { title: 'Practical, Ready-to-Use Deliverables', body: 'Our AEO and GEO optimization services produce prioritized roadmaps, clear developer tickets, honest recommendations, and plain-language reports. We never promise placement in any AI platform.' },
  { title: 'Built for Long-Term Growth', body: 'We build foundations that keep working as platforms change, and we can align them with a consistent identity from our Branding and Logo Design team.' },
]

const FAQS = [
  { question: 'What is AEO?', answer: 'Answer engine optimization is the practice of structuring content so it answers questions clearly and can be easily extracted for featured snippets, voice assistants, and AI-generated answers. It focuses on direct answers, logical structure, and trustworthy information.' },
  { question: 'What is GEO?', answer: 'Generative engine optimization is the practice of improving how discoverable, credible, and useful your content is across generative search experiences. It focuses on entity clarity, topical depth, source credibility, and consistent brand information.' },
  { question: 'How are AEO, GEO, and SEO different?', answer: 'SEO builds the technical and content foundation that helps pages get found and ranked. AEO makes content easier to answer and quote, while GEO builds the trust and clarity that help AI systems understand and reference your brand. Content optimization for AI search is where the three overlap, and they work best together.' },
  { question: 'Can a business optimize for AI-powered search?', answer: 'Yes. Our AEO and GEO optimization services improve clarity, consistency, and credibility, which gives your brand a better chance of being understood and cited. Each platform decides its own sources, so no agency can control or guarantee how your brand appears.' },
  { question: 'Does schema markup guarantee AI citations?', answer: 'No. Structured data for SEO helps machines interpret your pages, but it is one signal among many. Content quality, credibility, crawl access, and consistency all matter, and no single file or tactic guarantees inclusion.' },
  { question: 'How do you measure AEO and GEO performance?', answer: 'Our AI visibility optimization reporting looks at citations and brand mentions across sampled prompts, referral traffic from AI platforms, Search Console impressions and clicks, branded search demand, and qualified leads. Because AI results vary, we track trends over time instead of single snapshots.' },
  { question: 'How long does AI search optimization take?', answer: 'Technical fixes and content restructuring can show early signals within a few months, while authority and trust build more slowly. Our GEO services in particular depend on signals that grow over time, and platform behavior changes, so we plan for steady progress with regular reviews.' },
  { question: 'Should AEO and GEO replace traditional SEO?', answer: 'No. Traditional search still drives traffic and builds the foundation AI platforms rely on. Our AEO services sit on top of a healthy search strategy, extending it rather than replacing it.' },
]

const RELATED = [
  { label: 'SEO Optimization', to: '/services/seo' },
  { label: 'Content Marketing', to: '/services/content-marketing' },
  { label: 'Performance Marketing', to: '/services/performance-marketing' },
  { label: 'Digital Marketing', to: '/digital-marketing-services-india' },
  { label: 'Social Media Management', to: '/services/social-media-management' },
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Professional Website Design', to: '/services/professional-website-design' },
  { label: 'E-Commerce Development', to: '/services/website-development/ecommerce' },
  { label: 'Branding & Logo Design', to: '/services/branding' },
  { label: 'UI/UX Design', to: '/services/ui-ux-design' },
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

const AEOGEOOptimization = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/Image/ADVMEN AEO & GEO Optimization.png`}
      schemaData={{
        serviceName: 'AEO and GEO Optimization Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'AEO and GEO Optimization Services', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: AUDIENCES.map((name) => ({ name })),
        itemsName: 'Who our AEO and GEO optimization services are built for',
        image: `${COMPANY.website}/Image/ADVMEN AEO & GEO Optimization.png`,
        howTo: {
          name: 'How ADVMEN delivers AEO and GEO optimization from baseline to refinement',
          description: "ADVMEN's five-stage AI visibility workflow: discovery and baseline, audit, roadmap, implementation, and monitoring.",
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* ── Hero ─────────────────────────────────────────────── */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="AEO and GEO optimization services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>AEO &amp; GEO Optimization</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              AEO and GEO Optimization Services Built to Be Cited
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              A potential customer opens an AI assistant and asks who the best partner for this service is near them. Your competitor is named. You are not.
            </p>
            <p style={bodyStyle}>
              Nothing is wrong with your website, and your Google rankings may even look healthy. The difference is that AI platforms build answers from sources they can read, understand, and trust — and your brand may not be giving them enough to work with.
            </p>
            <p style={bodyStyle}>
              ADVMEN Technologies helps close that gap. Our AEO and GEO optimization services make your content clearer to answer, easier to cite, and more consistent across the web — all built on a sound SEO foundation. We cannot promise that any platform will mention you, because every platform chooses its own sources. Our standard approach removes the guesswork and gives your brand the best chance to be understood and surfaced.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'AEO GEO Strategy Call' }} className="btn-primary btn-lg" data-cursor="hover">Book a Strategy Call</Link>
              <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">Explore Our Work</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center p-6" style={{ background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }}>
              <img
                src="/Image/ADVMEN AEO & GEO Optimization.png"
                alt="AI assistant answer panel citing a brand as a recommended source"
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

    {/* ── SEO vs AEO vs GEO ────────────────────────────────── */}
    <section style={bandStyle} aria-label="Understanding AEO, GEO, and SEO">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Understanding AEO, GEO, and SEO</h2>
        <div className="flex flex-col gap-5 mb-8">
          <p style={bodyStyle}>
            Answer engine optimization improves how clearly your content answers a question: concise definitions, direct responses, logical structure, and signals that make a passage easy to extract. Generative engine optimization improves how discoverable and useful your content is across generative search experiences, where AI systems pull from many sources, synthesize an answer, and may cite a few of them.
          </p>
        </div>

        <div className="overflow-x-auto mb-8">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-ink)' }}>
                {['', 'AEO', 'GEO', 'SEO'].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: h === 'AEO' || h === 'GEO' ? 'var(--color-orange)' : 'var(--color-text-primary)', background: 'var(--color-surface-1)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Focus', aeo: 'Clear, direct answers to questions', geo: 'Visibility and usefulness inside AI-generated responses', seo: 'Rankings and organic traffic in traditional results' },
                { label: 'Core work', aeo: 'Answer-led content, FAQs, passage structure', geo: 'Entity clarity, topical depth, source credibility', seo: 'Technical health, relevance, authority' },
                { label: 'Typical outcome', aeo: 'Content that is easy to quote', geo: 'A brand that is easy to trust and reference', seo: 'Pages that are found and clicked' },
              ].map((row, i) => (
                <tr key={row.label} style={{ borderBottom: '1px solid var(--color-border-subtle)', background: i % 2 === 0 ? 'var(--color-surface-1)' : 'transparent' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>{row.label}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-secondary)' }}>{row.aeo}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-secondary)' }}>{row.geo}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-secondary)' }}>{row.seo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={bodyStyle}>
          Think of SEO as the foundation, AEO as the clarity layer, and GEO as the trust layer. A weak foundation weakens everything above it, so this work sits alongside our <Link to="/services/seo" style={LINK_STYLE}>SEO team</Link> rather than replacing it.
        </p>
      </div>
    </section>

    {/* ── Services ─────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="What our AEO and GEO optimization services include">
      <div className="container">
        <h2 className="section-title" style={h2Style}>What Our AEO and GEO Optimization Services Include</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          We work across seven connected areas. None of them is a magic switch. Together, they make your brand easier for people and AI systems to understand.
        </p>
        <div className="flex flex-col gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04} style={cardStyle} className="flex flex-col">
              <h3 style={h3Style}>{s.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{link(s.body)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Process ──────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="From AI visibility audit to ongoing refinement">
      <div className="container">
        <h2 className="section-title" style={h2Style}>From AI Visibility Audit to Ongoing Refinement</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Every engagement follows a clear, five-stage workflow.</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="AEO GEO process steps">
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

    {/* ── Benefits + Audiences ─────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Benefits of AEO and GEO and who it is for">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Benefits of AEO &amp; GEO and Who It Is For</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.5rem' }}>
          Our AI search optimization approach is built around business needs, not buzzwords. You can expect:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {[
            { title: 'A Clearer Brand Presence', body: 'Consistent information that people and AI systems can interpret without ambiguity.' },
            { title: 'Content That Serves Two Audiences', body: 'Helpful for readers and easy for machines to parse — no compromise between the two.' },
            { title: 'A Stronger Search Foundation', body: 'Work that also supports your traditional rankings because clarity and depth help both.' },
            { title: 'Honest, Measurable Reporting', body: 'Visibility trends linked to leads, not vanity numbers that look good but mean nothing.' },
            { title: 'Practical Next Steps', body: 'A roadmap your team can act on, with clear owners, timelines, and priorities.' },
          ].map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.06} style={cardStyle} className="flex flex-col">
              <h3 style={{ ...h3Style, fontSize: '1.05rem' }}>{b.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{b.body}</p>
            </Reveal>
          ))}
        </div>

        <h3 style={{ ...h3Style, fontSize: '1.15rem', marginBottom: '1rem' }}>It fits:</h3>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AUDIENCES.map((a, i) => (
            <li key={a} className="flex items-start gap-3" style={{ ...cardStyle, padding: '1rem 1.1rem', boxShadow: '3px 3px 0 var(--color-ink)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-orange)', fontSize: '0.8rem', marginTop: '0.2rem', flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--color-ink)' }}>{a}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* ── Why ADVMEN ───────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Why brands choose ADVMEN Technologies">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Why Brands Choose ADVMEN Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_ADVMEN.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.07} style={cardStyle} className="flex flex-col">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{w.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{link(w.body)}</p>
            </Reveal>
          ))}
        </div>
        <p style={{ ...bodyStyle, marginTop: '1.75rem' }}>
          Beyond AEO and GEO, our team covers <Link to="/services/seo" style={LINK_STYLE}>SEO Optimization</Link>, <Link to="/services/content-marketing" style={LINK_STYLE}>content marketing</Link>, <Link to="/services/performance-marketing" style={LINK_STYLE}>performance marketing</Link>, <Link to="/services/social-media-management" style={LINK_STYLE}>social media management</Link>, and <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing services</Link> — so every channel supports your visibility.
        </p>
        <div className="mt-6">
          <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">Check Our Portfolio</Link>
        </div>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Start your AEO GEO project">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Let's See How AI Describes Your Brand</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>
          Share your website and goals with ADVMEN Technologies. We will recommend the right next step — from an AEO and GEO audit to a full visibility roadmap — and send a clear quote.
        </p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          Whether you are just starting or already investing in search, our AEO and GEO optimization services can help you decide where to focus first.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'AEO GEO Consultation' }} className="btn-primary btn-lg" data-cursor="hover">Request a Consultation</Link>
          <Link to="/contact" state={{ plan: 'AEO GEO Audit' }} className="btn-outline btn-lg" data-cursor="hover">Book a Strategy Call</Link>
        </div>
      </div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Frequently asked questions about AEO and GEO optimization services">
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

export default AEOGEOOptimization
