-- image-update/cleanup-cars-bad-image-sql.sql
-- Nettoyage Supabase (PostgreSQL): corrige cars.image_url cassée/invalides.
-- Logique:
--  1) image_url NULL / vide / pas une URL http(s)
--  2) fallback par catégorie.
-- IMPORTANT: nécessite que la table ait une colonne image_url et une colonne category (texte).

begin;

with category_fallback as (
  select
    c.id as car_id,
    case
      when c.category = 'city' then 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop'
      when c.category = 'compact' then 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop'
      when c.category = 'economy' then 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=800&auto=format&fit=crop'
      when c.category = 'suv' then 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop'
      when c.category = 'luxury' then 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop'
      else 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop'
    end as fallback_url
  from cars c
)
update cars c
set image_url = cf.fallback_url
from category_fallback cf
where c.id = cf.car_id
  and (
    c.image_url is null
    or btrim(c.image_url) = ''
    or c.image_url !~ '^https?://'
  );

commit;

-- Post-check recommandé:
-- select count(*) from cars where image_url is null or btrim(image_url) = '' or image_url !~ '^https?://';

