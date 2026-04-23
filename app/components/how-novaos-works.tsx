"use client";

import { motion } from "framer-motion";
import { Brain, Shield, Zap } from "lucide-react";

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

export function HowNovaOSWorks() {
  const steps: Step[] = [
    {
      number: 1,
      icon: <Brain className="w-12 h-12" />,
      title: "AI Learns You",
      description:
        "NovaOS watches how you use your phone and learns your patterns. Not to spy—to help.",
      details: [
        "Predicts apps you'll open next",
        "Optimizes battery based on your behavior",
        "Suggests features before you ask",
        "All learning happens on your device"
      ]
    },
    {
      number: 2,
      icon: <Shield className="w-12 h-12" />,
      title: "Privacy By Default",
      description:
        "Most processing happens on your phone. Your data stays yours—always.",
      details: [
        "No forced cloud uploads",
        "Transparent data handling",
        "Military-grade encryption",
        "You control every permission"
      ]
    },
    {
      number: 3,
      icon: <Zap className="w-12 h-12" />,
      title: "Intelligence That Adapts",
      description:
        "As you use InfyNova, it gets smarter and faster, completely personalized to you.",
      details: [
        "Real-time performance optimization",
        "Predictive loading and caching",
        "Adaptive interface based on usage",
        "Continuous improvement without interference"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-20 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            How NovaOS Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A smarter operating system that learns from you, protects you, and evolves with your needs.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="h-full">
                {/* Number badge */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-bold text-primary">
                      {step.number}
                    </span>
                  </div>
                  <div className="text-primary/60">{step.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>

                {/* Details list */}
                <ul className="space-y-3">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-sm text-muted-foreground">
                      <span className="mr-3 mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Connecting line for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-24 right-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0"></div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/pre-order"
            className="inline-flex items-center px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors group"
          >
            Experience NovaOS
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
