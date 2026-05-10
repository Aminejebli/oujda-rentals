"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";
import { defaultLocale, getLocalePath, type Locale } from "@/lib/i18n";

type CarDetailPageProps = {
  car: Car;
  agency: Agency;
};

export function CarDetailPage({ car, agency }: CarDetailPageProps) {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? defaultLocale;
  const prefix = getLocalePath(`/${locale}`, locale);
  const whatsappMessage = encodeURIComponent(
    t('detail.whatsappMessage', { car: car.name, agency: agency.name })
  );
  const galleryImages = [car.image, ...(car.gallery ?? [])].slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl">
        <Link href={`${prefix}`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
          {t('detail.backToCars')}
        </Link>

        <section className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
            <div className="grid gap-3 p-4 sm:grid-cols-[1.8fr_1fr]">
              <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-slate-100 sm:h-[28rem] dark:bg-slate-800">
                <Image src={galleryImages[0]} alt={car.name} fill priority className="object-cover" />
              </div>

              <div className="grid gap-3">
                {galleryImages.slice(1).map((src, index) => (
                  <div key={index} className="relative h-32 w-full overflow-hidden rounded-3xl bg-slate-100 sm:h-40 dark:bg-slate-800">
                    <Image src={src} alt={`${car.name} image ${index + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm font-semibold text-emerald-700">{car.category}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{car.name}</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('detail.availableFrom', { agency: agency.name })}</p>
            <p className="mt-5 text-3xl font-bold text-emerald-700">{car.price} DH/day</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">{t('detail.transmission')}</p>
                <p className="mt-1 text-sm font-semibold">{car.transmission}</p>
              </div>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">{t('detail.fuel')}</p>
                <p className="mt-1 text-sm font-semibold">{car.fuel}</p>
              </div>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">{t('detail.seats')}</p>
                <p className="mt-1 text-sm font-semibold">{car.seats}</p>
              </div>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">{t('detail.agencyArea')}</p>
                <p className="mt-1 text-sm font-semibold">{agency.area}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href={`${prefix}/agencies/${agency.slug}`} className="rounded-md border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
                {t('detail.viewAgency')}
              </Link>
              <a
                href={`https://wa.me/${agency.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                {t('detail.contactWhatsApp')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
