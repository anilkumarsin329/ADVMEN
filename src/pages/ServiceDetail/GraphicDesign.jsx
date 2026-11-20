import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/graphic-design'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`
const TITLE = 'Professional Graphic Design Services | ADVMEN Technologies'
const DESCRIPTION = 'On-brand visuals for social media, ads, brochures, presentations, and print. Professional graphic design services shaped around your brief.'
const KEYWORDS = 'professional graphic design services, graphic design agency, business graphic design services, social media graphic design, marketing collateral design, brochure and flyer design, presentation design services, advertising creative design, brand collateral design'

const PAGE_LINKS = [
  { phrase: 'branding and logo design team', to: '/services/branding' },
  { phrase: 'branding and logo design', to: '/services/branding' },
  { phrase: 'digital marketing team', to: '/digital-marketing-services-india' },
  { phrase: 'digital marketing', to: '/digital-marketing-services-india' },
  { phrase: 'UI/UX design team', to: '/services/ui-ux-design' },
  { phrase: 'UI/UX design', to: '/services/ui-ux-design' },
  { phrase: 'portfolio', to: '/work' },
  { phrase: 'contact page', to: '/contact' },
  { phrase: 'SEO services', to: '/services/seo' },
  { phrase: 'AEO and GEO', to: '/services/aeo-geo' },
  { phrase: 'website development', to: '/services/website-development' },
  { phrase: 'social media management', to: '/services/social-media-management' },
]

const SERVICES = [
  {
    title: 'Social Creatives',
    body: 'Our social media graphic design covers posts, carousels, stories, covers, and banners. We design to each platform\'s aspect ratios and safe zones, keep text legible on small screens, and build reusable templates so your feed looks cohesive without starting from scratch each week.',
  },
  {
    title: 'Ad Creatives',
    body: 'Our advertising creative design covers social ads, display banners, and print ads. We build a clear visual hierarchy, keep the message and call to action easy to spot, and prepare size and format variations so a campaign stays consistent across placements.',
  },
  {
    title: 'Brochures, Flyers, and Print',
    body: 'Our brochure and flyer design relies on grid-based layouts, typographic hierarchy, controlled white space, and image treatment that guides the reader from headline to action. We prepare print work with the right margins, bleed, and color setup.',
  },
  {
    title: 'Presentation Design',
    body: 'Our presentation design services transform dense content into clear stories: pitch decks, company profiles, sales decks, and training presentations. We build master slides, consistent layouts, readable charts, and a visual rhythm that holds attention.',
  },
  {
    title: 'Business and Brand Collateral',
    body: 'Our brand collateral design covers the materials people hold, share, and remember: stationery, company profiles, proposals, banners, and other business materials. Every piece follows the same visual rules. If your identity needs work first, our branding and logo design team can help.',
  },
  {
    title: 'Marketing Collateral and Campaign Kits',
    body: 'Our marketing collateral design brings a campaign idea to life across formats: catalogs, one-pagers, email headers, event material, and matching sets for launches and promotions. We design the pieces together so message, imagery, and layout stay aligned.',
  },
  {
    title: 'Print-Ready and Digital Files',
    body: 'Print files typically need CMYK color, high-resolution images, bleed, and crop marks, while digital files need RGB color and sizes optimized for fast loading. We prepare each piece for its intended use and confirm the exact file formats in your project scope.',
  },
]

const PROCESS = [
  { title: 'Brief', body: 'We learn your goals, audience, message, formats, sizes, deadlines, and brand guidelines, then confirm what success looks like.' },
  { title: 'Concept', body: 'We develop the creative direction and early layouts, so you can react to the idea before we invest in the details.' },
  { title: 'Feedback', body: 'You review the concepts and share your thoughts. We ask questions where needed so feedback translates into clear changes.' },
  { title: 'Revision', body: 'We refine the chosen direction, adjusting layout, typography, imagery, and color until it works for your audience and your brand.' },
  { title: 'Final Handoff', body: 'We prepare the approved designs for their intended use and deliver organized final files, with details of what is included confirmed in your project scope.' },
]

const AUDIENCES = [
  'Startups building their first set of marketing materials',
  'Small and mid-sized businesses with inconsistent visuals',
  'Corporate teams that need polished decks and collateral',
  'E-commerce brands that publish campaigns and promotions often',
  'Healthcare, education, and real estate organizations that rely on clear, trustworthy communication',
  'Event organizers and teams preparing launches',
]

