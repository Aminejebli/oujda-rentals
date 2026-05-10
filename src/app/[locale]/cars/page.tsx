import { CarsPage } from "@/components/pages/CarsPage";
import { getAgencies, getCars } from "@/lib/supabase-data";
import { locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  const titles = {
    fr: "Voitures à louer à Oujda | Comparez les prix | Oujda Rentals",
    en: "Cars for rent in Oujda | Compare prices | Oujda Rentals",
    ar: "سيارات للإيجار في وجدة | قارن الأسعار | وجدة رنتالز"
  };

  const descriptions = {
    fr: "Découvrez toutes les voitures disponibles à la location à Oujda. Comparez les prix, filtrez par catégorie et contactez les agences directement sur WhatsApp.",
    en: "Discover all cars available for rent in Oujda. Compare prices, filter by category and contact agencies directly on WhatsApp.",
    ar: "اكتشف جميع السيارات المتاحة للإيجار في وجدة. قارن الأسعار، فلتر حسب الفئة وتواصل مع الوكالات مباشرة عبر واتساب."
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: ["voitures Oujda", "location voiture Maroc", "prix location", "agences Oujda", "سيارات وجدة", "تأجير سيارات المغرب"],
  };
}

export default async function LocalizedCarsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const [cars, agencies] = await Promise.all([getCars(), getAgencies()]);

  return <CarsPage cars={cars} agencies={agencies} />;
}
