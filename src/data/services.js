/**
 * data/services.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Primary Services Data & Helpers
 * ─────────────────────────────────────────────────────────────
 */

export const services = [
  {
    id: 'web-development',
    slug: 'web-development',
    aliases: ['professional-website-design', 'website-design', 'web-design'],
    title: 'Professional Website Design',
    tagline: 'High-Converting, Responsive & Modern Web Experiences',
    category: 'Web Development',
    icon: 'web',
    image: '/Image/advmen_service1.webp',
    description: 'Get a modern, responsive, and professional website designed to build trust, showcase your brand, and generate more business opportunities.',
    features: [
      'Modern UI/UX Design & Micro-Animations',
      'Responsive & Mobile-Tablet Optimization',
      'High Speed & Core Web Vitals Performance',
      'Custom CMS & Dynamic API Integrations',
      'SEO-Friendly HTML5 & Schema Markup'
    ],
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Node.js', 'Vite', 'GraphQL'],
    workflow: [
      { step: '01', title: 'Strategy & Wireframing', desc: 'User experience mapping, layout architecture, and high-converting funnel wireframes.' },
      { step: '02', title: 'UI/UX & Interactive Design', desc: 'Crafting pixel-perfect dark/light themes, typography tokens, and smooth motion effects.' },
      { step: '03', title: 'Frontend & Backend Build', desc: 'Clean React engineering with secure APIs, fast loading times, and CMS integration.' },
      { step: '04', title: 'QA & Production Launch', desc: 'Rigorous cross-browser testing, speed optimization, and seamless domain deployment.' }
    ]
  },
  {
    id: 'app-development',
    slug: 'app-development',
    aliases: ['android-ios-app-development', 'mobile-app-development', 'mobile-apps'],
    title: 'Android & iOS App Development',
    tagline: 'Native & Cross-Platform Mobile Applications Built for Scale',
    category: 'App Development',
    icon: 'mobile',
    image: '/Image/advmen_service2.webp',
    description: 'Build powerful and scalable mobile applications for Android and iOS with modern UI/UX, secure architecture, and seamless performance designed to grow your business.',
    features: [
      'Native Android (Kotlin/Java) Development',
      'iOS Swift & SwiftUI Engineering',
      'Cross-Platform React Native & Flutter',
      'Secure Cloud API & Database Integration',
      'App Store & Play Store Publishing'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Node.js'],
    workflow: [
      { step: '01', title: 'App Architecture & Specs', desc: 'Defining user journeys, database schemas, and offline sync capabilities.' },
      { step: '02', title: 'Mobile UI/UX Design', desc: 'Designing intuitive touch interfaces, gesture controls, and sleek dark modes.' },
      { step: '03', title: 'Development & API Sync', desc: 'Building fast native/hybrid code with biometric auth, push notifications, and payment gateways.' },
      { step: '04', title: 'Store Submission & Support', desc: 'Handling Play Store and App Store compliance, automated updates, and performance monitoring.' }
    ]
  },
  {
    id: 'e-commerce-solutions',
    slug: 'e-commerce-solutions',
    aliases: ['e-commerce-website-solutions', 'ecommerce-solutions', 'ecommerce'],
    title: 'E-Commerce Website & Solutions',
    tagline: 'Powerful, Secure & Scalable Online Stores',
    category: 'Web Development',
    icon: 'cart',
    image: '/Image/advmen_service3.webp',
    description: 'Build a powerful and secure e-commerce platform with a modern shopping experience, seamless payments, product management, and scalable technology designed to grow your online business.',
    features: [
      'Custom E-Commerce Storefront & Catalog',
      'Multi-Currency & Payment Gateway Integration',
      'Inventory, Orders & Shipping Management',
      'High-Converting One-Page Checkout',
      'Customer Accounts & Analytics Dashboard'
    ],
    technologies: ['Shopify', 'Next.js Commerce', 'WooCommerce', 'Stripe', 'Razorpay', 'MongoDB'],
    workflow: [
      { step: '01', title: 'Catalog Architecture', desc: 'Structuring product categories, filters, variants, and pricing logic.' },
      { step: '02', title: 'Storefront Engineering', desc: 'Building lightning-fast product pages, search systems, and cart drawer components.' },
      { step: '03', title: 'Payment & Logistics Setup', desc: 'Integrating encrypted payment gateways, tax engines, and automated shipping webhooks.' },
      { step: '04', title: 'Conversion Testing & Go Live', desc: 'Optimizing checkout velocity, cart recovery emails, and analytics tracking.' }
    ]
  },
  {
    id: 'branding',
    slug: 'branding',
    aliases: ['branding-visual-identity', 'brand-design'],
    title: 'Branding & Visual Identity',
    tagline: 'Crafting Iconic Brand Identities That Command Attention',
    category: 'Branding',
    icon: 'palette',
    image: '/Image/advmen_service4.webp',
    description: 'Establish a memorable brand persona with custom logos, typography systems, brand guidelines, and distinctive visual assets crafted for modern digital channels.',
    features: [
      'Logo Design & Brand Mark Creation',
      'Comprehensive Brand Guidelines (Style Guide)',
      'Typography & Harmonious Color Systems',
      'Business Cards, Letterheads & Social Kits',
      '3D Logo Mockups & Brand Assets'
    ],
    technologies: ['Adobe Illustrator', 'Figma', 'Photoshop', 'After Effects', 'Blender'],
    workflow: [
      { step: '01', title: 'Brand Discovery & Audit', desc: 'Analyzing target audience, competitors, and core brand mission.' },
      { step: '02', title: 'Concept Creation', desc: 'Sketching multiple visual directions, vector logos, and color palettes.' },
      { step: '03', title: 'Brand Book Design', desc: 'Documenting logo usage rules, font hierarchies, and print/digital specs.' },
      { step: '04', title: 'Asset Delivery', desc: 'Providing vector SVG/EPS, PNG, PDF, and social media brand kits.' }
    ]
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    aliases: ['digital-marketing-growth', 'performance-marketing'],
    title: 'Digital Marketing & Growth',
    tagline: 'Targeted Campaigns That Drive Conversions & Revenue',
    category: 'Digital Marketing',
    icon: 'trending',
    image: '/Image/advmen_service5.webp',
    description: 'Scale customer acquisition with ROI-driven performance marketing, targeted PPC ads, conversion funnel optimization, and retargeting automation.',
    features: [
      'Google Ads & Meta (FB/IG) Paid Campaigns',
      'Targeted Lead Generation & Funnel Build',
      'Social Media Marketing & Brand Awareness',
      'Conversion Rate Optimization (CRO)',
      'Detailed Performance Analytics & Reporting'
    ],
    technologies: ['Google Analytics 4', 'Meta Ads Manager', 'Google Ads', 'HubSpot', 'Mailchimp'],
    workflow: [
      { step: '01', title: 'Audience & Keyword Mapping', desc: 'Identifying high-intent search keywords and hyper-targeted demographics.' },
      { step: '02', title: 'Ad Creative & Copywriting', desc: 'Crafting high-converting visual ads, hooks, and landing page funnels.' },
      { step: '03', title: 'Campaign Launch & Testing', desc: 'Running A/B split tests on ad copy, bid strategies, and audience segments.' },
      { step: '04', title: 'Scale & ROI Optimization', desc: 'Pruning underperforming ads and scaling winning campaigns to maximize ROI.' }
    ]
  },
  {
    id: 'seo',
    slug: 'seo',
    aliases: ['search-engine-optimization', 'seo-growth'],
    title: 'SEO & Organic Search Optimization',
    tagline: 'Rank Higher on Google & Attract Organic Customers',
    category: 'SEO',
    icon: 'search',
    image: '/Image/advmen_service6.webp',
    description: 'Dominate Google search results with technical SEO audits, strategic keyword targeting, high-authority backlink outreach, and continuous content optimization.',
    features: [
      'Technical Site Audit & Core Web Vitals',
      'Keyword Research & Content Strategy',
      'On-Page Optimization & Meta Structuring',
      'High-Authority Backlink Building',
      'Local SEO & Google Business Profile Optimization'
    ],
    technologies: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Screaming Frog', 'Yoast SEO'],
    workflow: [
      { step: '01', title: 'In-Depth Technical Audit', desc: 'Finding site speed bottlenecks, broken links, crawl errors, and indexing gaps.' },
      { step: '02', title: 'Keyword & Competitor Strategy', desc: 'Uncovering high-volume buyer keywords your competitors are missing.' },
      { step: '03', title: 'On-Page & Schema Enhancements', desc: 'Optimizing titles, headers, image ALT tags, internal links, and JSON-LD schema.' },
      { step: '04', title: 'Link Building & Rank Tracking', desc: 'Earning quality backlinks and monitoring monthly keyword ranking improvements.' }
    ]
  },
  {
    id: 'political-campaigns',
    slug: 'political-campaigns',
    aliases: ['political-digital-campaigns', 'campaign-management'],
    title: 'Political Campaigns & Digital Strategy',
    tagline: 'Strategic Outreach, Voter Targeting & Public Sentiment',
    category: 'Marketing',
    icon: 'megaphone',
    image: '/Image/advmen_service7.webp',
    description: 'Data-driven digital campaign management for political leaders, featuring targeted broadcast communication, sentiment tracking, social media outreach, and PR management.',
    features: [
      'Precision Voter Micro-Targeting',
      'Social Media War Room & Broadcast Strategy',
      'Public Sentiment Analysis & PR Management',
      'WhatsApp & Regional Language Outreach',
      'Event Broadcast & Live Streaming Management'
    ],
    technologies: ['Data Analytics', 'Social Listening Tools', 'Bulk Messaging APIs', 'Canva Pro', 'OBS Studio'],
    workflow: [
      { step: '01', title: 'Constituency Mapping', desc: 'Analyzing voter demographics, key issues, and digital channel penetration.' },
      { step: '02', title: 'Content & Narrative Creation', desc: 'Developing persuasive regional language videos, infographics, and speeches.' },
      { step: '03', title: 'Multi-Channel Execution', desc: 'Deploying targeted ads, broadcast updates, and interactive social posts.' },
      { step: '04', title: 'Sentiment Monitoring', desc: 'Real-time tracking of public reaction and rapid response management.' }
    ]
  },
  {
    id: 'media-production',
    slug: 'media-production',
    aliases: ['media-production-video', 'video-editing'],
    title: 'Media Production & Video Content',
    tagline: 'High-Quality Visual Storytelling & Commercial Video',
    category: 'Media',
    icon: 'video',
    image: '/Image/advmen_service8.webp',
    description: 'From promotional commercials to corporate walkthroughs and 3D visual graphics, we produce captivating video content that engages audiences and boosts brand authority.',
    features: [
      'Corporate Commercials & Ad Videos',
      '3D Motion Graphics & Visual Effects',
      'Product Showcase & Reel Production',
      'Drone Aerial Videography',
      'Professional Voiceover & Sound Design'
    ],
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Blender', 'Cinema 4D'],
    workflow: [
      { step: '01', title: 'Concept & Scriptwriting', desc: 'Fleshing out storyboards, voiceover scripts, and shooting schedules.' },
      { step: '02', title: 'Production & Filming', desc: 'High-definition camera setups, professional lighting, and audio capture.' },
      { step: '03', title: 'Post-Production Editing', desc: 'Color grading, motion graphics transitions, sound effects, and music mixing.' },
      { step: '04', title: 'Multi-Format Export', desc: 'Delivering optimized 4K files for TV, web, YouTube, and mobile social reels.' }
    ]
  },
  {
    id: 'content-creation',
    slug: 'content-creation',
    aliases: ['content-creation-copywriting', 'copywriting'],
    title: 'Content Creation & Copywriting',
    tagline: 'Persuasive Copy & Engaging Content That Converts',
    category: 'Content',
    icon: 'edit',
    image: '/Image/advmen_service9.webp',
    description: 'Strategic copywriting and content creation that articulates your value proposition, drives user engagement, and turns casual visitors into loyal customers.',
    features: [
      'High-Converting Landing Page Copy',
      'Technical Blog Posts & SEO Articles',
      'Social Media Content Calendars & Reels Copy',
      'Email Marketing Sequences & Newsletters',
      'Company Profiles & Pitch Deck Content'
    ],
    technologies: ['Grammarly', 'Surfer SEO', 'Notion', 'ChatGPT Enterprise', 'Canva'],
    workflow: [
      { step: '01', title: 'Brand Tone Audit', desc: 'Understanding your unique brand voice, customer pain points, and product differentiators.' },
      { step: '02', title: 'Content Outline & Drafting', desc: 'Structuring engaging headlines, persuasive body copy, and strong call-to-actions.' },
      { step: '03', title: 'SEO & Readability Tuning', desc: 'Optimizing text for search engine crawlers while preserving natural human flow.' },
      { step: '04', title: 'Final Proof & Publishing', desc: 'Polishing grammar, formatting with visuals, and scheduling across channels.' }
    ]
  }
]

/**
 * Find service item by slug, id, or alias
 */
export const getServiceBySlug = (slug) => {
  if (!slug) return null
  const raw = String(slug).trim()
  let decoded = raw
  try {
    decoded = decodeURIComponent(raw).trim()
  } catch (e) {
    /* ignore decode error */
  }

  const cleanRaw = raw.toLowerCase()
  const cleanDecoded = decoded.toLowerCase()
  const slugified = cleanDecoded.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

  return (
    services.find((s) => {
      const sSlug = String(s.slug || '').toLowerCase()
      const sId = String(s.id || '').toLowerCase()
      const sTitle = String(s.title || '').toLowerCase()
      const sTitleSlug = sTitle.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

      return (
        sSlug === cleanRaw ||
        sSlug === cleanDecoded ||
        sSlug === slugified ||
        sId === cleanRaw ||
        sId === cleanDecoded ||
        sId === slugified ||
        sTitle === cleanDecoded ||
        sTitleSlug === slugified ||
        (Array.isArray(s.aliases) &&
          s.aliases.some(
            (a) =>
              a.toLowerCase() === cleanRaw ||
              a.toLowerCase() === cleanDecoded ||
              a.toLowerCase() === slugified
          ))
      )
    }) || null
  )
}

export const getServiceByCategory = (category) => {
  if (!category) return services
  return services.filter((s) => s.category.toLowerCase() === category.toLowerCase())
}

export const getServiceCategories = () => [
  ...new Set(services.map((s) => s.category))
]
