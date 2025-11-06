import SocialIcon from "./SocialIcon";

export default function Footer(){
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Fuaad Abdullah.
            <span className="block text-xs text-white/40 mt-1">Lighthouse 95+ / WCAG AA accessibility — built for speed & standards.</span>
          </p>
          <div className="flex gap-6">
            <SocialIcon type="linkedin" href="https://www.linkedin.com/in/fuaadabdullah" label="LinkedIn" />
            <SocialIcon type="instagram" href="https://instagram.com/fuaadabdullah" label="Instagram" />
            <SocialIcon type="github" href="https://github.com/fuaadabdullah" label="GitHub" />
          </div>
        </div>
      </div>
    </footer>
  );
}