const WHY_ADVMEN = [
  { title: 'Strategy Before Design', body: 'We start with your goals, audience, and brand, then choose the visuals that serve them.' },
  { title: 'Every Design Has a Purpose', body: 'Layout, typography, color, and imagery are chosen to make the message clearer, not just prettier.' },
  { title: 'Design That Works Everywhere', body: 'We plan each piece for its channel, from phone screens and social feeds to presentations and print.' },
  { title: 'One Team, Connected Thinking', body: 'As a graphic design agency working alongside web development, UI/UX design, SEO services, and digital marketing teams, we design with your wider digital presence in mind.' },
  { title: 'Practical, Ready-to-Use Deliverables', body: 'Our professional graphic design services produce organized final files, clear guidance, and honest recommendations your team can use immediately.' },
  { title: 'Built for Long-Term Consistency', body: 'We create layouts and templates that make it easier for your team to stay on-brand as your business grows.' },
]

const FAQS = [
  { question: 'What types of graphic design do you provide?', answer: 'Our professional graphic design services cover social creatives, ad creatives, brochures, flyers, presentations, banners, and business collateral. Let us know what you need and we will suggest the right approach.' },
  { question: 'Can you design social media posts and ad creatives?', answer: 'Yes. Our social media graphic design includes posts, carousels, and story formats sized for each platform, while our advertising creative design covers ad banners and campaign visuals built around a clear message and call to action.' },
  { question: 'Do you create brochures, flyers, and presentations?', answer: 'Yes. Our brochure and flyer design covers layout, imagery, and print preparation, and our presentation design services cover pitch decks, company profiles, and sales or training decks.' },
  { question: 'Can designs follow our existing brand guidelines?', answer: 'Yes. If you have guidelines, we follow them closely and adapt them to each format. As a graphic design agency that also works with branding teams, we can help if your guidelines need updating or you do not have any yet.' },
  { question: 'Will files be supplied in print-ready formats?', answer: 'We prepare files according to how they will be used: print files with the correct color mode, resolution, bleed, and crop marks, and digital files sized for screens. The exact formats are confirmed in your project scope.' },
  { question: 'Are editable source files included?', answer: 'Whether editable source files are included is confirmed in your project scope, so you know exactly what you will receive before work begins.' },
  { question: 'How many revisions are available?', answer: 'The number of revision rounds is agreed in the project scope. We structure feedback in stages, concept first and details later, so changes happen at the right level and projects stay on track.' },
  { question: 'How do I request a graphic design quote?', answer: 'Share your brief with ADVMEN Technologies through our contact page: goals, audience, formats and sizes, deadline, and any brand guidelines. We will review it, confirm the scope, and send a clear quote. Our business graphic design services are scoped to your needs, not sold as one-size-fits-all packages.' },
]

const RELATED = [
  { label: 'Branding & Logo Design', to: '/services/branding' },
  { label: 'UI/UX Design', to: '/services/ui-ux-design' },
  { label: 'Social Media Management', to: '/services/social-media-management' },
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'SEO Services', to: '/services/seo' },
  { label: 'AEO & GEO / AI Search', to: '/services/aeo-geo' },
  { label: 'Digital Marketing', to: '/digital-marketing-services-india' },
  { label: 'Performance Marketing', to: '/services/performance-marketing' },
  { label: 'Content Marketing', to: '/services/content-marketing' },
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

