/**
 * GoIndiaCabCaseStudy.jsx — SEO case study block for the Work page
 *
 * The headline numbers, keyword table and AI-visibility figures are the real
 * reported values. The chart lines are a stylised reproduction of the Search
 * Console graph (generated below) — replace `makeSeries` with real daily
 * exports (normalised 0–1) when available.
 */

import { motion } from 'framer-motion'

const STATS = [
  { value: '1.36K', label: 'Total clicks',     bg: '#4285f4' },
  { value: '188K',  label: 'Total impressions', bg: '#5e35b1' },
  { value: '0.7%',  label: 'Average CTR',      bg: '#00897b' },
  { value: '12.3',  label: 'Average position', bg: 'var(--color-orange)' },
]

const KEYWORDS = [
  ['26 seater car', '1.1'],
  ['22 seater traveller', '2.0'],
  ['tempo traveller 22 seater', '2.1'],
  ['places to visit in chandigarh at night with family', '4.8'],
  ['best route from delhi to khatu shyam ji by car', '4.8'],
  ['22 seater tempo traveller', '4.9'],
  ['delhi to himachal taxi', '6.1'],
  ['taxi india', '6.2'],
]

const AI_STATS = [
  { value: '15', label: 'AI Visibility score', bg: 'var(--color-orange)', dark: false },
  { value: '22', label: 'Mentions in AI answers', bg: '#17171c', dark: true },
  { value: '23', label: 'Pages cited by AI', bg: '#17171c', dark: true },
]

const AI_PLATFORMS = [
  { name: 'ChatGPT',     mentions: 6,  pages: 6,  mColor: 'var(--color-orange)', pColor: '#00a67e' },
  { name: 'AI Overview', mentions: 3,  pages: 8,  mColor: 'var(--color-orange)', pColor: '#4285f4' },
  { name: 'AI Mode',     mentions: 1,  pages: 2,  mColor: 'var(--color-orange)', pColor: '#34a853' },
  { name: 'Gemini',      mentions: 12, pages: 13, mColor: 'var(--color-orange)', pColor: '#7c4dff' },
]
const AI_MAX = 13

// ── Stylised chart data ───────────────────────────────────────
const N = 90
const rand = (seed) => {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}
const makeSeries = (seed, base, rise, amp) => {
  const r = rand(seed)
  return Array.from({ length: N }, (_, i) => base + rise * (i / N) + (r() - 0.5) * amp)
}
const SERIES = [
  { color: '#5e35b1', data: makeSeries(11, 0.38, 0.18, 0.12) }, // impressions
  { color: '#4285f4', data: makeSeries(23, 0.22, 0.05, 0.22) }, // clicks
  { color: '#e85d04', data: makeSeries(37, 0.2, 0.03, 0.2) },   // position
  { color: '#00897b', data: makeSeries(53, 0.14, 0.02, 0.2) },  // CTR
]
const DATES = ['27/07/2026', '06/08/2026', '16/08/2026', '26/08/2026', '05/09/2026', '15/09/2026', '25/09/2026', '05/10/2026']

const W = 800
const H = 260
const toPath = (data) =>
  data.map((v, i) => `${i ? 'L' : 'M'}${((i / (N - 1)) * W).toFixed(1)},${(H - Math.max(0.02, Math.min(0.98, v)) * H).toFixed(1)}`).join(' ')

const subHeading = { fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-ink)', margin: '2.5rem 0 1rem' }
const cardShadow = { border: '2px solid var(--color-ink)', boxShadow: '5px 5px 0 var(--color-ink)', borderRadius: '1rem', background: '#fff' }

const GoIndiaCabCaseStudy = () => (
  <section id="go-india-cab-case-study" className="relative w-full" style={{ paddingBottom: '6rem' }} aria-label="Go India Cab SEO case study">
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-[var(--color-orange)]" />
        <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>SEO Case Study / goindiacabs.com</span>
      </div>
      <h2
        className="section-title"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em', marginBottom: '2rem' }}
      >
        Go India Cab: results in 3 months
      </h2>

      {/* Headline stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            style={{ background: s.bg, borderRadius: '0.9rem', padding: '1.1rem 1.25rem', color: '#fff' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.95 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Performance chart */}
      <div style={{ ...cardShadow, padding: '1.25rem' }}>
        <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full" role="img" aria-label="Clicks, impressions, CTR and position over three months">
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" x2={W} y1={H - g * H} y2={H - g * H} stroke="#17171c" strokeOpacity="0.08" />
          ))}
          {SERIES.map((s) => (
            <path key={s.color} d={toPath(s.data)} fill="none" stroke={s.color} strokeWidth="1.8" strokeLinejoin="round" />
          ))}
          {DATES.map((d, i) => (
            <text key={d} x={(i / (DATES.length - 1)) * (W - 60) + 30} y={H + 18} textAnchor="middle" fontSize="10" fill="#17171c" fillOpacity="0.55" fontFamily="var(--font-mono)">
              {d}
            </text>
          ))}
        </svg>
      </div>

      {/* Keywords */}
      <h3 style={subHeading}>Top ranking keywords (non-branded, Google position)</h3>
      <ol className="flex flex-col gap-2.5" style={{ maxWidth: '720px' }}>
        {KEYWORDS.map(([kw, pos], i) => (
          <li key={kw} className="flex items-center justify-between gap-4" style={{ background: '#fff', borderRadius: '0.8rem', padding: '0.7rem 1rem' }}>
            <span className="flex items-center gap-3" style={{ fontSize: '0.9rem', color: 'var(--color-ink)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-orange)' }}>{String(i + 1).padStart(2, '0')}</span>
              {kw}
            </span>
            <span
              style={{
                background: i < 3 ? '#17171c' : 'var(--color-orange)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.2rem 0.8rem',
                borderRadius: '9999px',
                flexShrink: 0,
              }}
            >
              {pos}
            </span>
          </li>
        ))}
      </ol>

      {/* AI visibility */}
      <h3 style={subHeading}>AI search visibility</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {AI_STATS.map((s) => (
          <div key={s.label} style={{ background: s.bg, color: '#fff', borderRadius: '0.9rem', padding: '1.1rem 1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {AI_PLATFORMS.map((p) => (
          <div key={p.name} style={{ ...cardShadow, padding: '1rem 1.1rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.9rem' }}>{p.name}</div>
            {[
              ['Mentions', p.mentions, p.mColor],
              ['Cited pages', p.pages, p.pColor],
            ].map(([label, val, color]) => (
              <div key={label} style={{ marginBottom: '0.7rem' }}>
                <div className="flex justify-between" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>
                  <span>{label}</span>
                  <span style={{ color: 'var(--color-ink)', fontWeight: 700 }}>{val}</span>
                </div>
                <div style={{ height: '5px', borderRadius: '9999px', background: 'rgba(232,93,4,0.15)', marginTop: '4px' }}>
                  <div style={{ width: `${(val / AI_MAX) * 100}%`, height: '100%', borderRadius: '9999px', background: color }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default GoIndiaCabCaseStudy
