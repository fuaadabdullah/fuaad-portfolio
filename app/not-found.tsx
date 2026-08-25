import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        Page not found.
      </h1>
      <p className="mt-4 max-w-xl text-white/70">
        That route is not part of the current portfolio. Start from the project index or resume instead.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/portfolio"
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white/90"
        >
          View portfolio
        </Link>
        <Link
          href="/resume"
          className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
        >
          View resume
        </Link>
      </div>
    </section>
  );
}
