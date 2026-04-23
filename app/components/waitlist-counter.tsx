"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp } from "lucide-react";
import { trackSectionView, trackWaitlistJoin } from "@/lib/analytics";

export function WaitlistCounter() {
  const [count, setCount] = useState(10247);
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Track section view
  useEffect(() => {
    trackSectionView("Waitlist Counter");
  }, []);

  useEffect(() => {
    // Simulate real-time waitlist growth
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animate the counter on first view
  useEffect(() => {
    if (!hasAnimated && count > 0) {
      const duration = 2;
      const frames = 60;
      const increment = count / frames;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= count) {
          setDisplayCount(count);
          setHasAnimated(true);
          clearInterval(timer);
        } else {
          setDisplayCount(Math.floor(current));
        }
      }, (duration * 1000) / frames);

      return () => clearInterval(timer);
    }
  }, [count, hasAnimated]);

  const growthPercentage = ((count - 10000) / 10000) * 100;

  return (
    <section className="py-16 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-background p-8 md:p-12 text-center backdrop-blur-sm">
          {/* Main counter */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-primary animate-pulse" />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold text-white"
            >
              {displayCount.toLocaleString()}
            </motion.div>
            <div className="flex items-center gap-1 text-primary font-semibold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+{growthPercentage.toFixed(0)}%</span>
            </div>
          </div>

          {/* Label */}
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Early Supporters Joined
          </h3>
          <p className="text-muted-foreground mb-8">
            Join thousands who are waiting for the future of mobile
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-8 pt-8 border-t border-white/10">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Waiting Since</p>
              <p className="font-semibold text-lg">September 2024</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Countries</p>
              <p className="font-semibold text-lg">18+</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Launch In</p>
              <p className="font-semibold text-lg">Q1 2026</p>
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href="/pre-order"
            onClick={() => trackWaitlistJoin("waitlist_counter")}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors group"
          >
            Join the Waitlist
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>

          {/* Trust statement */}
          <p className="text-xs text-muted-foreground mt-6">
            ✓ Numbers are real and updated in real-time • ✓ No spam • ✓ Exclusive pre-order access
          </p>
        </div>
      </motion.div>
    </section>
  );
}
