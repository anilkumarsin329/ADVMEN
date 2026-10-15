/**
 * data/pricing.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — Pricing 2026 (source: "ADVMEN Pricing 2026.html")
 *
 * Starting rates in INR and USD. AED is derived from USD at
 * USD_TO_AED (indicative). GST extra. Final quote depends on scope.
 * ─────────────────────────────────────────────────────────────
 */

export const USD_TO_AED = 3.6725

// [name, inr, usd, unit, notes (|-separated), pill, subtitle]
const RAW = {
  'Bundles': [
    ['Digital Starter', '15,000', '450', '/month', '8 creatives|Basic social scheduling|Monthly summary', '', 'Monthly bundle'],
    ['Growth Bundle', '30,000', '900', '/month', '12 creatives|4 edits from supplied footage|One growth channel|Monthly report', 'Most Popular', 'Monthly bundle'],
    ['Digital Growth Plus', '55,000', '1,600', '/month', 'Multi-channel planning|SEO / ads management|Creative support within agreed scope', 'Best Value', 'Monthly bundle'],
  ],
  'SEO & Growth': [
    ['SEO Audit', '10,000', '300', 'one-time', 'Technical, on-page and priority review|Action plan'],
    ['SEO Local', '15,000', '450', '/month', 'Agreed keywords|On-page work|Local visibility tasks|Monthly report'],
    ['SEO Growth', '25,000', '750', '/month', 'Technical + content optimisation|Monthly reporting', 'Most Popular'],
    ['GEO / AI Search', '20,000', '600', '/month', 'Entity/content structure|Answer-focused content|AI visibility monitoring', 'Best Value'],
    ['GBP Setup', '4,000', '120', 'one-time', 'Setup and optimisation where eligible'],
    ['GBP Management', '6,500', '200', '/month', 'Updates and posts|Profile maintenance'],
    ['Google Ads', '10,000', '300', '/month', 'One account/platform|Ad spend paid separately'],
    ['Meta Ads', '10,000', '300', '/month', 'Facebook/Instagram campaigns|Media spend extra'],
    ['Performance Marketing', '25,000', '750', '/month', 'Multi-campaign optimisation|Ad spend and creatives extra'],
    ['SEO Blog Writing', '2,500', '90', '/article', 'Standard brief and length|Research-heavy quoted separately'],
    ['Email Marketing Setup', '10,000', '300', 'one-time', 'Platform setup|One campaign template'],
    ['Email / CRM Automation', '20,000', '600', 'project', 'Agreed triggers|Templates and workflows'],
    ['Lead Gen Setup', '15,000', '500', 'one-time', 'Campaign/funnel setup|Lead volume not guaranteed'],
    ['Social Starter', '12,000', '350', '/month', 'Up to 8 creatives|Agreed platforms'],
    ['Social Growth', '25,000', '750', '/month', '12 creatives|4 short-form edits'],
    ['Social Premium', '45,000', '1,300', '/month', 'Higher content volume|Planning and reporting'],
  ],
  'Web & Software': [
    ['Landing Page', '15,000', '450', 'one-time', '1 page, responsive|Lead/contact form|Basic on-page SEO'],
    ['Business Website', '30,000', '900', 'one-time', '5–8 standard pages|Contact form|Basic SEO setup'],
    ['Corporate Website', '55,000', '1,500', 'one-time', '8–15 pages|CMS where scoped|Analytics setup'],
    ['WordPress Website', '25,000', '750', 'one-time', 'Theme configuration|Core pages|Standard plugins'],
    ['E-commerce Website', '65,000', '1,900', 'one-time', 'Product catalogue|Cart and checkout|Payment gateway'],
    ['Custom Web App / MVP', '1,25,000', '3,800', 'project', 'Defined modules|Authentication and database|Admin views'],
    ['CRM / Booking System', '1,50,000', '4,500', 'project', 'Scoped workflows and roles|Dashboards and reports'],
    ['MERN Development', '1,25,000', '3,800', 'project', 'React, Node/Express, MongoDB|Estimate after requirements'],
    ['Android App', '1,00,000', '3,200', 'project', 'Core app flows|Backend/API integration'],
    ['iOS + Android App', '1,80,000', '5,500', 'project', 'Shared codebase|Store fees extra'],
  ],
  'Design & Cloud': [
    ['UI/UX Landing Page', '10,000', '300', 'one-time', 'Wireframe|Polished one-page design'],
    ['UI/UX Website', '25,000', '750', 'project', 'Core website screens|Responsive states|Handoff'],
    ['UI/UX App / Dashboard', '40,000', '1,200', 'project', 'Key user flows|Screen designs'],
    ['Logo Design', '5,000', '200', 'one-time', 'Concepts|Final logo|Standard export files'],
    ['Brand Identity Kit', '20,000', '600', 'one-time', 'Logo usage|Colours and typography|Basic guidelines'],
    ['Company Profile', '6,500', '220', 'one-time', 'Layout and design|Printing extra'],
    ['Pitch Deck', '7,500', '250', 'project', 'Scope by slide count|Content readiness'],
    ['API Integration', '10,000', '300', 'per integration', 'Standard third-party API'],
    ['Payment Gateway', '10,000', '350', 'one-time', 'Standard integration|Provider fees excluded'],
    ['Cloud / Server Setup', '12,500', '450', 'one-time', 'Basic deployment/config|Cloud usage separate'],
    ['Website Maintenance', '6,500', '200', '/month', 'Routine updates|Basic checks'],
    ['Tech Support / Bug Fix', '1,250', '45', '/hour', 'Or scoped by project'],
  ],
  'AI & Creative': [
    ['WhatsApp Automation', '15,000', '500', 'setup', 'API integration|Basic flows and testing'],
    ['AI Chatbot', '20,000', '650', 'setup', 'Website chatbot|Agreed knowledge sources|Human handoff'],
    ['Custom AI Assistant', '45,000', '1,300', 'project', 'Defined tasks|Integrations and guardrails'],
    ['CRM Setup', '25,000', '750', 'project', 'Pipeline and fields|Roles and basic automation'],
    ['Process Automation', '25,000', '750', 'project', 'One defined workflow'],
    ['Reel Editing', '1,250', '50', '/video', 'Client-supplied footage|One revision round'],
    ['Promo Video / Ad', '10,000', '350', 'per video', 'Short-form concept/edit|Shoot extra'],
    ['AI Video', '6,500', '250', 'per video', 'Depends on duration|Generation credits extra'],
    ['Product Photography', '10,000', '350', '/session', 'Basic shoot and edit'],
    ['Brand Video Shoot', '20,000', '650', '/session', 'Crew/equipment per quote'],
    ['Monthly Content', '25,000', '800', '/month', 'Volume defined in scope'],
    ['Reputation Support', '12,500', '400', '/month', 'Monitoring|Response guidance'],
  ],
}

