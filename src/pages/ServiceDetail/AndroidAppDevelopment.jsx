/**
 * pages/ServiceDetail/AndroidAppDevelopment.jsx
 * ─────────────────────────────────────────────────────────────
 * Dedicated landing page for /services/app-development/android
 * (alias: /services/android-app-development, canonical = the former).
 * Content per the "Android App Development" writing brief.
 * All internal links are plain follow links.
 * ─────────────────────────────────────────────────────────────
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/app-development/android'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`

const TITLE = 'Android App Development Services | Custom Android Apps | ADVMEN'
const DESCRIPTION =
  'Build reliable, user-focused Android applications with ADVMEN. Explore custom Android app development, UI/UX, integrations, testing, and ongoing support.'
const KEYWORDS =
  'Android app development services, Android app development, custom Android app development, Android application development, Android mobile app development, Android app developers, Android app development company, custom Android application development, business app development, Android UI/UX design, Android app design and development, native Android app development, Android app testing, Android app maintenance and support, enterprise Android app development, Android app development solutions, affordable Android app development services, Android application development company, scalable Android app development, Android app integration, Android app modernization'

// Phrases in this page's copy that point to other pages on the site
const PAGE_LINKS = [
  { phrase: 'website development services', to: '/services/website-development' },
  { phrase: 'e-commerce development', to: '/services/website-development/ecommerce' },
  { phrase: 'UI/UX design', to: '/services/professional-website-design' },
  { phrase: 'digital marketing services', to: '/digital-marketing-services-india' },
  { phrase: 'SEO services', to: '/services/seo' },
  { phrase: 'AI search optimization', to: '/services/aeo-geo' },
  { phrase: 'digital projects', to: '/work' },
  { phrase: 'Talk to ADVMEN', to: '/contact' },
  { phrase: 'iOS', to: '/services/app-development/ios' },
]

const SOLUTIONS = [
  'Customer Facing Android Applications',
  'Internal Business Applications',
  'Booking and Appointment Apps',
  'E-commerce and Order Processing Applications',
  'Applications for Employees and Partners',
  'Field Service and Operational Applications',
  'Business Dashboards and Data-driven Applications',
  'Digital Product and Customer Facing Platforms',
  'Process Driven Applications',
  'Enterprise Android Applications',
]

const SERVICES = [
  {
    title: 'Custom Android App Development',
    body: 'Every business has its own processes. Instead of forcing those processes into a generic product, custom Android app development allows the application to be planned around your requirements. We work around your users, features, workflows, and business objectives to define an application that fits the way your organization operates.',
  },
  {
    title: 'Android Mobile App Development',
    body: 'Your users can reach your business from a variety of devices, in a range of environments, and in many situations. Android mobile app development provides a functional, accessible, and user-friendly experience that is well-suited to your target audience. We design and develop your app with the user’s perspective and experiences in mind.',
  },
  {
    title: 'Native Android App Development',
    body: 'If your product requires a particular Android experience, native Android app development provides a targeted approach to platform capabilities, performance, device functionality, and user interaction. The application requirements guide the technology and architecture, not the other way around.',
  },
  {
    title: 'Android UI/UX Design',
    body: 'Our approach to Android UI/UX design includes logical navigation, clear hierarchy of information, intuitive interactions, and a consistent visual experience. Users should spend their time using the application rather than figuring out how to use it. The purpose is to make the application easier to understand and easier to work with.',
  },
  {
    title: 'API & Third-Party Integrations',
    body: 'Your Android application might need to be integrated with APIs, databases, payments, authentication services, software applications, or third-party systems. Our Android app integration takes such dependencies into account as part of the application scope, so the app works within your digital ecosystem.',
  },
  {
    title: 'Android App Testing',
    body: 'An application needs to be tested before any user relies on it. Android app testing covers functionality, user flows, device compatibility, interface behavior, integrations, and performance. The depth depends on your application’s complexity, target devices, audience, integrations, and business requirements.',
  },
  {
    title: 'Android App Modernization',
    body: 'An outdated Android application does not always need to be rewritten. There are different options for Android app modernization depending on your business objectives. We improve the existing product’s interface, functionality, technical foundation, integrations, or overall user experience.',
  },
  {
    title: 'Android App Maintenance and Support',
    body: 'New operating system versions appear. New business needs appear. Your users ask for new functionality. Android app maintenance and support can be organized around your application’s ongoing requirements, including updates, bug fixes, improvements, performance-related work, and future development.',
  },
]

const PROCESS = [
  { title: 'Understand', body: 'First, we dig into the business goal. Who is this application for? What exactly should it do for them? What problem does it actually solve? And when we launch, what needs to be ready on day one?' },
  { title: 'Plan', body: 'We translate the needs into actual features, user flows, screens, and required integrations. In this step, we determine what is really necessary now and in the near future.' },
  { title: 'Design', body: 'We map the entire app flow with our UI/UX design services. Navigation, screens, and user flows are all designed together.' },
  { title: 'Develop', body: 'We stay within the agreed feature set, integrations, and functionality. We track progress throughout the process, rather than waiting until the very end to see the product.' },
  { title: 'Test', body: 'The application is checked for functionality, usability, and technical issues before going live, based on where and how the Android app is going to be used.' },
  { title: 'Launch & Support', body: 'Once it is ready, the application is launched and deployed, and improvements continue after release. Our team keeps working on improving the application.' },
]

const INTEGRATIONS = ['REST APIs', 'Databases', 'Payment gateways', 'Authentication', 'Business software', 'Third-party services']

const WHY_ADVMEN = [
  'ADVMEN is an Android application development company that plans around your workflow first and picks technology second, so the product fits the business rather than the other way around.',
  'Our Android app developers handle the full chain, from Android app design and development to integrations, testing, Google Play release and maintenance, so there is one accountable team.',
  'Whether you need business app development for a growing team or enterprise Android app development with complex workflows, we shape scalable Android app development around features that matter now and leave room for what comes next.',
  'If you are comparing affordable Android app development services, we scope the build into clear phases so that the first release stays focused and later features can follow as the product proves itself.',
]

const FAQS = [
  { question: 'How much does Android app development cost?', answer: 'There are no set costs for custom app development services. The features you need, the number of platforms you want to cover, the complexity of the design, any integrations, back-end setup, and the degree of post-launch support will affect the cost. Share your requirements and we will recommend a scope and a quote.' },
  { question: 'How long does it take to build an Android app?', answer: 'A simple, focused app can come together quickly, while a more complex platform takes longer. The timeline depends on complexity, features, integrations, design needs, and testing scope. Focused apps and larger business platforms have very different timelines.' },
  { question: 'Can you develop a custom Android app for my business?', answer: 'Definitely. Custom Android app development is ideal for businesses that need something tailored to their specific workflows, features, and users, so you are not stuck with a cookie-cutter product.' },
  { question: 'Do you provide Android app UI/UX design?', answer: 'Yes. We design an easy-to-use Android interface with clear navigation and layout, planned around how your users will actually move through the app.' },
  { question: 'Can you integrate payment gateways and third-party APIs?', answer: 'Yes. Payment gateways, APIs, authentication services and other third-party systems can be integrated according to your application’s needs.' },
  { question: 'Do you help publish apps on Google Play?', answer: 'Yes. ADVMEN assists in publishing apps on Google Play, subject to the app and account requirements.' },
  { question: 'Will my app support different Android devices?', answer: 'Yes. Our team considers device compatibility during development and testing so the app works across the relevant Android devices and screen sizes.' },
  { question: 'Do you provide ongoing app maintenance?', answer: 'Yes. Support and maintenance can include updates, bug fixes, enhancements, and continuous development. The exact support services are agreed as part of the project scope.' },
]

const RELATED = [
  { label: 'App Development Overview', to: '/services/app-development' },
  { label: 'iOS App Development', to: '/services/app-development/ios' },
  { label: 'Cross-Platform Apps', to: '/services/app-development/cross-platform' },
  { label: 'Custom Mobile Apps', to: '/services/app-development/custom-mobile-app' },
  { label: 'Business & Enterprise Apps', to: '/services/app-development/business-enterprise' },
  { label: 'E-commerce Apps', to: '/services/app-development/ecommerce-app' },
  { label: 'Booking & Service Apps', to: '/services/app-development/booking-service-app' },
  { label: 'API & Backend Integration', to: '/services/app-development/api-backend-integration' },
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'E-commerce Development', to: '/services/website-development/ecommerce' },
  { label: 'UI/UX Design', to: '/services/professional-website-design' },
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

const AndroidAppDevelopment = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/Image/case-norozz-apps.webp`}
      schemaData={{
        serviceName: 'Android App Development Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'App Development', url: `${COMPANY.website}/services/app-development` },
          { name: 'Android App Development', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: SOLUTIONS.map((name) => ({ name })),
        itemsName: 'Custom Android application development solutions',
        image: `${COMPANY.website}/Image/case-norozz-apps.webp`,
        howTo: {
          name: 'How ADVMEN takes an Android app from idea to working product',
          description: 'ADVMEN’s six-step Android app development process: understand, plan, design, develop, test, launch and support.',
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* Hero */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="Android app development services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services/app-development" style={{ color: 'var(--color-text-tertiary)' }}>App Development</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>Android</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              Android App Development for Modern Businesses
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              ADVMEN provides Android app development services for businesses: custom Android apps, UI/UX design, integrations, testing and ongoing support, planned around your workflow.
            </p>
            <p style={bodyStyle}>
              An Android app should do more than sit as an icon on a phone or look slick in a browser. It should help customers buy, book, manage, communicate, track, sell, or get things done more smoothly. That is what really matters.
            </p>
            <p style={bodyStyle}>
              ADVMEN builds apps with real-life users in mind and tailors everything to your workflow. Whether you need custom Android app development services, mobile app development, web applications, UI/UX design, integrations, or post-launch support, we build practical solutions that do something useful for your business.
            </p>
            <p style={bodyStyle}>
              Got an idea? Need to ditch an outdated system? Want to expand on an existing digital product? We will take your requirements and turn them into a structured, usable application.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'Android App Idea' }} className="btn-primary btn-lg" data-cursor="hover">Share Your App Idea</Link>
              <Link to="/contact" state={{ plan: 'Android App Project Quote' }} className="btn-outline btn-lg" data-cursor="hover">Request a Project Quote</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center gap-4 p-4" style={frameStyle}>
              <img
                src="/App%20Image/App%20user.jpeg"
                alt="Custom Android app development services: Norozz customer app built by ADVMEN"
                width="240"
                height="520"
                decoding="async"
                className="w-1/2 h-auto object-contain rounded-xl"
              />
              <img
                src="/App%20Image/App%20partner.jpeg"
                alt="Custom Android app development services: Norozz partner app built by ADVMEN"
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

    {/* Practical solutions */}
    <section style={bandStyle} aria-label="Practical Android app solutions for your business">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-6">
          <h2 className="section-title" style={h2Style}>Practical App Solutions Designed for Your Business</h2>
          <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
            A good Android application development project starts well before any real development.
          </p>
          <p style={{ ...bodyStyle, marginBottom: '1rem' }}>
            First, we understand your business goals, target audience, processes, data needs, existing technology, and how the application is supposed to fit into your business. This lets us define the right functionality, workflows, integrations, and development requirements for the build.
          </p>
          <p style={bodyStyle}>
            The scope of work depends on your unique business model, among other factors. Not sure whether you also need an iOS version? {link('We can discuss Android alongside iOS and cross-platform options.')}
          </p>
          <Link to="/services/app-development" className="btn-outline btn-sm mt-6 inline-flex" data-cursor="hover">See all app development services</Link>
        </div>
        <div className="lg:col-span-6">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Custom Android application development solutions we offer
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

    {/* Services */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Our Android app development services">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Our Android App Development Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.07} style={cardStyle} className="flex flex-col">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{link(s.body)}</p>
            </Reveal>
          ))}
        </div>

        <figure className="mt-12 flex flex-col items-center" style={{ ...frameStyle, padding: '1rem' }}>
          <img
            src="/Image/case-norozz-apps.webp"
            alt="App UI UX design and development process: Android screens from the Norozz customer and partner apps"
            width="1600"
            height="1000"
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-xl"
            style={{ maxWidth: '860px' }}
          />
          <figcaption style={{ fontSize: '0.85rem', color: 'var(--color-ink)', marginTop: '0.75rem', textAlign: 'center' }}>
            Real ADVMEN project: the Norozz customer and partner Android apps.{' '}
            <Link to="/work/norozz-service-discovery-booking" style={LINK_STYLE}>Read the Norozz case study →</Link>
          </figcaption>
        </figure>
      </div>
    </section>

    {/* Integrations */}
    <section style={bandStyle} aria-label="Android app integration with APIs and business systems">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6">
          <h2 className="section-title" style={h2Style}>Connected to the Systems Your Business Already Runs On</h2>
          <p style={bodyStyle}>
            An Android app rarely works alone. We plan Android app integration early, so payments, logins, data and business software are part of the build from the start rather than a late add-on.
          </p>
        </div>
        <div className="lg:col-span-6">
          <svg viewBox="0 0 520 320" role="img" aria-label="Application integration with APIs and business systems" className="w-full h-auto" style={{ maxWidth: '520px', margin: '0 auto', display: 'block' }}>
            <title>Android application connected to APIs, databases, payments, authentication, business software and third-party services</title>
            {INTEGRATIONS.map((label, i) => {
              const angle = (-90 + i * 60) * (Math.PI / 180)
              const x = 260 + 185 * Math.cos(angle)
              const y = 160 + 120 * Math.sin(angle)
              return (
                <g key={label}>
                  <line x1="260" y1="160" x2={x} y2={y} stroke="#e85d04" strokeWidth="2" strokeDasharray="5 4" />
                  <rect x={x - 62} y={y - 20} width="124" height="40" rx="12" fill="#fff" stroke="#17171c" strokeWidth="2" />
                  <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#17171c">{label}</text>
                </g>
              )
            })}
            <rect x="205" y="130" width="110" height="60" rx="16" fill="#e85d04" stroke="#17171c" strokeWidth="2" />
            <text x="260" y="166" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">Android App</text>
          </svg>
        </div>
      </div>
    </section>

    {/* Process */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="From app idea to working product">
      <div className="container">
        <h2 className="section-title" style={h2Style}>From App Idea to Working Product</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>
          Building a great app is not just about jumping into code; it is about making smart decisions, one after the other.
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="Android app development process from planning to launch">
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} id={`step-${i + 1}`} delay={(i % 3) * 0.06} style={cardStyle} className="flex flex-col">
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-orange)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                {String(i + 1).padStart(2, '0')} — {p.title}
              </span>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>{link(p.body)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    {/* Why ADVMEN */}
    <section style={bandStyle} aria-label="Why businesses choose ADVMEN for Android app development">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Why Businesses Choose ADVMEN for Android Apps</h2>
        <div className="flex flex-col gap-5">
          {WHY_ADVMEN.map((t) => (
            <p key={t} style={bodyStyle}>{t}</p>
          ))}
          <p style={bodyStyle}>
            Beyond the app itself, our team also covers <Link to="/services/website-development" style={LINK_STYLE}>website development services</Link>, <Link to="/services/website-development/ecommerce" style={LINK_STYLE}>e-commerce development</Link>, <Link to="/services/seo" style={LINK_STYLE}>SEO services</Link> and <Link to="/digital-marketing-services-india" style={LINK_STYLE}>digital marketing services</Link>, so your app launches with the discoverability it needs.
          </p>
          <p>
            <Link to="/work" style={LINK_STYLE}>Explore our digital projects →</Link>
          </p>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Start your Android app project">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Need an App? Start With the Problem.</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>You do not need a 50-page specification before talking to an app development team.</p>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>Tell us what you are trying to build, who will use it, and what type of Android app development services you need.</p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>ADVMEN will shape the requirements into a practical development scope covering the product experience, functionality, integrations, development, and next steps.</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'Android App Project' }} className="btn-primary btn-lg" data-cursor="hover">Start Your App Project</Link>
          <Link to="/contact" className="btn-outline btn-lg" data-cursor="hover">Talk to ADVMEN</Link>
        </div>
        <img
          src="/Image/case-norozz-apps.webp"
          alt="ADVMEN custom application development: clean Android app interfaces"
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
          className="w-full h-auto mt-10 rounded-2xl"
          style={{ border: '2px solid var(--color-ink)', boxShadow: '6px 6px 0 var(--color-ink)' }}
        />
      </div>
    </section>

    {/* FAQ */}
    <section style={bandStyle} aria-label="Frequently asked questions">
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

export default AndroidAppDevelopment
