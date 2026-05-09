"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/types/domain";
import { CarCard } from "@/components/CarCard";
import { defaultLocale, getLocalePath, type Locale } from "@/lib/i18n";

type AgencyProfilePageProps = {
  agency: Agency;
  cars: Car[];
};

export function AgencyProfilePage({ agency, cars }: AgencyProfilePageProps) {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? defaultLocale;

  const prefix = getLocalePath(`/${locale}/agencies`, locale);
  const whatsappMessage = encodeURIComponent(
    `Salam, je veux des informations sur les locations de ${agency.name} à Oujda.`
  );

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`${prefix}`}
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          {t("agency.backToAgencies")}
        </Link>

        <section className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                {t("agency.profileLabel")}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{agency.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                {agency.description}
              </p>
            </div>

            <a
              href={`https://wa.me/${agency.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-emerald-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              {t("agency.contactWhatsApp")}
            </a>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t("agency.location")}
              </p>
              <p className="mt-1 text-sm font-semibold">
                {agency.area}, {agency.city}
              </p>
            </div>

            <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t("agency.rating")}
              </p>
              <p className="mt-1 text-sm font-semibold">{agency.rating}</p>
            </div>

            <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t("agency.phone")}
              </p>
              <p className="mt-1 text-sm font-semibold">{agency.phone}</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">{t("agency.carsHeading", { name: agency.name })}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {t("agency.carsAvailable", { count: cars.length })}
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} agency={agency} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
