export const locales = ['fr', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
};

export const rtlLocales: Locale[] = ['ar'];

export function getLocalePath(pathname: string, locale: Locale) {
  if (!pathname) {
    return `/${locale}`;
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return `/${locale}`;
  }

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join('/')}`;
}
