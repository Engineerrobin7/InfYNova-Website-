"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Gift, Share2, Camera, Zap } from "lucide-react";

export function ViralChallenges() {
  const [activeChallenge, setActiveChallenge] = useState(0);

  // Generate static positions to avoid hydration mismatch
  const floatingElements = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      left: (i * 13.7) % 100,
      top: (i * 17.3) % 100,
      duration: 3 + (i % 3),
      delay: (i % 5) * 0.4,
      emoji: ["🔥", "⚡", "🎉", "🏆", "✨"][i % 5]
    }));
  }, []);

  const challenges = [
    {
      id: 1,
      title: "#InfyNovaUnboxChallenge",
      description: "Show us your most creative unboxing video",
      prize: "Win InfyNova Pro + ₹50,000",
      participants: 15847,
      deadline: "3 days left",
      icon: "📦",
      color: "from-purple-500 to-pink-500",
      trending: true
    },
    {
      id: 2,
      title: "#NovaOSDanceChallenge",
      description: "Create a dance video with our NovaOS theme song",
      prize: "₹25,000 + Featured on our page",
      participants: 28934,
      deadline: "5 days left",
      icon: "💃",
      color: "from-blue-500 to-cyan-500",
      trending: true
    },
    {
      id: 3,
      title: "#AIPhoneArtChallenge",
      description: "Design AI-generated art using our theme",
      prize: "₹15,000 + Free NovaOS Premium",
      participants: 9234,
      deadline: "7 days left",
      icon: "🎨",
      color: "from-orange-500 to-red-500",
      trending: false
    },
    {
      id: 4,
      title: "#InfyNovaMemeChallenge",
      description: "Create the funniest InfyNova meme",
      prize: "₹10,000 + Merchandise",
      participants: 34521,
      deadline: "2 days left",
      icon: "😂",
      color: "from-green-500 to-emerald-500",
      trending: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {floatingElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
            }}
          >
            {element.emoji}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full mb-4 border border-orange-500/30">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-500">TRENDING NOW</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Viral Challenges
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our viral challenges, win amazing prizes, and get featured on our social media!
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">
                <span className="font-bold">₹2.5 Lakhs</span> in prizes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm">
                <span className="font-bold">88,536</span> participants
              </span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all group cursor-pointer"
              onClick={() => setActiveChallenge(challenge.id)}
            >
              {challenge.trending && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                >
                  <Flame className="w-3 h-3" />
                  TRENDING
                </motion.div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{challenge.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {challenge.description}
                  </p>
                  <div className={`inline-block bg-gradient-to-r ${challenge.color} text-white text-sm font-semibold px-4 py-2 rounded-full`}>
                    🏆 {challenge.prize}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    {challenge.participants.toLocaleString()} joined
                  </span>
                  <span className="text-orange-500 font-semibold">
                    ⏰ {challenge.deadline}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Join Challenge
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* How to Participate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/30"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">How to Participate</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Create Content",
                description: "Make your video, photo, or art",
                icon: Camera
              },
              {
                step: "2",
                title: "Post & Tag",
                description: "Share on Instagram/Twitter with hashtag",
                icon: Share2
              },
              {
                step: "3",
                title: "Win Prizes",
                description: "Winners announced every week",
                icon: Gift
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Winners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            🎉 Recent Winners: @rahul_tech (₹50K), @priya_creates (₹25K), @arjun_memes (₹15K)
          </p>
          <button className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-muted transition font-semibold">
            View All Winners
          </button>
        </motion.div>
      </div>
    </section>
  );
}
