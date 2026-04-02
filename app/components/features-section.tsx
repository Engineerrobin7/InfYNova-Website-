"use client";

import { useEffect, useState, useRef } from "react";
import { Camera, Cpu, Battery, Clock, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  index: number;
}

function FeatureCard({ icon, title, description, delay, index }: FeatureCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: 10,
      rotateY: 10,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      rotateY: 0,
      transition: { 
        type: "spring",
        stiffness: 50,
        delay: delay * 0.001,
        duration: 0.8
      }
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      ref={ref}
      id={`feature-${title}`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.05, 
        rotateY: index % 2 === 0 ? 5 : -5,
        transition: { type: "spring", stiffness: 400 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass p-6 rounded-xl cursor-pointer transform-gpu perspective-1000 transition-all duration-300"
    >
      <div className="relative h-12 w-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-4 overflow-hidden group">
        <motion.div 
          animate={isHovered ? { rotateZ: 360 } : { rotateZ: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Camera className="text-primary" />,
      title: "Pro Camera System",
      description: "Capture stunning photos and videos with our advanced 108MP camera system."
    },
    {
      icon: <Cpu className="text-primary" />,
      title: "Next-gen Processor",
      description: "Experience lightning-fast performance with our custom Infynova chipset."
    },
    {
      icon: <Battery className="text-primary" />,
      title: "All-day Battery",
      description: "Stay powered all day with our high-capacity intelligent battery system."
    },
    {
      icon: <Clock className="text-primary" />,
      title: "Fast Charging",
      description: "Get hours of power in just minutes with our 100W fast charging technology."
    },
    {
      icon: <RotateCw className="text-primary" />,
      title: "360° Experience",
      description: "Immerse yourself in our revolutionary user interface designed for seamless interaction."
    }
  ];

  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const headingRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={headingRef} 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-accent">
            Revolutionary Features
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Our latest smartphone comes packed with cutting-edge technology designed to transform your mobile experience.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-full"
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          {/* Main Hero Bento Card */}
          <div className="md:col-span-4 md:row-span-2 relative overflow-hidden group rounded-3xl border border-white/5 bg-gradient-to-br from-primary/10 to-accent/5 p-8 transition-all hover:border-primary/50">
             <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <Camera className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-3xl font-display font-bold mb-3 tracking-tight">108MP Computational Photography</h3>
                  <p className="text-foreground/60 max-w-sm text-lg leading-relaxed">
                    Harnessing AI to capture detail beyond human vision. Every pixel is optimized for professional-grade results in any lighting.
                  </p>
                </div>
                <div className="mt-8">
                   <div className="flex gap-2 mb-2">
                     <span className="px-3 py-1 bg-primary/20 rounded-full text-[10px] uppercase font-bold tracking-widest text-primary">Ultra-Wide</span>
                     <span className="px-3 py-1 bg-accent/20 rounded-full text-[10px] uppercase font-bold tracking-widest text-accent">Night-Sight</span>
                   </div>
                </div>
             </div>
             {/* Abstract Glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10 group-hover:bg-primary/30 transition-colors"></div>
          </div>

          {/* Performance Card */}
          <div className="md:col-span-2 relative overflow-hidden group rounded-3xl border border-white/5 bg-accent/5 p-8 transition-all hover:border-accent/50">
             <Cpu className="w-10 h-10 text-accent mb-4" />
             <h3 className="text-xl font-bold mb-2">Snapdragon 8 Gen 3</h3>
             <p className="text-foreground/60 text-sm">
                Custom-tuned for InfYNova to deliver 40% more AI efficiency.
             </p>
          </div>

          {/* Battery Card */}
          <div className="md:col-span-2 relative overflow-hidden group rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-foreground/20">
             <Battery className="w-10 h-10 text-foreground/40 mb-4 group-hover:text-primary transition-colors" />
             <h3 className="text-xl font-bold mb-2">5500mAh Intelligent Cell</h3>
             <p className="text-foreground/60 text-sm">
                2-day battery life powered by NovaOS adaptation.
             </p>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced animated background elements */}
      <motion.div 
        className="absolute top-1/2 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl -z-10"
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl -z-10"
        animate={{
          x: [0, -10, 0],
          y: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
    </section>
  );
}