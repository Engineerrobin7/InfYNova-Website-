"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Cpu, Battery, Camera, Zap, Shield, Sparkles } from "lucide-react";

export default function FeaturesPage() {
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
                InfYNova Products
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose the perfect device for your needs
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "InfYNova",
                  price: "₹29,999",
                  description: "Perfect for everyday users",
                  features: ["6.5\" Display", "128GB Storage", "48MP Camera", "5000mAh Battery"]
                },
                {
                  name: "InfYNova Pro",
                  price: "₹44,999",
                  description: "For power users",
                  features: ["6.7\" AMOLED", "256GB Storage", "108MP Camera", "5500mAh Battery"],
                  popular: true
                },
                {
                  name: "InfYNova Ultra",
                  price: "₹64,999",
                  description: "Ultimate flagship experience",
                  features: ["6.9\" LTPO", "512GB Storage", "200MP Camera", "6000mAh Battery"]
                }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-card border rounded-2xl p-8 ${product.popular ? 'border-primary shadow-xl scale-105' : 'border-border'}`}
                >
                  {product.popular && (
                    <div className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-3xl font-bold text-primary mb-2">{product.price}</p>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  <ul className="space-y-3 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/#buy"
                    className="block w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold text-center"
                  >
                    Pre-Order Now
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
