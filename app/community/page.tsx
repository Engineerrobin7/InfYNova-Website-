"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { ViralChallenges } from "../components/viral-challenges";
import { CommunityVoting } from "../components/community-voting";

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-background text-foreground">
        <section className="py-24 border-b border-border/10">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="heading-xl tracking-tight mb-6">
                The Community.
              </h1>
              <p className="body-lg max-w-2xl mx-auto text-muted-foreground">
                Join thousands redefining the smartphone experience. Participate in challenges, vote on incoming features, and shape the future of NovaOS.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Modular integrations with spacing */}
        <div className="flex flex-col gap-y-32 py-16">
           <ViralChallenges />
           <CommunityVoting />
        </div>
      </main>
      <Footer />
    </>
  );
}
