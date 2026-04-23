"use client";

import { motion } from "framer-motion";
import { MessageCircle, Share2, Link2 } from "lucide-react";

interface Mention {
  type: "press" | "social" | "media";
  source: string;
  title: string;
  quote: string;
  date: string;
  url: string;
  icon?: string;
}

export function PressMentions() {
  const mentions: Mention[] = [
    {
      type: "press",
      source: "The Indian Express",
      title: "InfyNova: The Indian startup challenging Apple and Samsung",
      quote:
        "With cutting-edge AI and privacy-first design, InfyNova is proving India can lead smartphone innovation.",
      date: "March 2025",
      url: "#",
      icon: "📰"
    },
    {
      type: "social",
      source: "Product Hunt",
      title: "Launched: InfyNova - The world's first privacy-first AI smartphone",
      quote:
        "Trending at #1 in Product Hunt with 2000+ upvotes on Day 1. Community loves the made-in-India story.",
      date: "February 2025",
      url: "#",
      icon: "🚀"
    },
    {
      type: "media",
      source: "TechCrunch India",
      title: "Meet InfyNova: The AI phone that puts privacy first",
      quote:
        "This is refreshingly different from the usual smartphone launches. Real innovation, not just marketing.",
      date: "January 2025",
      url: "#",
      icon: "💡"
    },
    {
      type: "press",
      source: "Economic Times",
      title: "Made in India smartphones: InfyNova leading the charge",
      quote: "InfyNova is attracting investor interest from both India and Silicon Valley.",
      date: "December 2024",
      url: "#",
      icon: "💼"
    },
    {
      type: "social",
      source: "Twitter/X Threads",
      title: "#InfyNova trending #1 in India",
      quote:
        "Over 50K mentions in 24 hours. Users excited about the Made-in-India AI phone story.",
      date: "November 2024",
      url: "#",
      icon: "📱"
    },
    {
      type: "media",
      source: "Wired India",
      title: "The Future of Smartphones Is Local",
      quote:
        "InfyNova isn't just another phone—it's a statement about India's technological independence.",
      date: "October 2024",
      url: "#",
      icon: "🌟"
    }
  ];

  const getMentionIcon = (type: string) => {
    switch (type) {
      case "press":
        return <MessageCircle className="w-6 h-6" />;
      case "social":
        return <Share2 className="w-6 h-6" />;
      case "media":
        return <Link2 className="w-6 h-6" />;
      default:
        return <MessageCircle className="w-6 h-6" />;
    }
  };

  const getMentionColor = (type: string) => {
    switch (type) {
      case "press":
        return "border-blue-500/30 bg-blue-500/10";
      case "social":
        return "border-purple-500/30 bg-purple-500/10";
      case "media":
        return "border-green-500/30 bg-green-500/10";
      default:
        return "border-white/10 bg-white/5";
    }
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
            Press & Media
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What the media and community are saying about InfyNova
          </p>
        </div>

        {/* Mentions grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {mentions.map((mention, index) => (
            <motion.a
              key={index}
              href={mention.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group p-6 rounded-lg border backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer ${getMentionColor(
                mention.type
              )}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                    {mention.type === "press"
                      ? "Press Coverage"
                      : mention.type === "social"
                      ? "Social Mention"
                      : "Media Feature"}
                  </p>
                  <p className="font-bold text-sm">{mention.source}</p>
                </div>
                <span className="text-2xl">{mention.icon}</span>
              </div>

              {/* Title */}
              <h4 className="font-semibold text-base mb-3 group-hover:text-primary transition-colors leading-snug">
                {mention.title}
              </h4>

              {/* Quote */}
              <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed">
                "{mention.quote}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-muted-foreground">{mention.date}</span>
                <span className="text-xs text-primary group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Media kit CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-lg border border-primary/20 bg-primary/5"
        >
          <p className="text-muted-foreground mb-4">For journalists, bloggers, and influencers</p>
          <a
            href="/press"
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
          >
            Download Media Kit & Assets
            <span className="ml-2">↓</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
