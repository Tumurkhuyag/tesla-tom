-- Byl checkout-оор хийсэн урьдчилсан захиалгууд.
-- Бичилтийг зөвхөн server (SUPABASE_SECRET_KEY) хийнэ; anon-д policy байхгүй.
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  price_lookup_key text not null,
  product_title text not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired')),
  byl_checkout_id bigint unique,
  amount_total numeric,
  customer_email text,
  phone_number text,
  last_name text,
  first_name text,
  delivery_address jsonb,
  byl_event_id bigint,
  raw jsonb,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index orders_created_at_idx on public.orders (created_at desc);

alter table public.orders enable row level security;

create policy "Admins can read orders"
  on public.orders for select
  to authenticated
  using ((select private.is_admin()));
