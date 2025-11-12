"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, TrendingUp, Users, Sparkles } from "lucide-react";

export function CommunityVoting() {
  const [votes, setVotes] = useState({
    feature1: 1247,
    feature2: 2891,
    feature3: 1653,
    feature4: 3421
  });
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      id: "feature1",
      title: "Under-Display Camera",
      description: "Full-screen display with no notch or punch-hole",
      icon: "📸",
      status: "voting"
    },
    {
      id: "feature2",
      title: "Satellite Connectivity",
      description: "Stay connected anywhere, even without cell towers",
      icon: "🛰️",
      status: "winning"
    },
    {
      id: "feature3",
      title: "Solar Charging",
      description: "Charge your phone using sunlight",
      icon: "☀️",
      status: "voting"
    },
    {
      id: "feature4",
      title: "Holographic Display",
      description: "3D holographic projections from your phone",
      icon: "✨",
      status: "winning"
    }
  ];

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleVote = (featureId: string) => {
    if (hasVoted) return;
    
    setVotes({ ...votes, [featureId]: votes[featureId as keyof typeof votes] + 1 });
    setSelectedFeature(featureId);
    setHasVoted(true);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setVotes(prev => ({
        ...prev,
        [featureId]: prev[featureId as keyof typeof prev] + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    setTimeout(() => clearInterval(interval), 30000);
  };

  const getPercentage = (featureId: string) => {
    return ((votes[featureId as keyof typeof votes] / totalVotes) * 100).toFixed(1);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-4 border border-primary/30">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">COMMUNITY DECIDES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Vote for Next Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your vote matters! Help us decide which revolutionary features to include in InfyNova 2.0
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm">
                <span className="font-bold">{totalVotes.toLocaleString()}</span> votes cast
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm">
                <span className="font-bold">12,847</span> participants
              </span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const percentage = getPercentage(feature.id);
            const isWinning = parseFloat(percentage) > 25;
            const isSelected = selectedFeature === feature.id;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-card border-2 rounded-2xl p-6 transition-all ${
                  isSelected
                    ? "border-primary shadow-lg shadow-primary/20"
                    : isWinning
                    ? "border-green-500/50"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {isWinning && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    LEADING
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>

                {/* Vote Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {votes[feature.id as keyof typeof votes].toLocaleString()} votes
                    </span>
                    <span className="font-bold text-primary">{percentage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        isWinning
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gradient-to-r from-primary to-accent"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Vote Button */}
                <button
                  onClick={() => handleVote(feature.id)}
                  disabled={hasVoted}
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-gradient-to-r from-primary to-accent text-white"
                      : hasVoted
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-primary/30"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Voted!
                    </>
                  ) : hasVoted ? (
                    "Already Voted"
                  ) : (
                    <>
                      <ThumbsUp className="w-5 h-5" />
                      Vote for This
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {hasVoted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/30">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Thanks for Voting!</h3>
              <p className="text-muted-foreground mb-4">
                You've earned <span className="font-bold text-primary">100 points</span> towards your pre-order discount
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold">
                Share Your Vote
              </button>
            </div>
          </motion.div>
        )}

        {/* Live Updates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            🔴 Live • Voting closes in 7 days • Results will be announced on social media
          </p>
        </motion.div>
      </div>
    </section>
  );
}
