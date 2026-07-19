-- Sync Supabase catalog with v1 exhibition: one investment per published PlaceFuture
-- Run after 001_civic_portfolio.sql and 002_seed_catalog.sql

-- Activate all Kirkwood opportunity sites
update public.places set is_active = true where slug in (
  'dining-district',
  'library-plaza',
  'restaurant-alley',
  'crossing-plaza',
  'village-courtyard',
  'peoples-park'
);

insert into public.places (id, slug, name, is_active) values
  ('a1000000-0000-4000-8000-000000000007', 'bank-alley', 'Bank Alley', true)
on conflict (slug) do update set is_active = true, name = excluded.name;

-- Retire granular People's Park investments from the learning seed
update public.investments
set is_active = false
where place_id = 'a1000000-0000-4000-8000-000000000002'
  and slug not in ('reading-garden');

-- V1 catalog: one investment per published future (slug = PlaceFuture.id)
insert into public.investments (
  id,
  place_id,
  slug,
  title,
  description,
  investment_tier,
  tags,
  point_limit,
  is_active
) values
  (
    'c1000000-0000-4000-8000-000000000001',
    'a1000000-0000-4000-8000-000000000001',
    'dining-district-vision',
    'Dining District',
    'A concept for what Dining District could become.',
    'grow',
    array['small_business', 'walkability', 'families']::public.investment_tag[],
    3,
    true
  ),
  (
    'c1000000-0000-4000-8000-000000000002',
    'a1000000-0000-4000-8000-000000000003',
    'library-plaza-vision',
    'Library Plaza',
    'A concept for what Library Plaza could become.',
    'grow',
    array['arts', 'families', 'walkability']::public.investment_tag[],
    3,
    true
  ),
  (
    'c1000000-0000-4000-8000-000000000003',
    'a1000000-0000-4000-8000-000000000007',
    'bank-alley-vision',
    'Bank Alley',
    'A concept for what Bank Alley could become.',
    'grow',
    array['small_business', 'walkability', 'arts']::public.investment_tag[],
    3,
    true
  ),
  (
    'c1000000-0000-4000-8000-000000000004',
    'a1000000-0000-4000-8000-000000000002',
    'reading-garden',
    'Reading Garden',
    'A quieter, greener retreat designed around reading, conversation, native planting, and restoration.',
    'grow',
    array['trees', 'green_space', 'families']::public.investment_tag[],
    3,
    true
  ),
  (
    'c1000000-0000-4000-8000-000000000005',
    'a1000000-0000-4000-8000-000000000004',
    'restaurant-alley-vision',
    'Restaurant Alley',
    'A concept for what Restaurant Alley could become.',
    'grow',
    array['small_business', 'families', 'walkability']::public.investment_tag[],
    3,
    true
  ),
  (
    'c1000000-0000-4000-8000-000000000006',
    'a1000000-0000-4000-8000-000000000005',
    'crossing-plaza-vision',
    'Crossing Plaza',
    'A concept for what Crossing Plaza could become.',
    'grow',
    array['walkability', 'safety', 'families']::public.investment_tag[],
    3,
    true
  ),
  (
    'c1000000-0000-4000-8000-000000000007',
    'a1000000-0000-4000-8000-000000000006',
    'village-courtyard-vision',
    'Village Courtyard',
    'A concept for what Village Courtyard could become.',
    'grow',
    array['families', 'green_space', 'history']::public.investment_tag[],
    3,
    true
  )
on conflict (place_id, slug) do update set
  title = excluded.title,
  description = excluded.description,
  investment_tier = excluded.investment_tier,
  tags = excluded.tags,
  point_limit = excluded.point_limit,
  is_active = excluded.is_active;
