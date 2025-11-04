export default function Footer(){
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-white/60">
        © {new Date().getFullYear()} Fuaad Abdullah. Built with Next.js.
      </div>
    </footer>
  );
}
