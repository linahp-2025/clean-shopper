-- Clean Shopper — products table
-- Run this in your Supabase project: SQL Editor → New query → paste → Run

create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  brand        text not null,
  category     text not null,
  description  text,
  safety_score integer check (safety_score between 0 and 100),
  safety_level text check (safety_level in ('clean', 'caution', 'avoid')),
  created_at   timestamptz default now()
);

-- Enable Row Level Security
alter table public.products enable row level security;

-- Drop existing policies before recreating (CREATE POLICY IF NOT EXISTS not supported)
drop policy if exists "Public insert access"  on public.products;
drop policy if exists "Public read access"    on public.products;
drop policy if exists "Authenticated insert"  on public.products;
drop policy if exists "Authenticated update"  on public.products;

-- Rule 1: Anyone can read products (signed in or not)
create policy "Public read access"
  on public.products
  for select
  using (true);

-- Rule 2: Only signed-in users can insert products
create policy "Authenticated insert"
  on public.products
  for insert
  with check (auth.role() = 'authenticated');

-- Rule 3: Only signed-in users can update products
create policy "Authenticated update"
  on public.products
  for update
  using  (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
