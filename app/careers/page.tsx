"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock } from "lucide-react";

export default function CareersPage() {
  const jobs = [
    { title: "Senior Software Engineer", location: "Mumbai, India", type: "Full-time", department: "Engineering" },
    { title: "Product Designer", location: "Bangalore, India", type: "Full-time", department: "Design" },
    { title: "AI/ML Engineer", location: "Remote", type: "Full-time", department: "AI Research" },
    { title: "Marketing Manager", location: "Delhi, India", type: "Full-time", department: "Marketing" },
    { title: "Hardware Engineer", location: "Pune, India", type: "Full-time", department: "Hardware" },
    { title: "Customer Support Lead", location: "Hyderabad, India", type: "Full-time", department: "Support" },
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
              <p className="text-xl text-muted-foreground">
                Help us build the future of mobile technology
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                      </div>
                    </div>
                    <a
                      href="/contact"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition whitespace-nowrap"
                    >
                      Apply Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
