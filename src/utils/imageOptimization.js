/**
 * utils/imageOptimization.js
 * ─────────────────────────────────────────────────────────────
 * Image optimization utilities for performance
 * - Lazy loading
 * - Responsive image sizing
 * - WebP format support
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Generate responsive image srcset for different screen sizes
 * @param {string} imagePath - Base image path
 * @param {string} format - Image format (jpg, png, webp)
 * @returns {string} srcset string
 */
export const generateSrcSet = (imagePath, format = 'jpg') => {
  const basePath = imagePath.replace(/\.[^.]+$/, '')
  return `
    ${basePath}-sm.${format} 640w,
    ${basePath}-md.${format} 1024w,
    ${basePath}-lg.${format} 1920w
  `.trim()
}

/**
 * Get optimized image URL with compression parameters
 * @param {string} imagePath - Image path
 * @param {number} width - Target width
 * @param {number} quality - Quality 1-100
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (imagePath, width = 800, quality = 80) => {
  // For local images, return as-is (optimization handled by build process)
  // For external images, add query params
  if (imagePath.startsWith('http')) {
    return `${imagePath}?w=${width}&q=${quality}&auto=format`
  }
  return imagePath
}

/**
 * Preload critical images for faster LCP
 * @param {string[]} imagePaths - Array of image paths to preload
 */
export const preloadImages = (imagePaths) => {
  if (typeof document === 'undefined') return

  imagePaths.forEach((path) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = path
    link.type = 'image/webp'
    document.head.appendChild(link)
  })
}

/**
 * Intersection Observer for lazy loading images
 * @param {HTMLElement} element - Image element
 * @param {Function} callback - Callback when element is visible
 */
export const observeImageLazyLoad = (element, callback) => {
  if (!('IntersectionObserver' in window)) {
    callback()
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
          observer.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '50px',
      threshold: 0.01,
    }
  )

  observer.observe(element)
  return observer
}

/**
 * Get image dimensions for aspect ratio preservation
 * @param {string} imagePath - Image path
 * @returns {Promise<{width: number, height: number}>}
 */
export const getImageDimensions = (imagePath) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
    img.src = imagePath
  })
}

/**
 * Generate blur placeholder for image
 * @param {string} imagePath - Image path
 * @returns {string} Base64 blur placeholder
 */
export const generateBlurPlaceholder = (imagePath) => {
  // Return a simple gradient placeholder
  // In production, use a service like plaiceholder for actual blur
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E'
}

export default {
  generateSrcSet,
  getOptimizedImageUrl,
  preloadImages,
  observeImageLazyLoad,
  getImageDimensions,
  generateBlurPlaceholder,
}
