"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Zap, X } from "lucide-react";
import { SubmitChallengeEntry } from "./submit-challenge-entry";

export function ViralChallenges() {
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const challenges = [
    {
      id: 1,
      title: "#InfyNovaUnboxChallenge",
      description: "Show us your most creative unboxing video.",
      prize: "InfyNova Pro + ₹50,000",
      participants: 15847,
      deadline: "3 days left",
      trending: true
    },
    {
      id: 2,
      title: "#NovaOSDanceChallenge",
      description: "Create a dance video with our NovaOS theme song.",
      prize: "₹25,000 + Featured",
      participants: 28934,
      deadline: "5 days left",
      trending: true
    },
    {
      id: 3,
      title: "#AIPhoneArtChallenge",
      description: "Design AI-generated art using our NovaOS theme.",
      prize: "₹15,000 + NovaOS Premium",
      participants: 9234,
      deadline: "7 days left",
      trending: false
    },
    {
      id: 4,
      title: "#InfyNovaDesignSprint",
      description: "Create an icon pack for the next OS update.",
      prize: "₹10,000 + Merchandise",
      participants: 34521,
      deadline: "2 days left",
      trending: true
    }
  ];

  return (
    <section className="relative overflow-hidden w-full">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="heading-lg tracking-tight mb-4">
            Creative challenges.
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-muted-foreground">
            A blank canvas for your creativity. Enter one of the ongoing challenges to win exclusive hardware drops and grand prizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 hover:bg-[#111] transition-colors cursor-pointer group flex flex-col justify-between"
              onClick={() => setActiveChallenge(challenge.id)}
            >
              <div>
                 <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-semibold text-white tracking-tight">{challenge.title}</h3>
                    {challenge.trending && (
                      <span className="text-xs uppercase tracking-widest text-[#fff] bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">
                         Trending
                      </span>
                    )}
                 </div>
                 <p className="text-white/50 text-lg mb-8 leading-relaxed">
                   {challenge.description}
                 </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white text-sm font-medium">Prize Pool</span>
                  <span className="text-white border border-white/20 rounded-full px-4 py-1 text-sm">{challenge.prize}</span>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Zap className="w-4 h-4" />
                    <span>{challenge.participants.toLocaleString()} joined</span>
                  </div>
                  <span className="text-white/40 text-sm font-mono">
                    {challenge.deadline}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveChallenge(challenge.id);
                    setShowSubmitModal(true);
                  }}
                  className="w-full mt-6 py-4 bg-white text-black rounded-xl hover:bg-neutral-200 transition font-medium flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Submit Entry
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Submit Entry Modal */}
      <AnimatePresence>
        {showSubmitModal && activeChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowSubmitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mt-8">
                 <SubmitChallengeEntry
                   challengeId={activeChallenge}
                   hashtag={challenges.find(c => c.id === activeChallenge)?.title || ''}
                   onClose={() => setShowSubmitModal(false)}
                 />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
