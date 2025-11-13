"use client";

import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Search, TrendingUp, Globe, BarChart3, ExternalLink } from "lucide-react";

export default function SEOTracker() {
  const [checking, setChecking] = useState(false);

  const keywords = [
    "AI smartphone India",
    "best smartphone under 50000",
    "made in India phone",
    "AI phone",
    "smartphone with AI",
    "InfyNova",
    "NovaOS",
    "Indian smartphone brand",
    "AI powered phone",
    "smartphone game"
  ];

  const seoTools = [
    {
      name: "Google Search Console",
      url: "https://search.google.com/search-console",
      description: "Official Google tool - See your exact rankings, clicks, impressions",
      icon: Search,
      color: "text-blue-500"
    },
    {
      name: "Ahrefs Rank Checker",
      url: "https://ahrefs.com/keyword-rank-checker",
      description: "Check rankings for any keyword - Free tool",
      icon: TrendingUp,
      color: "text-orange-500"
    },
    {
      name: "SEMrush Position Tracking",
      url: "https://www.semrush.com/position-tracking/",
      description: "Track rankings daily - 7 day free trial",
      icon: BarChart3,
      color: "text-purple-500"
    },
    {
      name: "Ubersuggest",
      url: "https://neilpatel.com/ubersuggest/",
      description: "Free rank tracking - 3 searches per day",
      icon: Globe,
      color: "text-green-500"
    }
  ];

  const manualCheck = () => {
    setChecking(true);
    setTimeout(() => setChecking(false), 2000);
  };

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
                SEO Rank Tracker
              </h1>
              <p className="text-xl text-muted-foreground">
                Track your Google rankings and SEO performance
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Manual Check */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Quick Manual Check</h2>
              <p className="text-muted-foreground mb-6">
                Open Google in incognito mode and search for these keywords:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {keywords.map((keyword, index) => (
                  <motion.a
                    key={index}
                    href={`https://www.google.com/search?q=${encodeURIComponent(keyword)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-muted hover:bg-muted/80 rounded-lg transition group"
                  >
                    <span className="font-medium">{keyword}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </motion.a>
                ))}
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  💡 <strong>Pro Tip:</strong> Use incognito mode to see unbiased results. Your rank may vary by location.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional SEO Tools */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Professional SEO Tools</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {seoTools.map((tool, index) => (
                <motion.a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group"
                >
                  <div className="flex items-start gap-4">
                    <tool.icon className={`w-10 h-10 ${tool.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                        Check Rankings
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Setup Google Search Console */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/30">
              <h2 className="text-2xl font-bold mb-4">Setup Google Search Console (FREE)</h2>
              <p className="text-muted-foreground mb-6">
                This is the BEST way to track your rankings. It's free and official from Google.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Go to Google Search Console</h3>
                    <p className="text-sm text-muted-foreground">
                      Visit: <a href="https://search.google.com/search-console" target="_blank" className="text-primary hover:underline">search.google.com/search-console</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Add Your Website</h3>
                    <p className="text-sm text-muted-foreground">
                      Click "Add Property" and enter your domain (e.g., infynova.in)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Verify Ownership</h3>
                    <p className="text-sm text-muted-foreground">
                      Add the verification code to your website (we'll help you with this)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Submit Sitemap</h3>
                    <p className="text-sm text-muted-foreground">
                      Submit: https://yourdomain.com/sitemap.xml
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Wait 24-48 Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Google will start showing your rankings, clicks, and impressions
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
              >
                Setup Now (Free)
              </a>
            </div>
          </div>
        </section>

        {/* Current SEO Status */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Current SEO Status</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">✓</div>
                <h3 className="font-semibold mb-2">Sitemap</h3>
                <p className="text-sm text-muted-foreground">
                  Auto-generated and ready
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">✓</div>
                <h3 className="font-semibold mb-2">SEO Schema</h3>
                <p className="text-sm text-muted-foreground">
                  Rich snippets enabled
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">✓</div>
                <h3 className="font-semibold mb-2">Meta Tags</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized for search
                </p>
              </div>
            </div>

            <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
              <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
                🎉 Your website is SEO-ready!
              </p>
              <p className="text-sm text-muted-foreground">
                Once you deploy and submit to Google Search Console, you'll start ranking within 24-48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Expected Rankings Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Expected Rankings Timeline</h2>
            
            <div className="space-y-4">
              {[
                {
                  time: "Day 1-3",
                  status: "Indexing",
                  description: "Google discovers and indexes your pages",
                  rank: "Not ranked yet"
                },
                {
                  time: "Week 1",
                  status: "Initial Rankings",
                  description: "Start appearing for brand name searches",
                  rank: "Page 5-10 for keywords"
                },
                {
                  time: "Week 2-4",
                  status: "Climbing",
                  description: "Rankings improve as you get traffic and backlinks",
                  rank: "Page 2-5 for keywords"
                },
                {
                  time: "Month 2-3",
                  status: "Established",
                  description: "Strong rankings for target keywords",
                  rank: "Page 1 for many keywords"
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold">{phase.time}</h3>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {phase.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {phase.description}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        Expected: {phase.rank}
                      </p>
                    </div>
                  </div>
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
