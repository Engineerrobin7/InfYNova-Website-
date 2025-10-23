'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const SimplePhone3D = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-48 h-80 mx-auto"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? 5 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Phone body */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-nova-midnight to-nova-black rounded-3xl shadow-2xl border border-nova-blue/20"
          animate={{
            boxShadow: isHovered 
              ? '0 20px 40px rgba(0, 212, 255, 0.3)' 
              : '0 10px 20px rgba(0, 0, 0, 0.5)'
          }}
        />

        {/* Screen */}
        <div className="absolute inset-4 bg-black rounded-2xl overflow-hidden">
          {/* Screen glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-nova-blue/20 to-nova-purple/20"
            animate={{
              opacity: isHovered ? 0.8 : 0.4
            }}
          />

          {/* NovaOS text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              animate={{
                scale: isHovered ? 1.1 : 1
              }}
            >
              <div className="text-2xl font-bold text-nova-blue mb-2">NovaOS</div>
              <motion.div
                className="w-4 h-4 bg-nova-purple rounded-full mx-auto"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </div>

          {/* Screen elements */}
          <div className="absolute top-4 left-4 right-4">
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-2 bg-nova-blue/50 rounded-full" />
              <div className="w-8 h-2 bg-nova-purple/50 rounded-full" />
            </div>
            
            {/* App icons simulation */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-nova-blue/30 to-nova-purple/30 rounded-lg"
                  animate={{
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Phone buttons */}
        <div className="absolute right-0 top-20 w-1 h-8 bg-nova-silver/50 rounded-l-full" />
        <div className="absolute right-0 top-32 w-1 h-12 bg-nova-silver/50 rounded-l-full" />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-nova-blue to-nova-purple opacity-0 blur-xl"
          animate={{
            opacity: isHovered ? 0.3 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  )
}

export default SimplePhone3D