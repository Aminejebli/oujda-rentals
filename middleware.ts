import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  // Applique next-intl uniquement aux routes multi-langues: /fr/*, /en/*, /ar/*
  matcher: ["/(fr|en|ar)/((?!api|_next|.*\\..*).*)"],
};
