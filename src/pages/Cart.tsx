import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, updateQty, remove, subtotal, count } = useCart();

  if (count === 0) {
    return (
      <main className="container py-24 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-6 font-display text-4xl text-primary">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Looks like you haven't added anything sweet yet.</p>
        <Button asChild className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-brown-deep">
          <Link to="/products">Start shopping</Link>
        </Button>
      </main>
    );
  }

  const shipping = subtotal >= 599 ? 0 : 60;
  const total = subtotal + shipping;

  return (
    <main className="container py-12 md:py-16">
      <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">Your cart</h1>
      <p className="mt-2 text-muted-foreground">{count} item{count > 1 ? "s" : ""}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-2xl bg-card p-4 shadow-soft sm:p-5">
              <Link to={`/products/${product.id}`} className="shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {product.category}
                    </p>
                    <Link to={`/products/${product.id}`} className="mt-0.5 block font-display text-lg font-semibold text-primary hover:text-accent">
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{product.weight}</p>
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    className="text-muted-foreground transition-smooth hover:text-destructive"
                    aria-label="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-border bg-background">
                    <button
                      onClick={() => updateQty(product.id, quantity - 1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQty(product.id, quantity + 1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="font-display text-lg font-semibold text-primary">
                    ₹{product.price * quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl bg-secondary/50 p-6 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-primary">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-accent">Add ₹{599 - subtotal} more for free shipping</p>
            )}
          </div>
          <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
            <span className="font-display text-lg text-primary">Total</span>
            <span className="font-display text-2xl font-semibold text-primary">₹{total}</span>
          </div>
          <Button asChild size="lg" className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link to="/products">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
