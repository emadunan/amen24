import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./config/next-i18n-router.config";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("access_token");
  const { pathname } = request.nextUrl;

  // Redirect root ("/" or "/en") to "/bible"
  const locales = i18nConfig.locales;
  const localePrefix = locales.find((loc) => pathname === `/${loc}`);
  const isRoot = pathname === "/" || !!localePrefix;

  if (isRoot) {
    const locale = localePrefix || i18nConfig.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/bible`, request.url));
  }

  // Block logged-in users from accessing auth pages
  if (
    isLoggedIn &&
    (pathname.includes("/login") ||
      pathname.includes("/signup") ||
      pathname.includes("password-request") ||
      pathname.includes("/password-restore"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isLoggedIn && pathname.includes("/password-reset")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return i18nRouter(request, i18nConfig);
}

// Only apply to app routes (excluding static, API, and public files)
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
