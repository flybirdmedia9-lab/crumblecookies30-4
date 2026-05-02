// ─── Core domain types ─────────────────────────────────────────────────────

export type BadgeType = "Bestseller" | "New Arrival" | "Featured" | "New Stock" | "Limited Stock" | "Out of Stock" | "Premium" | "Gift Ready";

export type Product = {
  id: string;
  name: string;
  category: "Cookies" | "Brownies" | "Combo Packs";
  price: number;
  discountPrice?: number;
  weight: string;
  image: string;
  images?: string[];
  shortDescription: string;
  description: string;
  ingredients: string[];
  badge?: BadgeType;
  sku?: string;
  stock: number;
  rating?: number;
  reviewCount?: number;
  isEnabled: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  variants?: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  label: string;
  priceOffset: number;
  stock: number;
};

export type Category = {
  id: string;
  name: string;
  image?: string;
  order: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type WishlistItem = {
  product: Product;
  addedAt: string;
};

export type Address = {
  id: string;
  userId: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pin: string;
  isDefault: boolean;
};

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

export type PaymentMethod = "COD" | "UPI" | "Card";
export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

export type OrderItem = {
  product: Product;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  address: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  shippingCharge: number;
  discount: number;
  total: number;
  couponCode?: string;
  trackingId?: string;
  shippingPartner?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  upiTransactionId?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  isBlocked: boolean;
  addresses: Address[];
  wishlist: string[];
};

export type AdminRole = "Super Admin" | "Admin" | "Order Manager" | "Product Manager" | "Support Staff";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
};

export type Coupon = {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderValue: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  productIds?: string[];
  categoryIds?: string[];
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  text: string;
  isApproved: boolean;
  createdAt: string;
};

export type ShippingZone = {
  id: string;
  name: string;
  states: string[];
  charge: number;
  freeThreshold: number;
  estimatedDays: string;
};

export type InventoryLog = {
  id: string;
  productId: string;
  change: number;
  reason: string;
  createdAt: string;
};

export type SiteContent = {
  id: string;
  key: string;
  value: string;
  updatedAt: string;
};
