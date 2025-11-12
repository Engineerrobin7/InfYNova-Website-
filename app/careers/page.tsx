"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

export default function CareersPage() {
  const openings = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Build the AI that powers NovaOS. Work on cutting-edge machine learning models.",
      requirements: ["5+ years ML/AI experience", "Python, TensorFlow", "Mobile AI optimization"]
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Mumbai, India",
      type: "Full-time",
      description: "Design beautiful, intuitive experiences for InfyNova users.",
      requirements: ["3+ years product design", "Figma expert", "Mobile-first mindset"]
    },
    {
      title: "Android Developer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Build and optimize NovaOS. Create smooth, performant mobile experiences.",
      requirements: ["4+ years Android dev", "Kotlin/Java", "AOSP experience preferred"]
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Delhi, India",
      type: "Full-time",
      description: "Lead our marketing efforts. Build brand awareness and drive growth.",
      requirements: ["5+ years marketing", "Tech industry experience", "Data-driven approach"]
    },
    {
      title: "Hardware Engineer",
      department: "Hardware",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Design and optimize smartphone hardware. Work on next-gen devices.",
      requirements: ["4+ years hardware design", "Mobile devices", "Supply chain knowledge"]
    },
    {
      title: "Content Writer",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Create compelling content that tells the InfyNova story.",
      requirements: ["3+ years tech writing", "SEO knowledge", "Portfolio required"]
    }
  ];

  const benefits = [
    "Competitive salary + equity",
    "Health insurance for family",
    "Flexible work hours",
    "Remote work options",
    "Learning & development budget",
    "Latest tech equipment",
    "Unlimited vacation policy",
    "Team outings & events"
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Join Our Team
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Help us build the future of mobile technology
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're looking for passionate, talented individuals who want to make a real impact. 
                Join us in creating AI-powered smartphones that change how people interact with technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 text-center">Why InfyNova?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <h3 className="font-semibold mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">Work on cutting-edge AI and mobile tech</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🌟</div>
                  <h3 className="font-semibold mb-2">Impact</h3>
                  <p className="text-sm text-muted-foreground">Your work affects millions of users</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💡</div>
                  <h3 className="font-semibold mb-2">Growth</h3>
                  <p className="text-sm text-muted-foreground">Learn from the best, grow your career</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
              <div className="space-y-6">
                {openings.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 mb-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, i) => (
                            <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button className="group">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented people. Send us your resume and we'll keep you in mind for future openings.
              </p>
              <Button size="lg" className="group">
                Send Your Resume
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
