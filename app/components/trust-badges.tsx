"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Award, Zap } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "5-Year Warranty",
      description: "Comprehensive coverage"
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "256-bit encryption"
    },
    {
      icon: Award,
      title: "Quality Certified",
      description: "ISO 9001 certified"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Ships within 48 hours"
    }
  ];

  return (
    <section className="py-12 border-y border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <badge.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold text-sm mb-1">{badge.title}</div>
              <div className="text-xs text-muted-foreground">{badge.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
