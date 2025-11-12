"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Search, HelpCircle, Book, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { icon: Book, title: "Getting Started", articles: 12 },
    { icon: HelpCircle, title: "Troubleshooting", articles: 24 },
    { icon: MessageCircle, title: "Account & Billing", articles: 8 },
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
                Help Center
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                How can we help you today?
              </p>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help..."
                  className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition cursor-pointer"
                >
                  <category.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground">{category.articles} articles</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-muted-foreground mb-6">Our support team is here for you</p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
