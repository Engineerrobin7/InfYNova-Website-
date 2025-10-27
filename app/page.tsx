"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { SpecsSection } from "./components/specs-section";
import { DesignSection } from "./components/design-section";
import { CTASection } from "./components/cta-section";
import { Footer } from "./components/Footer";
import { lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InteractiveFeatures } from "./components/interactive-features";
import { ContentLoader } from "./components/content-loader";

// Lazy load the 3D component for better performance with more specific chunking
const LazyProduct3DView = lazy(() => 
  import("./components/product-3d-view").then(mod => ({ default: mod.Product3DView }))
);

export default function Home() {
  // Smooth scrolling for all anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // References and scroll animations with performance optimization
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values based on scroll with reduced calculations
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
      <Navbar />
      <main id="main-content" ref={containerRef} className="min-h-screen overflow-x-hidden">
        {/* Critical above-the-fold content loads first */}
        <HeroSection />
        
        {/* Progressive loading of sections */}
        <FeaturesSection />
        <InteractiveFeatures />
        
        {/* 3D section with optimized loading */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-16 md:py-20 container mx-auto relative"
          aria-labelledby="experience-3d-heading"
        >
          <h2 
            id="experience-3d-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-accent"
          >
            Experience Infinova in 3D
          </h2>
          
          {/* Static decorative elements to prevent layout shift */}
          <div className="absolute top-10 left-5 w-20 h-20 border border-primary/20 rounded-full opacity-50" style={{ willChange: 'auto' }}></div>
          <div className="absolute bottom-10 right-5 w-40 h-40 border border-primary/20 rounded-full opacity-30" style={{ willChange: 'auto' }}></div>
          <div className="absolute top-40 right-20 w-10 h-10 border border-primary/30 rounded-full opacity-60" style={{ willChange: 'auto' }}></div>
          
          {/* Optimized 3D component loading with fixed dimensions to prevent CLS */}
          <div className="h-[600px] w-full" style={{ minHeight: '600px' }}>
            <Suspense fallback={
              <ContentLoader isLoading={true} variant="media" className="h-full mx-auto max-w-3xl">
                <div className="h-full w-full bg-gradient-to-b from-primary/5 to-transparent rounded-3xl animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm text-muted-foreground">Loading 3D Experience...</p>
                  </div>
                </div>
              </ContentLoader>
            }>
              <LazyProduct3DView />
            </Suspense>
          </div>
        </motion.section>
        
        {/* Remaining sections load progressively */}
        <SpecsSection />
        <DesignSection />
        <CTASection />
      </main>
      
      <Footer />
      
      {/* Enhanced scroll progress indicator with better performance */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 origin-left"
        style={{ 
          scaleX: scrollYProgress,
          opacity: useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 1, 1]),
          willChange: 'transform'
        }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={scrollProgress.get()}
        aria-label="Page scroll progress"
      />
    </>
  );
}