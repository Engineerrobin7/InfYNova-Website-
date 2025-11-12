"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Users, MessageSquare, Heart, Award } from "lucide-react";

export default function CommunityPage() {
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
                Community
              </h1>
              <p className="text-xl text-muted-foreground">
                Join thousands of InfYNova users worldwide
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Users, label: "Members", value: "10K+" },
                { icon: MessageSquare, label: "Discussions", value: "5K+" },
                { icon: Heart, label: "Helpful Posts", value: "15K+" },
                { icon: Award, label: "Contributors", value: "500+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with other InfYNova users, share tips, get help, and stay updated with the latest news.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/infynova"
                  className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
                >
                  Join Discord
                </a>
                <a
                  href="https://forum.infynova.in"
                  className="px-8 py-3 border border-border rounded-lg hover:bg-accent/10 transition font-semibold"
                >
                  Visit Forum
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
