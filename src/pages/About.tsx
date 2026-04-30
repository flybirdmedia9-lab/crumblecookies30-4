import aboutImg from "@/assets/about-bakery.jpg";
import { Heart, Leaf, Sparkles, Truck } from "lucide-react";

const values = [
  { icon: Heart, title: "Made with love", text: "Every batch is hand-crafted with attention to detail and care." },
  { icon: Leaf, title: "Real ingredients", text: "Real butter, premium chocolate, fresh eggs — nothing artificial." },
  { icon: Sparkles, title: "Small batch", text: "Baked in small batches so every bite tastes its absolute best." },
  { icon: Truck, title: "Pan-India delivery", text: "Freshly packed and shipped across India with trusted partners." },
];

const About = () => {
  return (
    <main>
      <section className="bg-gradient-warm">
        <div className="container py-20 text-center md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Story</p>
          <h1 className="mt-3 font-display text-5xl font-semibold text-primary md:text-6xl">
            Baked at home.<br /><span className="italic text-accent">Loved everywhere.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
            Crumbel began with a simple idea — that homemade baking, done with quality and
            patience, brings joy unlike anything else.
          </p>
        </div>
      </section>

      <section className="container grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="overflow-hidden rounded-[2rem] shadow-elegant">
          <img src={aboutImg} alt="Crumbel cookies" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-4xl font-semibold text-primary md:text-5xl">
            Where every cookie tells a story
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80">
            <p>
              Crumbel is a premium homemade bakery brand crafting freshly baked cookies, brownies
              and more — with love and high-quality ingredients. Every bite is soft, rich and made
              to bring comfort and joy.
            </p>
            <p>
              From our kitchen in Telangana, we bake in small batches, package each order by hand,
              and ship freshly across India. We believe in using only the finest ingredients —
              real butter, premium Belgian chocolate, fresh eggs and pure vanilla — because great
              taste begins with great ingredients.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">What we stand for</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">Our values</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-card p-7 text-center shadow-soft">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
