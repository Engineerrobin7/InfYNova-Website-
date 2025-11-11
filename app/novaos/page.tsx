"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Zap, 
  Shield, 
  Smartphone, 
  Brain, 
  Battery, 
  Palette,
  Lock,
  Cloud,
  Code,
  Sparkles,
  Layers
} from "lucide-react";

export default function NovaOSPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 via-accent/5 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium">
                  Powered by AI
                </div>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                NovaOS
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                The operating system that thinks with you
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the future of mobile computing with an AI-first operating system 
                designed to be intuitive, powerful, and uniquely yours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built Different</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                NovaOS isn't just another Android fork. It's a complete reimagining of what a mobile OS can be.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Intelligence",
                  description: "Built-in AI that learns your habits, predicts your needs, and adapts to your lifestyle."
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Optimized from the ground up for speed. Apps launch instantly, multitasking is seamless."
                },
                {
                  icon: Shield,
                  title: "Privacy First",
                  description: "Your data stays on your device. Advanced encryption and privacy controls built-in."
                },
                {
                  icon: Battery,
                  title: "Smart Battery",
                  description: "AI-driven power management extends battery life by up to 40% without compromising performance."
                },
                {
                  icon: Palette,
                  title: "Infinite Customization",
                  description: "Make it yours with themes, widgets, and layouts that adapt to your style."
                },
                {
                  icon: Cloud,
                  title: "Seamless Sync",
                  description: "Your data, settings, and preferences sync across all your devices effortlessly."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">AI That Works For You</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  NovaOS uses advanced AI to make your phone smarter, not just faster
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Sparkles,
                    title: "Smart Suggestions",
                    description: "Get contextual suggestions for apps, contacts, and actions based on your routine and location.",
                    features: ["Predictive app launching", "Smart replies", "Context-aware shortcuts"]
                  },
                  {
                    icon: Cpu,
                    title: "Adaptive Performance",
                    description: "AI automatically optimizes system resources for the apps you're using right now.",
                    features: ["Dynamic resource allocation", "Intelligent thermal management", "Background app optimization"]
                  },
                  {
                    icon: Lock,
                    title: "Intelligent Security",
                    description: "Advanced threat detection and privacy protection powered by on-device AI.",
                    features: ["Real-time threat detection", "Privacy dashboard", "App permission insights"]
                  },
                  {
                    icon: Layers,
                    title: "Smart Automation",
                    description: "Create powerful automations without coding. NovaOS learns and suggests routines.",
                    features: ["Auto-triggered actions", "Location-based rules", "Time-based automation"]
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-8"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 ml-16">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 border border-primary/20"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Built for Developers</h2>
                    <p className="text-muted-foreground mb-6">
                      NovaOS provides powerful APIs and tools for developers to create amazing experiences. 
                      Build apps that leverage our AI capabilities, access advanced system features, and reach millions of users.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="#"
                        className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold text-center"
                      >
                        Developer Docs
                      </a>
                      <a
                        href="#"
                        className="px-6 py-3 border border-border rounded-lg hover:bg-accent/10 transition font-semibold text-center"
                      >
                        Join Developer Program
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Specifications</h2>
              <p className="text-muted-foreground">
                Built on cutting-edge technology
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { label: "Version", value: "NovaOS 1.0" },
                { label: "Based On", value: "Android 14" },
                { label: "Kernel", value: "Linux 6.1" },
                { label: "UI Framework", value: "Nova UI" },
                { label: "AI Engine", value: "Nova AI Core" },
                { label: "Security", value: "Knox-level" },
                { label: "Updates", value: "5 Years" },
                { label: "API Level", value: "34+" }
              ].map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <div className="text-sm text-muted-foreground mb-2">{spec.label}</div>
                  <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {spec.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Experience NovaOS
              </h2>
              <p className="text-muted-foreground mb-8">
                Pre-order InfYNova and be among the first to experience the future of mobile computing
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
                  Learn More
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
