"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { trackStickyCTAInteraction, trackPreOrderClick } from "@/lib/analytics";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section
      if (window.scrollY > 500 && !hasScrolled) {
        setHasScrolled(true);
        trackStickyCTAInteraction("view");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  // Only show on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (!isMobile || !isVisible || !hasScrolled) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 md:hidden z-40"
      >
        <div className="bg-gradient-to-t from-black via-black/95 to-black/90 backdrop-blur-md border-t border-white/10 px-4 py-4 flex items-center justify-between gap-3 safe-area-inset-bottom">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white leading-tight">
              Join the waitlist
            </p>
            <p className="text-xs text-white/60 mt-0.5">
              10,000+ already reserved
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/pre-order"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-black rounded-full font-semibold text-sm hover:bg-white/90 transition-colors active:scale-95 whitespace-nowrap shadow-lg"
            >
              Join
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsVisible(false)}
              className="p-3 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors flex-shrink-0"
              aria-label="Close CTA banner"
            >
              <X className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
