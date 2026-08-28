import React from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp } from 'react-icons/fi'

const HeroGrowthGraph = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center pointer-events-none">
      
      {/* Intense Core Glow (Behind the graph, very soft) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative w-full max-w-[600px] h-[350px]"
      >
        
        {/* Grid Lines for technical feel (Purely transparent lines) */}
        <div className="absolute inset-0 flex flex-col justify-end pb-8 opacity-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-px bg-white border-b border-dashed border-white/20 mb-[60px]" />
          ))}
        </div>

        {/* The Graph */}
        <svg viewBox="0 0 600 350" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id="heroGraphGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
            </linearGradient>
            <filter id="heroGraphGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="heroGraphGlowIntense" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Gradient Fill */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            d="M 20,300 L 20,250 C 100,250 150,180 250,190 C 350,200 400,100 500,120 C 560,130 580,50 580,50 L 580,300 Z"
            fill="url(#heroGraphGradient)"
          />

          {/* Glowing Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: 'easeInOut' }}
            d="M 20,250 C 100,250 150,180 250,190 C 350,200 400,100 500,120 C 560,130 580,50 580,50"
            fill="none"
            stroke="#FF6B00"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#heroGraphGlowIntense)"
          />

          {/* Core White Line inside Glow */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: 'easeInOut' }}
            d="M 20,250 C 100,250 150,180 250,190 C 350,200 400,100 500,120 C 560,130 580,50 580,50"
            fill="none"
            stroke="#FFD5B8"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Data Nodes */}
          {[
            { cx: 20, cy: 250, delay: 0.5 },
            { cx: 250, cy: 190, delay: 1.1 },
            { cx: 500, cy: 120, delay: 1.8 },
            { cx: 580, cy: 50, delay: 2.3, isMax: true }
          ].map((point, i) => (
            <g key={i}>
              {/* Outer Pulse */}
              <motion.circle
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0] }}
                transition={{ duration: 2, delay: point.delay, repeat: Infinity }}
                cx={point.cx}
                cy={point.cy}
                r="12"
                fill="none"
                stroke="#FF6B00"
                strokeWidth="2"
              />
              {/* Core Node */}
              <motion.circle
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: point.delay, type: 'spring' }}
                cx={point.cx}
                cy={point.cy}
                r={point.isMax ? "10" : "8"}
                fill="#121215"
                stroke="#FFD5B8"
                strokeWidth="3"
                filter="url(#heroGraphGlowIntense)"
              />
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  )
}

export default HeroGrowthGraph
