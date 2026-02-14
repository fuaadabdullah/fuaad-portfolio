type IconSpec = {
  colorClass: string;
  pathD: string;
};

function BulletIcon({ spec }: { spec: IconSpec }) {
  return (
    <svg
      className={`w-6 h-6 ${spec.colorClass} flex-shrink-0 mt-0.5`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={spec.pathD} />
    </svg>
  );
}

export function ProjectBulletSection(input: {
  title: string;
  items?: string[];
  icon: IconSpec;
}) {
  const items = input.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-green-500">
        {input.title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <BulletIcon spec={input.icon} />
            <span className="text-white/80">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

