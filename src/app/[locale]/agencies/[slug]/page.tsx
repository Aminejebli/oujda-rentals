import { notFound } from "next/navigation";
import { AgencyProfilePage } from "@/components/pages/AgencyProfilePage";
import { getAgencyBySlug, getCarsByAgencyId } from "@/lib/supabase-data";
import { locales } from "@/lib/i18n";

type PageProps = {
  params: { locale: string; slug: string };
};

export const dynamic = "force-dynamic";

export default async function LocalizedAgencyProfilePage({ params }: PageProps) {
  const locale = params.locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const agency = await getAgencyBySlug(params.slug);
  if (!agency) {
    notFound();
  }

  const cars = await getCarsByAgencyId(agency.id);

  return <AgencyProfilePage agency={agency} cars={cars} />;
}
