/**
 * pages/ServiceDetail/ProfessionalWebsiteDesign.jsx
 * ─────────────────────────────────────────────────────────────
 * Dedicated landing page for /services/professional-website-design
 * (content per the "Professional Website Design" writing brief).
 * All internal links are plain follow links.
 * ─────────────────────────────────────────────────────────────
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/professional-website-design'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`

const TITLE = 'Professional Website Design Services | ADVMEN Technologies'
const DESCRIPTION =
  'Get a responsive, professional website that’s built for your business. ADVMEN offers custom design, UI/UX, e-commerce, and complete redesign services built around your business goals.'
const KEYWORDS =
  'professional website design services, website design and development, custom website design, professional website development, business website design, responsive web design, WordPress website development, e-commerce website development, website redesign services, UI/UX design services, SEO-friendly website design'

// Phrases in this page's copy that point to other pages on the site
const PAGE_LINKS = [
  { phrase: 'e-commerce shops', to: '/services/website-development/ecommerce' },
  { phrase: 'Healthcare', to: '/services/website-development/healthcare' },
  { phrase: 'AEO', to: '/services/aeo-geo' },
  { phrase: 'GEO', to: '/services/aeo-geo' },
  { phrase: 'AI-powered platforms', to: '/services/aeo-geo' },
  { phrase: 'digital marketing campaigns', to: '/digital-marketing-services-india' },
  { phrase: 'digital marketing tools', to: '/digital-marketing-services-india' },
  { phrase: 'SEO', to: '/services/seo' },
  { phrase: 'internal linking', to: '/services/seo' },
  { phrase: 'new markets', to: '/digital-marketing-services-india' },
  { phrase: 'custom quote', to: '/contact' },
  { phrase: 'Get a Website Design Quote', to: '/contact' },
]

const SERVICES = [
  {
    title: 'Bespoke Website Design',
    to: '/services/website-development',
    body: 'We design websites that match your brand and your business purpose. Pages flow. Calls-to-action are clear. Every section of the site has a purpose. We want people to immediately understand what you’re offering and remember you for all the right reasons.',
  },
  {
    title: 'Corporate & Business Website Design',
    to: '/services/website-development/corporate',
    body: 'We design sites for companies, startups, service firms, consultants, and anyone else who wants to grow. We keep it organized, showcase your product or service, and get your brand message across loud and clear.',
  },
  {
    title: 'E-Commerce Website Building',
    to: '/services/website-development/ecommerce',
    body: 'We design the way our audience will browse, the categories, the way the product is presented on the page, and the payment gateways our customers will use. Whether you need a simple store or something more custom, we build the features your business actually needs.',
  },
  {
    title: 'WordPress Website Development',
    body: 'If you want a website that you can manage and grow yourself, WordPress is a great choice. We design WordPress sites that look sharp, responsive, and easier for you to update content or add something new down the line.',
  },
  {
    title: 'UI & UX Design Services',
    body: 'We watch how people use your site. From the first click to the last, we design our business website strategy around how users navigate, find information, and interact. We’ve designed each step to be smooth and intuitive.',
  },
  {
    title: 'Website Redesign Services',
    body: 'We help you redesign the look, re-organize your content, rework the mobile experience, and make sure it all works better. If your old website isn’t bringing you business, we’ll suggest a new structure that fits your plans.',
  },
  {
    title: 'Mobile-Friendly Web Design',
    body: 'We make sure your site is responsive and works well on a phone, tablet, or desktop. Rather than treating mobile as an afterthought, we look at readability, navigation, spacing, interactions, and the way content is presented across different screen sizes.',
  },
]

const PROCESS = [
  { title: 'Learn', body: 'We start by understanding your audience, business & goals. We dig deep into your services and the requirements you have for your website.' },
  { title: 'Structure', body: 'We develop the site map, build the page hierarchy, and design the content flow. We keep things neat at this stage.' },
  { title: 'Design', body: 'Our website designers will create a visual journey from the blueprint. We work on the website’s look, clarity, functionality, and making each CTA stand out.' },
  { title: 'Build', body: 'Once the design is ready, our developers implement it. We choose the right technology, ensure that the integrations function, and prepare your site for future scaling.' },
  { title: 'Test & Launch', body: 'We test your website on all devices and browsers before going live. We check out everything you have requested: forms, navigation, responsiveness, etc.' },
]

const SEO_POINTS = ['Structure of the Pages', 'Headings and content flow', 'Internal linking opportunities', 'Mobile performance', 'Technical basics']

const AUDIENCES = [
  'Startups ready to launch their first real online presence',
  'Established businesses tired of an outdated site',
  'B2B companies communicating complex services',
  'Professional firms who need more business enquiries',
  'E-commerce shops looking to sell more online',
  'Healthcare and other service-based organizations',
  'Companies branching out into new markets',
  'Businesses looking for a website refresh or redesign',
  'Organizations who want their website tied in with bigger digital marketing campaigns',
]

const FAQS = [
  { question: 'What Is Included in Professional Website Design Services?', answer: 'Web design services usually include planning, structure, UI/UX design, responsive design, development, content integration, forms, and integrations needed. You’ll also get testing and launch support. The full scope really comes down to what your project needs.' },
  { question: 'How Much Does Professional Website Design Cost?', answer: 'The cost of website design services will fluctuate according to the number of pages required, the desired design, the desired features, the integrations required, and the type of content required. Once ADVMEN understands your needs, we’ll give you a custom quote.' },
  { question: 'How Long Does It Take to Design and Develop a Website?', answer: 'Your project timeline will be determined by your website size, features, content readiness, design complexity, and approval cycles. With a clear project outline, we can share a more precise timeline.' },
  { question: 'Does ADVMEN Provide Custom Website Design for Businesses?', answer: 'Absolutely. ADVMEN builds websites tailored to your business goals, audience, brand identity, and functional needs. We don’t treat every business as the same website project.' },
  { question: 'Will My Website Be Mobile-Friendly and Responsive?', answer: 'Yes. Responsive design is considered the core part of the website development process, so your site will look and work great on desktop, tablet, and mobile.' },
  { question: 'Can You Redesign an Existing Business Website?', answer: 'We can. If you have an existing site, we’ll update the visuals, improve the structure, boost usability and responsiveness, and enhance the overall experience. The specifics just depend on what you’re starting with.' },
  { question: 'Will My Website Be Optimized for SEO?', answer: 'We’ll set up your website with SEO-friendly foundations such as logical page structure, organized headings, quality content styling, and a responsive layout. Actual SEO results depend on factors beyond design alone, but we lay the right groundwork.' },
  { question: 'Can Website Design Help My Business Generate More Leads?', answer: 'A well-designed website helps people to understand your offer and to take action. Good messaging, easy navigation, strong calls to action, and a seamless user experience all help generate leads. Results also rely on your site traffic, market demand, the strength of your offer, and ongoing optimization.' },
  { question: 'Can My Website Content Be Optimized for AI Search Engines?', answer: 'Yes. We can help you structure your site’s content so it is easily understood by search engines and artificial intelligence systems. What this means is clear answers, a good structure, helpful FAQs, and consistent business info. Just remember, no one can guarantee that an AI tool will feature your site.' },
  { question: 'How Can I Get a Website Design Quote from ADVMEN Technologies?', answer: 'Let us know about your business, what you want your website to look like, what features you would like to see, and what you hope to accomplish. Our team will review your details and recommend a website design and development approach, along with a quote.' },
]

const RELATED = [
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Corporate Websites', to: '/services/website-development/corporate' },
  { label: 'Business Websites', to: '/services/website-development/business' },
  { label: 'E-Commerce Websites', to: '/services/website-development/ecommerce' },
  { label: 'Healthcare Websites', to: '/services/website-development/healthcare' },
  { label: 'Landing Pages', to: '/services/website-development/landing-page' },
  { label: 'Android App Development', to: '/services/app-development/android' },
  { label: 'iOS App Development', to: '/services/app-development/ios' },
  { label: 'SEO Optimization', to: '/services/seo' },
  { label: 'AEO & GEO Optimization', to: '/services/aeo-geo' },
  { label: 'Branding', to: '/services/branding' },
  { label: 'Performance Marketing', to: '/services/performance-marketing' },
  { label: 'Our Work', to: '/work' },
  { label: 'Pricing', to: '/pricing' },
]

const sectionPad = { padding: 'clamp(3rem, 7vw, 5rem) 0' }
const h2Style = { fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)', lineHeight: 1.15, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }
const bodyStyle = { fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text-secondary)' }
const cardStyle = { background: 'var(--color-surface-1)', border: '2px solid var(--color-ink)', borderRadius: '1rem', boxShadow: '4px 4px 0 var(--color-ink)', padding: '1.5rem' }

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

const ProfessionalWebsiteDesign = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      schemaData={{
        serviceName: 'Professional Website Design Services',
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'Professional Website Design', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        image: `${COMPANY.website}/Image/advmen_service1.webp`,
        howTo: {
          name: 'How ADVMEN takes a business from requirement to a live website',
          description: 'ADVMEN’s five-step website design and development process.',
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* Section 1 — Hero */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="Professional website design services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>Professional Website Design</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              Professional Website Design Services Built Around Your Business
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              A business website is the Virtual Address that defines your mission or promise.
            </p>
            <p style={bodyStyle}>
              A good website should answer three questions quickly: Who are you? What do you offer? Why should someone choose you?
            </p>
            <p style={bodyStyle}>
              We start website design and development with those fundamentals. ADVMEN builds sites with a clear strategy, smart UI/UX design, and a strong content structure to match your goals and speak to your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" className="btn-primary btn-lg" data-cursor="hover">Get a Website Consultation</Link>
              <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">See Our Work</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center p-4" style={{ background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }}>
              <img
                src="/Image/advmen_service1.webp"
                alt="Professional website design by ADVMEN"
                width="600"
                height="420"
                decoding="async"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Section 2 — Services */}
    <section style={{ ...sectionPad, background: 'var(--color-surface-2)', borderTop: '2px solid var(--color-ink)', borderBottom: '2px solid var(--color-ink)' }} aria-label="Our professional website design services">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Our Professional Website Design Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.07} style={cardStyle} className="flex flex-col">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                {s.to ? (
                  <Link to={s.to} className="hover:text-[var(--color-orange)] transition-colors duration-300" style={{ color: 'var(--color-ink)' }}>{s.title}</Link>
                ) : s.title}
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Section 3 — Process */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="From business requirement to live website">
      <div className="container">
        <h2 className="section-title" style={h2Style}>From Business Requirement to Live Website</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} id={`step-${i + 1}`} delay={i * 0.06} style={cardStyle} className="flex flex-col">
              <>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-orange)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{p.body}</p>
              </>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Section 4 — SEO-friendly */}
    <section style={{ ...sectionPad, background: 'var(--color-surface-2)', borderTop: '2px solid var(--color-ink)', borderBottom: '2px solid var(--color-ink)' }} aria-label="SEO-friendly website design">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 className="section-title" style={h2Style}>Get an SEO-Friendly Website Design from the Start</h2>
          <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
            {link('We don’t treat SEO like an afterthought. SEO is not something you can do once your website is live. Instead, we design by integrating SEO into every part of your site from the beginning. That means we think about:')}
          </p>
          <p style={bodyStyle}>
            {link('And much more. When we build this way, search engines get a crystal-clear idea of what your brand offers. It also makes any future SEO work much easier, laying down a solid base to grow your online presence.')}
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

    {/* Section 5 — Search, usability and AI discovery */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Websites designed for search, usability and AI-driven discovery">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Websites Designed for Search, Usability and AI-Driven Discovery</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            {link('Today’s search is not just Google or Bing. Consumers turn to AI-powered platforms for questions, product comparisons, and business searches. Your content should be clear and easy to follow. ADVMEN helps you make your website SEO and AI-structured. They can easily read your information at a glance.')}
          </p>
          <p style={bodyStyle}>
            We consider things like clean service pages, simple headings, helpful FAQs, consistency of company details, and logical flow of content. It helps people find you, whether they’re searching the old-fashioned way or with new AI tools. However, AI-search visibility cannot be guaranteed.
          </p>
          <p style={bodyStyle}>
            Whether a website is surfaced or cited depends on the platform. Depending on the platform, information, competition, and other factors, your website will show in different places and ways. Planning with ADVMEN and setting the stage gives your site the best chance to stand out.
          </p>
          <p>
            <Link to="/services/aeo-geo" style={LINK_STYLE}>Learn about our AEO &amp; GEO optimization services →</Link>
          </p>
        </div>
      </div>
    </section>

    {/* Section 6 — Who we design for */}
    <section style={{ ...sectionPad, background: 'var(--color-surface-2)', borderTop: '2px solid var(--color-ink)', borderBottom: '2px solid var(--color-ink)' }} aria-label="Who we design websites for">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Who We Design Websites For</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.75rem' }}>
          We offer website design and development services to businesses in different niches, including:
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

    {/* Section 7 — Why ADVMEN */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Why businesses choose ADVMEN">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Why Businesses Choose ADVMEN</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            ADVMEN aims for your website project to sit at the intersection of design, technology, and digital visibility. Instead of separate pages, our strategic planning considers the message visitors see, the actions they can take, the information they need, and the digital channels that bring them to the website.
          </p>
          <p style={bodyStyle}>
            Our team knows website development, UI/UX, <Link to="/services/seo" style={LINK_STYLE}>SEO</Link>, <Link to="/services/aeo-geo" style={LINK_STYLE}>AEO</Link>, <Link to="/services/aeo-geo" style={LINK_STYLE}>GEO</Link>, and a host of <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing</Link> tools. So your website won’t live in a vacuum and will be considered within a larger digital strategy where required. The goal is simple: We offer professional website design services that represent your business professionally today and provide a practical foundation for what comes next.
          </p>
        </div>
      </div>
    </section>

    {/* Section 8 — CTA */}
    <section style={{ ...sectionPad, background: 'var(--color-surface-2)', borderTop: '2px solid var(--color-ink)', borderBottom: '2px solid var(--color-ink)' }} aria-label="Get a website consultation">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Let’s Build a Website that brings Business.</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>Have a new website in mind? A redesign overdue? Or simply tired of your outdated website?</p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Tell us what you need. We’ll help turn the idea into a website that works for your business.</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" className="btn-primary btn-lg" data-cursor="hover">Consult Today</Link>
          <Link to="/contact" state={{ plan: 'Website Consultation' }} className="btn-outline btn-lg" data-cursor="hover">Get a Website Consultation</Link>
          <Link to="/contact" state={{ plan: 'Website Project Quote' }} className="btn-outline btn-lg" data-cursor="hover">Request a Project Quote</Link>
        </div>
      </div>
    </section>

    {/* Section 9 — FAQ */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Frequently asked questions">
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

    {/* Related pages — internal linking */}
    <section style={{ padding: '0 0 5rem', background: 'var(--color-black)' }} aria-label="Related services and pages">
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

export default ProfessionalWebsiteDesign
