"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { trackFAQInteraction } from "@/lib/analytics";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "When will InfyNova be available for purchase?",
      answer: "InfyNova is launching in Q2 2026. Early supporters who join our waitlist will get early access and exclusive launch pricing. We're currently accepting pre-orders with an expected delivery within the first month of launch."
    },
    {
      question: "What makes NovaOS different from Android and iOS?",
      answer: "NovaOS is built from the ground up with AI at its core. Unlike other operating systems, NovaOS learns your habits, anticipates your needs, and adapts in real-time. It prioritizes privacy, customization, and local processing – keeping sensitive data on your device, not on cloud servers."
    },
    {
      question: "Is my data private on InfyNova?",
      answer: "Privacy is fundamental to InfyNova. NovaOS processes most AI functions locally on your device, meaning your personal data never leaves your device without explicit permission. We use end-to-end encryption for all communications and don't sell any user data. Full transparency is available in our Privacy Policy."
    },
    {
      question: "How much will InfyNova cost?",
      answer: "InfyNova is designed to be premium yet accessible. Early pre-order pricing starts at ₹39,999 for the base model, with premium versions at higher price points. We believe in transparent pricing with no hidden fees. All models include our 5-year warranty."
    },
    {
      question: "Why are you building this in India?",
      answer: "We're building InfyNova in India because we believe in proving that world-class innovation can happen here. We're leveraging India's deep tech talent, manufacturing expertise, and cost efficiency to create a phone that's globally competitive. Plus, being Made in India means we understand your needs locally."
    },q 
    {
      question: "What are the hardware specs?",
      answer: "InfyNova features a 6.8\" AMOLED display, custom AI processor (faster than Snapdragon 8 Gen 3), 12GB RAM, up to 512GB storage, 50MP AI camera system, and a 6000mAh battery with 100W fast charging. Full specs available on our Press page."
    },
    {
      question: "Can I customize the phone?",
      answer: "Absolutely! You can choose from multiple colorways (Midnight Black, Aurora Silver, Nova Gold, Cosmic Purple), storage options, and RAM configurations. You can also customize NovaOS with widgets, themes, and AI assistant settings to match your workflow."
    },
    {
      question: "Is there a payment plan available?",
      answer: "Yes! We offer flexible payment options through Razorpay, including EMI for 3, 6, and 12 months at competitive interest rates. Additionally, early supporters who pre-order get special pricing locked in."
    }
  ];

  return (
    <section className="py-20 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Get answers to common questions about InfyNova and NovaOS
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              className="border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
            >
              <button
                onClick={() => {
                  const isExpanding = expanded !== index;
                  setExpanded(isExpanding ? index : null);
                  trackFAQInteraction(index, isExpanding);
                }}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/10 transition-colors text-left"
              >
                <span className="font-semibold text-base md:text-lg">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expanded === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 flex-shrink-0 text-primary" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expanded === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-muted-foreground text-base leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-lg bg-primary/10 border border-primary/20 text-center"
        >
          <p className="text-muted-foreground mb-3">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center text-primary font-semibold hover:underline"
          >
            Contact our support team →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
