export const blogArticles = []

export const getBlogBySlug = (slug) => blogArticles.find((a) => a.slug === slug)
export const getBlogByCategory = (category) => blogArticles.filter((a) => a.category === category)
export const getBlogCategories = () => [...new Set(blogArticles.map((a) => a.category))]
