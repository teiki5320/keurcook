-- =====================================================================
-- Alohash — schéma de base de données (Supabase / PostgreSQL)
-- À exécuter dans l'éditeur SQL de Supabase ou via `supabase db push`.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Administrateurs : un utilisateur Supabase Auth présent dans cette table
-- a accès à l'espace /admin.
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------
-- Catalogue
-- ---------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  kind text not null check (kind in ('cbd', 'accessoire')),
  description text not null default '',
  position int not null default 0
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category_id uuid not null references public.categories (id) on delete restrict,
  short_description text not null default '',
  description text not null default '',
  -- Taux exprimés en pourcentage (ex : 12.5 = 12,5 %). Null pour les accessoires.
  cbd_rate numeric(5, 2) check (cbd_rate is null or (cbd_rate >= 0 and cbd_rate <= 100)),
  -- Conformité : THC ≤ 0,3 % imposé au niveau de la base.
  thc_rate numeric(5, 3) check (thc_rate is null or (thc_rate >= 0 and thc_rate <= 0.3)),
  origin_region text,
  producer text,
  images text[] not null default '{}',
  coa_url text,
  tags text[] not null default '{}',
  is_active boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_id);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  label text not null,
  price_cents int not null check (price_cents >= 0),
  stock int not null default 0 check (stock >= 0),
  sku text unique,
  position int not null default 0
);

create index if not exists product_variants_product_idx on public.product_variants (product_id);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------
-- Commandes
-- ---------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  access_token text not null default encode(gen_random_bytes(16), 'hex'),
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled')),
  email text not null,
  first_name text not null,
  last_name text not null,
  phone text,
  address_line1 text not null,
  address_line2 text,
  postal_code text not null,
  city text not null,
  country text not null default 'FR',
  notes text,
  payment_provider text not null,
  payment_reference text,
  subtotal_cents int not null,
  shipping_cents int not null,
  total_cents int not null,
  tracking_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders
for each row execute function public.touch_updated_at();

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  variant_id uuid references public.product_variants (id) on delete set null,
  product_name text not null,
  variant_label text not null,
  unit_price_cents int not null,
  quantity int not null check (quantity > 0)
);

create index if not exists order_items_order_idx on public.order_items (order_id);

create sequence if not exists public.order_number_seq start 1001;

-- ---------------------------------------------------------------------
-- place_order : création atomique d'une commande.
-- Vérifie les prix et les stocks côté base (on ne fait jamais confiance
-- aux prix envoyés par le navigateur), décrémente le stock et renvoie
-- la commande. Appelée uniquement côté serveur avec la clé service_role.
-- ---------------------------------------------------------------------
create or replace function public.place_order(
  p_customer jsonb,
  p_items jsonb,
  p_payment_provider text,
  p_shipping_rules jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_variant record;
  v_qty int;
  v_subtotal int := 0;
  v_shipping int;
  v_order public.orders;
  v_number text;
begin
  if jsonb_array_length(p_items) = 0 then
    raise exception 'EMPTY_CART';
  end if;

  -- Première passe : verrouillage des variantes et contrôle du stock.
  for v_item in select * from jsonb_array_elements(p_items) loop
    v_qty := (v_item ->> 'quantity')::int;
    if v_qty is null or v_qty <= 0 or v_qty > 99 then
      raise exception 'INVALID_QUANTITY';
    end if;

    select v.id, v.price_cents, v.stock, v.label, p.name, p.id as product_id, p.is_active
      into v_variant
      from public.product_variants v
      join public.products p on p.id = v.product_id
     where v.id = (v_item ->> 'variant_id')::uuid
       for update of v;

    if not found or not v_variant.is_active then
      raise exception 'PRODUCT_UNAVAILABLE:%', v_item ->> 'variant_id';
    end if;
    if v_variant.stock < v_qty then
      raise exception 'OUT_OF_STOCK:%', v_variant.name || ' — ' || v_variant.label;
    end if;

    v_subtotal := v_subtotal + v_variant.price_cents * v_qty;
  end loop;

  if v_subtotal >= (p_shipping_rules ->> 'free_threshold_cents')::int then
    v_shipping := 0;
  else
    v_shipping := (p_shipping_rules ->> 'flat_rate_cents')::int;
  end if;

  v_number := 'AH-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.order_number_seq')::text, 6, '0');

  insert into public.orders (
    order_number, email, first_name, last_name, phone,
    address_line1, address_line2, postal_code, city, country, notes,
    payment_provider, payment_reference, subtotal_cents, shipping_cents, total_cents
  ) values (
    v_number,
    lower(trim(p_customer ->> 'email')),
    p_customer ->> 'first_name',
    p_customer ->> 'last_name',
    nullif(p_customer ->> 'phone', ''),
    p_customer ->> 'address_line1',
    nullif(p_customer ->> 'address_line2', ''),
    p_customer ->> 'postal_code',
    p_customer ->> 'city',
    coalesce(nullif(p_customer ->> 'country', ''), 'FR'),
    nullif(p_customer ->> 'notes', ''),
    p_payment_provider,
    v_number,
    v_subtotal,
    v_shipping,
    v_subtotal + v_shipping
  )
  returning * into v_order;

  -- Seconde passe : lignes de commande + décrément du stock.
  for v_item in select * from jsonb_array_elements(p_items) loop
    v_qty := (v_item ->> 'quantity')::int;

    select v.id, v.price_cents, v.label, p.name, p.id as product_id
      into v_variant
      from public.product_variants v
      join public.products p on p.id = v.product_id
     where v.id = (v_item ->> 'variant_id')::uuid;

    insert into public.order_items (order_id, product_id, variant_id, product_name, variant_label, unit_price_cents, quantity)
    values (v_order.id, v_variant.product_id, v_variant.id, v_variant.name, v_variant.label, v_variant.price_cents, v_qty);

    update public.product_variants set stock = stock - v_qty where id = v_variant.id;
  end loop;

  return to_jsonb(v_order);
