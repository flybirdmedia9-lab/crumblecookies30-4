// localStorage helpers with type safety

export function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or SSR
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // noop
  }
}

// Storage keys
export const KEYS = {
  CART: "crumbel-cart",
  WISHLIST: "crumbel-wishlist",
  AUTH_USER: "crumbel-user",
  AUTH_ADMIN: "crumbel-admin",
  ORDERS: "crumbel-orders",
  USERS: "crumbel-users",
  COUPONS: "crumbel-coupons",
  REVIEWS: "crumbel-reviews",
  INVENTORY_LOG: "crumbel-inventory-log",
  SITE_CONTENT: "crumbel-site-content",
} as const;
