import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, User, Heart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const mainNavItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Order" },
];

const sideNavMain = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Order" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
  { to: "/track", label: "Track Your Order" },
];

const sideNavPolicies = [
  { to: "/shipping", label: "Shipping Policy" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/refund", label: "Refund Policy" },
];

export const Header = () => {
  const { count, setDrawerOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="container relative flex h-16 items-center justify-between md:h-20">

        {/* LEFT: Hamburger + main nav */}
        <div className="flex items-center gap-1 md:gap-3">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-smooth hover:bg-secondary"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background sm:w-[360px] p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="px-6 pt-6 pb-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="font-display text-2xl text-primary">Crumbel</SheetTitle>
                  </div>
                  <p className="text-xs text-muted-foreground">Premium Homemade Bakery</p>
                </SheetHeader>
                <Separator />
                <nav className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="space-y-1">
                    {sideNavMain.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-center rounded-xl px-3 py-3 text-base font-medium transition-smooth hover:bg-secondary hover:text-accent",
                          pathname === item.to ? "bg-secondary text-accent" : "text-foreground/80",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Policies
                  </p>
                  <div className="space-y-1">
                    {sideNavPolicies.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-smooth hover:bg-secondary hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                <div className="border-t border-border/60 px-6 py-5">
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-primary transition-smooth hover:bg-accent hover:text-accent-foreground"
                  >
                    <User className="h-4 w-4" />
                    {user ? user.name : "Sign In / Register"}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <nav className="hidden items-center gap-1 md:flex">
            {mainNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-smooth hover:bg-secondary hover:text-accent",
                  pathname === item.to ? "text-accent" : "text-foreground/80",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER: Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link to="/" className="flex flex-col items-center">
            <span className="font-display text-2xl font-semibold tracking-tight text-primary md:text-3xl">
              Crumbel
            </span>
            <span className="hidden text-[8px] uppercase tracking-[0.3em] text-muted-foreground lg:inline">
              Homemade Bakery
            </span>
          </Link>
        </div>

        {/* RIGHT: Account + Wishlist + Bag */}
        <div className="flex items-center gap-1">
          <Link
            to="/account"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-smooth hover:bg-secondary"
            aria-label="Account"
          >
            <User className="h-4 w-4" />
          </Link>
          <Link
            to="/wishlist"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-smooth hover:bg-secondary"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-smooth hover:bg-secondary"
            aria-label="Bag"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
