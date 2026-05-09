import { notFound } from "next/navigation";
import { AgencyProfilePage } from "@/components/pages/AgencyProfilePage";
import { getAgencyBySlug, getCarsByAgencyId } from "@/lib/supabase-data";
import { locales, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function LocalizedAgencyProfilePage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const agency = await getAgencyBySlug(slug);
  if (!agency) {
    notFound();
  }

  const cars = await getCarsByAgencyId(agency.id);

  return <AgencyProfilePage agency={agency} cars={cars} />;
}
