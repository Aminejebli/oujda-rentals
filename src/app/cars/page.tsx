import { getAgencies, getCars } from "@/lib/supabase-data";
import dynamic from "next/dynamic";

const CarsFilter = dynamic(() => import("@/components/CarsFilter").then(mod => ({ default: mod.CarsFilter })), {
  loading: () => (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-48 w-full overflow-hidden bg-slate-100">
            <div className="absolute inset-0 animate-pulse bg-slate-200" />
          </div>
          <div className="p-5">
            <div className="mb-3">
              <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="mb-4 h-7 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
});

export default async function CarsPage() {
  const [cars, agencies] = await Promise.all([getCars(), getAgencies()]);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-emerald-700">
          Voitures à Oujda
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Comparez les voitures de location
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Parcourez les voitures des agences locales d'Oujda et contactez-les directement sur WhatsApp.
        </p>

        <CarsFilter cars={cars} agencies={agencies} />
      </div>
    </main>
  );
}
