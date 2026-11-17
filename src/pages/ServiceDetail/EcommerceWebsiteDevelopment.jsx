/**
 * pages/ServiceDetail/EcommerceWebsiteDevelopment.jsx
 * Dedicated landing page for /services/website-development/ecommerce
 * SEO / AEO / GEO optimised with structured schema, internal linking,
 * breadcrumbs, FAQPage, HowTo, and speakable markup.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/website-development/ecommerce'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`

const TITLE = 'E-Commerce Website Development Services | ADVMEN Technologies'
const DESCRIPTION =
  'Create a stronger online presence with e-commerce website development services. Tailor the features and shopping experience to your changing business needs.'
const KEYWORDS =
  'e-commerce website development services, e-commerce website solutions, e-commerce website development company, custom e-commerce development, online store development, e-commerce website design, mobile-friendly e-commerce website, shopping cart development, payment gateway integration, e-commerce website design and development, online shopping website development, ecommerce store development India, ecommerce website development company India, best ecommerce website development, B2B ecommerce development, D2C ecommerce website, WooCommerce development, Shopify development, headless ecommerce'

const PAGE_LINKS = [
  { phrase: 'SEO services', to: '/services/seo' },
  { phrase: 'AEO & GEO optimization services', to: '/services/aeo-geo' },
  { phrase: 'AEO and GEO', to: '/services/aeo-geo' },
  { phrase: 'digital marketing services', to: '/digital-marketing-services-india' },
  { phrase: 'website development services', to: '/services/website-development' },
  { phrase: 'professional website design', to: '/services/professional-website-design' },
  { phrase: 'iOS app development', to: '/services/app-development/ios' },
  { phrase: 'Android app development', to: '/services/app-development/android' },
  { phrase: 'performance marketing', to: '/services/performance-marketing' },
  { phrase: 'content marketing', to: '/services/content-marketing' },
  { phrase: 'search engine optimization', to: '/services/seo' },
  { phrase: 'branding services', to: '/services/branding' },
  { phrase: 'our work', to: '/work' },
  { phrase: 'contact us', to: '/contact' },
]

const SERVICES = [
  {
    title: 'Custom E-Commerce Development',
    body: 'Selling made-to-order gifts is not the same as selling spare parts. We build around your products, pricing rules, and buyers — not around a ready-made template. Our custom e-commerce development gives you the exact tools your business needs to grow.',
  },
  {
    title: 'E-Commerce Website Design',
    body: 'A shopper decides in seconds. We keep the path from landing page to cart short and clear, with sharp product photos, easy filters, and simple menus. Strong e-commerce website design feels effortless and looks like your brand.',
  },
  {
    title: 'Online Store Development',
    body: 'Need a store built from end to end? We set up your product listings, search, stock, and orders, then show you how to manage them. Our online store development process ensures owners and teams stay in full control.',
  },
  {
    title: 'Shopping Cart & Checkout Setup',
    body: 'A slow checkout loses sales. Our shopping cart development removes the extra clicks. Think guest checkout, clear totals, coupon fields, and saved addresses for returning buyers. Shoppers finish faster, and fewer carts get abandoned.',
  },
  {
    title: 'Payment Gateway & Shipping Integration',
    body: 'Buying should feel safe and easy. We handle payment gateway integration for cards, UPI, net banking, wallets, and Cash on Delivery. We also connect courier partners so delivery charges, tracking, and shipping labels fit into your daily routine.',
  },
  {
    title: 'Mobile-Friendly Store Design',
    body: 'Most of your buyers arrive on a phone. We build mobile-friendly e-commerce website solutions with fast pages, thumb-friendly buttons, and a checkout that works in a few taps. It feels like an app — without the download.',
  },
  {
    title: 'Store Migration & Redesign',
    body: 'Stuck on an old platform? We shift your products, customers, and orders to a better one without losing data or search rankings. If the look needs a refresh too, we handle that in the same project.',
  },
  {
    title: 'E-Commerce Website Solutions for B2B & D2C',
    body: 'Whether you run a D2C brand or a B2B wholesale operation, our e-commerce website solutions are built around your pricing model, buyer journey, and order workflows — not a generic template.',
  },
]

const PROCESS = [
  { title: 'Understand', body: 'We learn about your products, customers, and sales goals. A short call and a few questions help us see what your store needs to do.' },
  { title: 'Plan', body: 'We map out your menu, product pages, and checkout path. You see the plan on paper before any design begins.' },
  { title: 'Design', body: 'We design the key pages, from the home page to checkout. You share feedback, and we refine until it feels right.' },
  { title: 'Build', body: 'Our developers turn the design into a working store. Cart, payments, shipping, and product uploads all get set up and connected.' },
  { title: 'Launch', body: 'We test on real phones and browsers, run sample orders, and fix any issues. Then we take the store live and help you through launch day.' },
]

const SEO_POINTS = [
  'Product and category page setup',
  'Clean page titles and web addresses',
  'Image names and alt descriptions',
  'Structured data and schema markup',
  'Links between related products',
  'Fast-loading pages',
  'Canonical URLs and sitemap setup',
]

const AUDIENCES = [
  'New brands going live with their first online shop',
  'Local shops ready to sell beyond their city',
  'Sellers moving off marketplaces to own their customer relationships',
  'D2C brands that want full control of the shopper journey',
  'B2B and wholesale sellers with bulk orders and special pricing',
  'Manufacturers putting their product range online for the first time',
  'Stores stuck on slow or hard-to-manage platforms',
  'Healthcare and wellness brands that sell products online',
  'Teams running ads, search engine optimization, or digital marketing who need a store that turns clicks into orders',
]

const WHY_ADVMEN = [
  { title: 'Built Around Your Business', body: 'We don\'t use a one-size-fits-all approach. Your e-commerce website is designed specifically around your product range, customers, business goals, and growth plans.' },
  { title: 'Designed to Sell, Not Just Look Good', body: 'With user-friendly navigation and easy-to-browse product pages, every part of our e-commerce website development helps you sell more online.' },
  { title: 'Development That Scales With You', body: 'Start with what your business needs today and add more as you grow. Our e-commerce website solutions are built with scalability in mind from day one.' },
  { title: 'Performance at the Core', body: 'A slow website means lost sales. We focus on building stores that load fast, run smoothly, and give every shopper a great browsing experience.' },
  { title: 'SEO-Ready From the Start', body: 'We build every store with search engine optimization in mind — clean URLs, structured data, fast pages, and optimised product and category pages from the start.' },
  { title: 'Simple, Clear Communication', body: 'No tech jargon, no unnecessary complexity. We keep you informed at every stage — what is being built, why, and what comes next.' },
  { title: 'Connected Digital Services', body: 'Your e-commerce website works best when it connects with SEO, AEO and GEO, and digital marketing services — forming one unified growth engine.' },
  { title: 'Support Beyond Launch', body: 'Going live is just the beginning. We offer ongoing maintenance, updates, security checks, and help with new features as your store grows.' },
]

const FAQS = [
  { question: 'How Much Does an E-Commerce Website Cost?', answer: 'There is no single price. The cost depends on the number of products, how custom the design is, and the tools you need — like payment gateway integration, shipping, or stock software. Tell us your goals and we will send a clear, itemised quote.' },
  { question: 'How Long Does It Take to Build an Online Store?', answer: 'A simple store can be ready in a few weeks. A large one with many products and special features takes longer. Delays usually come from late content or slow approvals, not from coding. Share your product details early and we will give you a realistic timeline.' },
  { question: 'Can You Create a Custom E-Commerce Website?', answer: 'Yes. If templates feel too limiting, we do custom e-commerce development built around how you sell. Think bundle offers, size or colour choices, bulk pricing, or customer login areas. Tell us your must-haves and we will explain what is possible.' },
  { question: 'Can You Integrate Payment Gateways and Shipping Services?', answer: 'Yes. We handle payment gateway integration for cards, UPI, net banking, and wallets, plus Cash on Delivery if you offer it. We also connect courier partners so shipping rates and tracking show up right inside your store.' },
  { question: 'Will My Online Store Work on Mobile Devices?', answer: 'Yes. We design mobile-friendly e-commerce websites first, then scale up to tablets and desktops. Before launch we test tap sizes, loading speed, and checkout on real devices so mobile shoppers can browse and buy without any trouble.' },
  { question: 'Can You Migrate Products from an Existing Store?', answer: 'Yes. We move your products, images, categories, customers, and order history. We also redirect old URLs to the right new pages so you keep your search rankings. Everything is checked before the new store goes live.' },
  { question: 'Can You Help Improve E-Commerce Conversions?', answer: 'Yes. We find where shoppers drop off and fix the weak spots — slow pages, a long checkout, or missing trust signals like reviews. Pair that with our SEO services and digital marketing services and more visitors turn into buyers.' },
  { question: 'Do You Provide Ongoing Support and Maintenance?', answer: 'Yes. Launch is the start, not the finish. We offer updates, backups, security checks, bug fixes, and help with new features. We will suggest a support plan based on the size of your store and how often it changes.' },
  { question: 'Which E-Commerce Platforms Do You Work With?', answer: 'We work with WooCommerce, Shopify, custom-built solutions, and headless e-commerce setups depending on your needs. We recommend the right platform based on your product range, budget, and growth plans.' },
  { question: 'Do You Also Handle SEO and Marketing for the Store?', answer: 'Yes. Beyond building the store, our team covers search engine optimization, AEO and GEO for AI search visibility, performance marketing, and full digital marketing services — so your store launches with the traffic it needs.' },
]

const RELATED = [
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Corporate Websites', to: '/services/website-development/corporate' },
  { label: 'Business Websites', to: '/services/website-development/business' },
  { label: 'Healthcare Websites', to: '/services/website-development/healthcare' },
  { label: 'Landing Pages', to: '/services/website-development/landing-page' },
  { label: 'Website Design', to: '/services/professional-website-design' },
  { label: 'Android App Development', to: '/services/app-development/android' },
  { label: 'iOS App Development', to: '/services/app-development/ios' },
  { label: 'SEO Services', to: '/services/seo' },
  { label: 'AEO & GEO / AI Search', to: '/services/aeo-geo' },
  { label: 'Performance Marketing', to: '/services/performance-marketing' },
  { label: 'Digital Marketing', to: '/digital-marketing-services-india' },
  { label: 'Branding', to: '/services/branding' },
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

const EcommerceWebsiteDevelopment = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/Image/advmen_service1.webp`}
      schemaData={{
        serviceName: 'E-Commerce Website Development Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'Website Development', url: `${COMPANY.website}/services/website-development` },
          { name: 'E-Commerce Website Development', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: AUDIENCES.map((name) => ({ name })),
        itemsName: 'Who our e-commerce website development services are built for',
        image: `${COMPANY.website}/Image/advmen_service1.webp`,
        platforms: ['WooCommerce', 'Shopify', 'Custom / Headless'],
        howTo: {
          name: 'How ADVMEN builds an e-commerce store from first call to first order',
          description: 'ADVMEN\'s five-step e-commerce website development process: understand, plan, design, build, and launch.',
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* ── Hero ─────────────────────────────────────────────── */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="E-commerce website development services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services/website-development" style={{ color: 'var(--color-text-tertiary)' }}>Website Development</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>E-Commerce</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              E-Commerce Websites That Mean Business
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              Your online store never closes. It shows your products, answers questions, and takes orders at any hour.
            </p>
            <p style={bodyStyle}>
              People judge a store in a few seconds. If it feels slow or confusing, they leave. If it feels clear and safe, they buy.
            </p>
            <p style={bodyStyle}>
              That is the job of good e-commerce website development services, and ADVMEN excels at it. We plan, design, and build online stores that are easy to shop from and simple for you to run.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'E-Commerce Consultation' }} className="btn-primary btn-lg" data-cursor="hover">Get Free Consultation</Link>
              <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">See Our Work</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center p-6" style={{ background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }}>
              <img
                src="/Image/advmen_service1.webp"
                alt="E-commerce website development services by ADVMEN Technologies"
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
    <section style={bandStyle} aria-label="Our e-commerce website development services">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Our E-Commerce Website Development Services</h2>
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
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="From first call to first order">
      <div className="container">
        <h2 className="section-title" style={h2Style}>From First Call to First Order</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Every phase has a clear goal. We move from discovery to launch without skipping the steps that matter.</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="E-commerce website development process">
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
    <section style={bandStyle} aria-label="Built to be found on search from day one">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 className="section-title" style={h2Style}>Built to Be Found on Search from Day One</h2>
          <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
            A store nobody finds can't sell. So we set up the SEO basics while we build — not months later. Our e-commerce website development company will save you from costly fixes down the road. When you are ready for bigger search engine optimization work, the groundwork is already done.
          </p>
          <p style={bodyStyle}>
            {link('Here is what we look at across every online store we build:')}
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
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Stores that shoppers and AI tools can both understand">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Stores That Shoppers and AI Tools Can Both Understand</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            People now ask AI-powered platforms questions like "which running shoes suit flat feet?" or "best skincare products for oily skin." Your products need to be easy for these tools to read, understand, and recommend. We write and organise your store content with that in mind.
          </p>
          <p style={bodyStyle}>
            That means clear product details, honest FAQs, simple headings, structured data markup, and consistent business information on every page. These basics help you show up in classic search and in AI-generated answers alike.
          </p>
          <p style={bodyStyle}>
            No one can guarantee a spot in AI answers — each platform picks its own sources. What we can do is make your store clear, well-organised, and technically sound so it has a fair shot at being cited.
          </p>
          <p>
            <Link to="/services/aeo-geo" style={LINK_STYLE}>Explore our AEO &amp; GEO optimization services →</Link>
          </p>
        </div>
      </div>
    </section>

    {/* ── Who we build for ─────────────────────────────────── */}
    <section style={bandStyle} aria-label="Who our online stores are built for">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Who Our Online Stores Are Built For</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.75rem' }}>
          We offer e-commerce website development services to sellers at every stage, including:
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
          Beyond the store itself, our team covers <Link to="/services/seo" style={LINK_STYLE}>SEO services</Link>, <Link to="/services/aeo-geo" style={LINK_STYLE}>AEO &amp; GEO optimization</Link> for AI search visibility, <Link to="/services/performance-marketing" style={LINK_STYLE}>performance marketing</Link>, <Link to="/services/content-marketing" style={LINK_STYLE}>content marketing</Link>, and <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing services</Link> — so your store launches with the visibility and traffic it needs from day one.
        </p>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Start your e-commerce project">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>From "Just Browsing" to "Just Bought."</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>Got a product range and a plan? Or an old store that is holding you back?</p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Share your ideas with us. We will map out the right next step and give you a clear quote.</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'E-Commerce Project' }} className="btn-primary btn-lg" data-cursor="hover">Get Free Consultation</Link>
          <Link to="/contact" state={{ plan: 'E-Commerce Quote' }} className="btn-outline btn-lg" data-cursor="hover">Request a Project Quote</Link>
        </div>
      </div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Frequently asked questions about e-commerce website development">
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

export default EcommerceWebsiteDevelopment
