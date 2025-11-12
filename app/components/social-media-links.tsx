"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Youtube, MessageCircle } from "lucide-react";

export function SocialMediaLinks() {
  const socials = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/infynova_tech",
      color: "hover:text-pink-500",
      followers: "10K+"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/infynova_tech",
      color: "hover:text-blue-400",
      followers: "5K+"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/infynova-tech",
      color: "hover:text-blue-600",
      followers: "5K+"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@infynova",
      color: "hover:text-red-500",
      followers: "10K+"
    },
    {
      name: "Discord",
      icon: MessageCircle,
      url: "#", // Add your Discord invite link
      color: "hover:text-indigo-500",
      followers: "Join"
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {socials.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card transition-colors ${social.color}`}
        >
          <social.icon className="w-5 h-5" />
          <span className="text-sm font-medium">{social.name}</span>
          <span className="text-xs text-muted-foreground">{social.followers}</span>
        </motion.a>
      ))}
    </div>
  );
}
