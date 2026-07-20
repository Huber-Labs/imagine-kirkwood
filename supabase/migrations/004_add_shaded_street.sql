-- Add Shaded Street to the v1 catalog

insert into public.places (id, slug, name, is_active) values
  ('a1000000-0000-4000-8000-000000000008', 'shaded', 'Shaded Street', true)
on conflict (slug) do update set is_active = true, name = excluded.name;

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
    'c1000000-0000-4000-8000-000000000008',
    'a1000000-0000-4000-8000-000000000008',
    'shaded-vision',
    'Shaded Street',
    'A concept for what Shaded Street could become.',
    'grow',
    array['trees', 'green_space', 'walkability']::public.investment_tag[],
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
