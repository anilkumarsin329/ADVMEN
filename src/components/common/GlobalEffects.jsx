/**
 * components/common/GlobalEffects.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Global Visual Effects
 *
 * • Noise texture overlay (SVG filter, CSS only)
 * • Gradient mesh background orbs
 * • Floating particles (canvas, lightweight)
 * • All pointer-events-none, zero layout impact
 * • Particles disabled on mobile for performance
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'

// ── Floating Particles (Canvas) ────────────────────────────────
const ParticleCanvas = () => {
  const canvasRef = useRef(null)
  const { width }  = useWindowSize()

  useEffect(() => {
    if (width < 1024) return // desktop only

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let rafId

    // Particle count — keep it light
    const COUNT = 40
    const particles = Array.from({ length: COUNT }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.5 + 0.3,
      vx:   (Math.random() - 0.5) * 0.25,
      vy:   (Math.random() - 0.5) * 0.25,
      o:    Math.random() * 0.4 + 0.05,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 0, ${p.o})`
        ctx.fill()
      })
      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [width])

  if (width < 1024) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  )
}

// ── Main GlobalEffects ─────────────────────────────────────────
const GlobalEffects = () => (
  <>
    {/* ── Noise texture overlay ─────────────────────────── */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }}
    />

    {/* ── Gradient mesh orbs ────────────────────────────── */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Top-right warm orb */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 65%)',
        filter: 'blur(40px)',
      }} />
      {/* Bottom-left cool orb */}
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204,85,0,0.04) 0%, transparent 65%)',
        filter: 'blur(60px)',
      }} />
      {/* Center subtle glow */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,107,0,0.025) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
    </div>

    {/* ── Floating particles ────────────────────────────── */}
    <ParticleCanvas />
  </>
)

export default GlobalEffects
