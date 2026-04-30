import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { MessageCircle, Plus } from "lucide-react";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();

  const handleAdd = () => {
    add(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to={`/products/${product.id}`} className="flex flex-1 flex-col">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-primary">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.weight}</p>
          <div className="mt-3 flex items-center justify-between">
            <p className="font-display text-2xl font-semibold text-primary">
              {"\u20B9"}
              {product.price}
            </p>
            <span className="text-xs font-medium text-accent transition-smooth group-hover:underline">
              View {"\u2192"}
            </span>
          </div>
        </Link>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-primary/20 bg-background px-3 text-sm font-semibold text-primary transition-smooth hover:bg-secondary"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
          <a
            href={getProductWhatsAppUrl(product)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Order ${product.name} on WhatsApp`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 text-sm font-semibold text-white shadow-warm transition-smooth hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
};
