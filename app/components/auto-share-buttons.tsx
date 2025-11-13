"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Twitter, Facebook, Linkedin, Instagram, MessageCircle, Copy, Check } from "lucide-react";

interface AutoShareButtonsProps {
  title?: string;
  text?: string;
  url?: string;
}

export function AutoShareButtons({ 
  title = "Check out InfyNova - World's First AI Smartphone with a Game!",
  text = "I just discovered InfyNova - they have a game where you can win ₹10,000, AR try-on, and more! 🤯",
  url = typeof window !== 'undefined' ? window.location.href : ''
}: AutoShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=InfyNova,AISmartphone,MadeInIndia`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  };

  const handleShare = async (platform: string) => {
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative"
      >
        {showShare && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-16 right-0 bg-card border border-border rounded-2xl p-4 shadow-2xl min-w-[200px]"
          >
            <p className="text-sm font-semibold mb-3">Share InfyNova</p>
            <div className="space-y-2">
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition text-left"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Twitter</span>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition text-left"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Facebook</span>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition text-left"
              >
                <Linkedin className="w-5 h-5 text-blue-700" />
                <span className="text-sm">LinkedIn</span>
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition text-left"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">WhatsApp</span>
              </button>
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition text-left"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </motion.div>
        )}

        <button
          onClick={() => setShowShare(!showShare)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
}
