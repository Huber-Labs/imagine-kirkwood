-- Pause Big Screen Nights while multi-concept explore is on hold

update public.investments
set is_active = false
where slug = 'big-screen-nights'
  and place_id = 'a1000000-0000-4000-8000-000000000002';
