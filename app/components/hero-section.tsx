"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleJoinMovement = () => {
    const buySection = document.getElementById("buy");
    if (buySection) {
      buySection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Split text animation setup
  const title = "Infynova";
  const tagline = "Revolutionizing Smartphones for a Smarter World";
  const titleArray = title.split("");
  const taglineArray = tagline.split("");

  return (
    <motion.section 
      ref={heroRef} 
      className="min-h-screen pt-24 pb-10 flex flex-col justify-center relative overflow-hidden"
      style={{ opacity, scale }}
      id="hero"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 relative z-10">
            <motion.h1 
              className="heading-xl leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div className="overflow-hidden inline-block">
                {titleArray.map((char, index) => (
                  <motion.span
                    key={`title-${index}`}
                    className={`inline-block ${char === "I" || char === "N" || char === "F" ? "text-gradient" : ""}`}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.05 * index,
                      duration: 0.8,
                      ease: [0.215, 0.61, 0.355, 1.0]
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            </motion.h1>
            
            <motion.div 
              className="body-lg font-light gradient-text-primary mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {taglineArray.map((char, index) => (
                <motion.span
                  key={`tagline-${index}`}
                  className="inline-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.7 + 0.04 * index,
                    duration: 0.6
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.p 
              className="body-md text-foreground/70 max-w-lg mt-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              The design-forward, AI-powered performance phone that's redefining what a smartphone can be. Experience the revolution with cutting-edge technology that adapts to your life.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden"
                  onClick={handleJoinMovement}
                >
                  <span className="relative z-10">Join the Movement</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group relative overflow-hidden"
                  onClick={() => window.location.href = "/novaos"}
                >
                  <span className="relative z-10">Discover NovaOS</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-background to-background/50 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          <motion.div 
            className="flex justify-center"
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              type: "spring",
              stiffness: 100 
            }}
          >
            <div ref={phoneRef} className="relative w-72 h-[600px] perspective-1000">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-[40px] blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  rotateX: mousePosition.y * 0.01, 
                  rotateY: -mousePosition.x * 0.01,
                  transformStyle: "preserve-3d"
                }}
              >
                <motion.div 
                  className="glass rounded-[40px] w-72 h-[600px] overflow-hidden border-8 border-background shadow-lg transform-gpu"
                  whileHover={{ 
                    scale: 1.05, 
                    transition: { duration: 0.5 } 
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `translateZ(20px)`
                  }}
                  aria-label="Infynova smartphone mockup"
                  role="img"
                >
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex flex-col items-center justify-center">
                    <motion.div 
                      className="text-5xl font-black tracking-tight text-gradient select-none"
                      animate={{
                        textShadow: ["0 0 5px rgba(255,255,255,0.3)", "0 0 15px rgba(255,255,255,0.5)", "0 0 5px rgba(255,255,255,0.3)"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      INFY
                      <span className="font-bold text-primary">NOVA</span>
                    </motion.div>
                    
                    <motion.div 
                      className="mt-8 w-16 h-16 relative"
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="absolute inset-0 border-t-2 border-primary/50 rounded-full"></div>
                      <div className="absolute inset-0 border-l-2 border-primary/30 rounded-full" style={{ transform: "rotate(45deg)" }}></div>
                      <div className="absolute inset-0 border-b-2 border-accent/50 rounded-full" style={{ transform: "rotate(90deg)" }}></div>
                    </motion.div>
                    
                    {/* Device shape outlines */}
                    <motion.div 
                      className="absolute bottom-12 w-16 h-1 bg-white/20 rounded-full"
                      animate={{
                        opacity: [0.2, 0.5, 0.2]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                    
                    {/* Tech specs that float in */}
                    <motion.div 
                      className="absolute bottom-24 right-4 text-[8px] text-white/70 text-right"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      <p>5G</p>
                      <p>108MP</p>
                      <p>12GB RAM</p>
                      <p>256GB</p>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute top-24 left-4 text-[8px] text-white/70 text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    >
                      <p>AI TECH</p>
                      <p>QUANTUM</p>
                      <p>NEURAL</p>
                      <p>ENGINE</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated scroll down */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        style={{ y: y2 }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <a href="#features" className="flex flex-col items-center text-foreground/60 hover:text-primary transition-colors group">
          <motion.span 
            className="text-sm mb-2"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Discover
          </motion.span>
          <motion.div
            className="relative"
            animate={{
              y: [0, 5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <ChevronDown className="h-6 w-6 group-hover:text-primary transition-colors" />
          </motion.div>
        </a>
      </motion.div>
      
      {/* Enhanced Parallax Background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"
          style={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl"
          style={{
            x: -mousePosition.x * 0.3,
            y: -mousePosition.y * 0.3,
          }}
        ></motion.div>
        
        <motion.div
          className="absolute top-1/2 right-1/3 w-40 h-40 bg-primary/10 rounded-full filter blur-xl"
          style={{
            x: mousePosition.x * 0.2,
            y: mousePosition.y * 0.2,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        {/* Grid lines for tech aesthetic */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={`h-line-${i}`}
              className="absolute h-px w-full bg-primary/30"
              style={{ top: `${5 * i}%` }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scaleY: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={`v-line-${i}`}
              className="absolute w-px h-full bg-primary/30"
              style={{ left: `${5 * i}%` }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scaleX: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}