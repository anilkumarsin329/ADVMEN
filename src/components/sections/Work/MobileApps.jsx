/**
 * MobileApps.jsx — "Live on Google Play" block for the Work page
 */

import { motion } from 'framer-motion'

const APPS = [
  {
    kind: 'Customer App / Android',
    name: 'Norozz',
    image: '/App%20Image/App%20user.jpeg',
    desc: 'Discover, book and manage trusted services from one convenient app: pick a service, choose a date and time, and track every booking.',
    features: ['Easy service discovery', 'Simple booking flow', 'Booking management and history', 'Wallet and secure payments'],
    href: 'https://play.google.com/store/apps/details?id=com.advemn.norozz&pcampaignid=web_share',
  },
  {
    kind: 'Partner App / Android',
    name: 'Norozz Partner',
    image: '/App%20Image/App%20partner.jpeg',
    desc: 'Built for service providers to manage their services, bookings and customer requests from their mobile.',
    features: ['Add and manage services', 'Manage booking requests', 'Customer and booking info', 'Instant booking notifications'],
    href: 'https://play.google.com/store/apps/details?id=com.advmen.partnerApp&pcampaignid=web_share',
  },
]

const MobileApps = () => (
  <section id="mobile-apps" className="relative w-full" style={{ paddingBottom: '6rem' }} aria-label="Mobile apps live on Google Play">
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-[var(--color-orange)]" />
        <span className="type-eyebrow" style={{ color: 'var(--color-orange)' }}>Mobile Apps</span>
      </div>
      <h2
        className="section-title"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1, fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}
      >
        Live on Google Play
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {APPS.map((app, i) => (
          <motion.article
            key={app.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col sm:flex-row gap-6 p-5 sm:p-6"
            style={{
              background: '#fff',
              border: '2px solid var(--color-ink)',
              borderRadius: '1.25rem',
              boxShadow: '6px 6px 0 var(--color-ink)',
            }}
          >
            {/* App screenshot */}
            <div
              className="flex-shrink-0 self-center sm:self-start overflow-hidden"
              style={{ width: '170px', aspectRatio: '9 / 19', background: '#17171c', borderRadius: '1.25rem', border: '2px solid var(--color-ink)' }}
            >
              <img
                src={app.image}
                alt={`${app.name} app screenshot`}
                width="170"
                height="358"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex flex-col flex-grow">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-orange)' }}>
                {app.kind}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-ink)', margin: '0.4rem 0 0.6rem' }}>
                {app.name}
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{app.desc}</p>

              <ul className="flex flex-col gap-1.5 mb-5">
                {app.features.map((f) => (
                  <li key={f} className="flex items-center gap-2" style={{ fontSize: '0.9rem', color: 'var(--color-ink)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--color-orange)' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={app.href}
                target="_blank"
                rel="noopener"
                className="self-start inline-flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: '#17171c', color: '#fff', borderRadius: '9999px', padding: '0.7rem 1.4rem', fontSize: '0.85rem', fontWeight: 700 }}
                data-cursor="hover"
                aria-label={`Get ${app.name} on Google Play`}
              >
                Get it on Google Play →
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
)

export default MobileApps
