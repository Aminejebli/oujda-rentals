import { HomePage } from "@/components/pages/HomePage";
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
    fr: "Location Voiture Oujda | Louez une voiture rapidement | Oujda Rentals",
    en: "Car Rental Oujda | Rent a car quickly | Oujda Rentals",
    ar: "تأجير سيارات وجدة | استأجر سيارة بسرعة | وجدة رنتالز"
  };

  const descriptions = {
    fr: "Louez une voiture à Oujda en quelques minutes. Comparez les agences locales, contactez-les sur WhatsApp et récupérez votre véhicule rapidement avec un service fiable.",
    en: "Rent a car in Oujda in minutes. Compare local agencies, contact them on WhatsApp and pick up your vehicle quickly with reliable service.",
    ar: "استأجر سيارة في وجدة خلال دقائق. قارن الوكالات المحلية، تواصل معهم عبر واتساب واحصل على سيارتك بسرعة مع خدمة موثوقة."
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: ["location voiture", "Oujda", "Maroc", "taxi", "transport", "car rental", "وحدة", "سيارة", "تأجير"],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
      locale: locale,
    },
  };
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const [cars, agencies] = await Promise.all([getCars(), getAgencies()]);

  return <HomePage cars={cars} agencies={agencies} />;
}
