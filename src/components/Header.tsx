"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { defaultLocale, getLocalePath, localeNames, locales, type Locale } from "@/lib/i18n";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const params = useParams();
  const pathname = usePathname() ?? `/${defaultLocale}`;
  const locale = (params?.locale as Locale) ?? defaultLocale;

  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-soft dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href={`/${locale}`} className="focus-ring rounded-lg">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href={`/${locale}/cars`}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-200"
            >
              {t("header.cars")}
            </Link>
            <Link
              href={`/${locale}/agencies`}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-200"
            >
              {t("header.agencies")}
            </Link>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />

            <a
              href="https://wa.me/212705559917?text=Salam, je veux louer une voiture à Oujda"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              {t("header.whatsapp")}
            </a>
          </nav>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <span>{t("header.language")}:</span>
              {locales.map((item) => (
                <Link
                  key={item}
                  href={getLocalePath(pathname, item)}
                  className={`rounded-full px-2 py-1 text-[10px] md:text-sm transition ${
                    item === locale
                      ? "bg-emerald-600 text-white"
                      : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {localeNames[item]}
                </Link>
              ))}
            </div>

            <ThemeToggle showLabel />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            aria-label="Mobile menu"
            aria-expanded={menuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:hidden dark:border-slate-700 dark:bg-slate-950">
            <div className="flex flex-col gap-3">
              <Link
                href={`/${locale}/cars`}
                className="text-sm font-medium text-slate-700 hover:text-emerald-700 dark:text-slate-200"
                onClick={() => setMenuOpen(false)}
              >
                {t("header.cars")}
              </Link>
              <Link
                href={`/${locale}/agencies`}
                className="text-sm font-medium text-slate-700 hover:text-emerald-700 dark:text-slate-200"
                onClick={() => setMenuOpen(false)}
              >
                {t("header.agencies")}
              </Link>

              <div className="flex flex-wrap gap-2 pt-2">
                {locales.map((item) => (
                  <Link
                    key={item}
                    href={getLocalePath(pathname, item)}
                    className={`rounded-full px-3 py-2 text-sm transition ${
                      item === locale
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {localeNames[item]}
                  </Link>
                ))}
              </div>

              <ThemeToggle showLabel fullWidth className="mt-3" onToggle={() => setMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
