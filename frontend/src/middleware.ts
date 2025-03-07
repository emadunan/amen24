import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./config/next-i18n-router.config";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("access_token"); // Check for access_token presence

  // Redirect logged-in users away from the login page
  if (isLoggedIn && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page
  }

  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
