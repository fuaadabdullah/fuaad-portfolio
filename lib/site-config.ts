/** Production canonical origin; never infer canonical SEO URLs from request Host headers. */
export const SITE_ORIGIN = "https://fuaadabdullah.vercel.app" as const;

export function canonicalUrl(pathname: `/${string}`): string {
  if (pathname.startsWith("//") || pathname.includes("\\") || pathname.includes("#")) {
    throw new Error("Canonical URLs require a safe absolute path");
  }
  return new URL(pathname, SITE_ORIGIN).toString();
}
