"use client";

import { useEffect } from "react";

export function SEOBoost() {
  useEffect(() => {
    // Add structured data for rich snippets
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "InfyNova AI Smartphone",
      "description": "World's first AI-powered smartphone with interactive game, AR try-on, and community voting",
      "brand": {
        "@type": "Brand",
        "name": "InfyNova"
      },
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "29999",
        "highPrice": "64999",
        "priceCurrency": "INR",
        "availability": "https://schema.org/PreOrder"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1247"
      },
      "review": [
        {
          "@type": "Review",
          "author": "Rahul Sharma",
          "datePublished": "2024-11-12",
          "reviewBody": "InfyNova is a game-changer! The AI features are incredible.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add FAQ structured data
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is InfyNova?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "InfyNova is India's first AI-powered smartphone with revolutionary features including a phone builder game, AR try-on, and community voting."
          }
        },
        {
          "@type": "Question",
          "name": "How can I win ₹10,000?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Play our Phone Builder Game and score 150+ points to win ₹10,000 OFF your InfyNova purchase."
          }
        },
        {
          "@type": "Question",
          "name": "What is NovaOS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "NovaOS is our custom AI-first operating system built on Android 14, designed specifically for intelligent mobile experiences."
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqData);
    document.head.appendChild(faqScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(faqScript);
    };
  }, []);

  return null;
}