const toAed = (usd) => {
  const n = parseFloat(String(usd).replace(/,/g, ''))
  return (Math.round((n * USD_TO_AED) / 5) * 5).toLocaleString('en-US')
}

export const pricingTabs = Object.keys(RAW)

export const pricingData = Object.fromEntries(
  Object.entries(RAW).map(([tab, rows]) => [
    tab,
    rows.map(([name, inr, usd, unit, notes, pill, subtitle]) => {
      const isMonthly = unit.startsWith('/')
      return {
        name,
        inr,
        usd,
        aed: toAed(usd),
        unit,
        // "/month" renders as "/month"; others as "· one-time"
        unitLabel: isMonthly ? ` ${unit}` : ` · ${unit}`,
        // plain-words unit shown under the price, e.g. "per month"
        unitWords: unit.replace('/', 'per '),
        // Bundles are fixed prices; everything else is "starting from"
        plus: tab !== 'Bundles',
        subtitle: subtitle || (isMonthly ? 'Monthly service' : 'Starting rate'),
        features: notes.split('|'),
        tag: pill || null,
      }
    }),
  ])
)

export const pricingNote =
  'Proposed starting prices for planning. Final scope, taxes, timeline and payment milestones are confirmed in a written quotation. AED values are indicative (1 USD = 3.6725 AED). Rankings, leads and sales cannot be guaranteed.'
