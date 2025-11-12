"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Smartphone, RotateCw, Download, Share2, Sparkles } from "lucide-react";

export function ARTryOn() {
  const [isActive, setIsActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const colors = [
    { name: "Midnight Black", value: "black", hex: "#000000" },
    { name: "Cosmic Blue", value: "blue", hex: "#1e40af" },
    { name: "Aurora White", value: "white", hex: "#ffffff" },
    { name: "Sunset Orange", value: "orange", hex: "#ea580c" }
  ];

  const startAR = () => {
    setIsActive(true);
    // In production, this would activate the device camera
    // and use AR.js or WebXR for actual AR experience
  };

  const capturePhoto = () => {
    // Simulate photo capture
    setCapturedImage("/placeholder-ar-capture.jpg");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-4 border border-primary/30">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">WORLD'S FIRST AR TRY-ON</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See It In Your Hand
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Use your camera to see how InfyNova looks in your hand before you buy. Revolutionary AR technology!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {!isActive ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-3xl p-8 text-center"
            >
              <div className="relative w-64 h-64 mx-auto mb-8">
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-2xl flex items-center justify-center">
                    <Smartphone className="w-32 h-32 text-white" />
                  </div>
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold mb-4">Try InfyNova in AR</h3>
              <p className="text-muted-foreground mb-6">
                Point your camera at your hand and see a life-size 3D model of InfyNova
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Choose a color:</p>
                <div className="flex justify-center gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.value
                          ? "border-primary scale-110"
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 rounded-full border-2 border-primary"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startAR}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold text-lg flex items-center justify-center gap-2 mx-auto"
              >
                <Camera className="w-6 h-6" />
                Start AR Experience
              </button>

              <p className="text-xs text-muted-foreground mt-4">
                Works on iOS 12+ and Android 8+ devices
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-black rounded-3xl overflow-hidden aspect-[9/16] max-w-md mx-auto"
            >
              {/* Simulated Camera View */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotateZ: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    {/* 3D Phone Model */}
                    <div
                      className={`w-48 h-96 rounded-3xl shadow-2xl ${
                        selectedColor === "black" ? "bg-black" :
                        selectedColor === "blue" ? "bg-blue-600" :
                        selectedColor === "white" ? "bg-white" :
                        "bg-orange-500"
                      }`}
                      style={{
                        transform: "perspective(1000px) rotateY(-15deg) rotateX(5deg)",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                      }}
                    >
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full"></div>
                      <div className="absolute inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl"></div>
                    </div>

                    {/* AR Indicators */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-4 -left-4 w-8 h-8 border-2 border-primary rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute -bottom-4 -right-4 w-8 h-8 border-2 border-accent rounded-full"
                    />
                  </motion.div>
                </div>

                {/* AR UI Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    AR Active
                  </div>
                  <button
                    onClick={() => setIsActive(false)}
                    className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-black/70 transition"
                  >
                    ✕
                  </button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-center gap-4 mb-4">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color.value
                            ? "border-white scale-110"
                            : "border-white/50"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={capturePhoto}
                      className="bg-white text-black rounded-full p-4 hover:bg-gray-200 transition"
                    >
                      <Camera className="w-6 h-6" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm text-white rounded-full p-4 hover:bg-white/30 transition">
                      <RotateCw className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Captured Image */}
          {capturedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-card border border-border rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-center">Your AR Capture</h3>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share on Social
                </button>
                <button className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-muted transition font-semibold flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Share your AR photo with #InfyNovaAR and get featured!
              </p>
            </motion.div>
          )}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            🎉 <span className="font-bold">47,892</span> people have tried AR • 
            <span className="font-bold"> 12,341</span> photos shared today
          </p>
        </motion.div>
      </div>
    </section>
  );
}
