"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

export function SpecsSection() {
  const [selectedTab, setSelectedTab] = useState("pro");
  
  return (
    <section id="specs" className="py-32 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="heading-xl tracking-tight text-white mb-6">
            Compare models.
          </h2>
          <p className="body-lg mx-auto max-w-xl text-muted-foreground">
            Find the InfYNova that perfectly fits your workflow.
          </p>
        </div>
        
        <div className="w-full">
          <Tabs 
            defaultValue="pro" 
            className="w-full"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <div className="flex justify-center mb-12">
               <TabsList className="bg-[#111111] border border-white/10 p-1 rounded-full h-auto">
                 {["standard", "pro", "ultra"].map(tab => (
                    <TabsTrigger 
                       key={tab} 
                       value={tab} 
                       className="rounded-full px-6 py-2 md:px-10 md:py-3 text-sm md:text-base font-medium data-[state=active]:bg-white data-[state=active]:text-black text-white/50 transition-all capitalize"
                    >
                      {tab === "standard" ? "Infynova" : `Infynova ${tab}`}
                    </TabsTrigger>
                 ))}
               </TabsList>
            </div>
            
            <div className="relative">
              <AnimatePresence mode="wait">
                {["standard", "pro", "ultra"].map(tab => (
                  selectedTab === tab && (
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-16"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                          <ul className="space-y-6 divide-y divide-white/10">
                            {[
                               { label: "Display", standard: "6.1\" OLED", pro: "6.5\" AMOLED 120Hz", ultra: "6.9\" Dynamic AMOLED 144Hz" },
                               { label: "Processor", standard: "A1 Bionic", pro: "A2 Pro Neural", ultra: "A3 Ultra Quantum" },
                               { label: "Memory", standard: "8GB Unified memory", pro: "12GB Unified memory", ultra: "16GB Unified memory" },
                               { label: "Storage", standard: "Up to 256GB", pro: "Up to 512GB", ultra: "Up to 1TB" },
                               { label: "Camera", standard: "Dual 48MP system", pro: "Pro 48MP system", ultra: "Pro 108MP system" },
                               { label: "Battery", standard: "4,000 mAh", pro: "4,800 mAh", ultra: "5,500 mAh" }
                            ].map((spec, i) => (
                               <li key={i} className="flex justify-between items-center pt-6 first:pt-0">
                                 <span className="text-white/50 text-sm">{spec.label}</span>
                                 <span className="text-white font-medium text-right max-w-[200px]">
                                   {tab === "standard" ? spec.standard : tab === "pro" ? spec.pro : spec.ultra}
                                 </span>
                               </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          {/* Minimalist Phone Vector inside Card instead of bloated rotating 3d cube */}
                           <div className="w-[200px] h-[420px] rounded-[3rem] border-4 border-[#333] bg-black p-2 shadow-2xl relative">
                              <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-tr from-[#111] to-[#222] flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">
                                  {/* Dynamic Island style cutout */}
                                  <div className="absolute top-4 w-1/3 h-5 bg-black rounded-full"></div>
                                  
                                  <span className="text-2xl font-bold tracking-tight text-white/20 select-none uppercase">
                                    {tab === "standard" ? "SERIES 1" : tab === "pro" ? "PRO" : "ULTRA"}
                                  </span>
                              </div>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}