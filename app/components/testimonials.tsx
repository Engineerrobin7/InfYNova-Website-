"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Tech Enthusiast",
      location: "Mumbai",
      rating: 5,
      text: "InfyNova is a game-changer! The AI features are incredible and NovaOS is so smooth. Finally, a phone that understands me.",
      avatar: "👩"
    },
    {
      name: "Rahul Verma",
      role: "Software Developer",
      location: "Bangalore",
      rating: 5,
      text: "As a developer, I appreciate the customization and performance. NovaOS is blazing fast and the AI integration is seamless.",
      avatar: "👨"
    },
    {
      name: "Ananya Patel",
      role: "Content Creator",
      location: "Delhi",
      rating: 5,
      text: "The camera is phenomenal! AI scene detection works like magic. My Instagram has never looked better.",
      avatar: "👩"
    },
    {
      name: "Arjun Mehta",
      role: "Entrepreneur",
      location: "Pune",
      rating: 5,
      text: "Battery life is outstanding. The AI power management actually works. I can go a full day without charging.",
      avatar: "👨"
    },
    {
      name: "Sneha Reddy",
      role: "Student",
      location: "Hyderabad",
      rating: 5,
      text: "Love the Made in India pride! The phone is premium, fast, and the price is unbeatable. Proud to own InfyNova.",
      avatar: "👩"
    },
    {
      name: "Vikram Singh",
      role: "Photographer",
      location: "Jaipur",
      rating: 5,
      text: "The 108MP camera with AI is a photographer's dream. Night mode is incredible. This rivals flagship cameras.",
      avatar: "👨"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground">
            Real feedback from real people
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Join thousands of satisfied customers
          </p>
          <a
            href="/pre-order"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            Pre-Order Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
