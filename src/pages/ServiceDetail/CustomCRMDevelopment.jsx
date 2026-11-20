import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import { autoLink, LINK_STYLE } from '@utils/autoLink'
import { COMPANY } from '@utils/constants'

const PAGE_PATH = '/services/custom-crm-development'
const CANONICAL = `${COMPANY.website}${PAGE_PATH}`
const TITLE = 'Custom CRM Development Services | ADVMEN Technologies'
const DESCRIPTION = 'Streamline leads, follow-ups, and reporting with custom CRM development services built around your workflow. Discuss your requirements today.'
const KEYWORDS = 'custom CRM development services, CRM software development, custom CRM solutions, CRM development company, sales CRM development, customer relationship management software, CRM workflow automation, CRM dashboard development, CRM integration services'

const PAGE_LINKS = [
  { phrase: 'website development team', to: '/services/website-development' },
  { phrase: 'website development', to: '/services/website-development' },
  { phrase: 'e-commerce team', to: '/services/website-development/ecommerce' },
  { phrase: 'e-commerce', to: '/services/website-development/ecommerce' },
  { phrase: 'portfolio and case studies', to: '/work' },
  { phrase: 'UI/UX design', to: '/services/ui-ux-design' },
  { phrase: 'SEO services', to: '/services/seo' },
  { phrase: 'AEO and GEO', to: '/services/aeo-geo' },
  { phrase: 'digital marketing', to: '/digital-marketing-services-india' },
  { phrase: 'contact page', to: '/contact' },
]

const SERVICES = [
  {
    title: 'Requirements Discovery and User Roles',
    body: 'We begin by mapping how your team works today: sources of enquiries, handoffs, approvals, exceptions, spreadsheets, and the points where things slip. We define user roles, such as owner, manager, sales executive, and support staff, along with what each can see and do. The output is a clear requirements document that keeps the project on track.',
  },
  {
    title: 'Customer and Contact Records',
    body: 'A reliable CRM begins with clean records. We design a structured data model for customers, companies, contacts, and their relationships, with unique identifiers, validation rules, duplicate detection, tags, notes, documents, and a full interaction history, so anyone can see the complete story in one place.',
  },
  {
    title: 'Lead and Deal Pipelines',
    body: 'Our sales CRM development includes lead capture, assignment, qualification, and deal stages that mirror how you actually sell. Each stage includes entry rules, owners, expected values, and next actions, so nothing gets stuck unnoticed and forecasting is based on real data.',
  },
  {
    title: 'Tasks, Reminders, and Automation',
    body: 'Our CRM workflow automation turns repeated steps into rules: assigning new leads, creating follow-up tasks, sending reminders, escalating overdue items, and routing approvals. Automation depends on your agreed scope and the systems involved, so we define each rule with you rather than assuming standard behavior.',
  },
  {
    title: 'Dashboards and Reporting',
    body: 'Our CRM dashboard development gives each role a view built around its questions: pipeline by stage, pending follow-ups, team workload, conversion between stages, and activity over time. Reports can be filtered, exported, and designed to replace manual spreadsheet roundups.',
  },
  {
    title: 'Permissions and Access Control',
    body: 'We use role-based access control so people only see what they should see. This can range from field-level restrictions, approval rights, and activity logs of who changed what, to secure authentication. Sensitive customer data deserves deliberate protection from the first design decision.',
  },
  {
    title: 'CRM Integration Services',
    body: 'Our CRM integration services connect your CRM with the tools around it, such as website forms, email, accounting or billing tools, e-commerce stores, and messaging platforms, through APIs and webhooks where available. Integrations are project-dependent, not standard features, so we assess each connection for feasibility, effort, and any third-party costs during scoping.',
  },
  {
    title: 'Data Migration',
    body: 'If your data lives in spreadsheets or another system, we plan the move carefully: field mapping, cleaning, duplicate merging, test imports, and verification against the source before go-live. Good migration protects the history your team depends on.',
  },
  {
    title: 'Testing, Onboarding, and Support',
    body: 'We test workflows, permissions, and edge cases with your team using realistic scenarios and a staging environment where the project allows. Onboarding and training get people on board with the system, and ongoing support can be arranged to meet your needs.',
  },
]

