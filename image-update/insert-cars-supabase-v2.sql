-- insert-cars-supabase-v2.sql
-- Paste into Supabase Dashboard -> SQL Editor (schema: public)
-- No Unsplash/external URLs: uses local images in /public/images/cars/*.jpg
-- Upserts by slug to avoid duplicates.

insert into cars (
  agency_id,
  category_id,
  name,
  slug,
  image_url,
  price_per_day,
  transmission,
  seats,
  fuel,
  available
) values
  -- Dacia Logan (Economy / Manual / Diesel)
  (1, 1, 'Dacia Logan 2023', 'dacia-logan-2023', '/images/cars/dacia-logan-2023.jpg', 240, 'Manual', 5, 'Diesel', true),
  (1, 1, 'Dacia Logan 2021', 'dacia-logan-2021', '/images/cars/dacia-logan-2023.jpg', 220, 'Manual', 5, 'Diesel', true),

  -- Renault Clio (City Car / Manual / Diesel)
  (2, 3, 'Renault Clio 2022', 'renault-clio-2022', '/images/cars/renault-clio-2022.jpg', 210, 'Manual', 5, 'Diesel', true),
  (2, 3, 'Renault Clio 2018', 'renault-clio-2018', '/images/cars/renault-clio-2022.jpg', 190, 'Manual', 5, 'Diesel', true),

  -- Hyundai i10 (City Car / Automatic / Petrol)
  (3, 3, 'Hyundai i10 2024', 'hyundai-i10-2024', '/images/cars/hyundai-i10-2024.jpg', 215, 'Automatic', 4, 'Petrol', true),
  (3, 3, 'Hyundai i10 2021', 'hyundai-i10-2021', '/images/cars/hyundai-i10-2024.jpg', 190, 'Automatic', 4, 'Petrol', true),

  -- Peugeot 208 (Compact / Automatic / Petrol)
  (2, 2, 'Peugeot 208 2023', 'peugeot-208-2023', '/images/cars/peugeot-208-2023.jpg', 220, 'Automatic', 5, 'Petrol', true),
  (2, 2, 'Peugeot 208 2020', 'peugeot-208-2020', '/images/cars/peugeot-208-2023.jpg', 200, 'Automatic', 5, 'Petrol', true),

  -- Toyota Yaris (City Car / Automatic / Hybrid)
  (3, 3, 'Toyota Yaris 2024', 'toyota-yaris-2024', '/images/cars/toyota-yaris-2024.jpg', 230, 'Automatic', 5, 'Hybrid', true),
  (3, 3, 'Toyota Yaris 2022', 'toyota-yaris-2022', '/images/cars/toyota-yaris-2024.jpg', 210, 'Automatic', 5, 'Hybrid', true),

  -- VW Polo (Compact / Manual / Petrol)
  (1, 2, 'Volkswagen Polo 2023', 'vw-polo-2023', '/images/cars/vw-polo-2023.jpg', 225, 'Manual', 5, 'Petrol', true),
  (1, 2, 'Volkswagen Polo 2021', 'vw-polo-2021', '/images/cars/vw-polo-2023.jpg', 205, 'Manual', 5, 'Petrol', true),

  -- Kia Sportage (SUV / Automatic / Diesel)
  (3, 4, 'Kia Sportage 2024', 'kia-sportage-2024', '/images/cars/kia-sportage-2024.jpg', 480, 'Automatic', 5, 'Diesel', true),
  (3, 4, 'Kia Sportage 2022', 'kia-sportage-2022', '/images/cars/kia-sportage-2024.jpg', 450, 'Automatic', 5, 'Diesel', true),

  -- Dacia Duster (SUV / Manual / Diesel)
  (1, 4, 'Dacia Duster 2023', 'dacia-duster-2023', '/images/cars/dacia-duster-2023.jpg', 420, 'Manual', 5, 'Diesel', true),
  (1, 4, 'Dacia Duster 2021', 'dacia-duster-2021', '/images/cars/dacia-duster-2023.jpg', 390, 'Manual', 5, 'Diesel', true),

  -- Additional models (still compatible with your schema using your existing local images)
  -- Kia Picanto (City Car)
  (2, 3, 'Kia Picanto 2022', 'kia-picanto-2022', '/images/cars/renault-clio-2022.jpg', 175, 'Manual', 4, 'Petrol', true),
  (2, 3, 'Kia Picanto 2020', 'kia-picanto-2020', '/images/cars/renault-clio-2022.jpg', 160, 'Manual', 4, 'Petrol', true),

  -- Seat Ibiza (Compact)
  (1, 2, 'Seat Ibiza 2021', 'seat-ibiza-2021', '/images/cars/vw-polo-2023.jpg', 185, 'Manual', 5, 'Petrol', true),
  (1, 2, 'Seat Ibiza 2019', 'seat-ibiza-2019', '/images/cars/vw-polo-2023.jpg', 170, 'Manual', 5, 'Petrol', true)

on conflict (slug) do update set
  agency_id = excluded.agency_id,
  category_id = excluded.category_id,
  name = excluded.name,
  image_url = excluded.image_url,
  price_per_day = excluded.price_per_day,
  transmission = excluded.transmission,
  seats = excluded.seats,
  fuel = excluded.fuel,
  available = excluded.available;

-- Post-check:
-- select count(*) as available_count from cars where available = true;
-- select slug, name, image_url from cars order by price_per_day asc limit 25;

