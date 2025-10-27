"use client";

import { motion } from "framer-motion";

export function Product3DView() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div 
        className="w-64 h-96 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-background border-4 border-background shadow-lg flex items-center justify-center"
        animate={{ 
          rotateY: [0, 15, 0, -15, 0],
          y: [0, -10, 0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="text-center">
          <motion.div 
            className="text-3xl font-bold text-gradient mb-4"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            INFYNOVA
          </motion.div>
          <div className="text-sm text-primary/80">3D Experience</div>
        </div>
      </motion.div>
    </div>
  );
}