-- Public concept comments: one editable note per user per investment

create table public.concept_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  investment_id uuid not null references public.investments (id) on delete cascade,
  author_display_name text not null,
  body text not null check (char_length(trim(body)) between 1 and 400),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, investment_id)
);

create trigger concept_comments_set_updated_at
  before update on public.concept_comments
  for each row execute function public.set_updated_at();

alter table public.concept_comments enable row level security;

create policy "concept_comments_select_all"
  on public.concept_comments for select
  using (true);

create policy "concept_comments_insert_own"
  on public.concept_comments for insert
  with check (
    auth.uid() = user_id
    and public.participation_is_open()
  );

create policy "concept_comments_update_own"
  on public.concept_comments for update
  using (
    auth.uid() = user_id
    and public.participation_is_open()
  );

create policy "concept_comments_delete_own_or_admin"
  on public.concept_comments for delete
  using (
    auth.uid() = user_id
    or public.is_admin()
  );

create policy "concept_comments_select_admin"
  on public.concept_comments for select
  using (public.is_admin());
