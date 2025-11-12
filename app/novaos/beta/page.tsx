"use client";

import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/Footer";
import { motion } from "framer-motion";
import { Download, AlertCircle, CheckCircle } from "lucide-react";

export default function NovaOSBetaPage() {
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
              <div className="inline-block px-4 py-2 bg-accent/20 border border-accent rounded-full text-sm font-medium mb-6">
                Beta Program
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NovaOS Beta
              </h1>
              <p className="text-xl text-muted-foreground">
                Be the first to experience the future
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                    Beta Software Warning
                  </h3>
                  <p className="text-sm text-yellow-600/80 dark:text-yellow-400/80">
                    This is beta software and may contain bugs. Use at your own risk. Always backup your data before installing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">What's New in Beta</h2>
              <ul className="space-y-3">
                {[
                  "Enhanced AI assistant with voice commands",
                  "New gesture navigation system",
                  "Improved battery optimization",
                  "Dark mode 2.0 with custom themes",
                  "Performance improvements across the board",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold">
                <Download className="w-5 h-5" />
                Download Beta
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                Version 1.0 Beta 3 • Released Nov 2024
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