const PROCESS = [
  { title: 'Discover', body: 'We study your process, tools, data, and pain points, and identify the bottleneck worth solving first.' },
  { title: 'Plan and Scope', body: 'We agree on the modules, roles, integrations, migration needs, milestones, and responsibilities, so expectations are clear before building starts.' },
  { title: 'Design', body: 'We map screens, data structures, and flows, and you review them while changes are still cheap.' },
  { title: 'Build', body: 'We develop the system in stages, sharing working versions so your team can react early.' },
  { title: 'Test and Migrate', body: 'We validate workflows, permissions, and integrations, then migrate and verify your data.' },
  { title: 'Launch, Train, and Support', body: 'We help your team go live, provide onboarding, and agree what ongoing support looks like.' },
]

const AUDIENCES = [
  'Service and repair companies processing jobs, customer updates, and technicians',
  'Manufacturers and distributors tracking enquiries, quotations, and orders',
  'Real estate, education, and healthcare teams managing enquiries and appointments',
  'B2B sales teams that handle multi-stage deals and approvals',
  'Growing companies that have outgrown spreadsheets and shared mailboxes',
]

const BENEFITS = [
  { label: 'One source of truth', desc: 'Customer history, tasks, and deals in one place' },
  { label: 'Fewer missed follow-ups', desc: 'Reminders and ownership built into the workflow' },
  { label: 'Clearer visibility', desc: 'Dashboards and reports aligned with your decisions' },
  { label: 'Controlled access', desc: 'The right people see the right data' },
  { label: 'A system that evolves', desc: 'Modules can be added as your business matures' },
]

const WHY_ADVMEN = [
  { title: 'Workflow Before Software', body: 'We start by understanding your process, roles, and goals, then decide what the system should do.' },
  { title: 'Every Feature Has a Purpose', body: 'We build the modules your team will use, and we avoid padding the system with features that add clutter.' },
  { title: 'Built to Work Everywhere', body: 'We design interfaces to be clear and responsive, so teams can use the CRM on desktops, tablets, and phones.' },
  { title: 'One Team, Connected Thinking', body: 'As a CRM development company with website development, UI/UX design, SEO services, and digital marketing teams under one roof, we plan your CRM alongside the wider digital ecosystem it connects to.' },
  { title: 'Practical, Ready-to-Use Deliverables', body: 'Our custom CRM development services produce clear scope documents, working software, tested workflows, and onboarding support your team can rely on.' },
  { title: 'Built for Long-Term Growth', body: 'We design flexible data structures and modular features, so adding a pipeline, report, or integration later does not mean starting over.' },
]

const FAQS = [
  { question: 'What is custom CRM development?', answer: 'It is the design and build of a CRM system specifically for your business, covering records, pipelines, tasks, roles, and reports that match how you work. Our custom CRM development services use CRM software development to build exactly the modules you need, rather than adapting your process to a fixed product.' },
  { question: 'When should a business consider a custom CRM?', answer: 'Consider it when your process does not fit packaged tools, when your team relies on workarounds and spreadsheets, or when you need specific roles, approvals, or integrations. Custom CRM solutions are most valuable when workflow differences are what make your business competitive.' },
  { question: 'Can a CRM be tailored to our sales process?', answer: 'Yes. Our sales CRM development shapes pipeline stages, rules, owners, and required fields around how you sell, from first enquiry to closed deal and follow-up.' },
  { question: 'Can you integrate a CRM with existing tools?', answer: 'Often, yes, depending on the tool and what its API or export options allow. Our CRM integration services start with a feasibility check, and we confirm effort and any third-party costs before committing. Integrations are scoped per project and are not automatic.' },
  { question: 'Can existing customer data be migrated?', answer: 'Yes, from spreadsheets and many other systems, subject to data quality and access. We map fields, clean and de-duplicate records, run test imports, and verify the results before go-live.' },
  { question: 'How do you handle user roles and data security?', answer: 'We define roles and permissions during discovery, then build role-based access, secure authentication, and activity logging as scoped. Our customer relationship management software is designed so people see only what their role needs, and we discuss hosting and data-control requirements with you early.' },
  { question: 'How long does custom CRM development take?', answer: 'It depends on the number of modules, roles, integrations, data volume, and how quickly feedback arrives. Any CRM development company that quotes without understanding your workflow is guessing. We give a realistic timeline after discovery, and even CRM dashboard development or a single pipeline can be phased to deliver value sooner.' },
  { question: 'Do you provide CRM support after launch?', answer: 'Yes, support can be agreed as part of your project. ADVMEN Technologies can help with fixes, updates, and changes as your needs evolve, including adjusting CRM workflow automation when your process changes. We confirm the support terms before the project begins.' },
]

