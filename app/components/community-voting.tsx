"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";

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
      title: "Under-Display Camera System",
      description: "A completely uninterrupted edge-to-edge display.",
    },
    {
      id: "feature2",
      title: "Satellite Connectivity",
      description: "Stay connected across the globe without cell towers.",
    },
    {
      id: "feature3",
      title: "Solar Charging Backplate",
      description: "Ambient battery regeneration technology.",
    },
    {
      id: "feature4",
      title: "Holographic Display Module",
      description: "True 3D projections directly from the chassis.",
    }
  ];

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleVote = (featureId: string) => {
    if (hasVoted) return;
    
    setVotes({ ...votes, [featureId]: votes[featureId as keyof typeof votes] + 1 });
    setSelectedFeature(featureId);
    setHasVoted(true);
  };

  const getPercentage = (featureId: string) => {
    return ((votes[featureId as keyof typeof votes] / totalVotes) * 100).toFixed(1);
  };

  return (
    <section className="relative overflow-hidden w-full bg-black">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="border-t border-white/10 pt-20 mb-16 text-center">
            <h2 className="heading-lg tracking-tight mb-4">
              Shape the future.
            </h2>
            <p className="body-lg max-w-2xl mx-auto text-muted-foreground">
               Cast your vote on what we engineer next. The highest voted technologies enter our rapid prototyping pipeline.
            </p>
        </div>

        <div className="grid gap-6">
          {features.map((feature, index) => {
            const percentage = getPercentage(feature.id);
            const isWinning = parseFloat(percentage) > 25;
            const isSelected = selectedFeature === feature.id;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative bg-[#0A0A0A] border rounded-3xl p-6 md:p-10 transition-all ${
                  isSelected
                    ? "border-white"
                    : isWinning
                    ? "border-white/30"
                    : "border-white/5"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                       <h3 className="text-xl md:text-2xl font-medium text-white">{feature.title}</h3>
                       {isWinning && !isSelected && (
                         <span className="text-[10px] uppercase tracking-widest bg-white/10 text-white px-3 py-1 rounded-full">Community Choice</span>
                       )}
                    </div>
                    <p className="text-white/50">{feature.description}</p>
                  </div>
                  
                  <button
                    onClick={() => handleVote(feature.id)}
                    disabled={hasVoted}
                    className={`shrink-0 py-3 px-8 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-white text-black"
                        : hasVoted
                        ? "bg-transparent border border-white/10 text-white/30 cursor-not-allowed"
                        : "bg-transparent border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {isSelected ? (
                      <span className="flex items-center gap-2">Voted <ThumbsUp className="w-4 h-4" /></span>
                    ) : hasVoted ? (
                      "Locked"
                    ) : (
                      "Vote"
                    )}
                  </button>
                </div>

                <div className="w-full">
                  <div className="flex justify-between text-xs text-white/40 mb-2 font-mono">
                    <span>{votes[feature.id as keyof typeof votes].toLocaleString()} votes</span>
                    <span className={isSelected ? "text-white font-medium" : ""}>{percentage}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${isSelected ? "bg-white" : isWinning ? "bg-white/60" : "bg-white/20"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
            <p className="text-xs text-white/30 font-mono tracking-widest uppercase">
              • Pipeline polling closes in 7 days •
            </p>
        </div>
      </div>
    </section>
  );
}
