-- Piece 1.3: agency applications (users applying to become agencies)
create table if not exists public.agency_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  agency_name text not null,
  address text not null,
  phone text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

alter table public.agency_applications enable row level security;

-- Users can read their own applications
drop policy if exists "Users can read own agency applications" on public.agency_applications;
create policy "Users can read own agency applications"
on public.agency_applications
for select
using (auth.uid() = user_id);

-- Users can insert their own applications
drop policy if exists "Users can insert own agency applications" on public.agency_applications;
create policy "Users can insert own agency applications"
on public.agency_applications
for insert
with check (auth.uid() = user_id);

-- Users can update only their own rows, but we will restrict to pending only for now.
drop policy if exists "Users can update own agency applications" on public.agency_applications;
create policy "Users can update own agency applications"
on public.agency_applications
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
