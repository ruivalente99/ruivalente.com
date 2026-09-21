import { NextRequest, NextResponse } from "next/server";

/**
 * Serve the terminal view at terminal.ruivalente.com.
 * (Requires the subdomain to be added to the deployment — see DOMAIN_SETUP.md.)
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("terminal.")) {
    const url = req.nextUrl.clone();
    if (!url.pathname.startsWith("/terminal")) {
      url.pathname = "/terminal";
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  // skip static assets and api routes
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
