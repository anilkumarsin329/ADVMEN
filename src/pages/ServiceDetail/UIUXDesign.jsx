/**
 * pages/ServiceDetail/UIUXDesign.jsx
 * Dedicated landing page for /services/ui-ux-design
 * SEO / AEO / GEO optimised — structured schema, internal linking,
 * breadcrumbs, FAQPage, HowTo, speakable markup, and GEO signals.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/ui-ux-design'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`

const TITLE = 'UI/UX Design Services | ADVMEN Technologies'
const DESCRIPTION =
  'Make your website or app easier to use with UI/UX design services covering research, wireframes, prototypes, testing, and handoff. Book a review.'
const KEYWORDS =
  'UI/UX design services, UI UX design agency, user experience design services, user interface design services, website UI UX design, mobile app UI UX design, wireframing and prototyping, usability testing, product design services, UI UX design agency India, UX design company Gurugram'

const PAGE_LINKS = [
  { phrase: 'SEO team', to: '/services/seo' },
  { phrase: 'SEO Optimization', to: '/services/seo' },
  { phrase: 'SEO services', to: '/services/seo' },
  { phrase: 'AEO and GEO', to: '/services/aeo-geo' },
  { phrase: 'AEO & GEO optimization', to: '/services/aeo-geo' },
  { phrase: 'website development team', to: '/services/website-development' },
  { phrase: 'website development', to: '/services/website-development' },
  { phrase: 'Website Development', to: '/services/website-development' },
  { phrase: 'branding and logo design team', to: '/services/branding' },
  { phrase: 'branding and logo design', to: '/services/branding' },
  { phrase: 'Branding and Logo Design', to: '/services/branding' },
  { phrase: 'performance marketing', to: '/services/performance-marketing' },
  { phrase: 'content marketing', to: '/services/content-marketing' },
  { phrase: 'social media management', to: '/services/social-media-management' },
  { phrase: 'digital marketing services', to: '/digital-marketing-services-india' },
  { phrase: 'portfolio and case studies', to: '/work' },
  { phrase: 'our work', to: '/work' },
  { phrase: 'contact us', to: '/contact' },
]

const SERVICES = [
  {
    id: 'discovery',
    title: 'Discovery and Research',
    body: 'We start by listening: stakeholder interviews, analytics and map review, an evaluation of your current experience, competitor analysis, and, where scope allows, user interviews and surveys. The goal is to learn who uses your product, what they are trying to do, and where they get stuck.',
  },
  {
    id: 'journeys',
    title: 'User Journeys and Flows',
    body: 'Our user experience design services turn research into personas, journey maps, and task flows. We focus on key tasks — the handful of paths that matter most to your users and your business — and remove unnecessary steps, fields, and decisions along them.',
  },
  {
    id: 'ia',
    title: 'Information Architecture',
    body: 'We build sitemaps, content hierarchies, navigation models, and labels around how users think, not how your org chart looks. Methods such as card sorting and tree testing help confirm that people can find what they need.',
  },
  {
    id: 'wireframe',
    title: 'Wireframing and Prototyping',
    body: 'Our wireframing and prototyping work moves from low-fidelity layouts to high-fidelity clickable prototypes. Stakeholders can click through real flows, spot issues early, and make decisions before development begins, which reduces costly rework.',
  },
  {
    id: 'visual',
    title: 'Visual and Interface Design',
    body: 'Our user interface design services cover color, typography, spacing, iconography, imagery, and reusable components, including states such as hover, focus, error, and empty screens. We organize these into a design system, so every new screen stays consistent and your team moves faster as the product grows.',
  },
  {
    id: 'website',
    title: 'Website Design for Every Screen',
    body: 'Our website UI UX design adapts layouts across desktops, tablets, and phones with flexible grids, scalable typography, and touch-friendly controls. We structure pages with search visibility in mind, so you can work with our SEO team and website development team without redesigning later.',
  },
  {
    id: 'mobile',
    title: 'Mobile Experiences That Feel Native',
    body: "Our mobile app UI UX design follows platform conventions such as Apple's Human Interface Guidelines and Google's Material Design while still giving your product its own personality. We design for thumb reach, gestures, loading, offline, and error states, and for the reality that many people use apps one-handed on the go.",
  },
  {
    id: 'accessibility',
    title: 'Accessibility and Inclusive Design',
    body: 'We design with accessibility in mind from day one: sufficient color contrast, readable type sizes, visible focus states, clear form labels and error messages, keyboard-friendly flows, and a logical structure that supports assistive technology. We follow WCAG principles. Full conformance also depends on how the design is built, so we check implementation together with your developers.',
  },
  {
    id: 'testing',
    title: 'Testing and Validation',
    body: 'Before launch, we put designs in front of real users. Our usability testing may include moderated or unmoderated task sessions, think-aloud observation, and a review of metrics such as task completion, time on task, and error rates. Findings are prioritized and fed into the next iteration.',
  },
  {
    id: 'product',
    title: 'Product Design for New Ideas',
    body: 'Building something new? Our product design services take you from idea to a testable first version: problem definition, feature prioritization, core journeys, and a prototype you can put in front of users, teammates, or investors.',
  },
  {
    id: 'handoff',
    title: 'Design Delivery',
    body: 'Designs only matter if they are built faithfully. We provide annotated screens, component specifications, design tokens, asset exports, and walkthroughs with your developers, then review the build against the design.',
  },
]

const PROCESS = [
  { title: 'Discover', body: 'We learn your business goals, audience, constraints, and current experience, and agree on what success looks like.' },
  { title: 'Research and Define', body: 'We gather user and stakeholder insight, map journeys, and define the problems worth solving first.' },
  { title: 'Structure', body: 'We organize content and navigation, then sketch flows and wireframes so you can review the logic before any visual polish.' },
  { title: 'Design and Prototype', body: 'We apply your brand, build the interface, and connect screens into a clickable prototype you can review and comment on.' },
  { title: 'Test and Refine', body: 'We run testing sessions, collect feedback, and improve the design based on what users actually do, not what we assume.' },
  { title: 'Hand Off and Support', body: 'We deliver organized files and specifications, support your developers during the build, and review the result before launch.' },
]

const BENEFITS = [
  { title: 'Clearer Journeys', body: 'Fewer dead ends, steps, and confusing choices in key tasks.' },
  { title: 'Consistency', body: 'One visual language across pages, screens, and devices.' },
  { title: 'Less Rework', body: 'Problems caught in prototypes, where changes are cheaper than after launch.' },
  { title: 'Inclusive Design', body: 'Interfaces that more people can use comfortably.' },
  { title: 'Evidence-Based Decisions', body: 'Choices backed by research and testing, not opinion alone.' },
]

const AUDIENCES = [
  'Startups shaping a first product or MVP',
  'SaaS and B2B teams with complex dashboards and workflows',
  'E-commerce brands with leaky browsing or checkout journeys',
  'Healthcare and wellness brands that need clarity and trust',
  'Service firms whose websites are not turning visitors into enquiries',
  'Companies redesigning a product that users find confusing',
]

const WHY_ADVMEN = [
  { title: 'Strategy Before Pixels', body: 'We start by understanding your users, business goals, and constraints, then design with a plan.' },
  { title: 'Design With a Purpose', body: 'From layout and navigation to color and microcopy, each decision is linked to a user need or business goal.' },
  { title: 'Design That Works Everywhere', body: 'We design for multiple screens, input methods, and abilities, including desktops, phones, touch, and keyboard.' },
  { title: 'One Team, Connected Thinking', body: 'As a UI UX design agency with website development team, SEO team, digital marketing services, and branding and logo design team under one roof, we plan your design with your wider digital presence in mind.' },
  { title: 'Practical, Ready-to-Use Deliverables', body: 'Our UI/UX design services produce organized design files, clickable prototypes, component specifications, and honest recommendations your developers can use.' },
  { title: 'Built for Long-Term Consistency', body: 'We create design systems that help your team keep every new screen aligned as your product grows. Need a sharper identity first? Our branding and logo design team can help.' },
]

const FAQS = [
  {
    question: 'What is the difference between UI and UX design?',
    answer: 'UX is about how a product works: research, journeys, structure, and flow. UI is about how it looks and responds: layout, typography, color, and components. Our user experience design services focus on making tasks clear and efficient, while our user interface design services make the experience polished and consistent. The best results come when both are planned together.',
  },
  {
    question: 'What is included in UI/UX design services?',
    answer: 'The scope usually covers discovery, research, user journeys, information architecture, wireframes, prototypes, visual design, testing, and developer handoff. Not every project needs every step, so we define the scope and deliverables with you before we begin.',
  },
  {
    question: 'Do you design websites and mobile apps?',
    answer: 'Yes. We handle website UI UX design for responsive sites, landing pages, and web platforms, and mobile app UI UX design for iOS, Android, and cross-platform products. Each follows the conventions users expect on that platform.',
  },
  {
    question: 'Will you create wireframes and prototypes?',
    answer: 'Yes. Our wireframing and prototyping process shows structure and flow first, then moves to interactive prototypes you can click through, review, and test before development starts.',
  },
  {
    question: 'Do you conduct user research or usability testing?',
    answer: 'Yes, depending on scope and budget. Research can include stakeholder interviews, analytics review, and user conversations, and testing can include task-based sessions with real users. We recommend the right level for your project and explain why.',
  },
  {
    question: 'Can you redesign an existing product?',
    answer: 'Yes. As a UI UX design agency, we begin with an experience review of your current website or app to find friction points, then redesign what holds users back while keeping what already works.',
  },
  {
    question: 'Which design files or handoff materials will I receive?',
    answer: 'Typically, you receive organized design files, annotated screens, component specifications, a style guide or design system, and exported assets. We confirm the exact formats with you at the start so they suit your developers.',
  },
  {
    question: 'How long does a UI/UX design project take?',
    answer: 'It depends on scope, number of screens, research depth, and how quickly feedback arrives. Redesigning a single flow is faster than building a full product experience. Our product design services are planned in phases, and we share a clear timeline once the scope is set.',
  },
  {
    question: 'Do you offer UI/UX design services in India?',
    answer: 'Yes. ADVMEN Technologies is based in Gurugram, India, and delivers UI/UX design services to clients across India, the United States, the United Arab Emirates, and Europe. We work remotely and on-site depending on project needs.',
  },
  {
    question: 'How does UI/UX design connect to SEO and AI search?',
    answer: 'Good UX improves dwell time, reduces bounce rate, and makes content easier for search engines and AI platforms to parse. We structure pages with clear headings, logical content hierarchy, and semantic HTML — signals that support both SEO and AEO & GEO optimization. Our SEO team and website development team work alongside the design process so nothing needs to be rebuilt later.',
  },
]

const RELATED = [
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Professional Website Design', to: '/services/professional-website-design' },
  { label: 'E-Commerce Development', to: '/services/website-development/ecommerce' },
  { label: 'Branding & Logo Design', to: '/services/branding' },
  { label: 'SEO Services', to: '/services/seo' },
  { label: 'AEO & GEO Optimization', to: '/services/aeo-geo' },
  { label: 'Android App Development', to: '/services/app-development/android' },
  { label: 'iOS App Development', to: '/services/app-development/ios' },
  { label: 'Performance Marketing', to: '/services/performance-marketing' },
  { label: 'Social Media Management', to: '/services/social-media-management' },
  { label: 'Digital Marketing', to: '/digital-marketing-services-india' },
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

const UIUXDesign = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/Image/advmen_service10.webp`}
      schemaData={{
        serviceName: 'UI/UX Design Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        dateModified: '2025-07-01',
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'UI/UX Design Services', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: AUDIENCES.map((name) => ({ name })),
        itemsName: 'Who our UI/UX design services are built for',
        image: `${COMPANY.website}/Image/advmen_service10.webp`,
        howTo: {
          name: 'How ADVMEN delivers UI/UX design from discovery to handoff',
          description: "ADVMEN's six-stage UI/UX design workflow: discover, research and define, structure, design and prototype, test and refine, hand off and support.",
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* ── Hero ─────────────────────────────────────────────── */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="UI/UX design services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>UI/UX Design</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              UI/UX Design Services That Turn Clicks into Clarity
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              Your visitors arrive with a goal. Find a price. Book a call. Check an order. Then the menu hides what they need, the form asks for too much, and the mobile layout fights back. They rarely complain. They simply leave.
            </p>
            <p style={bodyStyle}>
              ADVMEN Technologies helps fix that. Our UI/UX design services pair research-led UX with clean, consistent UI, so key tasks feel obvious instead of effortful. We design from evidence, test with real users where the scope allows, and never promise conversion lifts we cannot validate.
            </p>
            <p style={{ ...bodyStyle, fontSize: '0.9rem' }}>
              Based in Gurugram, India — serving clients across India, the United States, the UAE, and Europe.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'UI UX Design Review' }} className="btn-primary btn-lg" data-cursor="hover">Review My Website or App</Link>
              <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">Explore Our Work</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center p-6" style={{ background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }}>
              <img
                src="/Image/advmen_service10.webp"
                alt="Designer reviewing a website wireframe next to a mobile app prototype"
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

    {/* ── Two Disciplines ───────────────────────────────────── */}
    <section style={bandStyle} aria-label="Two disciplines, one experience">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Two Disciplines, One Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Reveal style={cardStyle}>
            <h3 style={{ ...h3Style, color: 'var(--color-orange)' }}>UX Design</h3>
            <p data-speakable style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
              Focuses on how a product works. It covers research, user journeys, content structure, and flows — answering one question: can people complete their tasks with ease? Outputs are journey maps, sitemaps, and wireframes that show the logic before any visual polish.
            </p>
          </Reveal>
          <Reveal delay={0.06} style={cardStyle}>
            <h3 style={{ ...h3Style, color: 'var(--color-orange)' }}>UI Design</h3>
            <p data-speakable style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
              Focuses on how the product looks and responds. It covers layout, typography, color, and reusable components — asking whether the interface is readable, familiar, and true to your brand. Outputs are a visual system, a component library, and finished screens.
            </p>
          </Reveal>
        </div>
        <p style={bodyStyle}>
          When the two work together, every screen helps the user take the next step. The result is a product that is clear, usable, and consistent, delivered as a tested prototype and handoff-ready files your developers can build from.
        </p>
      </div>
    </section>

    {/* ── Services ─────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="What our UI/UX design services include">
      <div className="container">
        <h2 className="section-title" style={h2Style}>What Our UI/UX Design Services Include</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          Great experiences are built in layers. We cover each one, so nothing is left to guesswork.
        </p>
        <div className="flex flex-col gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.03} style={cardStyle} className="flex flex-col">
              <h3 style={h3Style}>{s.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{link(s.body)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Process ──────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="From first conversation to finished design">
      <div className="container">
        <h2 className="section-title" style={h2Style}>From First Conversation to Finished Design</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Every project follows a clear, collaborative workflow.</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="UI UX design process steps">
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
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Benefits of UI/UX design and who it is for">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Benefits and Who It Is For</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.5rem' }}>Good design lowers effort for your users and uncertainty for your team. You can expect:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {BENEFITS.map((b, i) => (
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

    {/* ── AEO / GEO ────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="UI/UX design and AI search visibility">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>UI/UX Design, SEO, and AI Search — Connected from Day One</h2>
        <div className="flex flex-col gap-5">
          <p data-speakable style={bodyStyle}>
            Design and search are not separate workstreams. A page that is hard to navigate signals poor quality to search engines. A page with unclear headings and buried answers is invisible to AI platforms like ChatGPT, Perplexity, and Google AI Overviews. We build both into the design process from the start.
          </p>
          <p style={bodyStyle}>
            Every screen we design uses a clear heading hierarchy, logical content structure, and semantic HTML — the same foundations that help search engines crawl and rank your pages. When users ask AI tools "best UI UX design agency in India" or "who does mobile app UX design in Gurugram," those platforms pull answers from sources with clear, well-structured content. We make sure yours qualifies.
          </p>
          <p style={bodyStyle}>
            Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) extend your visibility beyond classic search results into AI-driven answers. Our design work supports both: FAQ sections with direct answers, speakable content passages, structured data, and consistent entity signals across your site. No one can guarantee placement in AI answers, but we give your content the best possible chance across every search surface.
          </p>
          <p>
            <Link to="/services/aeo-geo" style={LINK_STYLE}>Explore our AEO &amp; GEO optimization services →</Link>
          </p>
          <p>
            <Link to="/services/seo" style={LINK_STYLE}>See how our SEO team works alongside design →</Link>
          </p>
        </div>
      </div>
    </section>

    {/* ── Why ADVMEN ───────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Why brands choose ADVMEN Technologies">
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
          Beyond design, our team covers <Link to="/services/seo" style={LINK_STYLE}>SEO services</Link>, <Link to="/services/aeo-geo" style={LINK_STYLE}>AEO &amp; GEO optimization</Link> for AI search, <Link to="/services/performance-marketing" style={LINK_STYLE}>performance marketing</Link>, <Link to="/services/content-marketing" style={LINK_STYLE}>content marketing</Link>, and <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing services</Link> — so every channel supports your product experience.
        </p>
        <p style={{ ...bodyStyle, marginTop: '0.75rem' }}>
          See how we work in our <Link to="/work" style={LINK_STYLE}>portfolio and case studies</Link>.
        </p>
        <div className="mt-6">
          <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">Check Our Portfolio</Link>
        </div>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Start your UI/UX design project">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Turn Confusing Screens into Clear Next Steps</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>
          Share your website, app, or product idea with ADVMEN Technologies. We will review it, recommend the right next step — from a focused experience review to a full design engagement — and send a clear quote.
        </p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          Whether you want UI/UX design services for a redesign or a brand-new product, we are ready to talk. We work with clients across India, the United States, the UAE, and Europe.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'UI UX Design Consultation' }} className="btn-primary btn-lg" data-cursor="hover">Request a Consultation</Link>
          <Link to="/contact" state={{ plan: 'UI UX Design Review' }} className="btn-outline btn-lg" data-cursor="hover">Review My Website or App</Link>
        </div>
      </div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Frequently asked questions about UI/UX design services">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Frequently Asked Questions</h2>
        <div className="flex flex-col">
          {FAQS.map((f) => (
            <details key={f.question} className="group" style={{ borderBottom: '1px solid var(--color-border-subtle)', padding: '1rem 0' }}>
              <summary className="flex justify-between items-center gap-4 cursor-pointer list-none">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', fontWeight: 600, lineHeight: 1.4 }}>{f.question}</h3>
                <span aria-hidden="true" className="transition-transform duration-300 group-open:rotate-45" style={{ fontSize: '1.4rem', color: 'var(--color-orange)', lineHeight: 1 }}>+</span>
              </summary>
              <p data-speakable style={{ ...bodyStyle, fontSize: '0.95rem', marginTop: '0.75rem' }}>{link(f.answer)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* ── Related pages ────────────────────────────────────── */}
    <section style={{ padding: '3rem 0 5rem', background: 'var(--color-surface-2)' }} aria-label="Related services and pages">
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

export default UIUXDesign
