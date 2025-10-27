"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "../hooks/use-toast";
import { CheckCircle, AlertCircle, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast: uiToast } = useToast();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = document.getElementById("cta-section");
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      uiToast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would be an API call to your backend
      console.log("Submitting email for pre-order notification:", email);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      uiToast({
        title: "Thanks for your interest!",
        description: "We'll notify you when pre-orders open."
      });
      
      // Send confirmation toast
      toast.success(`Confirmation sent to ${email}`, {
        description: "Check your email for pre-registration details.",
        duration: 5000,
        icon: <Mail className="h-5 w-5" />
      });
      
      // Simulating email notification delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Registration Complete!", {
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>You're now pre-registered for Infynova's launch.</span>
          </div>
        ),
        duration: 6000
      });
      
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      uiToast({
        title: "Something went wrong",
        description: (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span>Please try again later.</span>
          </div>
        ),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="buy" className="py-16 md:py-24 relative" aria-labelledby="cta-heading">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background -z-10"
      ></div>
      
      <motion.div 
        id="cta-section"
        className="container mx-auto px-4 max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.h2 
          id="cta-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tighter"
          variants={itemVariants}
        >
          Ready to Experience the Future?
        </motion.h2>
        <motion.p 
          className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10"
          variants={itemVariants}
        >
          Be among the first to own the new Infynova smartphone. Sign up now to get notified when pre-orders open.
        </motion.p>
        
        <motion.div 
          className="glass p-6 md:p-8 rounded-2xl mb-10 md:mb-12 border border-white/10"
          variants={itemVariants}
        >
          {isSubmitted ? (
            <div className="text-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p className="text-foreground/80 mb-6">
                You're now on our waitlist. We'll notify you when pre-orders open.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>Register Another Email</Button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col md:flex-row gap-3 md:gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                aria-label="Email for pre-order notification"
              />
              <Button 
                type="submit" 
                className="md:w-auto group"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : (
                  <>
                    Notify Me
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          )}
          <p className="text-sm text-foreground/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6 md:gap-8 items-center"
          variants={itemVariants}
        >
          <div className="text-center px-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-foreground/70">Years of Innovation</div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50M+</div>
            <div className="text-sm text-foreground/70">Happy Customers</div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15</div>
            <div className="text-sm text-foreground/70">Global Awards</div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-foreground/70">Customer Support</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}