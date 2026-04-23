"use client"

import { motion } from "framer-motion"
import { useRef, useEffect } from "react"

export function NeuralGlyphAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Animation variants
  const outerRing = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const middleRing = {
    animate: {
      rotate: -360,
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const innerOrb = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const particles = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 2 + i * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }
    })
  }

  return (
    <div ref={containerRef} className="flex items-center justify-center w-full h-full">
      <div className="relative w-full max-w-sm aspect-square">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 rounded-full blur-3xl"></div>

        {/* Main container - sized for responsive display */}
        <svg
          className="w-full h-full"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer rotating ring with gradient */}
          <defs>
            <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
            </linearGradient>
            
            <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Outer ring - slow rotation */}
          <motion.g variants={outerRing} animate="animate">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#outerGradient)"
              strokeWidth="1.5"
              strokeDasharray="8,4"
              opacity="0.7"
            />
            {/* Outer ring accent points */}
            <circle cx="100" cy="15" r="2.5" fill="rgb(59, 130, 246)" opacity="0.8" />
            <circle cx="185" cy="100" r="2" fill="rgb(168, 85, 247)" opacity="0.6" />
            <circle cx="100" cy="185" r="2.5" fill="rgb(59, 130, 246)" opacity="0.8" />
            <circle cx="15" cy="100" r="2" fill="rgb(168, 85, 247)" opacity="0.6" />
          </motion.g>

          {/* Middle ring - counter rotation */}
          <motion.g variants={middleRing} animate="animate">
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="url(#innerGradient)"
              strokeWidth="1"
              strokeDasharray="6,3"
              opacity="0.5"
            />
          </motion.g>

          {/* Inner nodes - stationary connection points */}
          <g opacity="0.4">
            <circle cx="100" cy="50" r="1.5" fill="rgb(96, 165, 250)" />
            <circle cx="141" cy="76" r="1.5" fill="rgb(147, 51, 234)" />
            <circle cx="141" cy="124" r="1.5" fill="rgb(96, 165, 250)" />
            <circle cx="100" cy="150" r="1.5" fill="rgb(147, 51, 234)" />
            <circle cx="59" cy="124" r="1.5" fill="rgb(96, 165, 250)" />
            <circle cx="59" cy="76" r="1.5" fill="rgb(147, 51, 234)" />
          </g>

          {/* Connecting lines to nodes */}
          <g stroke="url(#innerGradient)" strokeWidth="0.8" opacity="0.3">
            <line x1="100" y1="100" x2="100" y2="50" />
            <line x1="100" y1="100" x2="141" y2="76" />
            <line x1="100" y1="100" x2="141" y2="124" />
            <line x1="100" y1="100" x2="100" y2="150" />
            <line x1="100" y1="100" x2="59" y2="124" />
            <line x1="100" y1="100" x2="59" y2="76" />
          </g>

          {/* Central orb - pulsing and glowing */}
          <motion.circle
            cx="100"
            cy="100"
            r="8"
            fill="url(#innerGradient)"
            variants={innerOrb}
            animate="animate"
            filter="url(#glow)"
          />

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </svg>

        {/* Orbiting particles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-2px",
                marginLeft: "-2px",
              }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 6) * 60,
                y: Math.sin((i * Math.PI * 2) / 6) * 60 - 2,
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
