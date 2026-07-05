/**
 * components/common/SEOHead.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — SEO Head Component
 *
 * Injects dynamic meta tags per page using react-helmet-async.
 * Import and use at the top of every page component.
 *
 * Usage:
 *   <SEOHead
 *     title="About Us"
 *     description="Learn about ADVMEN Technologies..."
 *   />
 * ─────────────────────────────────────────────────────────────
 */

import { Helmet } from 'react-helmet-async'
import { SEO_DEFAULTS, COMPANY } from '@utils/constants'

const SEOHead = ({
  title,
  description = SEO_DEFAULTS.description,
  keywords    = SEO_DEFAULTS.keywords,
  ogImage     = SEO_DEFAULTS.ogImage,
  canonical,
  noIndex     = false,
}) => {
  const fullTitle = title
    ? `${title} | ${COMPANY.shortName}`
    : SEO_DEFAULTS.title

  return (
    <Helmet>
      {/* ── Primary Meta ─────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords"    content={keywords} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex   && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ───────────────────────────────────── */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={COMPANY.name} />

      {/* ── Twitter Card ─────────────────────────────────── */}
      <meta name="twitter:card"        content={SEO_DEFAULTS.twitterCard} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* ── JSON-LD Organisation Schema ──────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context':   'https://schema.org',
          '@type':      'Organization',
          name:         COMPANY.name,
          url:          COMPANY.website,
          logo:         `${COMPANY.website}/ADVMEN logo.png`,
          contactPoint: {
            '@type':       'ContactPoint',
            telephone:     COMPANY.phone,
            contactType:   'customer service',
          },
        })}
      </script>
    </Helmet>
  )
}

export default SEOHead
