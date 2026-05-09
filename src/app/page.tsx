import Link from "next/link";
import { CarCard } from "@/components/CarCard";
import { getAgencies, getCars } from "@/lib/supabase-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [cars, agencies] = await Promise.all([getCars(), getAgencies()]);

  const featuredCars = cars.slice(0, 3);
  const pickupAreas = ["Oujda Airport", "City Center", "Hay Al Qods"];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-white px-5 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold text-emerald-700">
              Car rental marketplace in Oujda
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Find trusted rental cars in Oujda, fast.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Compare local agencies, check daily prices, and contact the
              agency directly on WhatsApp before you book.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cars"
                className="rounded-md bg-emerald-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Browse cars
              </Link>

              <Link
                href="/agencies"
                className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                View agencies
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-md bg-slate-50 p-4">
                <p className="text-2xl font-bold">{cars.length}</p>
                <p className="mt-1 text-xs text-slate-600">Demo cars</p>
              </div>

              <div className="rounded-md bg-slate-50 p-4">
                <p className="text-2xl font-bold">{agencies.length}</p>
                <p className="mt-1 text-xs text-slate-600">Agencies</p>
              </div>

              <div className="rounded-md bg-slate-50 p-4">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-xs text-slate-600">WhatsApp</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">
              Popular pickup areas
            </p>

            <div className="mt-4 grid gap-3">
              {pickupAreas.map((area) => (
                <Link
                  key={area}
                  href="/cars"
                  className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold transition hover:border-emerald-600"
                >
                  <span>{area}</span>
                  <span className="text-emerald-700">View cars</span>
                </Link>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Built for quick comparison and direct WhatsApp contact with local
              Oujda rental agencies.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Featured cars</h2>
              <p className="mt-2 text-sm text-slate-600">
                A quick preview from local rental agencies.
              </p>
            </div>

            <Link
              href="/cars"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View all cars
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {featuredCars.map((car) => {
              const agency = agencies.find((item) => item.id === car.agencyId);

              if (!agency) {
                return null;
              }

              return <CarCard key={car.id} car={car} agency={agency} />;
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Trusted local agencies</h2>
              <p className="mt-2 text-sm text-slate-600">
                Demo partners with cars ready for WhatsApp leads.
              </p>
            </div>

            <Link
              href="/agencies"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View all agencies
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {agencies.map((agency) => (
              <Link
                key={agency.id}
                href={`/agencies/${agency.slug}`}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-600"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{agency.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {agency.area}, {agency.city}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    {agency.rating}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {agency.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
