-- image-update/insert-cars-supabase-v3.sql
-- Paste into Supabase Dashboard -> SQL Editor (schema: public)
-- No Unsplash/external images.
-- Uses ONLY local images that exist in: /public/images/cars/*.jpg
-- Safe to re-run: upserts by slug.

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
  -- Dacia Logan
  (1, 1, 'Dacia Logan 2023', 'dacia-logan-2023', '/images/cars/dacia-logan-2023.jpg', 250, 'Manual', 5, 'Diesel', true),
  (1, 1, 'Dacia Logan 2024', 'dacia-logan-2024', '/images/cars/dacia-logan-2023.jpg', 265, 'Manual', 5, 'Diesel', true),

  -- Renault Clio
  (2, 3, 'Renault Clio 2022', 'renault-clio-2022', '/images/cars/renault-clio-2022.jpg', 210, 'Manual', 5, 'Diesel', true),
  (2, 3, 'Renault Clio 2019', 'renault-clio-2019', '/images/cars/renault-clio-2022.jpg', 195, 'Manual', 5, 'Diesel', true),

  -- Hyundai i10
  (3, 3, 'Hyundai i10 2024', 'hyundai-i10-2024', '/images/cars/hyundai-i10-2024.jpg', 215, 'Automatic', 4, 'Petrol', true),
  (3, 3, 'Hyundai i10 2022', 'hyundai-i10-2022', '/images/cars/hyundai-i10-2024.jpg', 190, 'Automatic', 4, 'Petrol', true),

  -- Peugeot 208
  (2, 2, 'Peugeot 208 2023', 'peugeot-208-2023', '/images/cars/peugeot-208-2023.jpg', 220, 'Automatic', 5, 'Petrol', true),
  (2, 2, 'Peugeot 208 2020', 'peugeot-208-2020', '/images/cars/peugeot-208-2023.jpg', 205, 'Automatic', 5, 'Petrol', true),

  -- Toyota Yaris
  (2, 3, 'Toyota Yaris 2024', 'toyota-yaris-2024', '/images/cars/toyota-yaris-2024.jpg', 230, 'Automatic', 5, 'Hybrid', true),
  (2, 3, 'Toyota Yaris 2022', 'toyota-yaris-2022', '/images/cars/toyota-yaris-2024.jpg', 210, 'Automatic', 5, 'Hybrid', true),

  -- VW Polo
  (1, 2, 'Volkswagen Polo 2023', 'vw-polo-2023', '/images/cars/vw-polo-2023.jpg', 225, 'Manual', 5, 'Petrol', true),
  (1, 2, 'Volkswagen Polo 2021', 'vw-polo-2021', '/images/cars/vw-polo-2023.jpg', 205, 'Manual', 5, 'Petrol', true),

  -- Kia Sportage
  (3, 4, 'Kia Sportage 2024', 'kia-sportage-2024', '/images/cars/kia-sportage-2024.jpg', 480, 'Automatic', 5, 'Diesel', true),
  (3, 4, 'Kia Sportage 2022', 'kia-sportage-2022', '/images/cars/kia-sportage-2024.jpg', 450, 'Automatic', 5, 'Diesel', true),

  -- Dacia Duster
  (1, 4, 'Dacia Duster 2023', 'dacia-duster-2023', '/images/cars/dacia-duster-2023.jpg', 420, 'Manual', 5, 'Diesel', true),
  (1, 4, 'Dacia Duster 2021', 'dacia-duster-2021', '/images/cars/dacia-duster-2023.jpg', 390, 'Manual', 5, 'Diesel', true),

  -- Extra 4 cars (still guaranteed to have valid local images)
  (2, 3, 'Renault Megane 2019', 'renault-megane-2019', '/images/cars/renault-clio-2022.jpg', 260, 'Manual', 5, 'Diesel', true),
  (3, 2, 'Seat Ibiza 2021', 'seat-ibiza-2021', '/images/cars/vw-polo-2023.jpg', 195, 'Manual', 5, 'Petrol', true),
  (1, 3, 'Fiat Panda 2022', 'fiat-panda-2022', '/images/cars/hyundai-i10-2024.jpg', 175, 'Manual', 4, 'Petrol', true),
  (2, 2, 'Volkswagen Golf 2020', 'vw-golf-2020', '/images/cars/peugeot-208-2023.jpg', 240, 'Manual', 5, 'Petrol', true)

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

-- Post-check (run in Supabase SQL Editor):
-- select count(*) as available_count from cars where available = true;
-- select slug, name, image_url from cars order by id desc limit 25;

