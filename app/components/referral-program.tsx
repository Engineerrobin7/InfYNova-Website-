"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check, Users, Award } from "lucide-react";

export function ReferralProgram() {
  const [copied, setCopied] = useState(false);
  const referralCode = "INFYNOVA2024";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <Gift className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Refer & Earn
            </h2>
            <p className="text-muted-foreground text-lg">
              Share InfyNova with friends and earn rewards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Users,
                title: "Share Your Code",
                description: "Send your unique referral code to friends"
              },
              {
                icon: Gift,
                title: "They Get ₹2,000 Off",
                description: "Your friends save on their first purchase"
              },
              {
                icon: Award,
                title: "You Earn ₹1,000",
                description: "Get rewards for each successful referral"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground mb-3">Your Referral Code</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {referralCode}
              </div>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-muted rounded-lg transition"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold">
              Share Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
