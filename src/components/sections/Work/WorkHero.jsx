/**
 * WorkHero.jsx — Top-of-page intro for /work
 *
 * Owns the page's single H1. The AI-visibility figures (22 mentions, 23 cited
 * pages, 12 Gemini mentions) match the reported snapshot used in the Go India
 * Cab case study below. Every link is a plain follow link.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CHIPS = [
  { label: 'SEO', to: '/services/seo' },
  { label: 'AEO', to: '/services/aeo-geo' },
  { label: 'GEO', to: '/services/aeo-geo' },
  { label: 'AI Search', to: '/services/aeo-geo' },
  { label: 'Web Dev', to: '/services/website-development' },
  { label: 'App Dev', to: '/services/app-development/android' },
  { label: 'Branding', to: '/services/branding' },
  { label: 'UGC Video', to: '/services/media-production' },
]

const STATS = [
  { value: '11+', label: 'Websites and platforms', to: '/services/website-development' },
  { value: '2', label: 'Android apps live', to: '/work/norozz-service-discovery-booking' },
  { value: '188K', label: 'Search impressions', to: '/work/go-india-cab-digital-presence' },
  { value: '#1', label: 'Brand ranking', to: '/services/seo' },
]

const SERVICES = [
  { title: 'Branding', body: 'Visual identity systems that make your brand instantly recognisable.', to: '/services/branding' },
  { title: 'Web Development', body: 'Fast, conversion-focused websites and platforms built for growth.', to: '/services/website-development' },
  { title: 'App Development', body: 'Android apps for customers and partners, live on Google Play.', to: '/services/app-development/android' },
  { title: 'SEO', body: 'Technical and content SEO with rankings you can measure.', to: '/services/seo' },
  { title: 'GEO and AEO', body: 'Visibility inside Google AI Overview, ChatGPT and Gemini answers.', to: '/services/aeo-geo' },
  { title: 'UGC Video', body: 'Creator-style short videos for ads, reels and brand campaigns.', to: '/services/media-production' },
]

const PLATFORMS = ['Google AI Overview', 'ChatGPT', 'Gemini', 'AI Mode']

const ink = 'var(--color-ink)'
const card = { background: 'var(--color-surface-1)', border: `2px solid ${ink}`, borderRadius: '1rem', boxShadow: `4px 4px 0 ${ink}` }
const mono = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }

const WorkHero = () => (
  <section
    className="relative w-full overflow-hidden"
    style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)', paddingBottom: '3rem', background: 'var(--color-black)' }}
    aria-label="Our work: websites, apps and search growth"
  >
    <div className="container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Copy */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <h1
            className="section-title"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.08, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.03em' }}
          >
            Our Work: <span style={{ color: 'var(--color-orange)' }}>Websites, Apps &amp; Search Growth</span> Delivered
          </h1>
          <p data-speakable style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', maxWidth: '38rem' }}>
            From websites and Android apps to UGC video and AI-search visibility, here is what ADVMEN has built for ambitious brands.
          </p>

          <ul className="flex flex-wrap gap-2" aria-label="Capabilities">
            {CHIPS.map((c) => (
              <li key={c.label}>
                <Link
                  to={c.to}
                  className="inline-block transition-colors duration-300 hover:bg-[var(--color-orange)]"
                  style={{ ...mono, fontSize: '0.68rem', fontWeight: 700, color: ink, border: `2px solid ${ink}`, borderRadius: '9999px', padding: '0.3rem 0.8rem', background: 'var(--color-surface-1)' }}
                  data-cursor="hover"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <a href="#work-grid" className="btn-secondary btn-lg" data-cursor="hover">Explore Our Work →</a>
            <Link to="/contact" className="btn-outline btn-lg" data-cursor="hover">Contact Us</Link>
          </div>
        </div>

        {/* AI visibility card */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div style={{ ...card, boxShadow: `6px 6px 0 ${ink}`, padding: '1.5rem', background: '#17171c', color: '#fff' }}>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span style={{ ...mono, fontSize: '0.68rem', fontWeight: 700, color: '#ffb366' }}>AI search visibility</span>
              <span style={{ ...mono, fontSize: '0.62rem', fontWeight: 700, background: 'var(--color-orange)', color: '#fff', borderRadius: '9999px', padding: '0.2rem 0.6rem' }}>cited ✓</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#d9d9e0', marginBottom: '1.25rem' }}>
              &gt; goindiacab.com on AI platforms
            </p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[{ v: '22', l: 'Mentions' }, { v: '23', l: 'Cited pages' }, { v: '12', l: 'Gemini mentions' }].map((s) => (
                <div key={s.l}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--color-orange)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ ...mono, fontSize: '0.6rem', color: '#b8b8c4', marginTop: '0.35rem' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <ul className="flex flex-wrap gap-2 mb-4" aria-label="AI platforms">
              {PLATFORMS.map((p) => (
                <li key={p} style={{ fontSize: '0.72rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.25)', borderRadius: '9999px', padding: '0.25rem 0.7rem' }}>{p}</li>
              ))}
            </ul>
            <p style={{ ...mono, fontSize: '0.58rem', color: '#8f8fa0', marginBottom: '0.9rem' }}>source: search console + AI visibility report</p>
            <Link to="/work/go-india-cab-ai-search-visibility" className="inline-block text-sm font-semibold hover:underline" style={{ color: '#ffb366' }} data-cursor="hover">
              Read the AI visibility case study →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12 pt-8" style={{ borderTop: `2px solid ${ink}` }}>
        {STATS.map((s) => (
          <div key={s.label}>
            <dt style={{ order: 2 }}>
              <Link to={s.to} className="hover:text-[var(--color-orange)] transition-colors duration-300" style={{ ...mono, fontSize: '0.68rem', color: 'var(--color-text-tertiary)' }} data-cursor="hover">
                {s.label}
              </Link>
            </dt>
            <dd style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--color-orange)', lineHeight: 1.1, marginTop: '0.25rem' }}>
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>

    {/* What we do */}
    <div className="container relative z-10" style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-px bg-[var(--color-orange)]" />
        <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>What we do</span>
      </div>
      <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)', lineHeight: 1.15, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em', marginBottom: '1.75rem' }}>
        Brands, platforms and search.
      </h2>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <li key={s.title}>
            <Link to={s.to} className="group flex flex-col h-full p-5 transition-transform duration-300 hover:-translate-y-1" style={card} data-cursor="hover">
              <span style={{ ...mono, fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-orange)', marginBottom: '0.5rem' }}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className="group-hover:text-[var(--color-orange)] transition-colors duration-300" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: ink, marginBottom: '0.4rem' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{s.body}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export default WorkHero
