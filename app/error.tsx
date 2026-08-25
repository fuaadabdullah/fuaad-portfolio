"use client";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section
      role="alert"
      className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-16"
    >
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-red-300">
        Something broke
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        This page failed to load.
      </h1>
      <p className="mt-4 max-w-xl text-white/70">
        The site is still online, but this view hit an unexpected error. Try again, or use the navigation to keep browsing.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 w-fit rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white/90"
      >
        Try again
      </button>
    </section>
  );
}
