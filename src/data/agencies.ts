export type Agency = {
  id: number;
  name: string;
  slug: string;
  city: string;
  area: string;
  phone: string;
  whatsapp: string;
  rating: number;
  description: string;
};

export const agencies: Agency[] = [
  {
    id: 1,
    name: "Oujda Auto Rent",
    slug: "oujda-auto-rent",
    city: "Oujda",
    area: "City Center",
    phone: "+212 600 000 000",
    whatsapp: "212600000000",
    rating: 4.8,
    description: "Local car rental agency near Oujda city center.",
  },
  {
    id: 2,
    name: "Atlas Cars Oujda",
    slug: "atlas-cars-oujda",
    city: "Oujda",
    area: "Oujda Airport",
    phone: "+212 600 000 001",
    whatsapp: "212600000001",
    rating: 4.7,
    description: "Airport-friendly rental agency with economy and family cars.",
  },
  {
    id: 3,
    name: "Oriental Rent Car",
    slug: "oriental-rent-car",
    city: "Oujda",
    area: "Hay Al Qods",
    phone: "+212 600 000 002",
    whatsapp: "212600000002",
    rating: 4.6,
    description: "Trusted local agency serving Oujda and nearby cities.",
  },
];
