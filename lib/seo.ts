import { SITE_ORIGIN } from "@/lib/site-config";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Fuaad Abdullah",
  "url": `${SITE_ORIGIN}/profile`,
  "@id": `${SITE_ORIGIN}/profile#person`,
  "mainEntityOfPage": `${SITE_ORIGIN}/profile`,
  "email": "mailto:ayahos.dev@gmail.com",
  "image": `${SITE_ORIGIN}/fuaad-professional-portrait.jpg`,
  "description": "Atlanta-area software developer and current undergraduate student at Georgia State University.",
  "knowsAbout": ["software engineering", "web development", "AI tools", "data analysis", "financial software"],
  "jobTitle": "Software Developer",
  "affiliation": {"@type":"Organization","name":"Georgia State University"},
  "sameAs": [
    "https://www.linkedin.com/in/fuaadabdullah",
    "https://github.com/fuaadabdullah"
  ]
};

export const servicesJsonLd = (services: Array<any>) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": services.map((s: any, i: number) => ({
    "@type": "Service",
    "position": i + 1,
    "name": s.title,
    "serviceType": s.slug,
    "provider": {
      "@type": "Person",
      "name": "Fuaad Abdullah"
    }
  }))
});
