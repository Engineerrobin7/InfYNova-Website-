"use client";

import { useEffect, useState } from "react";
import { ChevronRight, PenTool, Palette, Layout } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function DesignSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = document.getElementById("design-section");
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const designFeatures = [
    {
      icon: <PenTool className="h-6 w-6 text-primary" />,
      title: "Bold Minimalist Design",
      description: "Infynova's design philosophy merges minimalism with bold statement elements, creating a device that feels premium while maintaining a distinctive presence."
    },
    {
      icon: <Layout className="h-6 w-6 text-primary" />,
      title: "Infinity Edge Display",
      description: "Our borderless display creates an immersive viewing experience with stunning color accuracy and incredible detail for both content creation and consumption."
    },
    {
      icon: <Palette className="h-6 w-6 text-primary" />,
      title: "Premium Finishes",
      description: "Crafted with aerospace-grade materials and precision engineering, each Infynova device reflects both innovation and refined aesthetics."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % designFeatures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [designFeatures.length]);

  return (
    <section id="design" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            id="design-section"
            className={`transition-all duration-700 ${
              isVisible 
                ? "opacity-100 translate-x-0 animate-fade-in" 
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Precision Meets Passion</h2>
            <p className="text-foreground/70 mb-8">
              Every Infynova smartphone represents our design philosophy: 
              merging bold aesthetics with functional excellence, creating 
              devices that are both tools and statements.
            </p>
            
            <div className="space-y-8">
              {designFeatures.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className={`p-6 border-l-2 transition-all duration-500 cursor-pointer group ${
                    activeFeature === index 
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ x: 5 }}
                  animate={activeFeature === index ? { x: 5 } : { x: 0 }}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <motion.div 
                      animate={activeFeature === index ? { rotate: [0, 15, 0] } : {}} 
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{feature.title}</h3>
                  </div>
                  <p className="text-foreground/70 pl-10">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 animate-fade-in animate-delay-400">
              <Button className="group">
                Inside the Intelligence
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <motion.div 
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            initial={false}
            animate={isVisible ? { y: [20, 0], opacity: [0, 1] } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-40"></div>
              <div className="relative glass rounded-3xl p-8 border border-white/10 dark:border-white/5">
                <motion.div 
                  className="aspect-square rounded-2xl bg-gradient-to-br from-background via-secondary/30 to-primary/20 flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div 
                    className="w-48 h-96 rounded-3xl bg-gradient-to-br from-accent/20 via-primary/20 to-background border-4 border-background shadow-lg flex items-center justify-center"
                    animate={{ rotateY: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="relative">
                      <span className="text-xl font-bold text-gradient block">INFYNOVA</span>
                      <span className="text-xs text-primary/80 block mt-1">Awaken the Future</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl -z-10 animate-pulse-soft"></div>
    </section>
  );
}