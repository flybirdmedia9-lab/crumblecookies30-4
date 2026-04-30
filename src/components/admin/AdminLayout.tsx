import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag, BarChart2,
  Truck, Star, FileText, LogOut, Menu, X, ShieldCheck
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/coupons", label: "Coupons", icon: Tag },
  { to: "/admin/inventory", label: "Inventory", icon: BarChart2 },
  { to: "/admin/shipping", label: "Shipping", icon: Truck },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/content", label: "Content", icon: FileText },
];

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { admin, logoutAdmin } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  const isActive = (to: string, exact?: boolean) => exact ? pathname === to : pathname.startsWith(to);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border/60 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <ShieldCheck className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-primary">Crumbel</p>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV.map(({ to, label, icon: Icon, exact }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setSideOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth",
              isActive(to, exact) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-primary"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border/60 p-4">
        <div className="mb-3 px-2">
          <p className="text-xs font-semibold text-primary truncate">{admin?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{admin?.role}</p>
        </div>
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-smooth">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-secondary/20">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border/60 bg-background md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sideOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSideOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-background shadow-elegant">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/60 bg-background/95 px-4 backdrop-blur-md">
          <button onClick={() => setSideOpen(true)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-secondary md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <p className="font-display text-lg font-semibold text-primary hidden md:block">
            {NAV.find((n) => isActive(n.to, n.exact))?.label ?? "Admin"}
          </p>
          <Link to="/" className="ml-auto text-xs text-muted-foreground hover:text-accent" target="_blank">View Store ↗</Link>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
