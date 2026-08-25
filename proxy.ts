import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  // If requesting any PDF with RSC query param, strip it so static file serves correctly.
  if (url.pathname.endsWith(".pdf") && url.searchParams.has("_rsc")) {
    url.search = "";
    return NextResponse.rewrite(url);
  }

  return undefined;
}

export const config = {
  matcher: "/:path*",
};
