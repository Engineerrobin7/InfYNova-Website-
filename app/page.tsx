"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { ProductScrollReveal } from "./components/product-scroll-reveal";
import { FeaturesSection } from "./components/features-section";
import { SpecsSection } from "./components/specs-section";
import { Footer } from "./components/Footer";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { PhoneBuilderGame } from "./components/phone-builder-game";
import { NovaOSSimulator } from "./components/novaos-simulator";
import { InteractiveFeatures } from "./components/interactive-features";
import { FloatingParticles } from "./components/floating-particles";
import { SEOBoost } from "./components/seo-boost";
import { ContentLoader } from "./components/content-loader";
import { ArrowRight } from "lucide-react";
import { CountdownTimer } from "./components/countdown-timer";
import { WaitlistCounter } from "./components/waitlist-counter";
import { FounderStory } from "./components/founder-story";
import { HowNovaOSWorks } from "./components/how-novaos-works";
import { Testimonials } from "./components/testimonials";
import { TrustBadges } from "./components/trust-badges";
import { RoadmapTimeline } from "./components/roadmap-timeline";
import { FAQSection } from "./components/faq-section";
import { PressMentions } from "./components/press-mentions";
import { StickyCTA } from "./components/sticky-cta";

// Lazy load the 3D component with next/dynamic for performance
const LazyProduct3DView = dynamic(
  () => import("./components/product-3d-view").then(mod => mod.Product3DView),
  { ssr: false }
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      <SEOBoost />
      <Navbar />
      <StickyCTA />
      <main id="main-content" ref={containerRef} className="min-h-screen overflow-x-hidden bg-background relative">
        <FloatingParticles className="z-0" />
        
        {/* Hero Section */}
        <HeroSection />

        {/* Product Scroll Reveal - Premium animation story */}
        <ProductScrollReveal />

        {/* Waitlist Counter - Social Proof */}
        <WaitlistCounter />
        
        {/* Trust Badges Row */}
        <TrustBadges />

        {/* Founder Story - Why InfyNova Exists */}
        <FounderStory />
        
        {/* How NovaOS Works - 3 Step Education */}
        <HowNovaOSWorks />
        
        {/* Core Product Features */}
        <FeaturesSection />
        
        {/* Interactive Features Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 container mx-auto relative px-6"
        >
          <div className="text-center mb-16">
            <h2 className="heading-lg md:heading-xl font-semibold mb-6 tracking-tight">
              Revolutionary Features
            </h2>
            <p className="body-lg mx-auto max-w-2xl text-muted-foreground">
              Discover what makes InfYNova the most advanced smartphone ever created.
            </p>
          </div>
          <InteractiveFeatures />
        </motion.section>
        
        {/* NovaOS Simulator */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 bg-black/50 backdrop-blur-sm"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-lg md:heading-xl font-semibold mb-6 tracking-tight">
                Experience NovaOS
              </h2>
              <p className="body-lg mx-auto max-w-2xl text-muted-foreground">
                Interact with our revolutionary operating system. Tap, swipe, and explore the future of mobile computing.
              </p>
            </div>
            <NovaOSSimulator />
          </div>
        </motion.section>
        
        {/* Interactive Phone Builder Game */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 container mx-auto relative px-6"
        >
          <div className="text-center mb-16">
            <h2 className="heading-lg md:heading-xl font-semibold mb-6 tracking-tight">
              Build Your Perfect InfYNova
            </h2>
            <p className="body-lg mx-auto max-w-2xl text-muted-foreground">
              Customize your device and see how it scores. The ultimate smartphone configurator.
            </p>
          </div>
          <PhoneBuilderGame />
        </motion.section>
        
        {/* Apple-style clean 3D Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 container mx-auto relative px-6"
        >
          <div className="text-center mb-16">
            <h2 className="heading-lg md:heading-xl font-semibold mb-6 tracking-tight">
              Design from every angle
            </h2>
            <p className="body-lg mx-auto max-w-2xl text-muted-foreground">
              Interact with the precision-milled aerospace-grade chassis.
            </p>
          </div>
          
          <div className="h-[600px] w-full rounded-3xl overflow-hidden glass shadow-clean border border-white/5 relative z-10" style={{ minHeight: '600px' }}>
            <Suspense fallback={
              <ContentLoader isLoading={true} variant="media" className="h-full mx-auto max-w-3xl">
                <div className="h-full w-full bg-black/50 flex flex-col items-center justify-center">
                   <p className="text-sm text-white/50 animate-pulse font-medium tracking-widest">LOADING 3D...</p>
                </div>
              </ContentLoader>
            }>
              <LazyProduct3DView />
            </Suspense>
          </div>
        </motion.section>
        
        {/* Specs Section */}
        <SpecsSection />
        
        {/* Testimonials / Supporter Wall */}
        <Testimonials />

        {/* Roadmap Timeline */}
        <RoadmapTimeline />

        {/* FAQ Section */}
        <FAQSection />

        {/* Press & Media Mentions */}
        <PressMentions />
        
        {/* Final Pre-order CTA */}
        <section className="py-32 bg-black border-t border-white/10 text-center px-4">
           <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto"
           >
              <h2 className="heading-xl mb-8">Ready to join the revolution?</h2>
              <p className="body-lg mb-12">Pre-order InfYNova today and be the first to experience the future of mobile.</p>
              
              {/* Countdown Timer */}
              <div className="mb-12">
                <CountdownTimer 
                  targetDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
                  title="Pre-order Window Closes In:"
                />
              </div>
              
              <a href="/pre-order" className="inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-neutral-200 px-10 py-5 text-lg font-medium transition-all group">
                Reserve Your InfYNova
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
           </motion.div>
        </section>
        
      </main>
      
      <Footer />
    </>
  );
}