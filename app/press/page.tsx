"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export default function PressPage() {
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
                Press & Media
              </h1>
              <p className="text-xl text-muted-foreground">
                Latest news and press resources
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Press Contact</h2>
              <p className="text-muted-foreground mb-4">
                For press inquiries, please contact:
              </p>
              <p className="font-semibold">Email: press@infynova.in</p>
              <p className="font-semibold">Phone: +91 9896583808</p>
            </div>

            <h2 className="text-3xl font-bold mb-8">Press Releases</h2>
            <div className="space-y-4">
              {[
                { title: "InfYNova Announces Revolutionary AI Smartphone", date: "November 2024" },
                { title: "NovaOS: The Future of Mobile Operating Systems", date: "October 2024" },
                { title: "InfYNova Raises Series A Funding", date: "September 2024" },
              ].map((release, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">{release.title}</h3>
                      <p className="text-sm text-muted-foreground">{release.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-primary hover:underline">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
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
