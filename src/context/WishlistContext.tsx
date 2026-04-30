import { createContext, useContext, useState, ReactNode } from "react";
import type { WishlistItem, Product } from "@/types";
import { getItem, setItem, KEYS } from "@/lib/storage";

type WishlistCtx = {
  items: WishlistItem[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistCtx | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() =>
    getItem<WishlistItem[]>(KEYS.WISHLIST, [])
  );

  const sync = (next: WishlistItem[]) => {
    setItems(next);
    setItem(KEYS.WISHLIST, next);
  };

  const add = (product: Product) => {
    if (items.some((i) => i.product.id === product.id)) return;
    sync([...items, { product, addedAt: new Date().toISOString() }]);
  };

  const remove = (productId: string) => sync(items.filter((i) => i.product.id !== productId));

  const toggle = (product: Product) => {
    if (has(product.id)) remove(product.id);
    else add(product);
  };

  const has = (productId: string) => items.some((i) => i.product.id === productId);
  const count = items.length;

  return (
    <WishlistContext.Provider value={{ items, add, remove, toggle, has, count }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
