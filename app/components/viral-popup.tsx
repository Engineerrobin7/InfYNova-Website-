"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles } from "lucide-react";

export function ViralPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('infynova_popup_seen');
      if (!hasSeenPopup) {
        setShow(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.setItem('infynova_popup_seen', 'true');
    
    // TODO: Save email to database
    console.log('Email submitted:', email);
    
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('infynova_popup_seen', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-2xl p-8 max-w-md w-full relative"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    className="inline-block mb-4"
                  >
                    <Gift className="w-16 h-16 text-primary mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">
                    Win ₹10,000 Instantly!
                  </h3>
                  <p className="text-muted-foreground">
                    Play our Phone Builder Game and get exclusive early access
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
                  >
                    Get My Discount Code
                  </button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Join 50,000+ people who are already playing!
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <Sparkles className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Check Your Email!</h3>
                <p className="text-muted-foreground">
                  We've sent you exclusive access to the game and your discount code!
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
