export default function Loading() {
  return (
    <section
      aria-label="Loading page"
      className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-6 py-16"
    >
      <div className="max-w-2xl space-y-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
          Loading
        </p>
        <div className="h-10 w-3/4 animate-pulse rounded-lg bg-white/10" />
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-white/10" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    </section>
  );
}
