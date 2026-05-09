"use client";

import { useTranslations } from "next-intl";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";
import dynamic from "next/dynamic";

const CarsFilter = dynamic(() => import("@/components/CarsFilter").then((mod) => ({ default: mod.CarsFilter })), {
  loading: () => (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
            <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="p-5">
            <div className="mb-3">
              <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="mb-4 h-7 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
});

type CarsPageProps = {
  cars: Car[];
  agencies: Agency[];
};

export function CarsPage({ cars, agencies }: CarsPageProps) {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-emerald-700">{t('cars.title')}</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">{t('cars.headline')}</h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{t('cars.subtitle')}</p>

        <CarsFilter cars={cars} agencies={agencies} />
      </div>
    </main>
  );
}
