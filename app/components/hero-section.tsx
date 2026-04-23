"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { NeuralGlyphAnimation } from "./neural-glyph-animation"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.section 
      ref={heroRef} 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-background via-background to-black/40 pt-20"
      id="hero"
    >
      {/* Subtle gradient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           style={{ opacity, y: useTransform(scrollYProgress, [0, 0.3], [0, 50]), scale }}
           className="flex flex-col items-center space-y-6"
        >
          {/* Main headline - clear value proposition */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block">The AI Phone</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
              that thinks with you
            </span>
          </motion.h1>
          
          {/* Subheadline - supporting context */}
          <motion.p 
            className="text-lg md:text-xl text-white/70 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Precision-engineered in India. Powered by neural AI that learns you, not data farms. NovaOS reimagines what a smartphone can be.
          </motion.p>
          
          {/* Primary CTA - dominant and clear */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="rounded-full bg-white text-black hover:bg-white/90 px-8 md:px-10 py-6 md:py-7 text-base md:text-lg font-semibold transition-all shadow-lg hover:shadow-xl group w-full sm:w-auto"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full border border-white/20 hover:border-white/40 px-8 md:px-10 py-6 md:py-7 text-base md:text-lg font-semibold text-white hover:bg-white/5 transition-all w-full sm:w-auto"
            >
              See NovaOS Demo
            </Button>
          </motion.div>

          {/* Trust signal - small supporting text */}
          <motion.p 
            className="text-sm text-white/50 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            ✓ 10,000+ on waitlist · Launching Q3 2025 · Battery life: 3+ days
          </motion.p>
        </motion.div>
      </div>

      {/* Sleek Device Mockup - Premium presentation with whitespace */}
      <motion.div 
        className="w-full max-w-4xl mt-20 md:mt-24 px-4 md:px-0 relative z-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: phoneY }}
      >
        {/* Phone frame with premium presentation */}
        <div className="relative w-full aspect-[16/10] md:aspect-[20/12]">
          {/* Glow effect behind phone */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent rounded-[3rem] md:rounded-[4rem] blur-2xl"></div>
          
          {/* Main phone frame */}
          <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-xl overflow-hidden glass shadow-2xl flex items-center justify-center">
            {/* Inner screen area */}
            <div className="absolute inset-2 md:inset-3 rounded-[2rem] md:rounded-[3rem] bg-black overflow-hidden flex items-center justify-center border border-white/5">
              {/* Screen content - gradient with neural glyph */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 flex flex-col items-center justify-center relative p-8">
                {/* Neural Glyph Display */}
                <div className="w-full h-full flex items-center justify-center">
                  <NeuralGlyphAnimation />
                </div>
                
                {/* Subtle top highlight */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-white/40 text-sm font-medium tracking-widest uppercase mb-3">Scroll to explore</div>
        <svg className="w-6 h-6 mx-auto text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>

    </motion.section>
  )
}