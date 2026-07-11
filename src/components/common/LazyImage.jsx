/**
 * components/common/LazyImage.jsx
 * ─────────────────────────────────────────────────────────────
 * Optimized image component with lazy loading and blur placeholder
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useRef, useEffect } from 'react'
import { cn } from '@utils/formatters'

const LazyImage = ({
  src,
  alt,
  className,
  containerClassName,
  width,
  height,
  priority = false,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(priority)
  const [imageSrc, setImageSrc] = useState(priority ? src : null)
  const imgRef = useRef(null)

  useEffect(() => {
    if (priority) {
      setImageSrc(src)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src, priority])

  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', containerClassName)}
      style={{
        width,
        height,
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
      }}
    >
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] animate-pulse"
          style={{
            backdropFilter: 'blur(8px)',
          }}
        />
      )}

      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  )
}

export default LazyImage
