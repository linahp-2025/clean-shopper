-- Clean Shopper — saved_products table
-- Run this in your Supabase project: SQL Editor → New query → paste → Run

create table if not exists public.saved_products (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  product_id uuid        not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

alter table public.saved_products enable row level security;

-- Drop existing policies before recreating
drop policy if exists "Users can view own saved products"   on public.saved_products;
drop policy if exists "Users can insert own saved products" on public.saved_products;
drop policy if exists "Users can delete own saved products" on public.saved_products;

-- Rule 1: Users can only see their own saved products
create policy "Users can view own saved products"
  on public.saved_products
  for select
  using (auth.uid() = user_id);

-- Rule 2: Users can only insert their own saved products
create policy "Users can insert own saved products"
  on public.saved_products
  for insert
  with check (auth.uid() = user_id);

-- Rule 3: Users can only delete their own saved products
create policy "Users can delete own saved products"
  on public.saved_products
  for delete
  using (auth.uid() = user_id);
