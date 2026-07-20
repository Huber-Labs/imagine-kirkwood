-- Add Big Screen Nights as a second People's Park investment

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
    'c1000000-0000-4000-8000-000000000009',
    'a1000000-0000-4000-8000-000000000002',
    'big-screen-nights',
    'Big Screen Nights',
    'An inflatable screen, string lights, and lawn chairs — watch the game or a movie together under the trees.',
    'grow',
    array['arts', 'families', 'walkability']::public.investment_tag[],
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
