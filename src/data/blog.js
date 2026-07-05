/**
 * data/blog.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Blog Articles Data
 * ─────────────────────────────────────────────────────────────
 */

export const blogArticles = [
  {
    id: 1,
    slug: 'react-19-performance-optimization',
    title: 'React 19 Performance Optimization: A Complete Guide',
    excerpt: 'Learn advanced techniques to optimize React 19 applications for maximum performance, including code splitting, lazy loading, and memoization strategies.',
    content: `React 19 brings significant performance improvements, but optimization is still crucial. This guide covers:

1. Code Splitting with React.lazy()
2. Memoization with useMemo and useCallback
3. Virtual scrolling for large lists
4. Image optimization techniques
5. Bundle size analysis

Key takeaways:
- Use React DevTools Profiler to identify bottlenecks
- Implement code splitting at route level
- Optimize images with modern formats (WebP, AVIF)
- Monitor Core Web Vitals
- Use production builds for testing

Performance metrics to track:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)`,
    category: 'React Development',
    author: 'Rajesh Kumar',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    tags: ['React', 'Performance', 'Optimization'],
  },
  {
    id: 2,
    slug: 'web-design-trends-2025',
    title: 'Web Design Trends 2025: What\'s Next?',
    excerpt: 'Explore the latest web design trends for 2025, from glassmorphism to AI-powered personalization and immersive 3D experiences.',
    content: `2025 brings exciting new design trends:

1. Glassmorphism Evolution
- Refined blur effects
- Layered transparency
- Micro-interactions

2. AI-Powered Personalization
- Dynamic content adaptation
- Predictive user journeys
- Smart recommendations

3. 3D & Immersive Design
- WebGL implementations
- Interactive 3D models
- Spatial computing

4. Sustainable Design
- Eco-friendly color palettes
- Minimal animations
- Optimized performance

5. Accessibility First
- WCAG 2.1 AA compliance
- Inclusive design patterns
- Voice interface support

Design tools to master:
- Figma for collaborative design
- Spline for 3D design
- Framer for prototyping
- Adobe XD for UX workflows`,
    category: 'Design Trends',
    author: 'Priya Sharma',
    date: 'Dec 10, 2024',
    readTime: '6 min read',
    tags: ['Design', 'Trends', 'UX'],
  },
  {
    id: 3,
    slug: 'seo-strategy-2025',
    title: 'SEO Strategy 2025: Beyond Keywords',
    excerpt: 'Modern SEO goes beyond keywords. Learn about E-E-A-T, Core Web Vitals, and AI-driven content strategies for 2025.',
    content: `SEO in 2025 requires a holistic approach:

1. E-E-A-T Framework
- Experience
- Expertise
- Authoritativeness
- Trustworthiness

2. Core Web Vitals
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

3. AI-Driven Content
- Natural language optimization
- Semantic search
- Entity-based optimization

4. Technical SEO
- XML sitemaps
- Structured data (Schema.org)
- Mobile-first indexing

5. Link Building Strategy
- Quality over quantity
- Contextual relevance
- Authority building

Tools for SEO:
- Google Search Console
- Ahrefs for backlink analysis
- SEMrush for keyword research
- Screaming Frog for technical audits`,
    category: 'SEO & Marketing',
    author: 'Arjun Mehta',
    date: 'Dec 5, 2024',
    readTime: '10 min read',
    tags: ['SEO', 'Marketing', 'Strategy'],
  },
  {
    id: 4,
    slug: 'building-scalable-saas-platforms',
    title: 'Building Scalable SaaS Platforms: Architecture Guide',
    excerpt: 'A comprehensive guide to architecting scalable SaaS platforms with microservices, databases, and cloud infrastructure.',
    content: `Building scalable SaaS requires careful architecture:

1. Microservices Architecture
- Service decomposition
- API gateways
- Service mesh (Istio)

2. Database Strategy
- PostgreSQL for relational data
- Redis for caching
- MongoDB for flexible schemas

3. Cloud Infrastructure
- AWS/GCP/Azure selection
- Containerization (Docker)
- Orchestration (Kubernetes)

4. Security Considerations
- OAuth 2.0 authentication
- JWT tokens
- End-to-end encryption

5. Monitoring & Logging
- ELK stack
- Prometheus metrics
- Distributed tracing

Scalability checklist:
- Horizontal scaling capability
- Load balancing
- Database replication
- CDN integration
- Auto-scaling policies`,
    category: 'Backend Development',
    author: 'Vikram Singh',
    date: 'Nov 28, 2024',
    readTime: '12 min read',
    tags: ['SaaS', 'Architecture', 'Backend'],
  },
  {
    id: 5,
    slug: 'brand-identity-design-process',
    title: 'The Complete Brand Identity Design Process',
    excerpt: 'Step-by-step guide to creating a cohesive brand identity from research to implementation across all touchpoints.',
    content: `Creating a strong brand identity:

1. Discovery & Research
- Market analysis
- Competitor research
- Audience personas
- Brand positioning

2. Visual Identity
- Logo design
- Color palette
- Typography system
- Imagery style

3. Brand Guidelines
- Logo usage rules
- Color specifications
- Typography hierarchy
- Spacing & layout

4. Implementation
- Website design
- Marketing materials
- Social media templates
- Packaging design

5. Brand Evolution
- Regular audits
- Trend monitoring
- Consistency checks
- Refresh strategies

Brand identity elements:
- Logo (primary & secondary)
- Color palette (primary & secondary)
- Typography (display & body)
- Imagery guidelines
- Voice & tone
- Brand story`,
    category: 'Branding',
    author: 'Neha Desai',
    date: 'Nov 20, 2024',
    readTime: '9 min read',
    tags: ['Branding', 'Design', 'Identity'],
  },
  {
    id: 6,
    slug: 'digital-marketing-automation',
    title: 'Digital Marketing Automation: Tools & Strategies',
    excerpt: 'Automate your marketing workflows with email marketing, CRM integration, and lead nurturing strategies.',
    content: `Marketing automation drives efficiency:

1. Email Marketing Automation
- Drip campaigns
- Segmentation
- Personalization
- A/B testing

2. CRM Integration
- Lead scoring
- Pipeline management
- Customer journey mapping
- Retention strategies

3. Social Media Automation
- Scheduling tools
- Content calendars
- Engagement tracking
- Analytics

4. Lead Nurturing
- Automated workflows
- Behavioral triggers
- Content recommendations
- Conversion optimization

5. Analytics & Reporting
- Conversion tracking
- ROI measurement
- Attribution modeling
- Performance dashboards

Popular tools:
- HubSpot for CRM
- Mailchimp for email
- Buffer for social media
- Zapier for workflow automation`,
    category: 'Digital Marketing',
    author: 'Amit Patel',
    date: 'Nov 15, 2024',
    readTime: '7 min read',
    tags: ['Marketing', 'Automation', 'Strategy'],
  },
  {
    id: 7,
    slug: 'mobile-app-development-best-practices',
    title: 'Mobile App Development: Best Practices 2025',
    excerpt: 'Learn best practices for developing high-performance mobile apps with React Native, Flutter, and native technologies.',
    content: `Mobile app development best practices:

1. Cross-Platform Development
- React Native
- Flutter
- Xamarin
- Native development

2. Performance Optimization
- App size reduction
- Memory management
- Battery optimization
- Network efficiency

3. User Experience
- Intuitive navigation
- Gesture controls
- Offline functionality
- Push notifications

4. Security
- Data encryption
- Secure authentication
- API security
- Compliance (GDPR, CCPA)

5. Testing Strategy
- Unit testing
- Integration testing
- UI testing
- Performance testing

Development tools:
- Xcode for iOS
- Android Studio for Android
- React Native CLI
- Flutter SDK
- Firebase for backend`,
    category: 'Mobile Development',
    author: 'Rajesh Kumar',
    date: 'Nov 10, 2024',
    readTime: '11 min read',
    tags: ['Mobile', 'Development', 'Apps'],
  },
  {
    id: 8,
    slug: 'web-accessibility-wcag-guide',
    title: 'Web Accessibility: WCAG 2.1 Compliance Guide',
    excerpt: 'Comprehensive guide to making your website accessible to all users with WCAG 2.1 AA compliance standards.',
    content: `Web accessibility is essential:

1. WCAG 2.1 Standards
- Perceivable content
- Operable interfaces
- Understandable information
- Robust implementation

2. Color & Contrast
- Minimum contrast ratios
- Color blindness considerations
- Text alternatives
- Visual indicators

3. Keyboard Navigation
- Tab order
- Focus indicators
- Keyboard shortcuts
- Skip links

4. Screen Reader Support
- Semantic HTML
- ARIA labels
- Alt text for images
- Form labels

5. Testing & Auditing
- Automated testing tools
- Manual testing
- User testing
- Accessibility audit

Tools for accessibility:
- WAVE browser extension
- Axe DevTools
- Lighthouse
- NVDA screen reader
- JAWS screen reader`,
    category: 'Web Development',
    author: 'Priya Sharma',
    date: 'Nov 5, 2024',
    readTime: '8 min read',
    tags: ['Accessibility', 'WCAG', 'Development'],
  },
  {
    id: 9,
    slug: 'e-commerce-conversion-optimization',
    title: 'E-Commerce Conversion Optimization: Complete Playbook',
    excerpt: 'Strategies to increase e-commerce conversions through UX optimization, A/B testing, and customer psychology.',
    content: `Optimizing e-commerce conversions:

1. User Experience
- Simplified checkout
- Product pages
- Search functionality
- Mobile optimization

2. A/B Testing
- Landing pages
- Call-to-action buttons
- Product images
- Pricing strategies

3. Customer Psychology
- Social proof
- Urgency & scarcity
- Trust signals
- Personalization

4. Checkout Optimization
- Minimal form fields
- Multiple payment options
- Guest checkout
- Error handling

5. Post-Purchase
- Order confirmation
- Email follow-ups
- Reviews & ratings
- Loyalty programs

Conversion metrics:
- Conversion rate
- Average order value
- Cart abandonment rate
- Customer lifetime value
- Return on ad spend`,
    category: 'E-Commerce',
    author: 'Arjun Mehta',
    date: 'Oct 30, 2024',
    readTime: '9 min read',
    tags: ['E-Commerce', 'Conversion', 'Optimization'],
  },
  {
    id: 10,
    slug: 'future-of-web-development',
    title: 'The Future of Web Development: AI, Web3 & Beyond',
    excerpt: 'Exploring emerging technologies shaping web development: AI integration, Web3, edge computing, and quantum computing.',
    content: `The future of web development:

1. AI Integration
- AI-powered code generation
- Predictive analytics
- Chatbots & conversational UI
- Personalization engines

2. Web3 & Blockchain
- Decentralized applications
- Smart contracts
- NFTs & digital assets
- Cryptocurrency integration

3. Edge Computing
- Serverless architecture
- Edge functions
- Reduced latency
- Improved performance

4. Quantum Computing
- Quantum algorithms
- Cryptography implications
- Future-proofing strategies

5. Emerging Technologies
- WebAssembly (WASM)
- Progressive Web Apps (PWA)
- Augmented Reality (AR)
- Virtual Reality (VR)

Skills to develop:
- Machine learning basics
- Blockchain fundamentals
- Cloud architecture
- DevOps practices
- Security & cryptography`,
    category: 'Technology Trends',
    author: 'Vikram Singh',
    date: 'Oct 25, 2024',
    readTime: '10 min read',
    tags: ['Technology', 'Future', 'Innovation'],
  },
]

export const getBlogBySlug = (slug) => {
  return blogArticles.find((article) => article.slug === slug)
}

export const getBlogByCategory = (category) => {
  return blogArticles.filter((article) => article.category === category)
}

export const getBlogCategories = () => {
  return [...new Set(blogArticles.map((article) => article.category))]
}
