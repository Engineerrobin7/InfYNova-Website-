"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ProductHuntBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center py-8"
    >
      <a 
        href="https://www.producthunt.com/products/infynova?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-infynova" 
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
        aria-label="InfYNova on Product Hunt"
      >
        <Image 
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1039185&theme=light&t=1763393150933" 
          alt="InfYNova - A bold, clean, human-first smartphone built in India. | Product Hunt" 
          width={250} 
          height={54}
          priority={false}
          loading="lazy"
        />
      </a>
    </motion.div>
  );
}
