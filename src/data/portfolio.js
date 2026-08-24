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
    image:        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=675&fit=crop&q=80', // Web design mockup
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
    image:        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&q=80', // Laptop displaying website/charts
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
    image:        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=675&fit=crop&q=80', // Mobile app UI on phone
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
    image:        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&fit=crop&q=80', // Branding and color palette on screen
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
    image:        'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=675&fit=crop&q=80', // Digital strategy planning
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
    image:        'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=1200&h=675&fit=crop&q=80', // Video editing suite
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
    image:        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=675&fit=crop&q=80', // E-learning dashboard on screen
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
