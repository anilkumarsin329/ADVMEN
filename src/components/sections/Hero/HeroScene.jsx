/**
 * HeroScene.jsx — Premium React Three Fiber scene
 * Reduced object size (65–70% of space), soft orange glow,
 * floating particles, smooth mouse interaction, 60 FPS target.
 */

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float } from '@react-three/drei'
import { lerp } from '@utils/threeHelpers'

// Global mouse — single listener, shared across instances
const mouse = { x: 0, y: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener(
    'mousemove',
    (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    },
    { passive: true }
  )
}

// ── Particle Data Pre-generation ─────────────────────────────
const PARTICLE_COUNT = 160
const PARTICLE_DATA = (() => {
  const pos = new Float32Array(PARTICLE_COUNT * 3)
  const sz  = new Float32Array(PARTICLE_COUNT)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Spread wide enough to fill full viewport at fov 50, z=7
    // Visible width at z=0 ≈ 2 * tan(25°) * 7 ≈ 6.5 units each side
    pos[i * 3]     = (Math.random() - 0.5) * 22   // x: ±11
    pos[i * 3 + 1] = (Math.random() - 0.5) * 16   // y: ±8
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10   // z: ±5 (depth)
    sz[i]          = 0.015 + Math.random() * 0.03
  }
  return { positions: pos, sizes: sz }
})()

// ── Soft orange glow plane behind the object ──────────────────
const GlowPlane = () => (
  <mesh position={[0, 0, -2.5]}>
    <planeGeometry args={[8, 8]} />
    <meshBasicMaterial
      color="#FF6B00"
      transparent
      opacity={0.04}
      depthWrite={false}
    />
  </mesh>
)

// ── Main abstract shape ────────────────────────────────────────
const AbstractShape = () => {
  const meshRef   = useRef(null)
  const groupRef  = useRef(null)
  const targetRot = useRef({ x: 0, y: 0 })

  useFrame(() => {
    if (meshRef.current) {
      // Slow, elegant auto-rotation
      meshRef.current.rotation.x += 0.0018
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.z += 0.0008
    }

    if (groupRef.current) {
      // Smooth mouse parallax — reduced intensity
      targetRot.current.x = lerp(targetRot.current.x, mouse.y * 0.18, 0.04)
      targetRot.current.y = lerp(targetRot.current.y, mouse.x * 0.18, 0.04)
      groupRef.current.rotation.x = targetRot.current.x
      groupRef.current.rotation.y = targetRot.current.y
    }
  })

  return (
    <group ref={groupRef}>
      <Float
        speed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.6}
        floatingRange={[-0.12, 0.12]}
      >
        {/* Core torus knot — scaled down to ~65% */}
        <mesh ref={meshRef} scale={0.52} castShadow>
          <torusKnotGeometry args={[1, 0.3, 200, 24, 2, 3]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.35}
            roughness={0.04}
            transmission={0.96}
            ior={1.55}
            chromaticAberration={0.03}
            anisotropy={0.08}
            distortion={0.08}
            distortionScale={0.15}
            temporalDistortion={0.04}
            color="#FF6B00"
            attenuationColor="#FF8C38"
            attenuationDistance={0.6}
          />
        </mesh>

        {/* Outer wireframe ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.52}>
          <torusGeometry args={[1.85, 0.007, 8, 100]} />
          <meshBasicMaterial color="#FF6B00" transparent opacity={0.22} />
        </mesh>

        {/* Second tilted ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]} scale={0.52}>
          <torusGeometry args={[2.15, 0.004, 8, 100]} />
          <meshBasicMaterial color="#FF8C38" transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  )
}

// ── Floating ambient particles ─────────────────────────────────
const AmbientParticles = () => {
  const ref = useRef(null)
  const { positions, sizes } = PARTICLE_DATA

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015
      ref.current.rotation.x = state.clock.elapsedTime * 0.008
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#FF7A20"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ── Scene lighting ─────────────────────────────────────────────
const SceneLights = () => (
  <>
    <ambientLight intensity={0.45} />
    <pointLight position={[5,  5,  5]}  intensity={3.2} color="#FF6B00" />
    <pointLight position={[-5, -3, -5]} intensity={1.8} color="#FF8C38" />
    <pointLight position={[0,  8,  2]}  intensity={1.2} color="#ffffff" />
    <pointLight position={[3, -5,  4]}  intensity={0.6} color="#FF4500" />
  </>
)

// ── Canvas wrapper ─────────────────────────────────────────────
const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 0, 7], fov: 50 }}
    dpr={[1, 1.5]}
    gl={{
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    }}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      display: 'block',
    }}
    aria-hidden="true"
  >
    <SceneLights />
    <GlowPlane />
    <AbstractShape />
    <AmbientParticles />
  </Canvas>
)

export default HeroScene
