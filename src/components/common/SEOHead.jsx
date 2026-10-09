import { Helmet } from 'react-helmet-async'
import { SEO_DEFAULTS, COMPANY } from '@utils/constants'

const SEOHead = ({
  title,
  description = SEO_DEFAULTS.description,
  keywords    = SEO_DEFAULTS.keywords,
  ogImage     = SEO_DEFAULTS.ogImage,
  canonical,
  noIndex     = false,
  schemaType  = 'home',
  schemaData  = {},
}) => {
  const alreadyHasBrand = title && (title.includes('| ADVMEN') || title.includes('| Advmen'))
  const fullTitle = title
    ? (alreadyHasBrand ? title : `${title} | ${COMPANY.shortName}`)
    : SEO_DEFAULTS.title

  // 1. Core Base Entities (Always Present)
  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${COMPANY.website}/#organization`,
    name: COMPANY.name,
    url: COMPANY.website,
    logo: `${COMPANY.website}/ADVMEN logo.png`,
    description: COMPANY.description,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Orchid Center, 3rd Floor, Golf Course Road, SEC-53',
      addressLocality: 'Gurugram',
      addressRegion: 'HR',
      postalCode: '122002',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/company/advmen-technologies',
      'https://www.instagram.com/advmen.in?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
      'https://twitter.com/advmen_tech',
    ]
  }

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${COMPANY.website}/#website`,
    name: COMPANY.name,
    url: COMPANY.website,
    publisher: { '@id': `${COMPANY.website}/#organization` }
  }

  // Helper for BreadcrumbList
  const buildBreadcrumbList = (breadcrumbs) => {
    if (!breadcrumbs || !breadcrumbs.length) return null
    return {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((bc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: bc.name,
        item: bc.url,
      }))
    }
  }

  // Helper for FAQPage
  const buildFaqPage = (faqs) => {
    if (!faqs || !faqs.length) return null
    return {
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  }

  const schemas = [
    { '@context': 'https://schema.org', ...organizationSchema },
    { '@context': 'https://schema.org', ...websiteSchema }
  ]

  // Add schemas conditionally based on schemaType
  if (schemaType === 'home') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: fullTitle,
      url: canonical || COMPANY.website,
      isPartOf: { '@id': `${COMPANY.website}/#website` }
    })
    if (schemaData.faqs) {
      schemas.push({ '@context': 'https://schema.org', ...buildFaqPage(schemaData.faqs) })
    }
  } else if (schemaType === 'service' || schemaType === 'market') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: schemaData.serviceName || title,
      serviceType: schemaData.serviceName || title,
      url: canonical,
      description: description,
      provider: { '@id': `${COMPANY.website}/#organization` },
      ...(schemaData.areaServed && { areaServed: schemaData.areaServed })
    })
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: fullTitle,
      url: canonical,
      isPartOf: { '@id': `${COMPANY.website}/#website` }
    })
    if (schemaData.breadcrumbs) {
      schemas.push({ '@context': 'https://schema.org', ...buildBreadcrumbList(schemaData.breadcrumbs) })
    }
    if (schemaData.faqs) {
      schemas.push({ '@context': 'https://schema.org', ...buildFaqPage(schemaData.faqs) })
    }
  } else if (schemaType === 'article') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      author: schemaData.articleAuthor ? {
        '@type': 'Person',
        name: schemaData.articleAuthor
      } : undefined,
      datePublished: schemaData.articleDate,
      dateModified: schemaData.articleModifiedDate || schemaData.articleDate,
      publisher: { '@id': `${COMPANY.website}/#organization` }
    })
    if (schemaData.breadcrumbs) {
      schemas.push({ '@context': 'https://schema.org', ...buildBreadcrumbList(schemaData.breadcrumbs) })
    }
  } else if (schemaType === 'work' || schemaType === 'collection' || schemaType === 'careers') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: fullTitle,
      url: canonical,
      isPartOf: { '@id': `${COMPANY.website}/#website` }
    })
    if (schemaType !== 'careers') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: schemaData.items || []
      })
    }
    if (schemaData.breadcrumbs) {
      schemas.push({ '@context': 'https://schema.org', ...buildBreadcrumbList(schemaData.breadcrumbs) })
    }
  } else if (schemaType === 'contact') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: fullTitle,
      url: canonical,
      isPartOf: { '@id': `${COMPANY.website}/#website` }
    })
    if (schemaData.breadcrumbs) {
      schemas.push({ '@context': 'https://schema.org', ...buildBreadcrumbList(schemaData.breadcrumbs) })
    }
  } else if (schemaType === 'jobPosting') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: schemaData.jobTitle || title,
      description: description,
      hiringOrganization: { '@id': `${COMPANY.website}/#organization` },
      datePosted: schemaData.datePosted,
      validThrough: schemaData.validThrough,
      jobLocation: schemaData.jobLocation
    })
  } else if (schemaType === 'pricing') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: fullTitle,
      url: canonical,
      isPartOf: { '@id': `${COMPANY.website}/#website` }
    })
    if (schemaData.breadcrumbs) {
      schemas.push({ '@context': 'https://schema.org', ...buildBreadcrumbList(schemaData.breadcrumbs) })
    }
  }

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
      {canonical && <meta property="og:url" content={canonical} />}

      {/* ── Twitter Card ─────────────────────────────────── */}
      <meta name="twitter:card"        content={SEO_DEFAULTS.twitterCard} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* ── JSON-LD Schemas ──────────────────────────────── */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export default SEOHead
