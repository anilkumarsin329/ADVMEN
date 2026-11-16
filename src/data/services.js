/**
 * data/services.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN — Primary Services Data & Helpers
 * ─────────────────────────────────────────────────────────────
 */

export const services = [
  {
    id: 'web-development',
    slug: 'web-development',
    aliases: ['professional-website-design', 'website-design', 'web-design'],
    title: 'Website Design & Development',
    tagline: 'High-Converting, Responsive & Modern Web Experiences',
    category: 'Web Development',
    icon: 'web',
    image: '/Image/advmen_service1.webp',
    description: 'Build a professional, responsive and SEO-friendly website with ADVMEN. We provide custom website design and development for businesses of all sizes.',
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
    title: 'Mobile App Development',
    tagline: 'Native & Cross-Platform Mobile Applications Built for Scale',
    category: 'App Development',
    icon: 'mobile',
    image: '/Image/advmen_service2.webp',
    description: 'Turn your app idea into reality with ADVMEN. We develop custom Android and iOS applications with user-friendly designs and scalable functionality.',
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
    title: 'E-commerce Development',
    tagline: 'Powerful, Secure & Scalable Online Stores',
    category: 'Web Development',
    icon: 'cart',
    image: '/Image/advmen_service3.webp',
    description: 'Build a high-performing online store with ADVMEN. Get custom e-commerce website development, responsive design, payment integration and optimized checkout experiences.',
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
    title: 'Branding & Logo Design',
    tagline: 'Crafting Iconic Brand Identities That Command Attention',
    category: 'Branding',
    icon: 'palette',
    image: '/Image/advmen_service4.webp',
    description: 'Build a memorable brand identity with ADVMEN\'s branding and logo design services. Get creative logos, brand visuals, color palettes and complete brand direction.',
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
    title: 'Digital Marketing',
    tagline: 'Targeted Campaigns That Drive Conversions & Revenue',
    category: 'Digital Marketing',
    icon: 'trending',
    image: '/Image/advmen_service5.webp',
    description: 'Grow your business with ADVMEN\'s digital marketing services. Get SEO, Google Ads, social media marketing, performance marketing and lead generation solutions.',
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
    title: 'SEO Services',
    tagline: 'Rank Higher on Google & Attract Organic Customers',
    category: 'SEO',
    icon: 'search',
    image: '/Image/advmen_service6.webp',
    description: 'Improve your search visibility with ADVMEN\'s SEO services. Get technical SEO, keyword research, on-page optimization, link building and local SEO solutions.',
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
    id: 'aeo-geo',
    slug: 'aeo-geo',
    aliases: ['ai-search-optimization', 'aeo-and-geo', 'ai-seo'],
    title: 'AEO & GEO',
    tagline: 'Be the Answer in Search, Answer Engines & AI Platforms',
    category: 'SEO',
    icon: 'search',
    image: '/Image/advmen_service10.webp',
    description: 'Improve your brand\'s visibility across AI-powered search platforms with ADVMEN\'s AEO and GEO services. Build authority through structured content and search optimization.',
    features: [
      'Conversational query research',
      'Search-intent analysis',
      'Entity optimization',
      'Topical authority',
      'FAQ and question-led content',
      'Schema and structured data',
      'Author and brand credibility signals',
      'Internal linking and site architecture',
      'Relevant third-party mentions',
      'AI search visibility monitoring'
    ],
    technologies: ['Schema.org', 'Google Search Console', 'ChatGPT', 'Perplexity', 'Google AI Overviews'],
    workflow: [
      { step: '01', title: 'Query & Intent Research', desc: 'Mapping the conversational questions your customers actually ask search engines and AI tools.' },
      { step: '02', title: 'Entity & Authority Build-Out', desc: 'Clarifying who you are, what you offer, and the credibility signals that back it up.' },
      { step: '03', title: 'Answer-Ready Content & Schema', desc: 'Question-led content, FAQ markup and structured data that answer engines can read and cite.' },
      { step: '04', title: 'AI Visibility Monitoring', desc: 'Tracking how your brand is represented and cited across AI-driven search experiences.' }
    ]
  },
  {
    id: 'performance-marketing',
    slug: 'performance-marketing',
    aliases: ['paid-media', 'paid-ads', 'ppc'],
    title: 'Performance Marketing',
    tagline: 'Paid Media That Does More Than Rack Up Views',
    category: 'Digital Marketing',
    icon: 'marketing',
    image: '/Image/advmen_service5.webp',
    description: 'Paid media should do more than rack up views. We run performance-driven campaigns shaped by your actual business goals, your audience, and the channels that matter. From campaign planning and creative direction to optimization and reporting, we align paid acquisition with the wider digital strategy.',
    features: [
      'Paid Search',
      'Social Ads',
      'Campaign Strategy',
      'Conversion Optimization',
      'Performance Analytics'
    ],
    technologies: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'GA4', 'Looker Studio'],
    workflow: [
      { step: '01', title: 'Goal & Audience Mapping', desc: 'Defining acquisition targets, audiences and the channels worth your budget.' },
      { step: '02', title: 'Campaign Strategy & Creative', desc: 'Planning campaigns, messaging and creative direction around real business objectives.' },
      { step: '03', title: 'Launch & Optimization', desc: 'Testing, refining and scaling what works while cutting what does not.' },
      { step: '04', title: 'Reporting & Analytics', desc: 'Transparent performance reporting tied to leads, conversions and revenue signals.' }
    ]
  },
  {
    id: 'social-media-marketing',
    slug: 'social-media-marketing',
    aliases: ['social-media', 'smm'],
    title: 'Social Media Management',
    tagline: 'Build Familiarity, Conversations & a Lasting Presence',
    category: 'Digital Marketing',
    icon: 'marketing',
    image: '/Image/advmen_service7.webp',
    description: 'Grow your brand on social media with ADVMEN. Get strategic content planning, creative posts, social media management and audience engagement solutions.',
    features: [
      'Social Media Strategy',
      'Content Planning',
      'Content Calendars',
      'Creative Direction',
      'Platform Management',
      'Audience Engagement',
      'Performance Analysis'
    ],
    technologies: ['Instagram', 'LinkedIn', 'Facebook', 'YouTube', 'Meta Business Suite'],
    workflow: [
      { step: '01', title: 'Strategy & Positioning', desc: 'Choosing the platforms, themes and voice that fit your brand and audience.' },
      { step: '02', title: 'Content Planning & Calendars', desc: 'Planning creative content and publishing calendars around what your audience responds to.' },
      { step: '03', title: 'Publishing & Engagement', desc: 'Managing platforms and engaging with your audience consistently.' },
      { step: '04', title: 'Performance Analysis', desc: 'Measuring reach, engagement and conversions to keep refining the plan.' }
    ]
  },
  {
    id: 'content-marketing',
    slug: 'content-marketing',
    aliases: ['content-marketing-agency', 'seo-content'],
    title: 'Content Marketing',
    tagline: 'Content That Puts Your Audience First',
    category: 'Content',
    icon: 'content',
    image: '/Image/advmen_service9.webp',
    description: 'Good content must be more than just filler on a website. We are a content marketing agency in India that puts your audience first. We create content based on what people are searching for and what your brand stands for.',
    features: [
      'Content Strategy & Planning',
      'SEO Content & Blog Writing',
      'Website & Service Page Content',
      'Leadership & Authority Content',
      'AEO & AI-Search Content',
      'Content Refresh & Optimisation',
      'Content Distribution & Repurposing',
      'Content Performance & Insights'
    ],
    technologies: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Notion', 'WordPress'],
    workflow: [
      { step: '01', title: 'Audience & Search Research', desc: 'Understanding what people search for and where your brand can genuinely help.' },
      { step: '02', title: 'Content Strategy & Planning', desc: 'Building topic clusters, editorial calendars and clear content goals.' },
      { step: '03', title: 'Create & Optimise', desc: 'Writing and refreshing content for search, answer engines and real readers.' },
      { step: '04', title: 'Distribute & Measure', desc: 'Repurposing across channels and tracking performance to guide the next cycle.' }
    ]
  },
  {
    id: 'website-development',
    slug: 'website-development',
    aliases: ['website-development-company-in-india', 'web-design-development'],
    title: 'UI/UX Design',
    tagline: 'Your Digital Headquarters, Built to Convert',
    category: 'Web Development',
    icon: 'web',
    image: '/Image/advmen_service1.webp',
    description: 'Create better digital experiences with ADVMEN\'s UI/UX design services. Get intuitive interfaces, user-friendly layouts, smooth navigation and engaging designs.',
    features: [
      'Custom Website Development',
      'Business Website Development',
      'Corporate Website Development',
      'Healthcare Website Development',
      'E-commerce Development',
      'Landing Page Development',
      'UI/UX Design',
      'Website Performance Optimization',
      'CMS Development',
      'API Integration'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'WordPress', 'Shopify'],
    workflow: [
      { step: '01', title: 'Discovery & Planning', desc: 'Clarifying goals, audience, structure and technical requirements.' },
      { step: '02', title: 'UI/UX Design', desc: 'Designing responsive, usable interfaces built around conversion journeys.' },
      { step: '03', title: 'Development & Integration', desc: 'Building on a solid technical foundation with CMS, APIs and integrations.' },
      { step: '04', title: 'Performance, QA & Launch', desc: 'Speed optimization, cross-device testing and a clean production launch.' }
    ]
  },
  {
    id: 'custom-crm-development',
    slug: 'custom-crm-development',
    aliases: ['crm-development', 'crm-software', 'custom-crm'],
    title: 'Custom CRM Development',
    tagline: 'Simplify Business Operations with a CRM Built for You',
    category: 'Web Development',
    icon: 'web',
    image: '/Image/advmen_service1.webp',
    description: 'Simplify business operations with custom CRM development by ADVMEN. Manage leads, customer data, sales follow-ups, reporting and workflows in one system.',
    features: [
      'Lead & Contact Management',
      'Sales Pipeline & Follow-up Tracking',
      'Custom Workflow Automation',
      'Reporting & Analytics Dashboard',
      'Third-party API & Tool Integration'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    workflow: [
      { step: '01', title: 'Requirements & Mapping', desc: 'Understanding your sales process, team structure, and data management needs.' },
      { step: '02', title: 'CRM Architecture & Design', desc: 'Designing intuitive dashboards, pipelines, and user roles tailored to your workflow.' },
      { step: '03', title: 'Development & Integration', desc: 'Building the CRM with custom modules, automation, and third-party integrations.' },
      { step: '04', title: 'Testing & Deployment', desc: 'QA testing, team onboarding, and production deployment with ongoing support.' }
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

// ── Sub-service pages: /services/<parent>/<sub> ────────────────────────────
const SUB_PAGE_DEFS = {
  'website-development/business': {
    title: 'Business Website Development',
    tagline: 'A Professional Website That Builds Trust and Brings Enquiries',
    description: 'We build business websites that explain what you do clearly, build credibility with first-time visitors and turn that attention into enquiries — fast, responsive and easy to manage.',
    features: ['Clear service and about pages', 'Mobile-first responsive design', 'SEO-ready structure', 'Lead and enquiry forms', 'Fast loading performance'],
  },
  'website-development/corporate': {
    title: 'Corporate Website Development',
    tagline: 'Scalable Websites for Established Organisations',
    description: 'Corporate websites need structure, consistency and room to grow. We design and build scalable sites that present your organisation, leadership and offerings with clarity.',
    features: ['Scalable multi-section architecture', 'CMS for team-managed content', 'Brand-consistent design system', 'Investor, careers and news sections', 'Security and performance best practices'],
  },
  'website-development/healthcare': {
    title: 'Healthcare Website Development',
    tagline: 'Clear, Accessible and Trustworthy for Patients',
    description: 'Healthcare websites should be easy to understand and easy to act on. We build clear, accessible sites for clinics, hospitals and practitioners with patient-friendly journeys.',
    features: ['Doctor and department pages', 'Appointment and enquiry flows', 'Accessible, readable design', 'Local SEO foundations', 'Fast, mobile-friendly experience'],
  },
  'website-development/ecommerce': {
    title: 'E-commerce Development',
    tagline: 'Online Stores Built for Conversion and Scale',
    description: 'ADVMEN develops e-commerce websites complete with product catalogs, payment gateways, integrations, responsive designs, and scalable features.',
    features: ['Product catalogs and filters', 'Payment gateway integration', 'Order and inventory integrations', 'Responsive checkout experience', 'Scalable architecture'],
  },
  'website-development/landing-page': {
    title: 'Landing Page Development',
    tagline: 'Purpose-Built Pages for Campaigns and Offers',
    description: 'Purpose-built digital experiences designed to support specific campaigns, offers, and conversion journeys — focused, fast and measurable.',
    features: ['Single-goal page structure', 'Conversion-focused copy and layout', 'Fast loading and mobile-first', 'Form and tracking integration', 'A/B-test friendly build'],
  },
  'app-development/android': {
    title: 'Android App Development',
    tagline: 'Fast, Reliable Apps for the Android Ecosystem',
    description: 'We design and develop Android apps built for speed, smooth user experience and flawless integration with your digital presence.',
    features: ['Native and modern Android development', 'Material-style UI/UX design', 'API and backend integration', 'Play Store release support', 'Performance optimization'],
  },
  'app-development/ios': {
    title: 'iOS App Development',
    tagline: 'Polished Apps for iPhone and iPad',
    description: 'We design and develop iOS apps with a smooth user experience, clean interface and reliable integration with your backend and digital products.',
    features: ['Native iOS development', 'Human-interface-aligned UI/UX', 'API and backend integration', 'App Store release support', 'Performance optimization'],
  },
  'app-development/cross-platform': {
    title: 'Cross-Platform App Development',
    tagline: 'One Codebase, Android and iOS',
    description: 'Cross-platform development lets you reach Android and iOS users from a single codebase, with consistent design and efficient delivery.',
    features: ['Single codebase for both platforms', 'Consistent UI/UX', 'Faster delivery cycles', 'API and backend integration', 'Performance tuning'],
  },
  'app-development/custom-mobile-app': {
    title: 'Custom Mobile App Development',
    tagline: 'Mobile Products Built Around Your Idea',
    description: 'From first concept to launch, we build custom mobile applications shaped around your users, workflows and business goals.',
    features: ['Product discovery and scoping', 'Custom UI/UX design', 'Scalable architecture', 'Third-party integrations', 'Testing and launch support'],
  },
  'app-development/business-enterprise': {
    title: 'Business & Enterprise Apps',
    tagline: 'Mobile Tools for Teams and Operations',
    description: 'We build business and enterprise applications that streamline operations, connect teams and integrate with the systems you already use.',
    features: ['Workflow and operations apps', 'Role-based access', 'System and API integration', 'Secure data handling', 'Scalable architecture'],
  },
  'app-development/ecommerce-app': {
    title: 'E-commerce Apps',
    tagline: 'Shopping Experiences That Fit in a Pocket',
    description: 'We build e-commerce apps with product browsing, secure checkout and integrations that make buying simple on mobile.',
    features: ['Catalog and search', 'Cart and secure checkout', 'Payment gateway integration', 'Order tracking', 'Backend and inventory integration'],
  },
  'app-development/booking-service-app': {
    title: 'Booking & Service Apps',
    tagline: 'Let Customers Book in a Few Taps',
    description: 'We build booking and service apps that handle scheduling, availability and payments with a simple customer journey.',
    features: ['Slot and availability management', 'Customer and provider flows', 'Payments and confirmations', 'Notifications and reminders', 'Admin dashboard'],
  },
  'app-development/api-backend-integration': {
    title: 'API & Backend Integration',
    tagline: 'Connect Your Apps, Websites and Platforms',
    description: 'ADVMEN provides API development and third-party integrations to connect websites, mobile applications, e-commerce platforms, and custom digital products.',
    features: ['REST API design and development', 'Third-party service integration', 'Authentication and security', 'Data sync across platforms', 'Documentation and monitoring'],
  },
}

const subPageKey = (s) => String(s || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '')

export const getSubPages = (parentSlug) =>
  Object.keys(SUB_PAGE_DEFS)
    .filter((k) => k.startsWith(subPageKey(parentSlug) + '/'))
    .map((k) => ({ slug: k, title: SUB_PAGE_DEFS[k].title, href: '/services/' + k }))

export const getParentService = (compositeSlug) => {
  const parent = subPageKey(compositeSlug).split('/')[0]
  return services.find((s) => s.slug === parent) || null
}

const buildSubPage = (key) => {
  const def = SUB_PAGE_DEFS[key]
  const parent = getParentService(key)
  if (!def || !parent) return null
  return {
    ...parent,
    ...def,
    id: key,
    slug: key,
    aliases: [],
    parentSlug: parent.slug,
    technologies: parent.technologies,
    workflow: parent.workflow,
  }
}

const SLUG_ALIASES = {
  'seo-geo-optimization': 'aeo-geo',
  'social-media-management': 'social-media-marketing',
  'professional-website-design': 'website-development',
  'branding-logo-design': 'branding',
  'ui-ux-design': 'website-development',
  'uiux-design': 'website-development',
}

export const getServiceBySlug = (slugInput) => {
  if (!slugInput) return null
  const compositeKey = subPageKey(slugInput)
  if (compositeKey.includes('/')) return buildSubPage(compositeKey)
  const slug = SLUG_ALIASES[String(slugInput).trim().toLowerCase()] || slugInput
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
