import { AgenciesPage } from "@/components/pages/AgenciesPage";
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

export default async function LocalizedAgenciesPage({ params }: PageProps) {
  const locale = params.locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const [agencies, cars] = await Promise.all([getAgencies(), getCars()]);

  return <AgenciesPage agencies={agencies} cars={cars} />;
}
