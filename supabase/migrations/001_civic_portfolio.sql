-- Imagine Kirkwood — Civic Portfolio schema (v1)
-- Apply via Supabase SQL editor or: supabase db push

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------

create type public.investment_tag as enum (
  'walkability',
  'trees',
  'small_business',
  'families',
  'arts',
  'history',
  'cycling',
  'green_space',
  'safety'
);

create type public.investment_tier as enum (
  'today',
  'try-soon',
  'grow',
  'long-term'
);

create type public.portfolio_status as enum (
  'building',
  'saved'
);

-- ---------------------------------------------------------------------------
-- Helpers (no table dependencies)
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.participation_settings (
  id int primary key default 1 check (id = 1),
  is_open boolean not null default true,
  closed_at timestamptz
);

insert into public.participation_settings (id, is_open) values (1, true);

create table public.places (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  is_active boolean not null default true
);

create table public.investments (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places (id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  investment_tier public.investment_tier not null,
  tags public.investment_tag[] not null default '{}',
  point_limit int not null default 3 check (point_limit between 1 and 3),
  is_active boolean not null default true,
  unique (place_id, slug)
);

create table public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  status public.portfolio_status not null default 'building',
  reflection text check (char_length(reflection) <= 200),
  summary_text text,
  saved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.portfolio_investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  investment_id uuid not null references public.investments (id) on delete cascade,
  points int not null check (points between 1 and 3),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, investment_id)
);

-- ---------------------------------------------------------------------------
-- Helpers (depend on tables above)
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

create or replace function public.participation_is_open()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select ps.is_open from public.participation_settings ps where ps.id = 1),
    true
  );
$$;

-- ---------------------------------------------------------------------------
-- 10 Civic Points cap (authoritative)
-- ---------------------------------------------------------------------------

create or replace function public.enforce_portfolio_points_limit()
returns trigger
language plpgsql
as $$
declare
  target_user_id uuid;
  other_total int;
  new_total int;
begin
  target_user_id := coalesce(new.user_id, old.user_id);

  select coalesce(sum(points), 0)
  into other_total
  from public.portfolio_investments
  where user_id = target_user_id
    and (tg_op = 'DELETE' or id is distinct from new.id);

  if tg_op = 'DELETE' then
    return old;
  end if;

  new_total := other_total + new.points;
  if new_total > 10 then
    raise exception 'Civic Portfolio exceeds 10 points (attempted total: %)', new_total
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

create trigger portfolio_investments_points_limit
  before insert or update on public.portfolio_investments
  for each row execute function public.enforce_portfolio_points_limit();

-- ---------------------------------------------------------------------------
-- Participation window + portfolio status guards
-- ---------------------------------------------------------------------------

create or replace function public.enforce_portfolio_mutation_allowed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  portfolio_status public.portfolio_status;
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
    on conflict (user_id) do nothing;
  end if;

  select p.status into portfolio_status
  from public.portfolios p
  where p.user_id = coalesce(new.user_id, old.user_id);

  if portfolio_status is not null and portfolio_status <> 'building' then
    raise exception 'Portfolio is saved and cannot be edited'
      using errcode = 'check_violation';
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger portfolio_investments_mutation_guard
  before insert or update or delete on public.portfolio_investments
  for each row execute function public.enforce_portfolio_mutation_allowed();

create trigger portfolios_set_updated_at
  before update on public.portfolios
  for each row execute function public.set_updated_at();

create trigger portfolio_investments_set_updated_at
  before update on public.portfolio_investments
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auth: auto-create profile
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.participation_settings enable row level security;
alter table public.places enable row level security;
alter table public.investments enable row level security;
alter table public.portfolios enable row level security;
alter table public.portfolio_investments enable row level security;

-- profiles
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_select_admin"
  on public.profiles for select
  using (public.is_admin());

-- participation_settings (public read is_open only via select *)
create policy "participation_settings_select_all"
  on public.participation_settings for select
  using (true);

create policy "participation_settings_update_admin"
  on public.participation_settings for update
  using (public.is_admin());

-- places & catalog investments (anonymous browse)
create policy "places_select_active"
  on public.places for select
  using (is_active = true or public.is_admin());

create policy "investments_select_active"
  on public.investments for select
  using (is_active = true or public.is_admin());

-- portfolios
create policy "portfolios_select_own"
  on public.portfolios for select
  using (auth.uid() = user_id);

create policy "portfolios_insert_own"
  on public.portfolios for insert
  with check (auth.uid() = user_id);

create policy "portfolios_update_own_building"
  on public.portfolios for update
  using (
    auth.uid() = user_id
    and (status = 'building' or public.is_admin())
  );

create policy "portfolios_select_admin"
  on public.portfolios for select
  using (public.is_admin());

-- portfolio_investments
create policy "portfolio_investments_select_own"
  on public.portfolio_investments for select
  using (auth.uid() = user_id);

create policy "portfolio_investments_insert_own"
  on public.portfolio_investments for insert
  with check (auth.uid() = user_id);

create policy "portfolio_investments_update_own"
  on public.portfolio_investments for update
  using (auth.uid() = user_id);

create policy "portfolio_investments_delete_own"
  on public.portfolio_investments for delete
  using (auth.uid() = user_id);

create policy "portfolio_investments_select_admin"
  on public.portfolio_investments for select
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Admin aggregate view (service role / admin server actions only)
-- ---------------------------------------------------------------------------

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
left join public.portfolios pf on pf.user_id = pi.user_id and pf.status = 'saved'
group by i.id, i.slug, i.title, i.investment_tier, p.slug, p.name;

revoke all on public.admin_investment_totals from public, anon, authenticated;
grant select on public.admin_investment_totals to service_role;
