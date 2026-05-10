import type { FilterOption } from "@/types/domain";

export const sortOptions: FilterOption[] = [
  { value: "price-low", label: "Prix croissant" },
  { value: "price-high", label: "Prix décroissant" },
  { value: "name", label: "Nom A-Z" },
];

export const categoryOptions: FilterOption[] = [
  { value: "All", label: "Toutes catégories" },
  { value: "Économique", label: "Économique" },
  { value: "Citadine", label: "Citadine" },
  { value: "SUV", label: "SUV" },
  { value: "Hybride", label: "Hybride" },
  { value: "Luxe", label: "Luxe" },
  { value: "SUV Premium", label: "SUV Premium" },
];

export const transmissionOptions: FilterOption[] = [
  { value: "All", label: "Toutes transmissions" },
  { value: "Manuelle", label: "Manuelle" },
  { value: "Automatique", label: "Automatique" },
];

export const fuelOptions: FilterOption[] = [
  { value: "All", label: "Tous carburants" },
  { value: "Diesel", label: "Diesel" },
  { value: "Essence", label: "Essence" },
  { value: "Hybride", label: "Hybride" },
];
