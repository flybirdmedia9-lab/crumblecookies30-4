import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => (
  <footer className="mt-24 border-t border-border/60 bg-secondary/40">
    <div className="container grid gap-10 py-14 md:grid-cols-4">
      <div className="md:col-span-2">
        <h3 className="font-display text-3xl font-semibold text-primary">Crumbel</h3>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          Premium homemade bakery crafting freshly baked cookies, brownies and more — with love
          and high-quality ingredients. Soft, rich and made to bring comfort and joy.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary shadow-soft transition-smooth hover:bg-accent hover:text-accent-foreground"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="mailto:crumblefoods@gmail.com"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary shadow-soft transition-smooth hover:bg-accent hover:text-accent-foreground"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="tel:+919100822844"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary shadow-soft transition-smooth hover:bg-accent hover:text-accent-foreground"
            aria-label="Phone"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li><Link to="/" className="text-muted-foreground transition-smooth hover:text-accent">Home</Link></li>
          <li><Link to="/products" className="text-muted-foreground transition-smooth hover:text-accent">Shop</Link></li>
          <li><Link to="/about" className="text-muted-foreground transition-smooth hover:text-accent">About</Link></li>
          <li><Link to="/contact" className="text-muted-foreground transition-smooth hover:text-accent">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Reach Us</h4>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>Kondapur Village, Motakondur Mandal, Yadadri Dist, Telangana</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-accent" />
            <a href="tel:+919100822844" className="hover:text-accent">+91 91008 22844</a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-accent" />
            <a href="mailto:crumblefoods@gmail.com" className="hover:text-accent">crumblefoods@gmail.com</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/60">
      <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Crumbel Homemade Bakery. All rights reserved.</p>
        <p>Freshly baked · Delivered across India</p>
      </div>
    </div>
  </footer>
);
