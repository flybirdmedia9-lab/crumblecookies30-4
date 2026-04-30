import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => (
  <footer className="mt-20 border-t border-border/60 bg-background">
    <div className="container grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">

      {/* Brand */}
      <div className="sm:col-span-2 md:col-span-1">
        <h3 className="font-display text-3xl font-semibold text-primary">Crumbel</h3>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          Premium homemade bakery crafting freshly baked cookies and brownies with love, right from Yadadri.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary shadow-soft transition-smooth hover:bg-accent hover:text-accent-foreground"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="mailto:crumblefoods@gmail.com"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary shadow-soft transition-smooth hover:bg-accent hover:text-accent-foreground"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Quick Links</h4>
        <ul className="mt-4 space-y-2.5 text-sm">
          <li><Link to="/" className="text-muted-foreground transition-smooth hover:text-accent">Home</Link></li>
          <li><Link to="/products" className="text-muted-foreground transition-smooth hover:text-accent">Order Now</Link></li>
          <li><Link to="/wishlist" className="text-muted-foreground transition-smooth hover:text-accent">Wishlist</Link></li>
          <li><Link to="/about" className="text-muted-foreground transition-smooth hover:text-accent">Our Story</Link></li>
          <li><Link to="/track" className="text-muted-foreground transition-smooth hover:text-accent">Track Order</Link></li>
          <li><Link to="/contact" className="text-muted-foreground transition-smooth hover:text-accent">Contact Us</Link></li>
          <li><Link to="/faq" className="text-muted-foreground transition-smooth hover:text-accent">FAQ</Link></li>
        </ul>
      </div>

      {/* Policies */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Policies</h4>
        <ul className="mt-4 space-y-2.5 text-sm">
          <li><Link to="/shipping" className="text-muted-foreground transition-smooth hover:text-accent">Shipping Policy</Link></li>
          <li><Link to="/refund" className="text-muted-foreground transition-smooth hover:text-accent">Refund Policy</Link></li>
          <li><Link to="/privacy" className="text-muted-foreground transition-smooth hover:text-accent">Privacy Policy</Link></li>
          <li><Link to="/terms" className="text-muted-foreground transition-smooth hover:text-accent">Terms & Conditions</Link></li>
        </ul>
      </div>

      {/* Reach Us */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Reach Us</h4>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>Yadadri, Telangana</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-accent" />
            <a href="tel:+919493115421" className="hover:text-accent">+91 94931 15421</a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-accent" />
            <a href="mailto:crumblefoods@gmail.com" className="hover:text-accent break-all">crumblefoods@gmail.com</a>
          </li>
        </ul>
      </div>

    </div>

    <div className="border-t border-border/60">
      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-[10px] uppercase tracking-widest text-muted-foreground/60 sm:flex-row">
        <p>© {new Date().getFullYear()} Crumbel. All rights reserved.</p>
        <p>Handmade · Small Batches · Delivered India-Wide</p>
      </div>
    </div>
  </footer>
);
