import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = [
  {
    title: 'Digital Marketing Services',
    href: '/services/digital-marketing',
    body: 'Our digital marketing strategies are tailored to your goals and your target market. We help you plan content, manage paid ads, run your social channels, generate leads, and get better results over time. We align with your business goals, target audience, and market. Whether you’re looking to reach customers in India or build visibility in international markets, we connect you with the right audience on the right digital platforms.',
  },
  {
    title: 'Website Design & Development',
    href: '/services/web-development',
    body: 'Our website design services focus on modern UI, responsive development, clear information architecture, performance, and SEO friendly foundations. We design and develop websites for corporate sites, service platforms, and custom web applications based on the way your customers actually use them.',
  },
  {
    title: 'SEO Services',
    href: '/services/seo',
    body: 'Our SEO services make your website more search-engine-friendly and help the right customers find your business. This covers keyword research, technical SEO, on-page optimization, content structure, internal linking, local SEO, and performance tracking.',
  },
  {
    title: 'GEO Optimization Services',
    href: '/services/aeo-geo',
    body: 'Our GEO optimization services help businesses organize their digital presence to fit generative search experiences, such as AI-powered discovery. We create important, well-structured, context-rich content that allows artificial intelligence systems to understand your business and your niche.',
  },
  {
    title: 'Mobile App Development Services',
    href: '/services/app-development',
    body: 'We build all kinds of mobile apps, from business tools to customer-facing apps and custom digital products that actually fit everyday needs. We’ll work with you from the first spark of an idea, through design and development, all the way to launch.',
  },
  {
    title: 'E-commerce Website Development',
    href: '/services/e-commerce-solutions',
    body: 'We design e-commerce websites with a focus on product discovery, intuitive navigation, mobile responsiveness, checkout journeys, payment integration, and scalable store architecture. We want your customers to explore, feel confident about their choices, and complete their purchases.',
  },
  {
    title: 'Branding & Logo Design Services',
    href: '/services/branding',
    body: 'Our branding and logo design services help businesses build a visual identity that truly reflects who they are and how they want people to see them. Whether it’s a logo, color palette, or full brand direction, we create looks that fit everywhere: your website, socials, packaging, marketing materials.',
  },
  {
    title: 'Social Media Management Services',
    href: '/services/social-media-marketing',
    body: 'Our social media management services combine content, creative development, platform management, and communication with your customers. We create content that informs, engages, and keeps your brand relevant on the platforms that matter to your audience.',
  },
  {
    title: 'UI/UX & Graphic Design Services',
    href: '/services/branding',
    body: 'Our UI/UX design services focus on creating digital experiences that are characterized by clear layouts, easy navigation, and smooth flow. Our graphic design services will help you communicate your brand on websites, apps, social media, and marketing materials.',
  },
  {
    title: 'Custom CRM Development',
    href: '/contact',
    body: 'We design our custom CRM development solutions to fit your workflows. We can build systems to help you manage leads, store customer information, track follow-ups, increase sales, or manage reports and day-to-day business operations.',
  },
]

const NEEDS = [
  ['Need more visitors?', 'We use SEO, AEO, and GEO to put your business in front of the right people.'],
  ['Need more leads?', 'We focus on your website, content, user experience, and the whole conversion path.'],
  ['Need better operations?', 'We create a custom CRM or build business apps that fit the way you operate.'],
  ['Need a stronger identity?', 'We work on branding, logo, and visuals to give your business a clearer voice.'],
]

const LAYERS = [
  { tag: 'SEO', goal: 'Be found', name: 'Search Engine Optimization', desc: 'helps your website get noticed in classic search results of various search engines.' },
  { tag: 'AEO', goal: 'Be the answer', name: 'Answer Engine Optimization', desc: 'makes your content clear for answer-driven searches like voice search, featured snippets, or asking an AI-driven search tool.' },
  { tag: 'GEO', goal: 'Be referenced', name: 'Generative Engine Optimization', desc: 'ensures your brand stands out and gets mentioned across all AI-driven platforms.' },
]

