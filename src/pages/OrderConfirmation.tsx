import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, MapPin } from "lucide-react";
import type { Order } from "@/types";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = (location.state as { order?: Order })?.order;

  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-lg text-center">
        <div className="rounded-3xl bg-card p-8 shadow-elegant border border-border/40 md:p-10">
          <CheckCircle className="mx-auto h-16 w-16 text-accent" />
          <h1 className="mt-5 font-display text-4xl font-semibold text-primary">Order Placed!</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you for your order. We'll start baking fresh for you right away!
          </p>

          {order && (
            <div className="mt-8 rounded-2xl bg-secondary/40 p-5 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-semibold text-primary">{order.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-price font-semibold text-primary">₹{order.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment</span>
                <span className="font-medium text-primary">{order.paymentMethod} · {order.paymentStatus}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery to</span>
                <span className="font-medium text-primary text-right max-w-[60%]">{order.address.city}, {order.address.state}</span>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/40 p-3">
              <Package className="h-5 w-5 text-accent" />
              <span>Freshly baked</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/40 p-3">
              <Truck className="h-5 w-5 text-accent" />
              <span>3–5 days delivery</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/40 p-3">
              <MapPin className="h-5 w-5 text-accent" />
              <span>All India ship</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {order && (
              <Button asChild variant="outline" className="flex-1 rounded-full">
                <Link to="/track" state={{ orderId: order.id }}>Track Order</Link>
              </Button>
            )}
            <Button asChild className="flex-1 rounded-full bg-primary text-primary-foreground shadow-warm hover:bg-brown-deep">
              <Link to="/products">Order More</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
