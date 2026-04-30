import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-cookies.jpg";
import aboutImg from "@/assets/about-bakery.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Heart, Leaf, Truck, Star } from "lucide-react";

const featured = products.slice(0, 4);

const reviews = [
  { name: "Ananya R.", text: "The choco chip cookies are heavenly — soft, gooey and so fresh. My new favourite!", rating: 5 },
  { name: "Rahul M.", text: "Ordered the gift box for my mom's birthday. Beautifully packed and tasted divine.", rating: 5 },
  { name: "Sneha K.", text: "Walnut brownies are next level. You can really taste the quality of ingredients.", rating: 5 },
];

const Index = () => {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-warm">
        <div className="container grid items-center gap-12 py-16 md:grid-cols-2 md:py-24 lg:py-32">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Premium Homemade Bakery
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-primary md:text-6xl lg:text-7xl">
              Baked with love.<br />
              <span className="italic text-accent">Made to comfort.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
              Freshly baked cookies, brownies and more — crafted in small batches with the
              finest ingredients. Soft, rich and unforgettable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-primary px-8 text-primary-foreground shadow-warm hover:bg-brown-deep">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20 bg-background px-8 hover:bg-secondary">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-accent" /> 100% Homemade</div>
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> All India Delivery</div>
              <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-accent" /> Small batch baked</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-accent/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-elegant">
              <img
                src={heroImg}
                alt="Stack of freshly baked chocolate chip cookies on cream parchment"
                width={1920}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card px-5 py-4 shadow-elegant md:block">
              <p className="font-display text-2xl font-semibold text-primary">4.9 ★</p>
              <p className="text-xs text-muted-foreground">Loved by 1,000+ customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container py-20 md:py-28">
        <div className="flex flex-col items-end justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Bestsellers</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">
              Freshly baked favourites
            </h2>
          </div>
          <Link to="/products" className="text-sm font-medium text-accent hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container grid items-center gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] shadow-elegant">
            <img
              src={aboutImg}
              alt="Assorted homemade cookies on linen"
              loading="lazy"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Story</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">
              A bakery built on<br />real ingredients & love.
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              At Crumbel, every cookie and brownie is made by hand, in small batches, using
              real butter, premium chocolate and zero shortcuts. We believe great baking is
              about patience, care and using ingredients you'd be proud to share.
            </p>
            <Button asChild className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-brown-deep">
              <Link to="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="container py-20 md:py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">What customers say</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">
            Sweet words from sweeter souls
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl bg-card p-7 shadow-soft">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 font-display text-xl leading-relaxed text-primary">"{r.text}"</p>
              <p className="mt-5 text-sm font-medium text-muted-foreground">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="container pb-24">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-brown px-8 py-14 text-center shadow-elegant md:px-16 md:py-20">
          <h2 className="font-display text-4xl font-semibold text-primary-foreground md:text-5xl">
            Treat yourself today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80">
            Order our combo packs for a perfect mix of cookies and brownies — beautifully boxed
            and delivered fresh across India.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-accent px-10 text-accent-foreground hover:bg-caramel">
            <Link to="/products">Shop Combo Packs</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Index;
