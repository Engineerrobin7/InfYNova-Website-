"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Download, Mail, FileText, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "../components/ui/button";

export default function PressPage() {
  const pressReleases = [
    {
      title: "InfyNova Launches India's First AI-Powered Smartphone",
      date: "November 12, 2024",
      excerpt: "InfyNova today announced the launch of its revolutionary AI-powered smartphone featuring NovaOS..."
    },
    {
      title: "InfyNova Raises $10M in Seed Funding",
      date: "October 15, 2024",
      excerpt: "Leading venture capital firms invest in India's most promising smartphone startup..."
    },
    {
      title: "NovaOS: The Operating System of the Future",
      date: "September 20, 2024",
      excerpt: "InfyNova unveils NovaOS, a custom AI-first operating system designed for next-gen smartphones..."
    }
  ];

  const mediaAssets = [
    { type: "Logo Pack", icon: ImageIcon, size: "2.5 MB", format: "PNG, SVG" },
    { type: "Product Photos", icon: ImageIcon, size: "15 MB", format: "JPG, PNG" },
    { type: "Press Kit", icon: FileText, size: "5 MB", format: "PDF" },
    { type: "Brand Guidelines", icon: FileText, size: "3 MB", format: "PDF" },
    { type: "Product Videos", icon: Video, size: "50 MB", format: "MP4" },
    { type: "Founder Photos", icon: ImageIcon, size: "8 MB", format: "JPG" }
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
                Press & Media
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Latest news, press releases, and media resources
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20 text-center"
            >
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Media Inquiries</h2>
              <p className="text-muted-foreground mb-4">
                For press inquiries, interviews, or media requests, please contact:
              </p>
              <a href="mailto:press@infynova.in" className="text-primary font-semibold text-lg hover:underline">
                press@infynova.in
              </a>
              <p className="text-sm text-muted-foreground mt-4">
                Phone: +91 9896583808
              </p>
            </motion.div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Press Releases</h2>
              <div className="space-y-6">
                {pressReleases.map((release, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{release.date}</p>
                        <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                        <Button variant="outline" size="sm">
                          Read Full Release
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Media Assets */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Media Assets</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaAssets.map((asset, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
                  >
                    <asset.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold mb-2">{asset.type}</h3>
                    <div className="text-sm text-muted-foreground mb-4">
                      <p>Size: {asset.size}</p>
                      <p>Format: {asset.format}</p>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download Complete Press Kit
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Company Information</h2>
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h3>About InfyNova</h3>
                  <p className="text-muted-foreground">
                    InfyNova is an Indian technology company building AI-powered smartphones that feel alive, 
                    intuitive, and human-centric. Founded in 2024, InfyNova represents the fusion of cutting-edge 
                    artificial intelligence with elegant design.
                  </p>
                  
                  <h3 className="mt-6">Key Facts</h3>
                  <ul className="text-muted-foreground">
                    <li>Founded: 2024</li>
                    <li>Headquarters: India</li>
                    <li>Industry: Consumer Electronics, AI, Mobile Technology</li>
                    <li>Products: InfyNova Smartphone, NovaOS</li>
                    <li>Website: infynova.in</li>
                  </ul>

                  <h3 className="mt-6">Leadership</h3>
                  <p className="text-muted-foreground">
                    <strong>Robin Singh</strong> - Founder & CEO<br />
                    Passionate about building technology that empowers people and believes that India can lead 
                    the global tech revolution.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
