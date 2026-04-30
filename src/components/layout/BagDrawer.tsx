import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, Tag, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import { products } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 599;

export const BagDrawer = () => {
  const { items, subtotal, discount, shippingCharge, total, updateQty, remove, isDrawerOpen, setDrawerOpen, couponCode, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput.trim());
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
    if (result.success) setCouponInput("");
  };

  const suggested = products.filter((p) => !items.some((i) => i.product.id === p.id)).slice(0, 3);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="flex w-full flex-col bg-background p-0 sm:max-w-md">
        <SheetHeader className="px-6 pt-6 pb-4 text-left border-b border-border/60">
          <SheetTitle className="flex items-center gap-2 font-display text-2xl text-primary">
            <ShoppingBag className="h-5 w-5" />
            Your Bag
            {items.length > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground font-sans">
                {items.reduce((s, i) => s + i.quantity, 0)} item(s)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="rounded-full bg-secondary p-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Your bag is empty</p>
              <p className="text-sm text-muted-foreground">Add something delicious!</p>
              <Button onClick={() => setDrawerOpen(false)} asChild variant="outline" className="rounded-full">
                <Link to="/products">Start Ordering</Link>
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 px-6">
                {/* Cart Items */}
                <div className="divide-y divide-border/60">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 py-5">
                      <Link to={`/products/${item.product.id}`} onClick={() => setDrawerOpen(false)} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col min-w-0">
                        <div className="flex justify-between gap-2">
                          <h4 className="font-display text-base font-semibold text-primary leading-tight">{item.product.name}</h4>
                          <p className="font-price text-base font-semibold text-primary shrink-0">₹{item.product.price * item.quantity}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.product.weight}</p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center rounded-full border border-border bg-card">
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity - 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-secondary disabled:opacity-30"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity + 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-secondary"
                              aria-label="Increase"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(item.product.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free shipping progress */}
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <div className="my-4 rounded-2xl bg-secondary/40 p-4">
                    <p className="text-xs font-medium text-primary/70">
                      Add <span className="font-semibold text-accent">₹{FREE_SHIPPING_THRESHOLD - subtotal}</span> more for FREE Shipping!
                    </p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} />
                    </div>
                  </div>
                )}

                {/* Coupon */}
                <div className="my-4">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between rounded-xl bg-accent/10 border border-accent/30 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">{appliedCoupon.code}</span>
                        <span className="text-xs text-muted-foreground">applied</span>
                      </div>
                      <button onClick={removeCoupon} className="text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Coupon code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                        className="rounded-full text-sm h-10"
                      />
                      <Button onClick={handleApplyCoupon} variant="outline" size="sm" className="rounded-full h-10 px-4 shrink-0">Apply</Button>
                    </div>
                  )}
                </div>

                {/* Delivery info */}
                <div className="my-4 rounded-2xl bg-primary/5 border border-primary/10 p-4 text-xs text-muted-foreground space-y-1">
                  <p className="font-semibold text-primary text-[11px] uppercase tracking-wider mb-2">Delivery Info</p>
                  <p>🚚 Estimated delivery: 3–5 business days</p>
                  <p>📦 Freshly baked & carefully packed</p>
                  <p>✅ {subtotal >= FREE_SHIPPING_THRESHOLD ? "Free shipping applied!" : `Free shipping on orders ₹${FREE_SHIPPING_THRESHOLD}+`}</p>
                </div>

                {/* Suggested */}
                {suggested.length > 0 && (
                  <div className="my-4">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">You may also love</p>
                    <div className="space-y-3">
                      {suggested.map((p) => (
                        <Link
                          key={p.id}
                          to={`/products/${p.id}`}
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-soft hover:shadow-warm transition-smooth"
                        >
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary truncate">{p.name}</p>
                            <p className="font-price text-sm text-accent font-semibold">₹{p.price}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pb-4" />
              </ScrollArea>

              {/* Footer summary */}
              <div className="border-t border-border/60 bg-card px-6 pt-5 pb-6">
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-price">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-accent">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-price">−₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-price">{shippingCharge === 0 ? <span className="text-accent font-medium">FREE</span> : `₹${shippingCharge}`}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-display text-xl font-semibold text-primary">
                    <span>Total</span>
                    <span className="font-price">₹{total}</span>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full rounded-full bg-primary py-6 text-base font-semibold shadow-elegant hover:bg-brown-deep">
                  <Link to="/checkout" onClick={() => setDrawerOpen(false)}>
                    Checkout Now
                  </Link>
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  100% Secure · Handmade with Love
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
