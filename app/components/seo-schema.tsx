export function SEOSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InfYNova",
    "alternateName": "InfyNova",
    "url": "https://infynova.in",
    "logo": "https://infynova.in/logo.png",
    "description": "India's first AI-powered smartphone company building revolutionary devices with NovaOS",
    "foundingDate": "2024",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    },
    "founders": [
      {
        "@type": "Person",
        "name": "Robin Singh",
        "jobTitle": "Founder & CEO"
      }
    ],
    "sameAs": [
      "https://instagram.com/infynova_tech",
      "https://twitter.com/infynova_tech",
      "https://linkedin.com/company/infynova-tech",
      "https://youtube.com/@infynova",
      "https://github.com/infynova-tech",
      "https://www.producthunt.com/products/infynova"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9896583808",
      "contactType": "Customer Service",
      "email": "infynovaindia@gmail.com",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "InfYNova AI Smartphone",
    "description": "India's first AI-powered smartphone with NovaOS, featuring 108MP camera, Snapdragon 8 Gen 3, and revolutionary AI features",
    "brand": {
      "@type": "Brand",
      "name": "InfYNova"
    },
    "category": "Smartphones",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "24999",
      "highPrice": "59999",
      "priceCurrency": "INR",
      "availability": "https://schema.org/PreOrder",
      "url": "https://infynova.in/pre-order",
      "priceValidUntil": "2025-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "image": "https://infynova.in/og-image.jpg"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "InfYNova",
    "url": "https://infynova.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://infynova.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://infynova.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://infynova.in/features"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "NovaOS",
        "item": "https://infynova.in/novaos"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
