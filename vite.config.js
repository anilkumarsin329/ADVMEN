/**
 * vite.config.js
 * ─────────────────────────────────────────────────────────────
 * Vite configuration for ADVMEN Technologies website.
 *
 * Key features:
 *  - Path aliases so imports stay clean (@/components/...)
 *  - SVG as React components via vite-plugin-svgr
 *  - Chunk splitting for Three.js / GSAP to keep main bundle lean
 *  - Source maps in development only
 * ─────────────────────────────────────────────────────────────
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    // Allows: import { ReactComponent as Logo } from './logo.svg'
    svgr(),
  ],

  // ── Path aliases ──────────────────────────────────────────
  resolve: {
    alias: {
      '@':           path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages':      path.resolve(__dirname, './src/pages'),
      '@hooks':      path.resolve(__dirname, './src/hooks'),
      '@context':    path.resolve(__dirname, './src/context'),
      '@data':       path.resolve(__dirname, './src/data'),
      '@styles':     path.resolve(__dirname, './src/styles'),
      '@utils':      path.resolve(__dirname, './src/utils'),
      '@assets':     path.resolve(__dirname, './src/assets'),
    },
  },

  // ── Build optimisation ────────────────────────────────────
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'vendor-three'
          }
          if (id.includes('gsap') || id.includes('framer-motion')) {
            return 'vendor-animation'
          }
          if (id.includes('react-dom') || id.includes('react-router-dom') || (id.includes('node_modules/react/') )) {
            return 'vendor-react'
          }
        },
      },
    },
    // Three.js is inherently large (~240 kB gzip) — raise limit accordingly
    chunkSizeWarningLimit: 1000,
  },

  // ── Dev server ────────────────────────────────────────────
  server: {
    port: 5173,
    open: true,
  },
})
