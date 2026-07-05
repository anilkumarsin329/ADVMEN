/**
 * data/portfolio.js - Portfolio items for /work page
 * Note: This complements the portfolio.js in same directory
 * These are portfolio grid items for the /work page
 */

export const portfolioItems = [
  {
    id: 1,
    slug: 'luxe-fashion-ecommerce',
    title: 'Luxe Fashion E-Commerce',
    category: 'Web Development',
    year: '2024',
    tags: ['React', 'E-Commerce', 'Stripe'],
    description: 'Premium e-commerce platform for luxury fashion brand',
  },
  {
    id: 2,
    slug: 'fintech-saas-dashboard',
    title: 'FinTech SaaS Dashboard',
    category: 'Web Development',
    year: '2024',
    tags: ['React', 'SaaS', 'Dashboard'],
    description: 'Enterprise financial management platform',
  },
  {
    id: 3,
    slug: 'real-estate-marketplace',
    title: 'Real Estate Marketplace',
    category: 'Web Development',
    year: '2023',
    tags: ['React', 'Marketplace', 'Maps'],
    description: 'AI-powered property discovery platform',
  },
  {
    id: 4,
    slug: 'corporate-brand-identity',
    title: 'Corporate Brand Identity',
    category: 'Branding',
    year: '2024',
    tags: ['Branding', 'Design', 'Guidelines'],
    description: 'Complete brand identity redesign for Fortune 500 company',
  },
  {
    id: 5,
    slug: 'digital-marketing-campaign',
    title: 'Digital Marketing Campaign',
    category: 'Digital Marketing',
    year: '2024',
    tags: ['Marketing', 'Social', 'Analytics'],
    description: 'Multi-channel digital marketing strategy and execution',
  },
  {
    id: 6,
    slug: 'health-wellness-app',
    title: 'Health & Wellness App',
    category: 'Web Development',
    year: '2023',
    tags: ['React Native', 'Mobile', 'Fitness'],
    description: 'Cross-platform fitness tracking and wellness app',
  },
  {
    id: 7,
    slug: 'political-campaign-digital',
    title: 'Political Campaign Digital',
    category: 'Digital Marketing',
    year: '2024',
    tags: ['Campaign', 'Digital', 'Strategy'],
    description: 'Comprehensive digital strategy for political campaign',
  },
  {
    id: 8,
    slug: 'media-production-website',
    title: 'Media Production Website',
    category: 'Web Development',
    year: '2023',
    tags: ['Next.js', 'Video', 'Portfolio'],
    description: 'Premium showcase website for media production studio',
  },
  {
    id: 9,
    slug: 'elearning-platform',
    title: 'E-Learning Platform',
    category: 'Web Development',
    year: '2023',
    tags: ['React', 'EdTech', 'Video'],
    description: 'Interactive online education platform with 500+ courses',
  },
  {
    id: 10,
    slug: 'startup-branding',
    title: 'Startup Branding',
    category: 'Branding',
    year: '2024',
    tags: ['Branding', 'Logo', 'Identity'],
    description: 'Complete brand identity for tech startup',
  },
  {
    id: 11,
    slug: 'social-media-strategy',
    title: 'Social Media Strategy',
    category: 'Digital Marketing',
    year: '2024',
    tags: ['Social', 'Content', 'Strategy'],
    description: 'Social media strategy and content calendar management',
  },
  {
    id: 12,
    slug: 'saas-landing-page',
    title: 'SaaS Landing Page',
    category: 'Web Development',
    year: '2024',
    tags: ['Next.js', 'Landing', 'Conversion'],
    description: 'High-converting landing page for SaaS product',
  },
]

export const getPortfolioBySlug = (slug) => {
  return portfolioItems.find((item) => item.slug === slug)
}

export const getPortfolioByCategory = (category) => {
  if (category === 'All') return portfolioItems
  return portfolioItems.filter((item) => item.category === category)
}

export const getPortfolioCategories = () => {
  const categories = [...new Set(portfolioItems.map((item) => item.category))]
  return ['All', ...categories]
}
