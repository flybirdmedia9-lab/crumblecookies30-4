import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getProduct, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { Minus, Plus, ChevronLeft, Truck, Leaf, ShieldCheck, MessageCircle } from "lucide-react";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? getProduct(id) : undefined;
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <main className="container py-24 text-center">
        <h1 className="font-display text-4xl text-primary">Product not found</h1>
        <Button asChild className="mt-6"><Link to="/products">Back to shop</Link></Button>
      </main>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    add(product, qty);
    toast.success(`${qty} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    add(product, qty);
    navigate("/checkout");
  };

  return (
    <main>
      <div className="container pt-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
      </div>

      <section className="container grid gap-12 py-10 md:grid-cols-2 md:py-16">
        <div className="overflow-hidden rounded-[2rem] bg-secondary shadow-elegant">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {product.category}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-muted-foreground">{product.weight}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-primary">₹{product.price}</span>
            <span className="text-sm text-muted-foreground">incl. of all taxes</span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-foreground/80">{product.description}</p>

          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ingredients</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-secondary"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-secondary"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button onClick={handleAdd} size="lg" variant="outline" className="rounded-full border-primary/30 hover:bg-secondary">
              Add to Cart
            </Button>
            <Button onClick={handleBuyNow} size="lg" className="rounded-full bg-primary px-8 text-primary-foreground shadow-warm hover:bg-brown-deep">
              Buy Now
            </Button>
            <Button asChild size="lg" className="rounded-full bg-[#25D366] px-8 text-white shadow-warm hover:bg-[#1EBE57]">
              <a href={getProductWhatsAppUrl(product, qty)} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 rounded-2xl bg-secondary/50 p-5 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> All India delivery</div>
            <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-accent" /> 100% homemade</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Freshly baked</div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">You may also love</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
