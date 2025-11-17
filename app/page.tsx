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
import { SocialProof } from "./components/social-proof";
import { SocialMediaLinks } from "./components/social-media-links";
import { ComparisonTool } from "./components/comparison-tool";
import { CareersHighlight } from "./components/careers-highlight";
import { NewsletterSignup } from "./components/newsletter-signup";
import { TrustBadges } from "./components/trust-badges";
import { PhoneBuilderGame } from "./components/phone-builder-game";
import { CommunityVoting } from "./components/community-voting";
import { ProductHuntBadge } from "./components/product-hunt-badge";
import { ARTryOn } from "./components/ar-try-on";
import { ViralChallenges } from "./components/viral-challenges";
import { LiveChatWidget } from "./components/live-chat-widget";
import { ReferralProgram } from "./components/referral-program";
import { NovaOSSimulator } from "./components/novaos-simulator";
// import { Testimonials } from "./components/testimonials";
import { ViralPopup } from "./components/viral-popup";
import { AffiliateProgram } from "./components/affiliate-program";
import { SEOBoost } from "./components/seo-boost";
import { AutoShareButtons } from "./components/auto-share-buttons";
import { Calendar, User, ArrowRight } from "lucide-react";

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
      <SEOBoost />
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
        
        {/* Product Hunt Badge */}
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground mb-4">
                🏆 Featured on Product Hunt
              </p>
              <ProductHuntBadge />
            </motion.div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <TrustBadges />
        
        {/* REVOLUTIONARY: Phone Builder Game */}
        <PhoneBuilderGame />
        
        {/* REVOLUTIONARY: AR Try-On */}
        <ARTryOn />
        
        {/* Social Proof Section */}
        <SocialProof />
        
        {/* Testimonials Section - Temporarily disabled for build */}
        {/* <Testimonials /> */}
        
        {/* REVOLUTIONARY: Community Voting */}
        <CommunityVoting />
        
        {/* REVOLUTIONARY: Viral Challenges */}
        <ViralChallenges />
        
        {/* Comparison Tool Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See How We Compare
              </h2>
              <p className="text-muted-foreground">
                InfyNova vs the competition - an honest comparison
              </p>
            </motion.div>
            <ComparisonTool />
          </div>
        </section>
        
        {/* REVOLUTIONARY: NovaOS Interactive Simulator */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Experience NovaOS Live
              </h2>
              <p className="text-muted-foreground">
                Interactive demo - Try NovaOS right in your browser
              </p>
            </motion.div>
            <NovaOSSimulator />
          </div>
        </section>
        
        {/* Featured Blog Posts Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest from Our Blog
              </h2>
              <p className="text-muted-foreground">
                Insights, updates, and stories from InfyNova
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "InfYNova: Redefining India's Smartphone Industry",
                  excerpt: "Discover how InfYNova is building India's first AI-powered smartphone and why it matters.",
                  author: "Robin Singh",
                  date: "Nov 12, 2024",
                  image: "🚀",
                  slug: "introducing-infynova",
                  category: "Company News"
                },
                {
                  title: "NovaOS: The AI-First Operating System",
                  excerpt: "Deep dive into NovaOS - the operating system that thinks with you.",
                  author: "InfYNova Team",
                  date: "Nov 12, 2024",
                  image: "🧠",
                  slug: "novaos-explained",
                  category: "Technology"
                },
                {
                  title: "Why India Needs InfYNova",
                  excerpt: "India is the world's second-largest smartphone market, but we're still dependent on foreign brands.",
                  author: "Robin Singh",
                  date: "Nov 12, 2024",
                  image: "🇮🇳",
                  slug: "why-india-needs-infynova",
                  category: "Opinion"
                }
              ].map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl">{post.image}</div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <a 
                      href="/blog" 
                      className="text-primary hover:underline font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href="/blog"
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
              >
                View All Posts
              </a>
            </motion.div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 container mx-auto px-4">
          <NewsletterSignup />
        </section>
        
        {/* Press Mentions Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                As Featured In
              </h2>
              <p className="text-muted-foreground">
                Leading tech media covering our journey
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto items-center">
              {[
                { name: "TechCrunch", logo: "🚀" },
                { name: "YourStory", logo: "📰" },
                { name: "Inc42", logo: "💼" },
                { name: "Economic Times", logo: "📈" }
              ].map((outlet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
                >
                  <div className="text-4xl mb-2">{outlet.logo}</div>
                  <div className="font-semibold text-sm">{outlet.name}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <a
                href="/press"
                className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
              >
                View Press Kit <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
        
        {/* REVOLUTIONARY: Referral Program */}
        <ReferralProgram />
        
        {/* MONETIZATION: Affiliate Program */}
        <AffiliateProgram />
        
        {/* Careers Highlight Section */}
        <CareersHighlight />
        
        {/* Social Media Section */}
        <section className="py-16 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-muted-foreground mb-8">
              Follow us for daily updates, behind-the-scenes, and exclusive content
            </p>
            <SocialMediaLinks />
          </motion.div>
        </section>
        
        <CTASection />
      </main>
      
      <Footer />
      
      {/* MONETIZATION: Viral Popup */}
      <ViralPopup />
      
      {/* MONETIZATION: Auto Share Buttons */}
      <AutoShareButtons />
      
      {/* REVOLUTIONARY: Live Chat Widget */}
      <LiveChatWidget />
      
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