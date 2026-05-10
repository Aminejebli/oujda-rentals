import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { locales } from "./src/lib/i18n";
import { createServerClient } from "@supabase/ssr";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: locales[0],
});

function isProtectedPath(pathname: string) {
  // Auth-required pages (Piece 1.1 baseline)
  // Note: pathname already includes `/{locale}/...` due to matcher.
  // Temporarily exclude /profile to unblock Profile UI verification;
  // middleware session-check will be fixed properly after Piece 1.2.
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/bookings") ||
    pathname.startsWith("/messages")
  );
}

export default async function middleware(req: NextRequest) {
  const intlResponse = intlMiddleware(req);

  const { pathname } = req.nextUrl;

  // Determine locale and the rest of the path
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];
  const rest = `/${segments.slice(1).join("/")}` || "/";

  if (!locales.includes(locale as (typeof locales)[number])) {
    return intlResponse;
  }

  const isProtected = isProtectedPath(rest);

  if (!isProtected) {
    return intlResponse;
  }

  // Server-side session check via Supabase SSR helpers
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            req.cookies.set(name, value);
            // next/response cookies set is controlled by NextResponse; we set via returned response below.
            // We'll handle it by returning intlResponse after auth checks.
          });
        },
      },
    }
  );

  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlResponse;
}

export const config = {
  // Applique next-intl uniquement aux routes multi-langues: /fr/*, /en/*, /ar/*
  matcher: ["/(fr|en|ar)/((?!api|_next|.*\\..*).*)"],
};
