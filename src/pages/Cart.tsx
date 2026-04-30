import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const Cart = () => {
  const { items, updateQty, remove, subtotal, discount, shippingCharge, total, count, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");

  const handleApply = () => {
    const r = applyCoupon(couponInput.trim());
    if (r.success) { toast.success(r.message); setCouponInput(""); }
    else toast.error(r.message);
  };

  const suggested = products.filter((p) => !items.some((i) => i.product.id === p.id)).slice(0, 3);

  if (count === 0) {
    return (
      <main className="container py-24 text-center">
        <ShoppingBag className="mx-auto h-14 w-14 text-muted-foreground" />
        <h1 className="mt-6 font-display text-4xl text-primary">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">Add something delicious!</p>
        <Button asChild className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-brown-deep">
          <Link to="/products">Browse Products</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container py-10 md:py-14">
      <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">Your Bag</h1>
      <p className="mt-1 text-muted-foreground">{count} item{count > 1 ? "s" : ""}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-2xl bg-card p-4 shadow-soft sm:p-5">
              <Link to={`/products/${product.id}`} className="shrink-0">
                <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28" />
              </Link>
              <div className="flex flex-1 flex-col min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{product.category}</p>
                    <Link to={`/products/${product.id}`} className="mt-0.5 block font-display text-lg font-semibold text-primary hover:text-accent">{product.name}</Link>
                    <p className="text-xs text-muted-foreground">{product.weight}</p>
                  </div>
                  <p className="font-price text-lg font-semibold text-primary shrink-0">₹{product.price * quantity}</p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-border bg-background">
                    <button onClick={() => updateQty(product.id, quantity - 1)} disabled={quantity <= 1} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary disabled:opacity-30" aria-label="Decrease">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <button onClick={() => updateQty(product.id, quantity + 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary" aria-label="Increase">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button onClick={() => remove(product.id)} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-smooth" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-primary mb-5">Order Summary</h2>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="font-price">₹{subtotal}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-accent"><span>Discount ({appliedCoupon?.code})</span><span className="font-price">−₹{discount}</span></div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-price">{shippingCharge === 0 ? <span className="text-accent font-medium">FREE</span> : `₹${shippingCharge}`}</span>
              </div>
              {shippingCharge > 0 && <p className="text-xs text-accent">Add ₹{599 - subtotal} more for free shipping</p>}
            </div>

            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="font-display text-xl text-primary">Total</span>
              <span className="font-price text-2xl font-semibold text-primary">₹{total}</span>
            </div>

            <Button asChild size="lg" className="mt-6 w-full rounded-full bg-primary text-primary-foreground shadow-warm hover:bg-brown-deep">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full rounded-full">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>

          {/* Coupon */}
          <div className="rounded-2xl bg-card p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Have a coupon?</p>
            {appliedCoupon ? (
              <div className="flex items-center justify-between rounded-xl bg-accent/10 border border-accent/30 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">{appliedCoupon.code}</span>
                  <span className="text-xs text-muted-foreground">— saving ₹{discount}</span>
                </div>
                <button onClick={removeCoupon} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input placeholder="Enter code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleApply()} className="rounded-full h-10 text-sm" />
                <Button onClick={handleApply} variant="outline" size="sm" className="rounded-full h-10 px-4 shrink-0">Apply</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggested */}
      {suggested.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8">You may also love</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggested.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;
