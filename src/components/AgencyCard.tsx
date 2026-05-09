"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Agency } from "@/data/agencies";
import { defaultLocale, getLocalePath, type Locale } from "@/lib/i18n";

type AgencyCardProps = {
  agency: Agency;
  carsCount: number;
};

export function AgencyCard({ agency, carsCount }: AgencyCardProps) {
  const params = useParams();
  const t = useTranslations();

  const locale = (params?.locale as Locale) ?? defaultLocale;
  const prefix = getLocalePath(`/${locale}`, locale);

  const whatsappMessage = encodeURIComponent(
    `Salam, je veux louer une voiture chez ${agency.name} à Oujda. Pouvez-vous me donner les détails ?`
  );

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200 hover:border-emerald-200 dark:border-slate-700 dark:bg-slate-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100">
            {agency.name}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {agency.area}, {agency.city}
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
          {agency.rating}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {agency.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">
          {carsCount} {t("agencyCard.cars")}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">
          {t("agencyCard.whatsapp")}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href={`${prefix}/agencies/${agency.slug}`}
          className="rounded-md border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          {t("agencyCard.viewAgency")}
        </Link>

        <a
          href={`https://wa.me/${agency.whatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          {t("agencyCard.whatsapp")}
        </a>
      </div>
    </article>
  );
}
