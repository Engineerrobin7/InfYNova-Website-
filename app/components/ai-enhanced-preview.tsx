"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Image as ImageIcon, CheckCircle2, RefreshCw } from 'lucide-react';

export function AIEnhancedPreview() {
  const [image, setImage] = useState<string | null>(null);
  const [enhancing, setEnhancing] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setDone(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateEnhancement = () => {
    setEnhancing(true);
    // Simulate complex AI processing
    setTimeout(() => {
      setEnhancing(false);
      setDone(true);
    }, 3000);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="ai-preview">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary tracking-widest uppercase">Nova AI Neural Engine</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">The Future of Mobile Photography</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upload your average photos and see how our proprietary AI transforms them into professional-grade masterpieces in real-time.
            </p>
          </motion.div>

          <div className="bg-card border border-border rounded-3xl p-4 md:p-8 shadow-2xl relative">
            {!image ? (
              <motion.div
                whileHover={{ scale: 1.005 }}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-primary/30 rounded-2xl p-12 md:p-24 text-center cursor-pointer hover:bg-primary/5 transition-all group"
              >
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Select an Image</h3>
                <p className="text-muted-foreground mb-8">Choose any low-light or standard photo to see the magic.</p>
                <div className="px-6 py-2 bg-primary/20 rounded-lg text-primary text-sm font-semibold inline-block">
                  Click to Browse
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </motion.div>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="relative aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-white/10 group">
                  {/* Image Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={image} 
                      alt="Neural Preview" 
                      className={`w-full h-full object-contain transition-all duration-2000 ease-out ${
                        done ? 'saturate-[1.15] contrast-[1.05] brightness-[1.05] scale-[1.01]' : ''
                      } ${enhancing ? 'blur-[2px] grayscale-[0.5]' : ''}`}
                    />
                  </div>

                  {/* Scanning Line */}
                  <AnimatePresence>
                    {enhancing && (
                      <motion.div
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(0,212,255,1)] z-20"
                      />
                    )}
                  </AnimatePresence>

                  {/* Recognition Boxes (Floating UI) */}
                  {enhancing && (
                    <div className="absolute inset-0 z-10">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/40 rounded-lg"
                      />
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="absolute bottom-1/3 right-1/4 w-40 h-24 border border-accent/40 rounded-lg"
                      />
                    </div>
                  )}

                  {/* Info Overlays */}
                  {done && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-6 left-6 flex flex-col gap-2"
                      >
                        <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                          Dynamic Range +24%
                        </div>
                        <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                          Noise Reduction Active
                        </div>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-6 right-6"
                      >
                        <div className="bg-primary px-6 py-2 rounded-xl text-xs font-black text-white uppercase tracking-[0.2em] shadow-xl shadow-primary/30">
                          Neural Optimised
                        </div>
                      </motion.div>
                    </>
                  )}

                  {/* Loader */}
                  <AnimatePresence>
                    {enhancing && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30"
                      >
                        <div className="text-center space-y-4">
                          <div className="relative">
                            <RefreshCw className="w-16 h-16 text-primary animate-spin" />
                            <Sparkles className="absolute top-0 right-0 w-6 h-6 text-accent animate-pulse" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-white font-black tracking-widest uppercase text-xs">Processing Neural Map</p>
                            <p className="text-white/40 text-[10px] uppercase font-bold">Infinitive Resolution Engine v2.4</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  {!done && !enhancing && (
                    <button
                      onClick={simulateEnhancement}
                      className="px-10 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-primary/30 group"
                    >
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Run Neural Engine
                    </button>
                  )}
                  {done && (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-3 text-green-500 font-bold bg-green-500/5 px-8 py-4 rounded-2xl border border-green-500/20"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                      Optimized by Nova AI
                    </motion.div>
                  )}
                  <button
                    onClick={() => {
                      setImage(null);
                      setDone(false);
                    }}
                    className="px-10 py-5 bg-muted/50 hover:bg-muted rounded-2xl font-bold flex items-center justify-center gap-3 transition-colors text-sm uppercase tracking-widest"
                  >
                    <ImageIcon className="w-5 h-5 opacity-60" />
                    Load Another
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-[10px] text-center mt-8 uppercase font-bold tracking-[0.3em]"
          >
            *Simulated representation of InfYNova camera processing power.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
