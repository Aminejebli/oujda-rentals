import { notFound } from "next/navigation";
import { CarDetailPage } from "@/components/pages/CarDetailPage";
import { getAgencyById, getCarBySlug } from "@/lib/supabase-data";
import { locales, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function LocalizedCarDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const car = await getCarBySlug(slug);
  if (!car) {
    notFound();
  }

  const agency = await getAgencyById(car.agencyId);
  if (!agency) {
    notFound();
  }

  return <CarDetailPage car={car} agency={agency} />;
}
