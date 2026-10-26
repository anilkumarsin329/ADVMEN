/**
 * UgcVideos.jsx — "Creator-style videos that sell." block for the Work page
 *
 * Videos live in frontend/public/UGC vedio/. Categories/labels are editable below;
 * items without a `src` render a placeholder tile.
 */

import { motion } from 'framer-motion'

const V = (n) => `/UGC%20vedio/ugc${n}.mp4#t=0.5`

const SHORTS = [
  { time: '0:24', category: 'Travel',     label: 'Hook-led explainer',   src: V(2) },
  { time: '0:33', category: 'Travel',     label: 'Presenter-led video',  src: V(7) },
  { time: '0:45', category: 'Skincare',   label: 'Product demo',         src: V(4) },
  { time: '0:50', category: 'Healthcare', label: 'Explainer',            src: V(5) },
  { time: '0:39', category: 'Lifestyle',  label: 'Creator-led video',    src: V(8) },
]

const STUDIO = [
  { title: 'Studio setup — behind the scenes', src: V(3) },
  { title: 'Studio setup — lighting and teleprompter', src: V(6) },
]

const Tile = ({ src, poster, title, className = '', children }) => (
  <div
    className={`relative overflow-hidden ${className}`}
    style={{ border: '2px solid var(--color-ink)', borderRadius: '0.9rem', background: '#17171c' }}
  >
    {src ? (
      <video
        src={src}
        poster={poster || undefined}
        controls
        playsInline
        preload="metadata"
        title={title}
        className="w-full h-full object-cover"
      />
    ) : (
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex items-center justify-center"
          style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '1rem' }}
        >
          ▶
        </span>
      </div>
    )}
    {children}
  </div>
)

const UgcVideos = () => (
  <section id="ugc-videos" className="relative w-full" style={{ paddingBottom: '6rem' }} aria-label="UGC video content">
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-[var(--color-orange)]" />
        <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>UGC Video Content</span>
      </div>
      <h2
        className="section-title"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}
      >
        Creator-style videos that sell.
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {SHORTS.map((v, i) => (
          <motion.figure
            key={`${v.category}-${v.label}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <Tile src={v.src} poster={v.poster} title={`${v.category} — ${v.label}`} className="aspect-[9/16] w-full">
              <span
                className="absolute top-2 left-2"
                style={{ background: 'var(--color-orange)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px', zIndex: 1 }}
              >
                {v.time}
              </span>
            </Tile>
            <figcaption className="mt-2">
              <span className="block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-orange)' }}>
                {v.category}
              </span>
              <span className="block" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink)' }}>{v.label}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-4">
        {STUDIO.map((v) => (
          <Tile key={v.title} src={v.src} poster={v.poster} title={v.title} className="aspect-[9/16] w-[calc(50%-0.5rem)] md:w-[calc(20%-0.8rem)]" />
        ))}
        <p className="w-full md:w-auto md:flex-1" style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', maxWidth: '420px' }}>
          Shot in a professional studio setup with lighting, teleprompter and styled sets. Full-length videos available on request.
        </p>
      </div>
    </div>
  </section>
)

export default UgcVideos
