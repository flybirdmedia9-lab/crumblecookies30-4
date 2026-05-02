import { useMemo, useState } from "react";
import { products as allProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const categories = ["All", "Cookies", "Brownies", "Combo Packs"] as const;
type Cat = typeof categories[number];

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "bestseller" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  default: "Default",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Best Rated",
  bestseller: "Bestseller",
  newest: "New Arrivals",
};

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Cat>("All");
  const [sort, setSort] = useState<SortOption>("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...allProducts].filter((p) => p.isEnabled);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q));
    }

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    list = list.filter((p) => p.price >= min && p.price <= max);

    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
      case "bestseller": list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)); break;
      case "newest": list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }

    return list;
  }, [search, category, sort, minPrice, maxPrice]);

  const hasFilters = search || category !== "All" || sort !== "default" || minPrice || maxPrice;

  const clearAll = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <main>
      <section className="bg-background border-b border-border/40">
        <div className="container py-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Shop Treats</p>
          <h1 className="mt-2 font-display text-5xl font-semibold text-primary md:text-6xl">Freshly Baked, Just for You</h1>
          <p className="mx-auto mt-3 max-w-xl text-primary/90 text-lg">
            Indulge in soft cookies, rich brownies & handcrafted combos — baked fresh, delivered with love.
          </p>
        </div>
      </section>

      <section className="container py-8 md:py-10">
        {/* Sort + Filter bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end mb-8">
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm h-11 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {Object.entries(SORT_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>

            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full h-11 gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {hasFilters && <span className="h-2 w-2 rounded-full bg-accent" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Category</p>
                    <div className="flex flex-col gap-2">
                      {categories.map((c) => (
                        <button
                          key={c}
                          onClick={() => setCategory(c)}
                          className={`rounded-xl px-4 py-2.5 text-sm font-medium text-left transition-smooth ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Price Range</p>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Min ₹" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="rounded-xl" type="number" />
                      <span className="text-muted-foreground">–</span>
                      <Input placeholder="Max ₹" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="rounded-xl" type="number" />
                    </div>
                  </div>
                  <Separator />
                  <Button onClick={() => { clearAll(); setFilterOpen(false); }} variant="outline" className="w-full rounded-full">Clear All</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Category pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-smooth ${category === c ? "bg-primary text-primary-foreground shadow-warm" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}
            >
              {c}
            </button>
          ))}
          {hasFilters && (
            <button onClick={clearAll} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-accent flex items-center gap-1">
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-display text-muted-foreground">No products found.</p>
            <button onClick={clearAll} className="mt-4 text-sm text-accent hover:underline">Clear filters</button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Products;
