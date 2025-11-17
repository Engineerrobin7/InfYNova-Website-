"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Award, Heart, Zap } from "lucide-react";
import { ProductHuntBadge } from "../components/product-hunt-badge";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                About InfYNova
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Redefining technology, one smart move at a time
              </p>
            </motion.div>
          </div>
        </section>

        {/* Product Hunt Badge */}
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground mb-4">
                🏆 Featured on Product Hunt
              </p>
              <ProductHuntBadge />
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg dark:prose-invert mx-auto"
              >
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  InfYNova was born from a simple belief: technology should feel alive, intuitive, and human-centric. 
                  We're not just building smartphones; we're crafting experiences that empower the next generation of thinkers, 
                  creators, and innovators.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded in India, InfYNova represents the fusion of cutting-edge artificial intelligence with elegant design. 
                  Our mission is to create devices that don't just respond to your needs—they anticipate them, learn from you, 
                  and grow with you.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every InfYNova device is a testament to our commitment to innovation, quality, and the belief that 
                  technology should enhance human potential, not replace it.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation First",
                  description: "We push boundaries and challenge conventions to create technology that's truly revolutionary."
                },
                {
                  icon: Users,
                  title: "Human-Centric",
                  description: "Every feature, every design choice is made with the user's experience and wellbeing in mind."
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description: "We're committed to the highest standards of quality in every aspect of our products."
                },
                {
                  icon: Heart,
                  title: "Sustainability",
                  description: "Building a better future means being responsible stewards of our planet's resources."
                },
                {
                  icon: Zap,
                  title: "Performance",
                  description: "Cutting-edge technology that delivers speed, power, and reliability when you need it."
                },
                {
                  icon: Target,
                  title: "Purpose-Driven",
                  description: "We believe technology should empower people to achieve their dreams and make a difference."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 border border-primary/20"
              >
                <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                <p className="text-lg text-center text-muted-foreground leading-relaxed mb-6">
                  To create AI-powered smartphones that feel alive, intuitive, and human-centric—devices that don't just 
                  serve you, but understand you, learn from you, and grow with you.
                </p>
                <p className="text-center text-muted-foreground">
                  We're building the future of mobile technology, one innovation at a time, right here in India.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "2024", label: "Founded" },
                { number: "100%", label: "Made in India" },
                { number: "AI-First", label: "Technology" },
                { number: "∞", label: "Possibilities" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
              <p className="text-muted-foreground mb-8">
                Be part of the revolution in mobile technology. Experience the future with InfYNova.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#buy"
                  className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
                >
                  Pre-Order Now
                </a>
                <a
                  href="/contact"
                  className="px-8 py-3 border border-border rounded-lg hover:bg-accent/10 transition font-semibold"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
