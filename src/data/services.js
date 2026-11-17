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
    aliases: ['e-commerce-website-solutions', 'ecommerce-solutions', 'ecommerce', 'ecommerce-website-development', 'e-commerce-website-development', 'e-commerce-development', 'ecommerce-development', 'online-store-development'],
    title: 'E-Commerce Website & Solutions',
    tagline: 'Online Stores Built to Sell, Scale, and Grow',
    category: 'Web Development',
    icon: 'cart',
    image: '/Image/advmen_service3.webp',
    description: 'Build a powerful and secure e-commerce platform with a modern shopping experience, seamless payments, product management, and scalable technology designed to grow your online business.',
    features: [
      'Custom E-Commerce Website',
      'Modern UI/UX',
      'Mobile Responsive Design',
      'Product Management',
      'Category Management',
      'Shopping Cart',
      'Wishlist',
      'Secure Checkout',
      'Payment Gateway Integration',
      'Order Management',
      'Customer Accounts',
      'Coupon & Discount Management',
      'Inventory Management',
      'Shipping Integration',
      'Admin Dashboard',
      'SEO-Friendly Structure',
      'Analytics Integration',
      'Security & Performance Optimization',
    ],
    technologies: ['Shopify', 'WooCommerce', 'Next.js Commerce', 'Stripe', 'Razorpay', 'MongoDB'],
    workflow: [
      { step: '01', title: 'Understand', desc: 'We learn about your products, customers, and sales goals. A short call and a few questions help us see what your store needs to do.' },
      { step: '02', title: 'Plan & Design', desc: 'We map out your menu, product pages, and checkout path — then design the key pages from home to checkout with your feedback.' },
      { step: '03', title: 'Build & Integrate', desc: 'Our developers build the working store with cart, payments, shipping, and product uploads all set up and connected.' },
      { step: '04', title: 'Launch & Support', desc: 'We test on real phones and browsers, run sample orders, fix any issues, then take the store live and support you beyond launch.' },
    ]
  },
  {
    id: 'branding',
    slug: 'branding',
    aliases: ['branding-visual-identity', 'brand-design', 'branding-logo-design', 'brand-identity-design', 'logo-design', 'brand-strategy', 'rebranding', 'business-branding'],
    title: 'Branding & Logo Design',
    tagline: 'Brands That Look Sharp, Sound Clear, and Feel True to Your Business',
    category: 'Branding',
    icon: 'palette',
    image: '/Image/advmen_service4.webp',
    description: 'Build a memorable brand with branding and logo design services. Get a clear identity, a strong message, and a consistent look across print and digital.',
    features: [
      'Brand Strategy',
      'Logo Design',
      'Brand Identity Design',
      'Brand Guidelines',
      'Rebranding Services',
      'Business Branding Services',
      'Digital Branding',
      'Stationery & Packaging Design',
      'Social Media Brand Kit',
      'Typography & Color Systems',
    ],
    technologies: ['Adobe Illustrator', 'Figma', 'Photoshop', 'After Effects', 'Blender'],
    workflow: [
      { step: '01', title: 'Discover', desc: 'We learn about your business, audience, and goals. A short discussion and a few questions help us understand what makes you different.' },
      { step: '02', title: 'Strategy', desc: 'We define your message, tone, and place in the market. This gives the design a clear direction before any logo work begins.' },
      { step: '03', title: 'Design', desc: 'Our designers begin the visual identity design, from logo ideas to colors and fonts. You see the concepts and share your thoughts.' },
      { step: '04', title: 'Refine & Deliver', desc: 'We improve the chosen direction based on your feedback, then hand over final logo files, brand guidelines, and everything you need to launch.' },
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
    aliases: ['search-engine-optimization', 'seo-growth', 'seo-optimization', 'seo-services', 'seo-agency', 'technical-seo', 'local-seo', 'ecommerce-seo', 'seo-audit'],
    title: 'SEO Optimization Services',
    tagline: 'Diagnose, Fix, and Grow — SEO Built Around Your Revenue Goals',
    category: 'SEO',
    icon: 'search',
    image: '/Image/advmen_service6.webp',
    description: 'Grow qualified organic traffic with SEO optimization services covering technical fixes, content, links, and clear reporting. Book your audit today.',
    features: [
      'Technical SEO Services',
      'On-Page SEO',
      'Content and Keyword Strategy',
      'Internal Linking and Site Architecture',
      'Off-Page SEO and Authority Building',
      'Local SEO Services',
      'E-Commerce SEO',
      'SEO Audit and Strategy',
      'Core Web Vitals Optimisation',
      'Structured Data and Schema Markup',
    ],
    technologies: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Screaming Frog', 'GA4'],
    workflow: [
      { step: '01', title: 'Audit and Strategy', desc: 'We crawl your site, review Search Console and GA4 data, assess content and backlinks, and benchmark competitors. You receive findings in plain language.' },
      { step: '02', title: 'Roadmap', desc: 'Findings become a prioritised plan ranked by impact and effort, with owners, dependencies, and timelines for the first 30, 60, and 90 days.' },
      { step: '03', title: 'Implementation', desc: 'Quick wins ship first: indexation fixes, title and heading updates, and internal links. On-page improvements then roll out page by page.' },
      { step: '04', title: 'Measurement and Refinement', desc: 'We track impressions, clicks, rankings, and organic conversions. Reports tie search activity to revenue, and we adjust the roadmap as new data arrives.' },
    ]
  },
  {
    id: 'aeo-geo',
    slug: 'aeo-geo',
    aliases: ['aeo-geo-optimization', 'seo-geo-optimization', 'ai-search-optimization', 'aeo-and-geo', 'ai-seo', 'answer-engine-optimization', 'generative-engine-optimization'],
    title: 'AEO and GEO Optimization Services',
    tagline: 'Be Cited in AI Answers — Built on a Sound SEO Foundation',
    category: 'SEO',
    icon: 'search',
    image: '/Image/advmen_service10.webp',
    description: 'Get found in AI answers. Our AEO and GEO optimization services improve content clarity, entity signals, and AI visibility. Book an audit today.',
    features: [
      'Entity Clarity and Brand Consistency',
      'Answer-Led Content',
      'Topical Coverage and Content Gaps',
      'Structured Data for SEO',
      'Crawlability and Technical Access',
      'Source Credibility and Off-Site Signals',
      'Generative Search Visibility',
      'AI Visibility Optimization Reporting',
      'Prompt Testing Across AI Platforms',
      'Competitor Benchmarking in AI Answers'
    ],
    technologies: ['Schema.org', 'Google Search Console', 'ChatGPT', 'Perplexity', 'Google AI Overviews', 'Gemini', 'Microsoft Copilot'],
    workflow: [
      { step: '01', title: 'Discovery and Baseline', desc: 'We learn your services, audience, and goals, then test real buyer prompts across major AI platforms to see how your brand is described today.' },
      { step: '02', title: 'Audit', desc: 'We review content, entity consistency, markup, crawl access, and off-site signals, and compare your AI presence with competitors.' },
      { step: '03', title: 'Roadmap', desc: 'Findings become a prioritized plan ranked by impact and effort, with owners, dependencies, and timelines.' },
      { step: '04', title: 'Implementation', desc: 'We restructure content, add markup, fix technical barriers, and support off-site work in focused sprints.' },
      { step: '05', title: 'Monitoring and Refinement', desc: 'We track citations, brand mentions, referral traffic from AI platforms, and qualified leads, adjusting the plan as AI outputs shift.' }
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
    aliases: ['social-media', 'smm', 'social-media-management', 'instagram-management', 'linkedin-management', 'social-media-management-services'],
    title: 'Social Media Management',
    tagline: 'Plan, Create, Publish, and Monitor Your Social Presence',
    category: 'Digital Marketing',
    icon: 'marketing',
    image: '/Image/advmen_service7.webp',
    description: "ADVMEN's social media management services cover strategy, content creation, scheduling, community management, and reporting. Request a social media plan.",
    features: [
      'Social Media Strategy',
      'Audience and Platform Selection',
      'Monthly Social Media Calendar',
      'Social Media Content Creation',
      'Scheduling and Publishing',
      'Community Management',
      'Instagram Management',
      'LinkedIn Social Media Management',
      'Reporting and Review',
    ],
    technologies: ['Instagram', 'LinkedIn', 'Facebook', 'YouTube', 'Meta Business Suite'],
    workflow: [
      { step: '01', title: 'Discovery', desc: 'We review your goals, audience, current channels, and brand assets.' },
      { step: '02', title: 'Strategy & Platform Plan', desc: 'We recommend platforms, content themes, posting frequency, and success metrics for your approval.' },
      { step: '03', title: 'Brand Voice & Content Themes', desc: 'We document how your brand should sound and the topics it should own. You review and approve before any content goes live.' },
      { step: '04', title: 'Calendar, Creative & Launch', desc: 'We draft the monthly calendar and creative, get your approval, schedule content, and manage community engagement.' },
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
    title: 'E-Commerce Website Development',
    tagline: 'Online Stores Built to Sell, Scale, and Grow',
    description: 'ADVMEN builds e-commerce websites with custom design, payment gateway integration, mobile-friendly checkout, product management, and scalable architecture — everything your online store needs to grow.',
    features: ['Custom e-commerce website design', 'Payment gateway integration', 'Shopping cart & secure checkout', 'Order and inventory management', 'Mobile-friendly responsive design', 'SEO-friendly structure', 'Shipping integration', 'Admin dashboard'],
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
  'aeo-geo-optimization': 'aeo-geo',
  'answer-engine-optimization': 'aeo-geo',
  'generative-engine-optimization': 'aeo-geo',
  'ai-search-optimization': 'aeo-geo',
  'aeo-and-geo': 'aeo-geo',
  'ai-seo': 'aeo-geo',
  'seo-optimization': 'seo',
  'seo-services': 'seo',
  'search-engine-optimization': 'seo',
  'seo-growth': 'seo',
  'seo-agency': 'seo',
  'technical-seo': 'seo',
  'local-seo': 'seo',
  'ecommerce-seo': 'seo',
  'seo-audit': 'seo',
  'social-media-management': 'social-media-marketing',
  'smm': 'social-media-marketing',
  'instagram-management': 'social-media-marketing',
  'linkedin-management': 'social-media-marketing',
  'social-media-management-services': 'social-media-marketing',
  'professional-website-design': 'website-development',
  'branding-logo-design': 'branding',
  'brand-identity-design': 'branding',
  'logo-design': 'branding',
  'brand-strategy': 'branding',
  'rebranding': 'branding',
  'business-branding': 'branding',
  'ui-ux-design': 'website-development',
  'uiux-design': 'website-development',
  'ecommerce-website-development': 'e-commerce-solutions',
  'e-commerce-website-development': 'e-commerce-solutions',
  'e-commerce-development': 'e-commerce-solutions',
  'ecommerce-development': 'e-commerce-solutions',
  'online-store-development': 'e-commerce-solutions',
  'ecommerce-website-solutions': 'e-commerce-solutions',
  'e-commerce-website-solutions': 'e-commerce-solutions',
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
