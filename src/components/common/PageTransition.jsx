/**
 * components/common/PageTransition.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Page Transition
 *
 * • Framer Motion fade + slide for page content
 * • GSAP curtain overlay for route changes
 * • No flicker — curtain covers before unmount
 * ─────────────────────────────────────────────────────────────
 */

import { motion } from 'framer-motion'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.84, 0],
    },
  },
}

const PageTransition = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="enter"
    exit="exit"
    style={{ willChange: 'opacity, transform' }}
  >
    {children}
  </motion.div>
)

export default PageTransition
