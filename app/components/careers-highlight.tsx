"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, Rocket, Heart } from "lucide-react";

export function CareersHighlight() {
  const perks = [
    {
      icon: Rocket,
      title: "Build the Future",
      description: "Work on cutting-edge AI technology"
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Collaborate with passionate innovators"
    },
    {
      icon: Heart,
      title: "Great Culture",
      description: "Work-life balance and growth"
    },
    {
      icon: Briefcase,
      title: "Competitive Pay",
      description: "Industry-leading compensation"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-muted-foreground text-lg">
            Help us build India's AI future. We're hiring talented people across engineering, design, and business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
            >
              <perk.icon className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">{perk.title}</h3>
              <p className="text-sm text-muted-foreground">{perk.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/careers"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            View Open Positions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
