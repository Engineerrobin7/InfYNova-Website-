"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { NeuralGlyphAnimation } from "./neural-glyph-animation"

export function ProductScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Create reveal animations for each feature
  const aiReveal = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const batteryReveal = useTransform(scrollYProgress, [0.2, 0.45], [0, 1])
  const privacyReveal = useTransform(scrollYProgress, [0.4, 0.65], [0, 1])
  const buildReveal = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])
  const osReveal = useTransform(scrollYProgress, [0.75, 1], [0, 1])

  return (
    <section ref={containerRef} className="relative py-40 md:py-60 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black to-black/40 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32 md:mb-40"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Scroll to Discover
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Each component, engineered with precision. Scroll down to experience the innovation.
          </p>
        </motion.div>

        {/* Feature 1: AI */}
        <motion.div
          className="mb-32 md:mb-48 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
          style={{ opacity: aiReveal }}
        >
          <motion.div style={{ x: useTransform(aiReveal, [0, 1], [-50, 0]) }}>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Neural AI that learns you</h3>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              A dedicated neural core processes data locally, never sent to the cloud. The AI understands your habits, optimizes your experience, and protects your privacy by design.
            </p>
            <div className="flex items-center gap-3 text-blue-400 font-semibold">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              On-device intelligence
            </div>
          </motion.div>
          <motion.div className="h-80 md:h-96 flex items-center justify-center">
            <NeuralGlyphAnimation />
          </motion.div>
        </motion.div>

        {/* Feature 2: Battery */}
        <motion.div
          className="mb-32 md:mb-48 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
          style={{ opacity: batteryReveal }}
        >
          <motion.div className="hidden md:block h-80 md:h-96 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-400 mb-4">3+</div>
              <p className="text-green-400/80 font-semibold">Days of battery</p>
            </div>
          </motion.div>
          <motion.div style={{ x: useTransform(batteryReveal, [0, 1], [50, 0]) }}>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Battery that actually lasts</h3>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              3+ days of real-world usage. Fast-charging in 15 minutes. The neural AI optimizes power consumption based on your usage patterns, maximizing every percent.
            </p>
            <div className="flex items-center gap-3 text-green-400 font-semibold">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              Industry-leading efficiency
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 3: Privacy */}
        <motion.div
          className="mb-32 md:mb-48 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
          style={{ opacity: privacyReveal }}
        >
          <motion.div style={{ x: useTransform(privacyReveal, [0, 1], [-50, 0]) }}>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Privacy by design</h3>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              NovaOS is built on privacy-first principles. Encrypted end-to-end. No data is sent to servers without your explicit consent. Your phone, your data, your control.
            </p>
            <div className="flex items-center gap-3 text-red-400 font-semibold">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              Military-grade encryption
            </div>
          </motion.div>
          <motion.div className="h-80 md:h-96 rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🔒</div>
              <p className="text-red-400/80 font-semibold">Zero cloud access</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 4: Build Quality */}
        <motion.div
          className="mb-32 md:mb-48 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
          style={{ opacity: buildReveal }}
        >
          <motion.div className="hidden md:block h-80 md:h-96 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">⚙️</div>
              <p className="text-orange-400/80 font-semibold text-lg">Precision crafted</p>
            </div>
          </motion.div>
          <motion.div style={{ x: useTransform(buildReveal, [0, 1], [50, 0]) }}>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Engineered for eternity</h3>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Aerospace-grade aluminum. Gorilla Glass 2. Precision-milled to within 0.1mm tolerances. IP68 rated for water and dust. Built to be repaired, not replaced.
            </p>
            <div className="flex items-center gap-3 text-orange-400 font-semibold">
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              10-year design lifecycle
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 5: NovaOS */}
        <motion.div
          className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
          style={{ opacity: osReveal }}
        >
          <motion.div style={{ x: useTransform(osReveal, [0, 1], [-50, 0]) }}>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">NovaOS: The future of mobile</h3>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Custom-engineered in India. AI-first architecture. Designed for InfyNova hardware. NovaOS reimagines what a smartphone OS can be.
            </p>
            <div className="flex items-center gap-3 text-cyan-400 font-semibold">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              Made in India, for the world
            </div>
          </motion.div>
          <motion.div className="hidden md:block h-80 md:h-96 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-cyan-400/80 font-semibold text-lg">Next generation OS</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
