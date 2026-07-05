/**
 * HeroBackground.jsx — Video background with proper absolute positioning
 * Positioned absolutely within Hero section for correct layout flow
 */

import { useEffect, useRef } from 'react'

const HeroBackground = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = () => {
      video.play().catch((err) => {
        console.log('Video autoplay failed:', err)
      })
    }

    video.addEventListener('loadedmetadata', playVideo)
    playVideo()

    return () => {
      video.removeEventListener('loadedmetadata', playVideo)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Fallback gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
          zIndex: 0,
        }}
      />

      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
          display: 'block',
        }}
      >
        <source src="/videos/hero section animation vedio.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability (40-50% opacity) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default HeroBackground
