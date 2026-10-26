/**
 * utils/schema.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — JSON-LD (schema.org) node builders for SEO / AEO / GEO.
 *
 * Every node carries an @id so pages are emitted as one linked @graph
 * (Organization ⇄ WebSite ⇄ WebPage ⇄ Service/Article/FAQ/Breadcrumb).
 * index.html ships a static Organization + WebSite copy for crawlers
 * that do not execute JavaScript — keep both in sync.
 * ─────────────────────────────────────────────────────────────
 */

import { COMPANY } from '@utils/constants'

export const SITE = COMPANY.website
export const ORG_ID = `${SITE}/#organization`
export const WEBSITE_ID = `${SITE}/#website`
export const LOGO_ID = `${SITE}/#logo`
const LOGO_URL = `${SITE}/ADVMEN%20logo.png`

const orgRef = { '@id': ORG_ID }
const clean = (obj) => JSON.parse(JSON.stringify(obj)) // drops undefined

// ── Entities / service catalogue ──────────────────────────────
export const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/advmen-technologies/',
  'https://www.facebook.com/profile.php?id=61591797981658',
  'https://www.instagram.com/advmen.in',
  'https://twitter.com/advmen_tech',
]

export const SERVICE_CATALOG = [
  { name: 'SEO Services', url: `${SITE}/services/seo`, description: 'Technical SEO, keyword and search-intent research, on-page SEO, content strategy, local and ecommerce SEO, digital PR and authority building.' },
  { name: 'AEO & GEO Services (AI Search Optimization)', url: `${SITE}/services/aeo-geo`, description: 'Answer Engine and Generative Engine Optimization: entity optimization, topical authority, FAQ and schema, AI search visibility monitoring.' },
  { name: 'Branding', url: `${SITE}/services/branding`, description: 'Brand strategy, identity, logo design, visual systems and digital brand assets.' },
  { name: 'Performance Marketing', url: `${SITE}/services/performance-marketing`, description: 'Paid search, social ads, campaign strategy, conversion optimization and performance analytics.' },
  { name: 'Social Media Marketing', url: `${SITE}/services/social-media-marketing`, description: 'Social media strategy, content planning, creative direction, platform management and audience engagement.' },
  { name: 'Content Marketing', url: `${SITE}/services/content-marketing`, description: 'Content strategy, SEO content and blog writing, website content, authority content and AEO / AI-search content.' },
  { name: 'Website Development', url: `${SITE}/services/website-development`, description: 'Custom, business, corporate, healthcare and e-commerce website development, landing pages, CMS and API integration.' },
  { name: 'Professional Website Design', url: `${SITE}/services/professional-website-design`, description: 'Responsive, SEO-friendly website design, UI/UX, WordPress, e-commerce and website redesign services.' },
  { name: 'App Development', url: `${SITE}/services/app-development`, description: 'Android, iOS, cross-platform and custom mobile app development with API and backend integration.' },
]

const KNOWS_ABOUT = [
  'Search Engine Optimization (SEO)',
  'Answer Engine Optimization (AEO)',
  'Generative Engine Optimization (GEO)',
  'AI search optimization',
  'Digital marketing',
  'Branding',
  'Performance marketing',
  'Social media marketing',
  'Content marketing',
  'Website design and development',
  'Mobile app development',
  'UI/UX design',
]

const place = (name, type = 'Country') => ({ '@type': type, name })
export const DEFAULT_AREA_SERVED = [
  place('India'),
  place('United States'),
  place('United Arab Emirates'),
  place('Europe', 'Place'),
]

const AREA_CODES = {
  IN: place('India'),
  US: place('United States'),
  AE: place('United Arab Emirates'),
  150: place('Europe', 'Place'),
}
export const normalizeArea = (area) => {
  if (!area) return DEFAULT_AREA_SERVED
  const list = Array.isArray(area) ? area : [area]
  return list.map((a) => (typeof a === 'string' ? AREA_CODES[a] || place(a) : a))
}

// ── Core entities ─────────────────────────────────────────────
export const organizationNode = () =>
  clean({
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: 'ADVMEN Technologies',
    legalName: 'ADVMEN Technologies Private Limited',
    alternateName: 'ADVMEN',
    url: SITE,
    logo: { '@type': 'ImageObject', '@id': LOGO_ID, url: LOGO_URL, contentUrl: LOGO_URL, caption: 'ADVMEN Technologies' },
    image: LOGO_URL,
    description:
      'ADVMEN is a digital marketing and technology agency in India offering SEO, AEO, GEO, AI search optimization, branding, web development and mobile app development.',
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Orchid Center, 3rd Floor, Golf Course Road, SEC-53',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122002',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: COMPANY.phone,
        email: COMPANY.email,
        areaServed: ['IN', 'US', 'AE', 'EU'],
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    areaServed: DEFAULT_AREA_SERVED,
    knowsAbout: KNOWS_ABOUT,
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 20 },
    sameAs: SOCIAL_PROFILES,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital marketing and technology services',
      itemListElement: SERVICE_CATALOG.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: s.url, description: s.description },
      })),
    },
  })

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE,
  name: 'ADVMEN Technologies',
  alternateName: 'ADVMEN',
  inLanguage: 'en-IN',
  publisher: orgRef,
})