const RELATED = [
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'E-Commerce Development', to: '/services/website-development/ecommerce' },
  { label: 'UI/UX Design', to: '/services/ui-ux-design' },
  { label: 'Branding & Logo Design', to: '/services/branding' },
  { label: 'SEO Services', to: '/services/seo' },
  { label: 'AEO & GEO / AI Search', to: '/services/aeo-geo' },
  { label: 'Digital Marketing', to: '/digital-marketing-services-india' },
  { label: 'Social Media Management', to: '/services/social-media-management' },
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

const CustomCRMDevelopment = () => (
  <PageTransition>
    <SEOHead
      title={TITLE}
      description={DESCRIPTION}
      keywords={KEYWORDS}
      schemaType="service"
      canonical={CANONICAL}
      ogImage={`${COMPANY.website}/Image/advmen_service1.webp`}
      schemaData={{
        serviceName: 'Custom CRM Development Services',
        areaServed: ['India', 'United States', 'United Arab Emirates', 'Europe'],
        breadcrumbs: [
          { name: 'Home', url: COMPANY.website },
          { name: 'Services', url: `${COMPANY.website}/services` },
          { name: 'Custom CRM Development', url: CANONICAL },
        ],
        faqs: FAQS,
        features: SERVICES.map((s) => s.title),
        items: AUDIENCES.map((name) => ({ name })),
        itemsName: 'Who our custom CRM development services are built for',
        image: `${COMPANY.website}/Image/advmen_service1.webp`,
        howTo: {
          name: 'How ADVMEN delivers a custom CRM from first conversation to live system',
          description: 'ADVMEN six-step CRM development process: discover, plan and scope, design, build, test and migrate, launch and support.',
          steps: PROCESS.map((s) => ({ name: s.title, text: s.body })),
        },
      }}
    />

    {/* Hero */}
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '4rem', background: 'var(--color-black)' }}
      aria-label="Custom CRM development services"
    >
      <div className="container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link to="/" style={{ color: 'var(--color-text-tertiary)' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <Link to="/services" style={{ color: 'var(--color-text-tertiary)' }}>Services</Link>
          <span style={{ margin: '0 0.5rem', color: 'var(--color-text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--color-orange)' }}>Custom CRM Development</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="section-title" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.8rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}>
              Custom CRM Development Services for Your Workflow
            </h1>
            <p data-speakable style={{ ...bodyStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>
              Leads live in a spreadsheet. Follow-ups depend on someone's memory.
            </p>
            <p style={bodyStyle}>
              The pipeline is a mix of chat threads and sticky notes, and every monthly report takes a day to assemble by hand. Meanwhile, generic customer relationship management software asks your team to change how it works to suit the tool. Adoption drops, data goes stale, and the CRM becomes an expensive contact list.
            </p>
            <p style={bodyStyle}>
              ADVMEN Technologies approaches it the other way around. Our custom CRM development services start with your real workflow: who handles an enquiry, what happens next, who approves, what needs reporting, and builds a system that fits it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/contact" state={{ plan: 'CRM Workflow Discussion' }} className="btn-primary btn-lg" data-cursor="hover">Discuss Your Workflow</Link>
              <Link to="/work" className="btn-outline btn-lg" data-cursor="hover">Explore Our Work</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-center p-6" style={{ background: 'var(--color-surface-2)', border: '2px solid var(--color-ink)', borderRadius: '1.25rem', boxShadow: '6px 6px 0 var(--color-ink)' }}>
              <img
                src="/Image/advmen_service1.webp"
                alt="Custom CRM dashboard showing pipeline stages, lead records, and workflow automation"
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

    {/* Custom-Built or Configured */}
    <section style={bandStyle} aria-label="Custom-built or configured CRM">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>Custom-Built or Configured? Choosing the Right Route</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            There are two common ways to get a CRM. You can configure an existing platform, adjusting fields, stages, and settings within its limits. Or you can build to your own specification. Configuration is often quicker when your process is fairly standard. A custom build is suitable when your workflow, roles, approvals, or data do not fit a packaged tool without constant workarounds.
          </p>
          <p style={bodyStyle}>
            This is where CRM software development earns its place: you decide the data model, the screens, the rules, and the reports, and you are not bound by another vendor's structure. Our custom CRM solutions are scoped after discovery, and we tell you honestly if a simpler route would serve you better. We also confirm exactly what we deliver, and what it depends on, before work begins.
          </p>
        </div>
      </div>
    </section>

    {/* Services */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Our custom CRM development services">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Our Custom CRM Development Services</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Every CRM is different, so the modules below are chosen to match your scope.</p>
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

    {/* Process */}
    <section style={bandStyle} aria-label="From first conversation to live CRM">
      <div className="container">
        <h2 className="section-title" style={h2Style}>From First Conversation to Live CRM</h2>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>Every project follows a clear, collaborative workflow.</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="CRM development process steps">
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
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="CRM and AI search visibility">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h2 className="section-title" style={h2Style}>CRM That AI Tools and Search Engines Can Understand</h2>
        <div className="flex flex-col gap-5">
          <p style={bodyStyle}>
            When a business owner asks an AI assistant "best custom CRM development company in India" or "who builds CRM for real estate teams," those tools look for businesses with clear, structured, and consistent information. A well-built CRM page and a well-built CRM share the same principle: structure matters.
          </p>
          <p style={bodyStyle}>
            We build every service page with structured data, clear headings, FAQ markup, and descriptive content so your CRM services are easy for both people and AI tools to find and understand. This supports your broader {link('SEO services')} and {link('AEO and GEO')} strategy.
          </p>
          <p style={bodyStyle}>
            No agency can guarantee how AI platforms surface results. What we can do is make sure your business is presented clearly, consistently, and with the right signals across every channel.
          </p>
          <p>
            <Link to="/services/aeo-geo" style={LINK_STYLE}>Explore our AEO &amp; GEO optimization services →</Link>
          </p>
        </div>
      </div>
    </section>

    {/* Benefits + Who It Is For */}
    <section style={bandStyle} aria-label="Benefits of custom CRM development and who it is for">
      <div className="container">
        <h2 className="section-title" style={h2Style}>Benefits and Who It Is For</h2>
        <p style={{ ...bodyStyle, marginBottom: '1.5rem' }}>A CRM built around your process removes friction your team currently works around. You can expect:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {BENEFITS.map((b) => (
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
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Why brands choose ADVMEN Technologies for CRM development">
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
          See how we work in our <Link to="/work" style={LINK_STYLE}>portfolio and case studies</Link>.
        </p>
      </div>
    </section>

    {/* CTA */}
    <section style={bandStyle} aria-label="Request a CRM development consultation">
      <div className="container text-center" style={{ maxWidth: '820px' }}>
        <h2 className="section-title" style={h2Style}>Ready to Fit Your CRM to Your Business?</h2>
        <p style={{ ...bodyStyle, marginBottom: '0.75rem' }}>Tell ADVMEN Technologies how your team works today, where it gets stuck, and which tools you already use.</p>
        <p style={{ ...bodyStyle, marginBottom: '2rem' }}>We will discuss your workflows, integrations, and requirements, recommend the right scope, and send a clear quote. Whether you are replacing spreadsheets or outgrowing a packaged tool, our custom CRM development services can give you a strong starting point.</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/contact" state={{ plan: 'CRM Consultation' }} className="btn-primary btn-lg" data-cursor="hover">Request a Consultation</Link>
          <Link to="/contact" state={{ plan: 'CRM Workflow Discussion' }} className="btn-outline btn-lg" data-cursor="hover">Discuss Your Workflow</Link>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section style={{ ...sectionPad, background: 'var(--color-black)' }} aria-label="Frequently asked questions about custom CRM development">
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

export default CustomCRMDevelopment
