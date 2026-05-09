import { AgencyCard } from "@/components/AgencyCard";
import { getAgencies, getCars } from "@/lib/supabase-data";

export const dynamic = "force-dynamic";

export default async function AgenciesPage() {
  const [agencies, cars] = await Promise.all([getAgencies(), getCars()]);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-emerald-700">
          Rental agencies
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Trusted car rental agencies in Oujda
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Compare local agencies, check their available cars, and contact them
          directly through WhatsApp.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {agencies.map((agency) => {
            const carsCount = cars.filter(
              (car) => car.agencyId === agency.id
            ).length;

            return (
              <AgencyCard
                key={agency.id}
                agency={agency}
                carsCount={carsCount}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
