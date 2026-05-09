"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { agencies as initialAgencies, cars as initialCars } from "@/data";
import type { Car, Agency } from "@/types/domain";

const buildSummary = (cars: Car[], agencies: Agency[]) => ({
  totalCars: cars.length,
  available: cars.filter((car) => car.available ?? true).length,
  featured: cars.filter((car) => car.isPopular).length,
  agencies: agencies.length,
});

export function AdminDashboard() {
  const [cars, setCars] = useState(initialCars);
  const [agencies] = useState(initialAgencies);
  const summary = useMemo(() => buildSummary(cars, agencies), [cars, agencies]);

  const toggleAvailability = (id: number) => {
    setCars((current) =>
      current.map((car) =>
        car.id === id ? { ...car, available: !(car.available ?? true) } : car
      )
    );
  };

  const toggleFeatured = (id: number) => {
    setCars((current) =>
      current.map((car) =>
        car.id === id ? { ...car, isPopular: !car.isPopular } : car
      )
    );
  };

  const t = useTranslations();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
          {t("admin.title")}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
          {t("admin.dashboardTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          {t("admin.dashboardSubtitle")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {t("admin.statsTotalCars")}
          </p>
          <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-slate-100">{summary.totalCars}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {t("admin.statsAvailable")}
          </p>
          <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-slate-100">{summary.available}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {t("admin.statsFeatured")}
          </p>
          <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-slate-100">{summary.featured}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {t("admin.statsAgencies")}
          </p>
          <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-slate-100">{summary.agencies}</p>
        </div>
      </div>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">
              {t("admin.carsSectionTitle")}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {t("admin.carsSectionSubtitle")}
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-600 sm:grid-cols-[3fr_2fr_1fr_1fr_1fr] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <span className="col-span-3">{t("admin.tableVehicle")}</span>
            <span className="hidden sm:block">{t("admin.tableAgency")}</span>
            <span>{t("admin.tablePrice")}</span>
            <span>{t("admin.tableStatus")}</span>
            <span>{t("admin.tableActions")}</span>
          </div>
          {cars.map((car) => {
            const agency = agencies.find((item) => item.id === car.agencyId);
            return (
              <div key={car.id} className="grid grid-cols-12 gap-4 border-b border-slate-200 px-4 py-4 text-sm text-slate-700 sm:grid-cols-[3fr_2fr_1fr_1fr_1fr] dark:border-slate-800 dark:text-slate-300">
                <div className="col-span-3">
                  <p className="font-semibold text-slate-950 dark:text-slate-100">{car.name}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{car.category}</p>
                </div>
                <div className="hidden sm:block">
                  <p>{agency?.name ?? "-"}</p>
                </div>
                <div>{car.price} DH</div>
                <div>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${car.available ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>
                    {car.available ? t("admin.statusAvailable") : t("admin.statusUnavailable")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => toggleAvailability(car.id)}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {car.available ? t("admin.buttonHide") : t("admin.buttonPublish")}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFeatured(car.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${car.isPopular ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"}`}
                  >
                    {car.isPopular ? t("admin.buttonFeatured") : t("admin.buttonUnfeatured")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">
          {t("admin.sectionAgenciesTitle")}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {t("admin.sectionAgenciesSubtitle")}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agencies.map((agency) => (
            <div key={agency.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">{agency.name}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{agency.area}, {agency.city}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">{agency.rating}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{agency.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="rounded-full bg-white px-3 py-1 border border-slate-200 dark:border-slate-700 dark:bg-slate-950">{agency.responseTime}</span>
                <span className="rounded-full bg-white px-3 py-1 border border-slate-200 dark:border-slate-700 dark:bg-slate-950">
                  {agency.totalClients ?? 0}+ {t("admin.clients")}
                </span>
              </div>
              <a
                href={`https://wa.me/${agency.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                {t("admin.whatsapp")}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
