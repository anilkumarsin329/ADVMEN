/**
 * utils/threeHelpers.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Three.js Utility Helpers
 *
 * Reusable helpers for Three.js / R3F scenes.
 * Centralises common patterns: disposal, pixel ratio,
 * color conversion, and geometry helpers.
 * ─────────────────────────────────────────────────────────────
 */

import * as THREE from 'three'
import { BREAKPOINTS, THREE_CONFIG } from './constants'

// ── Pixel Ratio ───────────────────────────────────────────────
/**
 * Returns a capped device pixel ratio.
 * Prevents performance issues on high-DPI screens.
 */
export const getSafePixelRatio = () =>
  Math.min(window.devicePixelRatio, THREE_CONFIG.maxPixelRatio)

// ── Particle Count ────────────────────────────────────────────
/**
 * Returns appropriate particle count based on screen width.
 * Reduces load on mobile devices.
 */
export const getParticleCount = () =>
  window.innerWidth < BREAKPOINTS.md
    ? THREE_CONFIG.particleCountMobile
    : THREE_CONFIG.particleCount

// ── Dispose Helper ────────────────────────────────────────────
/**
 * Recursively disposes all geometries, materials, and textures
 * in a Three.js object tree. Call on unmount to prevent memory leaks.
 *
 * @param {THREE.Object3D} object
 */
export const disposeObject = (object) => {
  if (!object) return

  object.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose()
    }

    if (child.material) {
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material]

      materials.forEach((mat) => {
        // Dispose all texture maps
        Object.values(mat).forEach((value) => {
          if (value instanceof THREE.Texture) {
            value.dispose()
          }
        })
        mat.dispose()
      })
    }
  })
}

// ── Color Helpers ─────────────────────────────────────────────
/**
 * Converts a hex color string to a THREE.Color instance.
 * @param {string} hex - e.g. '#FF6B00'
 */
export const hexToThreeColor = (hex) => new THREE.Color(hex)

/** Brand colors as THREE.Color instances */
export const BRAND_COLORS = {
  orange:      new THREE.Color('#FF6B00'),
  orangeLight: new THREE.Color('#FF8C38'),
  white:       new THREE.Color('#F5F5F5'),
  black:       new THREE.Color('#0A0A0A'),
}

// ── Geometry Helpers ──────────────────────────────────────────
/**
 * Creates a Float32Array of random particle positions
 * within a given spread range.
 *
 * @param {number} count - Number of particles
 * @param {number} spread - Position spread range
 * @returns {Float32Array}
 */
export const createParticlePositions = (count, spread = 10) => {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * spread       // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread       // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * (spread / 2) // z
  }
  return positions
}

/**
 * Creates a Float32Array of random particle sizes.
 * @param {number} count
 * @param {number} minSize
 * @param {number} maxSize
 */
export const createParticleSizes = (count, minSize = 0.01, maxSize = 0.05) => {
  const sizes = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    sizes[i] = minSize + Math.random() * (maxSize - minSize)
  }
  return sizes
}

// ── Lerp Helper ───────────────────────────────────────────────
/**
 * Linear interpolation — used for smooth mouse tracking.
 * @param {number} start
 * @param {number} end
 * @param {number} t - interpolation factor (0–1)
 */
export const lerp = (start, end, t) => start + (end - start) * t

// ── Map Range ─────────────────────────────────────────────────
/**
 * Maps a value from one range to another.
 * Useful for converting mouse position to 3D coordinates.
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
