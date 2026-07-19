-- Seed Kirkwood catalog: places + People's Park investments (v1 learning set)
-- Stable UUIDs for local dev / seed scripts

insert into public.places (id, slug, name, is_active) values
  ('a1000000-0000-4000-8000-000000000001', 'dining-district', 'Dining District', true),
  ('a1000000-0000-4000-8000-000000000002', 'peoples-park', 'People''s Park', true),
  ('a1000000-0000-4000-8000-000000000003', 'library-plaza', 'Library Plaza', false),
  ('a1000000-0000-4000-8000-000000000004', 'restaurant-alley', 'Restaurant Alley', false),
  ('a1000000-0000-4000-8000-000000000005', 'crossing-plaza', 'Crossing Plaza', false),
  ('a1000000-0000-4000-8000-000000000006', 'village-courtyard', 'Village Courtyard', false)
on conflict (slug) do nothing;

-- Today — Protect What Works
insert into public.investments (id, place_id, slug, title, description, investment_tier, tags) values
  (
    'b1000000-0000-4000-8000-000000000001',
    'a1000000-0000-4000-8000-000000000002',
    'protect-existing-trees',
    'Protect existing trees',
    'Keep the mature canopy that already gives the park shade and character.',
    'today',
    array['trees', 'green_space', 'history']::public.investment_tag[]
  ),
  (
    'b1000000-0000-4000-8000-000000000002',
    'a1000000-0000-4000-8000-000000000002',
    'protect-gathering-space',
    'Protect the open lawn',
    'Preserve the flexible lawn that hosts everyday crossings and occasional events.',
    'today',
    array['families', 'arts', 'walkability']::public.investment_tag[]
  )
on conflict (place_id, slug) do nothing;

-- Try Soon
insert into public.investments (id, place_id, slug, title, description, investment_tier, tags) values
  (
    'b1000000-0000-4000-8000-000000000010',
    'a1000000-0000-4000-8000-000000000002',
    'temporary-seating',
    'Temporary seating',
    'Roll out movable chairs on Friday afternoons — see if people stay.',
    'try-soon',
    array['walkability', 'families']::public.investment_tag[]
  ),
  (
    'b1000000-0000-4000-8000-000000000011',
    'a1000000-0000-4000-8000-000000000002',
    'shade-umbrellas',
    'Shade umbrellas',
    'Partner with a nearby café to loan umbrellas on sunny days.',
    'try-soon',
    array['trees', 'green_space', 'families']::public.investment_tag[]
  ),
  (
    'b1000000-0000-4000-8000-000000000012',
    'a1000000-0000-4000-8000-000000000002',
    'weekend-music',
    'Weekend music',
    'Invite a busker or acoustic duo for Saturday afternoons.',
    'try-soon',
    array['arts', 'families', 'small_business']::public.investment_tag[]
  ),
  (
    'b1000000-0000-4000-8000-000000000013',
    'a1000000-0000-4000-8000-000000000002',
    'pop-up-stage',
    'Pop-up stage',
    'A simple platform for buskers, poets, and community announcements.',
    'try-soon',
    array['arts', 'walkability']::public.investment_tag[]
  ),
  (
    'b1000000-0000-4000-8000-000000000014',
    'a1000000-0000-4000-8000-000000000002',
    'food-carts',
    'Food carts',
    'Pilot a single cart on show nights — low risk, high energy.',
    'try-soon',
    array['small_business', 'families']::public.investment_tag[]
  )
on conflict (place_id, slug) do nothing;

-- Grow
insert into public.investments (id, place_id, slug, title, description, investment_tier, tags) values
  (
    'b1000000-0000-4000-8000-000000000020',
    'a1000000-0000-4000-8000-000000000002',
    'shade-grove',
    'Shade grove',
    'A cluster of mature trees at the park''s center — instant comfort on hot days.',
    'grow',
    array['trees', 'green_space', 'families']::public.investment_tag[]
  ),
  (
    'b1000000-0000-4000-8000-000000000021',
    'a1000000-0000-4000-8000-000000000002',
    'event-lawn-power',
    'Event lawn power',
    'Permanent outlets for markets, performances, and evening gatherings.',
    'grow',
    array['arts', 'small_business', 'safety']::public.investment_tag[]
  )
on conflict (place_id, slug) do nothing;

-- Long Term
insert into public.investments (id, place_id, slug, title, description, investment_tier, tags) values
  (
    'b1000000-0000-4000-8000-000000000030',
    'a1000000-0000-4000-8000-000000000002',
    'amphitheater',
    'Amphitheater',
    'A designed bowl facing the Buskirk-Chumley for performances and community events.',
    'long-term',
    array['arts', 'history', 'families']::public.investment_tag[]
  )
on conflict (place_id, slug) do nothing;
