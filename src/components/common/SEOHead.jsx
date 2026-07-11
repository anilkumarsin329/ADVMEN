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
  schemaType  = 'Organization',
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
          description:  COMPANY.description,
          sameAs:       [
            'https://www.linkedin.com/company/advmen-technologies',
            'https://www.instagram.com/advmen.tech',
            'https://twitter.com/advmen_tech',
          ],
          contactPoint: {
            '@type':       'ContactPoint',
            telephone:     COMPANY.phone,
            contactType:   'customer service',
            email:         'hello@advmen.com',
          },
          address: {
            '@type':           'PostalAddress',
            streetAddress:     'Jharsa Village, Sector 38',
            addressLocality:   'Gurugram',
            addressRegion:     'Haryana',
            postalCode:        '122001',
            addressCountry:    'IN',
          },
        })}
      </script>

      {/* ── JSON-LD LocalBusiness Schema ────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context':     'https://schema.org',
          '@type':        'LocalBusiness',
          name:           COMPANY.name,
          image:          `${COMPANY.website}/ADVMEN logo.png`,
          description:    description,
          url:            COMPANY.website,
          telephone:      COMPANY.phone,
          priceRange:     '$$',
          areaServed:     ['IN', 'US', 'UK', 'CA', 'AU'],
          address: {
            '@type':           'PostalAddress',
            streetAddress:     'Jharsa Village, Sector 38',
            addressLocality:   'Gurugram',
            addressRegion:     'Haryana',
            postalCode:        '122001',
            addressCountry:    'IN',
          },
        })}
      </script>

      {/* ── JSON-LD BreadcrumbList Schema ──────────────── */}
      {canonical && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context':   'https://schema.org',
            '@type':      'BreadcrumbList',
            itemListElement: [
              {
                '@type':    'ListItem',
                position:   1,
                name:       'Home',
                item:       COMPANY.website,
              },
              {
                '@type':    'ListItem',
                position:   2,
                name:       title || 'Page',
                item:       canonical,
              },
            ],
          })}
        </script>
      )}
    </Helmet>
  )
}

export default SEOHead
