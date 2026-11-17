/**
 * pages/ServiceDetail/BrandingLogoDesign.jsx
 * Dedicated landing page for /services/branding
 * SEO / AEO / GEO optimised with structured schema, internal linking,
 * breadcrumbs, FAQPage, HowTo, and speakable markup.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/branding'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`

const TITLE = 'Branding and Logo Design Services | ADVMEN Technologies'
const DESCRIPTION =
  'Build a memorable brand with branding and logo design services. Get a clear identity, a strong message, and a consistent look across print and digital.'
const KEYWORDS =
  'branding and logo design services, branding agency, professional logo design services, brand identity design, business branding services, visual identity design, brand guidelines, brand strategy services, rebranding services, logo design company India, brand identity agency, corporate branding services, startup branding, brand design agency India'

const PAGE_LINKS = [
  { phrase: 'brand strategy services', to: '/services/branding' },
  { phrase: 'professional logo design services', to: '/services/branding' },
  { phrase: 'brand identity design', to: '/services/branding' },
  { phrase: 'rebranding services', to: '/services/branding' },
  { phrase: 'business branding services', to: '/services/branding' },
  { phrase: 'visual identity design', to: '/services/branding' },
  { phrase: 'SEO services', to: '/services/seo' },
  { phrase: 'AEO & GEO optimization services', to: '/services/aeo-geo' },
  { phrase: 'AEO and GEO', to: '/services/aeo-geo' },
  { phrase: 'search engine optimization', to: '/services/seo' },
  { phrase: 'digital marketing services', to: '/digital-marketing-services-india' },
  { phrase: 'website development', to: '/services/website-development' },
  { phrase: 'performance marketing', to: '/services/performance-marketing' },
  { phrase: 'content marketing', to: '/services/content-marketing' },
  { phrase: 'e-commerce website development', to: '/services/website-development/ecommerce' },
  { phrase: 'our work', to: '/work' },
  { phrase: 'contact us', to: '/contact' },
]

const SERVICES = [
  {
    title: 'Brand Strategy',
    body: 'Good branding starts with clear thinking. We look at your audience, your competitors, and your goals. Then we shape your message, tone, and position. Our brand strategy services give every design choice a reason to exist.',
  },
  {
    title: 'Logo Design',
    body: 'Your logo appears everywhere, so it has to work everywhere. We design marks that look sharp on a signboard, a website, and a phone screen. Our professional logo design services focus on ideas that are simple, memorable, and right for your business.',
  },
  {
    title: 'Brand Identity Design',
    body: 'A logo alone does not make a brand. We build the full set around it: colors, fonts, icons, and images. Our brand identity design helps your business look and feel the same in every place customers meet you.',
  },
  {
    title: 'Brand Guidelines',
    body: 'Once your brand is ready, we make it easy to use. Our brand guidelines show how to use your logo, colors, fonts, and tone. Your team and partners can follow them, so your brand stays consistent as you grow.',
  },
  {
    title: 'Rebranding Services',
    body: 'Has your business grown or changed direction? Your brand may need to catch up. Our rebranding services refresh your look and message while keeping the trust you have built. We guide you from planning to rollout.',
  },
  {
    title: 'Business Branding Services',
    body: 'Branding goes beyond a logo file. Our business branding services cover stationery, packaging, presentations, signage, and more. We make sure every item looks like it comes from the same business.',
  },
  {
    title: 'Digital Branding',
    body: 'Most people meet your brand online first. We carry your new look into your website, social media, and email so everything feels connected. If you also need a new site, our website development team can build it.',
  },
]

const PROCESS = [
  { title: 'Discover', body: 'We learn about your business, audience, and goals. A short discussion and a few questions help us understand what makes you different.' },
  { title: 'Strategy', body: 'We define your message, tone, and place in the market. This gives the design a clear direction before any logo work begins.' },
  { title: 'Design', body: 'Our designers begin the visual identity design, from logo ideas to colors and fonts. You see the concepts and share your thoughts.' },
  { title: 'Refine', body: 'We improve the chosen direction based on your feedback. Small details like spacing, shapes, and color shades get careful attention.' },
  { title: 'Deliver', body: 'We hand over your final logo files and brand guidelines. We also help you start using the brand across print and digital.' },
]

const SEO_POINTS = [
  'A clear, easy-to-spell brand name and tagline',
  'The same business name across all platforms',
  'Logo and image files that load fast',
  'Website pages that match your brand',
  'A clear brand voice for your web content',
  'Consistent NAP (name, address, phone) across directories',
]

const AUDIENCES = [
  'Startups building a name and a look from scratch',
  'Small businesses using a logo that no longer fits',
  'Growing companies ready for a sharper image',
  'Founders changing direction, merging, or entering a new market',
  'Professionals and service firms that need to build trust',
  'E-commerce shops that want a stronger store and packaging look',
  'B2B companies with complex offers to explain',
  'Healthcare and wellness brands that want a caring, credible image',
  'Brands that want their look to match bigger digital marketing campaigns',
]

const WHY_ADVMEN = [
  { title: 'Strategy Before Design', body: 'We start by understanding your brand story, audience, and business goals before crafting the visual brand identity design.' },
  { title: 'Every Element Has a Purpose', body: 'Everything from the colors and typography to the messaging is thoughtfully crafted with a clear purpose behind it.' },
  { title: 'Branding That Works Everywhere', body: 'We design identities with multi-channel usage in mind — websites, signage, social media, mobile devices, and more.' },
  { title: 'One Team, Connected Thinking', body: 'With a web team, SEO team, and digital marketing team under one roof, your brand is built with its wider digital presence in mind.' },
  { title: 'Practical, Ready-to-Use Deliverables', body: 'We deliver real solutions: strategic guidance, honest recommendations, and organised branding files ready to use.' },
  { title: 'Built for Long-Term Consistency', body: 'We create brand systems that make it easier for your team to communicate consistently as your business grows.' },
]

const FAQS = [
  { question: 'What is Included in Branding and Logo Design?', answer: 'Branding and logo design services usually include research, brand strategy, logo design, colors, fonts, and brand guidelines. Some projects also cover stationery, social media, or packaging. The full scope depends on your needs, and we outline it clearly before we begin.' },
  { question: 'How Long Does a Logo Design Project Take?', answer: 'The timeline depends on how much research is needed, how many ideas you want to see, and how quickly feedback comes in. A logo alone is quicker than a full brand identity. We share a clear timeline once the scope is set.' },
  { question: 'What is the Difference Between a Logo and Brand Identity?', answer: 'A logo is one symbol of your brand. A brand identity is the full set: logo, colors, fonts, images, and tone of voice. Together, they keep your business looking and sounding the same everywhere.' },
  { question: 'Can You Refresh an Existing Brand?', answer: 'Yes. We can polish your current logo, update colors and fonts, or give the whole brand a new look. We keep what people already know and trust, and change what holds you back. Our rebranding services suit both small updates and big changes.' },
  { question: 'Will I Receive Logo Files for Digital and Print Use?', answer: 'Yes. You get your logo in common file formats for websites, social media, and print. This includes full-color and single-color versions, so your logo looks right on any background.' },
  { question: 'Do You Provide Brand Guidelines?', answer: 'Yes. We create a simple guide that shows how to use your logo, colors, fonts, and tone. Your team, printers, and designers can follow it, so your brand stays consistent over time.' },
  { question: 'Can Branding Be Tailored to a Specific Audience?', answer: 'Yes. Every project starts with your audience. We study who they are, what they like, and where they see you. Then we shape the style, message, and colors to speak to them.' },
  { question: 'How Do I Get Started with a Branding Project?', answer: 'Share a few details about your business, goals, and ideas on our contact page. We will set up a short call, understand what you need, and send you a clear plan and quote.' },
  { question: 'Do You Handle Digital Branding and Website Design Too?', answer: 'Yes. Beyond the logo and brand guidelines, our team covers website development, digital marketing services, search engine optimization, and performance marketing — so your brand launches with a complete digital presence.' },
]

const RELATED = [
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Professional Website Design', to: '/services/professional-website-design' },
  { label: 'E-Commerce Development', to: '/services/website-development/ecommerce' },
  { label: 'Android App Development', to: '/services/app-development/android' },
  { label: 'iOS App Development', to: '/services/app-development/ios' },
  { label: 'SEO Services', to: '/services/seo' },
  { label: 'AEO & GEO / AI Search', to: '/services/aeo-geo' },
  { label: 'Performance Marketing', to: '/services/performance-marketing' },
  { label: 'Content Marketing', to: '/services/content-marketing' },
  { label: 'Digital Marketing', to: '/digital-marketing-services-india' },
  { label: 'Social Media Marketing', to: '/services/social-media-marketing' },
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

const BrandingLogoDesign = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/Image/advmen_service4.webp`}
      schemaData={{
        serviceName: 'Branding and Logo Design Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'Branding and Logo Design', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: AUDIENCES.map((name) => ({ name })),
        itemsName: 'Who our branding and logo design services are built for',
        image: `${COMPANY.website}/Image/advmen_service4.webp`,
        howTo: {
          name: 'How ADVMEN builds a brand from first idea to finished identity',
          description: 'ADVMEN\'s five-step branding process: discover, strategy, design, refine, and deliver.',
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* ── Hero ─────────────────────────────────────────────── */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="Branding and logo design services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>Branding & Logo Design</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              Branding and Logo Design Services That Make Your Business Easy to Remember
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              Your brand is the first thing people notice. It shapes how they see you before they read a single word.
            </p>
            <p style={bodyStyle}>
              A clear look and a clear message build trust. Without them, even a great business can get lost in the crowd.
            </p>
            <p style={bodyStyle}>
              That is where branding and logo design services help. ADVMEN is the reliable branding agency helping brands look sharp, sound clear, and feel true to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'Branding Consultation' }} className="btn-primary btn-lg" data-cursor="hover">Schedule a Call</Link>
              <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">Explore Our Work</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center p-6" style={{ background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }}>
              <img
                src="/Image/advmen_service4.webp"
                alt="Branding and logo design services by ADVMEN Technologies"
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
    <section style={bandStyle} aria-label="Our branding and logo design services">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Our Branding and Logo Design Services</h2>
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

    {/* ── Process ──────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="From first idea to finished brand">
      <div className="container">
        <h2 className="section-title" style={h2Style}>From First Idea to Finished Brand</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Every phase has a clear goal. We move from discovery to delivery without skipping the steps that matter.</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="Branding process steps">
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

    {/* ── SEO foundations ──────────────────────────────────── */}
    <section style={bandStyle} aria-label="A consistent brand is easier to find">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 className="section-title" style={h2Style}>A Consistent Brand Is Easier to Find</h2>
          <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
            A name people remember is a name people search for. ADVMEN plans your brand with search in mind from the start. When your brand looks and sounds the same everywhere, people recognise and trust it faster. It also gives your future search engine optimization work a clear base to build on.
          </p>
          <p style={bodyStyle}>
            {link('Here is what we look at across every branding project we deliver:')}
          </p>
          <Link to="/services/seo" className="btn-outline btn-sm mt-6 inline-flex" data-cursor="hover">Explore our SEO services</Link>
        </div>
        <ul className="lg:col-span-5 flex flex-col gap-3 self-start">
          {SEO_POINTS.map((p) => (
            <li key={p} className="flex items-center gap-3" style={{ ...cardStyle, padding: '0.9rem 1.1rem', boxShadow: '3px 3px 0 var(--color-ink)', fontWeight: 600, color: 'var(--color-ink)' }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--color-orange)' }} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* ── AEO / GEO ────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Brands that people and AI tools can recognise">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Brands That People and AI Tools Can Recognise</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            People now ask AI tools questions like "who designs good logos for startups?" or "best branding agency in India." These tools look for clear, consistent information about your business. We help you present your brand in a way that is easy to read and understand.
          </p>
          <p style={bodyStyle}>
            That means one brand name, simple service descriptions, helpful FAQs, structured data markup, and the same details on every page and profile. These basics help both people and search tools understand who you are and what you do.
          </p>
          <p style={bodyStyle}>
            No agency can guarantee how AI platforms show a brand — each platform chooses its own sources. What we can do is help you present your brand clearly and consistently, which gives it a better chance to be noticed and cited.
          </p>
          <p>
            <Link to="/services/aeo-geo" style={LINK_STYLE}>Explore our AEO &amp; GEO optimization services →</Link>
          </p>
        </div>
      </div>
    </section>

    {/* ── Who we build for ─────────────────────────────────── */}
    <section style={bandStyle} aria-label="Who our branding services are built for">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Who Our Branding Services Are Built For</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.75rem' }}>
          We offer branding and logo design services to businesses at every stage, including:
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AUDIENCES.map((a, i) => (
            <li key={a} className="flex items-start gap-3" style={{ ...cardStyle, padding: '1rem 1.1rem', boxShadow: '3px 3px 0 var(--color-ink)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-orange)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
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
          Beyond the brand itself, our team covers <Link to="/services/website-development" style={LINK_STYLE}>website development</Link>, <Link to="/services/seo" style={LINK_STYLE}>SEO services</Link>, <Link to="/services/aeo-geo" style={LINK_STYLE}>AEO &amp; GEO optimization</Link>, <Link to="/services/performance-marketing" style={LINK_STYLE}>performance marketing</Link>, and <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing services</Link> — so your brand launches with the full digital presence it needs.
        </p>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Start your branding project">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Ready to Build a Brand People Remember?</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>New to the industry? Or looking for a fresh look for your brand?</p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Tell us about your business. We will suggest the right next step and share a clear quote.</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'Branding Project' }} className="btn-primary btn-lg" data-cursor="hover">Schedule a Call</Link>
          <Link to="/contact" state={{ plan: 'Branding Quote' }} className="btn-outline btn-lg" data-cursor="hover">Request a Quote</Link>
        </div>
      </div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Frequently asked questions about branding and logo design">
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

export default BrandingLogoDesign
