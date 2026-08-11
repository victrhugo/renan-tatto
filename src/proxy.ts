import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /studio routes
  if (pathname.startsWith("/studio")) {
    const authCookie = request.cookies.get("studio_auth");
    const isAdmin = authCookie?.value === "authenticated";

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect authenticated users away from login
  if (pathname === "/login") {
    const authCookie = request.cookies.get("studio_auth");
    if (authCookie?.value === "authenticated") {
      return NextResponse.redirect(new URL("/studio", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*", "/login"],
};
