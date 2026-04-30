import { useOrders } from "@/context/OrderContext";
import { products } from "@/data/products";
import { getItem, KEYS } from "@/lib/storage";
import { mockUsers } from "@/data/mockData";
import type { User } from "@/types";
import { ShoppingCart, Package, Users, TrendingUp, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  Delivered: "text-green-600 bg-green-50",
  Shipped: "text-blue-600 bg-blue-50",
  "Out for Delivery": "text-blue-600 bg-blue-50",
  Pending: "text-orange-500 bg-orange-50",
  Cancelled: "text-destructive bg-destructive/10",
  Confirmed: "text-primary bg-secondary",
  Processing: "text-primary bg-secondary",
  Packed: "text-primary bg-secondary",
  Refunded: "text-destructive bg-destructive/10",
};

const AdminDashboard = () => {
  const { orders } = useOrders();
  const users = getItem<User[]>(KEYS.USERS, mockUsers);

  const totalRevenue = orders.filter((o) => o.orderStatus !== "Cancelled").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.orderStatus === "Pending").length;
  const delivered = orders.filter((o) => o.orderStatus === "Delivered").length;
  const cancelled = orders.filter((o) => o.orderStatus === "Cancelled").length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const recentOrders = orders.slice(0, 8);

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-accent" },
    { label: "Total Orders", value: orders.length, icon: ShoppingCart, color: "text-blue-600" },
    { label: "Pending", value: pending, icon: Clock, color: "text-orange-500" },
    { label: "Delivered", value: delivered, icon: CheckCircle, color: "text-green-600" },
    { label: "Cancelled", value: cancelled, icon: XCircle, color: "text-destructive" },
    { label: "Customers", value: users.length, icon: Users, color: "text-primary" },
    { label: "Products", value: products.length, icon: Package, color: "text-primary" },
    { label: "Low Stock", value: lowStock.length, icon: AlertTriangle, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-primary">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of Crumbel store</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl bg-card p-5 shadow-soft border border-border/40">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
              <Icon className={cn("h-5 w-5", color)} />
            </div>
            <p className={cn("font-price text-2xl font-bold", color)}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Recent orders */}
        <div className="rounded-2xl bg-card shadow-soft border border-border/40 overflow-hidden">
          <div className="px-6 py-4 border-b border-border/60">
            <h2 className="font-display text-xl font-semibold text-primary">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40">
                <tr>
                  {["Order ID", "Customer", "Amount", "Method", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-secondary/20 transition-smooth">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">{o.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.address.name}</td>
                    <td className="px-4 py-3 font-price font-semibold text-primary">₹{o.total}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.paymentMethod}</td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_COLORS[o.orderStatus] ?? "bg-secondary text-primary")}>
                        {o.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low stock */}
        <div className="rounded-2xl bg-card shadow-soft border border-border/40">
          <div className="px-5 py-4 border-b border-border/60">
            <h2 className="font-display text-xl font-semibold text-primary">Low Stock</h2>
          </div>
          <div className="p-4 space-y-3">
            {lowStock.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">All products well stocked</p>
            ) : lowStock.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{p.name}</p>
                  <p className="text-xs text-orange-500 font-semibold">{p.stock} left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