// ── Page-level nodes ──────────────────────────────────────────
const PAGE_TYPES = {
  about: 'AboutPage',
  contact: 'ContactPage',
  collection: 'CollectionPage',
  work: 'CollectionPage',
  careers: 'CollectionPage',
}

export const webPageNode = ({ url, name, description, schemaType, image, hasBreadcrumb, hasFaq, dateModified }) =>
  clean({
    '@type': PAGE_TYPES[schemaType] || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': WEBSITE_ID },
    about: orgRef,
    publisher: orgRef,
    primaryImageOfPage: image ? { '@type': 'ImageObject', url: image } : undefined,
    breadcrumb: hasBreadcrumb ? { '@id': `${url}#breadcrumb` } : undefined,
    mainEntity: schemaType === 'contact' ? orgRef : hasFaq ? { '@id': `${url}#faq` } : undefined,
    dateModified,
    // AEO: marks the passages voice assistants / answer engines should prefer
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '[data-speakable]'] },
    potentialAction: { '@type': 'ReadAction', target: [url] },
  })

export const breadcrumbNode = (url, items) =>
  items?.length
    ? {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: items.map((bc, i) => ({ '@type': 'ListItem', position: i + 1, name: bc.name, item: bc.url })),
      }
    : null

export const faqNode = (url, faqs) =>
  faqs?.length
    ? {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        isPartOf: { '@id': `${url}#webpage` },
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null

export const serviceNode = ({ url, name, description, areaServed, features, image }) =>
  clean({
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType: name,
    category: 'Digital marketing and technology',
    description,
    url,
    image,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    provider: orgRef,
    areaServed: normalizeArea(areaServed),
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: `${SITE}/contact`, name: 'Request a consultation' },
    hasOfferCatalog: features?.length
      ? {
          '@type': 'OfferCatalog',
          name: `${name} — what is included`,
          itemListElement: features.map((f) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: f } })),
        }
      : undefined,
  })

export const articleNode = ({ url, headline, description, image, author, datePublished, dateModified, keywords, section }) =>
  clean({
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline,
    description,
    image,
    inLanguage: 'en-IN',
    mainEntityOfPage: { '@id': `${url}#webpage` },
    isPartOf: { '@id': `${url}#webpage` },
    author: author ? { '@type': 'Person', name: author } : orgRef,
    publisher: orgRef,
    datePublished,
    dateModified: dateModified || datePublished,
    keywords,
    articleSection: section,
  })

export const itemListNode = (url, items, name) =>
  items?.length
    ? {
        '@type': 'ItemList',
        '@id': `${url}#itemlist`,
        name,
        numberOfItems: items.length,
        itemListElement: items.map((it, i) => clean({ '@type': 'ListItem', position: i + 1, name: it.name, url: it.url })),
      }
    : null

export const howToNode = (url, howTo) =>
  howTo?.steps?.length
    ? {
        '@type': 'HowTo',
        '@id': `${url}#howto`,
        name: howTo.name,
        description: howTo.description,
        step: howTo.steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${url}#step-${i + 1}`,
        })),
      }
    : null

/** Pricing → OfferCatalog with "starting from" price specifications. */
export const priceCatalogNode = (url, catalog) =>
  catalog?.items?.length
    ? {
        '@type': 'OfferCatalog',
        '@id': `${url}#pricing`,
        name: catalog.name,
        itemListElement: catalog.items.map((it) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: it.name, provider: orgRef },
          priceCurrency: it.currency || 'INR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: it.minPrice,
            priceCurrency: it.currency || 'INR',
            valueAddedTaxIncluded: false,
          },
        })),
      }
    : null

export const jobPostingNode = ({ url, title, description, datePosted, validThrough, jobLocation, employmentType, department }) =>
  clean({
    '@type': 'JobPosting',
    '@id': `${url}#job`,
    title,
    description,
    url,
    datePosted,
    validThrough,
    employmentType,
    industry: department,
    directApply: true,
    hiringOrganization: { '@type': 'Organization', name: 'ADVMEN Technologies', sameAs: SITE, logo: LOGO_URL },
    jobLocation: jobLocation || {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Gurugram', addressRegion: 'Haryana', addressCountry: 'IN' },
    },
  })

export const creativeWorkNode = ({ url, name, description, image, about }) =>
  clean({
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    name,
    description,
    image,
    about,
    creator: orgRef,
    publisher: orgRef,
    mainEntityOfPage: { '@id': `${url}#webpage` },
  })
