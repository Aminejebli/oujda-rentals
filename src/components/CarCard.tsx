import Image from "next/image";
import Link from "next/link";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";

type CarCardProps = {
  car: Car;
  agency: Pick<Agency, "name" | "whatsapp" | "rating">;
};

export function CarCard({ car, agency }: CarCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Salam, je suis intéressé par la location de ${car.name} chez ${agency.name} à Oujda.`
  );

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs font-semibold text-white shadow-sm">
            Disponible
          </span>
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm">
            <span className="text-xs font-semibold text-slate-900">{agency.rating}</span>
            <svg className="h-3 w-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {car.name}
          </h3>
          <p className="text-sm text-slate-600">{agency.name}</p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-emerald-700">
            {car.price} <span className="text-sm font-normal text-slate-600">DH/jour</span>
          </p>
        </div>

        {/* Features */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{car.seats} places</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
            </svg>
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>{car.category}</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Réponse rapide
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Assurance incluse
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            href={`/cars/${car.slug}`}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:px-4 sm:py-3"
          >
            Voir détails
          </Link>

          <a
            href={`https://wa.me/${agency.whatsapp}?text=${whatsappMessage}`}
            className="rounded-lg bg-green-600 px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:px-4 sm:py-3 flex items-center justify-center gap-1 sm:gap-2"
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
