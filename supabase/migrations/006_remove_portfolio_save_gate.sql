-- Allow Civic Point edits without a separate "save portfolio" step

create or replace function public.enforce_portfolio_mutation_allowed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() then
    if tg_op = 'DELETE' then
      return old;
    end if;
    return new;
  end if;

  if not public.participation_is_open() then
    raise exception 'Participation is currently closed'
      using errcode = 'check_violation';
  end if;

  if tg_op = 'INSERT' then
    insert into public.portfolios (user_id, status)
    values (new.user_id, 'building')
    on conflict (user_id) do update set status = 'building';
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create or replace view public.admin_investment_totals
with (security_invoker = false)
as
select
  i.id as investment_id,
  i.slug,
  i.title,
  i.investment_tier,
  p.slug as place_slug,
  p.name as place_name,
  coalesce(sum(pi.points), 0)::int as total_points,
  count(distinct pi.user_id)::int as unique_investors
from public.investments i
join public.places p on p.id = i.place_id
left join public.portfolio_investments pi on pi.investment_id = i.id
group by i.id, i.slug, i.title, i.investment_tier, p.slug, p.name;
