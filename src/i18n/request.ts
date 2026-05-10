import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

const messagesByLocale: Record<Locale, typeof fr> = {
  fr,
  en: en as typeof fr,
  ar: ar as typeof fr,
};


export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = (locale as Locale) ?? defaultLocale;

  if (!locales.includes(resolvedLocale)) {
    return {
      locale: defaultLocale,
      messages: messagesByLocale[defaultLocale],
    };
  }

  return {
    locale: resolvedLocale,
    messages: messagesByLocale[resolvedLocale],
  };
});
