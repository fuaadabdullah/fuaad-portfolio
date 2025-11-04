import ServiceCard from "@/components/ServiceCard";
import { servicesJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Services — Fuaad Abdullah",
  description: "Lightweight consulting and build packages."
};

const services = [
  { slug: "ux-polish", title: "UX/UI Polish Sprint", price: "$300", description: "Design pass, spacing, color, and accessibility tweaks. Before/after diff + checklist." },
  { slug: "rizzk-setup", title: "Risk-Calculator Setup", price: "$500", description: "Deploy a white-labeled RIZZK instance on Azure with your logo and colors." },
  { slug: "mvp-bootstrap", title: "MVP Bootstrap (Next.js + FastAPI)", price: "$1,500", description: "Auth, CRUD, basic charts, and CI in two weeks. Includes docs and a handover call." }
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <JsonLd data={servicesJsonLd(services)} />
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Services</h1>
      <p className="text-white/80 mt-3">Focused, student-friendly packages. Clear deliverables.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {services.map(s => <ServiceCard key={s.slug} service={s} />)}
      </div>
    </section>
  );
}
