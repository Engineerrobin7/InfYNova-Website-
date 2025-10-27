"use client";

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Brain, Zap, Shield, Smartphone, ChevronRight, Star } from 'lucide-react';

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  video?: string;
  image?: string;
};

const features: Feature[] = [
  {
    id: 'ai',
    title: 'SmartCore AI',
    description: 'Our adaptive AI learns your habits and optimizes your experience. It prioritizes your most-used apps, adjusts battery usage patterns based on your day, and anticipates your needs before you even ask.',
    icon: Brain,
    image: '/placeholder.svg'
  },
  {
    id: 'performance',
    title: 'Zero-Lag UX',
    description: 'Every interaction feels instantaneous. Our custom silicon and optimized software work in harmony to deliver a buttery-smooth experience that makes other phones feel sluggish.',
    icon: Zap,
    image: '/placeholder.svg'
  },
  {
    id: 'security',
    title: 'NovaShield Security',
    description: 'Your data stays yours with our advanced security architecture. Military-grade encryption, real-time threat monitoring, and privacy controls that actually make sense.',
    icon: Shield,
    image: '/placeholder.svg'
  },
  {
    id: 'customization',
    title: 'PersonalFlow UI',
    description: 'Make your Infynova truly yours with our adaptive interface. Dynamic themes, contextual widgets, and gesture customization that adapts to how you naturally use your phone.',
    icon: Smartphone,
    image: '/placeholder.svg'
  }
];

export function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState<string>(features[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 overflow-hidden relative"
      id="interactive-features"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-[-1]" />
      
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Star className="h-3 w-3 mr-1 text-primary" />
            <span>Revolutionary Features</span>
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Experience <span className="text-gradient">Next-Gen</span> Mobile Technology
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Infynova redefines what a smartphone can be with cutting-edge features that adapt to your life.
          </p>
        </div>

        <Tabs 
          defaultValue={features[0].id} 
          value={activeFeature}
          onValueChange={setActiveFeature}
          className="w-full max-w-5xl mx-auto"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full mb-8">
            {features.map((feature) => (
              <TabsTrigger 
                key={feature.id}
                value={feature.id}
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary/20"
              >
                <feature.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {features.map((feature, i) => (
            <TabsContent 
              key={feature.id} 
              value={feature.id}
              className="focus:outline-none mt-0"
            >
              <motion.div 
                className="grid md:grid-cols-2 gap-8 items-center"
                variants={{ 
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                initial="hidden"
                animate={isInView && activeFeature === feature.id ? "visible" : "hidden"}
              >
                <motion.div 
                  variants={featureVariants}
                  custom={0}
                  className="order-2 md:order-1"
                >
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <Button variant="default" className="group">
                    Learn more 
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                <motion.div 
                  variants={featureVariants}
                  custom={1}
                  className="order-1 md:order-2 bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl p-4 aspect-square flex items-center justify-center"
                >
                  <div className="relative w-full h-full max-w-sm mx-auto">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-24 w-24 text-primary/50" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}