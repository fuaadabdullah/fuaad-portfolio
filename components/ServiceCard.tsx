import Card from "./Card";

type Service = { slug: string; title: string; price: string; description: string };
export default function ServiceCard({ service }: { service: Service }){
  return (
    <Card>
      <h2 className="text-lg font-semibold">{service.title}</h2>
      <p className="text-white/80 mt-2">{service.description}</p>
      <div className="mt-4 text-[#16a34a] font-semibold" aria-label={`Price: ${service.price}`}>
        {service.price}
      </div>
    </Card>
  );
}
