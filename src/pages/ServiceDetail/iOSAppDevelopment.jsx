/**
 * pages/ServiceDetail/iOSAppDevelopment.jsx
 * ─────────────────────────────────────────────────────────────
 * Dedicated landing page for /services/app-development/ios
 * Content per the "iOS App Development" writing brief.
 * AEO / GEO / SEO optimised with structured data, internal linking,
 * breadcrumbs, FAQ schema, HowTo schema, and speakable markup.
 * ─────────────────────────────────────────────────────────────
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/app-development/ios'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`

const TITLE = 'iOS App Development Services | Custom iPhone & iPad Apps | ADVMEN'
const DESCRIPTION =
  'ADVMEN provides secure, scalable iOS app development services for businesses and product teams — from UI/UX and Swift development to testing, App Store support, and maintenance.'
const KEYWORDS =
  'iOS app development services, iOS app development company, custom iOS app development, iPhone app development, iPad app development, Swift app development, iOS application developers, iOS app design and development, iOS app maintenance, native iOS development, SwiftUI development, UIKit development, App Store submission, iOS UI UX design, iOS app testing, iOS app integration'

const PAGE_LINKS = [
  { phrase: 'Android app development', to: '/services/app-development/android' },
  { phrase: 'cross-platform app development', to: '/services/app-development/cross-platform' },
  { phrase: 'UI/UX design', to: '/services/professional-website-design' },
  { phrase: 'website development services', to: '/services/website-development' },
  { phrase: 'e-commerce development', to: '/services/website-development/ecommerce' },
  { phrase: 'digital marketing services', to: '/digital-marketing-services-india' },
  { phrase: 'SEO services', to: '/services/seo' },
  { phrase: 'AI search optimization', to: '/services/aeo-geo' },
  { phrase: 'our work', to: '/work' },
  { phrase: 'Talk to ADVMEN', to: '/contact' },
]

const SOLUTIONS = [
  'Customer-Oriented Mobile Applications',
  'iPhone Applications',
  'iPad Applications',
  'E-Commerce and Retail Applications',
  'Booking Applications',
  'Subscription Applications',
  'Business Efficiency Applications',
  'Enterprise Applications',
]

const SERVICES = [
  {
    title: 'iOS UI/UX Design & Prototyping',
    body: 'Good mobile designs begin before you write a line of code. When designing and developing an iOS app, we use wireframing, user flows, and interface design to deliver a good navigational experience and interaction with the app. We build custom interfaces with native iOS elements and interactions with frameworks like SwiftUI and UIKit based on the needs.',
  },
  {
    title: 'Native iOS Development',
    body: 'For apps that need a native experience on an Apple platform, our Swift app development services focus on writing clean code, building responsive interfaces, and adding the right functionality for the platform. We build apps to perform, handle data, scale, and be easy to maintain in the future.',
  },
  {
    title: 'API & Third-Party Integrations',
    body: 'Modern applications rarely run in isolation. We integrate your app with external systems through APIs and third-party services. This may include backend services, authentication, payment services, and other integrations as necessary based on the technical and business requirements of the project.',
  },
  {
    title: 'QA & Application Testing',
    body: 'A mobile application should work beyond the screens of developers. In our process of testing, we test functionality, usability, performance, security, and compatibility. Testing may involve simulators and relevant real device scenarios to find bugs, interface issues, and compatibility concerns before release.',
  },
  {
    title: 'App Store Submission Support',
    body: 'When preparing an app for the App Store, you must pay attention to Apple\'s submission requirements. We support the release process and assist in preparing the application for submission following the respective guidelines.',
  },
  {
    title: 'iOS App Maintenance & Upgrades',
    body: 'The launch of your app is just one part of its lifecycle. Our iOS app maintenance services can help you with ongoing bug fixes, compatibility updates, performance improvements, and application enhancements as your product evolves.',
  },
]

const PROCESS = [
  {
    title: 'Discovery and Product Planning',
    body: 'Business goal, target market, features, integrations, and technical requirements are outlined.',
  },
  {
    title: 'User Journeys, Wireframes & UI/UX Design',
    body: 'We design user journeys, wireframes, and UI/UX design of the app before coding.',
  },
  {
    title: 'Architecture and Development',
    body: 'The application architecture and development approach are set, and then we move towards development of the app.',
  },
  {
    title: 'Integration and Testing',
    body: 'Integration of APIs and any third-party services, if necessary. We do the testing of the functionality, usability, and performance of the app.',
  },
  {
    title: 'App Store Preparation',
    body: 'Preparation of the app for its release and support through the App Store submission process.',
  },
  {
    title: 'Maintenance and Improvements',
    body: 'After launch, we continue supporting updates, fixes, compatibility requirements, and future improvements.',
  },
]

const QUALITY_POINTS = [
  {
    title: 'Performance',
    body: 'We design our apps with a smart architecture and implement every part carefully. It avoids unnecessary processing delays.',
  },
  {
    title: 'Accessibility',
    body: 'We build app layouts that are easy to adapt, ensure interaction feels natural, and meet accessibility standards right from the start.',
  },
  {
    title: 'Privacy & Security',
    body: 'Mobile apps often handle sensitive personal details, business information, or payments. We consider security, structure, the sign-in process, and data handling our first priority.',
  },
  {
    title: 'Apple Device Experience',
    body: 'We tweak layouts and interactions of your app so that both iPad and iPhone bring the same experience to users. We account for the device context rather than simply stretching the same interface across screens.',
  },
]

const WHY_ADVMEN = [
  {
    title: 'Business-led Planning',
    body: 'We start with your goals, users, and requirements before going into technical solutions.',
  },
  {
    title: 'Well-defined Development Process',
    body: 'Discovery, design, testing, release — each phase has its own goal and outcome.',
  },
  {
    title: 'Technical Expertise',
    body: 'We choose technologies and integrations in accordance with what your application needs.',
  },
  {
    title: 'Flexible Product Architecture',
    body: 'Your application is developed with future capabilities, maintenance, and scalability in mind.',
  },
  {
    title: 'Continuous Support',
    body: 'Our collaboration does not end with the app launch; we will support your application as requirements, devices, and platform expectations change.',
  },
]

const FAQS = [
  {
    question: 'What is the cost of iOS app development?',
    answer: 'The iOS app development service costs depend on the features, the complexity, UI/UX, integrations, testing, and maintenance required. ADVMEN will provide an estimate based on the particular project needs.',
  },
  {
    question: 'How long does iPhone app development take?',
    answer: 'An iPhone (iOS) application can be developed in a period of 2 to 8+ months, contingent upon the application\'s complexity, features, and design. However, the duration of each project is different. A reasonable estimate can be provided after a preliminary evaluation of the project.',
  },
  {
    question: 'Do you build apps for both iPhone and iPad?',
    answer: 'Yes. Apps can be created to support experiences on both iPhone and iPad devices and the corresponding layout and interaction requirements.',
  },
  {
    question: 'Can you redesign or upgrade an existing iOS app?',
    answer: 'Yes. Existing iOS applications can be analyzed for UI/UX enhancements, updates, and additional capabilities.',
  },
  {
    question: 'Do you provide iOS app UI/UX design?',
    answer: 'Yes. Our iOS app design and development process can include user flows, wireframes, interface design, and prototyping before development begins.',
  },
  {
    question: 'Can you integrate APIs and payment systems?',
    answer: 'API and third-party integrations are provided as necessary for the project. Integration with the payment system depends on the selected payment service provider and the application model.',
  },
  {
    question: 'Do you support App Store submission?',
    answer: 'Yes. We support the App Store preparation and submission stage as part of the development process.',
  },
  {
    question: 'Is maintenance available after launch?',
    answer: 'Yes. iOS app maintenance and post-launch support will cover bug fixes, compatibility updates, improvements, and ongoing technical support based on your requirements.',
  },
]

const RELATED = [
  { label: 'App Development Overview', to: '/services/app-development' },
  { label: 'Android App Development', to: '/services/app-development/android' },
  { label: 'Cross-Platform Apps', to: '/services/app-development/cross-platform' },
  { label: 'Custom Mobile Apps', to: '/services/app-development/custom-mobile-app' },
  { label: 'Business & Enterprise Apps', to: '/services/app-development/business-enterprise' },
  { label: 'E-commerce Apps', to: '/services/app-development/ecommerce-app' },
  { label: 'Booking & Service Apps', to: '/services/app-development/booking-service-app' },
  { label: 'API & Backend Integration', to: '/services/app-development/api-backend-integration' },
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'E-commerce Development', to: '/services/website-development/ecommerce' },
  { label: 'UI/UX Design', to: '/services/ui-ux-design' },
  { label: 'Digital Marketing', to: '/digital-marketing-services-india' },
  { label: 'SEO Services', to: '/services/seo' },
  { label: 'AEO & GEO / AI Search', to: '/services/aeo-geo' },
  { label: 'Our Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
]

const sectionPad = { padding: 'clamp(3rem, 7vw, 5rem) 0' }
const h2Style = { fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)', lineHeight: 1.15, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }
const bodyStyle = { fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text-secondary)' }
const cardStyle = { background: 'var(--color-surface-1)', border: '2px solid var(--color-ink)', borderRadius: '1rem', boxShadow: '4px 4px 0 var(--color-ink)', padding: '1.5rem' }
const frameStyle = { background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }
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

const IOSAppDevelopment = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/App%20Image/App%20user.jpeg`}
      schemaData={{
        serviceName: 'iOS App Development Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'App Development', url: `${COMPANY.website}/services/app-development` },
          { name: 'iOS App Development', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: SOLUTIONS.map((name) => ({ name })),
        itemsName: 'Custom iOS application development solutions',
        image: `${COMPANY.website}/App%20Image/App%20user.jpeg`,
        howTo: {
          name: 'How ADVMEN takes an iOS app from idea to App Store',
          description: 'ADVMEN\'s six-step iOS app development process: discovery, design, architecture, integration & testing, App Store preparation, and maintenance.',
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* ── Hero ─────────────────────────────────────────────── */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="iOS app development services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services/app-development" style={{ color: 'var(--color-text-tertiary)' }}>App Development</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>iOS</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              iOS App Development Services for Scalable Digital Products
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              ADVMEN provides custom iOS app development services for businesses and product teams — secure, scalable, and built around your users.
            </p>
            <p style={bodyStyle}>
              A great app should feel right in your hands, respond smoothly, keep your data safe, and continue working as Apple devices and operating systems evolve. That's the standard. That's what we do at ADVMEN Technologies.
            </p>
            <p style={bodyStyle}>
              We work with businesses and product teams who want secure, scalable, and easy-to-use iOS apps. From product discovery, UI/UX design, development, testing, App Store launch, to support, we handle everything.
            </p>
            <p style={bodyStyle}>
              Willing to create something brand new? Taking your existing business mobile? Or maybe your current app needs a stronger technical foundation? We design and develop the best iOS app that revolves around your users' needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'iOS App Consultation' }} className="btn-primary btn-lg" data-cursor="hover">Schedule an iOS App Consultation</Link>
              <Link to="/contact" state={{ plan: 'iOS App Project Quote' }} className="btn-outline btn-lg" data-cursor="hover">Get a Quote For Your Project</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center gap-4 p-4" style={frameStyle}>
              <img
                src="/App%20Image/App%20user.jpeg"
                alt="iOS app development services by ADVMEN Technologies — custom iPhone app"
                width="240"
                height="520"
                decoding="async"
                className="w-1/2 h-auto object-contain rounded-xl"
              />
              <img
                src="/App%20Image/App%20partner.jpeg"
                alt="Custom iPhone and iPad app development by ADVMEN"
                width="240"
                height="520"
                decoding="async"
                className="w-1/2 h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Custom iOS Solutions ──────────────────────────────── */}
    <section style={bandStyle} aria-label="Custom iOS app solutions for your business">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-6">
          <h2 className="section-title" style={h2Style}>Custom iOS Apps Built Around Real Business Requirements</h2>
          <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
            Every type of application requires a unique strategy. A customer-oriented application has different priorities from an internal productivity platform; similarly, an e-commerce app has different technical requirements from a booking or subscription application.
          </p>
          <p style={bodyStyle}>
            ADVMEN Technologies understands the requirements and offers custom iOS app development services tailored to your business model. Not sure whether you also need an Android version? {link('We can discuss iOS alongside Android app development and cross-platform app development options.')}
          </p>
          <Link to="/services/app-development" className="btn-outline btn-sm mt-6 inline-flex" data-cursor="hover">See all app development services</Link>
        </div>
        <div className="lg:col-span-6">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Custom iOS application development solutions we offer
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOLUTIONS.map((s) => (
              <li key={s} className="flex items-start gap-3" style={{ ...cardStyle, padding: '0.8rem 1rem', boxShadow: '3px 3px 0 var(--color-ink)', fontWeight: 600, color: 'var(--color-ink)', fontSize: '0.92rem' }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--color-orange)', marginTop: '0.45rem' }} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* ── Services ─────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="What our iOS app development services include">
      <div className="container">
        <h2 className="section-title" style={h2Style}>What Our iOS App Development Services Include</h2>
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
    <section style={bandStyle} aria-label="Our iOS app development process">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Our iOS App Development Process</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          Every phase has a clear goal. We move from discovery to launch without skipping the steps that matter.
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="iOS app development process from planning to launch">
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

    {/* ── Built for the Apple Experience ───────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Built for the Apple experience">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Built for the Apple Experience</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          Apple users want their apps to be responsive and friendly. Being a top iOS app development company, we verify things such as interface behavior, navigation through your application, functionality of all the elements across all devices, and app accessibility.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUALITY_POINTS.map((q, i) => (
            <Reveal key={q.title} delay={(i % 2) * 0.07} style={cardStyle} className="flex flex-col">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem' }}>{q.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{q.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Why ADVMEN ───────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Why choose ADVMEN for iOS development">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Why Choose ADVMEN for iOS Development?</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.75rem' }}>
          Choosing an iOS app development company comes down to finding a team that understands the technology and the underlying business challenge. ADVMEN will ensure that:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WHY_ADVMEN.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.07} style={cardStyle} className="flex flex-col">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{w.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{w.body}</p>
            </Reveal>
          ))}
        </div>
        <p style={{ ...bodyStyle, marginTop: '1.75rem' }}>
          Beyond the app itself, our team also covers <Link to="/services/website-development" style={LINK_STYLE}>website development services</Link>, <Link to="/services/website-development/ecommerce" style={LINK_STYLE}>e-commerce development</Link>, <Link to="/services/seo" style={LINK_STYLE}>SEO services</Link>, and <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing services</Link>, so your app launches with the discoverability it needs.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/work" style={LINK_STYLE}>Explore our work →</Link>
        </p>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Start your iOS app project">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Ready to Put Your iOS Idea in Motion? Let's Talk.</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>Whether you have a new idea for a product, replacement of an old application, or improvement of an already existing iOS product, the best way to start out is by discussing your app.</p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Tell us about your application, your users, and the challenges.</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'iOS App Consultation' }} className="btn-primary btn-lg" data-cursor="hover">Schedule an iOS Application Consultation</Link>
          <Link to="/contact" state={{ plan: 'iOS App Project Quote' }} className="btn-outline btn-lg" data-cursor="hover">Get a Quote For Your Project</Link>
        </div>
      </div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────────── */}
    <section style={bandStyle} aria-label="Frequently asked questions about iOS app development">
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

    {/* ── Related pages — internal linking ─────────────────── */}
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

export default IOSAppDevelopment
