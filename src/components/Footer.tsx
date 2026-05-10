"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { defaultLocale, type Locale } from "@/lib/i18n";

export function Footer() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? defaultLocale;

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Oujda Rentals
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              {t('footer.quickLinks')}
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`/${locale}/cars`}
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {t('header.cars')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/agencies`}
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {t('header.agencies')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              {t('footer.legal')}
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            © 2024 Oujda Rentals. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}