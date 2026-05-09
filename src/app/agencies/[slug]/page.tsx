import Link from "next/link";
import { notFound } from "next/navigation";
import { CarCard } from "@/components/CarCard";
import { getAgencyBySlug, getCarsByAgencyId } from "@/lib/supabase-data";

type AgencyProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function AgencyProfilePage({
  params,
}: AgencyProfilePageProps) {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);

  if (!agency) {
    notFound();
  }

  const agencyCars = await getCarsByAgencyId(agency.id);
  const whatsappMessage = encodeURIComponent(
    `Salam, I want to ask about car rentals from ${agency.name} in Oujda.`
  );

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/agencies"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Back to agencies
        </Link>

        <section className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Agency profile
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                {agency.name}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                {agency.description}
              </p>
            </div>

            <a
              href={`https://wa.me/${agency.whatsapp}?text=${whatsappMessage}`}
              className="rounded-md bg-emerald-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Contact on WhatsApp
            </a>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Location
              </p>
              <p className="mt-1 text-sm font-semibold">
                {agency.area}, {agency.city}
              </p>
            </div>

            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Rating
              </p>
              <p className="mt-1 text-sm font-semibold">{agency.rating}</p>
            </div>

            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Phone
              </p>
              <p className="mt-1 text-sm font-semibold">{agency.phone}</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Cars from {agency.name}</h2>
          <p className="mt-2 text-sm text-slate-600">
            {agencyCars.length} cars available from this agency.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {agencyCars.map((car) => (
              <CarCard key={car.id} car={car} agency={agency} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
