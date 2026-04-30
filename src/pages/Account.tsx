import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Package, MapPin, LogOut, Heart, ChevronRight, Edit2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "profile" | "orders" | "addresses" | "wishlist";

const STATUS_COLORS: Record<string, string> = {
  Delivered: "text-green-600 bg-green-50",
  Shipped: "text-blue-600 bg-blue-50",
  "Out for Delivery": "text-blue-600 bg-blue-50",
  Pending: "text-orange-500 bg-orange-50",
  Confirmed: "text-primary bg-secondary",
  Processing: "text-primary bg-secondary",
  Packed: "text-primary bg-secondary",
  Cancelled: "text-destructive bg-destructive/10",
  Refunded: "text-destructive bg-destructive/10",
};

const Account = () => {
  const { user, logout, updateUser } = useAuth();
  const { getUserOrders } = useOrders();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? "", phone: user?.phone ?? "", email: user?.email ?? "" });

  if (!user) {
    return (
      <main className="container flex min-h-[70vh] items-center justify-center py-20">
        <div className="text-center">
          <User className="mx-auto h-14 w-14 text-muted-foreground" />
          <h1 className="mt-4 font-display text-3xl text-primary">Sign in to view your account</h1>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild className="rounded-full bg-primary text-primary-foreground shadow-warm hover:bg-brown-deep">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const orders = getUserOrders(user.id);

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    navigate("/");
  };

  const handleSave = () => {
    updateUser({ name: form.name, phone: form.phone });
    setEditing(false);
    toast.success("Profile updated");
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
  ];

  return (
    <main className="container py-10 md:py-14">
      <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">My Account</h1>
      <p className="mt-1 text-muted-foreground">Welcome back, {user.name}!</p>

      <div className="mt-8 grid gap-6 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-smooth",
                tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
          <Separator className="my-3" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-smooth"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </aside>

        {/* Content */}
        <div className="rounded-2xl bg-card border border-border/40 shadow-soft overflow-hidden">

          {/* Profile */}
          {tab === "profile" && (
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold text-primary">Personal Information</h2>
                {!editing && (
                  <Button onClick={() => setEditing(true)} variant="outline" size="sm" className="rounded-full gap-2">
                    <Edit2 className="h-3.5 w-3.5" /> Edit
                  </Button>
                )}
              </div>

              {editing ? (
                <div className="space-y-4 max-w-sm">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={form.email} disabled className="rounded-xl h-11 opacity-60" />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={handleSave} className="rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">Save</Button>
                    <Button onClick={() => setEditing(false)} variant="outline" className="rounded-full">Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {[
                    { label: "Name", value: user.name },
                    { label: "Email", value: user.email },
                    { label: "Phone", value: user.phone || "Not set" },
                    { label: "Member since", value: new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" }) },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="mt-1 text-base text-primary">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders */}
          {tab === "orders" && (
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-primary mb-6">My Orders</h2>
              {orders.length === 0 ? (
                <div className="py-12 text-center">
                  <Package className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-3 font-display text-xl text-primary">No orders yet</p>
                  <Button asChild className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">
                    <Link to="/products">Start Ordering</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between gap-4 rounded-xl border border-border/60 p-4 hover:bg-secondary/20 transition-smooth">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-semibold text-primary text-sm">{o.id}</span>
                          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_COLORS[o.orderStatus] ?? "bg-secondary text-primary")}>{o.orderStatus}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString("en-IN")} · {o.paymentMethod} · <span className="font-price font-semibold text-primary">₹{o.total}</span></p>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="shrink-0 rounded-full">
                        <Link to="/track" state={{ orderId: o.id }}>Track <ChevronRight className="h-3.5 w-3.5 ml-1" /></Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses */}
          {tab === "addresses" && (
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-primary mb-6">Saved Addresses</h2>
              {user.addresses.length === 0 ? (
                <div className="py-12 text-center">
                  <MapPin className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-3 text-muted-foreground">No saved addresses. Add one at checkout.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.addresses.map((a) => (
                    <div key={a.id} className="rounded-xl border border-border/60 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-primary">{a.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{a.line1}, {a.city}, {a.state} — {a.pin}</p>
                          <p className="text-sm text-muted-foreground">{a.phone}</p>
                        </div>
                        {a.isDefault && (
                          <span className="flex items-center gap-1 text-xs text-accent font-medium"><CheckCircle className="h-3.5 w-3.5" /> Default</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          {tab === "wishlist" && (
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-primary mb-6">Wishlist</h2>
              {wishlistItems.length === 0 ? (
                <div className="py-12 text-center">
                  <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-3 text-muted-foreground">Nothing saved yet.</p>
                  <Button asChild className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {wishlistItems.map((i) => (
                    <Link key={i.product.id} to={`/products/${i.product.id}`} className="flex items-center gap-3 rounded-xl border border-border/60 p-3 hover:bg-secondary/20 transition-smooth">
                      <img src={i.product.image} alt={i.product.name} className="h-14 w-14 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-primary text-sm truncate">{i.product.name}</p>
                        <p className="font-price text-sm text-accent font-semibold">₹{i.product.price}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default Account;
