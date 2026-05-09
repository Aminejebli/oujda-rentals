import { CarsPage } from "@/components/pages/CarsPage";
import { getAgencies, getCars } from "@/lib/supabase-data";
import { locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

type PageProps = {
  params: { locale: string };
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedCarsPage({ params }: PageProps) {
  const locale = params.locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const [cars, agencies] = await Promise.all([getCars(), getAgencies()]);

  return <CarsPage cars={cars} agencies={agencies} />;
}
