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
  gallery?: string[];
  features?: string[];
  available?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
};

export type Agency = {
  id: number;
  name: string;
  slug: string;
  city: string;
  area: string;
  phone: string;
  whatsapp: string;
  description: string;
  isPremium?: boolean;
  responseTime?: string;
};

export type Badge = {
  title: string;
  description: string;
  icon: string;
};

export type FilterOption = {
  value: string;
  label: string;
};
