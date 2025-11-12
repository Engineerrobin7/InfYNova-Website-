"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "The Future of AI in Smartphones",
      excerpt: "Exploring how artificial intelligence is revolutionizing mobile technology...",
      author: "InfYNova Team",
      date: "Nov 10, 2024",
      image: "🤖"
    },
    {
      title: "NovaOS: Built for Performance",
      excerpt: "Deep dive into the architecture and optimization techniques behind NovaOS...",
      author: "Tech Team",
      date: "Nov 5, 2024",
      image: "⚡"
    },
    {
      title: "Sustainable Technology: Our Commitment",
      excerpt: "How we're building eco-friendly smartphones for a better tomorrow...",
      author: "InfYNova Team",
      date: "Oct 28, 2024",
      image: "🌱"
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
                    <div className="text-6xl mb-4">{post.image}</div>
                    <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
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
