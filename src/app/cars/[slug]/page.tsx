import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgencyById, getCarBySlug } from "@/lib/supabase-data";

type CarDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const agency = await getAgencyById(car.agencyId);

  if (!agency) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Salam, I am interested in renting the ${car.name} from ${agency.name} in Oujda.`
  );

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/cars"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Back to cars
        </Link>

        <section className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="relative h-72 w-full sm:h-96">
              <Image
                src={car.image}
                alt={car.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">
              {car.category}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              {car.name}
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Available from {agency.name}
            </p>

            <p className="mt-5 text-3xl font-bold text-emerald-700">
              {car.price} DH/day
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Transmission
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {car.transmission}
                </p>
              </div>

              <div className="rounded-md bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Fuel
                </p>
                <p className="mt-1 text-sm font-semibold">{car.fuel}</p>
              </div>

              <div className="rounded-md bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Seats
                </p>
                <p className="mt-1 text-sm font-semibold">{car.seats}</p>
              </div>

              <div className="rounded-md bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Agency area
                </p>
                <p className="mt-1 text-sm font-semibold">{agency.area}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/agencies/${agency.slug}`}
                className="rounded-md border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                View agency
              </Link>

              <a
                href={`https://wa.me/${agency.whatsapp}?text=${whatsappMessage}`}
                className="rounded-md bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
