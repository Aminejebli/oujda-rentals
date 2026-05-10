"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AgencyCard } from "@/components/AgencyCard";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";
import { defaultLocale, type Locale } from "@/lib/i18n";
import Link from "next/link";

type AgenciesPageProps = {
  agencies: Agency[];
  cars: Car[];
};

export function AgenciesPage({ agencies, cars }: AgenciesPageProps) {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? defaultLocale;

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">{t("agencies.title")}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{t("agencies.headline")}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("agencies.subtitle")}
            </p>
          </div>

          <div>
            <Link
              href={`/${locale}/apply-agency`}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Become an Agency
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {agencies.map((agency) => {
            const carsCount = cars.filter((car) => car.agencyId === agency.id).length;
            return <AgencyCard key={agency.id} agency={agency} carsCount={carsCount} />;
          })}
        </div>
      </div>
    </main>
  );
}
