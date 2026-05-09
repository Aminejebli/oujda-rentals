import { CarsFilter } from "@/components/CarsFilter";
import { getAgencies, getCars } from "@/lib/supabase-data";

export const dynamic = "force-dynamic";

export default async function CarsPage() {
  const [cars, agencies] = await Promise.all([getCars(), getAgencies()]);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-emerald-700">
          Cars in Oujda
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Compare rental cars
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Browse demo cars from local Oujda rental agencies and contact them
          directly on WhatsApp.
        </p>

        <CarsFilter cars={cars} agencies={agencies} />
      </div>
    </main>
  );
}
