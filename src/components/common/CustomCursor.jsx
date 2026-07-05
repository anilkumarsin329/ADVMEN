/**
 * components/common/CustomCursor.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Premium Custom Cursor
 *
 * • Smooth GSAP lerp interpolation
 * • States: default | hover | text | drag | link | image | hidden
 * • Magnetic pull on [data-magnetic] elements
 * • Desktop only — hidden on touch devices
 * • Zero layout impact (fixed, pointer-events-none)
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useContext } from 'react'
import { CursorContext } from '@context/CursorContext'
import { gsap } from '@utils/gsapConfig'
import { isTouchDevice } from '@utils/formatters'

const CustomCursor = () => {
  const { cursorType, setCursor, showCursor, hideCursor, isVisible } = useContext(CursorContext)

  const dotRef    = useRef(null)
  const ringRef   = useRef(null)

  const mouse     = useRef({ x: -200, y: -200 })
  const ringPos   = useRef({ x: -200, y: -200 })
  const rafId     = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && isTouchDevice()) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // ── Mouse tracking ───────────────────────────────────────
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      // Snap dot immediately
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      showCursor()
    }

    const onMouseLeave = () => hideCursor()
    const onMouseEnter = () => showCursor()

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // ── Lerp ring ────────────────────────────────────────────
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.1)
      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y })
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    // ── Cursor state detection ───────────────────────────────
    const handleEnter = (e) => {
      const el = e.target.closest('[data-cursor]')
      if (el) {
        setCursor(el.dataset.cursor)
        return
      }
      if (e.target.closest('a, button, [role="button"]')) { setCursor('hover'); return }
      if (e.target.closest('input, textarea, [contenteditable]')) { setCursor('text'); return }
      if (e.target.closest('img, video, [data-cursor-image]')) { setCursor('image'); return }
      setCursor('default')
    }

    const handleLeave = () => setCursor('default')

    document.addEventListener('mouseover', handleEnter)
    document.addEventListener('mouseout',  handleLeave)

    // ── Mouse down/up for drag state ─────────────────────────
    const onDown = () => {
      if (cursorType !== 'text') setCursor('drag')
    }
    const onUp = () => setCursor('default')

    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)

    return () => {
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover',  handleEnter)
      document.removeEventListener('mouseout',   handleLeave)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      cancelAnimationFrame(rafId.current)
    }
  }, [setCursor, showCursor, hideCursor, cursorType])

  // Never render on touch devices
  if (typeof window !== 'undefined' && isTouchDevice()) return null

  // ── Cursor state styles ────────────────────────────────────
  const isHover = cursorType === 'hover' || cursorType === 'link' || cursorType === 'image'

  return (
    <>
      {/* ── Precision dot — snaps instantly to cursor ─────── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '5px',
          height:        '5px',
          borderRadius:  '50%',
          background:    'var(--color-orange)',
          pointerEvents: 'none',
          zIndex:        'var(--z-cursor)',
          transform:     'translate(-200px, -200px)',
          willChange:    'transform',
          marginLeft:    '-2.5px',
          marginTop:     '-2.5px',
          opacity:       isVisible ? (isHover ? 0 : 1) : 0,
          transition:    'opacity 0.2s ease',
          boxShadow:     '0 0 6px rgba(255,107,0,0.8)',
        }}
      />

      {/* ── Outer ring — lags behind for premium feel ─────── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          width:          isHover ? '48px' : '32px',
          height:         isHover ? '48px' : '32px',
          borderRadius:   '50%',
          border:         isHover
            ? '1.5px solid rgba(255,107,0,0.9)'
            : '1px solid rgba(255,107,0,0.55)',
          pointerEvents:  'none',
          zIndex:         'var(--z-cursor)',
          transform:      'translate(-200px, -200px)',
          willChange:     'transform',
          marginLeft:     isHover ? '-24px' : '-16px',
          marginTop:      isHover ? '-24px' : '-16px',
          opacity:        isVisible ? 1 : 0,
          transition:     'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), margin 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, opacity 0.3s ease, background 0.3s ease',
          background:     isHover ? 'rgba(255,107,0,0.06)' : 'transparent',
          backdropFilter: isHover ? 'blur(2px)' : 'none',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        {/* Arrow icon — visible on hover state */}
        {isHover && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            style={{ pointerEvents: 'none', flexShrink: 0 }}
          >
            <path
              d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
              stroke="#FF6B00"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </>
  )
}

export default CustomCursor
