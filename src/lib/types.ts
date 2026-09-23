export type CategoryKind = "cbd" | "accessoire";

export interface Category {
  id: string;
  slug: string;
  name: string;
  kind: CategoryKind;
  description: string;
  position: number;
}

export interface Variant {
  id: string;
  productId: string;
  label: string;
  priceCents: number;
  stock: number;
  sku: string | null;
  position: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  /** Taux de CBD en % (null pour les accessoires). */
  cbdRate: number | null;
  /** Taux de THC en % — toujours ≤ 0,3 (null pour les accessoires). */
  thcRate: number | null;
  originRegion: string | null;
  producer: string | null;
  images: string[];
  /** URL du certificat d'analyse (PDF). */
  coaUrl: string | null;
  tags: string[];
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  variants: Variant[];
}

export interface ProductWithCategory extends Product {
  category: Category;
}

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  productId: string | null;
  variantId: string | null;
  productName: string;
  variantLabel: string;
  unitPriceCents: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  accessToken: string;
  status: OrderStatus;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  addressLine1: string;
  addressLine2: string | null;
  postalCode: string;
  city: string;
  country: string;
  notes: string | null;
  paymentProvider: string;
  paymentReference: string | null;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  trackingNumber: string | null;
  createdAt: string;
  items: OrderItem[];
}

export interface CustomerInput {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  country: string;
  notes?: string;
}

export interface CartLineInput {
  variantId: string;
  quantity: number;
}
