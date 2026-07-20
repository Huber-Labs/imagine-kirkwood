-- Rename Restaurant Alley display name to Food Truck Alley (slug unchanged)

update public.places
set name = 'Food Truck Alley'
where slug = 'restaurant-alley';

update public.investments
set
  title = 'Food Truck Alley',
  description = 'A concept for what Food Truck Alley could become.'
where slug = 'restaurant-alley-vision';
