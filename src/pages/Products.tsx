import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const categories = ["All", "Cookies", "Brownies", "Combo Packs"] as const;
type Cat = typeof categories[number];

const Products = () => {
  const [active, setActive] = useState<Cat>("All");
  const filtered = useMemo(
    () => (active === "All" ? products : products.filter((p) => p.category === active)),
    [active],
  );

  return (
    <main>
      <section className="bg-gradient-warm">
        <div className="container py-16 text-center md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Bakery</p>
          <h1 className="mt-3 font-display text-5xl font-semibold text-primary md:text-6xl">
            Shop the collection
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Soft cookies, fudgy brownies and indulgent combo packs — baked fresh, delivered with care.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-smooth ${
                active === c
                  ? "bg-primary text-primary-foreground shadow-warm"
                  : "bg-secondary text-secondary-foreground hover:bg-beige-deep"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Products;
