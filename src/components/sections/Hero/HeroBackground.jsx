/**
 * HeroBackground.jsx — Optimized video background
 * Smooth playback, fast loading, mobile responsive
 */

import { useEffect, useRef, useState } from 'react'

const HeroBackground = () => {
  const videoRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video plays on mobile
    const playVideo = () => {
      video.play().catch(() => {
        console.log('Autoplay prevented, waiting for user interaction')
      })
    }

    // Try to play immediately
    playVideo()

    // Retry on user interaction
    const handleInteraction = () => {
      playVideo()
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('click', handleInteraction, { once: true })
    document.addEventListener('touchstart', handleInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#000',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >
        <source src="/videos/hero section animation vedio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback gradient background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          zIndex: -1,
        }}
      />

      {/* Mobile overlay for better content visibility */}
      {isMobile && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

export default HeroBackground
