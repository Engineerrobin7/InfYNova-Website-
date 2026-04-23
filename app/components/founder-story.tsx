"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Zap, Users } from "lucide-react";

export function FounderStory() {
  const values = [
    {
      icon: Heart,
      title: "Built with Purpose",
      description: "We're not just making another phone. We're creating a device that truly understands you and respects your privacy. Every feature is designed with intention."
    },
    {
      icon: Globe,
      title: "Made in India",
      description: "We want to prove that world-class innovation doesn't need to come from Silicon Valley. India has the talent, the vision, and the capability to lead the future."
    },
    {
      icon: Zap,
      title: "AI-First Philosophy",
      description: "While others bolt on AI as an afterthought, we designed InfyNova with AI at its core. This isn't AI for hype—it's AI that genuinely makes your life better."
    },
    {
      icon: Users,
      title: "For Everyone",
      description: "Premium doesn't mean exclusive or expensive. We believe cutting-edge technology should be accessible to people who appreciate quality, not just those with unlimited budgets."
    }
  ];

  return (
    <section className="py-20 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Story intro */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            Why InfyNova Exists
          </h2>

          <div className="prose prose-invert max-w-full">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We started InfyNova because we were frustrated. Frustrated with phones that collect your data, frustrate with AI features that feel forced, and frustrated that innovation was concentrating in just a few countries.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our founding team spent years in tech—from AI research to hardware design. We realized no one was building a phone that truly put the user first: privacy-by-default, AI that actually helps, and hardware crafted with precision. So we decided to build it ourselves.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              InfyNova is our answer to a simple question: <span className="text-primary font-semibold">What if a phone was designed for the person using it, not the company selling it?</span>
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              What if innovation didn't need to come from Silicon Valley? What if India could show the world how to build world-class products? What if everyone—not just the wealthy—could experience the future?
            </p>
          </div>
        </div>

        {/* Core values */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <value.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 rounded-xl border border-primary/30 bg-primary/10 max-w-3xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-bold leading-relaxed">
            Our mission is simple:{" "}
            <span className="text-primary">
              Build the phone that respects privacy, powers creativity with AI, and proves that India can lead global innovation.
            </span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
