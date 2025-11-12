"use client";

import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/Footer";
import { motion } from "framer-motion";
import { Book, Code, Layers, Zap } from "lucide-react";

export default function NovaOSDocsPage() {
  const sections = [
    { icon: Book, title: "Getting Started", description: "Quick start guide and installation" },
    { icon: Code, title: "API Reference", description: "Complete API documentation" },
    { icon: Layers, title: "Components", description: "UI components and widgets" },
    { icon: Zap, title: "Advanced", description: "Advanced features and optimization" },
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
                NovaOS Documentation
              </h1>
              <p className="text-xl text-muted-foreground">
                Everything you need to build with NovaOS
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition cursor-pointer"
                >
                  <section.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                  <p className="text-muted-foreground">{section.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="#" className="text-primary hover:underline">Installation Guide</a>
                <a href="#" className="text-primary hover:underline">API Reference</a>
                <a href="#" className="text-primary hover:underline">Tutorials</a>
                <a href="#" className="text-primary hover:underline">Code Examples</a>
                <a href="#" className="text-primary hover:underline">Best Practices</a>
                <a href="#" className="text-primary hover:underline">FAQ</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
