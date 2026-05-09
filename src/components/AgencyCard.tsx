import Link from "next/link";
import type { Agency } from "@/data/agencies";

type AgencyCardProps = {
  agency: Agency;
  carsCount: number;
};

export function AgencyCard({ agency, carsCount }: AgencyCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Salam, I want to ask about car rentals from ${agency.name} in Oujda.`
  );

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">{agency.name}</h2>
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

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1">
          {carsCount} cars
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1">
          WhatsApp ready
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href={`/agencies/${agency.slug}`}
          className="rounded-md border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          View profile
        </Link>

        <a
          href={`https://wa.me/${agency.whatsapp}?text=${whatsappMessage}`}
          className="rounded-md bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          WhatsApp
        </a>
      </div>
    </article>
  );
}
