"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, Copy, Check } from "lucide-react";

export function AffiliateProgram() {
  const [email, setEmail] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Generate unique affiliate code
    const code = `INF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setAffiliateCode(code);
    
    // TODO: Save to database
    console.log("Affiliate signup:", email, code);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(affiliateCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-500/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full mb-4 border border-green-500/30">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-green-500">EARN MONEY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Become an Affiliate
            </h2>
            <p className="text-muted-foreground text-lg">
              Earn 10% commission on every sale. Unlimited earning potential!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: DollarSign,
                title: "10% Commission",
                description: "Earn ₹3,000-₹6,500 per sale",
                color: "text-green-500"
              },
              {
                icon: TrendingUp,
                title: "Recurring Income",
                description: "Monthly payouts via bank transfer",
                color: "text-blue-500"
              },
              {
                icon: Users,
                title: "No Limits",
                description: "Unlimited referrals, unlimited earnings",
                color: "text-purple-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <item.icon className={`w-12 h-12 ${item.color} mx-auto mb-4`} />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {!affiliateCode ? (
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30">
              <h3 className="text-2xl font-bold mb-4 text-center">Join Now - It's Free!</h3>
              <form onSubmit={handleSignup} className="max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none mb-4"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:opacity-90 transition font-semibold"
                >
                  Get My Affiliate Link
                </button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Start earning immediately. No approval needed.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Your Affiliate Code</h3>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {affiliateCode}
                </div>
                <button
                  onClick={copyCode}
                  className="p-2 hover:bg-muted rounded-lg transition"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="bg-card rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Your Affiliate Link:</p>
                <p className="font-mono text-sm break-all">
                  https://infynova.in?ref={affiliateCode}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-card rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-500">₹0</div>
                  <div className="text-xs text-muted-foreground">Earned</div>
                </div>
                <div className="bg-card rounded-lg p-4">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-muted-foreground">Clicks</div>
                </div>
                <div className="bg-card rounded-lg p-4">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-muted-foreground">Sales</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Share your link on social media, blogs, or with friends to start earning!
              </p>
            </motion.div>
          )}

          <div className="mt-12 bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold mb-4">How It Works:</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>1. Share your unique affiliate link</p>
              <p>2. Someone clicks and makes a purchase</p>
              <p>3. You earn 10% commission (₹3,000-₹6,500 per sale)</p>
              <p>4. Get paid monthly via bank transfer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
