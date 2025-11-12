"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Code, Book, Key, Zap } from "lucide-react";

export default function DeveloperAPIPage() {
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
                Developer API
              </h1>
              <p className="text-xl text-muted-foreground">
                Build powerful integrations with InfYNova
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                { icon: Code, title: "RESTful API", description: "Simple and powerful REST API" },
                { icon: Zap, title: "Real-time", description: "WebSocket support for live data" },
                { icon: Key, title: "Secure", description: "OAuth 2.0 authentication" },
                { icon: Book, title: "Well Documented", description: "Comprehensive API docs" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Get Started</h2>
              <p className="text-muted-foreground mb-6">
                Sign up for a developer account to get your API keys and start building.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
              >
                Request API Access
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
