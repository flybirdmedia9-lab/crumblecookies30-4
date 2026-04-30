import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const { items } = useWishlist();

  return (
    <main>
      <section className="bg-background border-b border-border/40">
        <div className="container py-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Saved for later</p>
          <h1 className="mt-2 font-display text-5xl font-semibold text-primary md:text-6xl">Your Wishlist</h1>
        </div>
      </section>

      <section className="container py-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-24 text-center">
            <div className="rounded-full bg-secondary p-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl text-primary">Nothing saved yet</h2>
            <p className="text-muted-foreground">Heart products you love to find them here.</p>
            <Button asChild className="rounded-full bg-primary text-primary-foreground shadow-warm hover:bg-brown-deep">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-8 text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""} saved</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((i) => <ProductCard key={i.product.id} product={i.product} />)}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Wishlist;
