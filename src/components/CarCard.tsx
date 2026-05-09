import Image from "next/image";
import Link from "next/link";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";

type CarCardProps = {
  car: Car;
  agency: Pick<Agency, "name" | "whatsapp">;
};

export function CarCard({ car, agency }: CarCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Salam, I am interested in renting the ${car.name} from ${agency.name} in Oujda.`
  );

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative h-48 w-full">
        <Image src={car.image} alt={car.name} fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold">{car.name}</h3>
            <p className="text-sm text-slate-600">{agency.name}</p>
          </div>

          <p className="whitespace-nowrap font-bold text-emerald-700">
            {car.price} DH/day
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            {car.transmission}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            {car.category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            {car.seats} seats
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            {car.fuel}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/cars/${car.slug}`}
            className="rounded-md border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            View details
          </Link>

          <a
            href={`https://wa.me/${agency.whatsapp}?text=${whatsappMessage}`}
            className="rounded-md bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
