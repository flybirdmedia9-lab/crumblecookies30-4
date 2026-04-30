import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/types";
import { getItem, setItem, KEYS } from "@/lib/storage";
import { mockCoupons } from "@/data/mockData";
import type { Coupon } from "@/types";

export type CartItem = { product: Product; quantity: number };

type CartCtx = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  discount: number;
  shippingCharge: number;
  total: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  couponCode: string;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
};

const CartContext = createContext<CartCtx | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 599;
const SHIPPING_CHARGE = 60;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => getItem<CartItem[]>(KEYS.CART, []));
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    setItem(KEYS.CART, items);
  }, [items]);

  const add = (product: Product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { product, quantity: qty }];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => i.product.id === id ? { ...i, quantity: Math.max(1, qty) } : i));

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.quantity * i.product.price, 0);

  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.round((subtotal * appliedCoupon.value) / 100)
      : appliedCoupon.value
    : 0;

  const shippingCharge = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const total = Math.max(0, subtotal - discount + shippingCharge);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const coupons = getItem<Coupon[]>(KEYS.COUPONS, mockCoupons);
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) return { success: false, message: "Invalid coupon code" };
    if (!coupon.isActive) return { success: false, message: "This coupon has expired" };
    if (coupon.usedCount >= coupon.usageLimit) return { success: false, message: "Coupon usage limit reached" };
    if (subtotal < coupon.minOrderValue) return { success: false, message: `Minimum order ₹${coupon.minOrderValue} required` };
    if (new Date(coupon.expiryDate) < new Date()) return { success: false, message: "This coupon has expired" };
    setAppliedCoupon(coupon);
    setCouponCode(code.toUpperCase());
    return { success: true, message: `Coupon applied! You save ₹${coupon.type === "percentage" ? Math.round((subtotal * coupon.value) / 100) : coupon.value}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  return (
    <CartContext.Provider value={{
      items, add, remove, updateQty, clear, count, subtotal, discount,
      shippingCharge, total, isDrawerOpen, setDrawerOpen, couponCode,
      appliedCoupon, applyCoupon, removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