const INDUSTRIES = [
  'Healthcare & Hospitals', 'Real Estate & Construction', 'E-commerce & Retail', 'Education & EdTech',
  'Finance & FinTech', 'Travel & Hospitality', 'Manufacturing', 'Professional Services',
  'Startups & Technology', 'B2B & Enterprise Businesses',
]

const WHY = [
  ['One Team Across Marketing & Technology', 'No need to hire a marketing agency, web developer, designer, and a software team. We bring all those skills together.'],
  ['Strategy Before Execution', 'We dive into your business challenges and figure out which digital solutions actually fit.'],
  ['Built Around Your Audience', 'We study how people search and make decisions, then shape the entire digital experience to match their journey.'],
  ['Search-Ready From the Start', 'We weave SEO, AEO, and GEO features into your website and content from the start, instead of an afterthought.'],
  ['Designed for Real Business Use', 'We make sure what we build lines up with how users will visualize your website, app, CRM, or marketing campaign.'],
  ['One Digital Partner, Multiple Capabilities', 'From digital marketing services India to international digital projects, we keep your digital ecosystem connected and reduce unnecessary handovers.'],
]

const PROCESS = [
  ['01', 'Understand', 'We know your business, audience, challenges, and goals.'],
  ['02', 'Plan', 'We find the right marketing, design, technology, and search solutions.'],
  ['03', 'Create', 'We bring those plans to life in content, campaigns, interfaces, and digital products.'],
  ['04', 'Launch', 'We assess the experience, fill in the gaps, and validate your digital solution with real users.'],
  ['05', 'Measure', 'We monitor key metrics like visibility, engagement, inquiries, conversions, and product performance.'],
  ['06', 'Improve', 'Launching is just the first step. We use data and your feedback to keep improving the experience.'],
]

export const SERVICES_FAQS = [
  { question: 'What digital marketing services does ADVMEN Technologies offer?', answer: 'ADVMEN is a one-stop destination for digital marketing, SEO, AEO, GEO, social media management, website development, e-commerce solutions, mobile app development, branding, UI/UX, graphic design, and custom CRM systems.' },
  { question: 'Does ADVMEN provide digital marketing services in India?', answer: 'Yes. ADVMEN works with businesses all over India and is involved with businesses in international markets.' },
  { question: 'Does ADVMEN work with international businesses?', answer: 'Indeed. ADVMEN partners with businesses targeting the USA, Canada, UAE, Australia, UK, Oman, and the wider GCC.' },
  { question: 'What is the difference between SEO, AEO, and GEO?', answer: 'SEO improves visibility in search engines. AEO helps your content answer questions directly in search results. GEO focuses on visibility and representation across generative AI search platforms.' },
  { question: 'Does ADVMEN provide website design services?', answer: 'Definitely. We have a skilled team providing website design and development services for companies, e-commerce stores, and custom digital projects.' },
  { question: 'Can ADVMEN build a custom CRM?', answer: 'Yes, ADVMEN builds CRM systems tailored to your sales, customer management, and operational needs.' },
  { question: 'Does ADVMEN develop mobile applications?', answer: 'Yes. Whether you need a customer-facing app or a business solution, ADVMEN can guide you.' },
  { question: 'Can I hire ADVMEN for only one service?', answer: 'Of course. Choose an individual service or combine multiple services, depending on what your business needs.' },
]

