-- Public "Submit an idea" intake: anyone can propose an idea; admins review.
-- Rows are inserted server-side via the service role (RLS is bypassed there),
-- so no anonymous insert policy is opened. Reads/updates are admin-only.

create table public.idea_submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 160),
  description text not null check (char_length(trim(description)) between 1 and 4000),
  submitter_name text check (submitter_name is null or char_length(submitter_name) <= 120),
  submitter_email text check (submitter_email is null or char_length(submitter_email) <= 254),
  photo_path text,
  status text not null default 'new' check (status in ('new', 'reviewed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idea_submissions_status_created_idx
  on public.idea_submissions (status, created_at desc);

create trigger idea_submissions_set_updated_at
  before update on public.idea_submissions
  for each row execute function public.set_updated_at();

alter table public.idea_submissions enable row level security;

-- Admin-only visibility and moderation. Public submissions flow through the
-- service-role client in a server action, which bypasses these policies.
create policy "idea_submissions_select_admin"
  on public.idea_submissions for select
  using (public.is_admin());

create policy "idea_submissions_update_admin"
  on public.idea_submissions for update
  using (public.is_admin());

create policy "idea_submissions_delete_admin"
  on public.idea_submissions for delete
  using (public.is_admin());

-- Private storage bucket for optional submission photos. Access is granted only
-- through the service role (signed URLs are minted for the admin dashboard).
insert into storage.buckets (id, name, public)
values ('idea-submissions', 'idea-submissions', false)
on conflict (id) do nothing;
