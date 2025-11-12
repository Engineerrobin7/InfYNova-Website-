"use client";

import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Import Firebase functions
      const { db } = await import('@/lib/firebase/config');
      const { collection, addDoc, serverTimestamp, query, where, getDocs } = await import('firebase/firestore');
      
      if (!db) {
        throw new Error('Database not configured');
      }

      // Check if email already exists
      const subscribersRef = collection(db, 'newsletter_subscribers');
      const q = query(subscribersRef, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.info("Already subscribed!", {
          description: "This email is already on our list.",
        });
        setEmail("");
        return;
      }

      // Add new subscriber to Firestore
      await addDoc(subscribersRef, {
        email: email.toLowerCase(),
        subscribedAt: serverTimestamp(),
        status: 'active',
        source: 'footer'
      });

      // Track newsletter subscription
      const { trackNewsletterSubscription } = await import('@/lib/analytics');
      trackNewsletterSubscription(email);
      
      toast.success("Thank you for subscribing!", {
        description: "You'll be the first to know about Infynova updates.",
      });
      
      setEmail("");
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      toast.error("Subscription failed", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background border-t border-border py-12" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4">
        <h2 id="footer-heading" className="sr-only">Footer</h2>

        {/* Newsletter subscription */}
        <div className="max-w-3xl mx-auto mb-12 p-6 rounded-xl bg-background/30 backdrop-blur-sm border border-border">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-2">Join Our Movement</h3>
            <p className="text-foreground/70">Be the first to know about Infynova updates, exclusive offers, and events.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              className="flex-1 bg-background/50 border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Email for newsletter"
              required
              disabled={isSubmitting}
            />
            <Button type="submit" className="group" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : (
                <>
                  Subscribe 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4" aria-label="Infynova home">
              <div className="text-2xl font-light tracking-tighter">
                <span className="font-bold">INFY</span>NOVA
              </div>
            </Link>
            <p className="text-foreground/70 mb-4 max-w-md">
              Redefining the future of mobile technology with innovative design and cutting-edge features that empower the next generation of thinkers.
            </p>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.instagram.com/infynova_tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="Infynova on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/infynova-tech/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="Infynova on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/infynova_tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="Infynova on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/infynova-tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                aria-label="Infynova on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-foreground/60">
                <Mail className="h-4 w-4" /> 
                <a href="mailto:infynovaindia@gmail.com" className="hover:text-primary transition-colors">
                  infynovaindia@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-foreground/60">
                <Phone className="h-4 w-4" /> 
                <a href="tel:+919896583808" className="hover:text-primary transition-colors">
                  +91 9896583808
                </a>
              </div>
              <div className="flex items-start gap-2 text-foreground/60">
                <MapPin className="h-4 w-4 mt-1" /> 
                <span>India</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-foreground/70 hover:text-primary transition-colors">Infynova</Link></li>
              <li><Link href="/features" className="text-foreground/70 hover:text-primary transition-colors">Infynova Pro</Link></li>
              <li><Link href="/features" className="text-foreground/70 hover:text-primary transition-colors">Infynova Ultra</Link></li>
              <li><Link href="/novaos" className="text-foreground/70 hover:text-primary transition-colors">NovaOS</Link></li>
              <li><Link href="/novaos/beta" className="text-foreground/70 hover:text-primary transition-colors">NovaOS Beta</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-foreground/70 hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-foreground/70 hover:text-primary transition-colors">Press</Link></li>
              <li><Link href="/blog" className="text-foreground/70 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/help-center" className="text-foreground/70 hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/community" className="text-foreground/70 hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="/developer-api" className="text-foreground/70 hover:text-primary transition-colors">Developer API</Link></li>
              <li><Link href="/novaos/developer-program" className="text-foreground/70 hover:text-primary transition-colors">Developer Program</Link></li>
              <li><Link href="/novaos/docs" className="text-foreground/70 hover:text-primary transition-colors">NovaOS Docs</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Infynova Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}