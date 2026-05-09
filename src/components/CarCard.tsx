"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";
import { defaultLocale, getLocalePath, type Locale } from "@/lib/i18n";

type CarCardProps = {
  car: Car;
  agency: Pick<Agency, "name" | "whatsapp" | "rating">;
  priority?: boolean;
};

export function CarCard({ car, agency, priority = false }: CarCardProps) {
  const params = useParams();
  const t = useTranslations();
  const locale = (params?.locale as Locale) ?? defaultLocale;
  const prefix = getLocalePath(`/${locale}`, locale);

  const whatsappMessage = encodeURIComponent(
    `Salam, je veux louer ${car.name} chez ${agency.name} à Oujda. Pouvez-vous m'envoyer les détails ?`,
  );

  const availabilityLabel = car.isPopular
    ? t("carCard.popular")
    : car.isNew
      ? t("carCard.new")
      : t("carCard.available");

  const availabilityColor = car.isPopular
    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200"
    : car.isNew
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200";

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200 dark:border-slate-700 dark:bg-slate-950">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${availabilityColor}`}
          >
            {availabilityLabel}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm dark:bg-slate-900">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              {agency.rating}
            </span>
            <svg
              className="h-3 w-3 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-200">
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            {t("carCard.delivery")}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors dark:text-slate-100 dark:group-hover:text-emerald-300">
            {car.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{agency.name}</p>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-bold text-emerald-700">
            {car.price}{" "}
            <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
              DH/jour
            </span>
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 text-xs">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>{car.transmission}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{car.seats} places</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
              />
            </svg>
            <span>{car.fuel}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span>{car.category}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <svg
              className="h-3 w-3 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {t("carCard.quickReply")}
          </span>

          <span className="flex items-center gap-1">
            <svg
              className="h-3 w-3 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {t("carCard.insuranceIncluded")}
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            href={`${prefix}/cars/${car.slug}`}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-4 sm:py-3 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-950"
          >
            {t("carCard.details")}
          </Link>

          <a
            href={`https://wa.me/${agency.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-green-600 px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:px-4 sm:py-3 flex items-center justify-center gap-1 sm:gap-2 dark:focus:ring-offset-slate-950"
          >
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 12.1c0-4.4-3.6-8-8-8S4 7.7 4 12.1c0 1.5.4 2.9 1.1 4.1L4 20l3.9-1.1c1.2.7 2.6 1.1 4.1 1.1 4.4 0 8-3.6 8-8zM9 9.5c.2-.5.7-.9 1.3-.9h.1c.2 0 .4.1.5.3l.7 1.7c.1.2.1.4 0 .6l-.3.5c.7 1.2 1.6 2.1 2.8 2.8l.5-.3c.2-.1.4-.1.6 0l1.7.7c.2.1.3.3.3.5v.1c0 .6-.4 1.1-.9 1.3-.5.2-1.2.3-2.1-.1-2-.8-3.7-2.5-4.5-4.5-.4-.9-.3-1.6-.1-2.1z" />
            </svg>

            <span className="hidden sm:inline">{t("carCard.whatsapp")}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
