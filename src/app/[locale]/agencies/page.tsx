import { AgenciesPage } from "@/components/pages/AgenciesPage";
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
    fr: "Agences de location Oujda | Trouvez votre agence | Oujda Rentals",
    en: "Car rental agencies Oujda | Find your agency | Oujda Rentals",
    ar: "وكالات تأجير وجدة | ابحث عن وكالتك | وجدة رنتالز"
  };

  const descriptions = {
    fr: "Découvrez toutes les agences de location de voitures à Oujda. Comparez les services, consultez leurs flottes et contactez-les directement sur WhatsApp.",
    en: "Discover all car rental agencies in Oujda. Compare services, check their fleets and contact them directly on WhatsApp.",
    ar: "اكتشف جميع وكالات تأجير السيارات في وجدة. قارن الخدمات، تحقق من أساطيلهم وتواصل معهم مباشرة عبر واتساب."
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: ["agences Oujda", "location voiture Maroc", "services location", "وكالات وجدة", "خدمات التأجير"],
  };
}

export default async function LocalizedAgenciesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const [agencies, cars] = await Promise.all([getAgencies(), getCars()]);

  return <AgenciesPage agencies={agencies} cars={cars} />;
}
