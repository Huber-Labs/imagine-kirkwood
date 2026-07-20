-- Sync investment titles and descriptions with v1 exhibition copy

update public.investments
set
  title = 'Dining District',
  description = 'Outdoor tables along a tree-lined promenade — dinner spilling into the street.'
where slug = 'dining-district-vision';

update public.investments
set
  title = 'Library Plaza',
  description = 'A front porch for the library — read outside, grab coffee, and stay awhile.'
where slug = 'library-plaza-vision';

update public.investments
set
  title = 'Bank Alley',
  description = 'A pocket parklet with modular seating, warm light, and room to pause.'
where slug = 'bank-alley-vision';

update public.investments
set
  title = 'Crossing Plaza',
  description = 'A corner made for staying — shade, seats, and live music in the middle of the block.'
where slug = 'crossing-plaza-vision';

update public.investments
set
  title = 'Village Courtyard',
  description = 'A courtyard around the fountain — shared tables and patio life between neighbors.'
where slug = 'village-courtyard-vision';

update public.investments
set
  title = 'Food Truck Alley',
  description = 'Food trucks along the street — plug-in power, string lights, and room to eat together.'
where slug = 'restaurant-alley-vision';

update public.investments
set
  title = 'Shaded Street',
  description = 'A cooler walk under tree canopy — shade, benches, and a gentler summer stroll.'
where slug = 'shaded-vision';

update public.investments
set
  title = 'Evening Plaza',
  description = 'String lights, small-stage music, and tables that turn a walk-through into a place to stay.'
where slug = 'reading-garden';