const eyebrow = { fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '0.5rem' }
const h2Style = { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1rem' }
const h3Style = { fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }
const pStyle = { fontFamily: 'var(--font-body)', fontSize: 'clamp(0.875rem, 1.6vw, 1rem)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }
const cardStyle = { padding: '1.5rem', borderRadius: '1rem', background: 'var(--color-surface-1)', border: '1px solid var(--color-border-subtle)' }
const sectionGap = 'mt-16 sm:mt-20'

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-[var(--color-border-subtle)] py-4 cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-start gap-4">
      <h3 style={{ ...h3Style, marginBottom: 0, color: isOpen ? 'var(--color-orange)' : 'var(--color-text-primary)' }}>{question}</h3>
      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} style={{ color: 'var(--color-text-tertiary)', fontSize: '1.4rem', lineHeight: 1 }}>+</motion.span>
    </div>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <p style={{ ...pStyle, marginTop: '0.75rem' }}>{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const ServicesPageContent = () => {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={{ background: 'var(--color-black)', paddingTop: 'calc(var(--navbar-height) + clamp(2rem, 5vw, 4rem))', paddingBottom: 'clamp(3rem, 8vw, 6rem)' }}>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mx-auto" style={{ maxWidth: '1200px' }}>

        {/* Section 1 — Hero */}
        <header className="max-w-3xl">
          <h1 style={{ ...h2Style, fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>Digital Marketing and Technology Services</h1>
          <p style={{ ...pStyle, marginBottom: '1rem' }}>
            Your website is the ground you build on. Social media produces engagement. Search visibility helps you reach your target audience. It&rsquo;s much more difficult to get noticed online today.
          </p>
          <p style={{ ...pStyle, marginBottom: '1.75rem' }}>
            ADVMEN Technologies is a one-stop solution that integrates digital marketing services, technology, design, and search optimization. Our digital marketing strategists build a more robust digital presence and create meaningful customer journeys.
          </p>
          <Link to="/contact" className="btn-primary btn-lg shine" data-cursor="hover">Let&rsquo;s Build Your Digital Growth Plan</Link>
        </header>

        {/* Section 2 — Explore */}
        <section className={sectionGap} aria-labelledby="explore-heading">
          <h2 id="explore-heading" style={h2Style}>Explore Our Digital Marketing &amp; Technology Services</h2>
          <div className="max-w-3xl">
            <p style={{ ...pStyle, marginBottom: '1rem' }}>Every business is unique and needs something different. Some brands need a better website. Maybe your brand needs a way to link sales, customers, and your operations. And sometimes you need all of that at once.</p>
            <p style={{ ...pStyle, marginBottom: '1rem' }}>ADVMEN Technologies is a digital marketing agency and technology partner helping businesses build, improve, and grow their digital presence from one connected ecosystem.</p>
            <p style={{ ...pStyle, marginBottom: '1.5rem' }}>Our digital marketing solutions consist of creative thinking, robust strategy, and management solutions that fit together. We don&rsquo;t treat your website, branding, search, content, and tech as separate jobs. We figure out how they can all pull in the same direction.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {NEEDS.map(([q, a]) => (
              <div key={q} style={cardStyle}>
                <h3 style={h3Style}>{q}</h3>
                <p style={pStyle}>{a}</p>
              </div>
            ))}
          </div>
          <p style={{ ...pStyle, color: 'var(--color-text-primary)', fontWeight: 600 }}>Our goal is not to sell you everything. We build what makes sense for your business.</p>
        </section>

        {/* Section 3 — Our Services */}
        <section className={sectionGap} aria-labelledby="services-heading">
          <h2 id="services-heading" style={h2Style}>Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {SERVICES.map((s) => (
              <article key={s.title} style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
                <h3 style={h3Style}>{s.title}</h3>
                <p style={{ ...pStyle, flexGrow: 1 }}>{s.body}</p>
                <Link to={s.href} className="mt-4 text-sm font-semibold" style={{ color: 'var(--color-orange)' }}>Learn more &rarr;</Link>
              </article>
            ))}
          </div>
        </section>

        {/* Section 4 — SEO, AEO & GEO */}
        <section className={sectionGap} aria-labelledby="approach-heading">
          <p style={eyebrow}>Our Approach</p>
          <h2 id="approach-heading" style={h2Style}>Our SEO, AEO &amp; GEO Approach</h2>
          <p style={{ ...pStyle, marginBottom: '1.25rem' }}>Search isn&rsquo;t just about ten blue links anymore.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {LAYERS.map((l) => (
              <div key={l.tag} style={cardStyle}>
                <span style={{ ...eyebrow, display: 'block' }}>{l.goal}</span>
                <h3 style={{ ...h3Style, fontSize: '1.6rem' }}>{l.tag}</h3>
                <p style={pStyle}><strong style={{ color: 'var(--color-text-primary)' }}>{l.name}</strong> {l.desc}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl">
            <p style={{ ...pStyle, marginBottom: '1rem' }}>We approach them as connected layers: SEO &rarr; Be found. AEO &rarr; Be the answer. GEO &rarr; Be referenced.</p>
            <p style={{ ...pStyle, marginBottom: '1rem' }}>We are the leading digital marketing agency providing an ROI-driven approach that combines search intent, content, technical foundations, structured information, internal linking, and clear brand signals.</p>
            <h3 style={h3Style}>Why does all this matter?</h3>
            <p style={pStyle}>Because today&rsquo;s customers might find you anywhere: Google, an AI assistant, social media, a marketplace, or your own website. Your digital presence needs to make sense across all of them.</p>
          </div>
        </section>

        {/* Section 5 — Industries */}
        <section className={sectionGap} aria-labelledby="industries-heading">
          <h2 id="industries-heading" style={h2Style}>Industries We Serve</h2>
          <p style={{ ...pStyle, marginBottom: '1rem' }}>Every industry plays by different rules. Your digital strategy should, too.</p>
          <p style={{ ...pStyle, marginBottom: '1.25rem' }} className="max-w-3xl">We shape our strategy, content, design, technology, and digital marketing around the targeted industry, audience, and buying pattern. ADVMEN Technologies works with businesses across sectors including:</p>
          <ul className="flex flex-wrap gap-3 mb-6" style={{ listStyle: 'none', padding: 0 }}>
            {INDUSTRIES.map((i) => (
              <li key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-orange)', background: 'rgba(232,93,4,0.1)', border: '1px solid rgba(232,93,4,0.3)', padding: '0.55rem 1.1rem', borderRadius: '20px', fontWeight: 600 }}>{i}</li>
            ))}
          </ul>
          <p style={pStyle} className="max-w-3xl">We also provide our digital marketing services India, USA, Canada, UAE, Australia, UK, Oman, and GCC markets, adapting strategy, content, and digital experiences to the audience being served.</p>
        </section>

        {/* Section 6 — Why choose */}
        <section className={sectionGap} aria-labelledby="why-heading">
          <h2 id="why-heading" style={h2Style}>Why Choose ADVMEN Technologies?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY.map(([t, d]) => (
              <div key={t} style={cardStyle}>
                <h3 style={h3Style}>{t}</h3>
                <p style={pStyle}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7 — Process */}
        <section className={sectionGap} aria-labelledby="process-heading">
          <h2 id="process-heading" style={h2Style}>Our Process</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ listStyle: 'none', padding: 0 }}>
            {PROCESS.map(([n, t, d]) => (
              <li key={n} style={cardStyle}>
                <span style={{ ...eyebrow, display: 'block' }}>{n}</span>
                <h3 style={h3Style}>{t}</h3>
                <p style={pStyle}>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Section 8 — FAQ + CTA */}
        <section className={sectionGap} aria-labelledby="faq-heading">
          <h2 id="faq-heading" style={h2Style}>Frequently Asked Questions</h2>
          <div className="max-w-3xl">
            {SERVICES_FAQS.map((f, i) => (
              <FaqItem key={f.question} {...f} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </section>

        <section className={`${sectionGap} p-6 sm:p-10 rounded-3xl`} style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border-subtle)' }} aria-labelledby="cta-heading">
          <h2 id="cta-heading" style={h2Style}>Let&rsquo;s Discuss Your Project</h2>
          <p style={{ ...pStyle, marginBottom: '0.75rem' }} className="max-w-2xl">Bring us your business challenge. We&rsquo;ll help you build, market, design, or optimize.</p>
          <p style={{ ...pStyle, marginBottom: '1.5rem' }} className="max-w-2xl">Looking for a new website, better search visibility, a stronger brand, an e-commerce platform, a mobile app, or a custom CRM? Let&rsquo;s have a chat.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary btn-lg shine" data-cursor="hover">Start a Conversation</Link>
            <Link to="/work" className="btn-secondary btn-lg" data-cursor="hover">Explore Our Work</Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ServicesPageContent
