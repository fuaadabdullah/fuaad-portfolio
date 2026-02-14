export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Fuaad Abdullah",
  "url": "https://heyimfuaad.me",
  "email": "mailto:fuaadabdullah@gmail.com",
  "jobTitle": "Finance Student • Builder",
  "affiliation": {"@type":"Organization","name":"Georgia State University"},
  "sameAs": [
    "https://www.linkedin.com/in/fuaadabdullah",
    "https://instagram.com/fuaadabdullah",
    "https://github.com/fuaadabdullah"
  ]
};

type ServiceLike = { title: string; slug: string };

export const servicesJsonLd = (services: ServiceLike[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": services.map((s, i) => ({
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
