"use client";

import { useEffect, useState, useRef } from "react";
import { Camera, Cpu, Battery, BatteryCharging, Zap, Smartphone, Shield, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function FeaturesSection() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="features" ref={sectionRef} className="py-32 relative bg-gradient-to-b from-black to-black/95">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            The Hardware That Thinks
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Every component engineered for performance, privacy, and longevity.
          </p>
        </motion.div>
        
        {/* Feature Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          {/* AI Core - Featured */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 p-8 md:p-10 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="mb-6 inline-flex">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Neural AI Core</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Dedicated on-device learning. Understands your habits, optimizes performance, protects your privacy. The processor never sends your data to the cloud.
              </p>
              <div className="mt-6 flex items-center gap-2 text-blue-400 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Native intelligence
              </div>
            </div>
          </motion.div>

          {/* Camera System */}
          <motion.div 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 p-8 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="mb-4 inline-flex">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">108MP Camera</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Captures 4x more light. AI-enhanced processing. Cinema mode in your pocket.
              </p>
            </div>
          </motion.div>

          {/* Battery Life */}
          <motion.div 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 p-8 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="mb-4 inline-flex">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <BatteryCharging className="w-5 h-5 text-green-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3+ Day Battery</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Industry-leading efficiency. Recharges in 15 minutes.
              </p>
            </div>
          </motion.div>

          {/* Build Quality */}
          <motion.div 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 p-8 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="mb-4 inline-flex">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-orange-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Aerospace Grade</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Precision-milled. IP68 rated. Gorilla Glass 2. Built to last.
              </p>
            </div>
          </motion.div>

          {/* Privacy First */}
          <motion.div 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 p-8 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="mb-4 inline-flex">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Private by Design</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Encrypted end-to-end. No cloud snooping. Your data, your control.
              </p>
            </div>
          </motion.div>

          {/* NovaOS Integration */}
          <motion.div 
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 p-8 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="mb-4 inline-flex">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">NovaOS OS</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Custom intelligent OS. Made in India. Optimized for AI-first computing.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-white/60 mb-6">Every feature engineered to advance your life forward.</p>
        </motion.div>
      </div>
    </section>
  );
}