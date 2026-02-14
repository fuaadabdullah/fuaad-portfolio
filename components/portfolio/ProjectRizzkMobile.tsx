import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectRizzkMobile({ project }: { project: Project }) {
  if (project.slug !== "rizzk-calculator") return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-green-500">
        Mobile Responsive
      </h2>
      <p className="text-white/80 mb-6">
        Fully optimized for mobile trading. Make position sizing decisions on
        the go with the same powerful calculations.
      </p>
      <div className="flex justify-center">
        <div className="max-w-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="/rizzk-mobile-screenshot.png"
            alt="RIZZK Calculator mobile interface"
            width={375}
            height={812}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