end;
$$;

revoke all on function public.place_order(jsonb, jsonb, text, jsonb) from public, anon, authenticated;
grant execute on function public.place_order(jsonb, jsonb, text, jsonb) to service_role;

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.admins enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Admins : un utilisateur peut vérifier s'il est admin.
drop policy if exists "admins_self_read" on public.admins;
create policy "admins_self_read" on public.admins for select using (user_id = auth.uid());

-- Catalogue : lecture publique des éléments actifs, écriture admin.
drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read" on public.categories for select using (true);
drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write" on public.categories for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products for select using (is_active or public.is_admin());
drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write" on public.products for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "variants_public_read" on public.product_variants;
create policy "variants_public_read" on public.product_variants for select using (
  exists (select 1 from public.products p where p.id = product_id and (p.is_active or public.is_admin()))
);
drop policy if exists "variants_admin_write" on public.product_variants;
create policy "variants_admin_write" on public.product_variants for all using (public.is_admin()) with check (public.is_admin());

-- Commandes : jamais lisibles publiquement. Création via place_order (service_role).
drop policy if exists "orders_admin_all" on public.orders;
create policy "orders_admin_all" on public.orders for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "order_items_admin_all" on public.order_items;
create policy "order_items_admin_all" on public.order_items for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- Stockage : images produits et certificats d'analyse (lecture publique,
-- écriture réservée aux admins).
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true), ('certificates', 'certificates', true)
on conflict (id) do nothing;

drop policy if exists "catalog_files_public_read" on storage.objects;
create policy "catalog_files_public_read" on storage.objects for select
  using (bucket_id in ('product-images', 'certificates'));

drop policy if exists "catalog_files_admin_insert" on storage.objects;
create policy "catalog_files_admin_insert" on storage.objects for insert
  with check (bucket_id in ('product-images', 'certificates') and public.is_admin());

drop policy if exists "catalog_files_admin_update" on storage.objects;
create policy "catalog_files_admin_update" on storage.objects for update
  using (bucket_id in ('product-images', 'certificates') and public.is_admin());

drop policy if exists "catalog_files_admin_delete" on storage.objects;
create policy "catalog_files_admin_delete" on storage.objects for delete
  using (bucket_id in ('product-images', 'certificates') and public.is_admin());

-- ---------------------------------------------------------------------
-- cancel_order : annule une commande et remet les produits en stock.
-- Réservée aux administrateurs.
-- ---------------------------------------------------------------------
create or replace function public.cancel_order(p_order_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'FORBIDDEN';
  end if;

  update public.orders set status = 'cancelled'
   where id = p_order_id and status <> 'cancelled';
  if not found then
    return;
  end if;

  update public.product_variants v
     set stock = v.stock + i.qty
    from (
      select variant_id, sum(quantity)::int as qty
        from public.order_items
       where order_id = p_order_id and variant_id is not null
       group by variant_id
    ) i
   where v.id = i.variant_id;
end;
$$;

revoke all on function public.cancel_order(uuid) from public, anon;
grant execute on function public.cancel_order(uuid) to authenticated;
