import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SEO_DEFAULTS, COMPANY } from '@utils/constants'
import {
  SITE,
  organizationNode,
  websiteNode,
  webPageNode,
  breadcrumbNode,
  faqNode,
  serviceNode,
  articleNode,
  itemListNode,
  howToNode,
  priceCatalogNode,
  jobPostingNode,
  creativeWorkNode,
} from '@utils/schema'

/**
 * schemaType: home | page | about | contact | collection | work | careers |
 *             service | market | article | pricing | jobPosting | project
 *
 * schemaData: breadcrumbs, faqs, items, itemsName, howTo, catalog, features,
 *             serviceName, areaServed, image, articleAuthor, articleDate,
 *             articleModifiedDate, articleKeywords, articleSection,
 *             dateModified, job fields, project fields.
 */
const SEOHead = ({
  title,
  description = SEO_DEFAULTS.description,
  keywords    = SEO_DEFAULTS.keywords,
  ogImage     = SEO_DEFAULTS.ogImage,
  canonical,
  noIndex     = false,
  schemaType  = 'page',
  schemaData  = {},
}) => {
  const { pathname } = useLocation()
  const alreadyHasBrand = title && /[|—–-]\s*ADVMEN/i.test(title)
  const fullTitle = title
    ? (alreadyHasBrand ? title : `${title} | ${COMPANY.shortName}`)
    : SEO_DEFAULTS.title

  // Canonical: explicit prop, else the current clean path on the www host
  const url = canonical || (pathname === '/' ? `${SITE}/` : `${SITE}${pathname.replace(/\/+$/, '')}`)

  const crumbs = breadcrumbNode(url, schemaData.breadcrumbs)
  const faq = faqNode(url, schemaData.faqs)
  const pageImage = schemaData.image || ogImage

  // One linked @graph: Organization ⇄ WebSite ⇄ WebPage ⇄ entity nodes
  const graph = [
    organizationNode(),
    websiteNode(),
    webPageNode({
      url,
      name: fullTitle,
      description,
      schemaType,
      image: pageImage,
      hasBreadcrumb: !!crumbs,
      hasFaq: !!faq,
      dateModified: schemaData.dateModified || schemaData.articleModifiedDate,
    }),
    crumbs,
    faq,
    itemListNode(url, schemaData.items, schemaData.itemsName),
    howToNode(url, schemaData.howTo),
  ]

  if (schemaType === 'service' || schemaType === 'market') {
    graph.push(serviceNode({
      url,
      name: schemaData.serviceName || title,
      description,
      areaServed: schemaData.areaServed,
      features: schemaData.features,
      image: schemaData.image,
    }))
  } else if (schemaType === 'article') {
    graph.push(articleNode({
      url,
      headline: title,
      description,
      image: pageImage,
      author: schemaData.articleAuthor,
      datePublished: schemaData.articleDate,
      dateModified: schemaData.articleModifiedDate,
      keywords: schemaData.articleKeywords,
      section: schemaData.articleSection,
    }))
  } else if (schemaType === 'pricing') {
    graph.push(priceCatalogNode(url, schemaData.catalog))
  } else if (schemaType === 'jobPosting') {
    graph.push(jobPostingNode({
      url,
      title: schemaData.jobTitle || title,
      description,
      datePosted: schemaData.datePosted,
      validThrough: schemaData.validThrough,
      jobLocation: schemaData.jobLocation,
      employmentType: schemaData.employmentType,
      department: schemaData.department,
    }))
  } else if (schemaType === 'project') {
    graph.push(creativeWorkNode({
      url,
      name: schemaData.projectName || title,
      description,
      image: pageImage,
      about: schemaData.about,
    }))
  }

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph.filter(Boolean) }

  return (
    <Helmet>
      {/* ── Primary Meta ───────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords"    content={keywords} />
      <link rel="canonical" href={url} />
      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}

      {/* ── Open Graph ─────────────────────────────────────────── */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:type"        content={schemaType === 'article' ? 'article' : 'website'} />
      <meta property="og:site_name"   content={COMPANY.name} />
      <meta property="og:locale"      content="en_IN" />
      <meta property="og:url"         content={url} />

      {/* ── Twitter Card ───────────────────────────────────────── */}
      <meta name="twitter:card"        content={SEO_DEFAULTS.twitterCard} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* ── JSON-LD (single linked graph) ──────────────────────── */}
      {!noIndex && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}

export default SEOHead
