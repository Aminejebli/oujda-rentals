"use client";

import { useState } from "react";
import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";
import { CarCard } from "./CarCard";

type CarsFilterProps = {
  cars: Car[];
  agencies: Agency[];
};

export function CarsFilter({ cars, agencies }: CarsFilterProps) {
  const [category, setCategory] = useState("All");
  const [transmission, setTransmission] = useState("All");

  const categories = ["All", ...new Set(cars.map((car) => car.category))];
  const transmissions = [
    "All",
    ...new Set(cars.map((car) => car.transmission)),
  ];

  const filteredCars = cars.filter((car) => {
    const matchesCategory = category === "All" || car.category === category;
    const matchesTransmission =
      transmission === "All" || car.transmission === transmission;

    return matchesCategory && matchesTransmission;
  });

  return (
    <>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="category"
              className="text-sm font-medium text-slate-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="transmission"
              className="text-sm font-medium text-slate-700"
            >
              Transmission
            </label>
            <select
              id="transmission"
              value={transmission}
              onChange={(event) => setTransmission(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {transmissions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setTransmission("All");
              }}
              className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Reset filters
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          {filteredCars.length} cars found
        </p>
      </section>

      {filteredCars.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {filteredCars.map((car) => {
            const agency = agencies.find((item) => item.id === car.agencyId);

            if (!agency) {
              return null;
            }

            return <CarCard key={car.id} car={car} agency={agency} />;
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
          <h2 className="font-semibold">No cars match these filters.</h2>
          <p className="mt-2 text-sm text-slate-600">
            Try changing the category or transmission.
          </p>
        </div>
      )}
    </>
  );
}
