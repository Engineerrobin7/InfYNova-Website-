'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const VisionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-nova-midnight via-nova-black to-nova-midnight" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const positions = [
            { left: 10, top: 20 }, { left: 85, top: 15 }, { left: 25, top: 80 }, { left: 70, top: 45 },
            { left: 45, top: 10 }, { left: 90, top: 70 }, { left: 15, top: 55 }, { left: 60, top: 85 },
            { left: 35, top: 25 }, { left: 80, top: 60 }, { left: 5, top: 40 }, { left: 95, top: 30 },
            { left: 50, top: 75 }, { left: 20, top: 5 }, { left: 75, top: 90 }, { left: 40, top: 50 },
            { left: 65, top: 35 }, { left: 30, top: 65 }, { left: 85, top: 20 }, { left: 55, top: 95 }
          ]
          const durations = [8, 10, 9, 11, 7, 12, 8.5, 9.5, 10.5, 7.5, 11.5, 8.2, 9.8, 10.2, 7.8, 11.2, 8.8, 9.2, 10.8, 7.2]
          const delays = [0, 2, 4, 1, 6, 3, 5, 7, 1.5, 3.5, 5.5, 7.5, 0.5, 2.5, 4.5, 6.5, 1.2, 3.2, 5.2, 7.2]
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-nova-blue rounded-full"
              style={{
                left: `${positions[i]?.left || 50}%`,
                top: `${positions[i]?.top || 50}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: durations[i] || 8,
                repeat: Infinity,
                delay: delays[i] || 0,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            ref={ref}
            className="space-y-8"
            style={{ y, opacity }}
          >
            <motion.h2
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-nova-blue to-nova-purple bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Born to Redefine{' '}
              <span className="block text-nova-glow">
                India's Tech Legacy
              </span>
            </motion.h2>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl text-nova-silver leading-relaxed">
                At InfYNova, we create devices that feel alive, intuitive, and human-centric. 
                Our mission is to empower India's tech future with innovation that matters.
              </p>

              <p className="text-lg text-nova-silver/80 leading-relaxed">
                Every line of code, every design decision, and every feature is crafted with 
                the vision of making technology more accessible, intelligent, and sustainable 
                for the next generation of Indian innovators.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { number: '100M+', label: 'Users Targeted' },
                { number: '50+', label: 'AI Features' },
                { number: '24/7', label: 'Smart Learning' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    className="text-2xl lg:text-3xl font-bold text-nova-blue mb-2"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-nova-silver">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - AI Ecosystem Visualization */}
          <motion.div
            className="relative h-96 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* Central AI core */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-nova-blue to-nova-purple rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
              }}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-nova-black font-bold text-sm">AI</span>
              </div>
            </motion.div>

            {/* Orbiting elements */}
            {[
              { label: 'Learning', angle: 0, radius: 120, color: 'nova-blue' },
              { label: 'Adapting', angle: 72, radius: 100, color: 'nova-purple' },
              { label: 'Optimizing', angle: 144, radius: 140, color: 'nova-glow' },
              { label: 'Predicting', angle: 216, radius: 110, color: 'nova-blue' },
              { label: 'Evolving', angle: 288, radius: 130, color: 'nova-purple' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateX(${item.radius}px) rotate(-${item.angle}deg)`
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15 + index * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className={`glass rounded-lg px-3 py-2 text-sm font-medium text-${item.color} border border-${item.color}/30`}>
                  {item.label}
                </div>
              </motion.div>
            ))}

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx="50%"
                  cy="50%"
                  r={80 + i * 20}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
                  transition={{ duration: 2, delay: i * 0.2 }}
                />
              ))}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VisionSection