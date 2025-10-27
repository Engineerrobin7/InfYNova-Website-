"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function SpecsSection() {
  const [selectedTab, setSelectedTab] = useState("pro");
  const { ref: sectionRef, inView: isVisible } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  const phoneModels = {
    standard: { color: "from-background via-secondary to-secondary/50" },
    pro: { color: "from-background via-primary/20 to-primary/40" },
    ultra: { color: "from-background via-accent/30 to-accent/50" }
  };
  
  const tabVariants: Variants = {
    inactive: {
      opacity: 0.6,
      scale: 0.95,
      transition: { duration: 0.3 }
    },
    active: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const contentVariants: Variants = {
    hidden: { 
      opacity: 0,
      x: 20,
      rotateY: 15
    },
    visible: { 
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      rotateY: -15,
      transition: { duration: 0.3 }
    }
  };
  
  const phoneVariants: Variants = {
    initial: { rotateY: 0 },
    animate: {
      rotateY: [0, 10, 0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      id="specs" 
      className="py-20 relative"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-accent">
              Technical Specifications
            </span>
          </motion.h2>
          <motion.p 
            className="text-foreground/70 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Compare our models to find the perfect Infynova smartphone for you.
          </motion.p>
        </motion.div>
        
        <div className="w-full max-w-3xl mx-auto perspective-1000">
          <Tabs 
            defaultValue="pro" 
            className="w-full"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {["standard", "pro", "ultra"].map(tab => (
                <motion.div
                  key={tab}
                  variants={tabVariants}
                  animate={selectedTab === tab ? "active" : "inactive"}
                  className="w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TabsTrigger value={tab} className="w-full">
                    {tab === "standard" ? "Infynova" : tab === "pro" ? "Infynova Pro" : "Infynova Ultra"}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
            
            <div className="relative perspective-1000">
              <AnimatePresence mode="wait">
                {["standard", "pro", "ultra"].map(tab => (
                  selectedTab === tab && (
                    <motion.div
                      key={tab}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="transform-gpu"
                    >
                      <Card className="bg-background/40 backdrop-blur-sm border border-border/50 shadow-lg">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-xl font-bold mb-4">
                                {tab === "standard" ? "Infynova" : tab === "pro" ? "Infynova Pro" : "Infynova Ultra"}
                              </h3>
                              <ul className="space-y-3">
                                <motion.li 
                                  className="flex justify-between"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <span className="text-foreground/70">Display</span>
                                  <span>
                                    {tab === "standard" 
                                      ? "6.1\" OLED" 
                                      : tab === "pro" 
                                        ? "6.5\" AMOLED 120Hz" 
                                        : "6.9\" Dynamic AMOLED 144Hz"}
                                  </span>
                                </motion.li>
                                <motion.li 
                                  className="flex justify-between"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <span className="text-foreground/70">Processor</span>
                                  <span>
                                    {tab === "standard" 
                                      ? "Infynova A1" 
                                      : tab === "pro" 
                                        ? "Infynova A2 Pro" 
                                        : "Infynova A3 Ultra"}
                                  </span>
                                </motion.li>
                                <motion.li 
                                  className="flex justify-between"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <span className="text-foreground/70">RAM</span>
                                  <span>
                                    {tab === "standard" ? "8GB" : tab === "pro" ? "12GB" : "16GB"}
                                  </span>
                                </motion.li>
                                <motion.li 
                                  className="flex justify-between"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  <span className="text-foreground/70">Storage</span>
                                  <span>
                                    {tab === "standard" ? "128GB" : tab === "pro" ? "256GB" : "512GB"}
                                  </span>
                                </motion.li>
                                <motion.li 
                                  className="flex justify-between"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <span className="text-foreground/70">Camera</span>
                                  <span className="text-right max-w-[200px]">
                                    {tab === "standard" 
                                      ? "48MP Main, 12MP Ultra-wide" 
                                      : tab === "pro" 
                                        ? "108MP Main, 16MP Ultra-wide, 8MP Telephoto" 
                                        : "200MP Main, 50MP Ultra-wide, 20MP Telephoto"}
                                  </span>
                                </motion.li>
                                <motion.li 
                                  className="flex justify-between"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 }}
                                >
                                  <span className="text-foreground/70">Battery</span>
                                  <span>
                                    {tab === "standard" ? "4,000 mAh" : tab === "pro" ? "4,800 mAh" : "5,500 mAh"}
                                  </span>
                                </motion.li>
                                <motion.li 
                                  className="flex justify-between"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.7 }}
                                >
                                  <span className="text-foreground/70">Charging</span>
                                  <span>
                                    {tab === "standard" ? "45W Fast Charging" : tab === "pro" ? "65W Fast Charging" : "100W Fast Charging"}
                                  </span>
                                </motion.li>
                              </ul>
                            </div>
                            <div className="flex items-center justify-center">
                              <motion.div 
                                className={`w-48 h-96 rounded-3xl bg-gradient-to-br ${phoneModels[tab as keyof typeof phoneModels].color} flex items-center justify-center border-4 border-background shadow-lg transform-gpu`}
                                initial="initial"
                                animate="animate"
                                variants={phoneVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 1.05 }}
                              >
                                <span className="text-xl font-bold text-gradient select-none">
                                  {tab === "standard" 
                                    ? "INFYNOVA" 
                                    : tab === "pro" 
                                      ? "INFYNOVA PRO" 
                                      : "INFYNOVA ULTRA"}
                                </span>
                              </motion.div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
      
      <motion.div 
        className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl -z-10"
        animate={{
          x: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
    </motion.section>
  );
}