import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./config/next-i18n-router.config";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("access_token"); // Check for access_token presence
  const { pathname } = request.nextUrl;

  // Redirect logged-in users away from any "/login" or "/signup" page
  if (
    isLoggedIn &&
    (pathname.includes("/login") ||
      pathname.includes("/signup") ||
      pathname.includes("password-request") ||
      pathname.includes("/password-restore"))
  ) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page
  }

  if (!isLoggedIn && pathname.includes("/password-reset")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
