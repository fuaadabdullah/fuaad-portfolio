import Link from "next/link";

export function ProjectFooterNav() {
  return (
    <footer className="mt-16 pt-8 border-t border-white/10">
      <Link
        href="/portfolio"
        className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Portfolio
      </Link>
    </footer>
  );
}

