import type { Agency } from "@/data/agencies";
import type { Car } from "@/data/cars";
import { supabase } from "./supabase";

type AgencyRow = {
  id: number;
  name: string;
  slug: string;
  city: string;
  area: string;
  phone: string | null;
  whatsapp: string;
  rating: number | string;
  description: string;
};

type CategoryRelation = {
  name: string;
};

type CarRow = {
  id: number;
  agency_id: number;
  name: string;
  slug: string;
  image_url: string;
  price_per_day: number;
  transmission: string;
  seats: number;
  fuel: string;
  categories: CategoryRelation | CategoryRelation[] | null;
};

const agencySelect =
  "id, name, slug, city, area, phone, whatsapp, rating, description";

const carSelect = `
  id,
  agency_id,
  name,
  slug,
  image_url,
  price_per_day,
  transmission,
  seats,
  fuel,
  categories (
    name
  )
`;

function getCategoryName(category: CarRow["categories"]) {
  if (Array.isArray(category)) {
    return category[0]?.name ?? "Other";
  }

  return category?.name ?? "Other";
}

function mapAgency(row: AgencyRow): Agency {
  return {
    id: Number(row.id),
    name: row.name,
    slug: row.slug,
    city: row.city,
    area: row.area,
    phone: row.phone ?? "",
    whatsapp: row.whatsapp,
    rating: Number(row.rating),
    description: row.description,
  };
}

function mapCar(row: CarRow): Car {
  return {
    id: Number(row.id),
    agencyId: Number(row.agency_id),
    name: row.name,
    slug: row.slug,
    price: Number(row.price_per_day),
    transmission: row.transmission,
    category: getCategoryName(row.categories),
    seats: Number(row.seats),
    fuel: row.fuel,
    image: row.image_url,
  };
}

export async function getAgencies() {
  const { data, error } = await supabase
    .from("agencies")
    .select(agencySelect)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Could not load agencies: ${error.message}`);
  }

  return (data ?? []).map(mapAgency);
}

export async function getAgencyBySlug(slug: string) {
  const { data, error } = await supabase
    .from("agencies")
    .select(agencySelect)
    .eq("slug", slug)
    .maybeSingle<AgencyRow>();

  if (error) {
    throw new Error(`Could not load agency: ${error.message}`);
  }

  return data ? mapAgency(data) : null;
}

export async function getAgencyById(id: number) {
  const { data, error } = await supabase
    .from("agencies")
    .select(agencySelect)
    .eq("id", id)
    .maybeSingle<AgencyRow>();

  if (error) {
    throw new Error(`Could not load agency: ${error.message}`);
  }

  return data ? mapAgency(data) : null;
}

export async function getCars() {
  const { data, error } = await supabase
    .from("cars")
    .select(carSelect)
    .eq("available", true)
    .order("price_per_day", { ascending: true });

  if (error) {
    throw new Error(`Could not load cars: ${error.message}`);
  }

  return data.map(mapCar);
}

export async function getCarBySlug(slug: string) {
  const { data, error } = await supabase
    .from("cars")
    .select(carSelect)
    .eq("slug", slug)
    .eq("available", true)
    .maybeSingle<CarRow>();

  if (error) {
    throw new Error(`Could not load car: ${error.message}`);
  }

  return data ? mapCar(data) : null;
}

export async function getCarsByAgencyId(agencyId: number) {
  const { data, error } = await supabase
    .from("cars")
    .select(carSelect)
    .eq("agency_id", agencyId)
    .eq("available", true)
    .order("price_per_day", { ascending: true });

  if (error) {
    throw new Error(`Could not load agency cars: ${error.message}`);
  }

  return (data ?? []).map(mapCar);
}
