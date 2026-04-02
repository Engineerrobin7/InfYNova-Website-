"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Shield, Sparkles, Zap, Cpu } from "lucide-react";

export function Product3DView() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full min-h-[600px] flex items-center justify-center relative group py-20 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 blur-[100px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-1000 delay-500" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Neural Architecture v4.2</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                CRAFTED IN <br />
                <span className="text-primary">PURE PIXELS.</span>
              </h2>
              <p className="text-lg text-white/60 max-w-md font-medium leading-relaxed">
                Experience the intersection of luxury and artificial intelligence. Every curve of the InfYNova Pro is mathematically optimized for ergonomics and signal strength.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: "Aerospace Grade", value: "Titanium Sub-frame" },
                { icon: Zap, label: "Response Rate", value: "0.001ms Latency" },
                { icon: Sparkles, label: "Finish", value: "Stellar Obsidian" },
                { icon: Cpu, label: "Engine", value: "Nova Neural Core" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group/item">
                  <item.icon className="w-5 h-5 text-primary mb-3 group-hover/item:scale-110 transition-transform" />
                  <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3D Visual Side (Video Fallback) */}
          <motion.div 
            className="relative lg:h-[600px] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* The main phone frame */}
            <div className="relative w-full max-w-[400px] aspect-[9/19] rounded-[3rem] p-3 bg-[#111] border-[12px] border-[#222] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
              {/* Internal Bezel */}
              <div className="absolute inset-x-0 top-0 h-8 bg-black z-20 flex items-center justify-center">
                <div className="w-24 h-6 bg-black rounded-b-3xl" /> {/* Dynamic Island shape */}
              </div>

              {/* VIDEO CONTENT */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-black relative">
                 {/* This represents the screen content - using video for ultra-smooth looks without taxing the GPU like Spline */}
                 <video 
                   ref={videoRef}
                   src="/3d-fallback.mp4" 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                 />
                 
                 {/* Screen Glare Effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                 
                 {/* Floating Labels in the "Screen" */}
                 <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <h4 className="text-white font-bold text-xl mb-1 tracking-tight">InfYNova Pro</h4>
                      <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Neural Display v2</p>
                    </motion.div>
                 </div>
              </div>

              {/* Glass Reflection Over the Whole Phone */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none shadow-inner" />
            </div>

            {/* Floating Decorative Elements */}
            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 backdrop-blur-3xl rounded-3xl border border-white/10 -z-10"
            />
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 backdrop-blur-3xl rounded-full border border-white/10 -z-10"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}