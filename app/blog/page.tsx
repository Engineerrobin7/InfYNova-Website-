"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "InfYNova: Redefining India's Smartphone Industry",
      excerpt: "Discover how InfYNova is building India's first AI-powered smartphone and why it matters for the future of mobile technology.",
      author: "Robin Singh",
      date: "Nov 12, 2024",
      image: "🚀",
      slug: "introducing-infynova",
      category: "Company News"
    },
    {
      title: "NovaOS: The AI-First Operating System",
      excerpt: "Deep dive into NovaOS - the operating system that thinks with you. Learn about the AI features, performance optimizations, and what makes it special.",
      author: "InfYNova Team",
      date: "Nov 12, 2024",
      image: "🧠",
      slug: "novaos-explained",
      category: "Technology"
    },
    {
      title: "Why India Needs InfYNova",
      excerpt: "India is the world's second-largest smartphone market, but we're still dependent on foreign brands. It's time to change that.",
      author: "Robin Singh",
      date: "Nov 12, 2024",
      image: "🇮🇳",
      slug: "why-india-needs-infynova",
      category: "Opinion"
    },
    {
      title: "The Future of AI in Smartphones",
      excerpt: "Exploring how artificial intelligence is revolutionizing mobile technology and what it means for the next generation of devices.",
      author: "InfYNova Team",
      date: "Nov 10, 2024",
      image: "🤖",
      slug: "ai-future",
      category: "Technology"
    },
    {
      title: "InfYNova vs iPhone vs Samsung: The Real Comparison",
      excerpt: "An honest comparison of features, performance, and value. See how InfYNova stacks up against the competition.",
      author: "Tech Team",
      date: "Nov 8, 2024",
      image: "⚔️",
      slug: "comparison",
      category: "Reviews"
    },
    {
      title: "Building India's Tech Future",
      excerpt: "How we're creating jobs, developing AI expertise, and inspiring the next generation of Indian tech entrepreneurs.",
      author: "Robin Singh",
      date: "Nov 5, 2024",
      image: "🌟",
      slug: "tech-future",
      category: "Company News"
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground">
                Insights, updates, and stories from InfYNova
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl">{post.image}</div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                    </div>
                    <button className="text-primary hover:underline font-semibold">
                      Read More →
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
