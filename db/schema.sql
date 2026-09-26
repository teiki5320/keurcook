-- =====================================================================
-- Alohash — schéma de base de données (PostgreSQL, hébergé chez Neon)
-- Installation : `npm run db:setup` (voir README), ou copier-coller dans
-- l'éditeur SQL de Neon. Le script est rejouable sans perte de données.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Catalogue
-- ---------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
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
  origin_country text,
  origin_region text,
  producer text,
  images text[] not null default '{}',
  -- Étiquetage alimentaire (règlement INCO) : ingrédients, allergènes, conservation.
  composition text,
  allergens text[] not null default '{}',
  usage_tips text,
  conservation text,
  tags text[] not null default '{}',
  -- Code ASIN de la fiche Amazon.fr (programme Partenaires) : bouton « Acheter » vers Amazon.
  amazon_asin text,
  is_active boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_id);

-- Mise à niveau d'une base créée pour l'ancienne boutique (CBD) : colonnes alimentaires,
-- suppression des champs CBD. Sans effet sur une base neuve.
alter table public.products add column if not exists origin_country text;
alter table public.products add column if not exists composition text;
alter table public.products add column if not exists allergens text[] not null default '{}';
alter table public.products add column if not exists usage_tips text;
alter table public.products add column if not exists conservation text;
alter table public.products add column if not exists amazon_asin text;
alter table public.products drop column if exists cbd_rate;
alter table public.products drop column if exists thc_rate;
alter table public.products drop column if exists coa_url;
alter table public.categories drop column if exists kind;

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
-- la commande. Appelée uniquement côté serveur (src/lib/data/orders.ts).
-- ---------------------------------------------------------------------
create or replace function public.place_order(
  p_customer jsonb,
  p_items jsonb,
  p_payment_provider text,
  p_shipping_rules jsonb
)
returns jsonb
language plpgsql
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

-- ---------------------------------------------------------------------
-- cancel_order : annule une commande et remet les produits en stock.
-- Appelée uniquement depuis l'admin (session vérifiée côté serveur).
-- ---------------------------------------------------------------------
create or replace function public.cancel_order(p_order_id uuid)
returns void
language plpgsql
set search_path = public
as $$
begin
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

-- ---------------------------------------------------------------------
-- Réglages du site (clé → valeur JSON). Ex. : maintenance.
-- ---------------------------------------------------------------------
create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Recettes
-- Ingrédients : [{ quantity, unit, name, productSlug }] ; étapes : [{ text, image }].
-- ---------------------------------------------------------------------
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country_code text not null,
  region text,
  course text not null check (course in ('mijotes', 'grillades', 'riz-cereales', 'accompagnements', 'douceurs')),
  short_description text not null default '',
  story text not null default '',
  image text,
  prep_minutes int not null default 0 check (prep_minutes >= 0),
  cook_minutes int not null default 0 check (cook_minutes >= 0),
  servings int not null default 4 check (servings between 1 and 50),
  difficulty int not null default 1 check (difficulty between 1 and 3),
  ingredients jsonb not null default '[]',
  steps jsonb not null default '[]',
  tips text[] not null default '{}',
  tags text[] not null default '{}',
  featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists recipes_touch on public.recipes;
create trigger recipes_touch before update on public.recipes
for each row execute function public.touch_updated_at();

-- Avis des visiteurs : publiés seulement après validation dans l'admin.
create table if not exists public.recipe_reviews (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes (id) on delete cascade,
  author_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text not null default '',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists recipe_reviews_recipe_idx on public.recipe_reviews (recipe_id, status);

-- Inscrits à la newsletter (consentement explicite, désinscription possible).
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  consent_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists newsletter_subscribers_email_idx on public.newsletter_subscribers (lower(email));
