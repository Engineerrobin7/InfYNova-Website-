"use client";

import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/Footer";
import { motion } from "framer-motion";
import { Code, Users, Award, Rocket } from "lucide-react";

export default function DeveloperProgramPage() {
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
                NovaOS Developer Program
              </h1>
              <p className="text-xl text-muted-foreground">
                Build the next generation of mobile apps
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Code, title: "SDK Access", description: "Full NovaOS SDK" },
                { icon: Users, title: "Community", description: "Join 1000+ developers" },
                { icon: Award, title: "Recognition", description: "Featured apps" },
                { icon: Rocket, title: "Early Access", description: "Beta features first" },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Join the Program</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get access to exclusive tools, resources, and support to build amazing apps for NovaOS.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
              >
                Apply Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
