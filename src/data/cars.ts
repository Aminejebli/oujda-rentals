export type Car = {
  id: number;
  agencyId: number;
  name: string;
  slug: string;
  price: number;
  transmission: string;
  category: string;
  seats: number;
  fuel: string;
  image: string;
};

export const cars: Car[] = [
  {
    id: 1,
    agencyId: 1,
    name: "Dacia Logan",
    slug: "dacia-logan",
    price: 250,
    transmission: "Manual",
    category: "Economy",
    seats: 5,
    fuel: "Diesel",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
  },
  {
    id: 2,
    agencyId: 1,
    name: "Renault Clio",
    slug: "renault-clio",
    price: 320,
    transmission: "Manual",
    category: "Compact",
    seats: 5,
    fuel: "Diesel",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
  },
  {
    id: 3,
    agencyId: 2,
    name: "Hyundai i10",
    slug: "hyundai-i10",
    price: 280,
    transmission: "Automatic",
    category: "City Car",
    seats: 4,
    fuel: "Petrol",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  },
  {
    id: 4,
    agencyId: 2,
    name: "Dacia Duster",
    slug: "dacia-duster",
    price: 450,
    transmission: "Manual",
    category: "SUV",
    seats: 5,
    fuel: "Diesel",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
  },
  {
    id: 5,
    agencyId: 3,
    name: "Peugeot 208",
    slug: "peugeot-208",
    price: 350,
    transmission: "Automatic",
    category: "Compact",
    seats: 5,
    fuel: "Petrol",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
  },
  {
    id: 6,
    agencyId: 3,
    name: "Toyota Yaris",
    slug: "toyota-yaris",
    price: 330,
    transmission: "Automatic",
    category: "City Car",
    seats: 5,
    fuel: "Hybrid",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027",
  },
];
