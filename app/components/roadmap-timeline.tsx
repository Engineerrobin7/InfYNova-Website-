"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Zap, Smartphone, Code, Award } from "lucide-react";

interface TimelineItem {
  quarter: string;
  year: number;
  title: string;
  description: string;
  milestones: string[];
  status: "completed" | "in-progress" | "upcoming";
  icon: React.ReactNode;
}

export function RoadmapTimeline() {
  const timelineItems: TimelineItem[] = [
    {
      quarter: "Q1",
      year: 2025,
      title: "Foundation Phase",
      description: "Building the core of InfyNova and NovaOS",
      milestones: [
        "NovaOS kernel development complete",
        "AI core processor optimizations",
        "First internal prototypes built",
        "Indian manufacturing partnerships established"
      ],
      status: "completed",
      icon: <Code className="w-6 h-6" />
    },
    {
      quarter: "Q2",
      year: 2025,
      title: "Beta Testing Phase",
      description: "Limited beta access for early supporters",
      milestones: [
        "Closed beta program launches",
        "NovaOS 1.0 beta released",
        "1000+ beta testers onboarded",
        "AI assistant training complete"
      ],
      status: "completed",
      icon: <Zap className="w-6 h-6" />
    },
    {
      quarter: "Q3",
      year: 2025,
      title: "Refinement & Scaling",
      description: "Scaling production capacity and refining software",
      milestones: [
        "Manufacturing ramp-up begins",
        "Quality assurance intensified",
        "First 5000 units in production",
        "Open beta program expands"
      ],
      status: "completed",
      icon: <CheckCircle2 className="w-6 h-6" />
    },
    {
      quarter: "Q4",
      year: 2025,
      title: "Launch Preparation",
      description: "Final preparations for global launch",
      milestones: [
        "Supply chain finalized",
        "Marketing campaign roll-out",
        "Influencer and early access programs",
        "Pre-order window opens"
      ],
      status: "in-progress",
      icon: <Clock className="w-6 h-6" />
    },
    {
      quarter: "Q1",
      year: 2026,
      title: "Official Launch",
      description: "InfyNova becomes available globally",
      milestones: [
        "InfyNova officially releases",
        "First shipments to customers",
        "Cloud partnership announcements",
        "Developer program launches"
      ],
      status: "upcoming",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      quarter: "Q2",
      year: 2026,
      title: "Expansion Phase",
      description: "New models and features rolled out",
      milestones: [
        "Pro and Max variants launch",
        "NovaOS 2.0 announced",
        "International market expansion",
        "Accessories ecosystem launches"
      ],
      status: "upcoming",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 border-green-500/30 text-green-400";
      case "in-progress":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
      case "upcoming":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "upcoming":
        return "Coming Soon";
      default:
        return "Unknown";
    }
  };

  return (
    <section className="py-20 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Product Roadmap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what we've built, what we're working on, and what's coming next. Total transparency on our journey to revolutionize mobile.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 to-transparent"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`lg:flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`lg:w-1/2 ${
                    index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"
                  }`}
                >
                  <div
                    className={`rounded-lg border p-6 backdrop-blur-sm ${getStatusColor(
                      item.status
                    )}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold opacity-75">
                          {item.quarter} {item.year}
                        </p>
                        <h3 className="text-2xl font-bold mt-1">{item.title}</h3>
                      </div>
                      <div className="ml-4">{item.icon}</div>
                    </div>

                    <p className="text-sm mb-4 opacity-90">{item.description}</p>

                    <ul className="text-sm space-y-2">
                      {item.milestones.map((milestone, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-xs opacity-60">▸</span>
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-black/40 border border-current">
                      {getStatusText(item.status)}
                    </div>
                  </div>
                </div>

                {/* Center dot for lg screens */}
                <div className="hidden lg:flex justify-center lg:w-auto">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background relative z-10"></div>
                </div>

                {/* Empty space for alignment */}
                <div className="lg:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-muted-foreground">Coming Soon</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
