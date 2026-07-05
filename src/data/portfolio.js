/**
 * data/portfolio.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Portfolio / Work Data
 * Updated with optimized Unsplash HD Image URLs, Categories, and Technologies.
 * ─────────────────────────────────────────────────────────────
 */

export const portfolioItems = [
  {
    id:           1,
    slug:         'luxe-fashion-brand',
    title:        'Luxe Fashion Brand',
    tagline:      'Premium e-commerce platform for luxury fashion',
    category:     'Branding',
    tags:         ['Branding', 'Identity', 'Visual Design'],
    technologies: ['Branding', 'Identity', 'Visual Design'],
    image:        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=675&fit=crop&q=80',
    year:         '2024',
  },
  {
    id:           2,
    slug:         'fintech-saas',
    title:        'FinTech SaaS Dashboard',
    tagline:      'Enterprise financial management dashboard',
    category:     'Web Development',
    tags:         ['Web Dev', 'React', 'Dashboard'],
    technologies: ['Web Dev', 'React', 'Dashboard'],
    image:        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=80',
    year:         '2024',
  },
  {
    id:           3,
    slug:         'real-estate-marketplace',
    title:        'Real Estate Marketplace',
    tagline:      'AI-powered property discovery platform',
    category:     'Web Development',
    tags:         ['Web Dev', 'API integrations', 'Real Estate'],
    technologies: ['Web Dev', 'API integrations', 'Real Estate'],
    image:        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=675&fit=crop&q=80',
    year:         '2024',
  },
  {
    id:           4,
    slug:         'vitality-fitness-platform',
    title:        'Vitality Fitness Platform',
    tagline:      'AI-powered fitness tracking and personalized wellness coaching app',
    category:     'App Development',
    tags:         ['App Dev', 'AI/ML', 'Fitness', 'Health Tech'],
    technologies: ['React Native', 'Firebase', 'Machine Learning'],
    image:        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=675&fit=crop&q=80',
    year:         '2024',
  },
  {
    id:           5,
    slug:         'corporate-branding',
    title:        'Corporate Branding Suite',
    tagline:      'Complete brand identity for Fortune 500 company',
    category:     'Branding',
    tags:         ['Branding', 'Mockup', 'Stationery'],
    technologies: ['Branding', 'Mockup', 'Stationery'],
    image:        'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&h=675&fit=crop&q=80',
    year:         '2023',
  },
  {
    id:           6,
    slug:         'political-campaign',
    title:        'Political Assembly Campaign',
    tagline:      'Comprehensive digital strategy for political campaign',
    category:     'Political Campaigns',
    tags:         ['Strategy', 'Social Media', 'Outreach'],
    technologies: ['Strategy', 'Social Media', 'Outreach'],
    image:        'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&h=675&fit=crop&q=80',
    year:         '2024',
  },
  {
    id:           7,
    slug:         'media-studio',
    title:        'Media Studio Production',
    tagline:      'Showcase platform for media production company',
    category:     'Media Production',
    tags:         ['Media', 'Video Production', 'Recording'],
    technologies: ['Media', 'Video Production', 'Recording'],
    image:        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=675&fit=crop&q=80',
    year:         '2023',
  },
  {
    id:           8,
    slug:         'e-learning-platform',
    title:        'E-Learning Portal',
    tagline:      'Interactive online education platform',
    category:     'Web Development',
    tags:         ['Web Dev', 'Next.js', 'Learning'],
    technologies: ['Web Dev', 'Next.js', 'Learning'],
    image:        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop&q=80',
    year:         '2024',
  },
]

export const portfolioProjects = portfolioItems

export const getPortfolioBySlug = (slug) => portfolioItems.find((p) => p.slug === slug)
export const getProjectBySlug = getPortfolioBySlug

export const portfolioCategories = [
  { id: 'all', label: 'All' },
  { id: 'branding', label: 'Branding' },
  { id: 'web-development', label: 'Web Dev' },
  { id: 'app-development', label: 'App Dev' },
  { id: 'political-campaigns', label: 'Political' },
  { id: 'media-production', label: 'Media' },
]
