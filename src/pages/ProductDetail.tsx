import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { getProduct, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { Minus, Plus, ChevronLeft, ChevronRight, Truck, Leaf, ShieldCheck, Heart, Star, Package } from "lucide-react";
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
  const [activeImg, setActiveImg] = useState(0);
  const wishlisted = product ? has(product.id) : false;

  if (!product) {
    return (
      <main className="container py-24 text-center">
        <h1 className="font-display text-4xl text-primary">Product not found</h1>
        <Button asChild className="mt-6 rounded-full"><Link to="/products">Back to Shop</Link></Button>
      </main>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const otherRelated = related.length < 3 ? [...related, ...products.filter((p) => p.id !== product.id && !related.includes(p)).slice(0, 3 - related.length)] : related;

  const handleAdd = () => {
    add(product, qty);
    setDrawerOpen(true);
    toast.success(`${qty} × ${product.name} added to cart`);
  };

  const prevImg = () => setActiveImg((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImg = () => setActiveImg((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <main>
      <div className="container pt-6">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-accent">
          <ChevronLeft className="h-4 w-4" /> Back to Shop
        </Link>
      </div>

      <section className="container grid gap-10 py-8 md:grid-cols-2 md:py-12">
        {/* Image Slider */}
        <div className="flex flex-col gap-3">
          {/* Main image */}
          <div className="relative overflow-hidden rounded-[2rem] bg-secondary shadow-elegant aspect-square">
            <img
              src={images[activeImg]}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-500"
            />
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

            {/* Prev / Next arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow text-primary hover:bg-background transition-smooth"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow text-primary hover:bg-background transition-smooth"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={cn("h-1.5 rounded-full transition-all duration-300", i === activeImg ? "w-5 bg-primary" : "w-1.5 bg-primary/30")}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "flex-1 overflow-hidden rounded-xl aspect-square transition-all duration-200",
                    i === activeImg ? "ring-2 ring-primary ring-offset-2" : "opacity-60 hover:opacity-90"
                  )}
                >
                  <img src={src} alt={`View ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
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

          {/* Ingredients — subtle, comma-separated inline list */}
          <div className="mt-5 border-t border-border/40 pt-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/70">Ingredients · </span>
            <span className="text-xs text-muted-foreground/70">
              {product.ingredients.join(", ")}
            </span>
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
                size="lg"
                className="rounded-full bg-primary px-8 text-primary-foreground shadow-warm hover:opacity-90 flex-1"
              >
                Add to Cart
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
        <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">Craving More?</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherRelated.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
