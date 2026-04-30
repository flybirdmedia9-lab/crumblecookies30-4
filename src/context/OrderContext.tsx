import { createContext, useContext, useState, ReactNode } from "react";
import type { Order, Address, PaymentMethod } from "@/types";
import { getItem, setItem, KEYS } from "@/lib/storage";
import { mockOrders } from "@/data/mockData";

type OrderCtx = {
  orders: Order[];
  placeOrder: (params: {
    items: Order["items"];
    address: Address;
    paymentMethod: PaymentMethod;
    subtotal: number;
    shippingCharge: number;
    discount: number;
    total: number;
    couponCode?: string;
    userId: string;
    upiTransactionId?: string;
  }) => Order;
  getOrder: (id: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  updateOrderStatus: (id: string, status: Order["orderStatus"]) => void;
  updatePaymentStatus: (id: string, status: Order["paymentStatus"]) => void;
  updateTracking: (id: string, trackingId: string, partner: string) => void;
};

const OrderContext = createContext<OrderCtx | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() =>
    getItem<Order[]>(KEYS.ORDERS, mockOrders)
  );

  const sync = (next: Order[]) => {
    setOrders(next);
    setItem(KEYS.ORDERS, next);
  };

  const placeOrder = (params: Parameters<OrderCtx["placeOrder"]>[0]): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: params.userId,
      items: params.items,
      address: params.address,
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentMethod === "COD" ? "Pending" : "Pending",
      orderStatus: "Pending",
      subtotal: params.subtotal,
      shippingCharge: params.shippingCharge,
      discount: params.discount,
      total: params.total,
      couponCode: params.couponCode,
      upiTransactionId: params.upiTransactionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    sync([order, ...orders]);
    return order;
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);
  const getUserOrders = (userId: string) => orders.filter((o) => o.userId === userId);

  const updateOrderStatus = (id: string, status: Order["orderStatus"]) => {
    sync(orders.map((o) => o.id === id ? { ...o, orderStatus: status, updatedAt: new Date().toISOString() } : o));
  };

  const updatePaymentStatus = (id: string, status: Order["paymentStatus"]) => {
    sync(orders.map((o) => o.id === id ? { ...o, paymentStatus: status, updatedAt: new Date().toISOString() } : o));
  };

  const updateTracking = (id: string, trackingId: string, partner: string) => {
    sync(orders.map((o) => o.id === id ? { ...o, trackingId, shippingPartner: partner, updatedAt: new Date().toISOString() } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrder, getUserOrders, updateOrderStatus, updatePaymentStatus, updateTracking }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
