"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Loader2 } from "lucide-react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const formStartTime = useRef<number>(Date.now());

  useEffect(() => {
    // Load reCAPTCHA script
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setCaptchaLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      let captchaToken = '';
      
      // Get reCAPTCHA token if available
      if (captchaLoaded && window.grecaptcha) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (siteKey) {
          captchaToken = await window.grecaptcha.execute(siteKey, { action: 'newsletter' });
        }
      }

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          captchaToken,
          honeypot: '', // Empty honeypot field
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Thanks for subscribing! Check your email.");
        setEmail("");
        formStartTime.current = Date.now();
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }

    setTimeout(() => {
      if (status !== "success") {
        setStatus("idle");
      }
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20"
    >
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
        <p className="text-muted-foreground mb-6">
          Get exclusive updates, early access, and special offers delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === "success" && <Check className="w-4 h-4" />}
            {status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-sm ${
              status === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </motion.p>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </motion.div>
  );
}
