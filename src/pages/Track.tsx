import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Truck, CheckCircle, Clock, MapPin, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Order } from "@/types";

const ORDER_STEPS: Order["orderStatus"][] = ["Pending", "Confirmed", "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const Track = () => {
  const location = useLocation();
  const { getOrder } = useOrders();
  const [orderId, setOrderId] = useState((location.state as { orderId?: string })?.orderId ?? "");
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [searched, setSearched] = useState(false);

  const handleTrack = () => {
    const found = getOrder(orderId.trim());
    setOrder(found);
    setSearched(true);
  };

  const currentStepIdx = order ? ORDER_STEPS.indexOf(order.orderStatus) : -1;
  const isCancelled = order?.orderStatus === "Cancelled" || order?.orderStatus === "Refunded";

  const STEP_ICONS = {
    Pending: Clock,
    Confirmed: CheckCircle,
    Processing: Package,
    Packed: Package,
    Shipped: Truck,
    "Out for Delivery": Truck,
    Delivered: CheckCircle,
  } as const;

  return (
    <main>
      <section className="bg-background border-b border-border/40">
        <div className="container py-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Order Tracking</p>
          <h1 className="mt-2 font-display text-5xl font-semibold text-primary md:text-6xl">Track Your Order</h1>
          <p className="mt-3 text-muted-foreground">Enter your order ID to see the latest status.</p>
        </div>
      </section>

      <section className="container py-12 max-w-2xl mx-auto">
        <div className="flex gap-3">
          <Input
            placeholder="e.g. ORD-001"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            className="rounded-full h-12"
          />
          <Button onClick={handleTrack} className="rounded-full bg-primary text-primary-foreground shadow-warm hover:bg-brown-deep h-12 px-6 shrink-0">
            Track
          </Button>
        </div>

        {searched && !order && (
          <div className="mt-8 rounded-2xl bg-card p-8 text-center shadow-soft">
            <XCircle className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-display text-xl text-primary">Order not found</p>
            <p className="mt-1 text-sm text-muted-foreground">Check your order ID and try again.</p>
          </div>
        )}

        {order && (
          <div className="mt-8 space-y-5">
            <div className="rounded-2xl bg-card p-6 shadow-soft space-y-3">
              <h2 className="font-display text-2xl font-semibold text-primary">Order {order.id}</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Status</p>
                  <p className="font-semibold text-primary mt-0.5">{order.orderStatus}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Payment</p>
                  <p className="font-semibold text-primary mt-0.5">{order.paymentMethod} · {order.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Total</p>
                  <p className="font-price font-semibold text-primary mt-0.5">₹{order.total}</p>
                </div>
                {order.trackingId && (
                  <div>
                    <p className="text-muted-foreground text-xs">Tracking ID</p>
                    <p className="font-semibold text-primary mt-0.5">{order.trackingId} · {order.shippingPartner}</p>
                  </div>
                )}
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
                <span>{order.address.line1}, {order.address.city}, {order.address.state} — {order.address.pin}</span>
              </div>
            </div>

            {!isCancelled && (
              <div className="rounded-2xl bg-card p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">Order Progress</p>
                <div className="space-y-5">
                  {ORDER_STEPS.map((s, i) => {
                    const Icon = STEP_ICONS[s as keyof typeof STEP_ICONS] ?? Clock;
                    const done = i <= currentStepIdx;
                    const active = i === currentStepIdx;
                    return (
                      <div key={s} className="flex items-start gap-4">
                        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", done ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground")}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className={cn("text-sm font-medium", active ? "text-accent" : done ? "text-primary" : "text-muted-foreground")}>{s}</p>
                          {active && <p className="text-xs text-muted-foreground mt-0.5">Current status</p>}
                        </div>
                        {done && !active && <CheckCircle className="h-4 w-4 text-accent shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {isCancelled && (
              <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-5 text-center">
                <XCircle className="mx-auto h-8 w-8 text-destructive" />
                <p className="mt-2 font-semibold text-destructive">{order.orderStatus}</p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Track;
