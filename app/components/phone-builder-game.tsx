"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Share2, Download, Zap } from "lucide-react";

export function PhoneBuilderGame() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    color: "",
    storage: "",
    camera: "",
    battery: "",
    ai: ""
  });
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const steps = [
    {
      title: "Choose Your Color",
      options: [
        { name: "Midnight Black", value: "black", points: 10, emoji: "⚫" },
        { name: "Cosmic Blue", value: "blue", points: 15, emoji: "🔵" },
        { name: "Aurora White", value: "white", points: 10, emoji: "⚪" },
        { name: "Sunset Orange", value: "orange", points: 20, emoji: "🟠" }
      ],
      key: "color"
    },
    {
      title: "Select Storage",
      options: [
        { name: "128GB", value: "128", points: 10, emoji: "💾" },
        { name: "256GB", value: "256", points: 15, emoji: "💿" },
        { name: "512GB", value: "512", points: 20, emoji: "📀" },
        { name: "1TB", value: "1tb", points: 30, emoji: "🗄️" }
      ],
      key: "storage"
    },
    {
      title: "Camera Setup",
      options: [
        { name: "Dual 50MP", value: "dual", points: 10, emoji: "📷" },
        { name: "Triple 108MP", value: "triple", points: 20, emoji: "📸" },
        { name: "Quad 200MP Pro", value: "quad", points: 30, emoji: "📹" },
        { name: "AI Cinematic", value: "ai", points: 40, emoji: "🎬" }
      ],
      key: "camera"
    },
    {
      title: "Battery Power",
      options: [
        { name: "4000mAh", value: "4000", points: 10, emoji: "🔋" },
        { name: "5000mAh", value: "5000", points: 15, emoji: "🔌" },
        { name: "6000mAh", value: "6000", points: 25, emoji: "⚡" },
        { name: "7000mAh Ultra", value: "7000", points: 35, emoji: "🌟" }
      ],
      key: "battery"
    },
    {
      title: "AI Features",
      options: [
        { name: "Basic AI", value: "basic", points: 10, emoji: "🤖" },
        { name: "Smart AI", value: "smart", points: 20, emoji: "🧠" },
        { name: "Advanced AI", value: "advanced", points: 30, emoji: "✨" },
        { name: "Nova AI Pro", value: "nova", points: 50, emoji: "🚀" }
      ],
      key: "ai"
    }
  ];

  const handleSelect = (option: any, key: string) => {
    setSelections({ ...selections, [key]: option.value });
    setScore(score + option.points);
    
    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 500);
    } else {
      setTimeout(() => setShowResult(true), 500);
    }
  };

  const getReward = () => {
    if (score >= 150) return { title: "🏆 LEGENDARY BUILD!", discount: "₹10,000 OFF", color: "from-yellow-500 to-orange-500" };
    if (score >= 100) return { title: "💎 EPIC BUILD!", discount: "₹7,000 OFF", color: "from-purple-500 to-pink-500" };
    if (score >= 70) return { title: "⭐ GREAT BUILD!", discount: "₹5,000 OFF", color: "from-blue-500 to-cyan-500" };
    return { title: "✨ GOOD BUILD!", discount: "₹3,000 OFF", color: "from-green-500 to-emerald-500" };
  };

  const shareResult = () => {
    const text = `I just built my dream InfyNova phone and scored ${score} points! 🎮 ${getReward().title} Can you beat my score? 🏆`;
    if (navigator.share) {
      navigator.share({ title: "My InfyNova Build", text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      alert("Score copied! Share it on social media!");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 via-accent/5 to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-4 border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">WORLD'S FIRST PHONE BUILDER GAME</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Build Your Dream Phone
          </h2>
          <p className="text-muted-foreground text-lg">
            Design your perfect InfyNova and win exclusive discounts! 🎮
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {!showResult ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-2xl"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Step {step + 1} of {steps.length}</span>
                  <span className="font-bold text-primary">Score: {score}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 text-center">
                {steps[step].title}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {steps[step].options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(option, steps[step].key)}
                    className="relative bg-gradient-to-br from-muted to-muted/50 hover:from-primary/20 hover:to-accent/20 border-2 border-border hover:border-primary/50 rounded-2xl p-6 transition-all group"
                  >
                    <div className="text-4xl mb-3">{option.emoji}</div>
                    <div className="font-semibold mb-1">{option.name}</div>
                    <div className="text-xs text-muted-foreground">+{option.points} points</div>
                    <motion.div
                      className="absolute top-2 right-2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Zap className="w-4 h-4 text-primary" />
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-2xl text-center"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Trophy className="w-20 h-20 text-yellow-500" />
              </motion.div>

              <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${getReward().color} bg-clip-text text-transparent`}>
                {getReward().title}
              </h3>

              <div className="text-6xl font-bold mb-2">{score}</div>
              <div className="text-muted-foreground mb-6">Total Points</div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-6 border border-primary/30">
                <div className="text-sm text-muted-foreground mb-2">Your Exclusive Reward</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {getReward().discount}
                </div>
                <div className="text-sm text-muted-foreground mt-2">on your pre-order!</div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={shareResult}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share Your Score
                </button>
                <a
                  href="/pre-order"
                  className="block w-full px-6 py-3 bg-card border-2 border-primary rounded-lg hover:bg-primary/10 transition font-semibold"
                >
                  Claim Your Discount
                </a>
                <button
                  onClick={() => {
                    setStep(0);
                    setScore(0);
                    setShowResult(false);
                    setSelections({ color: "", storage: "", camera: "", battery: "", ai: "" });
                  }}
                  className="w-full px-6 py-3 text-muted-foreground hover:text-foreground transition"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Leaderboard Preview */}
        {!showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              🏆 Top builders this week: Rahul (185), Priya (178), Arjun (165)
            </p>
            <p className="text-xs text-muted-foreground">
              Beat the high score and get featured on our social media!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
