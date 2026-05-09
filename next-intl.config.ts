import { locales, defaultLocale } from "./src/lib/i18n";

const config = {
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
};

export default config;
