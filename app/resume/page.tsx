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
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Download PDF Section */}
          <div className="flex flex-col gap-4">
            <a 
              href="/Fuaad_Abdullah_Resume.pdf" 
              className="rounded-2xl bg-[#16a34a] px-6 py-4 text-black font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#15803d] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download PDF
            </a>
            <p className="text-sm text-white/60">One-page resume with numbers-first highlights</p>
          </div>
          
          {/* LinkedIn Badge Section */}
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
