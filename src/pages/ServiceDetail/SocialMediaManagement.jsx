/**
 * pages/ServiceDetail/SocialMediaManagement.jsx
 * Dedicated landing page for /services/social-media-management
 * SEO / AEO / GEO optimised with structured schema, internal linking,
 * breadcrumbs, FAQPage, HowTo, and speakable markup.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/social-media-management'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`

const TITLE = 'Social Media Management Services | ADVMEN'
const DESCRIPTION =
  "ADVMEN's social media management services cover strategy, content creation, scheduling, community management, and reporting. Request a social media plan."
const KEYWORDS =
  'social media management services, social media management agency, social media marketing services, social media content creation, social media strategy, Instagram management services, LinkedIn social media management, social media calendar, community management, social media management company India, social media management for small business, organic social media management, social media posting services, social media brand management'

const PAGE_LINKS = [
  { phrase: 'social media management services', to: '/services/social-media-management' },
  { phrase: 'social media management agency', to: '/services/social-media-management' },
  { phrase: 'Instagram management services', to: '/services/social-media-management' },
  { phrase: 'LinkedIn social media management', to: '/services/social-media-management' },
  { phrase: 'social media content creation', to: '/services/social-media-management' },
  { phrase: 'social media strategy', to: '/services/social-media-management' },
  { phrase: 'social media calendar', to: '/services/social-media-management' },
  { phrase: 'performance marketing', to: '/services/performance-marketing' },
  { phrase: 'digital marketing services', to: '/digital-marketing-services-india' },
  { phrase: 'digital marketing packages', to: '/digital-marketing-services-india' },
  { phrase: 'SEO services', to: '/services/seo' },
  { phrase: 'search engine optimization', to: '/services/seo' },
  { phrase: 'AEO & GEO optimization services', to: '/services/aeo-geo' },
  { phrase: 'AEO and GEO', to: '/services/aeo-geo' },
  { phrase: 'content marketing', to: '/services/content-marketing' },
  { phrase: 'website development', to: '/services/website-development' },
  { phrase: 'professional website design', to: '/services/professional-website-design' },
  { phrase: 'branding services', to: '/services/branding' },
  { phrase: 'our work', to: '/work' },
  { phrase: 'contact us', to: '/contact' },
]

const SERVICES = [
  {
    title: 'Social Media Strategy',
    body: 'We start by understanding your business, your customers, and your competitors. From there, we define clear objectives, content priorities, and metrics to track progress. This becomes the working document for everything that follows.',
  },
  {
    title: 'Audience and Platform Selection',
    body: 'Not every business needs to be everywhere. We recommend platforms based on where your audience spends time and what your team can sustain. Depending on your needs, this may include Instagram management services, LinkedIn social media management, Facebook, and more.',
  },
  {
    title: 'Social Media Calendar',
    body: 'We prepare a monthly social media calendar covering post dates, formats, themes, and captions — shared with you ahead of publishing so there are no surprises.',
  },
  {
    title: 'Social Media Content Creation',
    body: 'Our team produces captions, static graphics, carousels, short-form video, and reels. Every piece follows your brand guidelines, or we help you shape them if none exist yet.',
  },
  {
    title: 'Scheduling and Publishing',
    body: 'We schedule and publish approved content on the agreed cadence, so your channels stay active without last-minute scrambling.',
  },
  {
    title: 'Community Management',
    body: 'Social media is a two-way channel. We monitor and respond to comments and direct messages within agreed hours. Our team escalates anything that needs your input — complaints, sales enquiries, or sensitive topics.',
  },
  {
    title: 'Reporting and Review',
    body: 'You receive monthly reports covering the metrics tied to your goals — reach, engagement, audience growth, and link clicks — along with real insights and recommended next steps.',
  },
]

const PROCESS = [
  { title: 'Discovery', body: 'We review your goals, audience, current channels, and brand assets.' },
  { title: 'Strategy & Platform Plan', body: 'We recommend platforms, content themes, posting frequency, and success metrics for your approval.' },
  { title: 'Brand Voice & Content Themes', body: 'We document how your brand should sound and the topics it should own. You review and approve this before any content goes live.' },
  { title: 'Calendar & Creative Production', body: 'We draft the monthly calendar, captions, and creative for your review.' },
  { title: 'Approval & Scheduling', body: 'You approve content within an agreed turnaround, and we schedule it.' },
  { title: 'Engagement & Monitoring', body: 'We publish, respond to the community, and flag anything that needs your attention.' },
  { title: 'Reporting & Refinement', body: 'We review performance together and adjust the plan based on what the data shows.' },
]

const AUDIENCES = [
  'Owner-led and growing businesses that need a consistent presence but cannot justify a full in-house team',
  'Retail, D2C and consumer brands that depend on visual content and seasonal campaigns',
  'Professional and service businesses — consultants, educators, clinics, and real estate firms — where trust comes before the enquiry',
  'B2B companies, manufacturers, and exporters that want a credible LinkedIn presence for buyers, partners, and future hires',
  'Teams with an existing presence that has become inconsistent, off-brand, or hard to measure',
]

const WHY_ADVMEN = [
  { title: 'Strategy Before Content', body: 'We start by understanding your brand story, audience, and business goals before a single post is planned.' },
  { title: 'A Defined Process, Every Month', body: 'Our monthly workflow covers planning, content creation, approvals, publishing, and reporting — with clear timelines and a dedicated point of contact.' },
  { title: 'Brand-Led Content With a Purpose', body: 'Voice, themes, and visuals are agreed with you first and then applied consistently across every post, story, reel, and caption.' },
  { title: 'Content That Works Across Every Platform', body: 'We tailor content to the strengths of each channel — Instagram, Facebook, LinkedIn, and YouTube.' },
  { title: 'One Team, Connected Thinking', body: 'With website development, SEO services, and performance marketing teams under one roof, your social media is never managed in isolation.' },
  { title: 'Transparent, Meaningful Reporting', body: 'We report on the metrics that matter to your goals — reach, engagement quality, website clicks, leads, and growth trends.' },
  { title: 'Practical, Ready-to-Use Deliverables', body: 'You receive a monthly content calendar, designed creatives, captions and hashtags, performance reports, and strategic recommendations.' },
  { title: 'Built for Long-Term Consistency', body: 'We build social media systems — content pillars, templates, and style guidelines — making it easier for your team to communicate consistently.' },
]

const FAQS = [
  { question: 'What is Included in Social Media Management?', answer: 'Our service covers strategy, platform recommendations, a monthly content calendar, copy and creative production, scheduling and publishing, community management, and regular reporting. The final scope is confirmed in your proposal.' },
  { question: 'Which Social Media Platforms Can You Manage?', answer: 'We manage Instagram, LinkedIn, Facebook, and other platforms. During discovery we recommend the platforms best suited to your audience and capacity.' },
  { question: 'How Often Will You Publish Content?', answer: 'Posting frequency depends on your goals, platforms, and package. We agree on it with you upfront and document it in your social media calendar.' },
  { question: 'Do You Create Graphics, Reels, and Captions?', answer: 'Yes. We create captions, graphics, carousels, and short-form video such as reels and YouTube Shorts. Anything requiring special production, such as an on-location shoot, is scoped separately.' },
  { question: 'Do You Respond to Comments and Messages?', answer: 'Yes. We monitor and respond to comments and messages during agreed hours using tone guidelines you approve. We also escalate complaints, sales enquiries, and sensitive matters to your team.' },
  { question: 'Is Paid Advertising Included in Social Media Management?', answer: 'No. Our social media management services focus on organic activity. Paid campaigns are handled through our performance marketing service and are quoted separately, along with your ad spend.' },
  { question: 'How Do You Report Social Media Performance?', answer: 'You receive monthly reports on agreed metrics such as reach, engagement, audience growth, and clicks, with commentary and recommendations. We review them with you and refine the plan.' },
  { question: 'How Soon Can a Business See Results?', answer: 'Timelines vary by industry, audience, starting point, and content volume. Many businesses see improvements in publishing consistency and engagement quality early on, while building an audience and measurable business impact typically takes longer. We set realistic expectations during planning.' },
  { question: 'Can Social Media Management Work Alongside SEO and Digital Marketing?', answer: 'Yes. Social media management works best as part of a connected strategy. Our team also covers search engine optimization, AEO and GEO for AI search visibility, content marketing, and digital marketing services — so every channel supports the others.' },
]

const RELATED = [
  { label: 'Digital Marketing', to: '/digital-marketing-services-india' },
  { label: 'Performance Marketing', to: '/services/performance-marketing' },
  { label: 'Content Marketing', to: '/services/content-marketing' },
  { label: 'SEO Services', to: '/services/seo' },
  { label: 'AEO & GEO / AI Search', to: '/services/aeo-geo' },
  { label: 'Branding & Logo Design', to: '/services/branding' },
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Professional Website Design', to: '/services/professional-website-design' },
  { label: 'E-Commerce Development', to: '/services/website-development/ecommerce' },
  { label: 'Android App Development', to: '/services/app-development/android' },
  { label: 'iOS App Development', to: '/services/app-development/ios' },
  { label: 'Our Work', to: '/work' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

const sectionPad = { padding: 'clamp(3rem, 7vw, 5rem) 0' }
const h2Style = { fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)', lineHeight: 1.15, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }
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

const SocialMediaManagement = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/Image/advmen_service7.webp`}
      schemaData={{
        serviceName: 'Social Media Management Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'Social Media Management', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: AUDIENCES.map((name) => ({ name })),
        itemsName: 'Who benefits from social media management services',
        image: `${COMPANY.website}/Image/advmen_service7.webp`,
        howTo: {
          name: 'How ADVMEN manages your social media from discovery to reporting',
          description: "ADVMEN's seven-step social media management process: discovery, strategy, brand voice, calendar, approval, engagement, and reporting.",
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* ── Hero ─────────────────────────────────────────────── */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="Social media management services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>Social Media Management</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              Social Media Management That Keeps Your Brand Consistent
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              Most businesses know they should be active on social media. Fewer have the time, the content pipeline, or the clarity on what to post, where to post it, and whether it is working.
            </p>
            <p style={bodyStyle}>
              Profiles go quiet for weeks, messages sit unanswered, and posts end up reflecting whatever was urgent that day rather than a plan.
            </p>
            <p style={bodyStyle}>
              ADVMEN is the trusted social media management agency offering professional social media management services to take that load off your team. We plan, create, publish, and monitor your social presence so your brand shows up consistently, speaks in a voice people recognise, and reports back with numbers you can actually use.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'Social Media Plan' }} className="btn-primary btn-lg" data-cursor="hover">Request a Social Media Plan</Link>
              <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">See Our Work</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center p-6" style={{ background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }}>
              <img
                src="/Image/advmen_service7.webp"
                alt="Social media management services by ADVMEN Technologies"
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
    <section style={bandStyle} aria-label="Our social media management services">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Our Social Media Management Services</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          We build each engagement around your business goals, audience, and available resources. The scope below reflects the core of what we do.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.07} style={cardStyle} className="flex flex-col">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{link(s.body)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Organic vs Paid ──────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Organic social management vs paid social advertising">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Organic Social Management vs. Paid Social Advertising</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            Our social media management services focus on organic activity: building and maintaining your brand's presence through planned content and community interaction.
          </p>
          <p style={bodyStyle}>
            Paid social campaigns — where budget is spent to put content in front of targeted audiences — are a separate discipline with their own strategy, set-up, and optimisation. If you want to amplify your content with advertising, explore our <Link to="/services/performance-marketing" style={LINK_STYLE}>performance marketing</Link> service or see our full <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing services</Link>.
          </p>
        </div>
      </div>
    </section>

    {/* ── Process ──────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="How we work with you">
      <div className="container">
        <h2 className="section-title" style={h2Style}>How We Work With You</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>A clear process every month — no guesswork, no last-minute scrambling.</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="Social media management process">
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

    {/* ── AEO / GEO ────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Social media and AI search visibility">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Social Media That Supports Your Wider Search Visibility</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            People now ask AI tools questions like "which social media agency is good for small businesses?" or "best Instagram management services in India." These tools look for consistent, credible signals about your business across the web — including your social profiles.
          </p>
          <p style={bodyStyle}>
            A consistent brand name, clear service descriptions, and the same business details across every platform and profile help both people and AI-powered search tools understand who you are. We build that consistency into every social media management engagement from day one.
          </p>
          <p style={bodyStyle}>
            For deeper AI search visibility work — structured data, entity optimisation, and answer-engine content — our AEO and GEO team handles that as a connected service.
          </p>
          <p>
            <Link to="/services/aeo-geo" style={LINK_STYLE}>Explore our AEO &amp; GEO optimization services →</Link>
          </p>
        </div>
      </div>
    </section>

    {/* ── Who benefits ─────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Who benefits from social media management">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Who Benefits From Social Media Management</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.75rem' }}>
          We offer social media management services to businesses at every stage, including:
        </p>
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
          Beyond social media, our team covers <Link to="/services/seo" style={LINK_STYLE}>SEO services</Link>, <Link to="/services/aeo-geo" style={LINK_STYLE}>AEO &amp; GEO optimization</Link> for AI search visibility, <Link to="/services/content-marketing" style={LINK_STYLE}>content marketing</Link>, <Link to="/services/performance-marketing" style={LINK_STYLE}>performance marketing</Link>, and <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing services</Link> — so every channel works together.
        </p>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Start your social media management plan">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Ready to Plan Your Social Media Presence?</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>
          Tell us about your business, your goals, and the platforms you are considering.
        </p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          We will come back with a recommended approach and scope tailored to you.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'Social Media Plan' }} className="btn-primary btn-lg" data-cursor="hover">Request a Social Media Plan</Link>
          <Link to="/contact" state={{ plan: 'Social Media Quote' }} className="btn-outline btn-lg" data-cursor="hover">Request a Quote</Link>
        </div>
      </div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Frequently asked questions about social media management">
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

export default SocialMediaManagement
