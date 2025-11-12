export function SEOSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InfYNova",
    "url": "https://infynova.in",
    "logo": "https://infynova.in/logo.png",
    "description": "India's first AI-powered smartphone company",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Robin Singh"
      }
    ],
    "sameAs": [
      "https://instagram.com/infynova_tech",
      "https://twitter.com/infynova_tech",
      "https://linkedin.com/company/infynova-tech",
      "https://youtube.com/@infynova"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9896583808",
      "contactType": "Customer Service",
      "email": "contact@infynova.in"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "InfYNova AI Smartphone",
    "description": "India's first AI-powered smartphone with NovaOS",
    "brand": {
      "@type": "Brand",
      "name": "InfYNova"
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
      "reviewCount": "1250"
    }
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
    </>
  );
}