const GraphicDesign = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/Image/advmen_service6.webp`}
      schemaData={{
        serviceName: 'Professional Graphic Design Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'Graphic Design', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: AUDIENCES.map((name) => ({ name })),
        itemsName: 'Who our professional graphic design services are built for',
        image: `${COMPANY.website}/Image/advmen_service6.webp`,
        howTo: {
          name: 'How ADVMEN delivers graphic design from brief to final files',
          description: 'ADVMEN five-step graphic design process: brief, concept, feedback, revision, and final handoff.',
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* Hero */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="Professional graphic design services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>Graphic Design</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              Best Graphic Design Services for a Consistent Brand Presence
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              Your business does good work, yet your visuals tell a different story.
            </p>
            <p style={bodyStyle}>
              The social posts look different every week. The brochure drifts away from your brand colors. The pitch deck is crowded with text. Customers rarely point this out. They simply trust you a little less.
            </p>
            <p style={bodyStyle}>
              ADVMEN Technologies closes that gap. Our professional graphic design services turn your brand guidelines into campaigns, collateral, and presentations that look consistent, read clearly, and are prepared correctly for print or screen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'Graphic Design Brief' }} className="btn-primary btn-lg" data-cursor="hover">Share Your Design Brief</Link>
              <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">View Our Portfolio</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center p-6" style={{ background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }}>
              <img
                src="/Image/advmen_service6.webp"
                alt="Designer arranging brochure, social media posts, and presentation slides in one brand style"
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

    {/* Services */}
    <section style={bandStyle} aria-label="What our professional graphic design services include">
      <div className="container">
        <h2 className="section-title" style={h2Style}>What Our Professional Graphic Design Services Include</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>From a single social post to a full set of business materials, we design the visuals your brand needs most often.</p>
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

    {/* Brand Consistency */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Brand consistency across every channel">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-12">
          <h2 className="section-title" style={h2Style}>Brand Consistency Across Every Channel</h2>
          <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
            Consistency is not about making every piece identical. It is about making every piece recognizable. We start with your brand guidelines: logo clear space, color palette, typography, imagery style, and tone. Then we adapt them to each format, so a banner, a brochure, and a story all feel like they came from the same hand.
          </p>
          <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
            Colors are converted carefully between screen and print, vector artwork is kept scalable, type is adjusted for readability at each size, and layouts are rebuilt for each channel rather than simply stretched.
          </p>
          <p style={{ ...bodyStyle, marginBottom: '1.5rem' }}>
            For teams that publish often, we create templates so your people can stay on-brand without waiting on a designer. If your campaigns also need distribution and measurement, our {link('digital marketing team')} can extend the work, and our {link('UI/UX design team')} can carry the same look into your website or app.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/services/branding" className="btn-outline btn-sm" data-cursor="hover">Branding &amp; Logo Design</Link>
            <Link to="/services/ui-ux-design" className="btn-outline btn-sm" data-cursor="hover">UI/UX Design</Link>
            <Link to="/digital-marketing-services-india" className="btn-outline btn-sm" data-cursor="hover">Digital Marketing</Link>
          </div>
        </div>
      </div>
    </section>

    {/* Process */}
    <section style={bandStyle} aria-label="From brief to final files">
      <div className="container">
        <h2 className="section-title" style={h2Style}>From Brief to Final Files</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Every project follows a clear, collaborative workflow.</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="Graphic design process steps">
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

    {/* AEO / GEO */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Graphic design and AI search visibility">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Design That AI Tools and Search Engines Can Understand</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            When someone asks an AI assistant "best graphic design agency in India" or "who designs brochures for healthcare brands," those tools look for businesses with clear, consistent, and well-structured information. Good design and good content work together.
          </p>
          <p style={bodyStyle}>
            We build every service page with structured data, clear headings, descriptive alt text, and FAQ markup so your graphic design services are easy for both people and AI tools to find and understand. This supports your broader {link('SEO services')} and {link('AEO and GEO')} strategy.
          </p>
          <p style={bodyStyle}>
            No agency can guarantee how AI platforms surface results. What we can do is make sure your brand is presented clearly, consistently, and with the right signals across every channel.
          </p>
          <p>
            <Link to="/services/aeo-geo" style={LINK_STYLE}>Explore our AEO &amp; GEO optimization services →</Link>
          </p>
        </div>
      </div>
    </section>

    {/* Benefits + Who It Is For */}
    <section style={bandStyle} aria-label="Benefits of graphic design services and who it is for">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Benefits of Graphic Design Services and Who It Is For</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.5rem' }}>Good design saves time, protects your reputation, and makes your marketing easier to run. With our business graphic design services, you can expect:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { label: 'Recognizable branding', desc: 'A consistent look across social, print, and presentations' },
            { label: 'Clear communication', desc: 'Layouts that guide readers to the point and the next step' },
            { label: 'Zero print surprises', desc: 'Files prepared with the right color, resolution, and bleed' },
            { label: 'Faster publishing', desc: 'Templates that help your team produce on-brand content' },
            { label: 'Credible image', desc: 'Polished materials that support trust in meetings and campaigns' },
          ].map((b) => (
            <div key={b.label} style={{ ...cardStyle, boxShadow: '3px 3px 0 var(--color-ink)', padding: '1rem 1.25rem' }}>
              <p style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.25rem' }}>{b.label}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>{b.desc}</p>
            </div>
          ))}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>It fits:</h3>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AUDIENCES.map((a, i) => (
            <li key={a} className="flex items-start gap-3" style={{ ...cardStyle, padding: '1rem 1.1rem', boxShadow: '3px 3px 0 var(--color-ink)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-orange)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--color-ink)' }}>{a}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Why ADVMEN */}
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
      </div>
    </section>

    {/* CTA */}
    <section style={bandStyle} aria-label="Request a graphic design quote">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Drop Us a Brief. We'll Handle the Wow.</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>Tell ADVMEN Technologies what you need, whether it is a campaign set, a brochure, a pitch deck, or a full collateral refresh.</p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>We will review your brief, suggest the right approach, and send a clear quote. Our professional graphic design services are ready when you are.</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'Graphic Design Quote' }} className="btn-primary btn-lg" data-cursor="hover">Request a Quote</Link>
          <Link to="/contact" state={{ plan: 'Graphic Design Brief' }} className="btn-outline btn-lg" data-cursor="hover">Share Your Design Brief</Link>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Frequently asked questions about graphic design services">
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

    {/* Related */}
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

export default GraphicDesign
