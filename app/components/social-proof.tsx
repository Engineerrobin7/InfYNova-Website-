"use client";

import { motion } from "framer-motion";
import { Star, Users, Award, TrendingUp } from "lucide-react";

export function SocialProof() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Pre-Orders",
      color: "text-blue-500"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "User Rating",
      color: "text-yellow-500"
    },
    {
      icon: Award,
      value: "15+",
      label: "Tech Awards",
      color: "text-purple-500"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Satisfaction",
      color: "text-green-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground">
            Join the AI smartphone revolution
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
            >
              <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-3`} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              name: "Rahul Sharma",
              role: "Tech Enthusiast",
              comment: "The AI features are mind-blowing! NovaOS is the future.",
              rating: 5
            },
            {
              name: "Priya Patel",
              role: "Content Creator",
              comment: "Best camera I've ever used. The AI knows exactly what I need.",
              rating: 5
            },
            {
              name: "Arjun Mehta",
              role: "Developer",
              comment: "Finally, a phone that understands developers. Love the customization!",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-sm mb-4 italic">"{testimonial.comment}"</p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-xs text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
