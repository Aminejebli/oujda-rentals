"use client";

import { useState, useMemo } from "react";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";
import { CarCard } from "./CarCard";

type CarsFilterProps = {
  cars: Car[];
  agencies: Agency[];
};

export function CarsFilter({ cars, agencies }: CarsFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [pickupArea, setPickupArea] = useState("All");
  const [sortBy, setSortBy] = useState("price-low");

  // Get unique values for filters
  const categories = useMemo(() => ["All", ...new Set(cars.map((car) => car.category))], [cars]);
  const transmissions = useMemo(() => ["All", ...new Set(cars.map((car) => car.transmission))], [cars]);
  const fuels = useMemo(() => ["All", ...new Set(cars.map((car) => car.fuel))], [cars]);
  const pickupAreas = useMemo(() => ["All", ...new Set(agencies.map((agency) => agency.area))], [agencies]);

  // Filter and sort cars
  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter((car) => {
      const agency = agencies.find((a) => a.id === car.agencyId);
      if (!agency) return false;

      const matchesSearch = searchQuery === "" ||
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = category === "All" || car.category === category;
      const matchesTransmission = transmission === "All" || car.transmission === transmission;
      const matchesFuel = fuel === "All" || car.fuel === fuel;
      const matchesPickupArea = pickupArea === "All" || agency.area === pickupArea;

      const carPrice = car.price;
      const matchesMinPrice = minPrice === "" || carPrice >= parseInt(minPrice);
      const matchesMaxPrice = maxPrice === "" || carPrice <= parseInt(maxPrice);

      return matchesSearch && matchesCategory && matchesTransmission && matchesFuel &&
             matchesPickupArea && matchesMinPrice && matchesMaxPrice;
    });

    // Sort cars
    filtered.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;

      switch (sortBy) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "rating":
          const agencyA = agencies.find(ag => ag.id === a.agencyId);
          const agencyB = agencies.find(ag => ag.id === b.agencyId);
          return (agencyB?.rating || 0) - (agencyA?.rating || 0);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [cars, agencies, searchQuery, category, transmission, fuel, pickupArea, minPrice, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setCategory("All");
    setTransmission("All");
    setFuel("All");
    setMinPrice("");
    setMaxPrice("");
    setPickupArea("All");
    setSortBy("price-low");
  };

  return (
    <>
      {/* Search and Sort Bar */}
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          {/* Search Input */}
          <div className="flex-1">
            <label htmlFor="search" className="text-sm font-medium text-slate-700">
              Rechercher
            </label>
            <div className="relative mt-2">
              <input
                id="search"
                type="text"
                placeholder="Marque, modèle, agence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 pl-10 text-sm outline-none focus:border-emerald-600"
              />
              <svg className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Sort By */}
          <div className="w-full lg:w-48">
            <label htmlFor="sort" className="text-sm font-medium text-slate-700">
              Trier par
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
            >
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="rating">Meilleure note</option>
              <option value="name">Nom A-Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="text-sm font-medium text-slate-700">
              Catégorie
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label htmlFor="transmission" className="text-sm font-medium text-slate-700">
              Transmission
            </label>
            <select
              id="transmission"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {transmissions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel */}
          <div>
            <label htmlFor="fuel" className="text-sm font-medium text-slate-700">
              Carburant
            </label>
            <select
              id="fuel"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {fuels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Area */}
          <div>
            <label htmlFor="pickupArea" className="text-sm font-medium text-slate-700">
              Zone de retrait
            </label>
            <select
              id="pickupArea"
              value={pickupArea}
              onChange={(e) => setPickupArea(e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {pickupAreas.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Prix par jour (DH)
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Results and Reset */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {filteredAndSortedCars.length} voiture{filteredAndSortedCars.length !== 1 ? 's' : ''} trouvée{filteredAndSortedCars.length !== 1 ? 's' : ''}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Réinitialiser
          </button>
        </div>
      </section>

      {/* Results */}
      {filteredAndSortedCars.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedCars.map((car) => {
            const agency = agencies.find((item) => item.id === car.agencyId);
            if (!agency) {
              return null;
            }

            return <CarCard key={car.id} car={car} agency={agency} />;
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h2 className="mt-4 font-semibold text-slate-900">Aucune voiture trouvée</h2>
          <p className="mt-2 text-sm text-slate-600">
            Essayez de modifier vos critères de recherche.
          </p>
        </div>
      )}
    </>
  );
}
