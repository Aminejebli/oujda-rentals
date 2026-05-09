import { notFound } from "next/navigation";
import { CarDetailPage } from "@/components/pages/CarDetailPage";
import { getAgencyById, getCarBySlug } from "@/lib/supabase-data";
import { locales } from "@/lib/i18n";

type PageProps = {
  params: { locale: string; slug: string };
};

export const dynamic = "force-dynamic";

export default async function LocalizedCarDetailPage({ params }: PageProps) {
  const locale = params.locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const car = await getCarBySlug(params.slug);
  if (!car) {
    notFound();
  }

  const agency = await getAgencyById(car.agencyId);
  if (!agency) {
    notFound();
  }

  return <CarDetailPage car={car} agency={agency} />;
}
