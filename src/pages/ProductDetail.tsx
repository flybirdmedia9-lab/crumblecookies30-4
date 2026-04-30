import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { getProduct, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { Minus, Plus, ChevronLeft, Truck, Leaf, ShieldCheck, Heart, Star, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGE_STYLES: Record<string, string> = {
  Bestseller: "bg-accent text-accent-foreground",
  Featured: "bg-primary text-primary-foreground",
  "New Arrival": "bg-green-600 text-white",
  Premium: "bg-primary text-primary-foreground",
  "Gift Ready": "bg-accent text-accent-foreground",
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const { add, setDrawerOpen } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const wishlisted = product ? has(product.id) : false;

  if (!product) {
    return (
      <main className="container py-24 text-center">
        <h1 className="font-display text-4xl text-primary">Product not found</h1>
        <Button asChild className="mt-6 rounded-full"><Link to="/products">Back to Order</Link></Button>
      </main>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const otherRelated = related.length < 3 ? [...related, ...products.filter((p) => p.id !== product.id && !related.includes(p)).slice(0, 3 - related.length)] : related;

  const handleAdd = () => {
    add(product, qty);
    setDrawerOpen(true);
    toast.success(`${qty} × ${product.name} added to bag`);
  };

  const handleBuyNow = () => {
    add(product, qty);
    setDrawerOpen(true);
  };

  return (
    <main>
      <div className="container pt-6">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-accent">
          <ChevronLeft className="h-4 w-4" /> Back to Order
        </Link>
      </div>

      <section className="container grid gap-10 py-8 md:grid-cols-2 md:py-12">
        {/* Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-secondary shadow-elegant aspect-square">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {product.badge && (
            <span className={cn("absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider", BADGE_STYLES[product.badge] ?? "bg-accent text-accent-foreground")}>
              {product.badge}
            </span>
          )}
          <button
            onClick={() => { toggle(product); toast(wishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
            className={cn("absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm shadow-warm transition-smooth hover:scale-110", wishlisted ? "text-destructive" : "text-muted-foreground")}
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl leading-tight">{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className={cn("h-4 w-4", i <= Math.round(product.rating!) ? "text-accent" : "text-muted-foreground/30")} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
          )}

          <p className="mt-2 text-sm text-muted-foreground">{product.weight}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-price text-4xl font-bold text-primary">₹{product.price}</span>
            {product.discountPrice && <span className="font-price text-lg text-muted-foreground line-through">₹{product.discountPrice}</span>}
            <span className="text-xs text-muted-foreground">incl. taxes</span>
          </div>

          {/* Stock */}
          <div className="mt-3 flex items-center gap-2">
            <Package className="h-4 w-4 text-accent" />
            <span className={cn("text-sm font-medium", product.stock > 5 ? "text-green-600" : product.stock > 0 ? "text-orange-500" : "text-destructive")}>
              {product.stock > 5 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left!` : "Out of Stock"}
            </span>
          </div>

          <p className="mt-5 text-base leading-relaxed text-foreground/80">{product.description}</p>

          {/* Ingredients */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <span key={ing} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{ing}</span>
              ))}
            </div>
          </div>

          {/* Qty + Actions */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-border bg-card">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-secondary" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-secondary" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                onClick={() => { toggle(product); toast(wishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
                variant="outline" size="icon"
                className={cn("rounded-full h-11 w-11 border-border", wishlisted && "border-destructive/30 text-destructive")}
              >
                <Heart className="h-4 w-4" fill={wishlisted ? "currentColor" : "none"} />
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleAdd}
                disabled={product.stock === 0}
                variant="outline"
                size="lg"
                className="rounded-full border-primary/30 hover:bg-secondary flex-1"
              >
                Add to Bag
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                size="lg"
                className="rounded-full bg-primary px-8 text-primary-foreground shadow-warm hover:bg-brown-deep flex-1"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl bg-secondary/50 p-5 text-sm">
            <div className="flex flex-col items-center gap-1.5 text-center"><Truck className="h-5 w-5 text-accent" /><span className="text-xs">All India delivery</span></div>
            <div className="flex flex-col items-center gap-1.5 text-center"><Leaf className="h-5 w-5 text-accent" /><span className="text-xs">100% homemade</span></div>
            <div className="flex flex-col items-center gap-1.5 text-center"><ShieldCheck className="h-5 w-5 text-accent" /><span className="text-xs">Freshly baked</span></div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="container py-12 md:py-20">
        <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">You may also love</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherRelated.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
