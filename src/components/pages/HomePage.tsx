"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";
import { defaultLocale, getLocalePath, type Locale } from "@/lib/i18n";

type HomePageProps = {
  cars: Car[];
  agencies: Agency[];
};

export function HomePage({ cars, agencies }: HomePageProps) {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? defaultLocale;
  const prefix = getLocalePath(`/${locale}`, locale);
  const featuredCars = cars.slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230f766e%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        <div className="relative px-5 py-16 md:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t('hero.pill')}
                </div>

                <h1 className="text-4xl font-bold leading-tight text-slate-900 lg:text-5xl xl:text-6xl dark:text-slate-100">
                  {t('hero.title')}
                </h1>

                <p className="text-lg text-slate-600 max-w-xl dark:text-slate-300">
                  {t('hero.description')}
                </p>
              </div>

              <div className="max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={t('hero.searchPlaceholder')}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm text-slate-950 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <Link
                    href={`${prefix}/cars`}
                    className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform hover:-translate-y-0.5 whitespace-nowrap sm:px-8"
                  >
                    {t('hero.searchButton')}
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="font-medium">{t('hero.trustVerified')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="font-medium">{t('hero.trustFastReply')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="font-medium">{t('hero.trustAirport')}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white flex items-center justify-center text-xs font-semibold text-white">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">500+</span> {t('hero.socialProof')}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row pt-4">
                <Link
                  href={`${prefix}/cars`}
                  className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-center sm:text-left"
                >
                  {t('hero.ctaCars')}
                </Link>
                <a
                  href="https://wa.me/212600000000?text=Salam, je veux louer une voiture à Oujda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2 sm:justify-start"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  {t('hero.ctaWhatsApp')}
                </a>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt={t('hero.imageAlt')}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-white/20 dark:bg-slate-900/95 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">Dacia Logan 2024</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{t('hero.priceStarting')}</p>
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                        {t('hero.available')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 rounded-xl bg-white p-4 shadow-lg border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center dark:bg-emerald-900/40">
                      <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{cars.length}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t('hero.featureCars')}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 rounded-xl bg-white p-4 shadow-lg border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center dark:bg-amber-900/40">
                      <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{agencies.length}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t('hero.featureAgencies')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 dark:bg-slate-950 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('hero.featuredTitle')}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{t('hero.featuredDescription')}</p>
            <div className="mt-8 grid gap-4">
              {featuredCars.map((car) => (
                <div key={car.id} className="rounded-3xl bg-slate-50 p-4 text-slate-950 shadow-sm dark:bg-slate-900 dark:text-slate-100">
                  <p className="text-sm font-semibold text-emerald-700">{car.category}</p>
                  <p className="mt-2 text-xl font-bold">{car.name}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t('hero.fromPrice', { price: car.price })}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-100 p-8 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('hero.quickStartTitle')}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{t('hero.quickStartDescription')}</p>
            <div className="mt-8 grid gap-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950">
                <p className="font-semibold">{t('hero.stepOneTitle')}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t('hero.stepOneDescription')}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950">
                <p className="font-semibold">{t('hero.stepTwoTitle')}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t('hero.stepTwoDescription')}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950">
                <p className="font-semibold">{t('hero.stepThreeTitle')}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t('hero.stepThreeDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
