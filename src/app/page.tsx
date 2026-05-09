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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-white px-5 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div>
                <p className="mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                  Location voiture Oujda • تأجير سيارات وجدة
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Louez votre voiture facilement à Oujda
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl">
                  Comparez les agences locales, vérifiez les prix journaliers, et contactez directement l'agence sur WhatsApp avant de réserver.
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-md">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Rechercher une voiture..."
                    className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <Link
                    href="/cars"
                    className="rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Rechercher
                  </Link>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/cars"
                  className="rounded-lg bg-emerald-700 px-8 py-4 text-center text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Voir les voitures disponibles
                </Link>
                <a
                  href="https://wa.me/212600000000?text=Salam, je veux louer une voiture à Oujda"
                  className="rounded-lg border border-slate-300 bg-white px-8 py-4 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Contact WhatsApp
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span>Agences vérifiées</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span>Réponse rapide 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span>Livraison aéroport</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{cars.length}+</div>
                  <div className="text-sm text-slate-600">Voitures disponibles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{agencies.length}+</div>
                  <div className="text-sm text-slate-600">Agences partenaires</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-600">Clients satisfaits</div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-8">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-700">Sécurisé</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-700">Vérifié</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-700">24/7 Support</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-white p-4 shadow-sm border border-slate-200">
                  <p className="text-2xl font-bold text-slate-900">{cars.length}</p>
                  <p className="text-xs text-slate-600">Voitures disponibles</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm border border-slate-200">
                  <p className="text-2xl font-bold text-slate-900">{agencies.length}</p>
                  <p className="text-xs text-slate-600">Agences partenaires</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm border border-slate-200">
                  <p className="text-2xl font-bold text-slate-900">4.8</p>
                  <p className="text-xs text-slate-600">Note moyenne</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="aspect-[4/3] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Voiture de location moderne à Oujda"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 backdrop-blur-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">Dacia Logan</p>
                      <p className="text-sm text-slate-600">À partir de 250 DH/jour</p>
                    </div>
                    <div className="rounded-full bg-emerald-100 px-3 py-1">
                      <span className="text-xs font-semibold text-emerald-700">Disponible</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <h2 className="text-2xl font-bold">Agences de confiance</h2>
              <p className="mt-2 text-sm text-slate-600">
                Partenaires locaux vérifiés avec réponse rapide sur WhatsApp.
              </p>
            </div>

            <Link
              href="/agencies"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Voir toutes les agences
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {agencies.map((agency) => (
              <Link
                key={agency.id}
                href={`/agencies/${agency.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {agency.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-semibold text-emerald-700">Vérifié</span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {agency.area}, {agency.city}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-slate-900">{agency.rating}</span>
                    <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {agency.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Réponse &lt; 30 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Livraison aéroport</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    150+ clients satisfaits
                  </div>
                  <div className="rounded-full bg-green-100 px-2 py-1">
                    <span className="text-xs font-semibold text-green-700">En ligne</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Ce que disent nos clients</h2>
            <p className="mt-4 text-lg text-slate-600">
              Des expériences réelles de location à Oujda
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-slate-700">
                "Service excellent ! J'ai trouvé ma voiture en 15 minutes et l'agence me l'a livrée à l'aéroport. Très professionnel."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-emerald-700">MA</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Mohammed Alaoui</p>
                  <p className="text-sm text-slate-600">Voyageur d'affaires</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-slate-700">
                "Prix compétitifs et agences sérieuses. J'ai économisé 30% par rapport aux autres sites. Recommande vivement !"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-700">FB</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Fatima Bennani</p>
                  <p className="text-sm text-slate-600">Touriste</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-slate-700">
                "Application parfaite pour les besoins locaux. WhatsApp direct avec les agences, pas de complications. Parfait !"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-700">YT</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Youssef Tazi</p>
                  <p className="text-sm text-slate-600">Résident d'Oujda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
