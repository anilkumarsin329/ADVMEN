/**
 * HeroScrollIndicator.jsx — Premium scroll cue
 * Mouse icon + animated dot + pulsing line
 */

import { motion } from 'framer-motion'

const HeroScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center select-none cursor-default"
    style={{ gap: '0.6rem' }}
    aria-label="Scroll down"
  >
    {/* Mouse outline */}
    <div
      className="relative flex justify-center"
      style={{
        width: '22px',
        height: '36px',
        border: '1.5px solid rgba(255,255,255,0.18)',
        borderRadius: '11px',
      }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: 'var(--color-orange)',
          marginTop: '6px',
          boxShadow: '0 0 8px rgba(255,107,0,0.9)',
        }}
      />
    </div>

    {/* Label */}
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--color-text-tertiary)',
      }}
    >
      Scroll
    </span>

    {/* Animated line */}
    <motion.div
      animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      style={{
        width: '1px',
        height: '28px',
        background: 'linear-gradient(to bottom, var(--color-orange), transparent)',
        transformOrigin: 'top',
      }}
      aria-hidden="true"
    />
  </motion.div>
)

export default HeroScrollIndicator
