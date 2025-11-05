import Script from "next/script";
import LinkedInBadge from "@/components/LinkedInBadge";

export const metadata = {
  title: "Resume — Fuaad Abdullah",
  description: "Finance student at Georgia State University. Built RIZZK Calculator with 500+ users. Experience with Next.js, FastAPI, Azure, and production DevOps. Download my resume PDF.",
  openGraph: {
    title: "Resume — Fuaad Abdullah",
    description: "Finance student at GSU with hands-on experience building production web apps. Download my one-page resume with numbers-first highlights.",
    images: ["/og-default.png"]
  }
};

export default function ResumePage() {
  return (
    <>
      {/* LinkedIn badge script - loaded only on this page per Next.js best practices */}
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
        async
        defer
      />
      
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Resume</h1>
        <p className="text-white/80 mt-3">
          One page. Clean. Numbers-first. You can download a PDF or read the highlights below.
        </p>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start">
          <a href="/Fuaad_Abdullah_Resume.pdf" className="rounded-2xl bg-[#16a34a] px-5 py-3 text-black inline-block">Download PDF</a>
        </div>
        
        {/* LinkedIn Badge - isolated to prevent style conflicts */}
        <div className="mt-8">
          <LinkedInBadge />
        </div>
        
        <div className="mt-10 space-y-4 text-white/90">
          <h2 className="text-xl font-semibold">Focus</h2>
          <ul className="list-disc pl-6">
            <li>Finance major (GSU) with an obsession for trading discipline and automation</li>
            <li>Building RIZZK: a risk management app for day traders</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">Skills</h2>
          <ul className="list-disc pl-6">
            <li>Frontend: React/Next.js, Tailwind</li>
            <li>Backend: FastAPI, Python</li>
            <li>Data/Visualization: Pandas, Plotly</li>
            <li>Dev: Docker, GitHub Actions, Azure App Service</li>
          </ul>
        </div>
      </section>
    </>
  );
}
