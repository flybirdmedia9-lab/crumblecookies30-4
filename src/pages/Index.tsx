import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-cookies.jpg";
import aboutImg from "@/assets/about-bakery.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Heart, Leaf, Truck, Star, Zap, Gift, Clock } from "lucide-react";

const featured = products.filter((p) => p.isFeatured);
const bestsellers = products.filter((p) => p.isBestseller);
const newArrivals = products.filter((p) => p.isNew);

const reviews = [
  { name: "Ananya R.", text: "The choco chip cookies are heavenly — soft, gooey and so fresh. My new favourite!", rating: 5 },
  { name: "Rahul M.", text: "Ordered the gift box for my mom's birthday. Beautifully packed and tasted divine.", rating: 5 },
  { name: "Sneha K.", text: "Walnut brownies are next level. You can really taste the quality of ingredients.", rating: 5 },
];

const Index = () => {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        <div className="container grid items-center gap-8 py-6 md:grid-cols-2 md:py-10 lg:py-14">
          <div className="animate-fade-up text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Premium Homemade Bakery · Yadadri
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] text-primary md:text-6xl lg:text-7xl">
              Baked with love.<br />
              <span className="italic text-accent">Made to comfort.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg mx-auto md:mx-0">
              Freshly baked cookies, brownies and more — crafted in small batches with the
              finest ingredients. Soft, rich and unforgettable.
            </p>
            <div className="mt-7 flex flex-wrap justify-center md:justify-start gap-3">
              <Button asChild size="lg" className="rounded-full bg-primary px-8 text-primary-foreground shadow-warm hover:bg-brown-deep">
                <Link to="/products">Order Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20 bg-background px-8 hover:bg-secondary">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-accent" /> 100% Homemade</div>
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> All India Delivery</div>
              <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-accent" /> Small batch baked</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-accent/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-elegant">
              <img
                src={heroImg}
                alt="Stack of freshly baked chocolate chip cookies"
                className="h-full w-full object-cover aspect-[4/3] md:aspect-square"
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 rounded-2xl bg-background/90 backdrop-blur-sm p-3 shadow-warm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="h-3 w-3 text-accent" fill="currentColor" />)}
                  </div>
                  <span className="text-xs font-semibold text-primary">5.0 · 120+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS STRIP - Levain Light Blue */}
      <section className="bg-secondary/40 border-y border-border/20">
        <div className="container py-4">
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-primary/80">
            <div className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-accent" /> Use code <span className="text-accent">FIRST50</span></div>
            <div className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-accent" /> Free shipping on ₹599+</div>
            <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-accent" /> Baked fresh to order</div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container py-16 md:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Handpicked for you</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">Featured Products</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products" className="text-sm font-semibold uppercase tracking-widest text-accent hover:underline">
            View All Products →
          </Link>
        </div>
      </section>

      {/* BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="bg-secondary/30 py-16 md:py-20">
          <div className="container">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Most loved</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">
                Freshly Baked Favourites
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="container py-16 md:py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Just arrived</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">New Arrivals</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ABOUT STRIP */}
      <section className="bg-background py-16 md:py-24">
        <div className="container grid items-center gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] shadow-elegant order-2 md:order-1">
            <img src={aboutImg} alt="Assorted homemade cookies on linen" loading="lazy" className="h-full w-full object-cover aspect-[4/3]" />
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Story</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">
              A bakery built on<br />real ingredients & love.
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              At Crumbel, every cookie and brownie is made by hand, in small batches, using
              real butter, premium chocolate and zero shortcuts.
            </p>
            <Button asChild className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-brown-deep">
              <Link to="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="container py-16 md:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">What customers say</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">
            Sweet words from sweeter souls
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl bg-card p-8 shadow-soft border border-border/40">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" />)}
              </div>
              <p className="mt-4 font-display text-xl leading-relaxed text-primary italic">"{r.text}"</p>
              <p className="mt-5 text-sm font-medium text-muted-foreground">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="container pb-20">
        <div className="overflow-hidden rounded-[2rem] bg-primary px-8 py-14 text-center shadow-elegant md:px-16 md:py-20">
          <h2 className="font-display text-4xl font-semibold text-primary-foreground md:text-5xl">
            Treat yourself today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80">
            Order our combo packs for a perfect mix of cookies and brownies — beautifully boxed and delivered fresh.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-accent px-10 text-accent-foreground hover:opacity-90">
            <Link to="/products">Order Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Index;
