import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGE_STYLES: Record<string, string> = {
  Bestseller: "bg-accent text-accent-foreground",
  Featured: "bg-primary text-primary-foreground",
  "New Arrival": "bg-secondary text-secondary-foreground",
  "New Stock": "bg-secondary text-secondary-foreground",
  "Limited Stock": "bg-accent text-accent-foreground opacity-90",
  "Out of Stock": "bg-muted text-muted-foreground",
  Premium: "bg-primary text-primary-foreground",
  "Gift Ready": "bg-accent text-accent-foreground",
};

export const ProductCard = ({ product }: { product: Product }) => {
  const { add, setDrawerOpen } = useCart();
  const { toggle, has } = useWishlist();
  const wishlisted = has(product.id);

  const handleAdd = () => {
    add(product);
    setDrawerOpen(true);
    toast.success(`${product.name} added to bag`);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
      <Link to={`/products/${product.id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
          {product.badge && (
            <span className={cn("absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider", BADGE_STYLES[product.badge] ?? "bg-accent text-accent-foreground")}>
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => { e.preventDefault(); toggle(product); toast(wishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
        className={cn(
          "absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-soft transition-smooth hover:scale-110",
          wishlisted ? "text-destructive" : "text-muted-foreground"
        )}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}
      >
        <Heart className="h-4 w-4" fill={wishlisted ? "currentColor" : "none"} />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <Link to={`/products/${product.id}`} className="flex flex-1 flex-col">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-primary leading-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.weight}</p>

          {product.rating && (
            <div className="mt-2 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-accent" fill="currentColor" />
              <span className="text-xs font-medium text-muted-foreground">{product.rating} ({product.reviewCount})</span>
            </div>
          )}

          <div className="mt-3 flex items-baseline gap-2">
            <p className="font-price text-2xl font-semibold text-primary">₹{product.price}</p>
            {product.discountPrice && (
              <p className="font-price text-sm text-muted-foreground line-through">₹{product.discountPrice}</p>
            )}
          </div>
        </Link>

        <div className="mt-4">
          <Button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="w-full rounded-full bg-primary py-5 text-sm font-semibold text-primary-foreground shadow-warm transition-smooth hover:bg-brown-deep disabled:opacity-60"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
          </Button>
        </div>
      </div>
    </article>
  );
};
